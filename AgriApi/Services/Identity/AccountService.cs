using System;
using AgriApi.Entities.Identity;
using AgriApi.Interfaces;
using AgriApi.Models;
using AgriApi.Utils;

namespace AgriApi.Services.Identity
{
    public class AccountService : IAccountService
    {
        public readonly UserService _userService;

        public AccountService(UserService userService)
        {
            _userService = userService;
        }
        
        public Tuple<bool, string> RegistSeller(string id, UserClaim userClaim, SellerClaim sellerClaim)
        {
            var checkName = _userService.SellerNameUsed(sellerClaim.SellerName);
            if (checkName)
            {
                return new Tuple<bool, string>(false, "Tên công ty đã được sử dụng");
            }
            userClaim.JoinDate = _userService.GetJoinDate(id);
            var res = _userService.Update(id, "UserClaims", userClaim);
            var sellerRes = _userService.Update(id, "SellerClaims", sellerClaim);
            if (res && sellerRes)
            {
                _userService.Update(id, "Role", "seller");
                return new Tuple<bool, string>(true, "Đăng ký bán hàng thành công");
            }
            return new Tuple<bool, string>(false, "Đăng ký bán hàng thất bại");
        }

        public bool UpdateProfile(string id, UserClaim claim)
        {
            var currentClaim = _userService.Get(id).UserClaims;
            if (currentClaim != null)
            {
                currentClaim.Address = claim.Address;
                currentClaim.DisplayName = claim.DisplayName;
                currentClaim.PhoneNumber = claim.PhoneNumber;
                _userService.Update(id, "UserClaims", currentClaim);
                return true;
            }
            return false;
        }
    }
}