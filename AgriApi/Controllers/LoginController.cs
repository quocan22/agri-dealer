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

        public LoginController(IAuthentication authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult Login([FromForm] AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            if (!response.Item1)
                return BadRequest(new { message = response.Item2.ToString() });
            return Ok(response.Item2);
        }
    }
}