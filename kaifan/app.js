const STORAGE_KEY = "wilson-portfolio-kaifan-state-v3";
const APP_SYNCED_RECIPE_KEY = "wilson-portfolio-kaifan-demo-synced-recipes";
const MEDIA_ASSET_KEY = "wilson-portfolio-kaifan-demo-media-assets";
const EXPIRY_WARNING_DAYS = 14;
const INITIAL_RECIPE_LIMIT = 3;
const RECIPE_LOAD_STEP = 6;
const testInventoryIngredients = [
  "鸡蛋",
  "番茄",
  "青菜",
  "面条",
  "大米",
  "瘦肉",
  "鸡胸肉",
  "鸡腿肉",
  "葱",
  "姜",
  "蒜",
  "小米辣",
  "香菜",
  "生菜",
  "黄瓜",
  "土豆",
  "胡萝卜",
  "西兰花",
  "豆腐",
  "包菜",
  "粉丝",
  "娃娃菜",
  "虾仁",
  "鲈鱼",
  "香菇",
];
const testInventorySeasonings = [
  "盐",
  "糖",
  "生抽",
  "老抽",
  "食用油",
  "黑胡椒",
  "醋",
  "淀粉",
  "蚝油",
  "料酒",
  "芝麻油",
  "蒸鱼豉油",
  "豆瓣酱",
];
const freshAromatics = ["葱", "姜", "蒜", "小米辣", "香菜"];
const prepEstimates = {
  蒜: { grams: 8, unit: "瓣", action: "拍碎或切末" },
  姜: { grams: 6, unit: "片", action: "切片或切丝" },
  葱: { grams: 10, unit: "段", action: "葱白爆香，葱绿出锅前撒" },
  小米辣: { grams: 5, unit: "个", action: "切圈" },
  香菜: { grams: 6, unit: "小把", action: "切段" },
  番茄: { grams: 180, unit: "个", action: "切块" },
  鸡蛋: { grams: 50, unit: "个", action: "打散" },
  青菜: { grams: 120, unit: "份", action: "洗净沥干" },
  土豆: { grams: 180, unit: "个", action: "切丝或切块后泡水" },
  洋葱: { grams: 120, unit: "个", action: "切块或切丝" },
  胡萝卜: { grams: 80, unit: "根", action: "切片或切丝" },
  黄瓜: { grams: 120, unit: "根", action: "切块或拍碎" },
  西兰花: { grams: 180, unit: "份", action: "掰小朵后焯水" },
};

const substituteSuggestions = {
  牛腩: [
    { name: "鸡腿肉", note: "更快熟，适合做番茄鸡腿肉版本" },
    { name: "猪肉", note: "切厚片或小块，口感更家常" },
    { name: "肥牛", note: "最后下锅，能做快手番茄肥牛" },
  ],
  鸡胸肉: [
    { name: "鸡腿肉", note: "口感更嫩，油脂略高" },
    { name: "虾仁", note: "适合清爽高蛋白版本" },
  ],
  里脊肉: [
    { name: "猪肉", note: "切丝后用淀粉抓匀" },
    { name: "鸡腿肉", note: "切丝也能做快手炒菜" },
  ],
  五花肉: [
    { name: "猪肉", note: "油脂更少，炖煮时间可缩短" },
    { name: "排骨", note: "适合改成炖菜版本" },
  ],
  鲈鱼: [
    { name: "虾", note: "同样适合白灼或清蒸口味" },
    { name: "虾仁", note: "更省处理时间" },
  ],
  青菜: [
    { name: "生菜", note: "适合快炒或煮面" },
    { name: "菠菜", note: "煮汤、煮面都方便" },
    { name: "空心菜", note: "适合蒜蓉快炒" },
  ],
  生菜: [
    { name: "青菜", note: "口感更扎实，适合炒或煮" },
    { name: "菠菜", note: "适合清淡版本" },
  ],
  洋葱: [
    { name: "葱", note: "香气不同，但能补足爆香层次" },
  ],
  番茄: [
    { name: "番茄酱", note: "可以补酸甜底味，但仍建议搭配新鲜蔬菜" },
  ],
};

const commonAbsoluteTaboos = ["猪肉", "牛肉", "羊肉", "花生", "虾", "海鲜", "鸡蛋", "牛奶", "酒精", "贝类", "蟹", "鱼", "坚果", "芝麻", "芒果", "菠萝", "小麦", "麸质", "大豆", "豆制品"];
const commonAvoidTaboos = ["葱", "姜", "蒜", "香菜", "小米辣", "辣椒", "洋葱", "胡萝卜", "芹菜", "苦瓜", "茄子", "青椒", "番茄", "木耳", "香菇", "韭菜", "内脏", "肥肉"];
const optionalIngredients = ["葱", "姜", "蒜", "香菜", "小米辣"];
const tabooIngredientGroups = {
  猪肉: ["猪肉", "五花肉", "里脊肉", "肉末", "排骨", "瘦肉"],
  牛肉: ["牛肉", "牛腩", "肥牛"],
  羊肉: ["羊肉"],
  花生: ["花生"],
  虾: ["虾", "虾仁"],
  海鲜: ["虾", "虾仁", "鲈鱼"],
  鸡蛋: ["鸡蛋"],
  牛奶: ["牛奶"],
  酒精: ["料酒"],
};
const tabooReplacementSuggestions = {
  猪肉: [
    { name: "鸡腿肉", note: "口感更嫩，适合大多数家常炒菜和炖菜" },
    { name: "牛肉", note: "风味更浓，适合下饭菜" },
    { name: "羊肉", note: "适合重口味或炖煮版本" },
  ],
  牛肉: [
    { name: "鸡腿肉", note: "更快熟，适合快手版本" },
    { name: "猪肉", note: "如果没有相关忌口，可做家常替换" },
    { name: "羊肉", note: "适合炖煮或浓郁口味" },
  ],
  虾: [
    { name: "鸡胸肉", note: "同样高蛋白，处理更稳定" },
    { name: "豆腐", note: "适合清淡版本" },
  ],
  海鲜: [
    { name: "鸡腿肉", note: "适合蒸、炒、炖多种做法" },
    { name: "豆腐", note: "适合清淡和汤羹版本" },
  ],
  花生: [
    { name: "黄瓜丁", note: "保留清爽脆口，风险更低" },
    { name: "胡萝卜丁", note: "增加口感和颜色" },
  ],
};

const commonIngredients = [
  "鸡蛋",
  "番茄",
  "青菜",
  "面条",
  "大米",
  "瘦肉",
  "鸡胸肉",
  "牛腩",
  "鲈鱼",
  "葱",
  "姜",
  "蒜",
  "小米辣",
  "香菜",
  "生菜",
  "黄瓜",
  "洋葱",
  "土豆",
  "胡萝卜",
  "玉米",
  "豆腐",
  "香菇",
  "虾仁",
  "鸡腿",
  "西兰花",
  "菠菜",
  "南瓜",
  "娃娃菜",
  "金针菇",
  "肥牛",
  "米粉",
  "河粉",
  "吐司",
  "牛奶",
  "燕麦",
  "五花肉",
  "里脊肉",
  "猪肉",
  "肉末",
  "鸡腿肉",
  "鸡翅",
  "排骨",
  "虾",
  "西兰花",
  "空心菜",
  "豆角",
  "茄子",
  "青椒",
  "土豆",
  "胡萝卜",
  "包菜",
  "娃娃菜",
  "粉丝",
  "冬瓜",
  "紫菜",
  "木耳",
  "腐竹",
  "芹菜",
  "可乐",
  "花生",
  "香干",
];

const commonSeasonings = [
  "盐",
  "糖",
  "生抽",
  "老抽",
  "食用油",
  "蚝油",
  "黑胡椒",
  "蒸鱼豉油",
  "醋",
  "料酒",
  "豆瓣酱",
  "辣椒粉",
  "花椒",
  "芝麻油",
  "橄榄油",
  "沙拉酱",
  "番茄酱",
  "淀粉",
  "鸡精",
  "白胡椒",
  "十三香",
  "咖喱块",
  "孜然粉",
  "八角",
  "桂皮",
];

const recipeCatalogData = window.KAIFAN_RECIPE_CATALOG || {};
const recipes = Array.isArray(recipeCatalogData.recipes) ? recipeCatalogData.recipes : [];
const recipeSopLibrary = recipeCatalogData.recipeSopLibrary || {};


const shops = [
  { name: "盒马", primary: true },
  { name: "朴朴" },
  { name: "小象" },
  { name: "美团" },
  { name: "附近超市" },
];

const recipeImageSources = recipeCatalogData.recipeImageSources || {};
const localRecipeImageIds = uniqueItems([
  ...(Array.isArray(recipeCatalogData.localRecipeImageIds) ? recipeCatalogData.localRecipeImageIds : []),
  ...readRegisteredLocalImageIds(),
]);
const recipeImages = Object.fromEntries(localRecipeImageIds.map((id) => [id, `assets/recipes/${id}.jpg`]));
const recipeTutorials = {
  ...(recipeCatalogData.recipeTutorials || {}),
  ...readRegisteredRecipeTutorials(),
};

function readRegisteredLocalImageIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(MEDIA_ASSET_KEY) || "{}");
    if (Array.isArray(saved)) return saved;
    return Array.isArray(saved.localImageIds) ? saved.localImageIds : [];
  } catch {
    return [];
  }
}

function readRegisteredRecipeTutorials() {
  try {
    const saved = JSON.parse(localStorage.getItem(MEDIA_ASSET_KEY) || "{}");
    return saved.recipeTutorials && typeof saved.recipeTutorials === "object" ? saved.recipeTutorials : {};
  } catch {
    return {};
  }
}

function readSyncedRecipes() {
  try {
    const synced = JSON.parse(localStorage.getItem(APP_SYNCED_RECIPE_KEY) || "[]");
    return Array.isArray(synced) ? synced : [];
  } catch {
    return [];
  }
}

function normalizeSyncedRecipe(recipe) {
  return {
    id: recipe.id,
    name: recipe.name || "未命名菜谱",
    desc: recipe.desc || "后台维护菜谱，适合继续补充运营介绍。",
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    seasonings: Array.isArray(recipe.seasonings) ? recipe.seasonings : [],
    difficulty: recipe.difficulty || "新手友好",
    minutes: Number(recipe.minutes) || 15,
    flavor: recipe.flavor || "家常",
    health: recipe.health || "均衡",
    tags: Array.isArray(recipe.tags) ? recipe.tags : [],
    steps: Array.isArray(recipe.steps) ? recipe.steps : [],
    image: recipe.image || "",
    tutorial: recipe.tutorial || null,
    substitutes: Array.isArray(recipe.substitutes) ? recipe.substitutes : [],
    sop: recipe.sop && typeof recipe.sop === "object" ? recipe.sop : null,
    source: recipe.source || "admin",
  };
}

function getAllRecipes() {
  const merged = new Map(
    recipes.map((recipe) => {
      const sopEnhancement = recipeSopLibrary[recipe.id] || {};
      return [
        recipe.id,
        {
          ...recipe,
          ...sopEnhancement,
          tags: uniqueItems([...(recipe.tags || []), ...(sopEnhancement.tags || [])]),
        },
      ];
    })
  );
  readSyncedRecipes()
    .map(normalizeSyncedRecipe)
    .filter((recipe) => recipe.id)
    .forEach((recipe) => {
      const existingRecipe = merged.get(recipe.id) || {};
      merged.set(recipe.id, {
        ...existingRecipe,
        ...recipe,
        sop: recipe.sop || existingRecipe.sop || null,
        tags: uniqueItems([...(existingRecipe.tags || []), ...(recipe.tags || [])]),
      });
    });
  return [...merged.values()];
}

function getRecipeById(recipeId) {
  return getAllRecipes().find((recipe) => recipe.id === recipeId);
}

const recipeFilterGroups = [
  {
    id: "difficulty",
    title: "操作难度",
    options: [
      { id: "novice", label: "新手友好", test: (recipe) => recipe.difficulty.includes("新手") },
      { id: "simple", label: "简单", test: (recipe) => recipe.difficulty === "简单" },
      { id: "advanced", label: "进阶", test: (recipe) => recipe.difficulty === "进阶" },
    ],
  },
  {
    id: "time",
    title: "制作耗时",
    options: [
      { id: "under15", label: "15分钟内", test: (recipe) => recipe.minutes <= 15 },
      { id: "under20", label: "20分钟内", test: (recipe) => recipe.minutes <= 20 },
      { id: "under30", label: "30分钟内", test: (recipe) => recipe.minutes <= 30 },
      { id: "over30", label: "适合慢慢做", test: (recipe) => recipe.minutes > 30 },
    ],
  },
  {
    id: "category",
    title: "菜品类别",
    options: [
      { id: "staple", label: "主食/粉面", test: (recipe) => /面|粉|粥|饭/.test(recipe.name) },
      { id: "soup", label: "汤粥羹", test: (recipe) => /汤|粥|羹/.test(recipe.name) },
      { id: "meat", label: "荤菜", test: (recipe) => getEffectiveRecipe(recipe).ingredients.some((item) => /肉|牛腩|鸡|排骨|鱼|虾/.test(item)) },
      { id: "vegetable", label: "素菜", test: (recipe) => !getEffectiveRecipe(recipe).ingredients.some((item) => /肉|牛腩|鸡|排骨|鱼|虾/.test(item)) },
      { id: "seafood", label: "鱼虾海鲜", test: (recipe) => getEffectiveRecipe(recipe).ingredients.some((item) => /鱼|虾/.test(item)) },
      { id: "cantonese", label: "广州口味", test: (recipe) => recipe.tags.includes("cantonese") },
    ],
  },
  {
    id: "flavor",
    title: "口味",
    options: [
      { id: "light", label: "清淡/清爽", test: (recipe) => /清淡|清爽/.test(recipe.flavor) },
      { id: "savory", label: "鲜咸/咸香", test: (recipe) => /鲜咸|咸香/.test(recipe.flavor) },
      { id: "sweetSour", label: "酸甜", test: (recipe) => recipe.flavor.includes("酸甜") },
      { id: "spicy", label: "微辣/香辣", test: (recipe) => /微辣|香辣|酸辣/.test(recipe.flavor) },
      { id: "rich", label: "浓郁下饭", test: (recipe) => recipe.flavor.includes("浓郁") },
    ],
  },
  {
    id: "health",
    title: "饮食目标",
    options: [
      { id: "fatLoss", label: "减脂", test: (recipe) => recipe.health.includes("减脂") || recipe.tags.includes("fatLoss") },
      { id: "highProtein", label: "高蛋白", test: (recipe) => recipe.health.includes("高蛋白") },
      { id: "balanced", label: "均衡", test: (recipe) => recipe.health.includes("均衡") },
      { id: "lightMeal", label: "轻食/养胃", test: (recipe) => /轻食|养胃/.test(recipe.health) || recipe.flavor.includes("清淡") },
    ],
  },
  {
    id: "inventory",
    title: "库存状态",
    options: [
      { id: "ready", label: "材料已齐", test: (recipe) => getRecipeStats(recipe).missingIngredients.length + getRecipeStats(recipe).missingSeasonings.length === 0 },
      { id: "nearly", label: "只差1-2样", test: (recipe) => {
        const stats = getRecipeStats(recipe);
        const missing = stats.missingIngredients.length + stats.missingSeasonings.length;
        return missing > 0 && missing <= 2;
      } },
      { id: "needBuy", label: "可补买再做", test: (recipe) => getRecipeStats(recipe).missingIngredients.length + getRecipeStats(recipe).missingSeasonings.length > 0 },
    ],
  },
  {
    id: "scenario",
    title: "使用场景",
    options: [
      { id: "afterWork", label: "下班快手", test: (recipe) => recipe.minutes <= 20 && recipe.difficulty !== "进阶" },
      { id: "weekend", label: "周末备餐", test: (recipe) => recipe.minutes >= 30 || recipe.desc.includes("备餐") },
      { id: "onePerson", label: "一人食", test: (recipe) => /面|粉|粥|沙拉|蛋/.test(recipe.name) || recipe.minutes <= 20 },
      { id: "family", label: "家庭正餐", test: (recipe) => recipe.minutes >= 20 && recipe.health !== "轻食" },
    ],
  },
];

function createEmptyRecipeFilters() {
  return Object.fromEntries(recipeFilterGroups.map((group) => [group.id, []]));
}

function cloneRecipeFilters(filters) {
  return Object.fromEntries(recipeFilterGroups.map((group) => [group.id, [...(filters[group.id] || [])]]));
}

const defaultState = {
  onboarded: false,
  profile: {
    name: "",
    goal: "日常家常",
    flavors: ["清淡"],
    taboos: {
      absolute: [],
      avoid: [],
    },
  },
  ingredients: ["鸡蛋", "番茄", "青菜"],
  seasonings: [
    { name: "盐", expiry: "" },
    { name: "糖", expiry: "" },
    { name: "生抽", expiry: "" },
    { name: "食用油", expiry: "" },
  ],
  favorites: [],
  mealPlan: [],
  recipeReplacements: {},
  ignoredExpiryAlertKey: "",
  ignoredSeasoningAlerts: [],
};

