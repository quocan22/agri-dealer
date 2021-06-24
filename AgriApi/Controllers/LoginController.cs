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
        private readonly IWebHostEnvironment _hostEnvironment;

        public LoginController(IWebHostEnvironment hostEnvironment, IAuthentication authService, IAccountService accountService)
        {
            _authService = authService;
            _accountService = accountService;
            _hostEnvironment = hostEnvironment;
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
    }
}