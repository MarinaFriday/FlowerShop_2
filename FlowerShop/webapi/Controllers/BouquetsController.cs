using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Bouquet;
using webapi.Models.Composition;
using webapi.Models.DTO;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BouquetsController : ControllerBase
    {
        private readonly DataContext _context;
        private BouquetService bouquetService;

        public BouquetsController(DataContext context)
        {
            _context = context;
            bouquetService = new BouquetService(context);
        }

        //POST 
        [HttpPost]
        public async Task<ActionResult<Bouquet>> PostBouquet(BouquetDTO bouquetDTO)
        {
            try
            {
                var result = await bouquetService.AddBouquet(bouquetDTO);
                return result == null ? BadRequest("Ошибка в добавлении букета") : Ok(result);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bouquet>>> GetBouquet()
        {
            try
            {
                var bouquetList = await bouquetService.ReadAllBouquets();
                if (bouquetList != null) return Ok(bouquetList);
                else return NoContent();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Bouquet>> GetBouquetById(int id)
        {
            try
            {
                var result = await bouquetService.ReadBouquetById(id);
                if (result != null) return Ok(result);
                else return NoContent();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //PUT
        [HttpPut("{id}")]
        public async Task<ActionResult<Bouquet>> PutBouquet(int id, BouquetDTO bouquetDTO)
        {
            try
            {
                var result = await bouquetService.EditBouquet(id, bouquetDTO);
                return Ok(result);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBouquet(int id)
        {
            try
            {
                await bouquetService.DeleteBouquetById(id);
                return Ok("Букет удален");
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

    }
}
