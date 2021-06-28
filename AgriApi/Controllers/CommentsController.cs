using AgriApi.Entities;
using AgriApi.Services;
using AgriApi.Services.Identity;
using AgriApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace AgriApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly CommentService _commentService;
        private readonly UserService _userService;

        public CommentsController(CommentService commentService, UserService userService)
        {
            _commentService = commentService;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<Comment>> GetActionResult() =>
            _commentService.Get();

        [HttpGet("{id:length(24)}", Name = "GetComment")]
        public ActionResult<Comment> Get(string id)
        {
            var comment = _commentService.Get(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        [HttpGet("filter", Name = "FilterComment")]
        public ActionResult<List<CommentResponse>> GetCommentByProductId([FromQuery] string type, [FromQuery] string value)
        {
            var res = new List<Comment>();
            if (type == "productid")
            {
                res = _commentService.GetByProductId(value);
            }
            if (res == null)
            {
                return NotFound();
            }
            var response = new List<CommentResponse>();
            response.Clear();
            foreach(var c in res)
            {
                var userName = _userService.GetRepName(c.UserId);
                var userImg = _userService.GetImageNameById(c.UserId);
                var imgUrl = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, userImg);
                response.Add(new CommentResponse(c, userName, imgUrl));
            }
            return response;
        }

        [HttpPost]
        public ActionResult<Comment> Create([FromForm] Comment comment)
        {
            var res = _commentService.Create(comment);

            if (res == null)
            {
                return BadRequest(new { message = "Bình luận thất bại"});
            }

            return CreatedAtRoute("GetComment", new { id = comment.Id.ToString() }, comment);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Comment commentIn)
        {
            var comment = _commentService.Get(id);

            if (comment == null)
            {
                return NotFound();
            }

            _commentService.Update(id, commentIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var comment = _commentService.Get(id);

            if (comment == null)
            {
                return NotFound();
            }

            _commentService.Remove(comment.Id);

            return NoContent();
        }
    }
}