using System.Text.Json.Serialization;

namespace webapi.Models.Flowers
{
    public class FlowerCategory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        [JsonIgnore]
        public ICollection<Flower>? Flowers { get; set; }
    }
}
