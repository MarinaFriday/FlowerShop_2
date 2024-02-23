using webapi.Models.Flowers;

namespace webapi.Models.Bouquet
{
    public class Bouquet
    {
        public int Id {get; set;}
        public string BouquetName { get; set;} 
        public string BouquetDescription { get; set;}  
        public string BouquetAvailability { get; set; }
        public int BouquetPrice { get; set; }
        public ICollection<Image>? Images { get; set; }

    }
}
