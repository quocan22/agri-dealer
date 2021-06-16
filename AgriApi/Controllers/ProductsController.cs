using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Services.Identity;
using AgriApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly CategoryService _categoryService;
        private readonly UserService _userService;

        public ProductsController(ProductService productService, CategoryService categoryService, UserService userService)
        {
            _productService = productService;
            _categoryService = categoryService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<ProductResponse>> GetActionResult()
        {
            var product = _productService.Get();
            var productResponse = new List<ProductResponse>();

            foreach (var p in product)
            {
                var sellerName = _userService.GetSellerNameById(p.UserId);
                productResponse.Add(new ProductResponse(p, sellerName));
            }

            return productResponse;
        }

        [HttpGet("{id:length(24)}", Name = "GetProduct")]
        public ActionResult<Product> Get(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public ActionResult<Product> Create([FromForm] Product product)
        {
            var count = _productService.IsExisted(product.ProductName);

            if (count)
                return BadRequest(new { message = "Sản phẩm này đã tồn tại."});
                
            _productService.Create(product);

            return CreatedAtRoute("GetProduct", new { id = product.Id.ToString() }, product);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Product productIn)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _productService.Update(id, productIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            _productService.Remove(product.Id);

            return NoContent();
        }

        [HttpGet("categories")]
        public ActionResult<List<Category>> Get() =>
            _categoryService.Get(); 
    }
}