using Microsoft.EntityFrameworkCore;
using webapi.Models.Bouquet;
using webapi.Models.Composition;
using webapi.Models.Expanses;
using webapi.Models.Flowers;
using webapi.Models.Sales;
using webapi.Models.User;

namespace webapi.Data
{
    //наследуемся от DbContext
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {
            //удалит базу данных если существует
            //Database.EnsureDeleted();
            //создается бд если не создана
            Database.EnsureCreated();            
        }

        public DbSet<Models.Expanses.Category> ExpansesCategories { get; set; }
        public DbSet<Expanse> Expanses { get; set; }
        public DbSet<FlowerCategory> FlowersCategories {get; set;}
        public DbSet<Color> Colors { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Flower> Flowers { get; set; }
        public DbSet<FlowersProviders> FlowersProviders { get; set; }
        public DbSet<FlowersShipments> FlowersShopments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Provider> Providers { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Models.Sales.Category> SalesCategories { get; set; }  
        public DbSet<Sale> Sales { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Bouquet> Bouquets { get; set; }
        public DbSet<Composition> Compositions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expanse>()
                .HasOne(e=>e.Category)
                .WithMany(c=>c.Expanses)
                .HasForeignKey(e=>e.CategoryId);
            //говорим с какой сущностью мы работаем
            modelBuilder.Entity<Models.Flowers.Flower>()
                //что является "одним"
                .HasOne(f => f.Category)
                //что является многими
                .WithMany(c => c.Flowers)                
                //по какому внешнему ключу связывать сущности
                .HasForeignKey(f=>f.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);
            //многие цветы к одному цвету
           modelBuilder.Entity<Models.Flowers.Flower>()
                .HasOne(f => f.Color)
                .WithMany(c => c.Flowers)
                .HasForeignKey(f => f.ColorId)
                .OnDelete(DeleteBehavior.SetNull);
            //много цветов одна страна
            modelBuilder.Entity<Models.Flowers.Flower>()
                .HasOne(f => f.Country)
                .WithMany(c => c.Flowers)
                .HasForeignKey(f => f.CountryId)
                .OnDelete(DeleteBehavior.SetNull);
            //много цветов много поставщиков
            modelBuilder.Entity<Models.Flowers.FlowersProviders>()
                .HasKey(fp => new { fp.ProviderId, fp.FlowerId });
            modelBuilder.Entity<FlowersProviders>()
                .HasOne(fp => fp.Flower)
                .WithMany(f => f.FlowersProviders)
                .HasForeignKey(fp => fp.FlowerId);
            modelBuilder.Entity<FlowersProviders>()
                .HasOne(fp => fp.Provider)
                .WithMany(p => p.FlowersProviders)
                .HasForeignKey(fp => fp.ProviderId);
            //много картинок один цветок
            modelBuilder.Entity<Models.Flowers.Image>()
                .HasOne(i => i.Flower)
                .WithMany(f => f.Images)
                .HasForeignKey(i => i.FlowerId);
            //один поставщик много поставок
            modelBuilder.Entity<Models.Flowers.Shipment>()
                .HasOne(s => s.Provider)
                .WithMany(p => p.Shipments)
                .HasForeignKey(s => s.ProviderId);
            //много поставок много цветов
            modelBuilder.Entity<Models.Flowers.FlowersShipments>()
                .HasKey(fs => new { fs.FlowerId, fs.ShipmentId });
            modelBuilder.Entity<Models.Flowers.FlowersShipments>()
                .HasOne(fs => fs.Flower)
                .WithMany(f => f.FlowersShipments)
                .HasForeignKey(fs => fs.FlowerId);
            modelBuilder.Entity<Models.Flowers.FlowersShipments>()
                .HasOne(fs => fs.Shipment)
                .WithMany(s => s.FlowersShipments)
                .HasForeignKey(fs => fs.ShipmentId);
            //
            modelBuilder.Entity<Models.Sales.Sale>()
                .HasOne(s => s.Category)
                .WithMany(c => c.Sales)
                .HasForeignKey(s => s.CategoryId);
                
        }
    }
    
}
