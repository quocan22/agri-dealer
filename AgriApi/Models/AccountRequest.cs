using System;
using System.ComponentModel.DataAnnotations;

namespace AgriApi.Models
{
    public class AccountModel
    {
        [Required]
        [EmailAddress]
        [StringLength(50, MinimumLength = 6)]
        public string Email { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string Password { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        [StringLength(50)]
        public string DisplayName { get; set; }
        public string Address { get; set; }
    }
}