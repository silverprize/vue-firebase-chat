(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app~7ffa8a2f"],{c23d:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r,i,a=t("9ab4"),o=t("cd51"),s=t("4be4"),p=t("abfd"),c=(r={},r["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",r["bad-app-name"]="Illegal App name: '{$appName}",r["duplicate-app"]="Firebase App named '{$appName}' already exists",r["app-deleted"]="Firebase App named '{$appName}' already deleted",r["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",r["invalid-log-argument"]="First argument to `onLog` must be null or a function.",r),l=new o.ErrorFactory("app","Firebase",c),u="@firebase/app",f="0.6.7",d="@firebase/analytics",m="@firebase/auth",b="@firebase/database",h="@firebase/functions",v="@firebase/installations",g="@firebase/messaging",y="@firebase/performance",_="@firebase/remote-config",w="@firebase/storage",N="@firebase/firestore",C="firebase-wrapper",I="[DEFAULT]",E=(i={},i[u]="fire-core",i[d]="fire-analytics",i[m]="fire-auth",i[b]="fire-rtdb",i[h]="fire-fn",i[v]="fire-iid",i[g]="fire-fcm",i[y]="fire-perf",i[_]="fire-rc",i[w]="fire-gcs",i[N]="fire-fst",i["fire-js"]="fire-js",i[C]="fire-js-all",i),A=new p.Logger("@firebase/app"),F=function(){function e(e,n,t){var r,i,p=this;this.firebase_=t,this.isDeleted_=!1,this.name_=n.name,this.automaticDataCollectionEnabled_=n.automaticDataCollectionEnabled||!1,this.options_=o.deepCopy(e),this.container=new s.ComponentContainer(n.name),this._addComponent(new s.Component("app",(function(){return p}),"PUBLIC"));try{for(var c=a.__values(this.firebase_.INTERNAL.components.values()),l=c.next();!l.done;l=c.next()){var u=l.value;this._addComponent(u)}}catch(f){r={error:f}}finally{try{l&&!l.done&&(i=c.return)&&i.call(c)}finally{if(r)throw r.error}}}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!0,configurable:!0}),e.prototype.delete=function(){var e=this;return new Promise((function(n){e.checkDestroyed_(),n()})).then((function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map((function(e){return e.delete()})))})).then((function(){e.isDeleted_=!0}))},e.prototype._getService=function(e,n){return void 0===n&&(n=I),this.checkDestroyed_(),this.container.getProvider(e).getImmediate({identifier:n})},e.prototype._removeServiceInstance=function(e,n){void 0===n&&(n=I),this.container.getProvider(e).clearInstance(n)},e.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(n){A.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,n)}},e.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},e.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw l.create("app-deleted",{appName:this.name_})},e}();F.prototype.name&&F.prototype.options||F.prototype.delete;var P="7.15.5";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){var n={},t=new Map,r={__esModule:!0,initializeApp:u,app:c,registerVersion:m,setLogLevel:p.setLogLevel,onLog:b,apps:null,SDK_VERSION:P,INTERNAL:{registerComponent:d,removeApp:i,components:t,useAsService:h}};function i(e){delete n[e]}function c(e){if(e=e||I,!o.contains(n,e))throw l.create("no-app",{appName:e});return n[e]}function u(t,i){if(void 0===i&&(i={}),"object"!==typeof i||null===i){var a=i;i={name:a}}var s=i;void 0===s.name&&(s.name=I);var p=s.name;if("string"!==typeof p||!p)throw l.create("bad-app-name",{appName:String(p)});if(o.contains(n,p))throw l.create("duplicate-app",{appName:p});var c=new e(t,s,r);return n[p]=c,c}function f(){return Object.keys(n).map((function(e){return n[e]}))}function d(i){var s,p,u=i.name;if(t.has(u))return A.debug("There were multiple attempts to register component "+u+"."),"PUBLIC"===i.type?r[u]:null;if(t.set(u,i),"PUBLIC"===i.type){var f=function(e){if(void 0===e&&(e=c()),"function"!==typeof e[u])throw l.create("invalid-app-argument",{appName:u});return e[u]()};void 0!==i.serviceProps&&o.deepExtend(f,i.serviceProps),r[u]=f,e.prototype[u]=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];var t=this._getService.bind(this,u);return t.apply(this,i.multipleInstances?e:[])}}try{for(var d=a.__values(Object.keys(n)),m=d.next();!m.done;m=d.next()){var b=m.value;n[b]._addComponent(i)}}catch(h){s={error:h}}finally{try{m&&!m.done&&(p=d.return)&&p.call(d)}finally{if(s)throw s.error}}return"PUBLIC"===i.type?r[u]:null}function m(e,n,t){var r,i=null!==(r=E[e])&&void 0!==r?r:e;t&&(i+="-"+t);var a=i.match(/\s|\//),o=n.match(/\s|\//);if(a||o){var p=['Unable to register library "'+i+'" with version "'+n+'":'];return a&&p.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),a&&o&&p.push("and"),o&&p.push('version name "'+n+'" contains illegal characters (whitespace or "/")'),void A.warn(p.join(" "))}d(new s.Component(i+"-version",(function(){return{library:i,version:n}}),"VERSION"))}function b(e,n){if(null!==e&&"function"!==typeof e)throw l.create("invalid-log-argument",{appName:name});p.setUserLogHandler(e,n)}function h(e,n){if("serverAuth"===n)return null;var t=n;return t}return r["default"]=r,Object.defineProperty(r,"apps",{get:f}),c["App"]=e,r}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(){var e=L(F);function n(n){o.deepExtend(e,n)}return e.INTERNAL=a.__assign(a.__assign({},e.INTERNAL),{createFirebaseNamespace:D,extendNamespace:n,createSubscribe:o.createSubscribe,ErrorFactory:o.ErrorFactory,deepExtend:o.deepExtend}),e}var k=D(),j=function(){function e(e){this.container=e}return e.prototype.getPlatformInfoString=function(){var e=this.container.getProviders();return e.map((function(e){if(O(e)){var n=e.getImmediate();return n.library+"/"+n.version}return null})).filter((function(e){return e})).join(" ")},e}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O(e){var n=e.getComponent();return"VERSION"===(null===n||void 0===n?void 0:n.type)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e,n){e.INTERNAL.registerComponent(new s.Component("platform-logger",(function(e){return new j(e)}),"PRIVATE")),e.registerVersion(u,f,n),e.registerVersion("fire-js","")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */if(o.isBrowser()&&void 0!==self.firebase){A.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var R=self.firebase.SDK_VERSION;R&&R.indexOf("LITE")>=0&&A.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var x=k.initializeApp;k.initializeApp=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return o.isNode()&&A.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '),x.apply(void 0,e)};var T=k;S(T),n.default=T,n.firebase=T}}]);
//# sourceMappingURL=app~7ffa8a2f.36bedc0b.js.map