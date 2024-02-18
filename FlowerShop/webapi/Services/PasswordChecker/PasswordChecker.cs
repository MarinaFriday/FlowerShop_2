using System.Text.RegularExpressions;

namespace webapi.Services.PasswordChecker
{
    public class PasswordChecker : IPasswordChecker
    {
        public void CheckPassword(string password)
        {
            if (Regex.Match(password, @"\d+", RegexOptions.ECMAScript).Success
                 && (Regex.Match(password, @"[a-z]", RegexOptions.ECMAScript).Success || Regex.Match(password, @"[а-я]", RegexOptions.ECMAScript).Success)
                 && (Regex.Match(password, @"[A-Z]", RegexOptions.ECMAScript).Success || Regex.Match(password, @"[А-Я]", RegexOptions.ECMAScript).Success)
                 && Regex.Match(password, @".[!,@,#,$,%,^,&,*,?,_,~,-,£,(,)]", RegexOptions.ECMAScript).Success
                 && password.Length >= 8
                 ) return;
            throw new Exception("Пароль должен содержать буквы верхнего и нижнего регистра," +
               "хотя бы одну цифру и один специальный символ и его длина должна быть больше 8 символов");
        }
    }
}
