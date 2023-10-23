using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models.Flowers;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvidersController : ControllerBase
    {
        private readonly DataContext _context;

        public ProvidersController(DataContext context) {
            _context = context;
        }
        //GET 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Provider>>> GetProviders() {
            return await _context.Providers.ToListAsync();
        }
        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Provider>> GetProvider(int id) {
            var provider = await _context.Providers.FindAsync(id);
            if (provider == null) NotFound();
            return provider;
        }
        //PUT {id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProvider(int id, Provider provider) {
            if (id != provider.Id) BadRequest();
            _context.Entry(provider).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(); 
        }
        [HttpPost]
        public async Task<ActionResult<Provider>> PostProvider(Provider provider) {
            await _context.Providers.AddAsync(provider);
            await _context.SaveChangesAsync();
            return provider;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProvider(int id) {
            var provider = await _context.Providers.FindAsync(id);
            if (provider == null) NotFound();
            _context.Providers.Remove(provider);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}
