namespace backend.Models;

public record GenerateRecipeRequest(
    List<string> Utensils,
    List<string> Appliances,
    List<string> Ingredients
);
