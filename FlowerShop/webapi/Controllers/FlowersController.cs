using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Flowers;
using webapi.Services;
using System.Threading.Tasks;
using webapi.Models.DTO;


namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowersController : ControllerBase
    {
        private readonly DataContext _context;
        public FlowersController(DataContext context) {
            _context=context;
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flower>>> GetFlowers() {
            FlowerService fs = new FlowerService(_context);
            return await fs.ListFlowers();
        }
        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Flower>> GetFlower(int id) {
            FlowerService fs = new FlowerService(_context);
            if (fs == null) NotFound();
            return await fs.GetFlower(id);
        }
        //POST
        [HttpPost]
        public async Task<ActionResult<Flower>> PostFlower(FlowerDTO flowerDTO) {
            FlowerService fs = new FlowerService(_context);
            var result = fs.AddFlower(flowerDTO);
            return await result == null ? BadRequest("Ошибка в цветке") : await result;
        }
        //PUT {id}
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutFlower(int id, FlowerDTO flowerDTO) {
            FlowerService fs = new FlowerService(_context);
            var result = fs.UpdateFlower(id, flowerDTO);
            if (result == null) return NotFound("Flower is not found");
            return Ok();
        }
        //DELETE {id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlower(int id) {
            FlowerService fs = new FlowerService(_context);
            var flower = fs.DeleteFlower(id);
            if (flower != null) return Ok();
            return NoContent();                
        }
    }
}
