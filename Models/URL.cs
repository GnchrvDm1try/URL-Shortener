namespace Shortener.Models
{
    public class URL
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string ShortenUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public User CreatedBy { get; set; }

        public URL()
        {

        }

        public URL(string url, string shortenUrl, User createdBy)
        {
            Url = url;
            ShortenUrl = shortenUrl;
            CreatedBy = createdBy;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
