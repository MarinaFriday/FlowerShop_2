using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models.User;
using webapi.Services.Criptographer;
using webapi.Services.PasswordChecker;

namespace webapi.Services
{
    public class UserService
    {
        private readonly DataContext _context;
        private readonly ICryptographer _cryptographer;
        private readonly IPasswordChecker _passwordChecker;

        public UserService(DataContext context, ICryptographer cryptographer, IPasswordChecker passwordChecker) {
            _context = context;
            _cryptographer = cryptographer;
            _passwordChecker = passwordChecker;
        }

        public async Task<User> CreateUser(User user) {
            if (_context.Users.FirstOrDefault(u => u.UserName == user.UserName) != null) {
                throw new Exception("Пользователь с таким именем уже существует");
            }
            _passwordChecker.CheckPassword(user.UserPassword);
            user.UserPassword = _cryptographer.Encrypt(user.UserPassword);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<IEnumerable<User>> ReadAllUsers() {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> ReadUserById(int id) {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (user != null)
            {
                return user;
            }
            else throw new Exception("Пользователь с данным id не найден");
        }

        public async Task<User> ReadUserByName(string name)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == name);
            if (user != null)
            {
                return user;
            }            
            else return null;
        }

        public async Task<User> EditUserName(int id, User user) {
            if (id != user.Id) throw new Exception("Переданные Id и Id пользователя не совпадают! Проверьте отправляемые данные");            
            if (ReadUserByName(user.UserName).Result != null) throw new Exception("Пользователь с таким именем уже существует");
            var userDb = await ReadUserById(id);
            userDb.UserName = user.UserName;
            await _context.SaveChangesAsync();                        
            return userDb;
        }

        public async Task<User> EditUserPassword(int id, User user) {
            if(id != user.Id) throw new Exception("Переданные Id и Id пользователя не совпадают! Проверьте отправляемые данные");
            var userDb = ReadUserById(id).Result;            
            _passwordChecker.CheckPassword(user.UserPassword);
            user.UserPassword = _cryptographer.Encrypt(user.UserPassword);
            if (userDb.UserPassword == user.UserPassword) throw new Exception("Старый и новый пароли совпадают");            
            else {
                userDb.UserPassword = user.UserPassword;
                await _context.SaveChangesAsync();
                return userDb;
            }
        }

        public async Task DeleteUserById(int id) {
            var user = await ReadUserById(id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();  
        }

        public async Task<bool> IsUserNameAndUserPasswordCorrect(User user) {
            var userDb = await ReadUserByName(user.UserName);
            if (userDb == null) throw new Exception("Неверное имя пользователя или пароль");
            user.UserPassword = _cryptographer.Encrypt(user.UserPassword);            
            if (userDb.UserPassword != user.UserPassword) throw new Exception("Неверное имя пользователя или пароль");
            return true;
        }



    }
}
