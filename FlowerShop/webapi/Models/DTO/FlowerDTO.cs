using webapi.Models.Flowers;

namespace webapi.Models.DTO
{
    public class FlowerDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
        public ICollection<int>? ImagesId { get; set; }
        public int ColorId { get; set; }
        public int CategoryId { get; set; }
        public int CountryId { get; set; }
        public ICollection<int>? FlowersProvidersId { get; set; }
        public ICollection<int>? FlowersShipmentsId { get; set; }
    }
}
