public class Payment
{
    public int Id { get; set; }
    public int UserId { get; set; } // Foreign key to User
    public User User { get; set; } // Navigation property
    public int MachineId { get; set; } // Foreign key to Machine 
    public Machine Machine { get; set; } // Navigation property
    public decimal Amount { get; set; } // Amount paid
    public string Currency { get; set; } = "ZMW"; // Default currency
    public string PaymentType {get; set;} = "Airtel"; // MTN, Zamtel
    public string ReferenceId { get; set; } // Airtel payment reference
    public string Status { get; set; } = "pending"; // Pending, Confirmed, Failed
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public DateTime? VerifiedAt { get; set; } // Timestamp for confirmation
}