using backend.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// cors to allow access from frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

builder.Services.AddScoped<RecipeGenerator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.MapGet(
    "/api/health",
    () =>
    {
        var response = new { message = "backend is running" };

        return Results.Ok(response);
    }
);

app.MapPost(
    "/api/recipes/generate",
    async (
        GenerateRecipeRequest request,
        RecipeGenerator generator,
        CancellationToken cancellationToken
    ) =>
    {
        Console.WriteLine("Appliances:");
        foreach (var appliance in request.Appliances)
        {
            Console.WriteLine(appliance);
        }

        Console.WriteLine("Cookware:");
        foreach (var item in request.Cookware)
        {
            Console.WriteLine(item);
        }

        Console.WriteLine("Utensils:");
        foreach (var utensil in request.Utensils)
        {
            Console.WriteLine(utensil);
        }

        Console.WriteLine("Ingredients:");
        foreach (var ingredient in request.Ingredients)
        {
            Console.WriteLine(ingredient);
        }
        Console.WriteLine();

        var response = await generator.GenerateAsync(request, cancellationToken);

        return Results.Ok(response);
    }
);

app.Run();
