import { useState, useEffect } from "react";

import Form from "./components/Form";
import Recipes from "./components/Recipes";

import type { Appliance, Cookware, Utensil } from "./types/request";
import type { Recipe } from "./types/response";

function App() {
  const [appliances, setAppliances] = useState<Appliance[]>([
    "stove",
    "oven",
    "microwave",
  ]);
  const [cookware, setCookware] = useState<Cookware[]>([
    "frying pan",
    "saucepan",
    "cutting board",
    "mixing bowl",
  ]);
  const [utensils, setUtensils] = useState<Utensil[]>([
    "knife",
    "spatula",
    "spoon",
    "measuring cups",
    "can opener",
  ]);

  const [ingredients, setIngredients] = useState<string[]>([
    "2 eggs",
    "1 cup rice",
    "1 onion",
    "soy sauce",
  ]);

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim();
    if (!trimmed) return;

    setIngredients((prev) => [...prev, ingredient]);
  };

  const deleteIngredient = (ingredient: string) => {
    console.log("idk anymore bro");

    setIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const [message, setMessage] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:5200/api/health", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5200/api/recipes/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appliances, cookware, utensils, ingredients }),
    })
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="flex flex-col gap-12">
      <h1>help me cook</h1>

      <p>{message || "failed to reach backend"}</p>

      <Form
        appliances={appliances}
        cookware={cookware}
        utensils={utensils}
        ingredients={ingredients}
        onAddIngredient={addIngredient}
        onDeleteIngredient={deleteIngredient}
      />

      <Recipes recipes={recipes} />
    </main>
  );
}

export default App;
