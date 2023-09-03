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

        // GET: URLs/GetAllUrls
        [HttpGet("GetAllUrls")]
        public async Task<IActionResult> GetAllUrls()
        {
            return Ok(await _context.URLs.ToListAsync());
            //return _context.URLs != null ?
            //            Ok(await _context.URLs.ToListAsync()) :
            //            Problem("Entity set 'ShortenerContext.URLs'  is null.");
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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Url,ShortenUrl,CreatedAt")] URL uRL)
        {
            if (ModelState.IsValid)
            {
                _context.Add(uRL);
                await _context.SaveChangesAsync();
            }
            return Ok(uRL);
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

        // POST: URLs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Url,ShortenUrl,CreatedAt")] URL uRL)
        {
            if (id != uRL.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(uRL);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!URLExists(uRL.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
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
