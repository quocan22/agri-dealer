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
                return new Tuple<bool, string>(false, "Tên thương hiệu đã được sử dụng");
            }
            var res = _userService.Update(id, "UserClaims", userClaim);
            var addressRes = _userService.Update(id, "SellerClaims", sellerClaim);
            if (res && addressRes)
            {
                _userService.Update(id, "Role", "seller");
                return new Tuple<bool, string>(true, "Đăng ký bán hàng thành công");
            }
            return new Tuple<bool, string>(false, "Đăng ký bán hàng thất bại");
        }
    }
}