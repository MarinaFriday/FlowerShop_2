using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using webapi.Data;
using webapi.Models.Flowers;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowerCategoriesController : ControllerBase
    {
        private readonly DataContext _context;
        public FlowerCategoriesController(DataContext context) {
            _context = context;
        }

        [HttpGet]
        //?????????
        public async Task<ActionResult<IEnumerable<FlowerCategory>>> GetFlowerCategories() {
            return await _context.FlowersCategories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FlowerCategory>> GetFlowerCategory(int id)
        {
            var category = await _context.FlowersCategories.FindAsync(id);
            if (category == null) return NotFound();
            return category;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlowerCategory(int id, FlowerCategory category) {  
            
            var categoryDb = await _context.FlowersCategories.FirstOrDefaultAsync(categoryDb => categoryDb.Id == id);            
            if (categoryDb is null)
            {
                return NotFound("Category is not found!");
            }

            categoryDb.Title = category.Title;

            await _context.SaveChangesAsync();

            return Ok("Category is successfully updated!");
        }
        [HttpPost]
        public async Task<ActionResult<FlowerCategory>> PostFlowerCategory(FlowerCategory category) { 
            await _context.FlowersCategories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlowerCategory(int id) {
            var category = await _context.FlowersCategories.FindAsync(id);
            if (category == null) return NotFound();
            _context.FlowersCategories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
