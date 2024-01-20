namespace webapi.Models.Flowers
{
    public class Color
    {
        public int Id { get; set; }
        public string ColorName { get; set; }
        public ICollection<Flower>? Flowers { get; set; }
    }
}
