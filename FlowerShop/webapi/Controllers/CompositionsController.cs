using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Composition;
using webapi.Models.DTO;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompositionsController : ControllerBase
    {
        private readonly DataContext _context;
        private CompositionService compositionService;
        public CompositionsController(DataContext context) {
            _context = context;
            compositionService = new CompositionService(context);
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Composition>>> GetComposition() {
            try
            {
                var compositionList = await compositionService.ReadAllCompositions();
                if (compositionList != null) return Ok(compositionList);
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
        public async Task<ActionResult<Composition>> GetCompositionById(int id)
        {
            try
            {
                var result = await compositionService.ReadCompositionById(id);
                if (result != null) return Ok(result);
                else return NoContent();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //POST 
        [HttpPost]
        public async Task<ActionResult<Composition>> PostComposition(CompositionDTO compositionDTO)
        {
            try
            {
                var result = await compositionService.AddComposition(compositionDTO);
                return result == null ? BadRequest("Ошибка в добавлении композиции") : Ok(result);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //PUT
        [HttpPut("{id}")]
        public async Task<ActionResult<Composition>> PutCompositon(int id, CompositionDTO compositionDTO)
        {
            try {
                var result = await compositionService.EditComposition(id, compositionDTO);
                return Ok(result);
            }
            catch (Exception exception) {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

        //DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComposition(int id)
        {
            try
            {
                await compositionService.DeleteCompositionById(id);
                return Ok("Композиция удалена");
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                return BadRequest(exception.Message);
            }
        }

    }
}
