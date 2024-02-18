namespace webapi.Models.User
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool UserRole { get; set; }
    }
}
