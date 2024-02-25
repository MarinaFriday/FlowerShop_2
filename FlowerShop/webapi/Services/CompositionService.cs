using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models.Composition;
using webapi.Models.DTO;
using webapi.Models.Flowers;

namespace webapi.Services
{
    public class CompositionService 
    {
        private readonly DataContext _context;
        public CompositionService(DataContext context) {
            _context = context;
        }

        //Добавление композиции через DTO
        public async Task<Composition> AddComposition(CompositionDTO compositionDTO) { 
            var composition = new Composition();
            composition.CompositionName = compositionDTO.CompositionName;
            composition.CompositionDescription = compositionDTO.CompositionDescription;
            composition.CompositionPrice = compositionDTO.CompositionPrice;
            composition.CompositionAvailability = compositionDTO.CompositionAvailability;
            if (compositionDTO.ImagesId != null)
            {
                composition.Images = new List<Image>();
                foreach (var imageId in compositionDTO.ImagesId)
                {
                    try
                    {
                        var image = await _context.Images.FindAsync(imageId);
                        if (image != null) composition.Images.Add(image);
                    }
                    catch {
                        throw new Exception("Неудалось загрузить изображение");
                    }
                }
            }
            await _context.Compositions.AddAsync(composition);
            await _context.SaveChangesAsync();
            return composition;
        }

        //Чтение списка композиций
        public async Task<IEnumerable<Composition>> ReadAllCompositions() {
            return await _context.Compositions
                .Include(composition => composition.Images)
                .ToListAsync();
        }

        //Чтение композиции по id
        public async Task<Composition> ReadCompositionById(int id)
        {
            var composition = await _context.Compositions.FindAsync(id);
            if (composition == null) throw new Exception("Композиции с данным id не существует");
            List<Image> images = _context.Images.Where(i => i.CompositionId == composition.Id).ToList();
            composition.Images = images;
            return composition;
        }

        //Редактирование композиции
        public async Task<Composition> EditComposition(int id, CompositionDTO compositionDTO) {
            if (id != compositionDTO.Id) throw new Exception("Переданные Id и Id композиции не совпадают! Проверьте отправляемые данные");
            var composition = _context.Compositions.FirstOrDefault(composition => composition.Id == id);
            if (composition == null) throw new Exception("Композиция не найдена");
            composition.CompositionName = compositionDTO.CompositionName;
            composition.CompositionDescription = compositionDTO.CompositionDescription;
            composition.CompositionAvailability = compositionDTO.CompositionAvailability;
            composition.CompositionPrice = compositionDTO.CompositionPrice;
            await _context.SaveChangesAsync();
            return composition;
        }

        //Удаление композиции 
        public async Task DeleteCompositionById(int id) {
            var composition = await ReadCompositionById(id);
            _context.Compositions.Remove(composition);  
            await _context.SaveChangesAsync();
        }

    }
}
