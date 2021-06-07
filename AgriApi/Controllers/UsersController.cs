using AgriApi.Entities.Identity;
using AgriApi.Services.Identity;
using AgriApi.Utils;
using AgriApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public ActionResult<User> Create([FromForm] AccountModel account)
        {
            var matchUser = _userService.GetUserByUsername(account.Username);

            if (matchUser != null)
                return BadRequest(new { message = "This username has been used." });
            var passHash = Helpers.Md5Hash(account.Password);
            User user = new User()
            {
                Username = account.Username,
                PasswordHash = passHash,
                Role = account.Role,
                UserClaims = new UserClaim()
                {
                    Email = account.Email,
                    PhoneNumber = account.PhoneNumber,
                    Displayname = account.DisplayName,
                    Address = account.Address
                }
            };
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.Id);

            return NoContent();
        }
    }
}