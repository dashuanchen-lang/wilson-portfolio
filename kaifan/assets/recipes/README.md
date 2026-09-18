# 菜品图片资产库

本目录用于存放菜谱卡片的本地 1:1 菜品图片。

当前加载规则：

1. 优先读取本目录内的本地图片：`assets/recipes/{recipeId}.jpg`
2. 如果该菜谱还没有本地图片，暂时读取 `app.js` 中的远程公开图片来源
3. 如果图片加载失败，回退到本地 SVG 占位图

当前已入库图片：

- beef-tomato.jpg
- braised-eggplant.jpg
- cabbage-vermicelli.jpg
- celery-dried-tofu.jpg
- chicken-salad.jpg
- cold-cucumber.jpg
- di-san-xian.jpg
- garlic-broccoli.jpg
- greens-noodle.jpg
- mushroom-chicken.jpg
- potato-chicken.jpg
- seaweed-egg-soup.jpg
- sour-spicy-potato.jpg
- tomato-egg.jpg

后续补图建议：

- 文件名统一使用菜谱 ID，例如 `mapo-tofu.jpg`
- 图片建议裁成正方形，推荐 512x512 或 800x800
- 正式上线前建议使用自有图片、授权图库，或云存储/CDN
