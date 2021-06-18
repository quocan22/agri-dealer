using AgriApi.Entities.Identity;
using System;

namespace AgriApi.Models
{
    public class SellerResponse
    {
        public string SellerName { get; set; }
        public DateTime? JoinDate { get; set; }
        public string Address { get; set; }
        public string BrandName { get; set; }
        public string Scale { get; set; }
        public string Capacity { get; set; }

        public SellerResponse(User user)
        {
            SellerName = user.SellerClaims.SellerName;
            JoinDate = user.UserClaims.JoinDate;
            Address = user.UserClaims.Address;
            BrandName = user.SellerClaims.BrandName;
            Scale = user.SellerClaims.Scale;
            Capacity = user.SellerClaims.Capacity;
        }
    }
}