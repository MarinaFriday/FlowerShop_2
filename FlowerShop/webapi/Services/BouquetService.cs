using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models.Bouquet;
using webapi.Models.Composition;
using webapi.Models.DTO;
using webapi.Models.Flowers;

namespace webapi.Services
{
    public class BouquetService
    {
        private readonly DataContext _context;
        public BouquetService(DataContext context)
        {
            _context = context;
        }

        //Добавление букета через DTO
        public async Task<Bouquet> AddBouquet(BouquetDTO bouquetDTO)
        {
            var bouquet = new Bouquet();
            bouquet.BouquetName = bouquetDTO.BouquetName;
            bouquet.BouquetDescription = bouquetDTO.BouquetDescription;
            bouquet.BouquetAvailability = bouquetDTO.BouquetAvailability;
            bouquet.BouquetDescription = bouquetDTO.BouquetDescription;
            if (bouquetDTO.ImagesId != null)
            {
                bouquet.Images = new List<Image>();
                foreach (var imageId in bouquetDTO.ImagesId)
                {
                    try
                    {
                        var image = await _context.Images.FindAsync(imageId);
                        if (image != null) bouquet.Images.Add(image);
                    }
                    catch
                    {
                        throw new Exception("Неудалось загрузить изображение");
                    }
                }
            }
            await _context.Bouquets.AddAsync(bouquet);
            await _context.SaveChangesAsync();
            return bouquet;
        }

        //Чтение списка букетов
        public async Task<IEnumerable<Bouquet>> ReadAllBouquets()
        {
            return await _context.Bouquets.ToListAsync();
        }

        //Чтение букета по id
        public async Task<Bouquet> ReadBouquetById(int id)
        {
            var bouquet = await _context.Bouquets.FindAsync(id);
            if (bouquet == null) throw new Exception("Букета с данным id не существует");
            List<Image> images = _context.Images.Where(i => i.BouquetId == bouquet.Id).ToList();
            bouquet.Images = images;
            return bouquet;
        }

        //Редактирование букета
        public async Task<Bouquet> EditBouquet(int id, BouquetDTO bouquetDTO)
        {
            if (id != bouquetDTO.Id) throw new Exception("Переданные Id и Id букета не совпадают! Проверьте отправляемые данные");
            var bouquet = _context.Bouquets.FirstOrDefault(bouquet => bouquet.Id == id);
            if (bouquet == null) throw new Exception("Букет не найден");
            bouquet.BouquetName = bouquetDTO.BouquetName;
            bouquet.BouquetDescription = bouquetDTO.BouquetDescription;
            bouquet.BouquetAvailability = bouquetDTO.BouquetAvailability;
            bouquet.BouquetPrice = bouquet.BouquetPrice;
            await _context.SaveChangesAsync();
            return bouquet;
        }

        //Удаление букета
        public async Task DeleteBouquetById(int id)
        {
            var bouquet = await ReadBouquetById(id);
            _context.Bouquets.Remove(bouquet);
            await _context.SaveChangesAsync();
        }

    }
}
