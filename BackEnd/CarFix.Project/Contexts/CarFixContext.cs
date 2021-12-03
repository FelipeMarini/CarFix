using CarFix.Project.Domains;
using Microsoft.EntityFrameworkCore;

namespace CarFix.Project.Contexts
{
    public class CarFixContext : DbContext
    {
        public CarFixContext(DbContextOptions<CarFixContext> options) : base(options)
        {

        }

        // Tables
        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServiceImage> ServiceImages { get; set; }

        // Modelling
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Users
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<User>().Property(x => x.Id);

            modelBuilder.Entity<User>().Property(x => x.Username).HasMaxLength(30);
            modelBuilder.Entity<User>().Property(x => x.Username).HasColumnType("varchar(30)");
            modelBuilder.Entity<User>().Property(x => x.Username).IsRequired();

            modelBuilder.Entity<User>().Property(x => x.Email).HasMaxLength(60);
            modelBuilder.Entity<User>().Property(x => x.Email).HasColumnType("varchar(60)");
            modelBuilder.Entity<User>().Property(x => x.Email).IsRequired();

            modelBuilder.Entity<User>().Property(x => x.Password).HasMaxLength(200);
            modelBuilder.Entity<User>().Property(x => x.Password).HasColumnType("varchar(200)");
            modelBuilder.Entity<User>().Property(x => x.Password).IsRequired();

            modelBuilder.Entity<User>().Property(x => x.PhoneNumber).HasMaxLength(30);
            modelBuilder.Entity<User>().Property(x => x.PhoneNumber).HasColumnType("varchar(30)");
            modelBuilder.Entity<User>().Property(x => x.PhoneNumber).IsRequired();

            modelBuilder.Entity<User>().Property(x => x.UserType).HasMaxLength(20);
            modelBuilder.Entity<User>().Property(x => x.UserType).HasColumnType("varchar(20)");
            modelBuilder.Entity<User>().Property(x => x.UserType).IsRequired();

            modelBuilder.Entity<User>().Property(x => x.CreationDate).HasColumnType("DateTime");
            #endregion

            #region Vehicles
            modelBuilder.Entity<Vehicle>().ToTable("Vehicles");

            modelBuilder.Entity<Vehicle>().Property(x => x.Id);

            modelBuilder.Entity<Vehicle>().Property(x => x.LicensePlate).HasMaxLength(30);
            modelBuilder.Entity<Vehicle>().Property(x => x.LicensePlate).HasColumnType("varchar(30)");
            modelBuilder.Entity<Vehicle>().Property(x => x.LicensePlate).IsRequired();

            modelBuilder.Entity<Vehicle>().Property(x => x.ModelName).HasMaxLength(60);
            modelBuilder.Entity<Vehicle>().Property(x => x.ModelName).HasColumnType("varchar(60)");
            modelBuilder.Entity<Vehicle>().Property(x => x.ModelName).IsRequired();

            modelBuilder.Entity<Vehicle>().Property(x => x.BrandName).HasMaxLength(50);
            modelBuilder.Entity<Vehicle>().Property(x => x.BrandName).HasColumnType("varchar(50)");
            modelBuilder.Entity<Vehicle>().Property(x => x.BrandName).IsRequired();

            modelBuilder.Entity<Vehicle>().Property(x => x.Year).HasColumnType("int");
            modelBuilder.Entity<Vehicle>().Property(x => x.Year).IsRequired();

            modelBuilder.Entity<Vehicle>().Property(x => x.Color).HasMaxLength(20);
            modelBuilder.Entity<Vehicle>().Property(x => x.Color).HasColumnType("varchar(20)");
            modelBuilder.Entity<Vehicle>().Property(x => x.Color).IsRequired();

            modelBuilder.Entity<Vehicle>().Property(x => x.VehicleImage).HasMaxLength(200);
            modelBuilder.Entity<Vehicle>().Property(x => x.VehicleImage).HasColumnType("varchar(200)");

            modelBuilder.Entity<Vehicle>()
                .HasOne(u => u.User)
                .WithMany(v => v.Vehicles)
                .HasForeignKey(f => f.IdUser);

