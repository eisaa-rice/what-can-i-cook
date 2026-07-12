namespace backend.Models;

public record GenerateRecipeRequest(
    List<string> Appliances,
    List<string> Cookware,
    List<string> Utensils,
    List<string> Ingredients
);
