using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            if (id != category.Id) return BadRequest(); 
            _context.Entry(category).State = EntityState.Modified;            
            await _context.SaveChangesAsync();
            return Ok();
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
