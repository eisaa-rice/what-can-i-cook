import { useState } from "react";

import { APPLIANCES, COOKWARE, UTENSILS } from "../types/request";

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

const Form = ({}: {}) => {
  return (
    <div className="flex flex-col gap-6">
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
    </div>
  );
};

export default Form;
