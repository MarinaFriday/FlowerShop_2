using System.Text.Json.Serialization;


namespace webapi.Models.Flowers
{
    public class Image
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public int? FlowerId { get; set; }
        public int? CompositionId { get; set; }
        public int? BouquetId { get; set; }

        [JsonIgnore]
        public Flower? Flower { get; set; }

        [JsonIgnore]
        public Composition.Composition? Composition { get; set; }

        [JsonIgnore]
        public Bouquet.Bouquet? Bouquet { get; set; }

    }
}
