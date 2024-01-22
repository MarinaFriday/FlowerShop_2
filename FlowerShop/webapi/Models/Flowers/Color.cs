using System.Text.Json.Serialization;

namespace webapi.Models.Flowers
{
    public class Color
    {
        public int Id { get; set; }
        public string ColorName { get; set; }
        [JsonIgnore]
        public ICollection<Flower>? Flowers { get; set; }
    }
}
