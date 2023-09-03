using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Shortener.Models;
using Shortener.Models.Enums;
using Shortener.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shortener.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ShortenerContext _context;
        private readonly IConfiguration _configuration;

        public AccountController(ShortenerContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.Users
                .Where(u => u.Login == model.Login && u.HashedPassword == PasswordHasher.HashPassword(model.Password))
                .FirstOrDefaultAsync();
            if (user is null) return BadRequest("Email or password is incorrect");

            Roles enumValue = (Roles)user.Role;
            string role = Enum.GetName(typeof(Roles), enumValue)!;

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecretKey"]!));
            var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:7254",
                audience: "https://localhost:7254",
                claims: new List<Claim>()
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("login", user.Login),
                    new Claim("role", role),
                },
                expires: DateTime.Now.AddDays(3),
                signingCredentials: signInCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(tokenString);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            User? user = await _context.Users.Where(u => u.Login == model.Login).FirstOrDefaultAsync();

            if (user is not null) return BadRequest("The user with such login is already exists");

            await _context.Users.AddAsync(new User(model));
            await _context.SaveChangesAsync();

            return Ok("The user has been successfully created");
        }
    }
}
