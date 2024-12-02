public class Machine
{
    public int Id { get; set; }
    public string Name { get; set; } // e.g., "Machine 01"
    public string QrCodeUrl { get; set; } // Link to the payment webpage
    public string? Status { get; set; } = "Available"; // Available, Busy, Maintenance
    public int PropertyId { get; set; } // Foreign key to Property
    public Property Property { get; set; } // Navigation property
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Payment> Payments { get; set; } // Related payments
}