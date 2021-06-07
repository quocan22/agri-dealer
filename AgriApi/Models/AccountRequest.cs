using System;
using System.ComponentModel.DataAnnotations;

namespace AgriApi.Models
{
    public class AccountModel
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [StringLength(50)]
        public string DisplayName { get; set; }
        public string Address { get; set; }
    }
}