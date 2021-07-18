using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System.Linq;
using System;
using AgriApi.Entities;
using AgriApi.Entities.Identity;
using AgriApi.Interfaces;
using AgriApi.Models;
using AgriApi.Utils;
using AgriApi.Services.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace AgriApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthentication _authService;
        private readonly IAccountService _accountService;
        private readonly UserService _userService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public LoginController(IWebHostEnvironment hostEnvironment, IAuthentication authService, IAccountService accountService, UserService userService)
        {
            _authService = authService;
            _accountService = accountService;
            _hostEnvironment = hostEnvironment;
            _userService = userService;
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
        [Authorize("user")]
        public async Task<ActionResult> RegistSeller([FromForm] string id, [FromForm] UserClaim userClaim, [FromForm] SellerClaim sellerClaim, [FromForm] IFormFile file)
        {
            string userId = (HttpContext.Items["User"] as User).Id;
            if (userId != id)
            {
                return StatusCode(403, new { message = "Forbidden" });
            }
            userClaim.AvatarUrl = await SaveImage(file);
            var res = _accountService.RegistSeller(id, userClaim, sellerClaim);
            if (!res.Item1)
            {
                return BadRequest(new { message = res.Item2});
            }
            return Ok(new { message = res.Item2 });
        }

        [HttpPut("account")]
        [Authorize("user, seller")]
        public ActionResult UpdateProfile([FromForm] string id, [FromForm] UserClaim claim)
        {
            string userId = (HttpContext.Items["User"] as User).Id;
            if (userId != id)
            {
                return StatusCode(403, new { message = "Forbidden" });
            }
            var res = _accountService.UpdateProfile(id, claim);

            if (res)
            {
                return Ok(new { message = "Cập nhật thông tin thành công" });
            }

            return BadRequest(new { message = "Cập nhật thông tin thất bại" });
        }

        [HttpPut("account/changeavatar")]
        [Authorize("user, seller")]
        public async Task<ActionResult> ChangeAvatar([FromForm] string id, [FromForm] IFormFile file)
        {
            string userId = (HttpContext.Items["User"] as User).Id;
            if (userId != id)
            {
                return StatusCode(403, new { message = "Forbidden" });
            }
            if (DeleteImage(id))
            {
                var currentUser = _userService.Get(id);
                currentUser.UserClaims.AvatarUrl = await SaveImage(file);
                _userService.Update(id, currentUser);
                return Ok(new { message = "Cập nhật ảnh đại diện thành công" });
            }
            return BadRequest(new { message = "Cập nhật ảnh đại diện không thành công" });
        }

        [HttpPut("account/deleteavatar")]
        [Authorize("user, seller")]
        public ActionResult DeleteAvatar([FromForm] string id)
        {
            string userId = (HttpContext.Items["User"] as User).Id;
            if (userId != id)
            {
                return StatusCode(403, new { message = "Forbidden" });
            }
            
            if (DeleteImage(id))
            {
                var currentUser = _userService.Get(id);
                currentUser.UserClaims.AvatarUrl = null;
                _userService.Update(id, currentUser);
                return Ok(new { message = "Cập nhật ảnh đại diện thành công" });
            }
            return BadRequest(new { message = "Cập nhật ảnh đại diện không thành công" });
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ','-');
            imageName = imageName + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public bool DeleteImage(string id)
        {
            var currentImageName = _userService.GetImageNameById(id);
            if (currentImageName != null)
            {
                if (currentImageName == "noavatar.png")
                {
                    return true;
                }

                string imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", currentImageName);

                if (System.IO.File.Exists(imagePath))
                {
                    try
                    {
                        System.GC.Collect();
                        System.GC.WaitForPendingFinalizers();
                        System.IO.File.Delete(imagePath);
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                }
            }
            return false;
        }
    }
}