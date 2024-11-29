public class PropertyDTO
{
    public int Id { get; set; }
    public string Name { get; set; } // Property name, e.g., "Lusaka Complex"
    public string Address { get; set; } // Physical address
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<MachineDTO> Machines { get; set; } // Machines in the property
}