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
    (GenerateRecipeRequest request) =>
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

        var response = new GenerateRecipeResponse([
            new Recipe(
                "Simple Egg Rice Bowl",
                "A quick and simple egg bowl made with soft cooked eggs, warm rice, and basic seasoning. Good for a fast meal when you only have a few ingredients.",
                [
                    new RecipeStep(1, "Cook the rice if it is not already cooked."),
                    new RecipeStep(2, "Scramble the eggs in a pan."),
                    new RecipeStep(3, "Combine the eggs and rice."),
                ]
            ),
            new Recipe(
                "sample recipe",
                "this is not actually something you can cook.",
                [
                    new RecipeStep(1, "step 1."),
                    new RecipeStep(2, "number 2."),
                    new RecipeStep(3, "and 3."),
                ]
            ),
        ]);

        return Results.Ok(response);
    }
);

app.Run();
