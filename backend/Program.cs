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
                "A quick rice bowl made with scrambled eggs, warm rice, onion, and soy sauce.",
                ["stove"],
                ["frying pan"],
                ["spatula", "knife", "spoon", "measuring cups"],
                ["2 eggs", "1 cup rice", "1 onion", "soy sauce"],
                [
                    new RecipeStep(
                        1,
                        "Cook the rice according to the package instructions if it is not already cooked."
                    ),
                    new RecipeStep(2, "Dice the onion into small pieces."),
                    new RecipeStep(
                        3,
                        "Heat the frying pan over medium heat and cook the onion until softened."
                    ),
                    new RecipeStep(
                        4,
                        "Add the eggs and scramble them with the onion until fully cooked."
                    ),
                    new RecipeStep(
                        5,
                        "Add the cooked rice and soy sauce, then stir everything together."
                    ),
                ]
            ),
            new Recipe(
                "Microwave Egg Fried Rice",
                "A fast microwave version of egg fried rice that uses minimal cookware.",
                ["microwave"],
                ["mixing bowl"],
                ["spoon", "knife", "measuring cups"],
                ["2 eggs", "1 cup rice", "1 onion", "soy sauce"],
                [
                    new RecipeStep(1, "Dice the onion into small pieces."),
                    new RecipeStep(
                        2,
                        "Place the onion in a microwave-safe mixing bowl and microwave it for one minute."
                    ),
                    new RecipeStep(
                        3,
                        "Crack the eggs into the bowl and stir them together with the onion."
                    ),
                    new RecipeStep(
                        4,
                        "Microwave the egg mixture in 30-second intervals, stirring between each interval, until cooked."
                    ),
                    new RecipeStep(
                        5,
                        "Stir in the rice and soy sauce, then microwave for another one to two minutes."
                    ),
                ]
            ),
            new Recipe(
                "Baked Onion Egg Rice",
                "A simple baked rice dish with eggs, onion, and soy sauce.",
                ["oven"],
                ["baking dish", "mixing bowl", "cutting board"],
                ["knife", "spoon", "measuring cups"],
                ["2 eggs", "1 cup rice", "1 onion", "soy sauce"],
                [
                    new RecipeStep(1, "Preheat the oven to 375 degrees Fahrenheit."),
                    new RecipeStep(2, "Dice the onion on the cutting board."),
                    new RecipeStep(
                        3,
                        "Combine the eggs, rice, onion, and soy sauce in the mixing bowl."
                    ),
                    new RecipeStep(4, "Transfer the mixture to the baking dish."),
                    new RecipeStep(
                        5,
                        "Bake for 20 to 25 minutes, or until the eggs are fully set."
                    ),
                ]
            ),
        ]);

        return Results.Ok(response);
    }
);

app.Run();