            #endregion
            
            #region Budgets
            modelBuilder.Entity<Budget>().ToTable("Budgets");

            modelBuilder.Entity<Budget>().Property(x => x.Id);

            modelBuilder.Entity<Budget>().Property(x => x.TotalValue).HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Budget>().Property(x => x.TimeEstimate).HasColumnType("int");

            modelBuilder.Entity<Budget>().Property(x => x.VisitDate).HasColumnType("datetime");

            modelBuilder.Entity<Budget>().Property(x => x.FinalizationDate).HasColumnType("datetime");

            modelBuilder.Entity<Budget>().Property(x => x.CreationDate).HasColumnType("datetime");

            modelBuilder.Entity<Budget>()
                .HasOne<Vehicle>(u => u.Vehicle)
                .WithOne(b => b.Budget)
                .HasForeignKey<Budget>(f => f.IdVehicle);

            #endregion

            #region ServiceTypes
            modelBuilder.Entity<ServiceType>().ToTable("ServiceTypes");

            modelBuilder.Entity<ServiceType>().Property(x => x.Id);

            modelBuilder.Entity<ServiceType>().Property(x => x.TypeName).HasMaxLength(50);
            modelBuilder.Entity<ServiceType>().Property(x => x.TypeName).HasColumnType("varchar(50)");
            modelBuilder.Entity<ServiceType>().Property(x => x.TypeName).IsRequired();

            modelBuilder.Entity<ServiceType>().Property(x => x.CreationDate).HasColumnType("datetime");

            #endregion

            #region Services
            modelBuilder.Entity<Service>().ToTable("Services");

            modelBuilder.Entity<Service>().Property(x => x.Id);

            modelBuilder.Entity<Service>().Property(x => x.ServiceDescription).HasMaxLength(50);
            modelBuilder.Entity<Service>().Property(x => x.ServiceDescription).HasColumnType("varchar(50)");

            modelBuilder.Entity<Service>().Property(x => x.Price).HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Service>().Property(x => x.Observations).HasMaxLength(200);
            modelBuilder.Entity<Service>().Property(x => x.Observations).HasColumnType("varchar(200)");

            modelBuilder.Entity<Service>().Property(x => x.ServiceStatus).HasMaxLength(20);
            modelBuilder.Entity<Service>().Property(x => x.ServiceStatus).HasColumnType("varchar(20)");

            modelBuilder.Entity<Service>().Property(x => x.CreationDate).HasColumnType("datetime");

            modelBuilder.Entity<Service>()
                .HasOne<ServiceType>(u => u.ServiceType)
                .WithMany(b => b.Services)
                .HasForeignKey(f => f.IdServiceType);

            modelBuilder.Entity<Service>()
                .HasOne<Budget>(u => u.Budget)
                .WithMany(b => b.Services)
                .HasForeignKey(f => f.IdBudget);

            modelBuilder.Entity<Service>()
                .HasOne<User>(u => u.Worker)
                .WithMany(b => b.Services)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired(false) 
                .HasForeignKey(f => f.IdUser);
            #endregion

            #region ServiceImages
            modelBuilder.Entity<ServiceImage>().ToTable("ServiceImages");

            modelBuilder.Entity<ServiceImage>().Property(x => x.Id);

            modelBuilder.Entity<ServiceImage>().Property(x => x.ImagePath).HasMaxLength(255);
            modelBuilder.Entity<ServiceImage>().Property(x => x.ImagePath).HasColumnType("varchar(255)");
            modelBuilder.Entity<ServiceImage>().Property(x => x.ImagePath).IsRequired();

            modelBuilder.Entity<ServiceImage>().Property(x => x.CreationDate).HasColumnType("datetime");

            modelBuilder.Entity<ServiceImage>()
                .HasOne<Service>(u => u.Service)
                .WithMany(b => b.ServiceImages)
                .HasForeignKey(f => f.IdService);

            #endregion

            base.OnModelCreating(modelBuilder);
        }
    }
}
