!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a.register("kMC0W",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if(Array.isArray(e))return r.default(e)};var n,r=(n=a("8NIkP"))&&n.__esModule?n:{default:n}})),a.register("8NIkP",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}})),a.register("7AJDX",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}})),a.register("8CtQK",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),a.register("auk6i",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!e)return;if("string"==typeof e)return r.default(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r.default(e,t)};var n,r=(n=a("8NIkP"))&&n.__esModule?n:{default:n}}));var o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e){return l.default(e)||i.default(e)||c.default(e)||s.default()};var l=u(a("kMC0W")),i=u(a("7AJDX")),s=u(a("8CtQK")),c=u(a("auk6i"));function u(e){return e&&e.__esModule?e:{default:e}}var d="https://image.tmdb.org/t/p/",f="w500";function p(t,n){t.innerHTML=function(t){return t.map((function(t,n){return a=n,l=(r=t).poster_path,i=r.genre_ids,s=r.title,c=r.release_date,u=r.vote_average,'\n    <li class="gallery__item" data-movie="'.concat(a,'">\n        <a class="gallery__link">\n            <div class="img__wrap">\n                <img class="gallery__img" src="').concat(d).concat(f).concat(l,'">\n            </div>\n            <p class="gallery__info">\n                <span class="gallery__info--title">').concat(s,'</span>\n                <span class="galery__info--text">').concat(function(t){var n=t.map(g);return n?n.length<=3?n.join(", "):e(o)(n.slice(0,2)).concat(["other..."]).join(", "):""}(i)," | ").concat(c?c.slice(0,4):"",'</span>\n                <span class="gallery__info--vote">').concat(u.toFixed(1),"</span>\n            </p>\n        </a>\n    </li>\n    ");var r,a,l,i,s,c,u})).join("")}(n)}function g(e){return JSON.parse(localStorage.getItem("genres")).find((function(t){return t.id===e})).name}function v(e,t,n){var r='\n            <button type="button" class="num-btn mobile-hiding" data-page="first">1</button>\n            <span class="num-btn mobile-hiding" data-page="'.concat(t,'">...</span>    \n            ').concat(function(e,t){var n=1,r=t,a="";t>5&&(e<3?r=5:e>t-3?(n=t-5+1,r=t):(n=e-2,r=e+2));for(var o=n;o<=r;o++)a+='\n        <span\n            class="'.concat(o!==e?"num-btn":"pg-btn pg-btn--cur",'"\n            data-page="').concat(o,'">').concat(o,"</span>\n        ");return a}(t,n),'\n            <span class="num-btn mobile-hiding" data-page="').concat(t,'">...</span>    \n            <button type="button" class="num-btn mobile-hiding" data-page="last">').concat(n,"</button>\n        ");e.innerHTML=r}function _(e,t,n){switch(t){case"first":return 1;case"last":return n;case"prev":return 1===e?1:e-1;case"next":return e===n?n:e+1;default:return+t}}var m=document.querySelector("#queue"),b=document.querySelector("#watched"),y=document.querySelector(".header__buttons"),h=document.querySelector(".gallery"),w=document.querySelector("#pages"),M="localMovies",x={watched:"watchedAll",queue:"queueAll"},S="watched",k="queue";function O(e,t){var n=JSON.parse(localStorage.getItem(x[e]));if(n){var r={page:t,total_pages:n.total_pages,total_results:n.total_results,results:n.results.slice(20*(t-1),20*t),rules:e};localStorage.setItem(M,JSON.stringify(r)),p(h,r.results),v(w,t,r.total_pages),w.addEventListener("click",q),h.addEventListener("click",j)}else h.innerHTML="<h1>EMPTY gallery</h1>",w.innerHTML="";window.scrollTo(0,0),y.addEventListener("click",L)}function L(e){y.removeEventListener("click",L),"watched"===e.target.id?(b.classList.add("btn--is-active"),m.classList.remove("btn--is-active"),O(S,1)):(b.classList.remove("btn--is-active"),m.classList.add("btn--is-active"),O(k,1))}function j(e){var t=e.target.closest(".gallery__item");console.log("%c".concat(t.dataset.movie),"color: yellow; background-color: red; display: inline-block; padding: 5px; font-weight: bold;")}function q(e){w.removeEventListener("click",q);var t=e.target.dataset.page;if(t){var n=JSON.parse(localStorage.getItem(M)),r=_(n.page,t,n.total_pages);O(n.rules,r)}}O(S,1)}();
//# sourceMappingURL=library.214e6290.js.map