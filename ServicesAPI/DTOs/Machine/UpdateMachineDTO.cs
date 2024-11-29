public class UpdateMachineDTO
{
    public string Name { get; set; } // e.g., "Machine 01"
    public string QrCodeUrl { get; set; } // Link to the payment webpage
    public string Status { get; set; } // Available, Busy, Maintenance
    public int PropertyId { get; set; } // Foreign key to Property
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}