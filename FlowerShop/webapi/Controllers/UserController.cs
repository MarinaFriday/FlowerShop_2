//using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using webapi.Data;
using webapi.Models.User;
using webapi.Services.Criptographer;
using webapi.Services.PasswordChecker;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ICryptographer _criptographer;
        private readonly IPasswordChecker _passwordChecker;

        public UserController(DataContext context, ICryptographer criptografer, IPasswordChecker passwordChecker)
        {
            _context = context;
            _criptographer = criptografer;
            _passwordChecker = passwordChecker;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() {
            try
            {
                var userList = await _context.Users.ToListAsync();
                if (userList != null)
                {
                    return Ok(userList);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            try {
                var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
                if (user != null) {
                    return Ok(user);
                }
                else return NoContent();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try {
                if (_context.Users.FirstOrDefault(u => u.UserName == user.UserName) != null)
                    throw new Exception("Пользователь с таким именем уже существует");
                _passwordChecker.CheckPassword(user.UserPassword);
                user.UserPassword = _criptographer.Encript(user.UserPassword);
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpPut("PutUserName/{id}")]
        public async Task<ActionResult<User>> PutUserName(int id, User user)
        {
            try {
                var userDb = await _context.Users.FirstOrDefaultAsync(userDb => userDb.Id == id);
                if (userDb is null) return NotFound("User is not found");
                userDb.UserName = user.UserName;
                await _context.SaveChangesAsync();
                return Ok(userDb);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpPut("PutUserPassword/{id}")]
        public async Task<ActionResult<User>> PutUserPassword(int id, User user)
        {
            try
            {
                var userDb = await _context.Users.FirstOrDefaultAsync(userDb => userDb.Id == id);
                if (userDb is null) return NotFound("User is not found");
                _passwordChecker.CheckPassword(user.UserPassword);
                user.UserPassword = _criptographer.Encript(user.UserPassword);
                if (userDb.UserPassword == user.UserPassword) return BadRequest("Пароли совпадают"); userDb.UserName = user.UserName;
                await _context.SaveChangesAsync();
                return Ok(userDb);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try {
                var userDb = await _context.Users.FirstOrDefaultAsync(userDb => userDb.Id == id);
                if (userDb is null) return NotFound("User is not found");
                _context.Users.Remove(userDb);
                await _context.SaveChangesAsync();
                return Ok("Пользователь удален");
            }
            catch (Exception exception) {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }


    }
}
