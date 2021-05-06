# javascript - 页面加载后依次加载多个JS文件

```javascript
var jqueryElement = document.createElement("script");
jqueryElement.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";

var mainElement = document.createElement("script");
mainElement.src = "/resources/js/main.js";

var indexElement = document.createElement("script");
indexElement.src = "/resources/js/index.js";

var googleApiElement = document.createElement("script");
googleApiElement.src = "https://maps.googleapis.com/maps/api/js?key=***mysecetrkey**&callback=initMap";

// add the first script element
document.body.appendChild(jqueryElement);

jqueryElementElement.onload = function () {
  document.body.appendChild(googleApiElement);
}

googleApiElement.onload = function () {
  document.body.appendChild(mainElement);
  document.body.appendChild(indexElement)
}
```
