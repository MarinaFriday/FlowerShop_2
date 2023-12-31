﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Diagnostics.Eventing.Reader;
using webapi.Data;
using webapi.Models.Flowers;
using System.Threading.Tasks;

namespace webapi.Services
{
    public class FlowerService
    {
        private DataContext _context;
        public FlowerService(DataContext context) {
            _context=context;
        }
        //Добавление цветка
        public async Task<ActionResult<Flower>> AddFlower(Flower flower) 
        { 
            flower.Title = flower.Title.Trim();
            var color = _context.Colors.FindAsync(flower.ColorId);
            if (color != null) flower.Color = color.Result;
            var country = _context.Countries.FindAsync(flower.CountryId);
            if (country != null) flower.Country = country.Result;
            var category = _context.FlowersCategories.FindAsync(flower.CategoryId);
            if (category != null) flower.Category = category.Result;
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
                .ToListAsync();
        }
        //Получение цветка по id
        public async Task<ActionResult<Flower>> GetFlower(int id) {
            var flower = await _context.Flowers.FindAsync(id);
            if (id != flower.Id) return null;
            return flower;  
        }
        //Обновление цветка 
        public async Task<Flower> UpdateFlower(int id, Flower flower) { 
            _context.Entry(flower).State = EntityState.Modified; 
            await _context.SaveChangesAsync();  
            return flower;  
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
