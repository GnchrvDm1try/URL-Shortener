using System.ComponentModel.DataAnnotations;

namespace Shortener.Models
{
    public class UrlForm
    {
        [Required]
        public string Url { get; set; } = String.Empty;
        [Required]
        public int? CreatorId { get; set; }
    }
}
