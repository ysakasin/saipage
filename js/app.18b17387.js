(function(t){function e(e){for(var n,o,r=e[0],c=e[1],l=e[2],v=0,d=[];v<r.length;v++)o=r[v],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,r=1;r<a.length;r++){var c=a[r];0!==i[c]&&(n=!1)}n&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var n={},i={app:0},s=[];function o(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=n,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(a,n,function(e){return t[e]}.bind(null,n));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=c;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"1c00":function(t,e,a){},2586:function(t,e,a){"use strict";var n=a("c4c8"),i=a.n(n);i.a},"42f7":function(t,e,a){"use strict";var n=a("9973"),i=a.n(n);i.a},"4aeb":function(t,e,a){t.exports=a.p+"media/dice_roll.119e7a9d.mp3"},"4cfe":function(t,e,a){},"52a8":function(t,e,a){"use strict";var n=a("4cfe"),i=a.n(n);i.a},"5c0b":function(t,e,a){"use strict";var n=a("7694"),i=a.n(n);i.a},"6f35":function(t,e,a){"use strict";var n=a("1c00"),i=a.n(n);i.a},7694:function(t,e,a){},"7c57":function(t,e,a){"use strict";var n=a("8c81"),i=a.n(n);i.a},"8c81":function(t,e,a){},9973:function(t,e,a){},a644:function(t,e,a){},c4c8:function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),i=a("bb71"),s=(a("da64"),a("2f62")),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("AppBar"),a("v-container",{attrs:{"grid-list-lg":""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{staticStyle:{position:"relative"},attrs:{xs12:""}},[a("Tool"),a("DiceArea")],1),a("v-flex",{attrs:{xs12:""}},[a("Log")],1),a("v-flex",{attrs:{xs12:""}},[a("Tips")],1)],1)],1)],1)},r=[],c=a("d4ec"),l=a("bee2"),u=a("2caf"),v=a("262e"),d=a("9ab4"),p=a("2fe1"),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-toolbar",[a("v-toolbar-title",[a("small",{staticClass:"hidden-xs-only"},[t._v("どどんとふのダイスが手軽に使える")]),t._v("Saipage ")]),a("v-spacer"),a("v-select",{staticClass:"hidden-xs-only game-type",attrs:{"menu-props":{maxHeight:"400"},items:t.diceBots,"prepend-icon":"book","item-text":"name","item-value":"gameType",placeholder:"ロード中……"},model:{value:t.gameType,callback:function(e){t.gameType=e},expression:"gameType"}}),a("v-tooltip",{attrs:{bottom:""}},[a("v-btn",{staticClass:"hidden-xs-only",attrs:{slot:"activator",icon:""},on:{click:function(e){e.stopPropagation(),t.playSound=!t.playSound}},slot:"activator"},[t.playSound?a("v-icon",[t._v("volume_up")]):a("v-icon",[t._v("volume_off")])],1),t.playSound?a("span",[t._v("現在 : ON")]):a("span",[t._v("現在 : OFF")])],1),a("v-tooltip",{attrs:{bottom:""}},[a("v-btn",{attrs:{slot:"activator",icon:""},on:{click:function(e){e.stopPropagation(),t.settings=!0}},slot:"activator"},[a("v-icon",[t._v("settings")])],1),a("span",[t._v("設定")])],1)],1),a("Settings",{model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}})],1)},m=[],h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{overlay:!1,fullscreen:"",scrollable:"",transition:"dialog-bottom-transition"},model:{value:t.isActive,callback:function(e){t.isActive=e},expression:"isActive"}},[a("v-card",{attrs:{tile:""}},[a("v-toolbar",{attrs:{card:"",dark:""}},[a("v-btn",{attrs:{icon:"",dark:""},nativeOn:{click:function(e){t.isActive=!1}}},[a("v-icon",[t._v("close")])],1),a("v-toolbar-title",[t._v("設定")])],1),a("v-card-text",[a("v-list",{attrs:{"three-line":"",subheader:""}},[a("v-list-tile",{attrs:{avatar:""}},[a("v-select",{attrs:{items:t.diceBots,label:"ダイスボット","item-text":"name","item-value":"gameType"},model:{value:t.gameType,callback:function(e){t.gameType=e},expression:"gameType"}})],1),a("v-list-tile",{attrs:{avatar:""}},[a("v-text-field",{attrs:{value:t.apiURL,label:"BCDice-APIのURL","append-icon":"restore"},on:{change:function(e){return t.apiURL=e},"click:append":t.resetApiURL}})],1),a("v-list-tile",{attrs:{avatar:""}},[a("v-list-tile-action",[a("v-switch",{attrs:{color:"primary"},model:{value:t.playDiceAnimation,callback:function(e){t.playDiceAnimation=e},expression:"playDiceAnimation"}})],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("ダイスロールアニメーション")]),a("v-list-tile-sub-title",[t._v("ダイスロール時のアニメーションを表示する")])],1)],1),a("v-list-tile",{attrs:{avatar:""}},[a("v-list-tile-action",[a("v-switch",{attrs:{color:"primary"},model:{value:t.playSound,callback:function(e){t.playSound=e},expression:"playSound"}})],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("効果音")]),a("v-list-tile-sub-title",[t._v("ダイスロール時に効果音を鳴らす")])],1)],1),a("v-list-tile",{attrs:{avatar:""}},[a("v-list-tile-action",[a("v-switch",{attrs:{color:"primary"},model:{value:t.showSystemInfo,callback:function(e){t.showSystemInfo=e},expression:"showSystemInfo"}})],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("ヘルプ表示")]),a("v-list-tile-sub-title",[t._v("ダイスコマンド入力時にヘルプを表示する")])],1)],1),a("v-list-tile",{attrs:{avatar:""}},[a("v-list-tile-action",[a("v-switch",{attrs:{color:"primary"},model:{value:t.showTips,callback:function(e){t.showTips=e},expression:"showTips"}})],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v("Tips表示")]),a("v-list-tile-sub-title",[t._v("SaipageのTipsを表示する")])],1)],1),a("v-list-tile",[a("span",{staticClass:"setting-title"},[t._v("音量")]),a("v-slider",{staticClass:"volume",attrs:{max:"10","append-icon":"volume_up","prepend-icon":"volume_down"},model:{value:t.volume,callback:function(e){t.volume=e},expression:"volume"}})],1)],1),a("v-divider"),a("v-subheader",{staticClass:"red--text"},[t._v("Danger Zone")]),a("v-list",{attrs:{"three-line":"",subheader:""}},[a("v-list-tile",[a("v-list-tile-content",[a("v-list-tile-title",[t._v("ログを削除")]),a("v-list-tile-sub-title",[t._v("このSaipageで行ったダイスロールの全ログをブラウザから削除します")])],1),a("v-list-tile-action",{staticClass:"danger-zone-action"},[a("v-btn",{attrs:{depressed:"",color:"error"},on:{click:function(e){e.stopPropagation(),t.removeLogDialog=!0}}},[t._v("ログを削除")])],1)],1)],1),a("v-divider"),a("v-subheader",[t._v("アプリケーション情報")]),a("v-card-text",[a("div",{staticClass:"headline"},[t._v(" Saipage "),a("small",[t._v("- "+t._s(t.commitHash))])]),a("p",[t._v(" Created by "),a("a",{attrs:{href:"https://twitter.com/ysakasin"}},[t._v("酒田 シンジ")])]),a("p",[t._v(" ご要望やバグ報告は"),a("a",{attrs:{href:"https://github.com/ysakasin/saipage/issues"}},[t._v("Github issue")]),t._v("または"),a("a",{attrs:{href:"https://twitter.com/ysakasin"}},[t._v("Twitter")]),t._v("までお寄せください ")])])],1),a("div",{staticStyle:{flex:"1 1 auto"}})],1),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.removeLogDialog,callback:function(e){t.removeLogDialog=e},expression:"removeLogDialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("ログを削除")]),a("v-card-text",[a("p",[t._v(" このSaipageで行ったダイスロールの全ログをブラウザから削除します。ログを削除すると復旧することはできません。 ")]),a("p",[t._v(" ログを削除しますか？ ")])]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",flat:"flat"},on:{click:function(e){t.removeLogDialog=!1}}},[t._v(" キャンセル ")]),a("v-btn",{attrs:{depressed:"",color:"error"},on:{click:t.removeAllLogs}},[t._v(" 削除する ")])],1)],1)],1),a("v-snackbar",{attrs:{timeout:3e3,color:"success",top:""},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" "),a("v-btn",{attrs:{dark:"",flat:""},on:{click:function(e){t.snackbar=!1}}},[t._v(" 閉じる ")])],1)],1)},g=[],y=(a("d81d"),a("13d5"),a("b0c0"),a("96cf"),a("1da1")),b=a("bc3a"),k=a.n(b),_=a("72bf"),S=a.n(_),T="https://bcdice.onlinesession.app",x="/v1/names",$="/v1/diceroll?",w="/v1/systeminfo?",A=T,O=A+x,j=A+$,V=A+w;function D(t){A=t,O=A+x,j=A+$,V=A+w}function I(){return L.apply(this,arguments)}function L(){return L=Object(y["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k.a.get(O);case 2:return e=t.sent,t.abrupt("return",e.data.names.map((function(t){return{gameType:t.system,name:t.name}})).sort((function(t,e){return t.name>e.name?1:-1})));case 4:case"end":return t.stop()}}),t)}))),L.apply(this,arguments)}function C(t,e){return B.apply(this,arguments)}function B(){return B=Object(y["a"])(regeneratorRuntime.mark((function t(e,a){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=S.a.stringify({system:e,command:a}),t.next=3,k.a.get(j+n);case 3:return i=t.sent,t.abrupt("return",i.data);case 5:case"end":return t.stop()}}),t)}))),B.apply(this,arguments)}function R(t){return N.apply(this,arguments)}function N(){return N=Object(y["a"])(regeneratorRuntime.mark((function t(e){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=S.a.stringify({system:e}),t.next=3,k.a.get(V+a);case 3:return n=t.sent,t.abrupt("return",n.data.systeminfo);case 5:case"end":return t.stop()}}),t)}))),N.apply(this,arguments)}function P(t){return 100==t.face||10==t.face||12==t.face||20==t.face||4==t.face||6==t.face||8==t.face}function U(t){var e=t.reduce((function(t,e){return P(e)&&(100==e.face?(t.push({face:100,value:Math.floor(e.value/10)}),t.push({face:10,value:e.value%10})):t.push(e)),t}),[]);return e}var G="178f9d0",M=!1,J=!1,F=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"data",value:function(){return{isActive:!1,snackbar:!1,snackbarText:"",removeLogDialog:!1}}},{key:"resetApiURL",value:function(){this.$store.dispatch("updateApiURL",T),this.$data.snackbarText="APIをデフォルト設定に戻しました",this.$data.snackbar=!0}},{key:"removeAllLogs",value:function(){this.$store.commit("removeAllLogs"),this.$data.removeLogDialog=!1,this.$data.snackbarText="ログを削除しました",this.$data.snackbar=!0}},{key:"diceBots",get:function(){return this.$store.state.diceBots}},{key:"commitHash",get:function(){return M||J?G+"+":G}},{key:"apiURL",get:function(){return this.$store.state.apiURL},set:function(t){this.$store.dispatch("updateApiURL",t),this.$data.snackbarText="変更しました",this.$data.snackbar=!0}},{key:"gameType",get:function(){return this.$store.state.gameType},set:function(t){this.$store.dispatch("updateGameType",t),this.$data.snackbarText="ダイスボットを「".concat(t,"」に変更しました"),this.$data.snackbar=!0}},{key:"playSound",get:function(){return this.$store.state.settings.playSound},set:function(t){this.$store.commit("updateSoundSetting",t)}},{key:"playDiceAnimation",get:function(){return this.$store.state.settings.playDiceAnimation},set:function(t){this.$store.commit("updateAnimationSetting",t)}},{key:"showSystemInfo",get:function(){return this.$store.state.settings.showSystemInfo},set:function(t){this.$store.commit("updateSystemInfoSetting",t)}},{key:"showTips",get:function(){return this.$store.state.settings.showTips},set:function(t){this.$store.commit("updateTipsSetting",t)}},{key:"volume",get:function(){return 10*this.$store.state.settings.soundVolume},set:function(t){var e=t/10;this.$store.commit("updateSoundVolumeSetting",e)}}]),a}(n["a"]);F=Object(d["a"])([Object(p["a"])({props:{value:Boolean},watch:{value:function(t){t!=this.$data.isActive&&(this.$data.isActive=t)},isActive:function(t){this.$emit("input",t)}}})],F);var E=F,H=E,z=(a("6f35"),a("2877")),q=a("6544"),Z=a.n(q),K=a("8336"),Q=a("b0af"),W=a("99d9"),X=a("12b2"),Y=a("169a"),tt=a("ce7e"),et=a("132d"),at=a("8860"),nt=a("ba95"),it=a("40fe"),st=a("5d23"),ot=a("b56d"),rt=a("ba0d"),ct=a("2db4"),lt=a("9910"),ut=a("e0c7"),vt=a("b73d"),dt=a("2677"),pt=a("71d9"),ft=a("2a7f"),mt=Object(z["a"])(H,h,g,!1,null,"889e53de",null),ht=mt.exports;Z()(mt,{VBtn:K["a"],VCard:Q["a"],VCardActions:W["a"],VCardText:W["b"],VCardTitle:X["a"],VDialog:Y["a"],VDivider:tt["a"],VIcon:et["a"],VList:at["a"],VListTile:nt["a"],VListTileAction:it["a"],VListTileContent:st["a"],VListTileSubTitle:st["b"],VListTileTitle:st["c"],VSelect:ot["a"],VSlider:rt["a"],VSnackbar:ct["a"],VSpacer:lt["a"],VSubheader:ut["a"],VSwitch:vt["a"],VTextField:dt["a"],VToolbar:pt["a"],VToolbarTitle:ft["a"]});var gt=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"data",value:function(){return{settings:!1}}},{key:"diceBots",get:function(){return this.$store.state.diceBots}},{key:"gameType",get:function(){return this.$store.state.gameType},set:function(t){this.$store.dispatch("updateGameType",t)}},{key:"playSound",get:function(){return this.$store.state.settings.playSound},set:function(t){this.$store.commit("updateSoundSetting",t)}}]),a}(n["a"]);gt=Object(d["a"])([Object(p["a"])({components:{Settings:ht}})],gt);var yt=gt,bt=yt,kt=(a("52a8"),a("3a2f")),_t=Object(z["a"])(bt,f,m,!1,null,null,null),St=_t.exports;Z()(_t,{VBtn:K["a"],VIcon:et["a"],VSelect:ot["a"],VSpacer:lt["a"],VToolbar:pt["a"],VToolbarTitle:ft["a"],VTooltip:kt["a"]});var Tt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"log-area"},[0==t.logs.length?a("v-card-text",{staticClass:"log"},[a("div",{staticClass:"meta"},[t._v(" ダイスログはまだありません ")])]):t._e(),t._l(t.logs,(function(e,n){return[a("v-card-text",{key:n,staticClass:"log"},[a("div",{staticClass:"meta"},[a("span",[t._v(t._s(e.gameType))]),a("span",{staticClass:"timestamp"},[t._v(t._s(t.format(e.timestamp)))]),a("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(n){var i=n.on;return[a("v-icon",t._g({directives:[{name:"ripple",rawName:"v-ripple"}],on:{click:function(a){return t.dicerollByText(e.gameType,e.command)}}},i),[t._v("replay")])]}}],null,!0)},[a("span",[t._v("もう一度ダイスロール")])])],1),a("div",{staticClass:"subheading"},[t._v(t._s(e.command)+" "+t._s(e.body))])])]})),a("v-snackbar",{attrs:{timeout:4e3,color:"error",top:""},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.errorMsg)+" "),a("v-btn",{attrs:{dark:"",flat:""},on:{click:function(e){t.snackbar=!1}}},[t._v(" 閉じる ")])],1)],2)},xt=[],$t=(a("99af"),a("fb6a"),864e5),wt=Date.now(),At=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"data",value:function(){return{snackbar:!1,errorMsg:""}}},{key:"format",value:function(t){var e=new Date(t),a=wt-e.getTime(),n=this.zeroPadding(e.getHours()),i=this.zeroPadding(e.getMinutes());if(a>=$t){var s=e.getMonth()+1,o=e.getDate();return"".concat(s,"月").concat(o,"日 ").concat(n,":").concat(i)}return"".concat(n,":").concat(i)}},{key:"zeroPadding",value:function(t){return("0"+t).slice(-2)}},{key:"dicerollByText",value:function(t,e){var a=this;C(t,e).then((function(n){var i=n.dices.map((function(t){return{face:t.faces,value:t.value}})),s={gameType:t,command:e,body:n.result,drawables:U(i),timestamp:new Date};a.$store.commit("appendLogBuffer",s)})).catch((function(t){t.response?a.$data.errorMsg="ダイスコマンドを実行できませんでした":a.$data.errorMsg="APIサーバーに接続できませんでした",a.$data.snackbar=!0}))}},{key:"logs",get:function(){return this.$store.state.logs}}]),a}(n["a"]);At=Object(d["a"])([p["a"]],At);var Ot=At,jt=Ot,Vt=(a("42f7"),a("269a")),Dt=a.n(Vt),It=a("3ccf"),Lt=Object(z["a"])(jt,Tt,xt,!1,null,"49e17466",null),Ct=Lt.exports;Z()(Lt,{VBtn:K["a"],VCard:Q["a"],VCardText:W["b"],VIcon:et["a"],VSnackbar:ct["a"],VTooltip:kt["a"]}),Dt()(Lt,{Ripple:It["a"]});var Bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("form",{on:{submit:function(e){return e.preventDefault(),t.diceroll(e)}}},[a("v-text-field",{ref:"commandField",attrs:{"append-icon-cb":t.diceroll,label:"ダイスコマンドを入力...","append-icon":"send","single-line":"","hide-details":"","full-width":""},on:{blur:function(e){t.help=!1},focus:function(e){t.help=t.showSystemInfo}},model:{value:t.command,callback:function(e){t.command=e},expression:"command"}})],1),a("v-divider"),a("transition",{on:{"before-enter":t.beforeEnter,enter:t.enter,"before-leave":t.beforeLeave,leave:t.leave}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.help,expression:"help"}]},[a("v-card-text",{staticClass:"sysinfo"},[a("div",[t._v(t._s(t.gameName))]),a("span",{domProps:{innerHTML:t._s(t.gameInfo)}})]),a("v-divider")],1)]),t._l(t.shortcuts,(function(e,n){return a("v-btn",{key:n,attrs:{depressed:""},on:{click:function(a){return a.stopPropagation(),t.execShortcut(e)}}},[t._v(t._s(e))])})),a("v-tooltip",{attrs:{bottom:""}},[a("v-btn",{attrs:{slot:"activator",icon:""},on:{click:function(e){e.stopPropagation(),t.edit=!0}},slot:"activator"},[a("v-icon",[t._v("add")])],1),a("span",[t._v("ショートカット追加")])],1),a("ShortcutDialog",{model:{value:t.edit,callback:function(e){t.edit=e},expression:"edit"}}),a("v-snackbar",{attrs:{timeout:4e3,color:"error",top:""},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.errorMsg)+" "),a("v-btn",{attrs:{dark:"",flat:""},on:{click:function(e){t.snackbar=!1}}},[t._v(" 閉じる ")])],1)],2)},Rt=[],Nt=(a("ac1f"),a("466d"),a("5319"),a("498a"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.isActive,callback:function(e){t.isActive=e},expression:"isActive"}},[a("v-card",[a("v-card-title",[t._v(" ショートカット編集 ")]),a("v-card-text",[a("form",{on:{submit:function(e){return e.preventDefault(),t.add()}}},[a("v-text-field",{attrs:{label:"登録するコマンドを入力...",autofocus:""},model:{value:t.command,callback:function(e){t.command=e},expression:"command"}})],1),t._l(t.shortcuts,(function(e,n){return a("v-chip",{key:n,attrs:{close:""},on:{input:function(a){return t.remove(e)}}},[t._v(t._s(e))])}))],2),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",flat:""},on:{click:function(e){e.stopPropagation(),t.isActive=!1}}},[t._v("閉じる")])],1)],1)],1)}),Pt=[],Ut=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"data",value:function(){return{isActive:!1,command:""}}},{key:"add",value:function(){this.$store.commit("addShortcut",this.$data.command),this.$data.command=""}},{key:"remove",value:function(t){this.$store.commit("removeShortcut",t)}},{key:"shortcuts",get:function(){return this.$store.state.shortcuts}}]),a}(n["a"]);Ut=Object(d["a"])([Object(p["a"])({props:{value:Boolean},watch:{value:function(t){t!=this.$data.isActive&&(this.$data.isActive=t)},isActive:function(t){this.$emit("input",t)}}})],Ut);var Gt=Ut,Mt=Gt,Jt=a("cc20"),Ft=Object(z["a"])(Mt,Nt,Pt,!1,null,null,null),Et=Ft.exports;Z()(Ft,{VBtn:K["a"],VCard:Q["a"],VCardActions:W["a"],VCardText:W["b"],VCardTitle:X["a"],VChip:Jt["a"],VDialog:Y["a"],VSpacer:lt["a"],VTextField:dt["a"]});var Ht=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"data",value:function(){return{command:"",help:!1,edit:!1,snackbar:!1,errorMsg:""}}},{key:"clearForm",value:function(){this.$data.command=""}},{key:"execShortcut",value:function(t){t.match(/[?？]/)?(this.$data.command=t,this.$refs.commandField.focus()):this.dicerollByText(t)}},{key:"diceroll",value:function(){this.dicerollByText(this.$data.command,!0)}},{key:"dicerollByText",value:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];C(this.gameType,t).then((function(n){var i=n.dices.map((function(t){return{face:t.faces,value:t.value}})),s={gameType:e.gameType,command:t,body:n.result,drawables:U(i),timestamp:new Date};a&&e.clearForm(),e.$store.commit("appendLogBuffer",s)})).catch((function(t){t.response?e.$data.errorMsg="ダイスコマンドを実行できませんでした":e.$data.errorMsg="APIサーバーに接続できませんでした",e.$data.snackbar=!0}))}},{key:"beforeEnter",value:function(t){t.style.height="0"}},{key:"enter",value:function(t){t.style.height=t.scrollHeight+"px"}},{key:"beforeLeave",value:function(t){t.style.height=t.scrollHeight+"px"}},{key:"leave",value:function(t){t.style.height="0"}},{key:"gameType",get:function(){return this.$store.state.gameType}},{key:"gameName",get:function(){return this.$store.state.gameName}},{key:"gameInfo",get:function(){return this.$store.state.gameInfo.trim().replace(/\n/g,"<br />")}},{key:"shortcuts",get:function(){return this.$store.state.shortcuts}},{key:"showSystemInfo",get:function(){return this.$store.state.settings.showSystemInfo}}]),a}(n["a"]);Ht=Object(d["a"])([Object(p["a"])({components:{ShortcutDialog:Et}})],Ht);var zt=Ht,qt=zt,Zt=(a("fdea"),Object(z["a"])(qt,Bt,Rt,!1,null,"9f3f3cca",null)),Kt=Zt.exports;Z()(Zt,{VBtn:K["a"],VCard:Q["a"],VCardText:W["b"],VDivider:tt["a"],VIcon:et["a"],VSnackbar:ct["a"],VTextField:dt["a"],VTooltip:kt["a"]});var Qt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{directives:[{name:"show",rawName:"v-show",value:t.showTips,expression:"showTips"}]},[a("v-card-title",[a("h3",{staticClass:"headline"},[t._v("Tips")])]),a("v-card-text",[a("p",[a("strong",[t._v("Saipage")]),t._v("では"),a("strong",[t._v("「どどんとふのダイス」")]),t._v("こと"),a("strong",[t._v("「BCDice」")]),t._v("をブラウザから手軽に振ることができます。 「手軽にダイスを降る」に特化したため、このアプリケーションには"),a("strong",[t._v("「ルーム」がありません")]),t._v("。 設定やダイスロールのログは全てブラウザに保存されます。 ")]),a("p",[t._v(" 設定は右上にある "),a("strong",[t._v("歯車のアイコン"),a("v-icon",{attrs:{small:""}},[t._v("settings")])],1),t._v(" からできます。 ")]),a("p",[t._v(" よく使うコマンドをワンタッチで実行できるように"),a("strong",[t._v("「ショートカット機能」")]),t._v("を用意しました。 コマンド入力欄の下にある "),a("strong",[t._v("追加ボタン"),a("v-icon",{attrs:{small:""}},[t._v("add")])],1),t._v(" から好みに合わせてカスタマイズしてみてください。 ")])])],1)},Wt=[],Xt=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"showTips",get:function(){return this.$store.state.settings.showTips}}]),a}(n["a"]);Xt=Object(d["a"])([p["a"]],Xt);var Yt=Xt,te=Yt,ee=Object(z["a"])(te,Qt,Wt,!1,null,null,null),ae=ee.exports;Z()(ee,{VCard:Q["a"],VCardText:W["b"],VCardTitle:X["a"],VIcon:et["a"]});var ne=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dice-area"},[a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.draw,expression:"draw"}],staticClass:"result",class:{success:t.isSuccess,failure:t.isFailure,active:t.isActive},on:{click:function(e){e.stopPropagation(),t.draw=!1}}},[t._v(" "+t._s(t.commandResult)+" ")])]),t._l(t.target.drawables,(function(e,n){return[t.draw?a("Dice",{key:n,attrs:{face:e.face,value:e.value},on:{hide:function(e){t.draw=!1}}}):t._e()]})),a("audio",{attrs:{preload:""}},[a("source",{attrs:{src:t.soundData}})])],2)},ie=[],se=(a("caad"),a("2532"),a("1276"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dice-container",class:{active:t.isActive}},[a("div",{staticClass:"dice",class:[t.diceClass,t.valueClass,{active:t.isActive}],on:{click:function(e){return t.hide()}}})])}),oe=[],re=(a("a9e3"),function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"hide",value:function(){this.$emit("hide")}},{key:"diceClass",get:function(){return"dice-"+this.$props.face}},{key:"valueClass",get:function(){return"value-"+this.$props.value}},{key:"isActive",get:function(){return this.$store.state.activeAnimation}}]),a}(n["a"]));re=Object(d["a"])([Object(p["a"])({props:{face:Number,value:Number}})],re);var ce=re,le=ce,ue=(a("2586"),Object(z["a"])(le,se,oe,!1,null,"c0293b9c",null)),ve=ue.exports,de=a("4aeb"),pe=a.n(de),fe=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"data",value:function(){return{draw:!1,soundData:pe.a,target:[]}}},{key:"mounted",value:function(){var t=this;this.$store.watch((function(t){return t.readyAnimation}),(function(e){0==e&&t.playAnimation()}))}},{key:"playAnimation",value:function(){if(this.playDiceAnimation){this.play();var t=this.$store.state.logBuffer[0];t.drawables.length>0?(this.$data.draw=!0,this.$data.target=t,this.$store.commit("activateAnimation"),setTimeout(this.deactivateAnimation,900)):this.$store.commit("appendLog",t),setTimeout(this.nextAnimation,1200)}}},{key:"getAudio",value:function(){return void 0!==this.$el?this.$el.querySelectorAll("audio")[0]:null}},{key:"play",value:function(){if(this.playSound){var t=this.getAudio();null!=t&&(t.pause(),t.currentTime=.15,t.volume=this.$store.state.settings.soundVolume,t.play())}}},{key:"showDice",value:function(){this.$data.draw=!0}},{key:"hideDice",value:function(){this.$data.draw=!1}},{key:"deactivateAnimation",value:function(){this.$store.commit("deactivateAnimation"),this.$store.commit("appendLog",this.$data.target)}},{key:"nextAnimation",value:function(){this.$store.commit("nextAnimation"),this.$store.state.readyAnimation||this.playAnimation()}},{key:"playSound",get:function(){return this.$store.state.settings.playSound}},{key:"playDiceAnimation",get:function(){return this.$store.state.settings.playDiceAnimation}},{key:"commandResult",get:function(){var t=this.$data.target.body;if(!t)return"";var e=t.split("＞");return e[e.length-1]}},{key:"isSuccess",get:function(){return this.commandResult.includes("成功")}},{key:"isFailure",get:function(){return this.commandResult.includes("失敗")}},{key:"isActive",get:function(){return this.$store.state.activeAnimation}},{key:"soundVolume",get:function(){return this.$store.state.settings.soundVolume}}]),a}(n["a"]);fe=Object(d["a"])([Object(p["a"])({components:{Dice:ve}})],fe);var me=fe,he=me,ge=(a("7c57"),Object(z["a"])(he,ne,ie,!1,null,"2e579b3c",null)),ye=ge.exports,be=function(t){Object(v["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"mounted",value:function(){this.$store.dispatch("initialize"),this.$ga.page("/")}}]),a}(n["a"]);be=Object(d["a"])([Object(p["a"])({components:{AppBar:St,Tool:Kt,Log:Ct,DiceArea:ye,Tips:ae}})],be);var ke=be,_e=ke,Se=(a("5c0b"),a("7496")),Te=a("a523"),xe=a("0e8f"),$e=a("a722"),we=Object(z["a"])(_e,o,r,!1,null,null,null),Ae=we.exports;Z()(we,{VApp:Se["a"],VContainer:Te["a"],VFlex:xe["a"],VLayout:$e["a"]});a("4de4"),a("c975");n["a"].use(s["a"]);var Oe=["2D6","2D6<=?","1D100"],je={gameType:"DiceBot",gameName:"",gameInfo:"ロード中…",apiURL:"",diceBots:[],shortcuts:[],logs:[],logBuffer:[],readyAnimation:!0,activeAnimation:!1,settings:{playSound:!0,playDiceAnimation:!0,showSystemInfo:!0,showTips:!0,soundVolume:.5}},Ve=new s["a"].Store({state:je,mutations:{updateGameType:function(t,e){t.gameType=e,localStorage.setItem("gameType",t.gameType)},updateGameName:function(t,e){t.gameName=e},updateGameInfo:function(t,e){t.gameInfo=e},updateDiceBots:function(t,e){t.diceBots=e},addShortcut:function(t,e){-1==t.shortcuts.indexOf(e)&&(t.shortcuts.push(e),localStorage.setItem("shortcuts",JSON.stringify(t.shortcuts)))},removeShortcut:function(t,e){var a=t.shortcuts.filter((function(t){return t!=e}));t.shortcuts!=a&&(t.shortcuts=a,localStorage.setItem("shortcuts",JSON.stringify(t.shortcuts)))},appendLogBuffer:function(t,e){t.settings.playDiceAnimation?(t.readyAnimation&&(t.readyAnimation=!1),t.logBuffer.push(e)):t.logs.unshift(e)},appendLog:function(t,e){t.logs.unshift(e),localStorage.setItem("logs",JSON.stringify(t.logs))},removeAllLogs:function(t){t.logs=[],localStorage.removeItem("logs")},nextAnimation:function(t){t.logBuffer.shift(),t.logBuffer.length<1&&(t.readyAnimation=!0)},activateAnimation:function(t){t.activeAnimation=!0},deactivateAnimation:function(t){t.activeAnimation=!1},updateSoundSetting:function(t,e){t.settings.playSound=e,localStorage.setItem("settings",JSON.stringify(t.settings))},updateAnimationSetting:function(t,e){t.settings.playDiceAnimation=e,localStorage.setItem("settings",JSON.stringify(t.settings))},updateSystemInfoSetting:function(t,e){t.settings.showSystemInfo=e,localStorage.setItem("settings",JSON.stringify(t.settings))},updateTipsSetting:function(t,e){t.settings.showTips=e,localStorage.setItem("settings",JSON.stringify(t.settings))},updateSoundVolumeSetting:function(t,e){t.settings.soundVolume=e,localStorage.setItem("settings",JSON.stringify(t.settings))},loadGameType:function(t){var e=localStorage.getItem("gameType");null!=e&&(t.gameType=e)},loadSettings:function(t){var e=localStorage.getItem("settings");if(null!=e){var a=JSON.parse(e);null!=a.playSound&&(t.settings.playSound=a.playSound),null!=a.playDiceAnimation&&(t.settings.playDiceAnimation=a.playDiceAnimation),null!=a.showSystemInfo&&(t.settings.showSystemInfo=a.showSystemInfo),null!=a.showTips&&(t.settings.showTips=a.showTips),null!=a.soundVolume&&(t.settings.soundVolume=a.soundVolume)}},loadLogs:function(t){var e=localStorage.getItem("logs");if(null!=e){var a=JSON.parse(e);null!=a&&(t.logs=a)}},loadShortcuts:function(t){var e=localStorage.getItem("shortcuts");if(null!=e){var a=JSON.parse(e);null!=a&&(t.shortcuts=a)}else t.shortcuts=Oe},updateApiURL:function(t,e){D(e),localStorage.setItem("apiURL",e),t.apiURL=e}},actions:{initialize:function(t){t.dispatch("loadApiURL"),t.dispatch("loadGameType"),t.commit("loadSettings"),t.commit("loadLogs"),t.commit("loadShortcuts")},loadApiURL:function(t){var e=localStorage.getItem("apiURL")||T;t.commit("updateApiURL",e),t.dispatch("loadDiceBots")},loadGameType:function(t){t.commit("loadGameType"),t.dispatch("updateGameInfos",t.state.gameType)},loadDiceBots:function(t){I().then((function(e){t.commit("updateDiceBots",e)}))},updateApiURL:function(t,e){t.commit("updateApiURL",e),t.dispatch("loadDiceBots")},updateGameType:function(t,e){t.commit("updateGameType",e),t.dispatch("updateGameInfos",e)},updateGameInfos:function(t,e){t.commit("updateGameType",e),R(e).then((function(e){t.commit("updateGameName",e.name),t.commit("updateGameInfo",e.info)}))}},getters:{readyAnimation:function(t){return t.readyAnimation}}}),De=Ve,Ie=a("0284").default;n["a"].use(i["a"]),n["a"].use(s["a"]),n["a"].use(Ie,{id:"UA-32151614-6",debug:{sendHitTask:!0}});new n["a"]({el:"#app",render:function(t){return t(Ae)},store:De})},fdea:function(t,e,a){"use strict";var n=a("a644"),i=a.n(n);i.a}});
//# sourceMappingURL=app.18b17387.js.map