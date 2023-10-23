namespace webapi.Models.Expanses
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Expanse> Expanses { get; set; }
    }
}
