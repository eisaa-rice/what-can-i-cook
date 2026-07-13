import { useState } from "react";

import type { Appliance, Cookware, Utensil } from "../types/request";
import type { Recipe, RecipeStep } from "../types/response";

import { X } from "lucide-react";

const RecipeCard = ({
  name,
  description,
  onClick,
}: {
  name: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <li
      className="border border-neutral-300 rounded-sm
      p-3 m-2 hover:cursor-pointer"
      onClick={onClick}
    >
      <p className="font-bold">{name}</p>

      <p className="text-neutral-700 mt-1.5">{description}</p>
    </li>
  );
};

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
      // TODO: fix vertical scroll on thinner screens
      className="flex flex-col gap-4 overflow-y-auto
      border border-neutral-200 rounded-sm
      m-4 p-4 bg-white"
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
  const [recipe, setRecipe] = useState<number | null>(null);

  return (
    <>
      <ul className="flex flex-col gap-2">
        {recipes.map(({ name, description }, idx) => (
          <RecipeCard
            key={idx}
            name={name}
            description={description}
            onClick={() => setRecipe(idx)}
          />
        ))}
      </ul>

      {recipe !== null && (
        <div
          className="w-full h-full absolute flex items-center justify-center
          bg-black/25"
        >
          <button
            type="button"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={() => setRecipe(null)}
          >
            <X
              className="bg-white rounded-sm border border-neutral-200"
              strokeWidth={1.5}
            />
          </button>

          <Recipe
            name={recipes[recipe].name}
            description={recipes[recipe].description}
            appliances={recipes[recipe].appliances}
            cookware={recipes[recipe].cookware}
            utensils={recipes[recipe].utensils}
            ingredients={recipes[recipe].ingredients}
            steps={recipes[recipe].steps}
          />
        </div>
      )}
    </>
  );
};

export default Recipes;
