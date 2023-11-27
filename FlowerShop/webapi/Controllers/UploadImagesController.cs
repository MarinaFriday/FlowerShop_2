using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using webapi.Data;
using webapi.Models.Flowers;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadImagesController : ControllerBase
    {
        private DataContext _context;
        
        IWebHostEnvironment _appEnvironment;

        public UploadImagesController(DataContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }
        [HttpPost]
        public async Task<IActionResult> UploadImages(IList<IFormFile> images, Flower flower) {
                if (images.Count != 0) {
                //фомируется путь к изображению
                foreach (var img in images) {
                    string path = "/images/" + img.FileName;
                    //сохранение изображения в папку images в каталоге wwwroot
                    using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create)) {
                            await img.CopyToAsync(fileStream);
                    }
                }
                
                
                //        flower.Images.Add(img);
                //        //await _context.Images.AddAsync(img);
            }            

            return Ok();
        }

    }
}
