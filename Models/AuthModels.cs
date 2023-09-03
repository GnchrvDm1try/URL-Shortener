using Shortener.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Shortener.Models
{
    public class LoginModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(100)]
        public string Login { get; set; } = String.Empty;
        [Required]
        [MinLength(8)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = String.Empty;
    }

    public class RegisterModel
    {
        [Required]
        [MinLength(4)]
        [MaxLength(100)]
        public string Login { get; set; } = String.Empty;
        [Required]
        [MinLength(8)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$",
            ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; } = String.Empty;
        [Required]
        [Compare("Password",
            ErrorMessage = "Passwords do not match")]
        public string PasswordConfirm { get; set; } = String.Empty;
    }
}
