using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

public partial class SavingsServiceContext : DbContext
{
    private readonly IConfiguration _configuration;
    public SavingsServiceContext(DbContextOptions<SavingsServiceContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }
    public SavingsServiceContext(DbContextOptions<SavingsServiceContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Saving> Savings { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
    //=> optionsBuilder.UseSqlServer("Server=tcp:ticket-service.database.windows.net,1433;Initial Catalog=ticket-service;Persist Security Info=False;User ID=ticket-service-admin;Password=0508025613qQ!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Saving>(entity =>
        {
            entity.ToTable("savings");

            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.Login)
                .HasMaxLength(50)
                .HasColumnName("login");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.Time)
                .HasColumnName("time");
            entity.Property(e => e.Slides)
                .HasColumnName("slides");
            entity.Property(e => e.Field)
                .HasMaxLength(50)
                .HasColumnName("field");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
