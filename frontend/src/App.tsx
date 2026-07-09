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

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const missing: string[] = [];

    if (appliances.length === 0) missing.push("appliance");
    if (cookware.length === 0) missing.push("cookware item");
    if (utensils.length === 0) missing.push("utensil");
    if (ingredients.length === 0) missing.push("ingredient");

    if (missing.length > 0) {
      if (missing.length === 1)
        setError(`Please select at least one ${missing[0]}.`);

      if (missing.length === 2)
        setError(`Please select at least one ${missing[0]} and ${missing[1]}.`);

      setError(
        `Please select at least one ${missing.slice(0, -1).join(", ")}, and ${missing[missing.length - 1]}.`,
      );

      return;
    }

    try {
      setLoading(true);

      const data = await generateRecipes({
        appliances,
        cookware,
        utensils,
        ingredients,
      });

      setRecipes(data.recipes);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while generating recipes.");
    } finally {
      setLoading(false);
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        // !== ""
        <p>{error}</p>
      ) : (
        <Recipes recipes={recipes} />
      )}
    </main>
  );
}

export default App;
