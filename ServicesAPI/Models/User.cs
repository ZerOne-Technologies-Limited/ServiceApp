public class User
{
    public int Id { get; set; }
    public string Phonenumber { get; set; } // Username for login
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
    public ICollection<Payment> Payments { get; set; } // Payments made
}