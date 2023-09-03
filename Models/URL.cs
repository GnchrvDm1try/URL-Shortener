using Shortener.Services;

namespace Shortener.Models
{
    public class URL
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string ShortenUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public virtual User? CreatedBy { get; set; }

        public URL()
        {

        }

        public URL(UrlForm form)
        {
            Url = form.Url;
            UserId = form.CreatorId.GetValueOrDefault();
            CreatedAt = DateTime.UtcNow;
            ShortenUrl = UrlShorter.GetShortenPath(this);
        }
    }
}
