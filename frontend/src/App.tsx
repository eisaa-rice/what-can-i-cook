import { useState, useEffect } from "react";

import type { Recipe } from "./types/response";

import "./App.css";

// for sample api call
const utensils = ["pan", "spoon"];
const appliances = ["stove"];
const ingredients = [
  {
    name: "eggs",
    amount: {
      quantity: 2,
      unit: null,
    },
  },
];

function App() {
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
      body: JSON.stringify({ utensils, appliances, ingredients }),
    })
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <h1>help me cook</h1>

      <p>{message || "failed to reach backend"}</p>

      <ul>
        {recipes.map(({ name, description, steps }, i) => (
          <li key={i}>
            <p>{name}</p>

            <p>{description}</p>

            <ol>
              {steps.map((m) => (
                <li key={m.number}>
                  <p>{m.details}</p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
