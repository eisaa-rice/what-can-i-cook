import { useState } from "react";

import type { Appliance, Cookware, Utensil } from "../types/request";
import type { Recipe, RecipeStep } from "../types/response";

const List = ({ items }: { items: string[] }) => {
  return (
    <ul className="flex items-center gap-2 flex-wrap">
      {items.map((i, idx) => (
        <li
          key={idx}
          className="text-neutral-500 text-sm 
          border border-neutral-300 rounded-full 
          shrink-0 px-2 py-0.5"
        >
          {i}
        </li>
      ))}
    </ul>
  );
};

const Recipe = ({
  name,
  description,
  appliances,
  cookware,
  utensils,
  ingredients,
  steps,
}: {
  name: string;
  description: string;
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
  ingredients: string[];
  steps: RecipeStep[];
}) => {
  return (
    <li
      className="flex flex-col gap-4
      border border-neutral-200 rounded-sm
      m-4 p-4"
    >
      <p className="font-bold">{name}</p>

      <p className="text-neutral-700">{description}</p>

      <div className="flex gap-6 flex-wrap">
        <List items={appliances} />

        <List items={cookware} />

        <List items={utensils} />
      </div>

      <ul>
        {ingredients.map((i, idx) => (
          <li key={idx} className="text-neutral-600">
            {i}
          </li>
        ))}
      </ul>

      <ol>
        {steps.map((m) => (
          <li key={m.number} className="list-decimal ml-4">
            {m.details}
          </li>
        ))}
      </ol>
    </li>
  );
};

const Recipes = ({ recipes }: { recipes: Recipe[] }) => {
  const [page, setPage] = useState(0);

  return (
    // TODO: maybe show list/grid of recipe previews, and then activate pagination on selection (like a modal)
    <>
      <ul>
        <Recipe
          name={recipes[page].name}
          description={recipes[page].description}
          appliances={recipes[page].appliances}
          cookware={recipes[page].cookware}
          utensils={recipes[page].utensils}
          ingredients={recipes[page].ingredients}
          steps={recipes[page].steps}
        />
      </ul>

      <div className="flex items-center justify-center gap-12 text-sm">
        {page > 0 && page < recipes.length && (
          <button type="button" onClick={() => setPage((prev) => prev - 1)}>
            Back
          </button>
        )}

        {page < recipes.length - 1 && (
          <button type="button" onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default Recipes;
