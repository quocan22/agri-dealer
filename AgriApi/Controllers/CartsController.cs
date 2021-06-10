using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartsController(CartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        [Authorize("user, seller")]
        public ActionResult<List<Cart>> GetActionResult() =>
            _cartService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCart")]
        public ActionResult<Cart> Get(string id)
        {
            var cart = _cartService.Get(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        [HttpPost]
        public ActionResult<Cart> Create([FromForm] Cart cart)
        {
            _cartService.Create(cart);

            return CreatedAtRoute("GetCart", new { id = cart.Id.ToString() }, cart);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Cart cartIn)
        {
            var cart = _cartService.Get(id);

            if (cart == null)
            {
                return NotFound();
            }

            _cartService.Update(id, cartIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var cart = _cartService.Get(id);

            if (cart == null)
            {
                return NotFound();
            }

            _cartService.Remove(cart.Id);

            return NoContent();
        }
    }
}