let state = loadState();
normalizeFreshAromatics();
let activeRecipeFilters = createEmptyRecipeFilters();
let draftRecipeFilters = createEmptyRecipeFilters();
let activeView = "recommend";
let mealPlanDrawerOpen = false;
let activeInventoryTab = "ingredients";
let activeSearchQuery = "";
let visibleRecipeLimit = INITIAL_RECIPE_LIMIT;
let selectedRecipeId = recipes[0].id;
let detailVisible = false;
let detailExpanded = false;
let detailScrollRecipeId = "";
let pickerMode = "ingredients";
let pickerSelection = [];
let pickerExpiryVisible = false;
let tabooPickerMode = "absolute";
let tabooPickerSelection = [];
let renewingSeasoningName = "";
let pendingTabooRecipeId = "";
let cookingStepIndex = 0;
let cookingCompletedSteps = new Set();
let cookingTimerTotal = 0;
let cookingTimerRemaining = 0;
let cookingTimerRunning = false;
let cookingTimerId = null;
let cookingVoiceEnabled = false;
let cookingWakeLockEnabled = false;
let cookingWakeLock = null;
let cookingWakeLockMessage = "";

const elements = {
  profileSummary: document.querySelector("#profileSummary"),
  expiryAlert: document.querySelector("#expiryAlert"),
  editProfile: document.querySelector("#editProfile"),
  quickOnboarding: document.querySelector("#quickOnboarding"),
  inventoryCompact: document.querySelector("#inventoryCompact"),
  inventoryCompactText: document.querySelector("#inventoryCompactText"),
  goInventory: document.querySelector("#goInventory"),
  fillTestInventory: document.querySelector("#fillTestInventory"),
  inventoryPanel: document.querySelector("#inventoryPanel"),
  editInventory: document.querySelector("#editInventory"),
  inventoryGuideAction: document.querySelector("#inventoryGuideAction"),
  inventoryInsights: document.querySelector("#inventoryInsights"),
  ingredientSection: document.querySelector("#ingredientSection"),
  seasoningSection: document.querySelector("#seasoningSection"),
  ingredientChips: document.querySelector("#ingredientChips"),
  seasoningChips: document.querySelector("#seasoningChips"),
  recipeList: document.querySelector("#recipeList"),
  quickStartSummary: document.querySelector("#quickStartSummary"),
  quickActionButtons: document.querySelectorAll("[data-quick-intent]"),
  openFavoritesShortcut: document.querySelector("#openFavoritesShortcut"),
  recipeDetail: document.querySelector("#recipeDetail"),
  purchasePanel: document.querySelector("#purchasePanel"),
  purchaseSummary: document.querySelector("#purchaseSummary"),
  purchaseList: document.querySelector("#purchaseList"),
  purchaseShops: document.querySelector("#purchaseShops"),
  purchaseBackRecommend: document.querySelector("#purchaseBackRecommend"),
  mealPlanPanel: document.querySelector("#mealPlanPanel"),
  mealPlanSummary: document.querySelector("#mealPlanSummary"),
  mealPrepList: document.querySelector("#mealPrepList"),
  mealPlanBackRecommend: document.querySelector("#mealPlanBackRecommend"),
  myPanel: document.querySelector("#myPanel"),
  myUserName: document.querySelector("#myUserName"),
  myGoalTags: document.querySelector("#myGoalTags"),
  myFlavorTags: document.querySelector("#myFlavorTags"),
  myTabooTags: document.querySelector("#myTabooTags"),
  myEditTaboos: document.querySelector("#myEditTaboos"),
  myKitchenStats: document.querySelector("#myKitchenStats"),
  mySeasoningAlerts: document.querySelector("#mySeasoningAlerts"),
  mySeasoningHistory: document.querySelector("#mySeasoningHistory"),
  seasoningHistoryModal: document.querySelector("#seasoningHistoryModal"),
  toggleSeasoningHistory: document.querySelector("#toggleSeasoningHistory"),
  closeSeasoningHistory: document.querySelector("#closeSeasoningHistory"),
  tabooWarningModal: document.querySelector("#tabooWarningModal"),
  tabooWarningBody: document.querySelector("#tabooWarningBody"),
  closeTabooWarning: document.querySelector("#closeTabooWarning"),
  cancelTabooRecipe: document.querySelector("#cancelTabooRecipe"),
  continueTabooRecipe: document.querySelector("#continueTabooRecipe"),
  myGoInventory: document.querySelector("#myGoInventory"),
  mealPlanFab: document.querySelector("#mealPlanFab"),
  mealPlanFabSummary: document.querySelector("#mealPlanFabSummary"),
  mealPlanFabCount: document.querySelector("#mealPlanFabCount"),
  recipeSearch: document.querySelector("#recipeSearch"),
  clearRecipeSearch: document.querySelector("#clearRecipeSearch"),
  filterStatus: document.querySelector("#filterStatus"),
  openFilterPanel: document.querySelector("#openFilterPanel"),
  recipeFilterModal: document.querySelector("#recipeFilterModal"),
  closeRecipeFilter: document.querySelector("#closeRecipeFilter"),
  recipeFilterOptions: document.querySelector("#recipeFilterOptions"),
  resetRecipeFilters: document.querySelector("#resetRecipeFilters"),
  applyRecipeFilters: document.querySelector("#applyRecipeFilters"),
  filterCount: document.querySelector("#filterCount"),
  filterSummary: document.querySelector("#filterSummary"),
  clearActiveFilters: document.querySelector("#clearActiveFilters"),
  sortSelect: document.querySelector("#sortSelect"),
  sectionTitle: document.querySelector(".section-heading h2"),
  contentGrid: document.querySelector(".content-grid"),
  navItems: document.querySelectorAll("[data-view]"),
  inventoryTabs: document.querySelectorAll(".inventory-tab"),
  onboardingModal: document.querySelector("#onboardingModal"),
  closeOnboarding: document.querySelector("#closeOnboarding"),
  saveProfile: document.querySelector("#saveProfile"),
  useDemoProfile: document.querySelector("#useDemoProfile"),
  userName: document.querySelector("#userName"),
  enableExpiry: document.querySelector("#enableExpiry"),
  onboardingExpiryList: document.querySelector("#onboardingExpiryList"),
  onboardingIngredientCount: document.querySelector("#onboardingIngredientCount"),
  onboardingIngredientPreview: document.querySelector("#onboardingIngredientPreview"),
  onboardingSeasoningCount: document.querySelector("#onboardingSeasoningCount"),
  onboardingSeasoningPreview: document.querySelector("#onboardingSeasoningPreview"),
  onboardingTabooCount: document.querySelector("#onboardingTabooCount"),
  onboardingTabooPreview: document.querySelector("#onboardingTabooPreview"),
  choiceGroups: document.querySelectorAll("[data-choice-group]"),
  openPickerButtons: document.querySelectorAll("[data-open-picker]"),
  openTabooPickerButtons: document.querySelectorAll("[data-open-taboo-picker]"),
  itemPickerModal: document.querySelector("#itemPickerModal"),
  pickerTitle: document.querySelector("#pickerTitle"),
  closePicker: document.querySelector("#closePicker"),
  pickerSearch: document.querySelector("#pickerSearch"),
  customItemInput: document.querySelector("#customItemInput"),
  addCustomItem: document.querySelector("#addCustomItem"),
  pickerSelected: document.querySelector("#pickerSelected"),
  pickerOptions: document.querySelector("#pickerOptions"),
  pickerExpiryTools: document.querySelector("#pickerExpiryTools"),
  togglePickerExpiry: document.querySelector("#togglePickerExpiry"),
  pickerExpiryEditor: document.querySelector("#pickerExpiryEditor"),
  savePicker: document.querySelector("#savePicker"),
  tabooPickerModal: document.querySelector("#tabooPickerModal"),
  tabooPickerTitle: document.querySelector("#tabooPickerTitle"),
  tabooPickerHint: document.querySelector("#tabooPickerHint"),
  closeTabooPicker: document.querySelector("#closeTabooPicker"),
  tabooSearch: document.querySelector("#tabooSearch"),
  customTabooInput: document.querySelector("#customTabooInput"),
  addCustomTaboo: document.querySelector("#addCustomTaboo"),
  tabooSelected: document.querySelector("#tabooSelected"),
  tabooOptions: document.querySelector("#tabooOptions"),
  saveTabooPicker: document.querySelector("#saveTabooPicker"),
  tabooModeButtons: document.querySelectorAll("[data-taboo-mode]"),
  recipeInfoModal: document.querySelector("#recipeInfoModal"),
  recipeInfoTitle: document.querySelector("#recipeInfoTitle"),
  recipeInfoBody: document.querySelector("#recipeInfoBody"),
  closeRecipeInfo: document.querySelector("#closeRecipeInfo"),
  addToMealPlan: document.querySelector("#addToMealPlan"),
  startCooking: document.querySelector("#startCooking"),
  cookingModeModal: document.querySelector("#cookingModeModal"),
  cookingModeTitle: document.querySelector("#cookingModeTitle"),
  cookingModeBody: document.querySelector("#cookingModeBody"),
  closeCookingMode: document.querySelector("#closeCookingMode"),
  prevCookingStep: document.querySelector("#prevCookingStep"),
  nextCookingStep: document.querySelector("#nextCookingStep"),
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem("wilson-portfolio-kaifan-state-v2"));
    if (!saved) return structuredClone(defaultState);
    const profile = { ...defaultState.profile, ...saved.profile };
    if (!Array.isArray(profile.flavors)) {
      profile.flavors = saved.profile?.flavor ? [saved.profile.flavor] : defaultState.profile.flavors;
    }
    profile.taboos = {
      ...defaultState.profile.taboos,
      ...(saved.profile?.taboos || {}),
      absolute: Array.isArray(saved.profile?.taboos?.absolute) ? saved.profile.taboos.absolute : [],
      avoid: Array.isArray(saved.profile?.taboos?.avoid) ? saved.profile.taboos.avoid : [],
    };
    return {
      ...structuredClone(defaultState),
      ...saved,
      profile,
      seasonings: Array.isArray(saved.seasonings) ? saved.seasonings : defaultState.seasonings,
      ignoredSeasoningAlerts: Array.isArray(saved.ignoredSeasoningAlerts) ? saved.ignoredSeasoningAlerts : [],
      recipeReplacements: saved.recipeReplacements && typeof saved.recipeReplacements === "object" ? saved.recipeReplacements : {},
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeFreshAromatics() {
  const seasoningNames = new Set(state.seasonings.map((item) => item.name));
  const movedItems = freshAromatics.filter((item) => seasoningNames.has(item));
  if (!movedItems.length) return;

  state.ingredients = uniqueItems([...state.ingredients, ...movedItems]);
  state.seasonings = state.seasonings.filter((item) => !freshAromatics.includes(item.name));
  saveState();
}

function normalize(value) {
  return value.trim().replace(/\s+/g, "");
}

function uniqueItems(items) {
  return [...new Set(items.map(normalize).filter(Boolean))];
}

function getSeasoningNames() {
  return state.seasonings.map((item) => item.name);
}

function formatDateInput(date) {
  return date.toISOString().slice(0, 10);
}

function getFutureDateByMonths(months) {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return formatDateInput(date);
}

function getFutureDateByYears(years) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return formatDateInput(date);
}

function getQuickExpiryValue(value) {
  if (value === "none") return "";
  if (value === "1m") return getFutureDateByMonths(1);
  if (value === "3m") return getFutureDateByMonths(3);
  if (value === "6m") return getFutureDateByMonths(6);
  if (value === "1y") return getFutureDateByYears(1);
  return "";
}

function renderExpiryQuickButtons(name, targetAttr) {
  return `
    <div class="expiry-quick-actions" aria-label="${name}有效期快捷选项">
      <button type="button" data-expiry-quick="${targetAttr}" data-expiry-name="${name}" data-expiry-value="1m">1个月</button>
      <button type="button" data-expiry-quick="${targetAttr}" data-expiry-name="${name}" data-expiry-value="3m">3个月</button>
      <button type="button" data-expiry-quick="${targetAttr}" data-expiry-name="${name}" data-expiry-value="6m">6个月</button>
      <button type="button" data-expiry-quick="${targetAttr}" data-expiry-name="${name}" data-expiry-value="1y">1年</button>
      <button type="button" data-expiry-quick="${targetAttr}" data-expiry-name="${name}" data-expiry-value="none">不记录</button>
    </div>
  `;
}

function applyExpiryQuickAction(button) {
  const targetAttr = button.dataset.expiryQuick;
  const name = button.dataset.expiryName;
  const value = getQuickExpiryValue(button.dataset.expiryValue);
  const input = document.querySelector(`[${targetAttr}="${CSS.escape(name)}"]`);
  if (!input) return;
  input.value = value;
}

function getAbsoluteTaboos() {
  return state.profile.taboos?.absolute || [];
}

function getAvoidTaboos() {
  return state.profile.taboos?.avoid || [];
}

function getTabooMatchedIngredients(taboo, ingredients) {
  const group = tabooIngredientGroups[taboo] || [taboo];
  return ingredients.filter((ingredient) => group.includes(ingredient) || ingredient.includes(taboo));
}

function getMatchingTabooNames(ingredient, taboos) {
  return taboos.filter((taboo) => getTabooMatchedIngredients(taboo, [ingredient]).length);
}

function getReplacementConflict(replacementName) {
  const absoluteMatches = getMatchingTabooNames(replacementName, getAbsoluteTaboos());
  if (absoluteMatches.length) return { type: "absolute", names: absoluteMatches };
  const avoidMatches = getMatchingTabooNames(replacementName, getAvoidTaboos());
  if (avoidMatches.length) return { type: "avoid", names: avoidMatches };
  return null;
}

