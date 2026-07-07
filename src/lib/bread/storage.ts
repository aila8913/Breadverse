import { Recipe } from "./types";

const STORAGE_KEY = "breadverse:recipes";

/**
 * 目前先用 localStorage 存食譜（使用者選擇「先做本地儲存的 app」，社群分享是很後面的優先級）。
 * 之後如果要加後端/雲端同步，只要把這幾個函式的內部實作換掉，
 * 呼叫端（UI）完全不用改，這是把儲存邏輯獨立成一層的用意。
 */

export function loadRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Recipe[];
  } catch {
    return [];
  }
}

export function saveRecipes(recipes: Recipe[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function upsertRecipe(recipe: Recipe): void {
  const recipes = loadRecipes();
  const idx = recipes.findIndex((r) => r.id === recipe.id);
  if (idx >= 0) {
    recipes[idx] = recipe;
  } else {
    recipes.push(recipe);
  }
  saveRecipes(recipes);
}

export function deleteRecipe(id: string): void {
  saveRecipes(loadRecipes().filter((r) => r.id !== id));
}
