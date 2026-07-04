import type { Recipe, RecipeStep } from "../types/response";

const Recipe = ({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: RecipeStep[];
}) => {
  return (
    <li
      className="border border-neutral-200 rounded-sm
      m-4 p-4"
    >
      <p className="font-bold">{name}</p>

      <p className="my-2 text-neutral-400">{description}</p>

      <ol>
        {steps.map((m) => (
          <li key={m.number} className="list-decimal ml-4 text-neutral-600">
            <p>{m.details}</p>
          </li>
        ))}
      </ol>
    </li>
  );
};

const Recipes = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ul>
      {recipes.map(({ name, description, steps }, i) => (
        <Recipe key={i} name={name} description={description} steps={steps} />
      ))}
    </ul>
  );
};

export default Recipes;
