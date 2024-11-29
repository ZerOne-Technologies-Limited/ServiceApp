public class CreateMachineDTO
{
    public string Name { get; set; } // e.g., "Machine 01"
    public string QrCodeUrl { get; set; } // Link to the payment webpage
    public int PropertyId { get; set; } // Foreign key to Property
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}