namespace backend.Models;

public record IngredientAmount(decimal Quantity, string? Unit);

public record Ingredient(string Name, IngredientAmount? Amount);

public record GenerateRecipeRequest(
    List<string> Utensils,
    List<string> Appliances,
    List<Ingredient> Ingredients
);
