var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(b){return b.raw=b};$jscomp.createTemplateTagFirstArgWithRaw=function(b,c){b.raw=c;return b};$jscomp.arrayIteratorImpl=function(b){var c=0;return function(){return c<b.length?{done:!1,value:b[c++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};
$jscomp.makeIterator=function(b){var c="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];if(c)return c.call(b);if("number"==typeof b.length)return $jscomp.arrayIterator(b);throw Error(String(b)+" is not an iterable or ArrayLike");};var tvpcv={apiKey:"AIzaSyA2UrVcfcR3_co-0SRvggAfritNB832t-4",authDomain:"send-mail-news.firebaseapp.com",projectId:"send-mail-news",storageBucket:"send-mail-news.appspot.com",messagingSenderId:"735458348101",appId:"1:735458348101:web:9448e2b6fd09b61efee72c"};
firebase.initializeApp(tvpcv);var db=firebase.firestore();function isPostPage(){return document.body.classList.contains("item-view")}function getAds(){return new Promise(function(b,c){db.collection("anunciantes").get().then(function(d){return d.docs.map(function(a){return a.data()})}).then(function(d){return b(d)})["catch"](function(d){return c(d)})})}
function filterAds(b){var c=isPostPage(),d={adsAnchor:[],adsHeader:[],adsMain:[],adsSideBar:[],adsSquares:[],adsFooter:[],adsFloating:[]};b.forEach(function(a){var e=c&&a.pages.includes("post"),f=!c&&a.pages.includes("home");if(e||f)a.local.includes("anchor")&&new Date<=new Date(a.validity)&&d.adsAnchor.push(a),a.local.includes("header")&&new Date<=new Date(a.validity)&&d.adsHeader.push(a),a.local.includes("main")&&new Date<=new Date(a.validity)&&d.adsMain.push(a),a.local.includes("sidebar")&&new Date<=
new Date(a.validity)&&d.adsSideBar.push(a),a.local.includes("squares")&&new Date<=new Date(a.validity)&&d.adsSquares.push(a),a.local.includes("footer")&&new Date<=new Date(a.validity)&&d.adsFooter.push(a),a.local.includes("floating")&&new Date<=new Date(a.validity)&&d.adsFloating.push(a)});return d}
function displayAds(b){var c=document.querySelector(".anchor-ads"),d=document.querySelector(".header-ads"),a=document.querySelectorAll(".main-ads"),e=document.querySelector(".sidebar-ads"),f=document.querySelector(".square-ads"),g=document.querySelector(".footer-ads"),k=document.querySelector(".floating-ads");adsOneAtATime(c,b.adsAnchor);adsMultipleAtATime(d,b.adsHeader,3);adsMultipleAtATime(e,b.adsSideBar,5);a.forEach(function(h){return adsOneAtATime(h,b.adsMain)});adsMultipleAtATime(f,b.adsSquares,
6);adsOneAtATime(g,b.adsFooter);adsOneAtATime(k,b.adsFloating)}
function adsOneAtATime(b,c){if(1===c.length){var d=document.createElement("div");d.classList.add("ad");d.id=c[0].id;var a=document.createElement("a");a.href=c[0].link;a.target="_blank";var e=document.createElement("img");e.src=c[0].photoURL;e.alt="Banner do an\u00fancio "+c[0].name;a.appendChild(e);d.appendChild(a);b.appendChild(d)}else if(1<c.length){var f=function(){b.querySelectorAll(".ad").forEach(function(l){return l.remove()});var k=document.createElement("div");k.classList.add("ad");k.id=c[g].id;
var h=document.createElement("a");h.href=c[g].link;h.target="_blank";var m=document.createElement("img");m.src=c[g].photoURL;m.alt="Banner do an\u00fancio "+c[g].name;h.appendChild(m);k.appendChild(h);b.appendChild(k);g=Math.floor(Math.random()*(c.length-0))},g=Math.floor(Math.random()*(c.length-0));f();setInterval(function(){f()},5E3)}}
function adsMultipleAtATime(b,c,d){1<=c.length&&c.length<=d?c.forEach(function(a){var e=document.createElement("div");e.classList.add("ad");e.id=a.id;var f=document.createElement("a");f.href=a.link;f.target="_blank";var g=document.createElement("img");g.src=a.photoURL;g.alt="Banner do an\u00fancio "+a.name;f.appendChild(g);e.appendChild(f);b.appendChild(e)}):1<c.length&c.length>d&&(refreshAdsMultiple(b,c,d),setInterval(function(){return refreshAdsMultiple(b,c,d)},5E3))}
function refreshAdsMultiple(b,c,d){d=generateRandomArray(0,c.length-1,d);b.querySelectorAll(".ad").forEach(function(a){return a.remove()});d.forEach(function(a){a=c[a];var e=document.createElement("div");e.classList.add("ad");e.id=a.id;var f=document.createElement("a");f.href=a.link;f.target="_blank";var g=document.createElement("img");g.src=a.photoURL;g.alt="Banner do an\u00fancio "+a.name;f.appendChild(g);e.appendChild(f);b.appendChild(e)})}
function generateRandomArray(b,c,d,a){a=void 0===a?1:a;for(var e=new Set;e.size<d;){for(var f=Math.floor(Math.random()*(c-b+1))+b,g=!0,k=$jscomp.makeIterator(e),h=k.next();!h.done;h=k.next())if(Math.abs(f-h.value)<a){g=!1;break}g&&e.add(f)}return Array.from(e)}
function initRenderAds(){if(isPostPage()){var b=document.querySelectorAll(".post-body br"),c=null;4>=b.length?c=1:4<b.length&&8>=b.length?c=2:8<b.length&&12>=b.length?c=3:12<b.length&&(c=4);c=generateRandomArray(0,b.length-3,c,3);for(var d=0;d<c.length;d++)b[c[d]].insertAdjacentHTML("afterend",'<div class="main-ads ads-region"></div>')}else for(b=document.querySelectorAll(".post-outer-container"),c=0;c<b.length;c++)0===(c+2)%3&&b[c].insertAdjacentHTML("afterend",'<div class="main-ads ads-region"></div>');
getAds().then(function(a){return filterAds(a)}).then(function(a){return displayAds(a)}).then(function(){return initStatistics()})}
function initStatistics(){function b(a,e){db.collection("statistics").doc(a).get().then(function(f){function g(k,h){var m=(new Date).toLocaleDateString().replace(/\//g,"-");db.collection("statistics/"+k+"/byDay").doc(m).get().then(function(l){l.exists?(l=l.data(),l[h]+=1,db.collection("statistics/"+k+"/byDay").doc(m).update(l)["catch"](function(n){return console.error(n)})):(l={clicks:0,views:0,prints:0},l[h]+=1,db.collection("statistics/"+k+"/byDay").doc(m).set(l)["catch"](function(n){return console.error(n)}))})}
f.exists?(f=f.data(),f[e]+=1,db.collection("statistics").doc(a).update(f).then(function(){return g(a,e)})):(f={clicks:0,views:0,prints:0},f[e]+=1,db.collection("statistics").doc(a).set(f).then(function(){return g(a,e)}))})}var c=document.querySelectorAll(".ad"),d=new IntersectionObserver(function(a){a.forEach(function(e){var f=e.target.id;e.isIntersecting?setTimeout(function(){e.isIntersecting&&b(f,"views")},2E3):clearTimeout()})});c.forEach(function(a){var e=a.id;d.observe(a);b(e,"prints");a.onclick=
function(f){return b(e,"clicks")}})}initRenderAds();document.querySelector(".floating-ads .close").onclick=function(){var b=document.querySelector(".floating-ads");b.style.transform="scale(0)";setTimeout(function(){return b.style.transform="scale(1)"},15E3)};document.querySelector(".anchor-ads .show-hide").onclick=function(){var b=document.querySelector(".anchor-ads");b.classList.toggle("active");setTimeout(function(){return b.classList.add("active")},15E3)};