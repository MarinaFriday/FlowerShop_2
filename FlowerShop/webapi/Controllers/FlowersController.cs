using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Flowers;
using webapi.Services;
using System.Threading.Tasks;


namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowersController : ControllerBase
    {
        FlowerService fs;
        public FlowersController(DataContext context, IWebHostEnvironment appEnvironment)
        {
            fs = new FlowerService(context, appEnvironment);
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flower>>> GetFlowers() {
            return await fs.ListFlowers();
        }

        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Flower>> GetFlower(int id) {
            if (fs == null) NotFound();
            return await fs.GetFlower(id);
        }

        //POST
        [HttpPost]

        public async Task<ActionResult<Flower>> PostFlower(Flower flower) {
            var result = fs.AddFlower(flower);
            return await result == null ? BadRequest("Ошибка в цветке") : await result;
        }
       

        //PUT {id}
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutFlower(int id, Flower flower) {
            var result = fs.UpdateFlower(id, flower);
            if (result == null) return NotFound();
            return Ok(result);
        }

        //DELETE {id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlower(int id) {
            var flower = fs.DeleteFlower(id);
            if (flower != null) return Ok();
            return NoContent();                
        }
    }
}
