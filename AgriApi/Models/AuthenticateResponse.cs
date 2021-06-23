using System;
using AgriApi.Entities.Identity;
using System.Text.Json.Serialization;

namespace AgriApi.Models
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string DisplayName { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            Email = user.Email;
            Role = user.Role;
            DisplayName = user.UserClaims.DisplayName;
            Token = token;
        }
    }
}