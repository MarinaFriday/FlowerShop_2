namespace webapi.Models.Flowers
{
    public class FlowersShipments
    {
        public int FlowerId { get; set; }
        public int ShipmentId { get; set; }
        public Flower Flower { get; set; }
        public Shipment Shipment { get; set; }
    }
}
