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
      text-sm border rounded-full px-2 py-1 first-letter:capitalize`}
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
      <p className="first-letter:capitalize">{ingredient}</p>

      <button type="button" onClick={() => onDeleteIngredient(ingredient)}>
        <Trash2 size={16} strokeWidth={1} />
      </button>
    </div>
  );
};

const questions = [
  "What appliances do you have?",
  "What cookware is available?",
  "Which utensils do you have?",
  "What ingredients are you working with?",
  "Review your kitchen.",
];

const Form = ({
  appliances,
  onToggleAppliance,
  cookware,
  onToggleCookware,
  utensils,
  onToggleUtensil,
  ingredients,
  onAddIngredient,
  onDeleteIngredient,
  onSubmit,
}: {
  appliances: Appliance[];
  onToggleAppliance: (appliance: Appliance) => void;
  cookware: Cookware[];
  onToggleCookware: (cookware: Cookware) => void;
  utensils: Utensil[];
  onToggleUtensil: (utensil: Utensil) => void;
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onDeleteIngredient: (ingredient: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}) => {
  const [step, setStep] = useState(0);

  const [input, setInput] = useState("");

  return (
    <form
      className="flex flex-col items-center justify-center gap-8"
      onSubmit={onSubmit}
    >
      <h2>{questions[step]}</h2>

      {(step === 0 || step === 4) && (
        <section className="flex flex-wrap items-center justify-center gap-2">
          {APPLIANCES.map((a) => (
            <Item
              key={a}
              name={a}
              selected={appliances.includes(a)}
              onToggle={() => onToggleAppliance(a)}
            />
          ))}
        </section>
      )}

      {(step === 1 || step === 4) && (
        <section className="flex flex-wrap items-center justify-center gap-2">
          {COOKWARE.map((c) => (
            <Item
              key={c}
              name={c}
              selected={cookware.includes(c)}
              onToggle={() => onToggleCookware(c)}
            />
          ))}
        </section>
      )}

      {(step === 2 || step === 4) && (
        <section className="flex flex-wrap items-center justify-center gap-2">
          {UTENSILS.map((u) => (
            <Item
              key={u}
              name={u}
              selected={utensils.includes(u)}
              onToggle={() => onToggleUtensil(u)}
            />
          ))}
        </section>
      )}

      {(step === 3 || step === 4) && (
        <section className="flex flex-col items-center justify-center gap-2">
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
        </section>
      )}

      <div className="flex items-center justify-center gap-12 text-sm">
        {step > 0 && step < 5 && (
          <button type="button" onClick={() => setStep((prev) => prev - 1)}>
            Back
          </button>
        )}

        {step < 4 && (
          <button type="button" onClick={() => setStep((prev) => prev + 1)}>
            Next
          </button>
        )}

        {step === 4 && <button type="submit">Submit</button>}
      </div>
    </form>
  );
};

export default Form;
