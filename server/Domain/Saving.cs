using System;
using Microsoft.EntityFrameworkCore;

public class Saving
{
    public int Id { get; set; }
    public string Login { get; set; } = null!;
    public string Password { get; set; } = null!;
    public int Time { get; set; }
    public int Slides { get; set; }
    public string Field { get; set; } = null!;
}