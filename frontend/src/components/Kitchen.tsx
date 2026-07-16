import { useState } from "react";

import { type Appliance, type Cookware, type Utensil } from "../types/request";

const KitchenDetails = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
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
}: {
  appliances: Appliance[];
  cookware: Cookware[];
  utensils: Utensil[];
  ingredients: string[];
}) => {
  const [details, setDetails] = useState(false);

  return (
    <div>
      {/* TODO: edit button */}

      <div className="flex items-center justify-between mb-3">
        <h2>Your kitchen:</h2>

        <button type="button" className="text-neutral-600">
          Edit
        </button>
      </div>

      {details ? (
        <div className="flex flex-col justify-center gap-4">
          <KitchenDetails title="Appliances" items={appliances} />

          <KitchenDetails title="Cookware" items={cookware} />

          <KitchenDetails title="Utensils" items={utensils} />

          <KitchenDetails title="Ingredients" items={ingredients} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <p>
            {appliances.length} appliances · {cookware.length} cookware ·{" "}
            {utensils.length} utensils · {ingredients.length} ingredients
          </p>
        </div>
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
