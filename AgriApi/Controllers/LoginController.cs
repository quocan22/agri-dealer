using System.Collections.Generic;
using AgriApi.Entities;
using AgriApi.Entities.Identity;
using AgriApi.Interfaces;
using AgriApi.Models;
using AgriApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace AgriApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthentication _authService;
        private readonly IAccountService _accountService;

        public LoginController(IAuthentication authService, IAccountService accountService)
        {
            _authService = authService;
            _accountService = accountService;
        }

        [HttpPost("login")]
        public ActionResult Login([FromForm] AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            if (!response.Item1)
                return BadRequest(new { message = response.Item2.ToString() });
            return Ok(response.Item2);
        }

        [HttpPut("seller")]
        public ActionResult RegistSeller([FromForm] string id, [FromForm] UserClaim userClaim, [FromForm] SellerClaim sellerClaim)
        {
            string userId = (HttpContext.Items["User"] as User).Id;
            if (userId != id)
            {
                return StatusCode(403, new { message = "Forbidden" });
            }
            var res = _accountService.RegistSeller(id, userClaim, sellerClaim);
            if (!res.Item1)
            {
                return BadRequest(new { message = res.Item2});
            }
            return Ok(new { message = res.Item2 });
        }
    }
}