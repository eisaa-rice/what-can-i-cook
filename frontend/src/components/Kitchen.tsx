import { useState } from "react";

import { type Appliance, type Cookware, type Utensil } from "../types/request";

const Details = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div>
      <h3>{title}</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <p key={item}>
            {item}
            {idx < items.length - 1 && ", "}
          </p>
        ))}
      </div>
    </div>
  );
};

const Kitchen = ({
  appliances,
  cookware,
  utensils,
  ingredients,
  onEdit,
}: {
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
  ingredients: string[];
  onEdit: () => void;
}) => {
  const [details, setDetails] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2>Your kitchen:</h2>

        <button type="button" className="text-neutral-600" onClick={onEdit}>
          Edit
        </button>
      </div>

      {details ? (
        <div className="flex flex-col justify-center gap-4">
          <Details title="Appliances" items={appliances} />

          <Details title="Cookware" items={cookware} />

          <Details title="Utensils" items={utensils} />

          <Details title="Ingredients" items={ingredients} />
        </div>
      ) : (
        <p>
          {appliances.length} appliances · {cookware.length} cookware ·{" "}
          {utensils.length} utensils · {ingredients.length} ingredients
        </p>
      )}

      <button
        type="button"
        className="text-neutral-400 text-sm mt-3"
        onClick={() => setDetails((prev) => !prev)}
      >
        {details ? "Hide details" : "Show details"}
      </button>
    </div>
  );
};

export default Kitchen;
