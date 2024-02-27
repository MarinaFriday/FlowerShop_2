using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Models.Flowers;
using webapi.Services;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using System.Net;
using Microsoft.AspNetCore.Hosting.Server;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Authorization;

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
            return Ok(await _context.Images.ToListAsync()); 
        }

        //POST
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IEnumerable<int>>> PostUploadImages(IEnumerable<IFormFile> images)
        {
            List<int> imgId = new List<int>();
            if (images != null)
            {
                foreach (var image in images)
                {
                    string date = DateTime.Now.ToString();
                    date = date.Replace(".", string.Empty);
                    date = date.Replace(":", string.Empty);
                    string imagePath = "/images/" + date + image.FileName;
                    using (var fileStream = new FileStream(_webHostEnvironment.WebRootPath+imagePath, FileMode.Create))
                    {
                        await image.CopyToAsync(fileStream);
                    }
                    Image img = new Image { ImagePath = imagePath };
                    //Console.WriteLine(img.ImagePath);
                    await _context.Images.AddAsync(img);
                    await _context.SaveChangesAsync();
                    var imgIdDb = await _context.Images.FirstOrDefaultAsync(imgDB => imgDB.ImagePath==img.ImagePath);
                    //Console.WriteLine(imgIdDb.Id + " " + imgIdDb.ImagePath);
                    imgId.Add(imgIdDb.Id);
                }

                //foreach (var imageId in imgId)
                //{
                //    Console.WriteLine(imageId + ",");
                //}
            }
            else return Problem("Ошибка отправки изображений");
            //code 200
            return Ok(imgId);
        }

        //DELETE
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null) return NotFound();
            DirectoryInfo directory = new DirectoryInfo(_webHostEnvironment.WebRootPath+"/images/");
            var files = directory.GetFiles().ToList();

            foreach (var deletedFile in files)
            {
                Console.WriteLine("Путь из FileInfo");
                Console.WriteLine(deletedFile);
                string deleteFileString = deletedFile.ToString();               
                deleteFileString = deleteFileString.Replace("\\","/");
                Console.WriteLine("Измененный путь из FileInfo");
                Console.WriteLine(deleteFileString);
                Console.WriteLine("Путь из БД");
                Console.WriteLine(image.ImagePath);                
                bool imagePathDbInDirectoryPath = deleteFileString.Contains(image.ImagePath);
                Console.WriteLine(imagePathDbInDirectoryPath);

                if (deleteFileString.Contains(image.ImagePath))
                {
                    try
                    {
                        System.IO.File.Delete(deletedFile.FullName);
                        Console.WriteLine("Файл удален с сервера");
                        break;
                    }
                    catch (Exception e)
                    {
                        return Problem("Error" + e);
                    }
                    
                }
            }                                        
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();           
            return Ok("Изображение удалено из базы данных");
        }
    }
}