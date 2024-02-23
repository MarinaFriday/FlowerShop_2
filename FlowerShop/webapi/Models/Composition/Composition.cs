using webapi.Models.Flowers;

namespace webapi.Models.Composition
{
    public class Composition
    {
        public int Id { get; set; }
        public string CompositionName { get; set; }
        public string CompositionDescription { get; set; }
        public bool CompositionAvailability { get; set; }
        public int CompositionPrice { get; set; }
        public ICollection<Image>? Images { get; set; }

    }
}
