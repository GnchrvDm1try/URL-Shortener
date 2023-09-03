using Shortener.Models.Enums;
using Shortener.Services;

namespace Shortener.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string HashedPassword { get; set; }
        public DateTime RegisteredAt { get; set; }
        public Roles Role { get; set; }

        public User() { }

        public User(RegisterModel model)
        {
            Login = model.Login;
            HashedPassword = PasswordHasher.HashPassword(model.Password);
            RegisteredAt = DateTime.UtcNow;
            Role = Roles.User;
        }
    }
}
