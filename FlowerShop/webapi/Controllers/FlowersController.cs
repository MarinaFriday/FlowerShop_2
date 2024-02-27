using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Flowers;
using webapi.Services;
using System.Threading.Tasks;
using webapi.Models.DTO;
using Microsoft.AspNetCore.Authorization;


namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowersController : ControllerBase
    {
        private readonly DataContext _context;
        private FlowerService fs;

        public FlowersController(DataContext context) {
            _context = context;
            fs = new FlowerService(context);
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flower>>> GetFlowers() {
            try
            {
                var flowerList = await fs.ListFlowers();
                if (flowerList != null) return Ok(flowerList);
                else return NoContent();
            }
            catch (Exception exception) {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Flower>> GetFlower(int id) {
            try
            {
                var result = await fs.GetFlowerById(id);
                return Ok(result);
            }
            catch (Exception exception) {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //POST
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Flower>> PostFlower(FlowerDTO flowerDTO) {
            var result = await fs.AddFlower(flowerDTO);
            return result == null ? BadRequest("Ошибка в добавлении цветка") : Ok(result);
        }

        //PUT {id}
        [HttpPut ("{id}")]
        [Authorize]
        public async Task<ActionResult<Flower>> PutFlower(int id, FlowerDTO flowerDTO) {
            try
            {
                var result = await fs.EditFlower(id, flowerDTO);
                return Ok(result);
            }
            catch (Exception exception) {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }        
        }

        //DELETE {id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFlower(int id) {
            try
            {
                await fs.DeleteFlower(id);
                return Ok("Цветок удален");
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }
    }
}
