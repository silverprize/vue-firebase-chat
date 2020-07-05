(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app~1fb195ae"],{"4be4":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("9ab4"),i=n("cd51"),o=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}(),a="[DEFAULT]",s=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}return e.prototype.get=function(e){void 0===e&&(e=a);var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new i.Deferred;this.instancesDeferred.set(t,n);try{var r=this.getOrInitializeService(t);r&&n.resolve(r)}catch(o){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t=r.__assign({identifier:a,optional:!1},e),n=t.identifier,i=t.optional,o=this.normalizeInstanceIdentifier(n);try{var s=this.getOrInitializeService(o);if(!s){if(i)return null;throw Error("Service "+this.name+" is not available")}return s}catch(u){if(i)return null;throw u}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,c(e))try{this.getOrInitializeService(a)}catch(h){}try{for(var i=r.__values(this.instancesDeferred.entries()),o=i.next();!o.done;o=i.next()){var s=r.__read(o.value,2),u=s[0],l=s[1],f=this.normalizeInstanceIdentifier(u);try{var p=this.getOrInitializeService(f);l.resolve(p)}catch(h){}}}catch(d){t={error:d}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}},e.prototype.clearInstance=function(e){void 0===e&&(e=a),this.instancesDeferred.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return r.__awaiter(this,void 0,void 0,(function(){var e;return r.__generator(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.getOrInitializeService=function(e){var t=this.instances.get(e);return!t&&this.component&&(t=this.component.instanceFactory(this.container,u(e)),this.instances.set(e,t)),t||null},e.prototype.normalizeInstanceIdentifier=function(e){return this.component?this.component.multipleInstances?e:a:e},e}();function u(e){return e===a?void 0:e}function c(e){return"EAGER"===e.instantiationMode}
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
 */var l=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){var t=this.getProvider(e.name);t.isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new s(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}();t.Component=o,t.ComponentContainer=l,t.Provider=s},"7d28":function(e,t,n){"use strict";var r,i=n("c23d"),o=n.n(i),a=n("4be4"),s=n("9ab4"),u=n("cd51"),c=n("9dbb"),l="@firebase/installations",f="0.4.13",p=1e4,h="w:"+f,d="FIS_v2",g="https://firebaseinstallations.googleapis.com/v1",v=36e5,_="installations",b="Installations",m=(r={},r["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',r["not-registered"]="Firebase Installation is not registered.",r["installation-not-found"]="Firebase Installation not found.",r["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',r["app-offline"]="Could not process request. Application offline.",r["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",r),w=new u["ErrorFactory"](_,b,m);function y(e){return e instanceof u["FirebaseError"]&&e.code.includes("request-failed")}
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
 */function O(e){var t=e.projectId;return g+"/projects/"+t+"/installations"}function j(e){return{token:e.token,requestStatus:2,expiresIn:C(e.expiresIn),creationTime:Date.now()}}function I(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r;return Object(s["__generator"])(this,(function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,w.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}}))}))}function S(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function E(e,t){var n=t.refreshToken,r=S(e);return r.append("Authorization",T(n)),r}function L(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t;return Object(s["__generator"])(this,(function(n){switch(n.label){case 0:return[4,e()];case 1:return t=n.sent(),t.status>=500&&t.status<600?[2,e()]:[2,t]}}))}))}function C(e){return Number(e.replace("s","000"))}function T(e){return d+" "+e}
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
 */function R(e,t){var n=t.fid;return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t,r,i,o,a,u,c;return Object(s["__generator"])(this,(function(s){switch(s.label){case 0:return t=O(e),r=S(e),i={fid:n,authVersion:d,appId:e.appId,sdkVersion:h},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,L((function(){return fetch(t,o)}))];case 1:return a=s.sent(),a.ok?[4,a.json()]:[3,3];case 2:return u=s.sent(),c={fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:j(u.authToken)},[2,c];case 3:return[4,I("Create Installation",a)];case 4:throw s.sent()}}))}))}
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
 */function N(e){return new Promise((function(t){setTimeout(t,e)}))}
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
 */function P(e){var t=btoa(String.fromCharCode.apply(String,Object(s["__spread"])(e)));return t.replace(/\+/g,"-").replace(/\//g,"_")}
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
 */var k=/^[cdef][\w-]{21}$/,H="";function D(){try{var e=new Uint8Array(17),t=self.crypto||self.msCrypto;t.getRandomValues(e),e[0]=112+e[0]%16;var n=A(e);return k.test(n)?n:H}catch(r){return H}}function A(e){var t=P(e);return t.substr(0,22)}
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
 */function q(e){return e.appName+"!"+e.appId}
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
 */var F=new Map;function B(e,t){var n=q(e);z(n,t),x(n,t)}function M(e,t){G();var n=q(e),r=F.get(n);r||(r=new Set,F.set(n,r)),r.add(t)}function V(e,t){var n=q(e),r=F.get(n);r&&(r.delete(t),0===r.size&&F.delete(n),W())}function z(e,t){var n,r,i=F.get(e);if(i)try{for(var o=Object(s["__values"])(i),a=o.next();!a.done;a=o.next()){var u=a.value;u(t)}}catch(c){n={error:c}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}}function x(e,t){var n=G();n&&n.postMessage({key:e,fid:t}),W()}var U=null;function G(){return!U&&"BroadcastChannel"in self&&(U=new BroadcastChannel("[Firebase] FID Change"),U.onmessage=function(e){z(e.data.key,e.data.fid)}),U}function W(){0===F.size&&U&&(U.close(),U=null)}
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
 */var $="firebase-installations-database",J=1,K="firebase-installations-store",Y=null;function Z(){return Y||(Y=Object(c["openDb"])($,J,(function(e){switch(e.oldVersion){case 0:e.createObjectStore(K)}}))),Y}function Q(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r,i,o,a;return Object(s["__generator"])(this,(function(s){switch(s.label){case 0:return n=q(e),[4,Z()];case 1:return r=s.sent(),i=r.transaction(K,"readwrite"),o=i.objectStore(K),[4,o.get(n)];case 2:return a=s.sent(),[4,o.put(t,n)];case 3:return s.sent(),[4,i.complete];case 4:return s.sent(),a&&a.fid===t.fid||B(e,t.fid),[2,t]}}))}))}function X(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t,n,r;return Object(s["__generator"])(this,(function(i){switch(i.label){case 0:return t=q(e),[4,Z()];case 1:return n=i.sent(),r=n.transaction(K,"readwrite"),[4,r.objectStore(K).delete(t)];case 2:return i.sent(),[4,r.complete];case 3:return i.sent(),[2]}}))}))}function ee(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r,i,o,a,u;return Object(s["__generator"])(this,(function(s){switch(s.label){case 0:return n=q(e),[4,Z()];case 1:return r=s.sent(),i=r.transaction(K,"readwrite"),o=i.objectStore(K),[4,o.get(n)];case 2:return a=s.sent(),u=t(a),void 0!==u?[3,4]:[4,o.delete(n)];case 3:return s.sent(),[3,6];case 4:return[4,o.put(u,n)];case 5:s.sent(),s.label=6;case 6:return[4,i.complete];case 7:return s.sent(),!u||a&&a.fid===u.fid||B(e,u.fid),[2,u]}}))}))}
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
 */function te(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t,n,r;return Object(s["__generator"])(this,(function(i){switch(i.label){case 0:return[4,ee(e,(function(n){var r=ne(n),i=re(e,r);return t=i.registrationPromise,i.installationEntry}))];case 1:return n=i.sent(),n.fid!==H?[3,3]:(r={},[4,t]);case 2:return[2,(r.installationEntry=i.sent(),r)];case 3:return[2,{installationEntry:n,registrationPromise:t}]}}))}))}function ne(e){var t=e||{fid:D(),registrationStatus:0};return se(t)}function re(e,t){if(0===t.registrationStatus){if(!navigator.onLine){var n=Promise.reject(w.create("app-offline"));return{installationEntry:t,registrationPromise:n}}var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=ie(e,r);return{installationEntry:r,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:oe(e)}:{installationEntry:t}}function ie(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r;return Object(s["__generator"])(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,7]),[4,R(e,t)];case 1:return n=i.sent(),[2,Q(e,n)];case 2:return r=i.sent(),y(r)&&409===r.serverCode?[4,X(e)]:[3,4];case 3:return i.sent(),[3,6];case 4:return[4,Q(e,{fid:t.fid,registrationStatus:0})];case 5:i.sent(),i.label=6;case 6:throw r;case 7:return[2]}}))}))}function oe(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t,n,r,i;return Object(s["__generator"])(this,(function(o){switch(o.label){case 0:return[4,ae(e)];case 1:t=o.sent(),o.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,N(100)];case 3:return o.sent(),[4,ae(e)];case 4:return t=o.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,te(e)];case 6:return n=o.sent(),r=n.installationEntry,i=n.registrationPromise,i?[2,i]:[2,r];case 7:return[2,t]}}))}))}function ae(e){return ee(e,(function(e){if(!e)throw w.create("installation-not-found");return se(e)}))}function se(e){return ue(e)?{fid:e.fid,registrationStatus:0}:e}function ue(e){return 1===e.registrationStatus&&e.registrationTime+p<Date.now()}
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
 */function ce(e,t){var n=e.appConfig,r=e.platformLoggerProvider;return Object(s["__awaiter"])(this,void 0,void 0,(function(){var e,i,o,a,u,c,l,f;return Object(s["__generator"])(this,(function(s){switch(s.label){case 0:return e=le(n,t),i=E(n,t),o=r.getImmediate({optional:!0}),o&&i.append("x-firebase-client",o.getPlatformInfoString()),a={installation:{sdkVersion:h}},u={method:"POST",headers:i,body:JSON.stringify(a)},[4,L((function(){return fetch(e,u)}))];case 1:return c=s.sent(),c.ok?[4,c.json()]:[3,3];case 2:return l=s.sent(),f=j(l),[2,f];case 3:return[4,I("Generate Auth Token",c)];case 4:throw s.sent()}}))}))}function le(e,t){var n=t.fid;return O(e)+"/"+n+"/authTokens:generate"}
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
 */function fe(e,t){return void 0===t&&(t=!1),Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r,i,o;return Object(s["__generator"])(this,(function(a){switch(a.label){case 0:return[4,ee(e.appConfig,(function(r){if(!ge(r))throw w.create("not-registered");var i=r.authToken;if(!t&&ve(i))return r;if(1===i.requestStatus)return n=pe(e,t),r;if(!navigator.onLine)throw w.create("app-offline");var o=be(r);return n=de(e,o),o}))];case 1:return r=a.sent(),n?[4,n]:[3,3];case 2:return o=a.sent(),[3,4];case 3:o=r.authToken,a.label=4;case 4:return i=o,[2,i]}}))}))}function pe(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r;return Object(s["__generator"])(this,(function(i){switch(i.label){case 0:return[4,he(e.appConfig)];case 1:n=i.sent(),i.label=2;case 2:return 1!==n.authToken.requestStatus?[3,5]:[4,N(100)];case 3:return i.sent(),[4,he(e.appConfig)];case 4:return n=i.sent(),[3,2];case 5:return r=n.authToken,0===r.requestStatus?[2,fe(e,t)]:[2,r]}}))}))}function he(e){return ee(e,(function(e){if(!ge(e))throw w.create("not-registered");var t=e.authToken;return me(t)?Object(s["__assign"])(Object(s["__assign"])({},e),{authToken:{requestStatus:0}}):e}))}function de(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r,i;return Object(s["__generator"])(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,ce(e,t)];case 1:return n=o.sent(),i=Object(s["__assign"])(Object(s["__assign"])({},t),{authToken:n}),[4,Q(e.appConfig,i)];case 2:return o.sent(),[2,n];case 3:return r=o.sent(),!y(r)||401!==r.serverCode&&404!==r.serverCode?[3,5]:[4,X(e.appConfig)];case 4:return o.sent(),[3,7];case 5:return i=Object(s["__assign"])(Object(s["__assign"])({},t),{authToken:{requestStatus:0}}),[4,Q(e.appConfig,i)];case 6:o.sent(),o.label=7;case 7:throw r;case 8:return[2]}}))}))}function ge(e){return void 0!==e&&2===e.registrationStatus}function ve(e){return 2===e.requestStatus&&!_e(e)}function _e(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+v}function be(e){var t={requestStatus:1,requestTime:Date.now()};return Object(s["__assign"])(Object(s["__assign"])({},e),{authToken:t})}function me(e){return 1===e.requestStatus&&e.requestTime+p<Date.now()}
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
 */function we(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t,n,r;return Object(s["__generator"])(this,(function(i){switch(i.label){case 0:return[4,te(e.appConfig)];case 1:return t=i.sent(),n=t.installationEntry,r=t.registrationPromise,r?r.catch(console.error):fe(e).catch(console.error),[2,n.fid]}}))}))}
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
 */function ye(e,t){return void 0===t&&(t=!1),Object(s["__awaiter"])(this,void 0,void 0,(function(){var n;return Object(s["__generator"])(this,(function(r){switch(r.label){case 0:return[4,Oe(e.appConfig)];case 1:return r.sent(),[4,fe(e,t)];case 2:return n=r.sent(),[2,n.token]}}))}))}function Oe(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t;return Object(s["__generator"])(this,(function(n){switch(n.label){case 0:return[4,te(e)];case 1:return t=n.sent().registrationPromise,t?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}
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
 */function je(e,t){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var n,r,i,o;return Object(s["__generator"])(this,(function(a){switch(a.label){case 0:return n=Ie(e,t),r=E(e,t),i={method:"DELETE",headers:r},[4,L((function(){return fetch(n,i)}))];case 1:return o=a.sent(),o.ok?[3,3]:[4,I("Delete Installation",o)];case 2:throw a.sent();case 3:return[2]}}))}))}function Ie(e,t){var n=t.fid;return O(e)+"/"+n}
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
 */function Se(e){return Object(s["__awaiter"])(this,void 0,void 0,(function(){var t,n;return Object(s["__generator"])(this,(function(r){switch(r.label){case 0:return t=e.appConfig,[4,ee(t,(function(e){if(!e||0!==e.registrationStatus)return e}))];case 1:if(n=r.sent(),!n)return[3,6];if(1!==n.registrationStatus)return[3,2];throw w.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw w.create("app-offline");case 3:return[4,je(t,n)];case 4:return r.sent(),[4,X(t)];case 5:r.sent(),r.label=6;case 6:return[2]}}))}))}
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
 */function Ee(e,t){var n=e.appConfig;return M(n,t),function(){V(n,t)}}
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
 */function Le(e){var t,n;if(!e||!e.options)throw Ce("App Configuration");if(!e.name)throw Ce("App Name");var r=["projectId","apiKey","appId"];try{for(var i=Object(s["__values"])(r),o=i.next();!o.done;o=i.next()){var a=o.value;if(!e.options[a])throw Ce(a)}}catch(u){t={error:u}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Ce(e){return w.create("missing-app-config-values",{valueName:e})}
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
 */function Te(e){var t="installations";e.INTERNAL.registerComponent(new a["Component"](t,(function(e){var t=e.getProvider("app").getImmediate(),n=Le(t),r=e.getProvider("platform-logger"),i={appConfig:n,platformLoggerProvider:r},o={app:t,getId:function(){return we(i)},getToken:function(e){return ye(i,e)},delete:function(){return Se(i)},onIdChange:function(e){return Ee(i,e)}};return o}),"PUBLIC")),e.registerVersion(l,f)}Te(o.a)},abfd:function(e,t,n){"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function r(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),i=0;for(t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r}
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
 */var i;n.r(t),n.d(t,"LogLevel",(function(){return o})),n.d(t,"Logger",(function(){return f})),n.d(t,"setLogLevel",(function(){return p})),n.d(t,"setUserLogHandler",(function(){return h}));var o,a=[];(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(o||(o={}));var s={debug:o.DEBUG,verbose:o.VERBOSE,info:o.INFO,warn:o.WARN,error:o.ERROR,silent:o.SILENT},u=o.INFO,c=(i={},i[o.DEBUG]="log",i[o.VERBOSE]="log",i[o.INFO]="info",i[o.WARN]="warn",i[o.ERROR]="error",i),l=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(t<e.logLevel)){(new Date).toISOString();var i=c[t];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")")}},f=function(){function e(e){this.name=e,this._logLevel=u,this._logHandler=l,this._userLogHandler=null,a.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in o))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!0,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"===typeof e?s[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!0,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.DEBUG],e)),this._logHandler.apply(this,r([this,o.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.VERBOSE],e)),this._logHandler.apply(this,r([this,o.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.INFO],e)),this._logHandler.apply(this,r([this,o.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.WARN],e)),this._logHandler.apply(this,r([this,o.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,o.ERROR],e)),this._logHandler.apply(this,r([this,o.ERROR],e))},e}();function p(e){a.forEach((function(t){t.setLogLevel(e)}))}function h(e,t){for(var n=function(n){var r=null;t&&t.level&&(r=s[t.level]),n.userLogHandler=null===e?null:function(t,n){for(var i=[],a=2;a<arguments.length;a++)i[a-2]=arguments[a];var s=i.map((function(e){if(null==e)return null;if("string"===typeof e)return e;if("number"===typeof e||"boolean"===typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(t){return null}})).filter((function(e){return e})).join(" ");n>=(null!==r&&void 0!==r?r:t.logLevel)&&e({level:o[n].toLowerCase(),message:s,args:i,type:t.name})}},r=0,i=a;r<i.length;r++){var u=i[r];n(u)}}}}]);
//# sourceMappingURL=app~1fb195ae.81e0cae2.js.map