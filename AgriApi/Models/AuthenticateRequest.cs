using System;
using System.ComponentModel.DataAnnotations;

namespace AgriApi.Models
{
    public class AuthenticateRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 6)]
        public string Email { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string Password { get; set; }
    }
}