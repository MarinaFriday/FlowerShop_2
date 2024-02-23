using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics.Eventing.Reader;
using webapi.Data;
using webapi.Models.Flowers;
using System.Threading.Tasks;
using webapi.Models.DTO;
using webapi.Controllers;
using Microsoft.AspNetCore.Server.IIS.Core;
using webapi.Models.User;

namespace webapi.Services
{
    public class FlowerService
    {
        private readonly DataContext _context;
        public FlowerService(DataContext context) {
            _context=context;
        }       

        //Добавление цветка через DTO
        public async Task<Flower> AddFlower(FlowerDTO flowerDTO) {
            var flower = new Flower();              
            flower.Title = flowerDTO.Title.Trim();
            flower.Price = flowerDTO.Price;
            flower.Count = flowerDTO.Count;
            if (flowerDTO.ImagesId != null)
            {
                flower.Images = new List<Image>();
                foreach (var imageId in flowerDTO.ImagesId)
                {                    
                    try
                    {
                        var image = await _context.Images.FindAsync(imageId);
                        if (image != null) flower.Images.Add(image);
                    }
                    catch
                    {
                        throw new Exception("Неудалось загрузить изображение");
                    }
                }
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
        public async Task<IEnumerable<Flower>> ListFlowers() 
        {
            return await _context.Flowers
                .Include(flower=>flower.Color)
                .Include(flower => flower.Country)
                .Include(flower =>flower.Category)
                .Include(flower => flower.Images)
                .ToListAsync();
        }

        //Получение цветка по id
        public async Task<Flower> GetFlowerById(int id) {            
            var flower = await _context.Flowers.FindAsync(id);
            if (flower == null) throw new Exception("Цветка с данным id не существует");
            List<Image> images =  _context.Images.Where(i => i.FlowerId == flower.Id).ToList();
            flower.Images = images;
            return flower;  
        }

        //Обновление цветка 
        public async Task<Flower> EditFlower(int id, FlowerDTO flowerDTO) {
            if (id != flowerDTO.Id) throw new Exception("Переданные Id и Id цветка не совпадают! Проверьте отправляемые данные");
            var flowerDb = _context.Flowers.FirstOrDefault(flowerDb => flowerDb.Id == id);
            if (flowerDb == null) throw new Exception("Цветок не найден");
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
            await _context.SaveChangesAsync();  
            return flowerDb;  

        }

        //Удаление цветка
        public async Task DeleteFlower(int id) {
            var flower = await GetFlowerById(id);            
            _context.Flowers.Remove(flower);
            await _context.SaveChangesAsync();           
        }

        
    }
}
