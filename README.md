# 简介

本仓库内容为大屏数据可视化前端开发适配解决方案。

## 需求效果

由于使用场景的显示器型号大小繁多，为了保持在不同分辨率的屏幕上显示效果一致，所以就有了适配的需求。假设 UI 设计图宽高尺寸为 1920\*1080，即尺寸比例为 16:9。那在 1920\*1080 的屏幕（这里说的是可视区域，在浏览器 F11 全屏状态下，且缩放比例为 100%）上就刚好和设计图尺寸大小一致。如果是在 5760\*3240（16:9）分辨率的显示器上，我们实现效果依然保持横纵比例不变，长宽都等比放大 3 倍，即在不同分辨率的显示器上按此比例等比缩放，就可以保证内容在不同分辨率显示器上不变形。当显示器可视区域不满足 16:9 时，比如浏览器有顶部工具栏占一部分高度，就会造成我们的铺不满屏幕的情况，这种情况则将显示内容**垂直水平居中**。

效果图：![效果图](https://github.com/Leezon/data-visual-template/blob/master/assets/images/demo.gif?raw=true)

## 解决方案

1.CSS transform：scale(x)；

2.rem 适配

这两种方案都是可行的，方案 1 更简单易于开发，性能也比 rem 方案的好，所以就采用方案 1 来进行实现。

## 实现原理

### HTML结构

``` html
<div class="main">
  <div id="root">
    <div class="panel">
      <!-- 面板内容 -->
    </div>
  </div>
</div>
```
### CSS样式

``` css
.main {
  background-color: #f8f8f8;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
#root {
  transition: all 0.3s;
}
.panel {
  background-image: url(../images/background.png);
  background-size: 100% 100%;
  width: 1920px;
  height: 1080px;
}
```

### JS核心

1.计算可视区域宽高分别对于设计稿尺寸的比例，假设，scaleW=宽（显示）/宽（设计）,scaleH=高（显示）/高（设计）,
如果 scaleW<scaleH，则缩放比例为 scaleW，反之为 scaleH。

```javascript
function getScale(width = 1920, height = 1080) {
  let scaleW = window.innerWidth / width;
  let scaleH = window.innerHeight / height;
  return scaleW < scaleH ? scaleW : scaleH;
}
```

2.获取容器 dom 节点 el，监听 window 的 resize 事件，动态设置样式

```javascript
let root = document.getElementById('root');

let setScale = debounce(() => {
  root.style.transform = `scale(${getScale()})`;
}, 200);

window.addEventListener('resize', setScale);
setScale(); // 首次加载执行一次
```
