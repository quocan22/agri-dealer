using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Services.Identity;
using AgriApi.Models;
using AgriApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly CategoryService _categoryService;
        private readonly UserService _userService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ProductsController(IWebHostEnvironment hostEnvironment, ProductService productService, CategoryService categoryService, UserService userService)
        {
            _hostEnvironment = hostEnvironment;
            _productService = productService;
            _categoryService = categoryService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<ProductResponse>> Get()
        {
            var product = _productService.Get();
            var productResponse = new List<ProductResponse>();

            foreach (var p in product)
            {
                var sellerName = _userService.GetSellerNameById(p.UserId);
                var url = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, p.ImageName);
                productResponse.Add(new ProductResponse(p, sellerName, url));
            }

            return productResponse;
        }

        [HttpGet("search/", Name = "GetProductByValue")]
        public ActionResult<List<ProductResponse>> GetProductByValue([FromQuery] string type, [FromQuery] string value)
        {
            var products = new List<Product>();
            products.Clear();
            switch(type) 
            {
                case "catename":
                    if (value == "all") 
                    {
                        products = _productService.Get();
                    }
                    else
                    {
                        var cateId = _categoryService.GetCateIdByCateName(value);
                        if (cateId != null)
                        {
                            products = _productService.GetProductByCate(cateId);
                        }
                    }
                    break;
                case "cateid":
                    products = _productService.GetProductByCate(value);
                    break;
                case "name":
                    products = _productService.GetProductByName(value);
                    break;
                case "userId":
                    products = _productService.GetProductByUserId(value);
                    break;
                default:
                    break;
            }
            if (products == null)
            {
                return NotFound();
            }
            var productResponse = new List<ProductResponse>();

            foreach(var p in products)
            {
                var sellerName = _userService.GetSellerNameById(p.UserId);
                var url = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, p.ImageName);
                productResponse.Add(new ProductResponse(p, sellerName, url));
            }

            return productResponse;
        }

        [HttpGet("{id:length(24)}", Name = "GetProduct")]
        public ActionResult<ProductDetailResponse> Get(string id)
        {
            var product = _productService.Get(id);

            if (product == null)
            {
                return NotFound();
            }

            var url = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, product.ImageName);
            var details = new ProductDetailResponse(product, url);
            return details;
        }

        [HttpPost]
        [Authorize("seller")]
        public async Task<ActionResult<Product>> Create([FromForm] Product product,[FromForm] IFormFile file)
        {
            var count = _productService.IsExisted(product.ProductName);

            if (count)
                return BadRequest(new { message = "Sản phẩm này đã tồn tại."});

            product.ImageName = await SaveImage(file);

            _productService.Create(product);

            //return CreatedAtRoute("GetProduct", new { id = productRequest.Product.Id.ToString() }, productRequest.Product);
            return StatusCode(201);
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
        public ActionResult<List<Category>> GetCategory() =>
            _categoryService.Get(); 
    }
}