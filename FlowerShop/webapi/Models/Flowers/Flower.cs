using System.Reflection;
using System.Text.Json.Serialization;

namespace webapi.Models.Flowers
{
    public class Flower
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        //количество
        public int Count { get; set; }
        //public int? ImageId { get; set; }

        public ICollection<Image>? Images { get; set; }
        public int ColorId { get; set; }      
        public Color? Color { get; set; } 
        public int CategoryId { get; set; } 
        public FlowerCategory? Category { get; set; } 
        public int CountryId { get; set; }
        public Country? Country { get; set; }
        public ICollection<FlowersProviders>? FlowersProviders { get; set; }  
        public ICollection<FlowersShipments>? FlowersShipments { get; set; }

    }
}
