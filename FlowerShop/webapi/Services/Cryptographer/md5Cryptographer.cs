using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using webapi.Services.Criptographer;

namespace webapi.Services.Cryptographer
{
    public class md5Cryptographer : ICryptographer
    {
        public string Encript(string password)
        {
            byte[] salt = new byte[password.Length];

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password, 
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256/8
                ));
            return hashed;
        }
    }
}
