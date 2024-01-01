using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Flowers;
using webapi.Services;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadImagesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UploadImagesController(DataContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context=context;
            _webHostEnvironment = webHostEnvironment;
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetAllImages()
        {            
            return await _context.Images.ToListAsync(); 
        }

        //POST
        [HttpPost]
        public async Task<ActionResult<IEnumerable<int>>> PostUploadImages(IEnumerable<IFormFile> images)
        {
            List<int> imgId = new List<int>();
            if (images != null)
            {
                foreach (var image in images)
                {
                    string imagePath = "/images/" + image.FileName;
                    using (var fileStream = new FileStream(_webHostEnvironment.WebRootPath+imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                    Image img = new Image { ImagePath = imagePath };
                    Console.WriteLine(img.ImagePath);
                    await _context.Images.AddAsync(img);
                    await _context.SaveChangesAsync();
                    var imgIdDb = await _context.Images.FirstOrDefaultAsync(imgDB => imgDB.ImagePath==img.ImagePath);
                    Console.WriteLine(imgIdDb.Id + " " + imgIdDb.ImagePath);
                    imgId.Add(imgIdDb.Id);
                }

                foreach (var imageId in imgId)
                {
                    Console.WriteLine(imageId + ",");
                }
            }
            else return Problem("Ошибка отправки изображений");

            return Ok(imgId);
        }
    }
}