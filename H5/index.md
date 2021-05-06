```javascript
 (function () {
    if (window && document) {
      const winW = (document.documentElement.clientWidth || document.body.clientWidth) / 3.75;
      document.documentElement.style.fontSize = winW + 'px';
      // 定义全局 baseRem
      window.htmlFontSize = winW;
      // 当页面大小发生改变,重新修正rem为新窗口尺寸的37.5分之一
      window.onresize = function resize() {
        let wid =
          document.documentElement.clientWidth || document.body.clientWidth;
        if (wid > 1024) {
          wid = 1024;
        } else if (wid < 320) {
          wid = 320;
        }
        wid /= 3.75;
        document.documentElement.style.fontSize = wid +'px';
      };
    }
  })();
```
