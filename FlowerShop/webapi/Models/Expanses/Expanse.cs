namespace webapi.Models.Expanses
{
    public class Expanse
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }  
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
