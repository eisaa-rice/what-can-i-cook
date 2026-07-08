import { useState } from "react";

import {
  APPLIANCES,
  COOKWARE,
  UTENSILS,
  type Appliance,
  type Cookware,
  type Utensil,
} from "../types/request";

import { Trash2 } from "lucide-react";

const Item = ({
  name,
  selected,
  onToggle,
}: {
  name: string;
  selected: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      className={`${selected ? "text-neutral-800 border-neutral-400 font-semibold" : "text-neutral-600 border-neutral-200"}
      text-sm border rounded-full px-2 py-1 cursor-pointer`}
      type="button"
      onClick={onToggle}
    >
      {name}
    </button>
  );
};

const Ingredient = ({
  ingredient,
  onDeleteIngredient,
}: {
  ingredient: string;
  onDeleteIngredient: (ingredient: string) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <p>{ingredient}</p>

      <button
        className="cursor-pointer"
        type="button"
        onClick={() => onDeleteIngredient(ingredient)}
      >
        <Trash2 size={16} strokeWidth={1} />
      </button>
    </div>
  );
};

const Form = ({
  appliances,
  cookware,
  utensils,
  onToggleAppliance,
  onToggleCookware,
  onToggleUtensil,
  ingredients,
  onAddIngredient,
  onDeleteIngredient,
}: {
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
  onToggleAppliance: (appliance: Appliance) => void;
  onToggleCookware: (cookware: Cookware) => void;
  onToggleUtensil: (utensil: Utensil) => void;
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onDeleteIngredient: (ingredient: string) => void;
}) => {
  const [input, setInput] = useState("");

  return (
    // when changed from <div> to <form>, clicking any of the kitchen utility pills causes a page refresh
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {APPLIANCES.map((a) => (
          <Item
            key={a}
            name={a}
            selected={appliances.includes(a)}
            onToggle={() => onToggleAppliance(a)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {COOKWARE.map((c) => (
          <Item
            key={c}
            name={c}
            selected={cookware.includes(c)}
            onToggle={() => onToggleCookware(c)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {UTENSILS.map((u) => (
          <Item
            key={u}
            name={u}
            selected={utensils.includes(u)}
            onToggle={() => onToggleUtensil(u)}
          />
        ))}
      </div>

      <div>
        {ingredients.map((i, idx) => (
          <Ingredient
            key={idx}
            ingredient={i}
            onDeleteIngredient={onDeleteIngredient}
          />
        ))}

        <input
          placeholder="Ingredient..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== "Enter") return;

            e.preventDefault();

            onAddIngredient(input);

            setInput("");
          }}
        />
      </div>
    </div>
  );
};

export default Form;
