namespace webapi.Models.Flowers
{
    public class Image
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public int? FlowerId { get; set; }
        public Flower? Flower { get; set; }

    }
}
