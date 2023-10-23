using System.Globalization;

namespace webapi.Models.Sales
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Sale> Sales { get; set; }
    }
}
