using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AgriApi.Entities.Identity;
using AgriApi.Interfaces;
using AgriApi.Models;
using AgriApi.Utils;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AgriApi.Services.Identity
{
    public class AuthenticateService : IAuthentication
    {
        private readonly UserService _userService;
        private readonly AppSettings _appSettings;

        public AuthenticateService(UserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }
        public Tuple<bool, object> Authenticate(AuthenticateRequest model)
        {
            var user = _userService.GetUserByEmail(model.Email);
            if (user == null)
                return new Tuple<bool, object>(false, "Email không chính xác");
            
            var passHash = Helpers.Md5Hash(model.Password);
            // var md5 = new MD5CryptoServiceProvider();
            // var passHash = Encoding.ASCII.GetString(md5.ComputeHash(Encoding.ASCII.GetBytes(model.Password)));
            if (!user.PasswordHash.Equals(passHash))
                return new Tuple<bool, object>(false, "Mật khẩu không chính xác");

            var token = generateJwtToken(user);
            return new Tuple<bool, object>(true, new AuthenticateResponse(user, token));
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 1 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var role = _userService.GetRole(user.Id.ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("id", user.Id.ToString()),
                    new Claim("role", role)
                }),
                Expires = DateTime.UtcNow.AddDays(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}