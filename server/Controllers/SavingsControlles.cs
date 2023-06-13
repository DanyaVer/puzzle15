using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/savings/")]
[ApiController]
public class SavingsController : ControllerBase
{
    private readonly SavingsServiceContext _context;

    public SavingsController(SavingsServiceContext context)
    {
        _context = context;
    }

    // GET: api/savings
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Saving>>> GetSavings()
    {
        if (_context.Savings == null)
        {
            return NotFound();
        }
        return await _context.Savings.ToListAsync();
    }

    // GET: api/savings
    [HttpGet("{login},{password}")]
    public async Task<ActionResult<Saving>> GetSaving(string login, string password)
    {
        if (_context.Savings == null)
        {
            return NotFound();
        }
        var allSavings = _context.Savings.AsQueryable();

        if (!string.IsNullOrEmpty(login) && !string.IsNullOrEmpty(password))
        {
            allSavings = allSavings.Where(x => x.Login == login && x.Password == password);
        }

        if (allSavings == null)
        {
            return NotFound();
        }

        return allSavings.ToList().Last();
    }

    // GET: api/savings
    [HttpGet("{id}")]
    public async Task<ActionResult<Saving>> GetSaving(int id)
    {
        if (_context.Savings == null)
        {
            return NotFound();
        }
        var save = await _context.Savings.FindAsync(id);

        if (save == null)
        {
            return NotFound();
        }

        return save;
    }

    // PUT: api/savings
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicket(int id, Saving saving)
    {
        if (id != saving.Id)
        {
            return BadRequest();
        }

        _context.Entry(saving).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SavingExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/savings
    [HttpPost]
    public async Task<ActionResult<Saving>> PostTicket(Saving saving)
    {
        if (_context.Savings == null)
        {
            return Problem("Entity set 'SavingServiceContext.Savings' is null.");
        }
        _context.Savings.Add(saving);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetSaving", new { id = saving.Id }, saving);
    }

    // DELETE: api/savings
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        if (_context.Savings == null)
        {
            return NotFound();
        }
        var ticket = await _context.Savings.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Savings.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SavingExists(int id)
    {
        return (_context.Savings?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}