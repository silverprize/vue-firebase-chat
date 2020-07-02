(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app~8a6c828a"],{2638:function(t,e,r){"use strict";function n(){return n=Object.assign||function(t){for(var e,r=1;r<arguments.length;r++)for(var n in e=arguments[r],e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},n.apply(this,arguments)}var o=["attrs","props","domProps"],i=["class","style","directives"],a=["on","nativeOn"],s=function(t){return t.reduce((function(t,e){for(var r in e)if(t[r])if(-1!==o.indexOf(r))t[r]=n({},t[r],e[r]);else if(-1!==i.indexOf(r)){var s=t[r]instanceof Array?t[r]:[t[r]],c=e[r]instanceof Array?e[r]:[e[r]];t[r]=s.concat(c)}else if(-1!==a.indexOf(r))for(var h in e[r])if(t[r][h]){var l=t[r][h]instanceof Array?t[r][h]:[t[r][h]],p=e[r][h]instanceof Array?e[r][h]:[e[r][h]];t[r][h]=l.concat(p)}else t[r][h]=e[r][h];else if("hook"==r)for(var f in e[r])t[r][f]=t[r][f]?u(t[r][f],e[r][f]):e[r][f];else t[r]=e[r];else t[r]=e[r];return t}),{})},u=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=s},"2e66":function(t,e,r){"use strict";var n=r("c23d"),o=r.n(n),i=r("9ab4"),a=r("4be4"),s="firebasestorage.googleapis.com",u="storageBucket",c=12e4,h=6e5,l=-9007199254740991,p=function(){function t(t,e){this.code_=d(t),this.message_="Firebase Storage: "+e,this.serverResponse_=null,this.name_="FirebaseError"}return t.prototype.codeProp=function(){return this.code},t.prototype.codeEquals=function(t){return d(t)===this.codeProp()},t.prototype.serverResponseProp=function(){return this.serverResponse_},t.prototype.setServerResponseProp=function(t){this.serverResponse_=t},Object.defineProperty(t.prototype,"name",{get:function(){return this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"code",{get:function(){return this.code_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"message",{get:function(){return this.message_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.serverResponse_},enumerable:!0,configurable:!0}),t}(),f={UNKNOWN:"unknown",OBJECT_NOT_FOUND:"object-not-found",BUCKET_NOT_FOUND:"bucket-not-found",PROJECT_NOT_FOUND:"project-not-found",QUOTA_EXCEEDED:"quota-exceeded",UNAUTHENTICATED:"unauthenticated",UNAUTHORIZED:"unauthorized",RETRY_LIMIT_EXCEEDED:"retry-limit-exceeded",INVALID_CHECKSUM:"invalid-checksum",CANCELED:"canceled",INVALID_EVENT_NAME:"invalid-event-name",INVALID_URL:"invalid-url",INVALID_DEFAULT_BUCKET:"invalid-default-bucket",NO_DEFAULT_BUCKET:"no-default-bucket",CANNOT_SLICE_BLOB:"cannot-slice-blob",SERVER_FILE_WRONG_SIZE:"server-file-wrong-size",NO_DOWNLOAD_URL:"no-download-url",INVALID_ARGUMENT:"invalid-argument",INVALID_ARGUMENT_COUNT:"invalid-argument-count",APP_DELETED:"app-deleted",INVALID_ROOT_OPERATION:"invalid-root-operation",INVALID_FORMAT:"invalid-format",INTERNAL_ERROR:"internal-error"};function d(t){return"storage/"+t}function _(){var t="An unknown error occurred, please check the error payload for server response.";return new p(f.UNKNOWN,t)}function v(t){return new p(f.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function b(t){return new p(f.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function y(){var t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new p(f.UNAUTHENTICATED,t)}function g(t){return new p(f.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function m(){return new p(f.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function E(){return new p(f.CANCELED,"User canceled the upload/download.")}function w(t){return new p(f.INVALID_URL,"Invalid URL '"+t+"'.")}function R(t){return new p(f.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function A(){return new p(f.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function O(){return new p(f.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function T(){return new p(f.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function S(t,e,r){return new p(f.INVALID_ARGUMENT,"Invalid argument in `"+e+"` at index "+t+": "+r)}function C(t,e,r,n){var o,i;return t===e?(o=t,i=1===t?"argument":"arguments"):(o="between "+t+" and "+e,i="arguments"),new p(f.INVALID_ARGUMENT_COUNT,"Invalid argument count in `"+r+"`: Expected "+o+" "+i+", received "+n+".")}function N(){return new p(f.APP_DELETED,"The Firebase app was deleted.")}function k(t){return new p(f.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function U(t,e){return new p(f.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function x(t){throw new p(f.INTERNAL_ERROR,"Internal error: "+t)}
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
 */var P={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};function I(t){switch(t){case P.RAW:case P.BASE64:case P.BASE64URL:case P.DATA_URL:return;default:throw"Expected one of the event types: ["+P.RAW+", "+P.BASE64+", "+P.BASE64URL+", "+P.DATA_URL+"]."}}var D=function(){function t(t,e){this.data=t,this.contentType=e||null}return t}();function L(t,e){switch(t){case P.RAW:return new D(M(e));case P.BASE64:case P.BASE64URL:return new D(B(t,e));case P.DATA_URL:return new D(G(e),F(e))}throw _()}function M(t){for(var e=[],r=0;r<t.length;r++){var n=t.charCodeAt(r);if(n<=127)e.push(n);else if(n<=2047)e.push(192|n>>6,128|63&n);else if(55296===(64512&n)){var o=r<t.length-1&&56320===(64512&t.charCodeAt(r+1));if(o){var i=n,a=t.charCodeAt(++r);n=65536|(1023&i)<<10|1023&a,e.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)}else e.push(239,191,189)}else 56320===(64512&n)?e.push(239,191,189):e.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(e)}function j(t){var e;try{e=decodeURIComponent(t)}catch(r){throw U(P.DATA_URL,"Malformed data URL.")}return M(e)}function B(t,e){switch(t){case P.BASE64:var r=-1!==e.indexOf("-"),n=-1!==e.indexOf("_");if(r||n){var o=r?"-":"_";throw U(t,"Invalid character '"+o+"' found: is it base64url encoded?")}break;case P.BASE64URL:var i=-1!==e.indexOf("+"),a=-1!==e.indexOf("/");if(i||a){o=i?"+":"/";throw U(t,"Invalid character '"+o+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}var s;try{s=atob(e)}catch(h){throw U(t,"Invalid character found")}for(var u=new Uint8Array(s.length),c=0;c<s.length;c++)u[c]=s.charCodeAt(c);return u}var W=function(){function t(t){this.base64=!1,this.contentType=null;var e=t.match(/^data:([^,]+)?,/);if(null===e)throw U(P.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=e[1]||null;null!=r&&(this.base64=q(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=t.substring(t.indexOf(",")+1)}return t}();function G(t){var e=new W(t);return e.base64?B(P.BASE64,e.rest):j(e.rest)}function F(t){var e=new W(t);return e.contentType}function q(t,e){var r=t.length>=e.length;return!!r&&t.substring(t.length-e.length)===e}
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
 */var z,H={STATE_CHANGED:"state_changed"},V={RUNNING:"running",PAUSING:"pausing",PAUSED:"paused",SUCCESS:"success",CANCELING:"canceling",CANCELED:"canceled",ERROR:"error"},X={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function K(t){switch(t){case V.RUNNING:case V.PAUSING:case V.CANCELING:return X.RUNNING;case V.PAUSED:return X.PAUSED;case V.SUCCESS:return X.SUCCESS;case V.CANCELED:return X.CANCELED;case V.ERROR:return X.ERROR;default:return X.ERROR}}
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
 */function J(t){return null!=t}function Z(t){return void 0!==t}function $(t){return"function"===typeof t}function Q(t){return"object"===typeof t}function Y(t){return Q(t)&&null!==t}function tt(t){return Q(t)&&!Array.isArray(t)}function et(t){return"string"===typeof t||t instanceof String}function rt(t){return nt(t)&&Number.isInteger(t)}function nt(t){return"number"===typeof t||t instanceof Number}function ot(t){return it()&&t instanceof Blob}function it(){return"undefined"!==typeof Blob}
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
 */(function(t){t[t["NO_ERROR"]=0]="NO_ERROR",t[t["NETWORK_ERROR"]=1]="NETWORK_ERROR",t[t["ABORT"]=2]="ABORT"})(z||(z={}));
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
 */
var at=function(){function t(){var t=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=z.NO_ERROR,this.sendPromise_=new Promise((function(e){t.xhr_.addEventListener("abort",(function(){t.errorCode_=z.ABORT,e(t)})),t.xhr_.addEventListener("error",(function(){t.errorCode_=z.NETWORK_ERROR,e(t)})),t.xhr_.addEventListener("load",(function(){e(t)}))}))}return t.prototype.send=function(t,e,r,n){if(this.sent_)throw x("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),J(n))for(var o in n)n.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,n[o].toString());return J(r)?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},t.prototype.getErrorCode=function(){if(!this.sent_)throw x("cannot .getErrorCode() before sending");return this.errorCode_},t.prototype.getStatus=function(){if(!this.sent_)throw x("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}},t.prototype.getResponseText=function(){if(!this.sent_)throw x("cannot .getResponseText() before sending");return this.xhr_.responseText},t.prototype.abort=function(){this.xhr_.abort()},t.prototype.getResponseHeader=function(t){return this.xhr_.getResponseHeader(t)},t.prototype.addUploadProgressListener=function(t){J(this.xhr_.upload)&&this.xhr_.upload.addEventListener("progress",t)},t.prototype.removeUploadProgressListener=function(t){J(this.xhr_.upload)&&this.xhr_.upload.removeEventListener("progress",t)},t}(),st=function(){function t(){}return t.prototype.createXhrIo=function(){return new at},t}();
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
 */
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
 */
function ut(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function ct(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=ut();if(void 0!==r){for(var n=new r,o=0;o<t.length;o++)n.append(t[o]);return n.getBlob()}if(it())return new Blob(t);throw Error("This browser doesn't seem to support creating Blobs")}function ht(t,e,r){return t.webkitSlice?t.webkitSlice(e,r):t.mozSlice?t.mozSlice(e,r):t.slice?t.slice(e,r):null}
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
 */var lt=function(){function t(t,e){var r=0,n="";ot(t)?(this.data_=t,r=t.size,n=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=n}return t.prototype.size=function(){return this.size_},t.prototype.type=function(){return this.type_},t.prototype.slice=function(e,r){if(ot(this.data_)){var n=this.data_,o=ht(n,e,r);return null===o?null:new t(o)}var i=new Uint8Array(this.data_.buffer,e,r-e);return new t(i,!0)},t.getBlob=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(it()){var n=e.map((function(e){return e instanceof t?e.data_:e}));return new t(ct.apply(null,n))}var o=e.map((function(t){return et(t)?L(P.RAW,t).data:t.data_})),i=0;o.forEach((function(t){i+=t.byteLength}));var a=new Uint8Array(i),s=0;return o.forEach((function(t){for(var e=0;e<t.length;e++)a[s++]=t[e]})),new t(a,!0)},t.prototype.uploadData=function(){return this.data_},t}(),pt=function(){function t(t,e){this.bucket=t,this.path_=e}return Object.defineProperty(t.prototype,"path",{get:function(){return this.path_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!0,configurable:!0}),t.prototype.fullServerUrl=function(){var t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)},t.prototype.bucketOnlyServerUrl=function(){var t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o"},t.makeFromBucketSpec=function(e){var r;try{r=t.makeFromUrl(e)}catch(n){return new t(e,"")}if(""===r.path)return r;throw R(e)},t.makeFromUrl=function(e){var r=null,n="([A-Za-z0-9.\\-_]+)";function o(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}var i="(/(.*))?$",a=new RegExp("^gs://"+n+i,"i"),u={bucket:1,path:3};function c(t){t.path_=decodeURIComponent(t.path)}for(var h="v[A-Za-z0-9_]+",l=s.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",f=new RegExp("^https?://"+l+"/"+h+"/b/"+n+"/o"+p,"i"),d={bucket:1,path:3},_="(?:storage.googleapis.com|storage.cloud.google.com)",v="([^?#]*)",b=new RegExp("^https?://"+_+"/"+n+"/"+v,"i"),y={bucket:1,path:2},g=[{regex:a,indices:u,postModify:o},{regex:f,indices:d,postModify:c},{regex:b,indices:y,postModify:c}],m=0;m<g.length;m++){var E=g[m],R=E.regex.exec(e);if(R){var A=R[E.indices.bucket],O=R[E.indices.path];O||(O=""),r=new t(A,O),E.postModify(r);break}}if(null==r)throw w(e);return r},t}();
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
 */
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
 */
function ft(t){var e;try{e=JSON.parse(t)}catch(r){return null}return tt(e)?e:null}
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
 */function dt(t){if(0===t.length)return null;var e=t.lastIndexOf("/");if(-1===e)return"";var r=t.slice(0,e);return r}function _t(t,e){var r=e.split("/").filter((function(t){return t.length>0})).join("/");return 0===t.length?r:t+"/"+r}function vt(t){var e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}
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
 */function bt(t){return"https://"+s+"/v0"+t}function yt(t){var e=encodeURIComponent,r="?";for(var n in t)if(t.hasOwnProperty(n)){var o=e(n)+"="+e(t[n]);r=r+o+"&"}return r=r.slice(0,-1),r}
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
 */function gt(t,e){return e}var mt=function(){function t(t,e,r,n){this.server=t,this.local=e||t,this.writable=!!r,this.xform=n||gt}return t}(),Et=null;function wt(t){return!et(t)||t.length<2?t:vt(t)}function Rt(){if(Et)return Et;var t=[];function e(t,e){return wt(e)}t.push(new mt("bucket")),t.push(new mt("generation")),t.push(new mt("metageneration")),t.push(new mt("name","fullPath",!0));var r=new mt("name");function n(t,e){return J(e)?Number(e):e}r.xform=e,t.push(r);var o=new mt("size");return o.xform=n,t.push(o),t.push(new mt("timeCreated")),t.push(new mt("updated")),t.push(new mt("md5Hash",null,!0)),t.push(new mt("cacheControl",null,!0)),t.push(new mt("contentDisposition",null,!0)),t.push(new mt("contentEncoding",null,!0)),t.push(new mt("contentLanguage",null,!0)),t.push(new mt("contentType",null,!0)),t.push(new mt("metadata","customMetadata",!0)),Et=t,Et}function At(t,e){function r(){var r=t["bucket"],n=t["fullPath"],o=new pt(r,n);return e.makeStorageReference(o)}Object.defineProperty(t,"ref",{get:r})}function Ot(t,e,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var a=r[i];n[a.local]=a.xform(n,e[a.server])}return At(n,t),n}function Tt(t,e,r){var n=ft(e);if(null===n)return null;var o=n;return Ot(t,o,r)}function St(t,e){var r=ft(e);if(null===r)return null;if(!et(r["downloadTokens"]))return null;var n=r["downloadTokens"];if(0===n.length)return null;var o=encodeURIComponent,i=n.split(","),a=i.map((function(e){var r=t["bucket"],n=t["fullPath"],i="/b/"+o(r)+"/o/"+o(n),a=bt(i),s=yt({alt:"media",token:e});return a+s}));return a[0]}function Ct(t,e){for(var r={},n=e.length,o=0;o<n;o++){var i=e[o];i.writable&&(r[i.server]=t[i.local])}return JSON.stringify(r)}function Nt(t){if(!Q(t)||!t)throw"Expected Metadata object.";for(var e in t)if(t.hasOwnProperty(e)){var r=t[e];if("customMetadata"===e){if(!Q(r))throw"Expected object for 'customMetadata' mapping."}else if(Y(r))throw"Mapping for '"+e+"' cannot be an object."}}
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
 */var kt="maxResults",Ut=1e3,xt="pageToken",Pt="prefixes",It="items";function Dt(t,e,r){var n={prefixes:[],items:[],nextPageToken:r["nextPageToken"]};if(r[Pt])for(var o=0,i=r[Pt];o<i.length;o++){var a=i[o],s=a.replace(/\/$/,""),u=t.makeStorageReference(new pt(e,s));n.prefixes.push(u)}if(r[It])for(var c=0,h=r[It];c<h.length;c++){var l=h[c];u=t.makeStorageReference(new pt(e,l["name"]));n.items.push(u)}return n}function Lt(t,e,r){var n=ft(r);if(null===n)return null;var o=n;return Dt(t,e,o)}function Mt(t){if(!Q(t)||!t)throw"Expected ListOptions object.";for(var e in t)if(e===kt){if(!rt(t[kt])||t[kt]<=0)throw"Expected maxResults to be a positive number.";if(t[kt]>1e3)throw"Expected maxResults to be less than or equal to "+Ut+"."}else{if(e!==xt)throw"Unknown option: "+e;if(t[xt]&&!et(t[xt]))throw"Expected pageToken to be string."}}var jt=function(){function t(t,e,r,n){this.url=t,this.method=e,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}return t}();
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
 */function Bt(t){if(!t)throw _()}function Wt(t,e){function r(r,n){var o=Tt(t,n,e);return Bt(null!==o),o}return r}function Gt(t,e){function r(r,n){var o=Lt(t,e,n);return Bt(null!==o),o}return r}function Ft(t,e){function r(r,n){var o=Tt(t,n,e);return Bt(null!==o),St(o,n)}return r}function qt(t){function e(e,r){var n;return n=401===e.getStatus()?y():402===e.getStatus()?b(t.bucket):403===e.getStatus()?g(t.path):r,n.setServerResponseProp(r.serverResponseProp()),n}return e}function zt(t){var e=qt(t);function r(r,n){var o=e(r,n);return 404===r.getStatus()&&(o=v(t.path)),o.setServerResponseProp(n.serverResponseProp()),o}return r}function Ht(t,e,r){var n=e.fullServerUrl(),o=bt(n),i="GET",a=t.maxOperationRetryTime(),s=new jt(o,i,Wt(t,r),a);return s.errorHandler=zt(e),s}function Vt(t,e,r,n,o){var i={};e.isRoot?i["prefix"]="":i["prefix"]=e.path+"/",r&&r.length>0&&(i["delimiter"]=r),n&&(i["pageToken"]=n),o&&(i["maxResults"]=o);var a=e.bucketOnlyServerUrl(),s=bt(a),u="GET",c=t.maxOperationRetryTime(),h=new jt(s,u,Gt(t,e.bucket),c);return h.urlParams=i,h.errorHandler=qt(e),h}function Xt(t,e,r){var n=e.fullServerUrl(),o=bt(n),i="GET",a=t.maxOperationRetryTime(),s=new jt(o,i,Ft(t,r),a);return s.errorHandler=zt(e),s}function Kt(t,e,r,n){var o=e.fullServerUrl(),i=bt(o),a="PATCH",s=Ct(r,n),u={"Content-Type":"application/json; charset=utf-8"},c=t.maxOperationRetryTime(),h=new jt(i,a,Wt(t,n),c);return h.headers=u,h.body=s,h.errorHandler=zt(e),h}function Jt(t,e){var r=e.fullServerUrl(),n=bt(r),o="DELETE",i=t.maxOperationRetryTime();function a(t,e){}var s=new jt(n,o,a,i);return s.successCodes=[200,204],s.errorHandler=zt(e),s}function Zt(t,e){return t&&t["contentType"]||e&&e.type()||"application/octet-stream"}function $t(t,e,r){var n=Object.assign({},r);return n["fullPath"]=t.path,n["size"]=e.size(),n["contentType"]||(n["contentType"]=Zt(null,e)),n}function Qt(t,e,r,n,o){var i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function s(){for(var t="",e=0;e<2;e++)t+=Math.random().toString().slice(2);return t}var u=s();a["Content-Type"]="multipart/related; boundary="+u;var c=$t(e,n,o),h=Ct(c,r),l="--"+u+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+h+"\r\n--"+u+"\r\nContent-Type: "+c["contentType"]+"\r\n\r\n",p="\r\n--"+u+"--",f=lt.getBlob(l,n,p);if(null===f)throw A();var d={name:c["fullPath"]},_=bt(i),v="POST",b=t.maxUploadRetryTime(),y=new jt(_,v,Wt(t,r),b);return y.urlParams=d,y.headers=a,y.body=f.uploadData(),y.errorHandler=qt(e),y}var Yt=function(){function t(t,e,r,n){this.current=t,this.total=e,this.finalized=!!r,this.metadata=n||null}return t}();function te(t,e){var r=null;try{r=t.getResponseHeader("X-Goog-Upload-Status")}catch(o){Bt(!1)}var n=e||["active"];return Bt(!!r&&-1!==n.indexOf(r)),r}function ee(t,e,r,n,o){var i=e.bucketOnlyServerUrl(),a=$t(e,n,o),s={name:a["fullPath"]},u=bt(i),c="POST",h={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":a["contentType"],"Content-Type":"application/json; charset=utf-8"},l=Ct(a,r),p=t.maxUploadRetryTime();function f(t){var e;te(t);try{e=t.getResponseHeader("X-Goog-Upload-URL")}catch(r){Bt(!1)}return Bt(et(e)),e}var d=new jt(u,c,f,p);return d.urlParams=s,d.headers=h,d.body=l,d.errorHandler=qt(e),d}function re(t,e,r,n){var o={"X-Goog-Upload-Command":"query"};function i(t){var e=te(t,["active","final"]),r=null;try{r=t.getResponseHeader("X-Goog-Upload-Size-Received")}catch(i){Bt(!1)}r||Bt(!1);var o=Number(r);return Bt(!isNaN(o)),new Yt(o,n.size(),"final"===e)}var a="POST",s=t.maxUploadRetryTime(),u=new jt(r,a,i,s);return u.headers=o,u.errorHandler=qt(e),u}var ne=262144;function oe(t,e,r,n,o,i,a,s){var u=new Yt(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw O();var c=u.total-u.current,h=c;o>0&&(h=Math.min(h,o));var l=u.current,p=l+h,f=h===c?"upload, finalize":"upload",d={"X-Goog-Upload-Command":f,"X-Goog-Upload-Offset":u.current},_=n.slice(l,p);if(null===_)throw A();function v(t,r){var o,a=te(t,["active","final"]),s=u.current+h,c=n.size();return o="final"===a?Wt(e,i)(t,r):null,new Yt(s,c,"final"===a,o)}var b="POST",y=e.maxUploadRetryTime(),g=new jt(r,b,v,y);return g.headers=d,g.body=_.uploadData(),g.progressCallback=s||null,g.errorHandler=qt(t),g}
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
 */var ie=function(){function t(t,e,r){var n=$(t)||J(e)||J(r);if(n)this.next=t,this.error=e||null,this.complete=r||null;else{var o=t;this.next=o.next||null,this.error=o.error||null,this.complete=o.complete||null}}return t}(),ae=function(){function t(t,e,r,n,o,i){this.bytesTransferred=t,this.totalBytes=e,this.state=r,this.metadata=n,this.task=o,this.ref=i}return t}();
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
 */
function se(t,e,r){for(var n=e.length,o=e.length,i=0;i<e.length;i++)if(e[i].optional){n=i;break}var a=n<=r.length&&r.length<=o;if(!a)throw C(n,o,t,r.length);for(i=0;i<r.length;i++)try{e[i].validator(r[i])}catch(s){throw s instanceof Error?S(i,t,s.message):S(i,t,s)}}var ue=function(){function t(t,e){var r=this;this.validator=function(e){r.optional&&!Z(e)||t(e)},this.optional=!!e}return t}();function ce(t,e){return function(r){t(r),e(r)}}function he(t,e){function r(t){if(!et(t))throw"Expected string."}var n;return n=t?ce(r,t):r,new ue(n,e)}function le(){function t(t){var e=t instanceof Uint8Array||t instanceof ArrayBuffer||it()&&t instanceof Blob;if(!e)throw"Expected Blob or File."}return new ue(t)}function pe(t){return new ue(Nt,t)}function fe(t){return new ue(Mt,t)}function de(){function t(t){var e=nt(t)&&t>=0;if(!e)throw"Expected a number 0 or greater."}return new ue(t)}function _e(t,e){function r(e){var r=null===e||J(e)&&e instanceof Object;if(!r)throw"Expected an Object.";void 0!==t&&null!==t&&t(e)}return new ue(r,e)}function ve(t){function e(t){var e=null===t||$(t);if(!e)throw"Expected a Function."}return new ue(e,t)}
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
 */function be(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];Promise.resolve().then((function(){return t.apply(void 0,e)}))}}
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
 */var ye=function(){function t(t,e,r,n,o,i){var a=this;void 0===i&&(i=null),this.transferred_=0,this.needToFetchStatus_=!1,this.needToFetchMetadata_=!1,this.observers_=[],this.error_=null,this.uploadUrl_=null,this.request_=null,this.chunkMultiplier_=1,this.resolve_=null,this.reject_=null,this.ref_=t,this.authWrapper_=e,this.location_=r,this.blob_=o,this.metadata_=i,this.mappings_=n,this.resumable_=this.shouldDoResumable_(this.blob_),this.state_=V.RUNNING,this.errorHandler_=function(t){a.request_=null,a.chunkMultiplier_=1,t.codeEquals(f.CANCELED)?(a.needToFetchStatus_=!0,a.completeTransitions_()):(a.error_=t,a.transition_(V.ERROR))},this.metadataErrorHandler_=function(t){a.request_=null,t.codeEquals(f.CANCELED)?a.completeTransitions_():(a.error_=t,a.transition_(V.ERROR))},this.promise_=new Promise((function(t,e){a.resolve_=t,a.reject_=e,a.start_()})),this.promise_.then(null,(function(){}))}return t.prototype.makeProgressCallback_=function(){var t=this,e=this.transferred_;return function(r){return t.updateProgress_(e+r)}},t.prototype.shouldDoResumable_=function(t){return t.size()>262144},t.prototype.start_=function(){this.state_===V.RUNNING&&null===this.request_&&(this.resumable_?null===this.uploadUrl_?this.createResumable_():this.needToFetchStatus_?this.fetchStatus_():this.needToFetchMetadata_?this.fetchMetadata_():this.continueUpload_():this.oneShotUpload_())},t.prototype.resolveToken_=function(t){var e=this;this.authWrapper_.getAuthToken().then((function(r){switch(e.state_){case V.RUNNING:t(r);break;case V.CANCELING:e.transition_(V.CANCELED);break;case V.PAUSING:e.transition_(V.PAUSED);break}}))},t.prototype.createResumable_=function(){var t=this;this.resolveToken_((function(e){var r=ee(t.authWrapper_,t.location_,t.mappings_,t.blob_,t.metadata_),n=t.authWrapper_.makeRequest(r,e);t.request_=n,n.getPromise().then((function(e){t.request_=null,t.uploadUrl_=e,t.needToFetchStatus_=!1,t.completeTransitions_()}),t.errorHandler_)}))},t.prototype.fetchStatus_=function(){var t=this,e=this.uploadUrl_;this.resolveToken_((function(r){var n=re(t.authWrapper_,t.location_,e,t.blob_),o=t.authWrapper_.makeRequest(n,r);t.request_=o,o.getPromise().then((function(e){e=e,t.request_=null,t.updateProgress_(e.current),t.needToFetchStatus_=!1,e.finalized&&(t.needToFetchMetadata_=!0),t.completeTransitions_()}),t.errorHandler_)}))},t.prototype.continueUpload_=function(){var t=this,e=ne*this.chunkMultiplier_,r=new Yt(this.transferred_,this.blob_.size()),n=this.uploadUrl_;this.resolveToken_((function(o){var i;try{i=oe(t.location_,t.authWrapper_,n,t.blob_,e,t.mappings_,r,t.makeProgressCallback_())}catch(s){return t.error_=s,void t.transition_(V.ERROR)}var a=t.authWrapper_.makeRequest(i,o);t.request_=a,a.getPromise().then((function(e){t.increaseMultiplier_(),t.request_=null,t.updateProgress_(e.current),e.finalized?(t.metadata_=e.metadata,t.transition_(V.SUCCESS)):t.completeTransitions_()}),t.errorHandler_)}))},t.prototype.increaseMultiplier_=function(){var t=ne*this.chunkMultiplier_;t<33554432&&(this.chunkMultiplier_*=2)},t.prototype.fetchMetadata_=function(){var t=this;this.resolveToken_((function(e){var r=Ht(t.authWrapper_,t.location_,t.mappings_),n=t.authWrapper_.makeRequest(r,e);t.request_=n,n.getPromise().then((function(e){t.request_=null,t.metadata_=e,t.transition_(V.SUCCESS)}),t.metadataErrorHandler_)}))},t.prototype.oneShotUpload_=function(){var t=this;this.resolveToken_((function(e){var r=Qt(t.authWrapper_,t.location_,t.mappings_,t.blob_,t.metadata_),n=t.authWrapper_.makeRequest(r,e);t.request_=n,n.getPromise().then((function(e){t.request_=null,t.metadata_=e,t.updateProgress_(t.blob_.size()),t.transition_(V.SUCCESS)}),t.errorHandler_)}))},t.prototype.updateProgress_=function(t){var e=this.transferred_;this.transferred_=t,this.transferred_!==e&&this.notifyObservers_()},t.prototype.transition_=function(t){if(this.state_!==t)switch(t){case V.CANCELING:this.state_=t,null!==this.request_&&this.request_.cancel();break;case V.PAUSING:this.state_=t,null!==this.request_&&this.request_.cancel();break;case V.RUNNING:var e=this.state_===V.PAUSED;this.state_=t,e&&(this.notifyObservers_(),this.start_());break;case V.PAUSED:this.state_=t,this.notifyObservers_();break;case V.CANCELED:this.error_=E(),this.state_=t,this.notifyObservers_();break;case V.ERROR:this.state_=t,this.notifyObservers_();break;case V.SUCCESS:this.state_=t,this.notifyObservers_();break}},t.prototype.completeTransitions_=function(){switch(this.state_){case V.PAUSING:this.transition_(V.PAUSED);break;case V.CANCELING:this.transition_(V.CANCELED);break;case V.RUNNING:this.start_();break}},Object.defineProperty(t.prototype,"snapshot",{get:function(){var t=K(this.state_);return new ae(this.transferred_,this.blob_.size(),t,this.metadata_,this,this.ref_)},enumerable:!0,configurable:!0}),t.prototype.on=function(t,e,r,n){function o(){if(t!==H.STATE_CHANGED)throw"Expected one of the event types: ["+H.STATE_CHANGED+"]."}var i="Expected a function or an Object with one of `next`, `error`, `complete` properties.",a=ve(!0).validator,s=_e(null,!0).validator;function u(t){try{return void a(t)}catch(r){}try{s(t);var e=Z(t["next"])||Z(t["error"])||Z(t["complete"]);if(!e)throw"";return}catch(r){throw i}}var c=[he(o),_e(u,!0),ve(!0),ve(!0)];se("on",c,arguments);var h=this;function l(t){function e(e,r,o){null!==t&&se("on",t,arguments);var i=new ie(e,r,n);return h.addObserver_(i),function(){h.removeObserver_(i)}}return e}function p(t){if(null===t)throw i;u(t)}var f=[_e(p),ve(!0),ve(!0)],d=!(Z(e)||Z(r)||Z(n));return d?l(f):l(null)(e,r,n)},t.prototype.then=function(t,e){return this.promise_.then(t,e)},t.prototype.catch=function(t){return this.then(null,t)},t.prototype.addObserver_=function(t){this.observers_.push(t),this.notifyObserver_(t)},t.prototype.removeObserver_=function(t){var e=this.observers_.indexOf(t);-1!==e&&this.observers_.splice(e,1)},t.prototype.notifyObservers_=function(){var t=this;this.finishPromise_();var e=this.observers_.slice();e.forEach((function(e){t.notifyObserver_(e)}))},t.prototype.finishPromise_=function(){if(null!==this.resolve_){var t=!0;switch(K(this.state_)){case X.SUCCESS:be(this.resolve_.bind(null,this.snapshot))();break;case X.CANCELED:case X.ERROR:var e=this.reject_;be(e.bind(null,this.error_))();break;default:t=!1;break}t&&(this.resolve_=null,this.reject_=null)}},t.prototype.notifyObserver_=function(t){var e=K(this.state_);switch(e){case X.RUNNING:case X.PAUSED:t.next&&be(t.next.bind(t,this.snapshot))();break;case X.SUCCESS:t.complete&&be(t.complete.bind(t))();break;case X.CANCELED:case X.ERROR:t.error&&be(t.error.bind(t,this.error_))();break;default:t.error&&be(t.error.bind(t,this.error_))()}},t.prototype.resume=function(){se("resume",[],arguments);var t=this.state_===V.PAUSED||this.state_===V.PAUSING;return t&&this.transition_(V.RUNNING),t},t.prototype.pause=function(){se("pause",[],arguments);var t=this.state_===V.RUNNING;return t&&this.transition_(V.PAUSING),t},t.prototype.cancel=function(){se("cancel",[],arguments);var t=this.state_===V.RUNNING||this.state_===V.PAUSING;return t&&this.transition_(V.CANCELING),t},t}(),ge=function(){function t(t,e){this.authWrapper=t,this.location=e instanceof pt?e:pt.makeFromUrl(e)}return t.prototype.toString=function(){return se("toString",[],arguments),"gs://"+this.location.bucket+"/"+this.location.path},t.prototype.newRef=function(e,r){return new t(e,r)},t.prototype.mappings=function(){return Rt()},t.prototype.child=function(t){se("child",[he()],arguments);var e=_t(this.location.path,t),r=new pt(this.location.bucket,e);return this.newRef(this.authWrapper,r)},Object.defineProperty(t.prototype,"parent",{get:function(){var t=dt(this.location.path);if(null===t)return null;var e=new pt(this.location.bucket,t);return this.newRef(this.authWrapper,e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"root",{get:function(){var t=new pt(this.location.bucket,"");return this.newRef(this.authWrapper,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bucket",{get:function(){return this.location.bucket},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fullPath",{get:function(){return this.location.path},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return vt(this.location.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"storage",{get:function(){return this.authWrapper.service()},enumerable:!0,configurable:!0}),t.prototype.put=function(t,e){return void 0===e&&(e=null),se("put",[le(),pe(!0)],arguments),this.throwIfRoot_("put"),new ye(this,this.authWrapper,this.location,this.mappings(),new lt(t),e)},t.prototype.putString=function(t,e,r){void 0===e&&(e=P.RAW),se("putString",[he(),he(I,!0),pe(!0)],arguments),this.throwIfRoot_("putString");var n=L(e,t),o=Object.assign({},r);return!J(o["contentType"])&&J(n.contentType)&&(o["contentType"]=n.contentType),new ye(this,this.authWrapper,this.location,this.mappings(),new lt(n.data,!0),o)},t.prototype.delete=function(){var t=this;return se("delete",[],arguments),this.throwIfRoot_("delete"),this.authWrapper.getAuthToken().then((function(e){var r=Jt(t.authWrapper,t.location);return t.authWrapper.makeRequest(r,e).getPromise()}))},t.prototype.listAll=function(){se("listAll",[],arguments);var t={prefixes:[],items:[]};return this.listAllHelper(t).then((function(){return t}))},t.prototype.listAllHelper=function(t,e){return Object(i["__awaiter"])(this,void 0,void 0,(function(){var r,n,o,a;return Object(i["__generator"])(this,(function(i){switch(i.label){case 0:return r={pageToken:e},[4,this.list(r)];case 1:return n=i.sent(),(o=t.prefixes).push.apply(o,n.prefixes),(a=t.items).push.apply(a,n.items),null==n.nextPageToken?[3,3]:[4,this.listAllHelper(t,n.nextPageToken)];case 2:i.sent(),i.label=3;case 3:return[2]}}))}))},t.prototype.list=function(t){se("list",[fe(!0)],arguments);var e=this;return this.authWrapper.getAuthToken().then((function(r){var n=t||{},o=Vt(e.authWrapper,e.location,"/",n.pageToken,n.maxResults);return e.authWrapper.makeRequest(o,r).getPromise()}))},t.prototype.getMetadata=function(){var t=this;return se("getMetadata",[],arguments),this.throwIfRoot_("getMetadata"),this.authWrapper.getAuthToken().then((function(e){var r=Ht(t.authWrapper,t.location,t.mappings());return t.authWrapper.makeRequest(r,e).getPromise()}))},t.prototype.updateMetadata=function(t){var e=this;return se("updateMetadata",[pe()],arguments),this.throwIfRoot_("updateMetadata"),this.authWrapper.getAuthToken().then((function(r){var n=Kt(e.authWrapper,e.location,t,e.mappings());return e.authWrapper.makeRequest(n,r).getPromise()}))},t.prototype.getDownloadURL=function(){var t=this;return se("getDownloadURL",[],arguments),this.throwIfRoot_("getDownloadURL"),this.authWrapper.getAuthToken().then((function(e){var r=Xt(t.authWrapper,t.location,t.mappings());return t.authWrapper.makeRequest(r,e).getPromise().then((function(t){if(null===t)throw T();return t}))}))},t.prototype.throwIfRoot_=function(t){if(""===this.location.path)throw k(t)},t}(),me=function(){function t(t){this.promise_=Promise.reject(t)}return t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(t){},t}(),Ee=function(){function t(){this.map=new Map,this.id=l}return t.prototype.addRequest=function(t){var e=this,r=this.id;this.id++,this.map.set(r,t),t.getPromise().then((function(){return e.map.delete(r)}),(function(){return e.map.delete(r)}))},t.prototype.clear=function(){this.map.forEach((function(t){t&&t.cancel(!0)})),this.map.clear()},t}(),we=function(){function t(e,r,n,o,i,a){var s;if(this.bucket_=null,this.appId_=null,this.deleted_=!1,this.app_=e,null!==this.app_){var u=this.app_.options;J(u)&&(this.bucket_=t.extractBucket_(u),this.appId_=null!==(s=u.appId)&&void 0!==s?s:null)}this.authProvider_=r,this.storageRefMaker_=n,this.requestMaker_=o,this.pool_=a,this.service_=i,this.maxOperationRetryTime_=c,this.maxUploadRetryTime_=h,this.requestMap_=new Ee}return t.extractBucket_=function(t){var e=t[u]||null;if(null==e)return null;var r=pt.makeFromBucketSpec(e);return r.bucket},t.prototype.getAuthToken=function(){var t=this.authProvider_.getImmediate({optional:!0});return t?t.getToken().then((function(t){return null!==t?t.accessToken:null}),(function(){return null})):Promise.resolve(null)},t.prototype.bucket=function(){if(this.deleted_)throw N();return this.bucket_},t.prototype.service=function(){return this.service_},t.prototype.makeStorageReference=function(t){return this.storageRefMaker_(this,t)},t.prototype.makeRequest=function(t,e){if(this.deleted_)return new me(N());var r=this.requestMaker_(t,this.appId_,e,this.pool_);return this.requestMap_.addRequest(r),r},t.prototype.deleteApp=function(){this.deleted_=!0,this.app_=null,this.requestMap_.clear()},t.prototype.maxUploadRetryTime=function(){return this.maxUploadRetryTime_},t.prototype.setMaxUploadRetryTime=function(t){this.maxUploadRetryTime_=t},t.prototype.maxOperationRetryTime=function(){return this.maxOperationRetryTime_},t.prototype.setMaxOperationRetryTime=function(t){this.maxOperationRetryTime_=t},t}();
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
 */
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
 */
function Re(t,e,r){var n=1,o=null,a=!1,s=0;function u(){return 2===s}var c=!1;function h(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];c||(c=!0,e.apply(null,t))}function l(e){o=setTimeout((function(){o=null,t(p,u())}),e)}function p(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(!c)if(t)h.call.apply(h,Object(i["__spreadArrays"])([null,t],e));else{var o,p=u()||a;if(p)h.call.apply(h,Object(i["__spreadArrays"])([null,t],e));else n<64&&(n*=2),1===s?(s=2,o=0):o=1e3*(n+Math.random()),l(o)}}var f=!1;function d(t){f||(f=!0,c||(null!==o?(t||(s=2),clearTimeout(o),l(0)):t||(s=1)))}return l(0),setTimeout((function(){a=!0,d(!0)}),r),d}function Ae(t){t(!1)}
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
 */var Oe=function(){function t(t,e,r,n,o,i,a,s,u,c,h){var l=this;this.pendingXhr_=null,this.backoffId_=null,this.resolve_=null,this.reject_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=t,this.method_=e,this.headers_=r,this.body_=n,this.successCodes_=o.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=a,this.errorCallback_=s,this.progressCallback_=c,this.timeout_=u,this.pool_=h,this.promise_=new Promise((function(t,e){l.resolve_=t,l.reject_=e,l.start_()}))}return t.prototype.start_=function(){var t=this;function e(e,r){if(r)e(!1,new Te(!1,null,!0));else{var n=t.pool_.createXhrIo();t.pendingXhr_=n,null!==t.progressCallback_&&n.addUploadProgressListener(o),n.send(t.url_,t.method_,t.body_,t.headers_).then((function(r){null!==t.progressCallback_&&r.removeUploadProgressListener(o),t.pendingXhr_=null,r=r;var n=r.getErrorCode()===z.NO_ERROR,i=r.getStatus();if(n&&!t.isRetryStatusCode_(i)){var a=-1!==t.successCodes_.indexOf(i);e(!0,new Te(a,r))}else{var s=r.getErrorCode()===z.ABORT;e(!1,new Te(!1,null,s))}}))}function o(e){var r=e.loaded,n=e.lengthComputable?e.total:-1;null!==t.progressCallback_&&t.progressCallback_(r,n)}}function r(e,r){var n=t.resolve_,o=t.reject_,i=r.xhr;if(r.wasSuccessCode)try{var a=t.callback_(i,i.getResponseText());Z(a)?n(a):n()}catch(u){o(u)}else if(null!==i){var s=_();s.setServerResponseProp(i.getResponseText()),t.errorCallback_?o(t.errorCallback_(i,s)):o(s)}else if(r.canceled){s=t.appDelete_?N():E();o(s)}else{s=m();o(s)}}this.canceled_?r(!1,new Te(!1,null,!0)):this.backoffId_=Re(e,r,this.timeout_)},t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&Ae(this.backoffId_),null!==this.pendingXhr_&&this.pendingXhr_.abort()},t.prototype.isRetryStatusCode_=function(t){var e=t>=500&&t<600,r=[408,429],n=-1!==r.indexOf(t),o=-1!==this.additionalRetryCodes_.indexOf(t);return e||n||o},t}(),Te=function(){function t(t,e,r){this.wasSuccessCode=t,this.xhr=e,this.canceled=!!r}return t}();function Se(t,e){null!==e&&e.length>0&&(t["Authorization"]="Firebase "+e)}function Ce(t){var e="undefined"!==typeof o.a?o.a.SDK_VERSION:"AppManager";t["X-Firebase-Storage-Version"]="webjs/"+e}function Ne(t,e){e&&(t["X-Firebase-GMPID"]=e)}function ke(t,e,r,n){var o=yt(t.urlParams),i=t.url+o,a=Object.assign({},t.headers);return Ne(a,e),Se(a,r),Ce(a),new Oe(i,t.method,a,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,n)}
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
 */var Ue=function(){function t(t,e,r,n){function o(t,e){return new ge(t,e)}if(this.bucket_=null,this.authWrapper_=new we(t,e,o,ke,this,r),this.app_=t,null!=n)this.bucket_=pt.makeFromBucketSpec(n);else{var i=this.authWrapper_.bucket();null!=i&&(this.bucket_=new pt(i,""))}this.internals_=new xe(this)}return t.prototype.ref=function(t){function e(t){if("string"!==typeof t)throw"Path is not a string.";if(/^[A-Za-z]+:\/\//.test(t))throw"Expected child path but got a URL, use refFromURL instead."}if(se("ref",[he(e,!0)],arguments),null==this.bucket_)throw new Error("No Storage Bucket defined in Firebase Options.");var r=new ge(this.authWrapper_,this.bucket_);return null!=t?r.child(t):r},t.prototype.refFromURL=function(t){function e(t){if("string"!==typeof t)throw"Path is not a string.";if(!/^[A-Za-z]+:\/\//.test(t))throw"Expected full URL but got a child path, use ref instead.";try{pt.makeFromUrl(t)}catch(e){throw"Expected valid full URL but got an invalid one."}}return se("refFromURL",[he(e,!1)],arguments),new ge(this.authWrapper_,t)},Object.defineProperty(t.prototype,"maxUploadRetryTime",{get:function(){return this.authWrapper_.maxUploadRetryTime()},enumerable:!0,configurable:!0}),t.prototype.setMaxUploadRetryTime=function(t){se("setMaxUploadRetryTime",[de()],arguments),this.authWrapper_.setMaxUploadRetryTime(t)},t.prototype.setMaxOperationRetryTime=function(t){se("setMaxOperationRetryTime",[de()],arguments),this.authWrapper_.setMaxOperationRetryTime(t)},Object.defineProperty(t.prototype,"app",{get:function(){return this.app_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"INTERNAL",{get:function(){return this.internals_},enumerable:!0,configurable:!0}),t}(),xe=function(){function t(t){this.service_=t}return t.prototype.delete=function(){return this.service_.authWrapper_.deleteApp(),Promise.resolve()},t}(),Pe="@firebase/storage",Ie="0.3.35",De="storage";function Le(t,e){var r=t.getProvider("app").getImmediate(),n=t.getProvider("auth-internal");return new Ue(r,n,new st,e)}function Me(t){var e={TaskState:X,TaskEvent:H,StringFormat:P,Storage:Ue,Reference:ge};t.INTERNAL.registerComponent(new a["Component"](De,Le,"PUBLIC").setServiceProps(e).setMultipleInstances(!0)),t.registerVersion(Pe,Ie)}Me(o.a)},cd51:function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=r("9ab4"),o={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},i=function(t,e){if(!t)throw a(e)},a=function(t){return new Error("Firebase Database ("+o.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)},s=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var o=t.charCodeAt(n);o<128?e[r++]=o:o<2048?(e[r++]=o>>6|192,e[r++]=63&o|128):55296===(64512&o)&&n+1<t.length&&56320===(64512&t.charCodeAt(n+1))?(o=65536+((1023&o)<<10)+(1023&t.charCodeAt(++n)),e[r++]=o>>18|240,e[r++]=o>>12&63|128,e[r++]=o>>6&63|128,e[r++]=63&o|128):(e[r++]=o>>12|224,e[r++]=o>>6&63|128,e[r++]=63&o|128)}return e},u=function(t){var e=[],r=0,n=0;while(r<t.length){var o=t[r++];if(o<128)e[n++]=String.fromCharCode(o);else if(o>191&&o<224){var i=t[r++];e[n++]=String.fromCharCode((31&o)<<6|63&i)}else if(o>239&&o<365){i=t[r++];var a=t[r++],s=t[r++],u=((7&o)<<18|(63&i)<<12|(63&a)<<6|63&s)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(1023&u))}else{i=t[r++],a=t[r++];e[n++]=String.fromCharCode((15&o)<<12|(63&i)<<6|63&a)}}return e.join("")},c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],o=0;o<t.length;o+=3){var i=t[o],a=o+1<t.length,s=a?t[o+1]:0,u=o+2<t.length,c=u?t[o+2]:0,h=i>>2,l=(3&i)<<4|s>>4,p=(15&s)<<2|c>>6,f=63&c;u||(f=64,a||(p=64)),n.push(r[h],r[l],r[p],r[f])}return n.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(s(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):u(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],o=0;o<t.length;){var i=r[t.charAt(o++)],a=o<t.length,s=a?r[t.charAt(o)]:0;++o;var u=o<t.length,c=u?r[t.charAt(o)]:64;++o;var h=o<t.length,l=h?r[t.charAt(o)]:64;if(++o,null==i||null==s||null==c||null==l)throw Error();var p=i<<2|s>>4;if(n.push(p),64!==c){var f=s<<4&240|c>>2;if(n.push(f),64!==l){var d=c<<6&192|l;n.push(d)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},h=function(t){var e=s(t);return c.encodeByteArray(e,!0)},l=function(t){try{return c.decodeString(t,!0)}catch(e){}return null};
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
 */
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
 */
function p(t){return f(void 0,t)}function f(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:var r=e;return new Date(r.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return e}for(var n in e)e.hasOwnProperty(n)&&(t[n]=f(t[n],e[n]));return t}
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
 */var d=function(){function t(){var t=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(e,r){t.resolve=e,t.reject=r}))}return t.prototype.wrapCallback=function(t){var e=this;return function(r,n){r?e.reject(r):e.resolve(n),"function"===typeof t&&(e.promise.catch((function(){})),1===t.length?t(r):t(r,n))}},t}();
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
 */function _(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function v(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_())}function b(){try{return"[object process]"===Object.prototype.toString.call(t.process)}catch(e){return!1}}function y(){return"object"===typeof self&&self.self===self}function g(){var t="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof t&&void 0!==t.id}function m(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function E(){return _().indexOf("Electron/")>=0}function w(){var t=_();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function R(){return _().indexOf("MSAppHost/")>=0}function A(){return!0===o.NODE_CLIENT||!0===o.NODE_ADMIN}function O(){return!b()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}
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
 */var T="FirebaseError",S=function(t){function e(r,n){var o=t.call(this,n)||this;return o.code=r,o.name=T,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,C.prototype.create),o}return n.__extends(e,t),e}(Error),C=function(){function t(t,e,r){this.service=t,this.serviceName=e,this.errors=r}return t.prototype.create=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];for(var n=e[0]||{},o=this.service+"/"+t,i=this.errors[t],a=i?N(i,n):"Error",s=this.serviceName+": "+a+" ("+o+").",u=new S(o,s),c=0,h=Object.keys(n);c<h.length;c++){var l=h[c];"_"!==l.slice(-1)&&(u[l]=n[l])}return u},t}();function N(t,e){return t.replace(k,(function(t,r){var n=e[r];return null!=n?n.toString():"<"+r+"?>"}))}var k=/\{\$([^}]+)}/g;
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
 */function U(t){return JSON.parse(t)}function x(t){return JSON.stringify(t)}
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
 */var P=function(t){var e={},r={},n={},o="";try{var i=t.split(".");e=U(l(i[0])||""),r=U(l(i[1])||""),o=i[2],n=r["d"]||{},delete r["d"]}catch(a){}return{header:e,claims:r,data:n,signature:o}},I=function(t){var e=P(t).claims,r=Math.floor((new Date).getTime()/1e3),n=0,o=0;return"object"===typeof e&&(e.hasOwnProperty("nbf")?n=e["nbf"]:e.hasOwnProperty("iat")&&(n=e["iat"]),o=e.hasOwnProperty("exp")?e["exp"]:n+86400),!!r&&!!n&&!!o&&r>=n&&r<=o},D=function(t){var e=P(t).claims;return"object"===typeof e&&e.hasOwnProperty("iat")?e["iat"]:null},L=function(t){var e=P(t),r=e.claims;return!!r&&"object"===typeof r&&r.hasOwnProperty("iat")},M=function(t){var e=P(t).claims;return"object"===typeof e&&!0===e["admin"]};
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
 */
function j(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function B(t,e){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0}function W(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function G(t,e,r){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=e.call(r,t[o],o,t));return n}
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
 */function F(t){for(var e=[],r=function(t,r){Array.isArray(r)?r.forEach((function(r){e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))})):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))},n=0,o=Object.entries(t);n<o.length;n++){var i=o[n],a=i[0],s=i[1];r(a,s)}return e.length?"&"+e.join("&"):""}function q(t){var e={},r=t.replace(/^\?/,"").split("&");return r.forEach((function(t){if(t){var r=t.split("=");e[r[0]]=r[1]}})),e}
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
 */var z=function(){function t(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}return t.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},t.prototype.compress_=function(t,e){e||(e=0);var r=this.W_;if("string"===typeof t)for(var n=0;n<16;n++)r[n]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(n=0;n<16;n++)r[n]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(n=16;n<80;n++){var o=r[n-3]^r[n-8]^r[n-14]^r[n-16];r[n]=4294967295&(o<<1|o>>>31)}var i,a,s=this.chain_[0],u=this.chain_[1],c=this.chain_[2],h=this.chain_[3],l=this.chain_[4];for(n=0;n<80;n++){n<40?n<20?(i=h^u&(c^h),a=1518500249):(i=u^c^h,a=1859775393):n<60?(i=u&c|h&(u|c),a=2400959708):(i=u^c^h,a=3395469782);o=(s<<5|s>>>27)+i+l+a+r[n]&4294967295;l=h,h=c,c=4294967295&(u<<30|u>>>2),u=s,s=o}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+u&4294967295,this.chain_[2]=this.chain_[2]+c&4294967295,this.chain_[3]=this.chain_[3]+h&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295},t.prototype.update=function(t,e){if(null!=t){void 0===e&&(e=t.length);var r=e-this.blockSize,n=0,o=this.buf_,i=this.inbuf_;while(n<e){if(0===i)while(n<=r)this.compress_(t,n),n+=this.blockSize;if("string"===typeof t){while(n<e)if(o[i]=t.charCodeAt(n),++i,++n,i===this.blockSize){this.compress_(o),i=0;break}}else while(n<e)if(o[i]=t[n],++i,++n,i===this.blockSize){this.compress_(o),i=0;break}}this.inbuf_=i,this.total_+=e}},t.prototype.digest=function(){var t=[],e=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&e,e/=256;this.compress_(this.buf_);var n=0;for(r=0;r<5;r++)for(var o=24;o>=0;o-=8)t[n]=this.chain_[r]>>o&255,++n;return t},t}();function H(t,e){var r=new V(t,e);return r.subscribe.bind(r)}var V=function(){function t(t,e){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then((function(){t(r)})).catch((function(t){r.error(t)}))}return t.prototype.next=function(t){this.forEachObserver((function(e){e.next(t)}))},t.prototype.error=function(t){this.forEachObserver((function(e){e.error(t)})),this.close(t)},t.prototype.complete=function(){this.forEachObserver((function(t){t.complete()})),this.close()},t.prototype.subscribe=function(t,e,r){var n,o=this;if(void 0===t&&void 0===e&&void 0===r)throw new Error("Missing Observer.");n=K(t,["next","error","complete"])?t:{next:t,error:e,complete:r},void 0===n.next&&(n.next=J),void 0===n.error&&(n.error=J),void 0===n.complete&&(n.complete=J);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{o.finalError?n.error(o.finalError):n.complete()}catch(t){}})),this.observers.push(n),i},t.prototype.unsubscribeOne=function(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},t.prototype.forEachObserver=function(t){if(!this.finalized)for(var e=0;e<this.observers.length;e++)this.sendOne(e,t)},t.prototype.sendOne=function(t,e){var r=this;this.task.then((function(){if(void 0!==r.observers&&void 0!==r.observers[t])try{e(r.observers[t])}catch(n){"undefined"!==typeof console&&console.error}}))},t.prototype.close=function(t){var e=this;this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then((function(){e.observers=void 0,e.onNoObservers=void 0})))},t}();function X(t,e){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];Promise.resolve(!0).then((function(){t.apply(void 0,r)})).catch((function(t){e&&e(t)}))}}function K(t,e){if("object"!==typeof t||null===t)return!1;for(var r=0,n=e;r<n.length;r++){var o=n[r];if(o in t&&"function"===typeof t[o])return!0}return!1}function J(){}
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
 */var Z=function(t,e,r,n){var o;if(n<e?o="at least "+e:n>r&&(o=0===r?"none":"no more than "+r),o){var i=t+" failed: Was called with "+n+(1===n?" argument.":" arguments.")+" Expects "+o+".";throw new Error(i)}};function $(t,e,r){var n="";switch(e){case 1:n=r?"first":"First";break;case 2:n=r?"second":"Second";break;case 3:n=r?"third":"Third";break;case 4:n=r?"fourth":"Fourth";break;default:throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")}var o=t+" failed: ";return o+=n+" argument ",o}function Q(t,e,r,n){if((!n||r)&&"string"!==typeof r)throw new Error($(t,e,n)+"must be a valid firebase namespace.")}function Y(t,e,r,n){if((!n||r)&&"function"!==typeof r)throw new Error($(t,e,n)+"must be a valid function.")}function tt(t,e,r,n){if((!n||r)&&("object"!==typeof r||null===r))throw new Error($(t,e,n)+"must be a valid context object.")}
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
 */var et=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var o=t.charCodeAt(n);if(o>=55296&&o<=56319){var a=o-55296;n++,i(n<t.length,"Surrogate pair missing trail surrogate.");var s=t.charCodeAt(n)-56320;o=65536+(a<<10)+s}o<128?e[r++]=o:o<2048?(e[r++]=o>>6|192,e[r++]=63&o|128):o<65536?(e[r++]=o>>12|224,e[r++]=o>>6&63|128,e[r++]=63&o|128):(e[r++]=o>>18|240,e[r++]=o>>12&63|128,e[r++]=o>>6&63|128,e[r++]=63&o|128)}return e},rt=function(t){for(var e=0,r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e++:n<2048?e+=2:n>=55296&&n<=56319?(e+=4,r++):e+=3}return e};e.CONSTANTS=o,e.Deferred=d,e.ErrorFactory=C,e.FirebaseError=S,e.Sha1=z,e.assert=i,e.assertionError=a,e.async=X,e.base64=c,e.base64Decode=l,e.base64Encode=h,e.contains=j,e.createSubscribe=H,e.decode=P,e.deepCopy=p,e.deepExtend=f,e.errorPrefix=$,e.getUA=_,e.isAdmin=M,e.isBrowser=y,e.isBrowserExtension=g,e.isElectron=E,e.isEmpty=W,e.isIE=w,e.isMobileCordova=v,e.isNode=b,e.isNodeSdk=A,e.isReactNative=m,e.isSafari=O,e.isUWP=R,e.isValidFormat=L,e.isValidTimestamp=I,e.issuedAtTime=D,e.jsonEval=U,e.map=G,e.querystring=F,e.querystringDecode=q,e.safeGet=B,e.stringLength=rt,e.stringToByteArray=et,e.stringify=x,e.validateArgCount=Z,e.validateCallback=Y,e.validateContextObject=tt,e.validateNamespace=Q}).call(this,r("c8ba"))}}]);
//# sourceMappingURL=app~8a6c828a.f2961894.js.map