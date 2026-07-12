namespace backend.Models;

public record RecipeStep(int Number, string Details);

public record Recipe(
    string Name,
    string Description,
    List<string> Appliances,
    List<string> Cookware,
    List<string> Utensils,
    List<string> Ingredients,
    List<RecipeStep> Steps
);

public record GenerateRecipeResponse(List<Recipe> Recipes);
