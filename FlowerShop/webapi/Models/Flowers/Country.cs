namespace webapi.Models.Flowers
{
    public class Country
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ICollection<Flower>? Flowers { get; set; }
    }
}
