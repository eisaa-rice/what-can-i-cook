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
      onClick={handleSelect}
    >
      {name}
    </button>
  );
};

const Ingredient = ({ ingredient }: { ingredient: string }) => {
  return <p className="flex gap-1">{ingredient}</p>;
};

const Form = ({
  appliances,
  cookware,
  utensils,
  ingredients,
}: {
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
  ingredients: string[];
}) => {
  return (
    // when changed from <div> to <form>, clicking any of the kitchen utility pills causes a page refresh
    <form className="flex flex-col items-center justify-center gap-6">
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
          <Ingredient key={idx} ingredient={i} />
        ))}

        <input placeholder="Ingredient..." />
      </div>
    </form>
  );
};

export default Form;
