using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using webapi.Data;
using webapi.Models.Flowers;

namespace webapi.Services
{
    public class ColorService
    {
        private readonly DataContext _context;

        public ColorService(DataContext context)
        {
            _context=context;
        }
        //добавление цвета
        public Color AddColor(Color color)
        {
            color.ColorName = color.ColorName.Trim();
            _context.Colors.Add(color);
            _context.SaveChanges();
            return color;
        }
        //получение списка цветов
        public async Task<ActionResult<IEnumerable<Color>>> ListColors()
        {
            return await _context.Colors.ToListAsync();
        }
        //получение цвета по id
        public async Task<Color> GetColor(int id) {
            var color = _context.Colors.FindAsync(id);
            return await color;
        }


        //удаление цвета
        public  Color DeleteColor(int id) {
            var color = _context.Colors.Find(id);
            if (color == null) return null;
            _context.Colors.Remove(color);
            _context.SaveChanges();
            return color;        
        }
        //редактирование цвета 
        public Color UpdateColor(int id, Color color) { 
            _context.Entry(color).State = EntityState.Modified;
            _context.SaveChanges(); 
            return color;   
        }

        //
    }
}
