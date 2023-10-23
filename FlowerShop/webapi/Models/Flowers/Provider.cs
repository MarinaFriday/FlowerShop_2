using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace webapi.Models.Flowers
{
    public class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<FlowersProviders> FlowersProviders { get; set; }
        public ICollection<Shipment> Shipments { get; set; }

    }
}
