const body=document.querySelector("body");function startAnimation(t,i){t.classList.contains("ready")&&setTimeout(function(){t.classList.add("active"),t.classList.add("has-asteroid"),setTimeout(function(){t.classList.remove("ready"),t.classList.remove("active")},1.5*i)},i)}function initPage(t){startAnimation(t,1e3)}initPage(body);
//# sourceMappingURL=main.js.map
