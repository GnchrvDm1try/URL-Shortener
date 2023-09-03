using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shortener.Models;

namespace Shortener.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class URLsController : ControllerBase
    {
        private readonly ShortenerContext _context;

        public URLsController(ShortenerContext context)
        {
            _context = context;
        }

        [HttpGet("Navigate/{shortenUrl}")]
        public async Task<IActionResult> Navigate(string shortenUrl)
        {
            URL? url = await _context.URLs.FirstOrDefaultAsync(u => u.ShortenUrl == shortenUrl);
            if (url is not null)
                return Redirect(url.Url);
            return BadRequest("Could not find such shorten url");
        }

        // GET: URLs/GetAllUrls
        [HttpGet("GetAllUrls")]
        public async Task<IActionResult> GetAllUrls()
        {
            return Ok(await _context.URLs.ToListAsync());
        }

        // GET: URLs/Details/id
        [HttpGet("Details/{id:}")]
        public async Task<IActionResult> Details(int? id)
        {
            var uRL = await _context.URLs
                .Include(u => u.CreatedBy)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (uRL == null)
                return NotFound();

            return Ok(uRL);
        }

        // POST: URLs/Create
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] UrlForm form)
        {
            URL? url = null;
            if (ModelState.IsValid)
            {
                url = new URL(form);
                _context.Add(Url);
                await _context.SaveChangesAsync();
            }
            return url is null ? Ok(url) : BadRequest();
        }

        // GET: URLs/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.URLs == null)
            {
                return NotFound();
            }

            var uRL = await _context.URLs.FindAsync(id);
            if (uRL == null)
            {
                return NotFound();
            }
            return Ok(uRL);
        }

        // GET: URLs/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.URLs == null)
            {
                return NotFound();
            }

            var uRL = await _context.URLs
                .FirstOrDefaultAsync(m => m.Id == id);
            if (uRL == null)
            {
                return NotFound();
            }

            return Ok(uRL);
        }

        // POST: URLs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.URLs == null)
            {
                return Problem("Entity set 'ShortenerContext.URLs'  is null.");
            }
            var uRL = await _context.URLs.FindAsync(id);
            if (uRL != null)
            {
                _context.URLs.Remove(uRL);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool URLExists(int id)
        {
            return (_context.URLs?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
