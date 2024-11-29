public class Payment
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; }
    public string ReferenceId { get; set; }
    public string Status { get; set; }
    public DateTime PaymentDate { get; set; }
    public DateTime? VerifiedAt { get; set; }
    public int? UserId { get; set; } // Make UserId nullable
    public User User { get; set; }
    public int MachineId { get; set; }
    public Machine Machine { get; set; }
}
