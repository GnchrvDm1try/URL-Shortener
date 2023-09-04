using Shortener.Models;

namespace Shortener.Services
{
    public static class UrlShorter
    {
        public static string GetShortenPath(URL url)
        {
            return url.CreatorId.ToString() + url.CreatedAt.Ticks.ToString();
        }
    }
}
