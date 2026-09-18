// Aggregates local recipe asset shards into the catalog consumed by app.js/admin.js.
window.KAIFAN_RECIPE_CATALOG = (() => {
  const media = window.KAIFAN_RECIPE_MEDIA || {};

  return {
    recipes: Array.isArray(window.KAIFAN_RECIPE_CORE) ? window.KAIFAN_RECIPE_CORE : [],
    recipeSopLibrary: window.KAIFAN_RECIPE_SOP_LIBRARY || {},
    recipeImageSources: media.recipeImageSources || {},
    localRecipeImageIds: Array.isArray(media.localRecipeImageIds) ? media.localRecipeImageIds : [],
    recipeTutorials: media.recipeTutorials || {},
  };
})();
