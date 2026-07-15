import { type Appliance, type Cookware, type Utensil } from "../types/request";

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
  return (
    <div>
      {/* TODO: edit button */}

      <h2>Your kitchen:</h2>

      <div className="flex flex-wrap gap-2">
        <p>
          {appliances.length} appliances · {cookware.length} cookware ·{" "}
          {utensils.length} utensils
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((i, idx) => (
          <>
            <p key={idx}>
              {i}
              {idx < ingredients.length - 1 && ", "}
            </p>
          </>
        ))}
      </div>

      {/* TODO: expandable details would go hard */}
    </div>
  );
};

export default Kitchen;
