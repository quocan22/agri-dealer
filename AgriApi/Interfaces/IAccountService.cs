using System;
using AgriApi.Entities.Identity;
using AgriApi.Models;

namespace AgriApi.Interfaces
{
    public interface IAccountService
    {
        Tuple<bool, string> RegistSeller(string id, UserClaim userClaim, SellerClaim sellerClaim);
    }
}