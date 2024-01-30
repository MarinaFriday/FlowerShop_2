using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using webapi.Data;
using webapi.Models.Flowers;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly DataContext _context;
        public CountriesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        //?????????
        public async Task<ActionResult<IEnumerable<Country>>> GetFlowerCounties()
        {
            return await _context.Countries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetFlowerCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null) return NotFound();
            return country;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlowerCountry(int id, Country country)
        {           
            var countryDb = await _context.Countries.FirstOrDefaultAsync(countryDb => countryDb.Id == id);
            if (countryDb is null)
            {
                return NotFound("Country is not found!");
            }

            countryDb.Title = country.Title;            

            await _context.SaveChangesAsync();

            return Ok("Country is successfully updated!");
        }
        [HttpPost]
        public async Task<ActionResult<Country>> PostFlowerCountry(Country country)
        {
            await _context.Countries.AddAsync(country);
            await _context.SaveChangesAsync();
            return country;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlowerCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null) return NotFound();
            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
