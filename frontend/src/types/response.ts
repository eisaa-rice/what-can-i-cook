export type RecipeStep = {
  number: number;
  details: string;
};

export type Recipe = {
  name: string;
  description: string;
  steps: RecipeStep[];
};

export type Response = {
  recipes: Recipe[];
};
