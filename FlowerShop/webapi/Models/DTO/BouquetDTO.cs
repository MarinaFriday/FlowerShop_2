namespace webapi.Models.DTO
{
    public class BouquetDTO
    {
        public int Id { get; set; }
        public string BouquetName { get; set; }
        public string BouquetDescription { get; set; }
        public bool BouquetAvailability { get; set; }
        public int BouquetPrice { get; set; }
        public ICollection<int>? ImagesId { get; set; }
    }
}
