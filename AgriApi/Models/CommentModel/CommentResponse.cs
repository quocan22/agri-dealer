using AgriApi.Entities;
using System;
using System.Text.Json.Serialization;

namespace AgriApi.Models
{
    public class CommentResponse
    {
        public string Id { get; set; }
        public string ProductId { get; set; }
        public string UserId { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string UserAvatarUrl { get; set; }
        public string UserName { get; set; }
        public DateTime? CommentDate { get; set; }
        public string Content { get; set; }

        public CommentResponse(Comment comment, string userName, string userAvatar)
        {
            Id = comment.Id;
            ProductId = comment.ProductId;
            UserId = comment.UserId;
            UserAvatarUrl = userAvatar;
            UserName = userName;
            CommentDate = comment.CommentDate;
            Content = comment.Content;
        }
    }
}