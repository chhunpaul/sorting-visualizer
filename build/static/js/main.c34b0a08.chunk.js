(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(18)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=(a(15),a(16),a(2)),c=a(5),u=a(6),l=a(8),h=a(7),m=a(1),d=a(9);a(17);var g=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(h.a)(t).call(this,e))).state={arraySize:300,array:[],animationTimeouts:[]},a.onSizeChange=a.onSizeChange.bind(Object(m.a)(a)),a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.resetArray()}},{key:"cancel",value:function(){for(var e=document.getElementsByClassName("array-bar"),t=0;t<e.length;t++)e[t].style.backgroundColor="#DCDADA";for(var a=this.state.animationTimeouts,n=0;n<a.length;n++)clearTimeout(a[n]);this.setState({animationTimeouts:[]})}},{key:"onSizeChange",value:function(e){this.cancel(),this.updateSize(e.target.value),this.setState({arraySize:e.target.value})}},{key:"updateSize",value:function(e){for(var t=[],a=0;a<e;a++){var n=Math.floor(496*Math.random()+5);t.push(n)}this.setState({array:t,arraySize:e})}},{key:"resetArray",value:function(){this.cancel(),this.updateSize(this.state.arraySize)}},{key:"mergeSort",value:function(){for(var e=this,t=function(e){var t=[];if(e.length<=1)return e;var a=e.slice();return function e(t,a,n,r,i){if(a!==n){var o=Math.floor((a+n)/2);e(r,a,o,t,i),e(r,o+1,n,t,i),function(e,t,a,n,r,i){for(var o=t,s=t,c=a+1;s<=a&&c<=n;)i.push({cmd:"highlight",indexes:[s,c]}),r[s]<=r[c]?(i.push({cmd:"resize",indexes:[o,r[s]]}),e[o++]=r[s++]):(i.push({cmd:"resize",indexes:[o,r[c]]}),e[o++]=r[c++]);for(;s<=a;)i.push({cmd:"highlight",indexes:[s,s]}),i.push({cmd:"resize",indexes:[o,r[s]]}),e[o++]=r[s++];for(;c<=n;)i.push({cmd:"highlight",indexes:[c,c]}),i.push({cmd:"resize",indexes:[o,r[c]]}),e[o++]=r[c++]}(t,a,o,n,r,i)}}(e,0,e.length-1,a,t),t}(this.state.array.slice()),a=document.getElementsByClassName("array-bar"),n=this.state.animationTimeouts,r=0,i=function(i){var o=t[i];switch(o.cmd){case"highlight":var c=Object(s.a)(o.indexes,2),u=c[0],l=c[1],h=a[u].style,m=a[l].style;r=setTimeout((function(){h.backgroundColor="turquoise",m.backgroundColor="turquoise"}),5*i),n.push(r),e.setState({animationTimeouts:n});break;case"resize":r=setTimeout((function(){var e=Object(s.a)(o.indexes,2),t=e[0],n=e[1];a[t].style.height="".concat(n,"px")}),5*i),n.push(r),e.setState({animationTimeouts:n});break;default:console.log("Animation Error: Unknown cmd: ".concat(o.cmd))}},o=0;o<t.length;o++)i(o)}},{key:"render",value:function(){var e=this,t=this.state.array;return r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"Size"),r.a.createElement("input",{onChange:this.onSizeChange}),r.a.createElement("div",{className:"container"},t.map((function(e,t){return r.a.createElement("div",{className:"array-bar",style:{height:"".concat(e,"px")},key:t})}))),r.a.createElement("button",{onClick:function(){return e.resetArray()}},"Reset"),r.a.createElement("button",{onClick:function(){return e.mergeSort()}},"Merge Sort"))}}]),t}(r.a.Component);var f=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(g,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.c34b0a08.chunk.js.map