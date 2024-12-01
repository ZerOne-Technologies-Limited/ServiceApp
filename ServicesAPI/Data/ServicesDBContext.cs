using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


public class ServicesDBContext : IdentityDbContext<IdentityUser>
{
    public DbSet<Machine> Machines { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Property> Properties { get; set; }
    public DbSet<User> Users { get; set; }

    public ServicesDBContext(DbContextOptions<ServicesDBContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configuring the Machine entity
        modelBuilder.Entity<Machine>(entity =>
        {
            entity.HasKey(m => m.Id); // Primary Key
            entity.Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(255); // Machine name is required and max length is 255
            entity.Property(m => m.QrCodeUrl)
                .IsRequired(); // QR code URL is required
            entity.Property(m => m.Status)
                .IsRequired()
                .HasMaxLength(50); // Status has a max length of 50
            entity.HasOne(m => m.Property) // One-to-Many relationship with Property
                .WithMany(p => p.Machines)
                .HasForeignKey(m => m.PropertyId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete
        });

        // Configuring the Payment entity
        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(p => p.Id); // Primary Key
            entity.Property(p => p.Amount)
                .HasColumnType("decimal(18,2)") // Precision for Amount
                .IsRequired(); // Amount is required
            entity.Property(p => p.Currency)
                .IsRequired()
                .HasMaxLength(10); // Currency has a max length of 10
            entity.Property(p => p.ReferenceId)
                .IsRequired()
                .HasMaxLength(255); // Reference ID is required
            entity.Property(p => p.Status)
                .IsRequired()
                .HasMaxLength(50); // Status has a max length of 50
            entity.HasOne(p => p.User) // One-to-Many relationship with User
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.SetNull); // Set null if user is deleted
            entity.HasOne(p => p.Machine) // One-to-Many relationship with Machine
                .WithMany(m => m.Payments)
                .HasForeignKey(p => p.MachineId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete
        });

        // Configuring the Property entity
        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(p => p.Id); // Primary Key
            entity.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255); // Property name is required and max length is 255
            entity.Property(p => p.Address)
                .IsRequired(); // Address is required
            entity.HasMany(p => p.Machines) // One-to-Many relationship with Machines
                .WithOne(m => m.Property)
                .HasForeignKey(m => m.PropertyId)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete
        });

        // Configuring the User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id); // Primary Key
            entity.Property(u => u.Phonenumber)
                .IsRequired()
                .HasMaxLength(20); // Phone number is required and has a max length of 20
            entity.HasMany(u => u.Payments) // One-to-Many relationship with Payments
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.SetNull); // Set null if user is deleted
        });
    }
}