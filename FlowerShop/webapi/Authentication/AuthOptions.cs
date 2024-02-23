using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace webapi.Authentication
{
    public class AuthOptions
    {
        //Издатель токена
        public const string ISSUER = "localhost:7241";
        //Потребитель токена
        public const string AUDINCE = "localhost:3000";

        // Минимальная длина строки, чтобы сработало шифрование - 17 символов!
        private const string KEY = "симметричныйКлючШифрования_CJIo}|{HbIu"; // Ключ для шифрации

        // Время жизни токена в минутах        
        public const int LIFETIME = 43200;

        // Получение симметричного ключа шифрования
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
