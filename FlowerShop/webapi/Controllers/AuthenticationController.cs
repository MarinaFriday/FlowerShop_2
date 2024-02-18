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
    public class AuthenticationController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthenticationController(DataContext context, ICryptographer cryptographer, IPasswordChecker passwordChecker)
        {
            _userService = new UserService(context, cryptographer, passwordChecker);
        }

        //Аутентификация пользователя
        //[HttpPost]
        //public async Task<ActionResult<User>> AuthUser
    }
}