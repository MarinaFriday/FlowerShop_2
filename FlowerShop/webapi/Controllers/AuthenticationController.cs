using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using webapi.Authentication;
using webapi.Data;
using webapi.Models.DTO;
using webapi.Models.User;
using webapi.Services;
using webapi.Services.Criptographer;
using webapi.Services.PasswordChecker;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthenticationController(DataContext context, ICryptographer cryptographer, IPasswordChecker passwordChecker)
        {
            _userService = new UserService(context, cryptographer, passwordChecker);
        }

        //Аутентификация пользователя
        [HttpPost]
        public async Task<ActionResult<User>> AuthUser(UserDTO userDTO) {
            List<Claim> identity;
            try {
                identity = await GetIdentity(userDTO);
            }
            catch (Exception exception) {
                return Problem(exception.Message);
            }

            var now = DateTime.UtcNow;

            //Создаем JWT-токен

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDINCE,
                notBefore: now,
                claims: identity,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                userId = identity[0].Value.ToString(),
                userName = identity[1].Value.ToString(),
                userRole = identity[2].Value.ToString()
            };
            return Ok(response);
        }

        //Идентификация пользователя
        private async Task<List<Claim>> GetIdentity(UserDTO userDTO)
        {
            var user = new User() {
                UserName = userDTO.Name,
                UserPassword = userDTO.Password
            };
            await _userService.IsUserNameAndUserPasswordCorrect(user);
            var userDb = await _userService.ReadUserByName(user.UserName);
            var claims = new List<Claim> {
                new Claim(nameof(userDb.Id), $"{userDb.Id}"),
                new Claim(nameof(userDb.UserName), $"{userDb.UserName}"),
                new Claim(nameof(userDb.UserRole), $"{userDb.UserRole}")
            };
            return claims;
        }
    }
}