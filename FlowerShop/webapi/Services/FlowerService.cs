using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics.Eventing.Reader;
using webapi.Data;
using webapi.Models.Flowers;
using System.Threading.Tasks;
using webapi.Models.DTO;
using webapi.Controllers;

namespace webapi.Services
{
    public class FlowerService
    {
        private DataContext _context;
        public FlowerService(DataContext context) {
            _context=context;
        }       

        //Добавление цветка через DTO
        public async Task<ActionResult<Flower>> AddFlower(FlowerDTO flowerDTO) {
            var flower = new Flower();              
            flower.Title = flowerDTO.Title.Trim();
            flower.Price = flowerDTO.Price;
            flower.Count = flowerDTO.Count;
            
                flower.Images = new List<Image>();
                foreach (var imageId in flowerDTO.ImagesId)
                {
                    Console.WriteLine(imageId);
                    try
                    {
                        var image = await _context.Images.FindAsync(imageId);
                        if (image != null) flower.Images.Add(image);
                    }
                    catch { Console.WriteLine("Возникло исключение"); }
                }
            
            flower.ColorId = flowerDTO.ColorId;
            var color = await _context.Colors.FindAsync(flower.ColorId);
                if (color != null) flower.Color = color;
            flower.CategoryId = flowerDTO.CategoryId;
            var category = await _context.FlowersCategories.FindAsync(flower.CategoryId);
                if (category != null) flower.Category = category;
            flower.CountryId = flowerDTO.CountryId;
            var country = await _context.Countries.FindAsync(flower.CountryId);
                if(country != null) flower.Country = country;    
            await _context.Flowers.AddAsync(flower);
            await _context.SaveChangesAsync();
            return flower;
        }

        //Получение списка цветов
        public async Task<ActionResult<IEnumerable<Flower>>> ListFlowers() 
        {
            return await _context.Flowers
                .Include(flower=>flower.Color)
                .Include(flower => flower.Country)
                .Include(flower =>flower.Category)
                .Include(flower => flower.Images)
                .ToListAsync();
        }
        //Получение цветка по id
        public async Task<ActionResult<Flower>> GetFlower(int id) {            
            var flower = await _context.Flowers.FindAsync(id);
            if (id != flower.Id) return null;
            List<Image> images =  _context.Images.Where(i => i.FlowerId == flower.Id).ToList();
            flower.Images = images;
            return flower;  
        }

        //Обновление цветка 
        public async Task<ActionResult<Flower>> UpdateFlower(int id, FlowerDTO flowerDTO) {
            var flowerDb = _context.Flowers.FirstOrDefault(flowerDb => flowerDb.Id == id);
            if (flowerDb == null) return null;
            flowerDb.Title = flowerDTO.Title.Trim();
            flowerDb.Price = flowerDTO.Price;
            flowerDb.Count = flowerDTO.Count;
            flowerDb.ColorId = flowerDTO.ColorId;
            var color = _context.Colors.FirstOrDefault(color => color.Id == flowerDb.ColorId);
            if(color!=null) flowerDb.Color = color;
            flowerDb.CategoryId = flowerDTO.CategoryId;
            var category = _context.FlowersCategories.FirstOrDefault(category => category.Id == flowerDb.CategoryId);
            if (category != null) flowerDb.Category = category;
            flowerDb.CountryId = flowerDTO.CountryId;
            var country = _context.Countries.FirstOrDefault(country => country.Id == flowerDb.CountryId);
            if (country != null) flowerDb.Country = country;       
            //_context.Entry(flowerDb).State = EntityState.Modified;
            await _context.SaveChangesAsync();  
            return flowerDb;  

        }
        //Удаление цветка
        public Flower DeleteFlower(int id) {
            var flower =  _context.Flowers.Find(id);
            if (flower == null) return null;
            _context.Flowers.Remove(flower);
            _context.SaveChanges();
            return flower;
        }

        
    }
}
