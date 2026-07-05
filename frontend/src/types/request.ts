export const APPLIANCES = [
  "stove",
  "oven",
  "microwave",
  "air fryer",
  "toaster",
  "blender",
  "rice cooker",
  "slow cooker",
] as const;
export type Appliance = (typeof APPLIANCES)[number];

export const COOKWARE = [
  "frying pan",
  "saucepan",
  "large pot",
  "baking sheet",
  "baking dish",
  "mixing bowl",
  "cutting board",
] as const;
export type Cookware = (typeof COOKWARE)[number];

export const UTENSILS = [
  "knife",
  "spatula",
  "spoon",
  "tongs",
  "whisk",
  "measuring cups",
  "measuring spoons",
  "can opener",
  "peeler",
  "strainer",
] as const;
export type Utensil = (typeof UTENSILS)[number];

export type IngredientAmount = {
  quantity: number;
  unit?: string;
};

export type Ingredient = {
  name: string;
  amount?: IngredientAmount;
};

export type GenerateRecipeRequest = {
  utensils: string[];
  cookware: string[];
  appliances: string[];
  ingredients: Ingredient[];
};
