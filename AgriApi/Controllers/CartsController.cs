using AgriApi.Entities;
using AgriApi.Models;
using AgriApi.Services;
using AgriApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

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
        [Authorize("user, seller")]
        public ActionResult<Cart> Get(string id)
        {
            var cart = _cartService.Get(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        [HttpGet("currentdetail")]
        [Authorize("user, seller")]
        public ActionResult<List<CartDetailResponse>> GetCurrentDetail([FromQuery] string userId)
        {
            var detailResponse = new List<CartDetailResponse>();
            detailResponse.Clear();

            detailResponse = _cartService.GetDetailCurrentCart(userId);
            if (detailResponse != null)
            {
                foreach (var d in detailResponse)
                {
                    d.ProductImage = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, d.ProductImage);
                }
            }

            return detailResponse;
        }

        [HttpPost]
        [Authorize("user, seller")]
        public ActionResult<Cart> Create([FromForm] Cart cart)
        {
            _cartService.Create(cart);

            return CreatedAtRoute("GetCart", new { id = cart.Id.ToString() }, cart);
        }

        [HttpPost("addproduct")]
        [Authorize("user, seller")]
        public ActionResult AddProduct([FromForm] string userId, [FromForm] CartDetail cartDetail)
        {
            var res = _cartService.AddProduct(userId, cartDetail);

            if (res)
            {
                return Ok(new { message = "Thêm sản phẩm thành công" });
            }
            return BadRequest(new { message = "Không tìm thấy user" });
        }

        [HttpPut("removeproduct")]
        [Authorize("user, seller")]
        public ActionResult RemoveProduct([FromForm] string id, [FromForm] string productId)
        {
            var res = _cartService.RemoveProduct(id, productId);

            if (res)
            {
                return Ok(new { message = "Xóa sản phẩm thành công" });
            }
            return BadRequest(new { message = "Không tìm thấy giỏ hàng" });
        }

        [HttpPut("changeamount")]
        [Authorize("user, seller")]
        public ActionResult ChangeProductAmount([FromForm] string id, [FromForm] string productId, [FromForm] int newAmount)
        {
            var res = _cartService.UpdateProductAmount(id, productId, newAmount);

            if (res)
            {
                return Ok(new { message = "Thay đổi số lượng thành công" });
            }
            return BadRequest(new { message = "Không tìm thấy giỏ hàng" });
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

        [HttpPut("paidcart")]
        [Authorize("user, seller")]
        public ActionResult PaidCart([FromForm] string id)
        {
            var res = _cartService.PaidCart(id);
            if (res)
            {
                return Ok(new { message = "Thanh toán thành công" });
            }
            return BadRequest(new { message= "Không tìm thấy giỏ hàng" });
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