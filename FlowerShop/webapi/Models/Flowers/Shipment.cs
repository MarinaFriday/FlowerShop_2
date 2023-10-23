namespace webapi.Models.Flowers
{
    public class Shipment
    {
        public int Id { get; set; }
        public decimal Cost { get; set; }
        public DateTime Date { get; set; }
        public int ProviderId { get; set; }
        public Provider Provider { get; set; }
        public ICollection<FlowersShipments>? FlowersShipments { get; set; }
    }
}
