/*using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Validations;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using webapi.Data;
using webapi.Models.Flowers;


namespace webapi.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    [ApiController]
    public class ShipmentController : ControllerBase
    {
        private readonly DataContext _context;
        public ShipmentController(DataContext context) {
            _context = context;
        }
        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipment>>> GetShipments() {
            return await _context.Shipments.ToListAsync();
        }
        //GET {id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Shipment>> GetShipment(int id) {
            var shipment = await _context.Shipments.FindAsync(id);
            if (shipment == null) NotFound();
            return shipment;
        }
        //PUT {id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShipment(int id, Shipment shipment) {
            if (id != shipment.Id) BadRequest();
            _context.Entry(shipment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }
        //POST
        public async Task<ActionResult<Shipment>> PostShipment(Shipment shipment) {
            await _context.Shipments.AddAsync(shipment);
            await _context.SaveChangesAsync();
            return Ok();
        }
        //DELETE {id}
        public async Task<IActionResult> DeleteShipment(int id) {
            var shipment = await _context.Shipments.FindAsync(id);
            if (shipment==null) NotFound();
            _context.Shipments.Remove(shipment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
*/