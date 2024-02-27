using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.OpenApi.Validations;
using webapi.Data;
using webapi.Models.Flowers;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly DataContext _context;

        public ColorsController(DataContext context) {
            _context = context;
        }

        //POST
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Color>> PostColor(Color color) {
            ColorService cs = new ColorService(_context);
            var result = cs.AddColor(color);
            return result==null ? BadRequest("Ошибка в цвете") : result;
        }
        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> GetColor() {
            ColorService cs = new ColorService(_context);
            return await cs.ListColors();
        }
        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(int id)
        {
            ColorService cs = new ColorService(_context);
            Color color = await cs.GetColor(id);
            if (color == null) NotFound();
            return Ok(color);
        }
        //PUT {id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Color>> PutColor(int id, Color color)
        {
            ColorService cs = new ColorService(_context);
            var result = await cs.UpdateColor(id, color);
            if (result == null) return NotFound("Color is not found");
            return Ok(result);            
        }

        //DELETE {id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(int id) {
            ColorService cs = new ColorService(_context);
            var color = cs.DeleteColor(id);
            if (color != null) return Ok("Цвет успешно удален");
            //??????
            return NoContent();
        }

    }
}
