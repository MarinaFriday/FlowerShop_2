namespace webapi.Models.DTO
{
    public class CompositionDTO
    {
        public int Id { get; set; }
        public string CompositionName { get; set; }
        public string CompositionDescription { get; set; }
        public bool CompositionAvailability { get; set; }
        public int CompositionPrice { get; set; }
        public ICollection<int>? ImagesId { get; set; }
    }
}
