import type { Request } from "../types/request";
import type { Response } from "../types/response";

export const generateRecipes = async (request: Request): Promise<Response> => {
  const response = await fetch("http://localhost:5200/api/recipes/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) throw new Error("Failed to generate recipes.");

  return response.json();
};
