//using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using webapi.Data;
using webapi.Models.User;
using webapi.Services;
using webapi.Services.Criptographer;
using webapi.Services.PasswordChecker;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService userService;

        public UserController(DataContext context, ICryptographer cryptografer, IPasswordChecker passwordChecker)
        {
            userService = new UserService(context, cryptografer, passwordChecker);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            try
            {
                var userList = await userService.ReadAllUsers();
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

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            try {
                var result = await userService.ReadUserById(id);
                if (result != null) return Ok(result);
                else return NoContent();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<User>> GetUserByName(string name)
        {
            try
            {
                var result = await userService.ReadUserByName(name);
                if (result != null) return Ok(result);
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
                var userCreate = await userService.CreateUser(user);
                return Ok(userCreate);
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
            try
            {
                var resultUser = await userService.EditUserName(id, user);
                return Ok(resultUser);
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
                var resultUser = await userService.EditUserPassword(id, user);
                return Ok(resultUser);               
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
            try
            {
                await userService.DeleteUserById(id);
                return Ok("Пользователь удален");
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        [HttpPost("IsUserNameAndUserPasswordCorrect")]
        public async Task<IActionResult> IsUserNameAndUserPasswordCorrect(User user) {
            try
            {
                await userService.IsUserNameAndUserPasswordCorrect(user);
                return Ok("");
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }
    }










    //public async Task<IActionResult> IsUserNameAndPasswordCorrect(string userName, string userPassword) {
    //try {
    //    var user = GetUserByName(userName);
    //    } 
    //catch (Exception exception) { 

    //} 


    //}    
}