function getSafeReplacementSuggestions(taboo, recipe = null, matchedIngredients = []) {
  const recipeSuggestions = matchedIngredients.flatMap((ingredient) => getRecipeIngredientSubstitutes(recipe, ingredient));
  const suggestions = [...recipeSuggestions, ...(tabooReplacementSuggestions[taboo] || [])];
  const seen = new Set();
  return suggestions.filter((item) => {
    if (!item?.name || seen.has(item.name) || getReplacementConflict(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

function getRecipeTabooHits(recipe) {
  const effectiveRecipe = getEffectiveRecipe(recipe);
  const absoluteHits = getAbsoluteTaboos()
    .map((taboo) => {
      const ingredients = getTabooMatchedIngredients(taboo, effectiveRecipe.ingredients);
      return {
        taboo,
        ingredients,
        replacements: getSafeReplacementSuggestions(taboo, recipe, ingredients),
      };
    })
    .filter((item) => item.ingredients.length);

  const avoidHits = getAvoidTaboos()
    .map((taboo) => ({
      taboo,
      ingredients: getTabooMatchedIngredients(taboo, effectiveRecipe.ingredients),
      optional: optionalIngredients.includes(taboo),
    }))
    .filter((item) => item.ingredients.length);

  return { absoluteHits, avoidHits };
}

function getAvoidedOptionalMissingIngredients(recipe) {
  const effectiveRecipe = getEffectiveRecipe(recipe);
  const avoidTaboos = getAvoidTaboos();
  return effectiveRecipe.ingredients.filter(
    (ingredient) => !state.ingredients.includes(ingredient) && avoidTaboos.some((taboo) => optionalIngredients.includes(taboo) && getTabooMatchedIngredients(taboo, [ingredient]).length),
  );
}

function getTabooRankPenalty(recipe) {
  const hits = getRecipeTabooHits(recipe);
  return hits.absoluteHits.length * 1000 + hits.avoidHits.filter((item) => !item.optional).length * 80;
}

function isFavorite(recipeId) {
  return state.favorites.includes(recipeId);
}

function toggleFavorite(recipeId) {
  state.favorites = isFavorite(recipeId)
    ? state.favorites.filter((id) => id !== recipeId)
    : [...state.favorites, recipeId];
  saveState();
  renderRecipes();
}

function isInMealPlan(recipeId) {
  return state.mealPlan.includes(recipeId);
}

function toggleMealPlan(recipeId) {
  state.mealPlan = isInMealPlan(recipeId)
    ? state.mealPlan.filter((id) => id !== recipeId)
    : [...state.mealPlan, recipeId];
  saveState();
  renderRecipes();
  renderPurchasePanel();
  renderMealPlanPanel();
}

function addRecipeToMealPlan(recipeId) {
  if (!isInMealPlan(recipeId)) {
    state.mealPlan = [...state.mealPlan, recipeId];
    saveState();
  }
  renderRecipes();
  renderPurchasePanel();
  renderMealPlanPanel();
}

function openPurchaseForRecipe(recipeId) {
  addRecipeToMealPlan(recipeId);
  closeRecipeInfo();
  switchView("purchase");
}

function getMealPlanRecipes() {
  return state.mealPlan.map((id) => getRecipeById(id)).filter(Boolean);
}

function getRecipeReplacements(recipeId) {
  return state.recipeReplacements?.[recipeId] || {};
}

function getEffectiveRecipe(recipe) {
  const replacements = getRecipeReplacements(recipe.id);
  const replacementEntries = Object.entries(replacements);
  if (!replacementEntries.length) return recipe;
  const ingredients = recipe.ingredients.map((ingredient) => replacements[ingredient] || ingredient);
  return {
    ...recipe,
    ingredients: uniqueItems(ingredients),
    replacements,
  };
}

function applyReplacementsToText(recipe, text) {
  return Object.entries(getRecipeReplacements(recipe.id)).reduce((current, [original, replacement]) => current.replaceAll(original, replacement), text);
}

function getEffectiveRecipeSteps(recipe) {
  return recipe.steps.map((step) => applyReplacementsToText(recipe, step));
}

function getSopItems(recipe, type) {
  return recipe.sop?.items?.filter((item) => item.type === type) || [];
}

function parseDurationToSeconds(value, fallback = 60) {
  const text = String(value || "").trim();
  if (!text) return fallback;
  if (/即时|无需加热|离火/.test(text)) return 30;

  const numbers = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  if (!numbers.length) return fallback;

  const maxNumber = Math.max(...numbers);
  const minutes = /分钟|分/.test(text) ? maxNumber * 60 : 0;
  const secondsMatch = text.match(/(\d+(?:\.\d+)?)\s*秒/);
  const seconds = secondsMatch ? Number(secondsMatch[1]) : 0;

  if (minutes && seconds && !text.includes("-")) {
    const minuteMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:分钟|分)/);
    return Math.max(30, Math.round((Number(minuteMatch?.[1] || 0) * 60) + seconds));
  }

  return Math.max(30, Math.round(minutes || maxNumber));
}

function getCookingTasks(recipe) {
  if (!recipe) return [];
  if (recipe.sop) {
    const prepTasks = (recipe.sop.prep || []).map((step, index) => ({
      ...step,
      phase: "预处理",
      phaseIndex: index + 1,
    }));
    const cookTasks = (recipe.sop.cook || []).map((step, index) => ({
      ...step,
      phase: "烹饪",
      phaseIndex: index + 1,
    }));
    return [...prepTasks, ...cookTasks].map((step, index) => ({
      title: step.title || `${step.phase} ${step.phaseIndex}`,
      detail: step.detail || "",
      purpose: step.purpose || "降低失败率，稳定口味和口感。",
      time: step.time || "",
      heat: step.heat || "",
      phase: step.phase,
      phaseIndex: step.phaseIndex,
      globalIndex: index,
    }));
  }

  return getEffectiveRecipeSteps(recipe).map((step, index) => ({
    title: `步骤 ${index + 1}`,
    detail: step,
    purpose: "先完成当前动作，再进入下一步。",
    time: "",
    heat: "",
    phase: "做法",
    phaseIndex: index + 1,
    globalIndex: index,
  }));
}

function getCookingTaskSeconds(recipe, task, totalTasks) {
  const fallback = getCookingStepSeconds(recipe, totalTasks);
  return parseDurationToSeconds(task?.time, fallback);
}

function getTaskText(task) {
  return [task?.title, task?.detail, task?.purpose, task?.heat].filter(Boolean).join(" ");
}

function getTaskRelevantSopItems(recipe, task) {
  const items = recipe.sop?.items || [];
  if (!items.length || !task) return [];
  const text = getTaskText(task);
  const hits = items.filter((item) => text.includes(item.name));
  return hits.length ? hits : [];
}

function getSopItemInventoryClass(item, stats, recipe) {
  const displayName = formatSopItemName(recipe, item.name);
  if (item.type === "调料") return stats.missingSeasonings.includes(displayName) || stats.missingSeasonings.includes(item.name) ? "seasoning missing" : "seasoning";
  return stats.missingIngredients.includes(displayName) || stats.missingIngredients.includes(item.name) ? "missing" : "";
}

function getRecipeQualityReport(recipe) {
  const issues = [];
  const warnings = [];
  const sop = recipe.sop;

  if (!recipe.desc) warnings.push("缺少菜品介绍");
  if (!recipe.minutes) warnings.push("缺少总耗时");
  if (!recipe.image && !recipeImageSources[recipe.id]) warnings.push("缺少菜品图");

  if (!sop) {
    issues.push("缺少教学 SOP");
  } else {
    const ingredientItems = getSopItems(recipe, "食材");
    const seasoningItems = getSopItems(recipe, "调料");
    const prepSteps = sop.prep || [];
    const cookSteps = sop.cook || [];
    const checkpoints = sop.checkpoints || [];

    if (!sop.yield) warnings.push("缺少标准份量");
    if (!sop.equipment?.length) warnings.push("缺少厨房工具");
    if (!ingredientItems.length) issues.push("SOP 缺少标准食材用量");
    if (!seasoningItems.length) issues.push("SOP 缺少标准调料用量");
    if (!prepSteps.length) issues.push("SOP 缺少预处理步骤");
    if (!cookSteps.length) issues.push("SOP 缺少烹饪步骤");
    if (!checkpoints.length) warnings.push("缺少关键检查点");

    const missingAmounts = [...ingredientItems, ...seasoningItems].filter((item) => !item.amount);
    const missingPurposes = [
      ...ingredientItems.filter((item) => !item.purpose),
      ...seasoningItems.filter((item) => !item.purpose),
      ...prepSteps.filter((step) => !step.purpose),
      ...cookSteps.filter((step) => !step.purpose),
    ];
    if (missingAmounts.length) warnings.push(`${missingAmounts.length} 项材料缺少克数/用量`);
    if (missingPurposes.length) warnings.push(`${missingPurposes.length} 项 SOP 缺少“这样做的目的”`);

    const sopIngredientNames = ingredientItems.map((item) => item.name);
    const sopSeasoningNames = seasoningItems.map((item) => item.name);
    recipe.ingredients.forEach((name) => {
      if (!sopIngredientNames.includes(name)) warnings.push(`食材“${name}”未进入 SOP 用量表`);
    });
    recipe.seasonings.forEach((name) => {
      if (!sopSeasoningNames.includes(name)) warnings.push(`调料“${name}”未进入 SOP 用量表`);
    });
  }

  const status = issues.length ? "risk" : warnings.length ? "review" : "ready";
  const label = status === "ready" ? "SOP质检通过" : status === "review" ? "建议复核" : "需要补全";
  return { status, label, issues, warnings };
}

function applyRecipeReplacement(recipeId, original, replacement) {
  if (!recipeId || !original || !replacement) return;
  state.recipeReplacements = {
    ...(state.recipeReplacements || {}),
    [recipeId]: {
      ...(state.recipeReplacements?.[recipeId] || {}),
      [original]: replacement,
    },
  };
  saveState();
  render();
}

function previewItems(items) {
  if (!items.length) return "尚未选择";
  return items.slice(0, 5).join("、") + (items.length > 5 ? ` 等${items.length}项` : "");
}

function getRecipeStats(recipe) {
  const effectiveRecipe = getEffectiveRecipe(recipe);
  const seasoningNames = getSeasoningNames();
  const ingredientOwned = effectiveRecipe.ingredients.filter((item) => state.ingredients.includes(item));
  const seasoningOwned = effectiveRecipe.seasonings.filter((item) => seasoningNames.includes(item));
  const ignoredMissingIngredients = getAvoidedOptionalMissingIngredients(recipe);
  const missingIngredients = effectiveRecipe.ingredients.filter((item) => !state.ingredients.includes(item) && !ignoredMissingIngredients.includes(item));
  const missingSeasonings = effectiveRecipe.seasonings.filter((item) => !seasoningNames.includes(item));
  const total = effectiveRecipe.ingredients.length + effectiveRecipe.seasonings.length - ignoredMissingIngredients.length;
  const owned = ingredientOwned.length + seasoningOwned.length;
  const match = Math.round((owned / Math.max(total, 1)) * 100);

  return { ingredientOwned, seasoningOwned, missingIngredients, missingSeasonings, ignoredMissingIngredients, match };
}

function getExpiryStatus(expiry) {
  if (!expiry) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiryDate = new Date(`${expiry}T00:00:00`);
  const daysLeft = Math.ceil((expiryDate - today) / 86400000);
  if (Number.isNaN(daysLeft)) return null;
  if (daysLeft < 0) return { type: "expired", label: `已过期${Math.abs(daysLeft)}天`, daysLeft };
  if (daysLeft <= EXPIRY_WARNING_DAYS) return { type: "soon", label: `${daysLeft}天后过期`, daysLeft };
  return { type: "fresh", label: `${daysLeft}天后过期`, daysLeft };
}

function getExpiringSeasonings() {
  return state.seasonings
    .map((item) => ({ ...item, status: getExpiryStatus(item.expiry) }))
    .filter((item) => item.status && item.status.type !== "fresh")
    .sort((a, b) => a.status.daysLeft - b.status.daysLeft);
}

function getExpiryAlertKey(items) {
  return items.map((item) => `${item.name}:${item.expiry}:${item.status.type}`).join("|");
}

function getSeasoningAlertKey(item) {
  return `${item.name}:${item.expiry}:${item.status.type}`;
}

function getPurchasePlan() {
  const chosenRecipes = getMealPlanRecipes();
  const sourceRecipes = chosenRecipes.length ? chosenRecipes : filteredRecipes().slice(0, 5);
  const candidates = sourceRecipes
    .map((recipe) => ({ recipe, stats: getRecipeStats(recipe) }))
    .filter((item) => item.stats.missingIngredients.length || item.stats.missingSeasonings.length || chosenRecipes.length);

  const ingredients = new Map();
  const seasonings = new Map();

  candidates.forEach(({ recipe, stats }) => {
    stats.missingIngredients.forEach((name) => {
      if (!ingredients.has(name)) ingredients.set(name, []);
      ingredients.get(name).push(recipe.name);
    });
    stats.missingSeasonings.forEach((name) => {
      if (!seasonings.has(name)) seasonings.set(name, []);
      seasonings.get(name).push(recipe.name);
    });
  });

  return {
    recipes: candidates,
    ingredients: [...ingredients.entries()].map(([name, recipeNames]) => ({ name, recipeNames })),
    seasonings: [...seasonings.entries()].map(([name, recipeNames]) => ({ name, recipeNames })),
    fromMealPlan: !!chosenRecipes.length,
  };
}

function getRecipeIngredientSubstitutes(recipe, name) {
  if (!recipe?.substitutes?.length) return [];
  return recipe.substitutes
    .filter((item) => item.from === name)
    .map((item) => ({
      name: item.name,
      note: item.note || "后台维护的替代食材",
    }));
}

function getIngredientSubstitutes(name, recipe = null) {
  const suggestions = [...getRecipeIngredientSubstitutes(recipe, name), ...(substituteSuggestions[name] || [])];
  const seen = new Set();
  return suggestions.filter((item) => {
    if (!item?.name || seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

function getMissingSubstitutes(missingIngredients, recipe = null) {
  return missingIngredients
    .map((name) => ({
      name,
      suggestions: getIngredientSubstitutes(name, recipe)
        .filter((item) => !getReplacementConflict(item.name))
        .map((item) => ({
          ...item,
          owned: state.ingredients.includes(item.name),
        })),
    }))
    .filter((item) => item.suggestions.length);
}

function renderSubstituteSuggestions(missingIngredients, compact = false, recipe = null) {
  const suggestions = getMissingSubstitutes(missingIngredients, recipe);
  if (!suggestions.length) return "";

  return `
    <section class="${compact ? "substitute-panel compact" : "recipe-info-section substitute-panel"}">
      <h3>可替代食材</h3>
      <div class="substitute-list">
        ${suggestions
          .map(
            (item) => `
              <article class="substitute-item">
                <strong>缺 ${item.name}</strong>
                <div>
                  ${item.suggestions
                    .map(
                      (suggestion) => `
                        <span class="${suggestion.owned ? "owned" : ""}">
                          ${suggestion.name}${suggestion.owned ? " · 库存有" : ""}
                          <small>${suggestion.note}</small>
                        </span>
                      `,
                    )
                    .join("")}
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderTabooPills(recipe, stats) {
  const hits = getRecipeTabooHits(recipe);
  const absolutePills = hits.absoluteHits.map((hit) => `<span class="meta-pill danger">含${hit.ingredients.join("、")} · ${hit.replacements.length ? "可替换" : "需确认"}</span>`);
  const avoidPills = hits.avoidHits.map((hit) => `<span class="meta-pill caution">含${hit.ingredients.join("、")} · ${hit.optional ? "可不加" : "尽量少放"}</span>`);
  const ignoredMissingPills = stats.ignoredMissingIngredients.map((item) => `<span class="meta-pill caution">缺${item} · 已按偏好忽略</span>`);
  return [...absolutePills, ...avoidPills, ...ignoredMissingPills].join("");
}

function renderAbsoluteTabooPanel(recipe, compact = false) {
  const hits = getRecipeTabooHits(recipe).absoluteHits;
  if (!hits.length) return "";

  return `
    <section class="${compact ? "taboo-panel compact" : "recipe-info-section taboo-panel"}">
      <h3>忌口提醒</h3>
      <div class="taboo-list">
        ${hits
          .map(
            (hit) => `
              <article>
                <strong>包含 ${hit.ingredients.join("、")}</strong>
                <p>你已设置“${hit.taboo}”为绝对禁忌，这道菜已被置后。继续查看前请确认，或直接改做替换版本。</p>
                ${
                  hit.replacements.length
                    ? `<div>${hit.replacements.map((item) => `<button type="button" data-replace-recipe="${recipe.id}" data-replace-original="${hit.ingredients[0]}" data-replace-with="${item.name}">${item.name}<small>${item.note}</small></button>`).join("")}</div>`
                    : `<p class="taboo-empty-note">暂时没有不冲突的替代建议，可返回选择其他菜谱。</p>`
                }
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderRecipeReplacementNote(recipe) {
  const replacements = getRecipeReplacements(recipe.id);
  const entries = Object.entries(replacements);
  if (!entries.length) return "";
  return `
    <section class="recipe-info-section replacement-note">
      <h3>已应用替换</h3>
      <div class="required-grid">
        ${entries.map(([original, replacement]) => `<span>${original} → ${replacement}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderAvoidTabooPanel(recipe) {
  const hits = getRecipeTabooHits(recipe).avoidHits;
  if (!hits.length) return "";

  return `
    <section class="recipe-info-section avoid-panel">
      <h3>可按偏好调整</h3>
      <p>这些属于你不喜欢或可省略的配菜，系统会在缺少时自动降低补买优先级。</p>
      <div class="required-grid">
        ${hits.map((hit) => `<span class="avoid">${hit.ingredients.join("、")} · ${hit.optional ? "可不添加" : "尽量少放"}</span>`).join("")}
      </div>
    </section>
  `;
}

function formatSopItemName(recipe, name) {
  return applyReplacementsToText(recipe, name);
}

function renderSopItems(recipe, type, defaultOpen = false) {
  const items = getSopItems(recipe, type);
  if (!items.length) return "";

  return `
    <details class="recipe-info-section sop-section" ${defaultOpen ? "open" : ""}>
      <summary class="sop-section-head">
        <h3>${type === "食材" ? "标准食材用量" : "标准调料用量"}</h3>
        <span>${items.length} 项</span>
      </summary>
      <div class="sop-item-list">
        ${items
          .map(
            (item) => `
              <article class="sop-item ${type === "调料" ? "seasoning" : ""}">
                <div>
                  <strong>${formatSopItemName(recipe, item.name)}</strong>
                  <span>${item.amount || "按需"}</span>
                </div>
                <p>${applyReplacementsToText(recipe, item.prep || "按菜谱处理")}</p>
                <small>${item.time || "即时"} · ${applyReplacementsToText(recipe, item.purpose || "帮助稳定成菜效果")}</small>
              </article>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}

function getRecipeMissingItems(recipe) {
  const stats = getRecipeStats(recipe);
  return [...stats.missingIngredients, ...stats.missingSeasonings];
}

function renderRecipePurchaseNudge(recipe) {
  const missingItems = getRecipeMissingItems(recipe);
  if (!missingItems.length) return "";
  return `
    <section class="purchase-nudge">
      <div>
        <strong>还缺 ${missingItems.length} 样</strong>
        <span>${missingItems.slice(0, 4).join("、")}${missingItems.length > 4 ? ` 等` : ""}</span>
      </div>
      <button type="button" data-go-purchase>去采购</button>
    </section>
  `;
}

function renderSopProcedure(recipe, key, title, defaultOpen = false) {
  const steps = recipe.sop?.[key] || [];
  if (!steps.length) return "";

  return `
    <details class="recipe-info-section sop-section" ${defaultOpen ? "open" : ""}>
      <summary class="sop-section-head">
        <h3>${title}</h3>
        <span>${steps.length} 步</span>
      </summary>
      <div class="sop-step-list">
        ${steps
          .map(
            (step, index) => `
              <article class="sop-step">
                <div class="sop-step-index">${index + 1}</div>
                <div>
                  <div class="sop-step-title">
                    <strong>${step.title}</strong>
                    <span>${[step.time, step.heat].filter(Boolean).join(" · ")}</span>
                  </div>
                  <p>${applyReplacementsToText(recipe, step.detail || "")}</p>
                  <small>目的：${applyReplacementsToText(recipe, step.purpose || "降低失败率，稳定口味和口感。")}</small>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderSopCheckpoints(recipe, defaultOpen = false) {
  const checkpoints = recipe.sop?.checkpoints || [];
  if (!checkpoints.length) return "";

  return `
    <details class="recipe-info-section sop-checkpoints" ${defaultOpen ? "open" : ""}>
      <summary>
        <h3>关键检查点</h3>
        <span>${checkpoints.length} 条</span>
      </summary>
      <div>
        ${checkpoints.map((item) => `<span>${applyReplacementsToText(recipe, item)}</span>`).join("")}
      </div>
    </details>
  `;
}

function renderRecipeSop(recipe) {
  if (!recipe.sop) return "";
  const tasks = getCookingTasks(recipe);

  return `
    <section class="recipe-info-section sop-summary">
      <div>
        <h3>教学 SOP</h3>
        <p>${recipe.sop.yield || "按 1-2 人份设计"} · ${recipe.sop.equipment?.join("、") || "使用常见厨房工具"}</p>
      </div>
      <span>${tasks.length} 步</span>
    </section>
    ${renderSopItems(recipe, "食材", true)}
    ${renderSopItems(recipe, "调料")}
    ${renderSopProcedure(recipe, "prep", "预处理 SOP", true)}
    ${renderSopProcedure(recipe, "cook", "烹饪 SOP", true)}
    ${renderSopCheckpoints(recipe)}
  `;
}

function renderRecipeQuickFacts(recipe, stats) {
  const tasks = getCookingTasks(recipe);
  const missingCount = stats.missingIngredients.length + stats.missingSeasonings.length;
  const prepCount = recipe.sop?.prep?.length || 0;
  const cookCount = recipe.sop?.cook?.length || getEffectiveRecipeSteps(recipe).length;

  return `
    <section class="recipe-info-section recipe-quick-facts">
      <article>
        <strong>${recipe.sop?.yield || "1-2人份"}</strong>
        <span>标准份量</span>
      </article>
      <article>
        <strong>${tasks.length || cookCount} 步</strong>
        <span>${prepCount ? `${prepCount} 预处理 · ${cookCount} 烹饪` : "简明做法"}</span>
      </article>
      <article class="${missingCount ? "warn" : "ready"}">
        <strong>${missingCount ? `缺 ${missingCount} 项` : "材料已齐"}</strong>
        <span>${missingCount ? "可先补买" : "可以直接做"}</span>
      </article>
    </section>
  `;
}

function openTabooWarning(recipeId) {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return;
  pendingTabooRecipeId = recipeId;
  elements.tabooWarningBody.innerHTML = `
    <div class="taboo-warning-copy">
      <strong>${recipe.name}</strong>
      <p>这道菜命中了你的绝对忌口。系统不会替你隐藏它，但会把这类菜谱置后，并在打开前提醒你确认。</p>
    </div>
    ${renderAbsoluteTabooPanel(recipe)}
  `;
  showModalAtTop(elements.tabooWarningModal, elements.tabooWarningBody);
}

function closeTabooWarning() {
  pendingTabooRecipeId = "";
  elements.tabooWarningModal.hidden = true;
}

function continueTabooRecipe() {
  const recipeId = pendingTabooRecipeId;
  closeTabooWarning();
  if (recipeId) openRecipeInfo(recipeId);
}

function handleRecipeReplacementClick(event) {
  const button = event.target.closest("[data-replace-recipe]");
  if (!button) return false;
  const recipeId = button.dataset.replaceRecipe;
  const original = button.dataset.replaceOriginal;
  const replacement = button.dataset.replaceWith;
  applyRecipeReplacement(recipeId, original, replacement);
  button.textContent = `已替换为${replacement}`;
  if (!elements.tabooWarningModal.hidden) {
    closeTabooWarning();
    openRecipeInfo(recipeId);
  } else {
    openRecipeInfo(recipeId);
  }
  return true;
}

function getRequiredIngredientClass(item, stats, recipe) {
  const hits = getRecipeTabooHits(recipe);
  const classes = [];
  if (stats.missingIngredients.includes(item)) classes.push("missing");
  if (stats.ignoredMissingIngredients.includes(item)) classes.push("ignored");
  if (hits.absoluteHits.some((hit) => hit.ingredients.includes(item))) classes.push("taboo");
  if (hits.avoidHits.some((hit) => hit.ingredients.includes(item))) classes.push("avoid");
  return classes.join(" ");
}

function getPurchaseKeywords() {
  const plan = getPurchasePlan();
  const items = [...plan.ingredients, ...plan.seasonings].map((item) => item.name);
  return items.length ? items.join("、") : "家常菜食材";
}

function getMealPrepPlan() {
  const planRecipes = getMealPlanRecipes();
  const prepMap = new Map();

  planRecipes.forEach((recipe) => {
    getEffectiveRecipe(recipe).ingredients.forEach((ingredient) => {
      if (!prepMap.has(ingredient)) prepMap.set(ingredient, []);
      prepMap.get(ingredient).push(recipe);
    });
  });

  return [...prepMap.entries()]
    .map(([name, recipeList]) => {
      const estimate = prepEstimates[name] || { grams: 0, unit: "份", action: "按菜谱适量处理" };
      const portions = recipeList.length;
      const totalGrams = estimate.grams ? estimate.grams * portions : 0;
      return {
        name,
        portions,
        totalGrams,
        gramsPerPortion: estimate.grams,
        unit: estimate.unit,
        action: estimate.action,
        recipeUsages: recipeList.map((recipe) => ({
          name: recipe.name,
          grams: estimate.grams,
        })),
      };
    })
    .sort((a, b) => b.portions - a.portions || a.name.localeCompare(b.name, "zh-Hans-CN"));
}

function getFilterOption(groupId, optionId) {
  const group = recipeFilterGroups.find((item) => item.id === groupId);
  return group?.options.find((option) => option.id === optionId);
}

function countActiveRecipeFilters(filters = activeRecipeFilters) {
  return Object.values(filters).reduce((sum, values) => sum + values.length, 0);
}

function getActiveRecipeFilterLabels(filters = activeRecipeFilters) {
  return recipeFilterGroups.flatMap((group) =>
    (filters[group.id] || []).map((optionId) => getFilterOption(group.id, optionId)?.label).filter(Boolean)
  );
}

function matchesActiveRecipeFilters(recipe) {
  return recipeFilterGroups.every((group) => {
    const selected = activeRecipeFilters[group.id] || [];
    if (!selected.length) return true;
    return selected.some((optionId) => getFilterOption(group.id, optionId)?.test(recipe));
  });
}

function getMissingCount(stats) {
  return stats.missingIngredients.length + stats.missingSeasonings.length;
}

function getDifficultyRank(recipe) {
  if (recipe.difficulty.includes("新手")) return 0;
  if (recipe.difficulty === "简单") return 1;
  return 2;
}

function getRecipeVisual(recipe) {
  const text = `${recipe.name} ${getEffectiveRecipe(recipe).ingredients.join(" ")} ${recipe.flavor}`;
  if (/番茄|红烧|可乐|酸甜/.test(text)) return { bg: "#fff1ed", accent: "#e85b3f", food: "#f6c35b" };
  if (/青菜|生菜|西兰花|芹菜|黄瓜|包菜|素菜|清爽|清淡/.test(text)) return { bg: "#edf8ef", accent: "#2f8f54", food: "#b6df86" };
  if (/鸡|蛋|虾|鱼|高蛋白/.test(text)) return { bg: "#fff8df", accent: "#d99418", food: "#f7d37b" };
  if (/牛|肉|排骨|浓郁/.test(text)) return { bg: "#f8eee8", accent: "#9b4b2d", food: "#df8a62" };
  if (/辣|麻婆|宫保|酸辣/.test(text)) return { bg: "#fff0e5", accent: "#c7432b", food: "#f4a85d" };
  if (/粥|汤|羹|面|粉/.test(text)) return { bg: "#eef6fb", accent: "#3f7f9f", food: "#d9ecf4" };
  return { bg: "#f3f6ee", accent: "#6d8f4e", food: "#d6e2bd" };
}

function getRecipeImage(recipe) {
  return recipe.image || recipeImages[recipe.id] || recipeImageSources[recipe.id] || getRecipeFallbackImage(recipe);
}

function getRecipeImageFallbackAttribute(recipe) {
  return `this.onerror=null;this.src='${getRecipeFallbackImage(recipe)}';`;
}

function renderRecipeTutorial(recipe) {
  const tutorial = recipe.tutorial || recipeTutorials[recipe.id];
  const hasUrl = tutorial?.url;
  const title = tutorial?.title || `${recipe.name}教学视频`;
  const platform = tutorial?.platform || "待维护";

  return `
    <section class="recipe-info-section tutorial-panel">
      <div>
        <p class="eyebrow">教学视频</p>
        <h3>${title}</h3>
        <span>${hasUrl ? platform : "后续可维护 B站 / 抖音 / 小红书等平台教程链接"}</span>
      </div>
      ${
        hasUrl
          ? `<a class="tutorial-link" href="${tutorial.url}" target="_blank" rel="noopener noreferrer">打开教程</a>`
          : `<button class="tutorial-link disabled" type="button" disabled>待补充</button>`
      }
    </section>
  `;
}

function getRecipeFallbackImage(recipe) {
  const visual = getRecipeVisual(recipe);
  const label = recipe.name.slice(0, 4);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="18" fill="${visual.bg}"/>
      <circle cx="50" cy="50" r="31" fill="#fff" opacity=".9"/>
      <ellipse cx="50" cy="55" rx="28" ry="20" fill="${visual.food}"/>
      <circle cx="36" cy="42" r="7" fill="${visual.accent}" opacity=".88"/>
      <circle cx="60" cy="45" r="8" fill="${visual.accent}" opacity=".72"/>
      <path d="M26 72c12 7 36 7 48 0" fill="none" stroke="${visual.accent}" stroke-width="5" stroke-linecap="round" opacity=".34"/>
      <text x="50" y="88" text-anchor="middle" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="11" font-weight="700" fill="${visual.accent}">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function filteredRecipes() {
  const query = activeSearchQuery.toLowerCase();
  return getAllRecipes()
    .filter(matchesActiveRecipeFilters)
    .filter((recipe) => {
      if (!query) return true;
      const searchable = [
        recipe.name,
        recipe.desc,
        recipe.difficulty,
        recipe.flavor,
        recipe.health,
        ...recipe.tags,
        ...getEffectiveRecipe(recipe).ingredients,
        ...recipe.seasonings,
        ...recipe.steps,
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(query);
    })
    .sort((a, b) => {
      const statA = getRecipeStats(a);
      const statB = getRecipeStats(b);
      const missingA = getMissingCount(statA);
      const missingB = getMissingCount(statB);
      const tabooA = getTabooRankPenalty(a);
      const tabooB = getTabooRankPenalty(b);

      if (tabooA !== tabooB) return tabooA - tabooB;
      if (elements.sortSelect.value === "time") return a.minutes - b.minutes;
      if (elements.sortSelect.value === "buyLess") {
        return missingA - missingB || statB.match - statA.match || a.minutes - b.minutes;
      }
      if (elements.sortSelect.value === "easyFirst") {
        return getDifficultyRank(a) - getDifficultyRank(b) || a.minutes - b.minutes || missingA - missingB;
      }
      return statB.match - statA.match || missingA - missingB || a.minutes - b.minutes;
    });
}

function renderRecipeFilterSummary() {
  const count = countActiveRecipeFilters();
  const labels = getActiveRecipeFilterLabels();
  elements.filterCount.hidden = !count;
  elements.filterCount.textContent = count;
  elements.clearActiveFilters.hidden = !count;
  elements.filterSummary.textContent = count ? `筛选中：${labels.slice(0, 3).join("、")}${count > 3 ? `等 ${count} 项` : ""}` : "全部菜谱";
}

function renderRecipeFilterOptions() {
  elements.recipeFilterOptions.innerHTML = recipeFilterGroups
    .map(
      (group) => `
        <section class="filter-group">
          <div class="filter-group-head">
            <h3>${group.title}</h3>
          </div>
          <div class="filter-option-grid">
            ${group.options
              .map(
                (option) => `
                  <button
                    class="filter-option ${(draftRecipeFilters[group.id] || []).includes(option.id) ? "selected" : ""}"
                    type="button"
                    data-filter-group="${group.id}"
                    data-filter-option="${option.id}"
                  >${option.label}</button>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function openRecipeFilter() {
  draftRecipeFilters = cloneRecipeFilters(activeRecipeFilters);
  renderRecipeFilterOptions();
  showModalAtTop(elements.recipeFilterModal, elements.recipeFilterOptions);
}

function closeRecipeFilter() {
  elements.recipeFilterModal.hidden = true;
}

function applyRecipeFilters() {
  activeRecipeFilters = cloneRecipeFilters(draftRecipeFilters);
  detailVisible = false;
  detailExpanded = false;
  resetRecipePagination();
  closeRecipeFilter();
  render();
}

function resetDraftRecipeFilters() {
  draftRecipeFilters = createEmptyRecipeFilters();
  renderRecipeFilterOptions();
}

function clearActiveRecipeFilters() {
  activeRecipeFilters = createEmptyRecipeFilters();
  draftRecipeFilters = createEmptyRecipeFilters();
  detailVisible = false;
  detailExpanded = false;
  resetRecipePagination();
  render();
}

function renderProfile() {
  const name = state.profile.name || "你";
  const flavors = state.profile.flavors.join("、");
  const tabooCount = getAbsoluteTaboos().length + getAvoidTaboos().length;
  elements.profileSummary.textContent = `${state.profile.goal} · 偏好${flavors}${tabooCount ? ` · 忌口${tabooCount}项` : ""}`;
  elements.myUserName.textContent = name;

  const expiring = getExpiringSeasonings().filter((item) => !state.ignoredSeasoningAlerts.includes(getSeasoningAlertKey(item)));
  const alertKey = getExpiryAlertKey(expiring);
  if (!expiring.length || state.ignoredExpiryAlertKey === alertKey) {
    elements.expiryAlert.hidden = true;
    elements.expiryAlert.innerHTML = "";
    return;
  }

  const text = expiring.map((item) => `${item.name}${item.status.label}`).join("，");
  elements.expiryAlert.hidden = false;
  elements.expiryAlert.innerHTML = `
    <div>
      <strong>调料提醒</strong>
      <span>${text}，建议补买或检查。</span>
    </div>
    <div class="expiry-alert-actions">
      <button type="button" data-open-seasoning-alerts>去处理</button>
      <button type="button" data-dismiss-expiry-alert="${alertKey}">忽略</button>
    </div>
  `;
}

function renderMyPanel() {
  const flavors = state.profile.flavors.length ? state.profile.flavors : ["清淡"];
  const allExpiring = getExpiringSeasonings();
  const expiring = allExpiring.filter((item) => !state.ignoredSeasoningAlerts.includes(getSeasoningAlertKey(item)));
  const ignoredExpiring = allExpiring.filter((item) => state.ignoredSeasoningAlerts.includes(getSeasoningAlertKey(item)));
  const favoritesCount = state.favorites.length;
  const mealPlanCount = state.mealPlan.length;

  elements.myGoalTags.innerHTML = `
    <span class="my-tag primary">${state.profile.goal}</span>
  `;

  elements.myFlavorTags.innerHTML = flavors.map((item) => `<span class="my-tag">${item}</span>`).join("");
  const absoluteTaboos = getAbsoluteTaboos();
  const avoidTaboos = getAvoidTaboos();
  elements.myTabooTags.innerHTML =
    absoluteTaboos.length || avoidTaboos.length
      ? `
        <div class="taboo-summary-group danger">
          <strong>绝对禁忌</strong>
          <div>
            ${
              absoluteTaboos.length
                ? absoluteTaboos.map((item) => `<span class="my-tag danger">${item}</span>`).join("")
                : `<span class="muted-note">暂未设置</span>`
            }
          </div>
        </div>
        <div class="taboo-summary-group soft">
          <strong>不喜欢/可省略</strong>
          <div>
            ${
              avoidTaboos.length
                ? avoidTaboos.map((item) => `<span class="my-tag soft">${item}</span>`).join("")
                : `<span class="muted-note">暂未设置</span>`
            }
          </div>
        </div>
      `
      : `<span class="muted-note">暂未设置忌口。</span>`;

  elements.myKitchenStats.innerHTML = `
    <div>
      <strong>${state.ingredients.length}</strong>
      <span>现有食材</span>
    </div>
    <div>
      <strong>${state.seasonings.length}</strong>
      <span>调料库存</span>
    </div>
    <div>
      <strong>${favoritesCount}</strong>
      <span>收藏菜谱</span>
    </div>
    <div>
      <strong>${mealPlanCount}</strong>
      <span>制作清单</span>
    </div>
  `;

  elements.toggleSeasoningHistory.textContent = ignoredExpiring.length ? `历史 ${ignoredExpiring.length}` : "历史";

  elements.mySeasoningAlerts.innerHTML = expiring.length
    ? expiring
        .map(
          (item) => renderSeasoningAlertItem(item, "active"),
        )
        .join("")
    : `<div class="empty-state compact">暂无即将过期的调料。</div>`;

  renderSeasoningHistory();
}

function renderSeasoningHistory() {
  const ignoredExpiring = getExpiringSeasonings().filter((item) => state.ignoredSeasoningAlerts.includes(getSeasoningAlertKey(item)));
  elements.mySeasoningHistory.innerHTML = `
    <div class="history-head">
      <strong>提醒历史${ignoredExpiring.length ? ` · ${ignoredExpiring.length} 条` : ""}</strong>
      <span>被忽略的提醒会暂存在这里。误点忽略可以恢复，已经换新的调料可以直接更新有效期。</span>
    </div>
    ${
      ignoredExpiring.length
        ? ignoredExpiring.map((item) => renderSeasoningAlertItem(item, "history")).join("")
        : `<div class="empty-state compact">暂无被忽略的提醒。</div>`
    }
  `;
}

function renderSeasoningAlertItem(item, mode) {
  const isRenewing = renewingSeasoningName === item.name;
  const alertKey = getSeasoningAlertKey(item);
  const isHistory = mode === "history";
  const statusLabel = item.status.type === "expired" ? "已过期" : "即将过期";

  return `
    <div class="my-alert-item ${item.status.type} ${isHistory ? "history-item" : ""}">
      <div>
        <strong>${item.name}<small>${statusLabel}</small></strong>
        <span>${item.status.label}，建议补买或检查。</span>
      </div>
      ${
        isRenewing
          ? `
            <p class="renew-hint">选择这瓶调料新的有效期。</p>
            <div class="renew-row">
              <input type="date" data-renew-expiry="${item.name}" />
              <button type="button" data-save-renew="${item.name}">保存</button>
              <button type="button" data-cancel-renew>取消</button>
            </div>
            ${renderExpiryQuickButtons(item.name, "data-renew-expiry")}
          `
          : `
            <div class="my-alert-actions">
              ${
                isHistory
                  ? `<button class="alert-action-secondary" type="button" data-restore-seasoning-alert="${alertKey}">恢复提醒</button>`
                  : `<button class="alert-action-secondary" type="button" data-ignore-seasoning-alert="${alertKey}">稍后忽略</button>`
              }
              <button class="alert-action-primary" type="button" data-renew-seasoning="${item.name}">已补新</button>
            </div>
          `
      }
    </div>
  `;
}

function renderInventoryControls() {
  const isSeasoning = activeInventoryTab === "seasonings";
  const ingredientPreview = state.ingredients.length ? state.ingredients.slice(0, 3).join("、") : "先选几样食材";
  elements.inventoryCompactText.textContent = state.ingredients.length
    ? `${ingredientPreview}${state.ingredients.length > 3 ? ` 等 ${state.ingredients.length} 样` : ""}`
    : ingredientPreview;
  elements.editInventory.textContent = isSeasoning ? "编辑调料" : "编辑食材";
  elements.ingredientSection.hidden = isSeasoning;
  elements.seasoningSection.hidden = !isSeasoning;
  elements.inventoryTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.inventoryTab === activeInventoryTab);
  });
  renderInventoryInsights();
}

function renderInventoryInsights() {
  const recipeStats = getAllRecipes().map((recipe) => ({ recipe, stats: getRecipeStats(recipe) }));
  const readyCount = recipeStats.filter((item) => getMissingCount(item.stats) === 0).length;
  const nearlyCount = recipeStats.filter((item) => {
    const missing = getMissingCount(item.stats);
    return missing > 0 && missing <= 2;
  }).length;
  const expiringCount = getExpiringSeasonings().filter((item) => !state.ignoredSeasoningAlerts.includes(getSeasoningAlertKey(item))).length;
  const activeLabel = activeInventoryTab === "seasonings" ? "正在维护调料库存" : "正在维护现有食材";

  elements.inventoryInsights.innerHTML = `
    <div class="inventory-insight-card">
      <span>${activeLabel}</span>
      <strong>${readyCount} 道可直接做</strong>
    </div>
    <div class="inventory-insight-card">
      <span>稍微补买</span>
      <strong>${nearlyCount} 道只差 1-2 样</strong>
    </div>
    <div class="inventory-insight-card ${expiringCount ? "warn" : ""}">
      <span>调料提醒</span>
      <strong>${expiringCount ? `${expiringCount} 项快过期` : "暂无快过期"}</strong>
    </div>
  `;
}

function renderPurchasePanel() {
  const plan = getPurchasePlan();
  const ingredientCount = plan.ingredients.length;
  const seasoningCount = plan.seasonings.length;
  const recipeNames = plan.recipes.map((item) => item.recipe.name);
  const sourceText = plan.fromMealPlan ? "制作清单" : "推荐菜谱";
  const substituteBlock = renderSubstituteSuggestions(plan.ingredients.map((item) => item.name), true);

  elements.purchaseSummary.innerHTML = `
    <div>
      <p class="eyebrow">缺材概览</p>
      <strong>${ingredientCount + seasoningCount ? `缺 ${ingredientCount} 种食材 · ${seasoningCount} 种调料` : "当前推荐菜谱暂不需要补买"}</strong>
      <span>${recipeNames.length ? `基于${sourceText}：${recipeNames.join("、")} 生成` : "先从推荐页把想做的菜加入制作清单，再来这里汇总采购。"}</span>
    </div>
  `;

  if (!ingredientCount && !seasoningCount) {
    elements.purchaseList.innerHTML = `<div class="empty-state">目前没有需要补齐的材料。你可以去推荐页选择更多菜谱，或到库存页更新现有食材。</div>`;
  } else {
    elements.purchaseList.innerHTML = `
      <section class="purchase-section">
        <h3>需要补买的食材</h3>
        <div class="purchase-chip-list">
          ${plan.ingredients.map((item) => `<span class="purchase-chip">${item.name}<small>${item.recipeNames.slice(0, 2).join("、")}</small></span>`).join("") || `<span class="muted-note">食材已齐</span>`}
        </div>
      </section>
      ${substituteBlock}
      <section class="purchase-section">
        <h3>需要补买的调料</h3>
        <div class="purchase-chip-list">
          ${plan.seasonings.map((item) => `<span class="purchase-chip seasoning">${item.name}<small>${item.recipeNames.slice(0, 2).join("、")}</small></span>`).join("") || `<span class="muted-note">调料已齐</span>`}
        </div>
      </section>
    `;
  }

  elements.purchaseShops.innerHTML = shops
    .map(
      (shop) => `
        <button class="purchase-shop ${shop.primary ? "primary" : ""}" type="button" data-purchase-shop="${shop.name}">
          <strong>${shop.name}</strong>
          <span>${shop.name === "附近超市" ? "导航到线下超市" : "带清单去搜索"}</span>
        </button>
      `,
    )
    .join("");
}

function renderMealPlanPanel() {
  const planRecipes = getMealPlanRecipes();
  const prepPlan = getMealPrepPlan();
  const purchasePlan = getPurchasePlan();
  const totalPrepGrams = prepPlan.reduce((sum, item) => sum + item.totalGrams, 0);
  const repeatedItems = prepPlan.filter((item) => item.portions > 1);
  const missingCount = purchasePlan.ingredients.length + purchasePlan.seasonings.length;
  const prepPreview = prepPlan.slice(0, 3);
  const missingPreview = [...purchasePlan.ingredients, ...purchasePlan.seasonings].slice(0, 5);

  elements.mealPlanFab.hidden = !planRecipes.length || mealPlanDrawerOpen || activeView === "inventory" || activeView === "purchase" || activeView === "my";
  elements.mealPlanFabSummary.textContent = `${planRecipes.length} 道 · 缺 ${missingCount} 样`;
  elements.mealPlanFabCount.textContent = planRecipes.length;

  elements.mealPlanSummary.innerHTML = `
    <section class="meal-plan-drawer-head">
      <button class="drawer-handle" type="button" data-close-meal-plan aria-label="收起制作清单">
        <span></span>
      </button>
      <div class="meal-plan-title-row">
        <div>
          <p class="eyebrow">制作清单</p>
          <h2>${planRecipes.length ? `今晚先做 ${planRecipes.length} 道` : "清单还是空的"}</h2>
        </div>
        ${planRecipes.length ? `<button type="button" class="text-button" data-clear-meal-plan>清空</button>` : ""}
      </div>
      <div class="meal-plan-metrics">
        <span><strong>${planRecipes.length}</strong>道菜</span>
        <span><strong>${missingCount}</strong>样缺材</span>
        <span><strong>${prepPlan.length}</strong>项备菜</span>
      </div>
    </section>

    <section class="meal-plan-quick">
      <div class="meal-plan-list compact">
        ${
          planRecipes.length
            ? planRecipes
                .map(
                  (recipe) => `
                    <article class="meal-plan-item">
                      <div>
                        <strong>${recipe.name}</strong>
                        <span>${recipe.minutes}分钟 · ${recipe.flavor}</span>
                      </div>
                      <button type="button" aria-label="从制作清单移除${recipe.name}" data-remove-meal="${recipe.id}">移除</button>
                    </article>
                  `,
                )
                .join("")
            : `<div class="empty-state compact">制作清单还是空的。去推荐页打开菜谱详情，点“加入制作清单”。</div>`
        }
      </div>
      ${
        planRecipes.length
          ? `
            <div class="meal-plan-actions">
              ${missingCount ? `<button type="button" class="ghost-button" data-go-meal-purchase>去采购</button>` : ""}
              <button type="button" class="primary-button" data-start-first-meal>开始做</button>
            </div>
          `
          : `<button type="button" class="primary-button wide" data-close-meal-plan>继续选菜</button>`
      }
    </section>
  `;

  if (!planRecipes.length) {
    elements.mealPrepList.innerHTML = `<div class="empty-state">还没有可汇总的备菜任务。</div>`;
    return;
  }

  elements.mealPrepList.innerHTML = `
    <section class="meal-plan-next">
      <strong>${prepPlan.length} 种食材需要预处理</strong>
      <span>${repeatedItems.length ? `${repeatedItems.length} 种会被多道菜共用，建议先处理。` : "按菜谱顺序处理即可。"}</span>
      ${prepPreview.length ? `<div class="prep-preview">${prepPreview.map((item) => `<span>${item.name}${item.totalGrams ? ` · ${item.totalGrams}g` : ""}</span>`).join("")}</div>` : ""}
      ${missingPreview.length ? `<div class="missing-preview">${missingPreview.map((item) => `<span>${item.name}</span>`).join("")}</div>` : `<small>缺材已齐，可以直接开始做。</small>`}
    </section>

    <details class="meal-plan-details">
      <summary>查看菜品和备菜明细</summary>
      <section class="prep-overview">
        <strong>${prepPlan.length} 种食材需要预处理</strong>
        <span>${repeatedItems.length ? `${repeatedItems.length} 种食材被多道菜共用，建议先集中处理。` : "这些食材没有明显重复，可按菜谱顺序处理。"}</span>
        ${totalPrepGrams ? `<small>可估算总处理量约 ${totalPrepGrams}g</small>` : ""}
      </section>
      <section class="prep-list">
        ${prepPlan
          .map(
            (item) => `
              <article class="prep-card ${item.portions > 1 ? "highlight" : ""}">
                <div class="prep-card-head">
                  <div>
                    <h3>${item.name}</h3>
                    <p>${item.action}</p>
                  </div>
                  ${item.portions > 1 ? `<strong>${item.portions} 份</strong>` : ""}
                </div>
                ${
                  item.portions > 1
                    ? `
                      <div class="prep-measure">
                        ${item.totalGrams ? `<span>共约 ${item.totalGrams}g</span>` : `<span>按菜谱适量</span>`}
                      </div>
                      <div class="prep-usage-list">
                        ${item.recipeUsages
                          .map(
                            (usage) => `
                              <span>
                                <strong>${usage.name}</strong>
                                <em>${usage.grams ? `约 ${usage.grams}g` : "适量"}</em>
                              </span>
                            `,
                          )
                          .join("")}
                      </div>
                    `
                    : `
                      <div class="prep-single-use">
                        <span>${item.totalGrams ? `约 ${item.totalGrams}g` : "适量"}</span>
                        <strong>用于 ${item.recipeUsages[0]?.name || "当前菜谱"}</strong>
                      </div>
                    `
                }
              </article>
            `,
          )
          .join("")}
      </section>
    </details>
  `;
}

function renderInventoryPreview(items, type) {
  const previewLimit = 8;
  const visibleItems = items.slice(0, previewLimit);
  const hiddenCount = Math.max(0, items.length - previewLimit);
  const label = type === "seasonings" ? "调料" : "食材";

  if (!items.length) {
    return `
      <div class="inventory-preview empty">
        <strong>还没有${label}</strong>
        <span>点击上方编辑添加</span>
      </div>
    `;
  }

  return `
    <div class="inventory-preview">
      <div class="inventory-preview-head">
        <strong>${items.length} 项${label}</strong>
        <span>${hiddenCount ? `显示常用 ${previewLimit} 项` : "已全部显示"}</span>
      </div>
      <div class="inventory-preview-chips">
        ${visibleItems
          .map((item) => {
            const name = type === "seasonings" ? item.name : item;
            const status = type === "seasonings" ? getExpiryStatus(item.expiry) : null;
            const expiryText = status ? `<small class="expiry-chip ${status.type}">${status.label}</small>` : "";
            return `<span class="chip ${type === "seasonings" ? "seasoning-chip" : ""}">${name}${expiryText}</span>`;
          })
          .join("")}
        ${hiddenCount ? `<span class="chip inventory-more-chip">+${hiddenCount}</span>` : ""}
      </div>
    </div>
  `;
}

function renderChips() {
  elements.ingredientChips.innerHTML = renderInventoryPreview(state.ingredients, "ingredients");
  elements.seasoningChips.innerHTML = renderInventoryPreview(state.seasonings, "seasonings");
}

function renderOnboardingInventorySummary() {
  elements.onboardingIngredientCount.textContent = `已选 ${state.ingredients.length} 项`;
  elements.onboardingIngredientPreview.textContent = previewItems(state.ingredients);
  elements.onboardingSeasoningCount.textContent = `已选 ${state.seasonings.length} 项`;
  elements.onboardingSeasoningPreview.textContent = previewItems(getSeasoningNames());
  const absoluteTaboos = getAbsoluteTaboos();
  const avoidTaboos = getAvoidTaboos();
  const totalTaboos = absoluteTaboos.length + avoidTaboos.length;
  elements.onboardingTabooCount.textContent = totalTaboos ? `已设置 ${totalTaboos} 项` : "未设置忌口";
  elements.onboardingTabooPreview.textContent = totalTaboos
    ? [`绝对禁忌：${previewItems(absoluteTaboos)}`, `不喜欢/可省略：${previewItems(avoidTaboos)}`].join(" · ")
    : "没有也可以先跳过。";
}

function renderQuickStartPanel() {
  if (!elements.quickStartSummary) return;
  const ingredientPreview = state.ingredients.length ? previewItems(state.ingredients.slice(0, 5)) : "";
  const readyCount = filteredRecipes().filter((recipe) => getMissingCount(getRecipeStats(recipe)) === 0).length;
  if (!state.ingredients.length) {
    elements.quickStartSummary.textContent = "先选 3-5 样食材，不用完整录入，我马上给你 3 道菜。";
    return;
  }
  elements.quickStartSummary.textContent = readyCount
    ? `根据 ${ingredientPreview}，现在有 ${readyCount} 道菜可以直接做。`
    : `根据 ${ingredientPreview}，先给你挑少买、好做的菜。`;
}

function renderRecipes() {
  const allVisibleRecipes = activeView === "favorites" ? filteredRecipes().filter((recipe) => isFavorite(recipe.id)) : filteredRecipes();
  const visibleRecipes = allVisibleRecipes.slice(0, visibleRecipeLimit);
  const canLoadMore = visibleRecipeLimit < allVisibleRecipes.length;
  elements.sectionTitle.textContent = activeView === "favorites" ? "我的收藏" : "推荐 3 道";
  elements.clearRecipeSearch.hidden = !activeSearchQuery;
  renderRecipeFilterSummary();

  if (!allVisibleRecipes.length) {
    const queryText = activeSearchQuery ? `没有找到包含“${activeSearchQuery}”的菜谱，换个关键词试试。` : "当前筛选下没有菜谱，试试切换条件或添加更多库存。";
    elements.recipeList.innerHTML =
      activeView === "favorites"
        ? `<div class="empty-state">${activeSearchQuery ? queryText : "还没有收藏菜谱，回到推荐页点 ⭐ 收藏喜欢的菜。"}</div>`
        : `<div class="empty-state">${queryText}</div>`;
    elements.recipeDetail.innerHTML = "";
    return;
  }

  if (!allVisibleRecipes.some((recipe) => recipe.id === selectedRecipeId)) {
    selectedRecipeId = allVisibleRecipes[0].id;
  }

  elements.recipeList.innerHTML = visibleRecipes
    .map((recipe) => {
      const stats = getRecipeStats(recipe);
      const missingCount = stats.missingIngredients.length + stats.missingSeasonings.length;
      const missingItems = [...stats.missingIngredients, ...stats.missingSeasonings];
      const missingText = missingCount
        ? `缺：${missingItems.slice(0, 2).join("、")}${missingCount > 2 ? ` +${missingCount - 2}` : ""}`
        : "材料已齐";
      const quickVerdict = missingCount
        ? missingCount <= 2
          ? `少买 ${missingCount} 样就能做`
          : "先当备选"
        : "现在就能做";
      const tabooPills = renderTabooPills(recipe, stats);

      return `
        <article class="recipe-card ${recipe.id === selectedRecipeId ? "active" : ""}" data-recipe="${recipe.id}">
          <div class="recipe-media">
            <img class="recipe-thumb" src="${getRecipeImage(recipe)}" alt="${recipe.name}" loading="lazy" onerror="${getRecipeImageFallbackAttribute(recipe)}" />
            <span class="match-pill">匹配 ${stats.match}%</span>
          </div>
          <div class="recipe-card-main">
            <div class="recipe-top">
              <div>
                <h3>${recipe.name}</h3>
                <p class="recipe-desc">${recipe.desc}</p>
              </div>
              <div class="recipe-actions">
                <button class="favorite-button ${isFavorite(recipe.id) ? "active" : ""}" type="button" data-favorite-recipe="${recipe.id}" aria-label="${isFavorite(recipe.id) ? "取消收藏" : "收藏"}${recipe.name}">
                  ${isFavorite(recipe.id) ? "★" : "☆"}
                </button>
              </div>
            </div>
            <div class="meta-row">
              <span class="meta-pill strong">${quickVerdict}</span>
              <span class="meta-pill">${recipe.difficulty}</span>
              <span class="meta-pill">${recipe.minutes}分钟</span>
              <span class="meta-pill ${missingCount ? "warn" : ""}">${missingText}</span>
              ${tabooPills}
            </div>
          </div>
        </article>
      `;
    })
    .join("") + renderLoadMoreState(visibleRecipes.length, allVisibleRecipes.length, canLoadMore);

  renderDetail();
}

function renderLoadMoreState(visibleCount, totalCount, canLoadMore) {
  if (canLoadMore) {
    return `
      <button class="load-more" type="button" data-load-more>
        再看 ${Math.min(RECIPE_LOAD_STEP, totalCount - visibleCount)} 道（${visibleCount}/${totalCount}）
      </button>
    `;
  }

  return `<div class="list-end">已显示全部 ${totalCount} 道菜谱</div>`;
}

function resetRecipePagination() {
  visibleRecipeLimit = INITIAL_RECIPE_LIMIT;
  elements.contentGrid.scrollTop = 0;
}

function loadMoreRecipes() {
  const total = activeView === "favorites" ? filteredRecipes().filter((recipe) => isFavorite(recipe.id)).length : filteredRecipes().length;
  if (visibleRecipeLimit >= total) return;
  visibleRecipeLimit = Math.min(visibleRecipeLimit + RECIPE_LOAD_STEP, total);
  renderRecipes();
}

function renderDetail() {
  if (!detailVisible) {
    elements.recipeDetail.hidden = true;
    elements.recipeDetail.innerHTML = "";
    return;
  }

  const recipe = getRecipeById(selectedRecipeId) || filteredRecipes()[0];
  const shouldResetDetailScroll = elements.recipeDetail.hidden || detailScrollRecipeId !== recipe.id;
  const stats = getRecipeStats(recipe);
  const missingCount = stats.missingIngredients.length + stats.missingSeasonings.length;
  const missingTags = [
    ...stats.missingIngredients.map((item) => `<span class="missing-tag">食材 · ${item}</span>`),
    ...stats.missingSeasonings.map((item) => `<span class="missing-tag seasoning">调料 · ${item}</span>`),
  ].join("");
  const substituteBlock = renderSubstituteSuggestions(stats.missingIngredients, true, recipe);
  const tabooBlock = renderAbsoluteTabooPanel(recipe, true);

  elements.recipeDetail.hidden = false;
  elements.recipeDetail.classList.toggle("expanded", detailExpanded);
  elements.recipeDetail.classList.toggle("collapsed", !detailExpanded);
  elements.recipeDetail.innerHTML = `
    <button class="drawer-handle" type="button" data-detail-toggle aria-label="${detailExpanded ? "收起缺材面板" : "展开缺材面板"}">
      <span></span>
    </button>
    <div class="detail-head">
      <div>
        <p class="eyebrow">缺材补齐</p>
        <h3>${recipe.name}</h3>
        <p class="missing-line">${missingTags ? `缺少 ${missingCount} 项，${detailExpanded ? "已区分食材与调料，可跳转线上平台或导航到附近超市。" : "上拉查看采购入口。"}` : "你的食材和调料已经齐了，可以直接跟着步骤做。"}</p>
      </div>
      <button class="collapse-button" type="button" data-detail-toggle>${detailExpanded ? "收起" : "上拉"}</button>
    </div>
    <div class="drawer-body">
      <div class="missing-tags">${missingTags || `<span class="missing-tag ready">无需补买</span>`}</div>
      ${tabooBlock}
      ${substituteBlock}
      <div class="shop-row">
        ${shops
          .map(
            (shop) => `
              <button class="shop-button ${shop.primary ? "primary" : ""}" data-shop="${shop.name}">
                ${shop.name === "附近超市" ? "导航" : "去购买"} · ${shop.name}
              </button>
            `,
          )
          .join("")}
      </div>
      <ol class="step-list">
        ${getEffectiveRecipeSteps(recipe).slice(0, 2).map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </div>
  `;
  if (shouldResetDetailScroll) resetScrollPosition(elements.recipeDetail);
  detailScrollRecipeId = recipe.id;
}

function openRecipeInfo(recipeId) {
  selectedRecipeId = recipeId;
  const recipe = getRecipeById(selectedRecipeId);
  if (!recipe) return;
  const effectiveRecipe = getEffectiveRecipe(recipe);
  const stats = getRecipeStats(recipe);
  const ingredientTags = effectiveRecipe.ingredients
    .map((item) => `<span class="${getRequiredIngredientClass(item, stats, recipe) || "owned"}">${item}</span>`)
    .join("");
  const seasoningTags = recipe.seasonings
    .map((item) => `<span class="seasoning ${stats.missingSeasonings.includes(item) ? "missing" : "owned"}">${item}</span>`)
    .join("");
  const sopBlock = renderRecipeSop(recipe);
  const ownedIngredients = effectiveRecipe.ingredients.filter((item) => state.ingredients.includes(item));
  const missingIngredients = stats.missingIngredients;
  const missingSeasonings = stats.missingSeasonings;
  const firstTasks = getCookingTasks(recipe).slice(0, 2);
  const prepPreview = firstTasks.length
    ? firstTasks.map((task) => `<li>${task.title}：${task.detail}</li>`).join("")
    : getEffectiveRecipeSteps(recipe)
        .slice(0, 2)
        .map((step) => `<li>${step}</li>`)
        .join("");
  const missingLine = [...missingIngredients, ...missingSeasonings].length
    ? [...missingIngredients, ...missingSeasonings].slice(0, 4).join("、")
    : "不用补买";

  elements.recipeInfoTitle.textContent = recipe.name;
  elements.addToMealPlan.textContent = isInMealPlan(recipe.id) ? "已加入清单" : "加入制作清单";
  elements.addToMealPlan.classList.toggle("active-soft", isInMealPlan(recipe.id));
  elements.recipeInfoBody.innerHTML = `
    <section class="recipe-hero">
      <img src="${getRecipeImage(recipe)}" alt="${recipe.name}" onerror="${getRecipeImageFallbackAttribute(recipe)}" />
      <div class="recipe-hero-overlay">
        <p class="eyebrow">菜谱详情</p>
        <h2>${recipe.name}</h2>
        <span>${recipe.minutes}分钟 · ${recipe.difficulty} · ${recipe.flavor}</span>
      </div>
    </section>
    <button class="favorite-row ${isFavorite(recipe.id) ? "active" : ""}" type="button" data-favorite-recipe="${recipe.id}">
      <span>${isFavorite(recipe.id) ? "★ 已收藏" : "☆ 收藏这道菜"}</span>
    </button>
    <section class="recipe-decision-card">
      <p>${recipe.desc}</p>
      <div>
        <strong>${missingLine}</strong>
        <span>${missingLine === "不用补买" ? "材料齐，直接开始做。" : "缺这些，能接受就继续。"}</span>
      </div>
    </section>
    <div class="recipe-info-meta">
      <span class="meta-pill">${recipe.difficulty}</span>
      <span class="meta-pill">${recipe.minutes}分钟</span>
      <span class="meta-pill">${recipe.flavor}</span>
      <span class="meta-pill">${recipe.health}</span>
    </div>
    ${renderRecipeQuickFacts(recipe, stats)}
    ${renderRecipePurchaseNudge(recipe)}
    ${renderRecipeReplacementNote(recipe)}
    <section class="recipe-info-section">
      <h3>你已有</h3>
      <div class="required-grid">
        ${ownedIngredients.length ? ownedIngredients.map((item) => `<span class="owned">${item}</span>`).join("") : `<span class="missing">还没录入食材</span>`}
      </div>
    </section>
    <section class="recipe-info-section">
      <h3>做之前</h3>
      <ol class="recipe-steps compact-steps">
        ${prepPreview}
      </ol>
    </section>
    ${renderAbsoluteTabooPanel(recipe)}
    ${renderAvoidTabooPanel(recipe)}
    ${renderSubstituteSuggestions(stats.missingIngredients, false, recipe)}
    <details class="advanced-recipe-detail">
      <summary>展开食材、调料和详细步骤</summary>
      ${
        sopBlock ||
        `
          <section class="recipe-info-section">
            <h3>所需食材</h3>
            <div class="required-grid">
              ${ingredientTags}
            </div>
          </section>
          <section class="recipe-info-section">
            <h3>所需调料</h3>
            <div class="required-grid">
              ${seasoningTags}
            </div>
          </section>
        `
      }
      <section class="recipe-info-section">
        <h3>${recipe.sop ? "简明做法" : "做法"}</h3>
        <ol class="recipe-steps">
          ${getEffectiveRecipeSteps(recipe).map((step) => `<li>${step}</li>`).join("")}
        </ol>
      </section>
      ${renderRecipeTutorial(recipe)}
    </details>
  `;
  showModalAtTop(elements.recipeInfoModal, elements.recipeInfoBody);
}

function closeRecipeInfo() {
  elements.recipeInfoModal.hidden = true;
}

function startCookingFlow() {
  closeRecipeInfo();
  detailVisible = true;
  detailExpanded = true;
  renderDetail();
  openCookingMode(selectedRecipeId);
}

function openCookingMode(recipeId) {
  selectedRecipeId = recipeId;
  cookingStepIndex = 0;
  cookingCompletedSteps = new Set();
  resetCookingTimerForCurrentStep();
  renderCookingMode();
  showModalAtTop(elements.cookingModeModal, elements.cookingModeBody);
}

function closeCookingMode() {
  stopCookingTimer();
  stopCookingSpeech();
  releaseCookingWakeLock();
  elements.cookingModeModal.hidden = true;
}

function getCurrentCookingRecipe() {
  return getRecipeById(selectedRecipeId);
}

function getCurrentCookingSteps() {
  const recipe = getCurrentCookingRecipe();
  return recipe ? getCookingTasks(recipe) : [];
}

function getCookingStepSeconds(recipe, totalSteps) {
  return Math.max(60, Math.round((recipe.minutes * 60) / Math.max(totalSteps, 1)));
}

function formatCookingTime(seconds) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = Math.max(0, seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function stopCookingTimer() {
  if (cookingTimerId) window.clearInterval(cookingTimerId);
  cookingTimerId = null;
  cookingTimerRunning = false;
}

function resetCookingTimerForCurrentStep() {
  const recipe = getCurrentCookingRecipe();
  const steps = getCurrentCookingSteps();
  stopCookingTimer();
  cookingTimerTotal = recipe ? getCookingTaskSeconds(recipe, steps[cookingStepIndex], steps.length) : 0;
  cookingTimerRemaining = cookingTimerTotal;
}

function startCookingTimer() {
  if (cookingTimerRunning || cookingTimerRemaining <= 0) return;
  cookingTimerRunning = true;
  cookingTimerId = window.setInterval(() => {
    cookingTimerRemaining = Math.max(0, cookingTimerRemaining - 1);
    if (cookingTimerRemaining <= 0) {
      stopCookingTimer();
      cookingCompletedSteps.add(cookingStepIndex);
    }
    renderCookingMode();
  }, 1000);
  renderCookingMode();
}

function toggleCookingTimer() {
  if (cookingTimerRunning) {
    stopCookingTimer();
    renderCookingMode();
    return;
  }
  startCookingTimer();
}

function resetCurrentCookingTimer() {
  resetCookingTimerForCurrentStep();
  renderCookingMode();
}

function toggleCurrentCookingStepDone() {
  if (cookingCompletedSteps.has(cookingStepIndex)) {
    cookingCompletedSteps.delete(cookingStepIndex);
  } else {
    cookingCompletedSteps.add(cookingStepIndex);
  }
  renderCookingMode();
}

function stopCookingSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function speakCurrentCookingStep() {
  const steps = getCurrentCookingSteps();
  const task = steps[cookingStepIndex];
  if (!task || !("speechSynthesis" in window)) return;
  stopCookingSpeech();
  const text = `${task.phase}，${task.title}。${task.detail}。${task.purpose ? `目的：${task.purpose}` : ""}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function toggleCookingVoice() {
  if (!("speechSynthesis" in window)) {
    cookingVoiceEnabled = false;
    cookingWakeLockMessage = "当前浏览器暂不支持语音播报";
    renderCookingMode();
    return;
  }
  cookingVoiceEnabled = !cookingVoiceEnabled;
  if (cookingVoiceEnabled) speakCurrentCookingStep();
  else stopCookingSpeech();
  renderCookingMode();
}

async function releaseCookingWakeLock() {
  if (!cookingWakeLock) return;
  try {
    await cookingWakeLock.release();
  } catch {
    // Some browsers auto-release wake locks; no extra handling needed for the prototype.
  }
  cookingWakeLock = null;
  cookingWakeLockEnabled = false;
}

async function toggleCookingWakeLock() {
  if (cookingWakeLockEnabled) {
    cookingWakeLockMessage = "屏幕常亮已关闭";
    await releaseCookingWakeLock();
    renderCookingMode();
    return;
  }

  if (!("wakeLock" in navigator)) {
    cookingWakeLockMessage = "当前浏览器暂不支持屏幕常亮";
    renderCookingMode();
    return;
  }

  try {
    cookingWakeLock = await navigator.wakeLock.request("screen");
    cookingWakeLockEnabled = true;
    cookingWakeLockMessage = "屏幕常亮已开启";
    cookingWakeLock.addEventListener("release", () => {
      cookingWakeLock = null;
      cookingWakeLockEnabled = false;
      cookingWakeLockMessage = "屏幕常亮已释放";
      if (!elements.cookingModeModal.hidden) renderCookingMode();
    });
  } catch {
    cookingWakeLockEnabled = false;
    cookingWakeLockMessage = "开启失败，可保持手机屏幕常亮设置";
  }
  renderCookingMode();
}

function renderCookingCurrentMaterials(recipe, task, stats) {
  const relevantItems = getTaskRelevantSopItems(recipe, task);
  if (!relevantItems.length) {
    return `
      <details class="cooking-materials">
        <summary>当前步骤材料</summary>
        <p class="cooking-muted">这一步主要是操作动作，按上方说明完成即可。</p>
      </details>
    `;
  }

  return `
    <details class="cooking-materials current-items" open>
      <summary>当前步骤用到</summary>
      <div>
        ${relevantItems
          .map(
            (item) => `
              <span class="${getSopItemInventoryClass(item, stats, recipe)}">
                ${formatSopItemName(recipe, item.name)} ${item.amount || ""}
              </span>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderCookingMaterialPreview(recipe, stats) {
  const items = recipe.sop?.items || [];
  if (!items.length) {
    const effectiveRecipe = getEffectiveRecipe(recipe);
    return `
      <details class="cooking-materials">
        <summary>本菜所需材料</summary>
        <div>
          ${effectiveRecipe.ingredients
            .map((item) => `<span class="${stats.missingIngredients.includes(item) ? "missing" : ""}">${item}</span>`)
            .join("")}
          ${recipe.seasonings
            .map((item) => `<span class="seasoning ${stats.missingSeasonings.includes(item) ? "missing" : ""}">${item}</span>`)
            .join("")}
        </div>
      </details>
    `;
  }

  return `
    <details class="cooking-materials">
      <summary>材料预览 · ${getSopItems(recipe, "食材").length} 食材 / ${getSopItems(recipe, "调料").length} 调料</summary>
      <div>
        ${items
          .map(
            (item) => `
              <span class="${getSopItemInventoryClass(item, stats, recipe)}">
                ${formatSopItemName(recipe, item.name)} ${item.amount || ""}
              </span>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderCookingCheckpoints(recipe) {
  const checkpoints = recipe.sop?.checkpoints || [];
  if (!checkpoints.length) return "";
  return `
    <details class="cooking-checkpoints">
      <summary>关键检查点</summary>
      <ul>
        ${checkpoints.map((item) => `<li>${applyReplacementsToText(recipe, item)}</li>`).join("")}
      </ul>
    </details>
  `;
}

function renderCookingTaskTimeline(tasks, current) {
  return `
    <details class="cooking-timeline">
      <summary>全部步骤</summary>
      <div>
        ${tasks
          .map(
            (task, index) => `
              <button type="button" class="${index === current ? "current" : ""} ${cookingCompletedSteps.has(index) ? "done" : ""}" data-cooking-step-index="${index}">
                <span>${cookingCompletedSteps.has(index) ? "✓" : index + 1}</span>
                <strong>${task.phase} · ${task.title}</strong>
              </button>
            `,
          )
          .join("")}
      </div>
    </details>
  `;
}

function renderCookingMode() {
  const recipe = getCurrentCookingRecipe();
  if (!recipe) return;
  const steps = getCurrentCookingSteps();
  const total = steps.length;
  if (!total) return;
  const current = Math.min(Math.max(cookingStepIndex, 0), total - 1);
  cookingStepIndex = current;
  const stats = getRecipeStats(recipe);
  const isDone = cookingCompletedSteps.has(current);
  const completedCount = cookingCompletedSteps.size;
  const task = steps[current];
  const timerText = cookingTimerRemaining ? formatCookingTime(cookingTimerRemaining) : "00:00";

  elements.cookingModeTitle.textContent = recipe.name;
  elements.prevCookingStep.disabled = current <= 0;
  elements.nextCookingStep.textContent = current >= total - 1 ? "完成" : "下一步";
  elements.cookingModeBody.innerHTML = `
    <div class="cooking-progress">
      <span>${task.phase} ${task.phaseIndex || current + 1} / 共 ${total} 步</span>
      <strong>${recipe.minutes}分钟 · ${completedCount}/${total} 完成</strong>
    </div>
    <div class="cooking-phase-card">
      <span>${task.phase}</span>
      <h3>${task.title}</h3>
      <p>${[task.time, task.heat].filter(Boolean).join(" · ") || "按步骤操作"}</p>
    </div>
    <div class="cooking-control-grid">
      <button type="button" class="${cookingTimerRunning ? "active" : ""}" data-toggle-cooking-timer>
        ${cookingTimerRunning ? "暂停计时" : "开始计时"}
        <strong>${timerText}</strong>
      </button>
      <button type="button" data-reset-cooking-timer>重置计时</button>
      <button type="button" class="${cookingVoiceEnabled ? "active" : ""}" data-toggle-cooking-voice>
        ${cookingVoiceEnabled ? "语音已开" : "语音播报"}
      </button>
      <button type="button" class="${cookingWakeLockEnabled ? "active" : ""}" data-toggle-cooking-wake>
        ${cookingWakeLockEnabled ? "常亮已开" : "屏幕常亮"}
      </button>
    </div>
    ${cookingWakeLockMessage ? `<p class="cooking-status">${cookingWakeLockMessage}</p>` : ""}
    <div class="cooking-step-card">
      <p>${applyReplacementsToText(recipe, task.detail)}</p>
      <small>目的：${applyReplacementsToText(recipe, task.purpose)}</small>
    </div>
    <label class="cooking-check">
      <input type="checkbox" data-toggle-step-done ${isDone ? "checked" : ""} />
      <span>${isDone ? "本步已完成" : "完成这一步后打勾"}</span>
    </label>
    ${renderCookingCurrentMaterials(recipe, task, stats)}
    ${renderCookingMaterialPreview(recipe, stats)}
    ${renderCookingCheckpoints(recipe)}
    ${renderCookingTaskTimeline(steps, current)}
    <div class="cooking-tip">
      <strong>${recipe.sop ? "SOP 提示" : "新手提示"}</strong>
      <span>${recipe.sop ? "先按预处理把材料备好，再进入烹饪步骤；需要计时的动作可以直接使用上方计时器。" : "先把这一步做完，再进入下一步；缺少的材料可回到下方缺材面板查看并采购。"}</span>
    </div>
  `;
}

function nextCookingStep() {
  const recipe = getCurrentCookingRecipe();
  if (!recipe) return;
  const total = getCurrentCookingSteps().length;
  cookingCompletedSteps.add(cookingStepIndex);
  if (cookingStepIndex >= total - 1) {
    closeCookingMode();
    return;
  }
  cookingStepIndex += 1;
  resetCookingTimerForCurrentStep();
  renderCookingMode();
  if (cookingVoiceEnabled) speakCurrentCookingStep();
}

function prevCookingStep() {
  cookingStepIndex = Math.max(0, cookingStepIndex - 1);
  resetCookingTimerForCurrentStep();
  renderCookingMode();
  if (cookingVoiceEnabled) speakCurrentCookingStep();
}

function openOnboarding() {
  elements.userName.value = state.profile.name;
  elements.enableExpiry.checked = state.seasonings.some((item) => item.expiry);
  updateSingleChoice("goal", state.profile.goal);
  updateMultipleChoice("flavors", state.profile.flavors);
  renderOnboardingInventorySummary();
  renderOnboardingExpiry();
  showModalAtTop(elements.onboardingModal);
}

function closeOnboarding() {
  if (!state.onboarded) return;
  elements.onboardingModal.hidden = true;
}

function closeModalOnBackdrop(event, closeAction) {
  if (event.target !== event.currentTarget) return;
  closeAction();
}

function resetScrollPosition(target) {
  if (!target) return;
  target.scrollTop = 0;
  target.scrollLeft = 0;
}

function resetModalScroll(modal, ...extraTargets) {
  resetScrollPosition(modal);
  extraTargets.forEach(resetScrollPosition);
  modal
    ?.querySelectorAll(
      [
        ".modal-card",
        ".recipe-info-body",
        ".cooking-mode-body",
        ".option-grid",
        ".selected-strip",
        ".expiry-editor",
        "#recipeFilterOptions",
        "#tabooWarningBody",
        "#mySeasoningHistory",
      ].join(", "),
    )
    .forEach(resetScrollPosition);
}

function showModalAtTop(modal, ...extraTargets) {
  resetModalScroll(modal, ...extraTargets);
  modal.hidden = false;
  const resetAfterPaint = () => resetModalScroll(modal, ...extraTargets);
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(resetAfterPaint);
  } else {
    window.setTimeout(resetAfterPaint, 0);
  }
}

function updateSingleChoice(group, value) {
  document.querySelectorAll(`[data-choice-group="${group}"] button`).forEach((button) => {
    button.classList.toggle("selected", button.dataset.value === value);
  });
}

function updateMultipleChoice(group, values) {
  document.querySelectorAll(`[data-choice-group="${group}"] button`).forEach((button) => {
    button.classList.toggle("selected", values.includes(button.dataset.value));
  });
}

function getSingleChoiceValue(group) {
  return document.querySelector(`[data-choice-group="${group}"] button.selected`)?.dataset.value || defaultState.profile.goal;
}

function getMultipleChoiceValues(group, fallback = defaultState.profile.flavors) {
  const values = [...document.querySelectorAll(`[data-choice-group="${group}"] button.selected`)].map((button) => button.dataset.value);
  return values.length ? values : fallback;
}

function renderOnboardingExpiry() {
  const seasonings = getSeasoningNames();
  elements.onboardingExpiryList.hidden = !elements.enableExpiry.checked;
  if (!elements.enableExpiry.checked) {
    elements.onboardingExpiryList.innerHTML = "";
    return;
  }

  elements.onboardingExpiryList.innerHTML = seasonings
    .map((name) => {
      const existing = state.seasonings.find((item) => item.name === name);
      return `
        <label>
          <span>${name}</span>
          <input type="date" data-expiry-name="${name}" value="${existing?.expiry || ""}" />
          ${renderExpiryQuickButtons(name, "data-expiry-name")}
        </label>
      `;
    })
    .join("");
}

function saveProfileFromModal() {
  const expiryInputs = [...document.querySelectorAll("[data-expiry-name]")];

  state = {
    ...state,
    onboarded: true,
    profile: {
      name: elements.userName.value.trim() || "我",
      goal: getSingleChoiceValue("goal"),
      flavors: getMultipleChoiceValues("flavors"),
      taboos: state.profile.taboos || structuredClone(defaultState.profile.taboos),
    },
    seasonings: state.seasonings.map((item) => {
      const expiry = expiryInputs.find((input) => input.dataset.expiryName === item.name)?.value || "";
      return { ...item, expiry: elements.enableExpiry.checked ? expiry : "" };
    }),
  };

  elements.onboardingModal.hidden = true;
  saveState();
  render();
}

function useDemoProfile() {
  state.ingredients = [...defaultState.ingredients];
  state.seasonings = structuredClone(defaultState.seasonings);
  elements.userName.value = "";
  elements.enableExpiry.checked = false;
  updateSingleChoice("goal", "日常家常");
  updateMultipleChoice("flavors", ["清淡"]);
  state.profile.taboos = structuredClone(defaultState.profile.taboos);
  renderOnboardingInventorySummary();
  renderOnboardingExpiry();
}

function fillTestInventory() {
  state.ingredients = [...testInventoryIngredients];
  state.seasonings = testInventorySeasonings.map((name) => {
    const existing = state.seasonings.find((item) => item.name === name);
    return { name, expiry: existing?.expiry || "" };
  });
  activeView = "recommend";
  activeInventoryTab = "ingredients";
  activeSearchQuery = "";
  activeRecipeFilters = createEmptyRecipeFilters();
  draftRecipeFilters = createEmptyRecipeFilters();
  selectedRecipeId = getAllRecipes()[0]?.id || selectedRecipeId;
  resetRecipePagination();
  saveState();
  render();
}

function handleQuickIntent(intent) {
  switchView("recommend");
  activeSearchQuery = "";
  elements.recipeSearch.value = "";
  activeRecipeFilters = createEmptyRecipeFilters();
  draftRecipeFilters = createEmptyRecipeFilters();

  if (intent === "inventory") {
    openPicker("ingredients");
    return;
  }

  if (intent === "quick") {
    elements.sortSelect.value = "time";
    activeRecipeFilters.scenario = ["afterWork"];
  } else if (intent === "light") {
    elements.sortSelect.value = "recommend";
    activeRecipeFilters.flavor = ["light"];
    activeRecipeFilters.health = ["lightMeal"];
  } else {
    elements.sortSelect.value = "recommend";
  }

  detailVisible = false;
  detailExpanded = false;
  resetRecipePagination();
  render();
}

function openPicker(mode) {
  pickerMode = mode;
  pickerSelection = mode === "ingredients" ? [...state.ingredients] : [...getSeasoningNames()];
  pickerExpiryVisible = false;
  elements.pickerTitle.textContent = mode === "ingredients" ? "选择常见食材" : "选择常见调料";
  elements.pickerSearch.value = "";
  elements.customItemInput.value = "";
  renderPicker();
  showModalAtTop(elements.itemPickerModal, elements.pickerSelected, elements.pickerOptions, elements.pickerExpiryEditor);
}

function closePicker() {
  elements.itemPickerModal.hidden = true;
}

function renderPicker() {
  const query = normalize(elements.pickerSearch.value);
  const source = pickerMode === "ingredients" ? commonIngredients : commonSeasonings;
  const merged = uniqueItems([...pickerSelection, ...source]);
  const options = query ? merged.filter((item) => item.includes(query)) : merged;
  const typeLabel = pickerMode === "ingredients" ? "食材" : "调料";
  const optionTitle = query ? "搜索结果" : pickerMode === "ingredients" ? "常见食材" : "常见调料";
  const previewLimit = 6;
  const previewItems = pickerSelection.slice(0, previewLimit);
  const hiddenCount = Math.max(0, pickerSelection.length - previewLimit);

  elements.pickerSelected.innerHTML = pickerSelection.length
    ? `
      <div class="picker-selected-summary">
        <div>
          <strong>已选 ${pickerSelection.length} 项${typeLabel}</strong>
          <span>下方绿色项表示已选，点击可取消</span>
        </div>
        <button class="clear-picker-selection" type="button" data-clear-picker-selection>清空</button>
      </div>
      <div class="picker-chip-row compact">
        ${previewItems.map((item) => `<span class="chip">${item}</span>`).join("")}
        ${hiddenCount ? `<span class="chip more-chip">+${hiddenCount}</span>` : ""}
      </div>
    `
    : `
      <div class="picker-selection-title">
        <strong>还没有选择${typeLabel}</strong>
        <span>从下方点选，也可以搜索或手动添加。</span>
      </div>
    `;

  elements.pickerOptions.innerHTML = options.length
    ? `
      <div class="picker-option-head">
        <strong>${optionTitle}</strong>
        <span>${query ? `找到 ${options.length} 项` : "轻点选择"}</span>
      </div>
      ${options
        .map(
          (item) => `
            <button class="option-chip ${pickerSelection.includes(item) ? "selected" : ""}" data-picker-item="${item}">
              ${item}
            </button>
          `,
        )
        .join("")}
    `
    : `<div class="empty-state">没有找到，可以在上方手动添加。</div>`;

  const isSeasoning = pickerMode === "seasonings";
  elements.pickerExpiryTools.hidden = !isSeasoning;
  elements.togglePickerExpiry.hidden = !isSeasoning;
  elements.togglePickerExpiry.textContent = pickerExpiryVisible ? "收起有效期" : "添加有效期";
  elements.pickerExpiryEditor.hidden = !isSeasoning || !pickerExpiryVisible;
  if (isSeasoning && pickerExpiryVisible) renderPickerExpiryEditor();
}

function renderPickerExpiryEditor() {
  const previous = new Map(state.seasonings.map((item) => [item.name, item]));
  elements.pickerExpiryEditor.innerHTML = pickerSelection.length
    ? pickerSelection
        .map(
          (name) => `
            <label>
              <span>${name}</span>
              <input type="date" data-picker-expiry-name="${name}" value="${previous.get(name)?.expiry || ""}" />
              ${renderExpiryQuickButtons(name, "data-picker-expiry-name")}
            </label>
          `,
        )
        .join("")
    : `<div class="empty-state compact">先选择调料，再录入有效期。</div>`;
}

function togglePickerItem(item) {
  pickerSelection = pickerSelection.includes(item) ? pickerSelection.filter((value) => value !== item) : [...pickerSelection, item];
  renderPicker();
}

function addCustomPickerItem() {
  const value = normalize(elements.customItemInput.value);
  if (!value) return;
  if (!pickerSelection.includes(value)) pickerSelection = [...pickerSelection, value];
  elements.customItemInput.value = "";
  renderPicker();
}

function savePickerSelection() {
  pickerSelection = uniqueItems(pickerSelection);
  if (pickerMode === "ingredients") {
    state.ingredients = pickerSelection;
  } else {
    const previous = new Map(state.seasonings.map((item) => [item.name, item]));
    const expiryInputs = new Map([...document.querySelectorAll("[data-picker-expiry-name]")].map((input) => [input.dataset.pickerExpiryName, input.value]));
    state.seasonings = pickerSelection.map((name) => ({ name, expiry: expiryInputs.get(name) ?? previous.get(name)?.expiry ?? "" }));
  }
  closePicker();
  renderOnboardingInventorySummary();
  renderOnboardingExpiry();
  saveState();
  render();
}

function openTabooPicker(mode = "absolute") {
  tabooPickerMode = mode;
  tabooPickerSelection = mode === "absolute" ? [...getAbsoluteTaboos()] : [...getAvoidTaboos()];
  elements.tabooPickerTitle.textContent = mode === "absolute" ? "选择绝对禁忌" : "选择不喜欢/可省略";
  elements.tabooSearch.value = "";
  elements.customTabooInput.value = "";
  renderTabooPicker();
  showModalAtTop(elements.tabooPickerModal, elements.tabooSelected, elements.tabooOptions);
}

function closeTabooPicker() {
  elements.tabooPickerModal.hidden = true;
}

function switchTabooPickerMode(mode) {
  state.profile.taboos = {
    ...(state.profile.taboos || {}),
    [tabooPickerMode]: uniqueItems(tabooPickerSelection),
  };
  tabooPickerMode = mode;
  tabooPickerSelection = mode === "absolute" ? [...getAbsoluteTaboos()] : [...getAvoidTaboos()];
  elements.tabooSearch.value = "";
  elements.customTabooInput.value = "";
  elements.tabooPickerTitle.textContent = mode === "absolute" ? "选择绝对禁忌" : "选择不喜欢/可省略";
  renderTabooPicker();
}

function renderTabooPicker() {
  const query = normalize(elements.tabooSearch.value);
  const source = tabooPickerMode === "absolute" ? commonAbsoluteTaboos : commonAvoidTaboos;
  const merged = uniqueItems([...tabooPickerSelection, ...source]);
  const options = query ? merged.filter((item) => item.includes(query)) : merged;
  const isAbsolute = tabooPickerMode === "absolute";
  const typeLabel = isAbsolute ? "绝对禁忌" : "不喜欢/可省略";
  elements.tabooPickerHint.textContent = isAbsolute
    ? "适合过敏、宗教忌口、原则性不吃。相关菜谱会置后，打开前会强提醒，并优先给出安全替代。"
    : "适合葱、香菜、姜蒜等可省略配菜。缺少时会自动降低补买优先级，推荐仍可继续。";

  elements.tabooModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tabooMode === tabooPickerMode);
  });

  elements.tabooSelected.innerHTML = tabooPickerSelection.length
    ? `
      <div class="picker-selection-title">
        <strong>已设置 ${tabooPickerSelection.length} 项${typeLabel}</strong>
        <span>再次点击可取消</span>
      </div>
      <div class="picker-chip-row">
        ${tabooPickerSelection.map((item) => `<span class="chip">${item}</span>`).join("")}
      </div>
    `
    : `
      <div class="picker-selection-title">
        <strong>暂未设置${typeLabel}</strong>
        <span>${isAbsolute ? "从过敏或原则性不吃开始选" : "从不喜欢的配菜开始选"}</span>
      </div>
    `;

  elements.tabooOptions.innerHTML = options.length
    ? `
      <div class="picker-option-head">
        <strong>${query ? "搜索结果" : isAbsolute ? "常见绝对禁忌" : "常见可省略配菜"}</strong>
        <span>${query ? `找到 ${options.length} 项` : "点击即可多选"}</span>
      </div>
      ${options
        .map(
          (item) => `
            <button class="option-chip ${tabooPickerSelection.includes(item) ? "selected" : ""}" data-taboo-item="${item}">
              ${item}
            </button>
          `,
        )
        .join("")}
    `
    : `<div class="empty-state">没有找到，可以在上方手动添加。</div>`;
}

function toggleTabooItem(item) {
  tabooPickerSelection = tabooPickerSelection.includes(item) ? tabooPickerSelection.filter((value) => value !== item) : [...tabooPickerSelection, item];
  renderTabooPicker();
}

function addCustomTabooItem() {
  const value = normalize(elements.customTabooInput.value);
  if (!value) return;
  if (!tabooPickerSelection.includes(value)) tabooPickerSelection = [...tabooPickerSelection, value];
  elements.customTabooInput.value = "";
  renderTabooPicker();
}

function saveTabooPickerSelection() {
  state.profile.taboos = {
    ...(state.profile.taboos || structuredClone(defaultState.profile.taboos)),
    [tabooPickerMode]: uniqueItems(tabooPickerSelection),
  };
  closeTabooPicker();
  saveState();
  render();
}

function render() {
  renderProfile();
  renderView();
  renderInventoryControls();
  renderChips();
  renderMyPanel();
  renderOnboardingInventorySummary();
  renderPurchasePanel();
  renderMealPlanPanel();
  renderRecipes();
  renderQuickStartPanel();
}

function switchView(view) {
  if (view === "mealPlan") {
    mealPlanDrawerOpen = true;
    activeView = "recommend";
    resetRecipePagination();
    elements.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === activeView));
    detailVisible = false;
    detailExpanded = false;
    render();
    return;
  }

  mealPlanDrawerOpen = false;
  activeView = view;
  resetRecipePagination();
  elements.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === activeView));
  detailVisible = false;
  detailExpanded = false;
  render();
}

function renderView() {
  const isInventory = activeView === "inventory";
  const isPurchase = activeView === "purchase";
  const isMealPlan = mealPlanDrawerOpen;
  const isMy = activeView === "my";
  const isRecommend = activeView === "recommend";
  elements.inventoryPanel.hidden = !isInventory;
  elements.purchasePanel.hidden = !isPurchase;
  elements.mealPlanPanel.hidden = !isMealPlan;
  elements.myPanel.hidden = !isMy;
  elements.inventoryCompact.hidden = !isRecommend;
  elements.contentGrid.hidden = isInventory || isPurchase || isMy;
  elements.mealPlanFab.hidden = !state.mealPlan.length || isMealPlan || isInventory || isPurchase || isMy;
}

elements.goInventory.addEventListener("click", () => {
  switchView("inventory");
});

elements.fillTestInventory.addEventListener("click", fillTestInventory);

elements.quickActionButtons.forEach((button) => {
  button.addEventListener("click", () => handleQuickIntent(button.dataset.quickIntent));
});

elements.expiryAlert.addEventListener("click", (event) => {
  const openAlertsButton = event.target.closest("[data-open-seasoning-alerts]");
  if (openAlertsButton) {
    switchView("my");
    return;
  }

  const button = event.target.closest("[data-dismiss-expiry-alert]");
  if (!button) return;
  state.ignoredExpiryAlertKey = button.dataset.dismissExpiryAlert;
  saveState();
  renderProfile();
});

elements.inventoryGuideAction.addEventListener("click", () => {
  switchView("recommend");
});

elements.purchaseBackRecommend.addEventListener("click", () => {
  switchView("recommend");
});

elements.mealPlanBackRecommend.addEventListener("click", () => {
  switchView("recommend");
});

elements.mealPlanFab.addEventListener("click", () => {
  switchView("mealPlan");
});

elements.myGoInventory.addEventListener("click", () => {
  switchView("inventory");
});

elements.openFavoritesShortcut.addEventListener("click", () => {
  switchView("favorites");
});

elements.myEditTaboos.addEventListener("click", () => openTabooPicker("absolute"));

elements.toggleSeasoningHistory.addEventListener("click", () => {
  renderSeasoningHistory();
  showModalAtTop(elements.seasoningHistoryModal, elements.mySeasoningHistory);
});

elements.closeSeasoningHistory.addEventListener("click", () => {
  elements.seasoningHistoryModal.hidden = true;
});

elements.seasoningHistoryModal.addEventListener("click", (event) => closeModalOnBackdrop(event, () => {
  elements.seasoningHistoryModal.hidden = true;
}));

elements.closeTabooWarning.addEventListener("click", closeTabooWarning);
elements.cancelTabooRecipe.addEventListener("click", closeTabooWarning);
elements.continueTabooRecipe.addEventListener("click", continueTabooRecipe);
elements.tabooWarningModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closeTabooWarning));
elements.tabooWarningBody.addEventListener("click", handleRecipeReplacementClick);

function handleSeasoningAlertAction(event) {
  const quickExpiryButton = event.target.closest("[data-expiry-quick]");
  if (quickExpiryButton) {
    applyExpiryQuickAction(quickExpiryButton);
    return true;
  }

  const ignoreAlertButton = event.target.closest("[data-ignore-seasoning-alert]");
  if (ignoreAlertButton) {
    state.ignoredSeasoningAlerts = uniqueItems([...state.ignoredSeasoningAlerts, ignoreAlertButton.dataset.ignoreSeasoningAlert]);
    saveState();
    renderProfile();
    renderMyPanel();
    return true;
  }

  const restoreAlertButton = event.target.closest("[data-restore-seasoning-alert]");
  if (restoreAlertButton) {
    state.ignoredSeasoningAlerts = state.ignoredSeasoningAlerts.filter((key) => key !== restoreAlertButton.dataset.restoreSeasoningAlert);
    state.ignoredExpiryAlertKey = "";
    saveState();
    renderProfile();
    renderMyPanel();
    renderSeasoningHistory();
    return true;
  }

  const renewButton = event.target.closest("[data-renew-seasoning]");
  if (renewButton) {
    renewingSeasoningName = renewButton.dataset.renewSeasoning;
    renderMyPanel();
    renderSeasoningHistory();
    return true;
  }

  if (event.target.closest("[data-cancel-renew]")) {
    renewingSeasoningName = "";
    renderMyPanel();
    renderSeasoningHistory();
    return true;
  }

  const saveRenewButton = event.target.closest("[data-save-renew]");
  if (saveRenewButton) {
    const name = saveRenewButton.dataset.saveRenew;
    const input = document.querySelector(`[data-renew-expiry="${CSS.escape(name)}"]`);
    const expiry = input?.value || "";
    if (!expiry) return true;
    state.seasonings = state.seasonings.map((item) => (item.name === name ? { ...item, expiry } : item));
    state.ignoredSeasoningAlerts = state.ignoredSeasoningAlerts.filter((key) => !key.startsWith(`${name}:`));
    state.ignoredExpiryAlertKey = "";
    renewingSeasoningName = "";
    saveState();
    render();
    return true;
  }

  return false;
}

elements.myPanel.addEventListener("click", (event) => {
  if (handleSeasoningAlertAction(event)) return;

  const button = event.target.closest("[data-my-shortcut]");
  if (!button) return;
  switchView(button.dataset.myShortcut);
});

elements.mySeasoningHistory.addEventListener("click", (event) => {
  handleSeasoningAlertAction(event);
});

elements.editInventory.addEventListener("click", () => {
  openPicker(activeInventoryTab);
});

function handleMealPlanActions(event) {
  if (event.target.closest("[data-close-meal-plan]")) {
    mealPlanDrawerOpen = false;
    render();
    return true;
  }

  if (event.target.closest("[data-go-meal-purchase]")) {
    mealPlanDrawerOpen = false;
    switchView("purchase");
    return true;
  }

  if (event.target.closest("[data-start-first-meal]")) {
    const firstRecipe = getMealPlanRecipes()[0];
    if (firstRecipe) {
      mealPlanDrawerOpen = false;
      openCookingMode(firstRecipe.id);
      render();
    }
    return true;
  }

  const removeMealButton = event.target.closest("[data-remove-meal]");
  if (removeMealButton) {
    toggleMealPlan(removeMealButton.dataset.removeMeal);
    return true;
  }

  if (event.target.closest("[data-clear-meal-plan]")) {
    state.mealPlan = [];
    mealPlanDrawerOpen = false;
    saveState();
    renderPurchasePanel();
    renderMealPlanPanel();
    renderRecipes();
    return true;
  }

  return false;
}

elements.mealPlanPanel.addEventListener("click", (event) => {
  handleMealPlanActions(event);
});

elements.purchasePanel.addEventListener("click", (event) => {
  if (handleMealPlanActions(event)) return;

  const button = event.target.closest("[data-purchase-shop]");
  if (!button) return;
  const shop = button.dataset.purchaseShop;
  const keywords = getPurchaseKeywords();
  button.classList.add("done");
  button.innerHTML = `
    <strong>${shop === "附近超市" ? "准备导航" : "准备跳转"}</strong>
    <span>${keywords}</span>
  `;
  window.setTimeout(renderPurchasePanel, 1300);
});

elements.inventoryTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activeInventoryTab = button.dataset.inventoryTab;
    renderInventoryControls();
  });
});

elements.onboardingExpiryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-expiry-quick]");
  if (!button) return;
  applyExpiryQuickAction(button);
});

elements.recipeList.addEventListener("click", (event) => {
  if (event.target.closest("[data-load-more]")) {
    loadMoreRecipes();
    return;
  }

  const favoriteButton = event.target.closest("[data-favorite-recipe]");
  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.favoriteRecipe);
    return;
  }

  const card = event.target.closest("[data-recipe]");
  if (!card) return;
  selectedRecipeId = card.dataset.recipe;
  detailVisible = false;
  detailExpanded = false;
  renderRecipes();
  const recipe = getRecipeById(selectedRecipeId);
  if (recipe && getRecipeTabooHits(recipe).absoluteHits.length) {
    openTabooWarning(selectedRecipeId);
    return;
  }
  openRecipeInfo(selectedRecipeId);
});

elements.openFilterPanel.addEventListener("click", openRecipeFilter);
elements.closeRecipeFilter.addEventListener("click", closeRecipeFilter);
elements.recipeFilterModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closeRecipeFilter));
elements.recipeFilterOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter-group][data-filter-option]");
  if (!button) return;
  const groupId = button.dataset.filterGroup;
  const optionId = button.dataset.filterOption;
  const selected = draftRecipeFilters[groupId] || [];
  draftRecipeFilters[groupId] = selected.includes(optionId) ? selected.filter((item) => item !== optionId) : [...selected, optionId];
  renderRecipeFilterOptions();
});
elements.resetRecipeFilters.addEventListener("click", resetDraftRecipeFilters);
elements.applyRecipeFilters.addEventListener("click", applyRecipeFilters);
elements.clearActiveFilters.addEventListener("click", clearActiveRecipeFilters);

elements.sortSelect.addEventListener("change", () => {
  resetRecipePagination();
  renderRecipes();
});
elements.recipeSearch.addEventListener("input", () => {
  activeSearchQuery = normalize(elements.recipeSearch.value);
  detailVisible = false;
  detailExpanded = false;
  resetRecipePagination();
  renderRecipes();
});
elements.clearRecipeSearch.addEventListener("click", () => {
  activeSearchQuery = "";
  elements.recipeSearch.value = "";
  detailVisible = false;
  detailExpanded = false;
  resetRecipePagination();
  renderRecipes();
});
elements.contentGrid.addEventListener("scroll", () => {
  const distanceToBottom = elements.contentGrid.scrollHeight - elements.contentGrid.scrollTop - elements.contentGrid.clientHeight;
  if (distanceToBottom < 90) loadMoreRecipes();
});
elements.navItems.forEach((button) => {
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
  });
});
elements.editProfile.addEventListener("click", openOnboarding);
elements.quickOnboarding.addEventListener("click", openOnboarding);
elements.closeOnboarding.addEventListener("click", closeOnboarding);
elements.onboardingModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closeOnboarding));
elements.saveProfile.addEventListener("click", saveProfileFromModal);
elements.useDemoProfile.addEventListener("click", useDemoProfile);
elements.enableExpiry.addEventListener("change", renderOnboardingExpiry);

elements.choiceGroups.forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-value]");
    if (!button) return;
    if (group.dataset.multiple === "true") {
      button.classList.toggle("selected");
      return;
    }
    group.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

elements.openPickerButtons.forEach((button) => {
  button.addEventListener("click", () => openPicker(button.dataset.openPicker));
});

elements.openTabooPickerButtons.forEach((button) => {
  button.addEventListener("click", () => openTabooPicker(button.dataset.openTabooPicker));
});

elements.closePicker.addEventListener("click", closePicker);
elements.itemPickerModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closePicker));
elements.pickerSearch.addEventListener("input", renderPicker);
elements.addCustomItem.addEventListener("click", addCustomPickerItem);
elements.customItemInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addCustomPickerItem();
});
elements.pickerOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-picker-item]");
  if (!button) return;
  togglePickerItem(button.dataset.pickerItem);
});
elements.pickerSelected.addEventListener("click", (event) => {
  if (!event.target.closest("[data-clear-picker-selection]")) return;
  pickerSelection = [];
  pickerExpiryVisible = false;
  renderPicker();
});
elements.togglePickerExpiry.addEventListener("click", () => {
  pickerExpiryVisible = !pickerExpiryVisible;
  renderPicker();
});
elements.pickerExpiryEditor.addEventListener("click", (event) => {
  const button = event.target.closest("[data-expiry-quick]");
  if (!button) return;
  applyExpiryQuickAction(button);
});
elements.savePicker.addEventListener("click", savePickerSelection);
elements.closeTabooPicker.addEventListener("click", closeTabooPicker);
elements.tabooPickerModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closeTabooPicker));
elements.tabooSearch.addEventListener("input", renderTabooPicker);
elements.addCustomTaboo.addEventListener("click", addCustomTabooItem);
elements.customTabooInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addCustomTabooItem();
});
elements.tabooOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-taboo-item]");
  if (!button) return;
  toggleTabooItem(button.dataset.tabooItem);
});
elements.tabooModeButtons.forEach((button) => {
  button.addEventListener("click", () => switchTabooPickerMode(button.dataset.tabooMode));
});
elements.saveTabooPicker.addEventListener("click", saveTabooPickerSelection);
elements.closeRecipeInfo.addEventListener("click", closeRecipeInfo);
elements.recipeInfoModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closeRecipeInfo));
elements.addToMealPlan.addEventListener("click", () => {
  toggleMealPlan(selectedRecipeId);
  const recipe = getRecipeById(selectedRecipeId);
  if (recipe) {
    elements.addToMealPlan.textContent = isInMealPlan(recipe.id) ? "已加入清单" : "加入制作清单";
    elements.addToMealPlan.classList.toggle("active-soft", isInMealPlan(recipe.id));
    if (isInMealPlan(recipe.id) && getRecipeMissingItems(recipe).length) {
      closeRecipeInfo();
      switchView("purchase");
    }
  }
});
elements.startCooking.addEventListener("click", startCookingFlow);
elements.closeCookingMode.addEventListener("click", closeCookingMode);
elements.cookingModeModal.addEventListener("click", (event) => closeModalOnBackdrop(event, closeCookingMode));
elements.prevCookingStep.addEventListener("click", prevCookingStep);
elements.nextCookingStep.addEventListener("click", nextCookingStep);
elements.cookingModeBody.addEventListener("click", (event) => {
  const stepButton = event.target.closest("[data-cooking-step-index]");
  if (stepButton) {
    cookingStepIndex = Number(stepButton.dataset.cookingStepIndex) || 0;
    resetCookingTimerForCurrentStep();
    renderCookingMode();
    if (cookingVoiceEnabled) speakCurrentCookingStep();
    return;
  }
  if (event.target.closest("[data-toggle-cooking-timer]")) {
    toggleCookingTimer();
    return;
  }
  if (event.target.closest("[data-reset-cooking-timer]")) {
    resetCurrentCookingTimer();
    return;
  }
  if (event.target.closest("[data-toggle-cooking-voice]")) {
    toggleCookingVoice();
    return;
  }
  if (event.target.closest("[data-toggle-cooking-wake]")) {
    toggleCookingWakeLock();
    return;
  }
});
elements.cookingModeBody.addEventListener("change", (event) => {
  if (!event.target.closest("[data-toggle-step-done]")) return;
  toggleCurrentCookingStepDone();
});
elements.recipeInfoBody.addEventListener("click", (event) => {
  if (handleRecipeReplacementClick(event)) return;
  if (event.target.closest("[data-go-purchase]")) {
    openPurchaseForRecipe(selectedRecipeId);
    return;
  }
  const favoriteButton = event.target.closest("[data-favorite-recipe]");
  if (!favoriteButton) return;
  toggleFavorite(favoriteButton.dataset.favoriteRecipe);
  openRecipeInfo(favoriteButton.dataset.favoriteRecipe);
});

let detailTouchStartY = 0;

elements.recipeDetail.addEventListener("touchstart", (event) => {
  detailTouchStartY = event.touches[0]?.clientY || 0;
});

elements.recipeDetail.addEventListener("touchend", (event) => {
  const endY = event.changedTouches[0]?.clientY || detailTouchStartY;
  const deltaY = endY - detailTouchStartY;
  if (deltaY < -28) {
    detailExpanded = true;
    renderDetail();
  }
  if (deltaY > 28) {
    detailExpanded = false;
    renderDetail();
  }
});

elements.recipeDetail.addEventListener("click", (event) => {
  if (event.target.closest("[data-detail-toggle]")) {
    detailExpanded = !detailExpanded;
    renderDetail();
    return;
  }

  const button = event.target.closest("[data-shop]");
  if (!button) return;
  const recipe = getRecipeById(selectedRecipeId);
  const stats = getRecipeStats(recipe);
  const missing = [...stats.missingIngredients, ...stats.missingSeasonings].join("、") || recipe.name;
  const shop = button.dataset.shop;
  const message = shop === "附近超市" ? `正在导航附近超市：${missing}` : `即将跳转${shop}：${missing}`;
  button.textContent = message;
  window.setTimeout(() => renderDetail(), 1300);
});

render();

if (!state.onboarded) {
  openOnboarding();
}
