import { useState } from "react";

import {
  APPLIANCES,
  COOKWARE,
  UTENSILS,
  type Appliance,
  type Cookware,
  type Utensil,
} from "../types/request";

const Item = ({ name }: { name: string }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected((prev) => !prev);
  };

  return (
    <button
      className={`${selected ? "text-neutral-800 border-neutral-400 font-semibold" : "text-neutral-600 border-neutral-200"}
      text-sm border rounded-full px-2 py-1 cursor-pointer`}
      type="button"
      onClick={handleSelect}
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
    <div className="flex gap-2">
      <p className="flex gap-1">{ingredient}</p>

      <button
        className="cursor-pointer"
        type="button"
        onClick={() => onDeleteIngredient(ingredient)}
      >
        delete
      </button>
    </div>
  );
};

const Form = ({
  appliances,
  cookware,
  utensils,
  ingredients,
  onAddIngredient,
  onDeleteIngredient,
}: {
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
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
          <Item key={a} name={a} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {COOKWARE.map((c) => (
          <Item key={c} name={c} />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {UTENSILS.map((u) => (
          <Item key={u} name={u} />
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
