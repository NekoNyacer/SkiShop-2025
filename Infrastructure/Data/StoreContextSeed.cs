using System;
using System.Text.Json;
using Core.Entities;
using Infrastructure.Data;

namespace Infrastructure.Config;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.Products.Any())
        {
            var productsData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productsData);
            if(products == null) return;
            context.Products.AddRange(products);
            await context.SaveChangesAsync();
        }
    }
}
