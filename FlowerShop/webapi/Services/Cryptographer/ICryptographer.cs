namespace webapi.Services.Criptographer
{
    //интерфейс для шифрования пароля
    public interface ICryptographer
    {
        public string Encript(string password);
    }
}
