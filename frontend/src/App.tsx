import { useState, useEffect } from "react";

import Form from "./components/Form";
import Recipes from "./components/Recipes";

import type { Appliance, Cookware, Utensil } from "./types/request";
import type { Recipe } from "./types/response";
import { generateRecipes } from "./api/recipes";

function App() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5200/api/health", { method: "GET" })
      .then((res) => res.json())
      .then(() => setConnected(true))
      .catch((err) => console.error(err));
  }, []);

  const [appliances, setAppliances] = useState<Appliance[]>([
    "stove",
    "oven",
    "microwave",
  ]);

  const toggleAppliance = (appliance: Appliance) => {
    setAppliances((prev) =>
      prev.includes(appliance)
        ? prev.filter((a) => a !== appliance)
        : [...prev, appliance],
    );
  };

  const [cookware, setCookware] = useState<Cookware[]>([
    "frying pan",
    "saucepan",
    "cutting board",
    "mixing bowl",
  ]);

  const toggleCookware = (cookware: Cookware) => {
    setCookware((prev) =>
      prev.includes(cookware)
        ? prev.filter((c) => c !== cookware)
        : [...prev, cookware],
    );
  };

  const [utensils, setUtensils] = useState<Utensil[]>([
    "knife",
    "spatula",
    "spoon",
    "measuring cups",
    "can opener",
  ]);

  const toggleUtensil = (utensil: Utensil) => {
    setUtensils((prev) =>
      prev.includes(utensil)
        ? prev.filter((u) => u !== utensil)
        : [...prev, utensil],
    );
  };

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
    setIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // reset loading and error state

      const data = await generateRecipes({
        appliances,
        cookware,
        utensils,
        ingredients,
      });

      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
      // set error state
    } finally {
      // remove loading state
    }
  };

  return (
    <main className="flex flex-col gap-12">
      <h1>What Can I Cook?</h1>

      <p>
        {connected
          ? "Successfully connected to backend"
          : "Failed to reach backend"}
      </p>

      <Form
        appliances={appliances}
        onToggleAppliance={toggleAppliance}
        cookware={cookware}
        onToggleCookware={toggleCookware}
        utensils={utensils}
        onToggleUtensil={toggleUtensil}
        ingredients={ingredients}
        onAddIngredient={addIngredient}
        onDeleteIngredient={deleteIngredient}
        onSubmit={handleSubmit}
      />

      <Recipes recipes={recipes} />
    </main>
  );
}

export default App;
