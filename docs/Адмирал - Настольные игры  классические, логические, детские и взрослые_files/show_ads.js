(function(){var l=this,aa=function(a,b){var e=a.split("."),d=l;e[0]in d||!d.execScript||d.execScript("var "+e[0]);for(var c;e.length&&(c=e.shift());)e.length||void 0===b?d=d[c]?d[c]:d[c]={}:d[c]=b},ba=function(a,b,e){return a.call.apply(a.bind,arguments)},ca=function(a,b,e){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,
arguments)}},n=function(a,b,e){n=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ba:ca;return n.apply(null,arguments)},da=function(a,b){var e=Array.prototype.slice.call(arguments,1);return function(){var b=e.slice();b.push.apply(b,arguments);return a.apply(this,b)}};var v=(new Date).getTime();var w=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},x=function(a){return/^true$/.test(a)?!0:!1},ea=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,A=function(a,b){if(!a)return b;var e=a.match(ea);return e?e[0]:b};var fa=w("0.15"),ga=w("0.001"),ha=w("1.0"),ia=w("0.05"),ja=w("0.001"),ka=w("0.0"),la=w("0.2");var ma=x("false"),na=x("false"),oa=x("false"),pa=x("false");var qa=function(){return A("","pagead2.googlesyndication.com")};var ra=/&/g,sa=/</g,ta=/>/g,ua=/\"/g,B={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\"},C={"'":"\\'"};var E=document,F=window,G,va=null,H=E.getElementsByTagName("script");H&&H.length&&(va=H[H.length-1].parentNode);G=va;qa();var I=function(a,b){for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&b.call(null,a[e],e,a)},J=function(a){return!!a&&"function"==typeof a&&!!a.call},wa=function(a,b){if(!(2>arguments.length))for(var e=1,d=arguments.length;e<d;++e)a.push(arguments[e])};function xa(a,b){K(a,"load",b)}
var K=function(a,b,e,d){return a.addEventListener?(a.addEventListener(b,e,d||!1),!0):a.attachEvent?(a.attachEvent("on"+b,e),!0):!1},L=function(a,b,e,d){e=n(d,e);return K(a,b,e,void 0)?e:null},M=function(a,b,e){a.removeEventListener?a.removeEventListener(b,e,!1):a.detachEvent&&a.detachEvent("on"+b,e)},ya=function(){var a=window;"google_onload_fired"in a||(a.google_onload_fired=!1,xa(a,function(){a.google_onload_fired=!0}))},N=function(a,b){if(!(1E-4>Math.random())){var e=Math.random();if(e<b){try{var d=
new Uint16Array(1);window.crypto.getRandomValues(d);e=d[0]/65536}catch(c){e=Math.random()}return a[Math.floor(e*a.length)]}}return null},O=function(a){try{return!!a.location.href||""===a.location.href}catch(b){return!1}};var za=/MSIE [2-7]|PlayStation|Gecko\/20090226|Android 2\.|Opera/i,Aa=/Android/;var P=null,Ba=function(){if(!P){for(var a=window,b=a,e=0;a!=a.parent;)if(a=a.parent,e++,O(a))b=a;else break;P=b}return P};var Q=function(a,b,e){e||(e=pa?"https":"http");return[e,"://",a,b].join("")};var Ca=function(){},Ea=function(a,b,e){switch(typeof b){case "string":Da(b,e);break;case "number":e.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":e.push(b);break;case "undefined":e.push("null");break;case "object":if(null==b){e.push("null");break}if(b instanceof Array){var d=b.length;e.push("[");for(var c="",f=0;f<d;f++)e.push(c),Ea(a,b[f],e),c=",";e.push("]");break}e.push("{");d="";for(c in b)b.hasOwnProperty(c)&&(f=b[c],"function"!=typeof f&&(e.push(d),Da(c,e),e.push(":"),Ea(a,f,e),
d=","));e.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Fa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ga=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Da=function(a,b){b.push('"');b.push(a.replace(Ga,function(a){if(a in Fa)return Fa[a];var b=a.charCodeAt(0),c="\\u";16>b?c+="000":256>b?c+="00":4096>b&&(c+="0");return Fa[a]=c+b.toString(16)}));b.push('"')};var R="google_ad_block google_ad_channel google_ad_client google_ad_format google_ad_height google_ad_host google_ad_host_channel google_ad_host_tier_id google_ad_output google_ad_override google_ad_region google_ad_section google_ad_slot google_ad_type google_ad_unit_key google_ad_width google_adtest google_allow_expandable_ads google_alternate_ad_url google_alternate_color google_analytics_domain_name google_analytics_uacct google_bid google_captcha_token google_city google_color_bg google_color_border google_color_line google_color_link google_color_text google_color_url google_container_id google_contents google_country google_cpm google_ctr_threshold google_cust_age google_cust_ch google_cust_criteria google_cust_gender google_cust_id google_cust_interests google_cust_job google_cust_l google_cust_lh google_cust_u_url google_disable_video_autoplay google_ed google_eids google_enable_ose google_enable_ose_periscope google_encoding google_floating_ad_position google_font_face google_font_size google_frame_id google_gl google_hints google_image_size google_kw google_kw_type google_lact google_language google_loeid google_max_num_ads google_max_radlink_len google_mtl google_num_radlinks google_num_radlinks_per_unit google_num_slots_to_rotate google_only_ads_with_video google_only_pyv_ads google_only_userchoice_ads google_override_format google_page_url google_previous_watch google_previous_searches google_referrer_url google_region google_reuse_colors google_rl_dest_url google_rl_filtering google_rl_mode google_rt google_safe google_sc_id google_scs google_sui google_skip google_tag_for_child_directed_treatment google_tag_info google_targeting google_tdsma google_tfs google_tl google_ui_features google_ui_version google_video_doc_id google_video_product_type google_video_url_to_fetch google_with_pyv_ads google_yt_pt google_yt_up".split(" "),
Ha=function(a){a.google_page_url&&(a.google_page_url=String(a.google_page_url));var b=[];I(a,function(a,d){if(null!=a){var c;try{var f=[];Ea(new Ca,a,f);c=f.join("")}catch(g){}c&&wa(b,d,"=",c,";")}});return b.join("")};var Ia=/\.((google(|groups|mail|images|print))|gmail)\./,Ja=function(a){try{var b=Ia.test(a.location.host);return!(!a.postMessage||!a.localStorage||!a.JSON||b)}catch(e){return!1}};var Ka=function(a){this.b=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{}});this.l=a.google_iframe_oncopy},La;var S="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){w.location.replace(h)}}";
/[&<>\"]/.test(S)&&(-1!=S.indexOf("&")&&(S=S.replace(ra,"&amp;")),-1!=S.indexOf("<")&&(S=S.replace(sa,"&lt;")),-1!=S.indexOf(">")&&(S=S.replace(ta,"&gt;")),-1!=S.indexOf('"')&&(S=S.replace(ua,"&quot;")));La=S;Ka.prototype.set=function(a,b){this.l.handlers[a]=b;this.b.addEventListener&&this.b.addEventListener("load",n(this.m,this,a),!1)};Ka.prototype.m=function(a){a=this.b.document.getElementById(a);var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()};var T,U,V,Ma,Na=function(){return l.navigator?l.navigator.userAgent:null};Ma=V=U=T=!1;var W;if(W=Na()){var Oa=l.navigator;T=0==W.lastIndexOf("Opera",0);U=!T&&(-1!=W.indexOf("MSIE")||-1!=W.indexOf("Trident"));V=!T&&-1!=W.indexOf("WebKit");Ma=!T&&!V&&!U&&"Gecko"==Oa.product}var Pa=U,Qa=Ma,Ra=V;var X;if(T&&l.opera){var Sa=l.opera.version;"function"==typeof Sa&&Sa()}else Qa?X=/rv\:([^\);]+)(\)|;)/:Pa?X=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Ra&&(X=/WebKit\/(\S+)/),X&&X.exec(Na());var Ta={client:"google_ad_client",format:"google_ad_format",slotname:"google_ad_slot",output:"google_ad_output",ad_type:"google_ad_type",async_oa:"google_async_for_oa_experiment",zrtm:"google_ad_handling_mode",dimpr:"google_always_use_delayed_impressions_experiment",peri:"google_top_experiment"},Va=function(a,b,e,d){try{e()}catch(c){e=!oa;try{var f=c.toString();c.name&&-1==f.indexOf(c.name)&&(f+=": "+c.name);c.message&&-1==f.indexOf(c.message)&&(f+=": "+c.message);if(c.stack){var g=c.stack,p=f;try{-1==
g.indexOf(p)&&(g=p+"\n"+g);for(var h;g!=h;)h=g,g=g.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");f=g.replace(/\n */g,"\n")}catch(m){f=p}}g="";c.fileName&&(g=c.fileName);h=-1;c.lineNumber&&(h=c.lineNumber);var k;o:{try{k=d?d():"";break o}catch(q){}k=""}e=b(a,f,g,h,k)}catch(y){Ua({context:"protectAndRun",msg:y.toString()+"\n"+(y.stack||"")})}if(!e)throw c;}};aa("google_protectAndRun",Va);
var Xa=function(a,b,e,d,c){a={jscb:ma?1:0,jscd:na?1:0,context:a,msg:b.substring(0,512),eid:c&&c.substring(0,40),file:e,line:d.toString(),url:E.URL.substring(0,512),ref:E.referrer.substring(0,512)};Wa(a);Ua(a);return!oa};aa("google_handleError",Xa);
var Ua=function(a){if(0.01>Math.random()){a="/pagead/gen_204?id=jserror"+Ya(a);a=Q(A("","pagead2.googlesyndication.com"),a);a=a.substring(0,2E3);F.google_image_requests||(F.google_image_requests=[]);var b=F.document.createElement("img");b.src=a;F.google_image_requests.push(b)}},Wa=function(a){var b=a||{};I(Ta,function(a,d){b[d]=F[a]})},Za=function(a,b){return da(Va,a,Xa,b,void 0)},Ya=function(a){var b="";I(a,function(a,d){if(0===a||a)b+="&"+d+"="+("function"==typeof encodeURIComponent?
encodeURIComponent(a):escape(a))});return b};var Y,Z=function(a){this.c=[];this.b=a||window;this.a=0;this.d=null},$a=function(a,b){this.k=a;this.win=b};Z.prototype.o=function(a,b){0!=this.a||0!=this.c.length||b&&b!=window?this.g(a,b):(this.a=2,this.f(new $a(a,window)))};Z.prototype.g=function(a,b){this.c.push(new $a(a,b||this.b));ab(this)};Z.prototype.p=function(a){this.a=1;if(a){var b=Za("sjr::timeout",n(this.e,this));this.d=this.b.setTimeout(b,a)}};
Z.prototype.e=function(){1==this.a&&(null!=this.d&&(this.b.clearTimeout(this.d),this.d=null),this.a=0);ab(this)};Z.prototype.q=function(){return!(!window||!Array)};Z.prototype.nq=Z.prototype.o;Z.prototype.nqa=Z.prototype.g;Z.prototype.al=Z.prototype.p;Z.prototype.rl=Z.prototype.e;Z.prototype.sz=Z.prototype.q;var ab=function(a){var b=Za("sjr::tryrun",n(a.n,a));a.b.setTimeout(b,0)};
Z.prototype.n=function(){if(0==this.a&&this.c.length){var a=this.c.shift();this.a=2;var b=Za("sjr::run",n(this.f,this,a));a.win.setTimeout(b,0);ab(this)}};Z.prototype.f=function(a){this.a=0;a.k()};
var bb=function(a){try{return a.sz()}catch(b){return!1}},cb=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&bb(a)&&J(a.nq)&&J(a.nqa)&&J(a.al)&&J(a.rl)},db=function(){if(Y&&bb(Y))return Y;var a=Ba(),b=a.google_jobrunner;return cb(b)?Y=b:a.google_jobrunner=Y=new Z(a)},eb=function(a,b){db().nq(a,b)},fb=function(a,b){db().nqa(a,b)};var gb={"120x90":!0,"160x90":!0,"180x90":!0,"200x90":!0,"468x15":!0,"728x15":!0},hb=function(){var a="script";return["<",a,' src="',Q(qa(),"/pagead/js/r20131107/r20130906/show_ads_impl.js",""),'"></',a,">"].join("")},ib=function(a,b,e,d){return function(){var c=!1;d&&db().al(3E4);try{if(O(a.document.getElementById(b).contentWindow)){var f=a.document.getElementById(b).contentWindow,
g=f.document;g.body&&g.body.firstChild||(g.open(),f.google_async_iframe_close=!0,g.write(e))}else{var p=a.document.getElementById(b).contentWindow,h;f=e;f=String(f);if(f.quote)h=f.quote();else{for(var g=['"'],m=0;m<f.length;m++){var k=f.charAt(m),q=k.charCodeAt(0),y=g,D=m+1,u;if(!(u=B[k])){var r;if(31<q&&127>q)r=k;else{var t=k;if(t in C)r=C[t];else if(t in B)r=C[t]=B[t];else{var s=t,z=t.charCodeAt(0);if(31<z&&127>z)s=t;else{if(256>z){if(s="\\x",16>z||256<z)s+="0"}else s="\\u",4096>z&&(s+="0");s+=
z.toString(16).toUpperCase()}r=C[t]=s}}u=r}y[D]=u}g.push('"');h=g.join("")}p.location.replace("javascript:"+h)}c=!0}catch(sb){p=Ba().google_jobrunner,cb(p)&&p.rl()}c&&(new Ka(a)).set(b,ib(a,b,e,!1))}},jb=function(a){var b=["<iframe"];I(a,function(a,d){null!=a&&b.push(" "+d+'="'+a+'"')});b.push("></iframe>");return b.join("")},kb=function(a,b,e,d){d=d?'"':"";var c=d+"0"+d;a.width=d+b+d;a.height=d+e+d;a.frameborder=c;a.marginwidth=c;a.marginheight=c;a.vspace=c;a.hspace=c;a.allowtransparency=d+"true"+
d;a.scrolling=d+"no"+d},lb=function(a,b){var e=a.google_ad_output,d=a.google_ad_format;d||"html"!=e&&null!=e||(d=a.google_ad_width+"x"+a.google_ad_height,b&&(d+="_as"));e=!a.google_ad_slot||a.google_override_format||!gb[a.google_ad_width+"x"+a.google_ad_height]&&"aa"==a.google_loader_used;d=d&&e?d.toLowerCase():"";a.google_ad_format=d;d=[a.google_ad_slot,a.google_ad_format,a.google_ad_type,a.google_ad_width,a.google_ad_height];if(G){if(G){for(var e=[],c=0,f=G;f&&25>c;f=f.parentNode,++c)e.push(9!=
f.nodeType&&f.id||"");e=e.join()}else e="";e&&d.push(e)}e=0;if(d)if(d=d.join(":"),e=d.length,0==e)e=0;else{c=305419896;for(f=0;f<e;f++)c^=(c<<5)+(c>>2)+d.charCodeAt(f)&4294967295;e=0<c?c:4294967296+c}a.google_ad_unit_key=e.toString()},mb=Math.floor(1E6*Math.random()),nb=function(a){for(var b=a.data.split("\n"),e={},d=0;d<b.length;d++){var c=b[d].indexOf("=");-1!=c&&(e[b[d].substr(0,c)]=b[d].substr(c+1))}b=e[3];if(e[1]==mb&&(window.google_top_js_status=4,a.source==top&&0==b.indexOf(a.origin)&&(window.google_top_values=
e,window.google_top_js_status=5),window.google_top_js_callbacks)){for(a=0;a<window.google_top_js_callbacks.length;a++)window.google_top_js_callbacks[a]();window.google_top_js_callbacks.length=0}};var ob=function(a,b,e){this.x=a;this.y=b;this.z=e},pb=function(a,b,e){this.beta=a;this.gamma=b;this.alpha=e},qb=function(a,b){this.deviceAccelerationWithGravity=this.deviceAccelerationWithoutGravity=null;this.deviceMotionEventCallbacks=[];this.deviceOrientation=null;this.deviceOrientationEventCallbacks=[];this.isDeviceOrientationEventListenerRegistered=this.isDeviceMotionEventListenerRegistered=this.didDeviceOrientationCallbacksTimeoutExpire=this.didDeviceMotionCallbacksTimeoutExpire=!1;this.registeredMozOrientationEventListener=
this.registeredDeviceOrientationEventListener=this.registeredDeviceMotionEventListener=null;this.sensorsExperiment=b;this.stopTimeStamp=this.startTimeStamp=null;this.win=a},$=function(a){this.a=a;this.a.win.DeviceOrientationEvent?(this.a.registeredDeviceOrientationEventListener=L(this.a.win,"deviceorientation",this,this.i),this.a.isDeviceOrientationEventListenerRegistered=!0):this.a.win.OrientationEvent&&(this.a.registeredMozOrientationEventListener=L(this.a.win,"MozOrientation",this,this.j),this.a.isDeviceOrientationEventListenerRegistered=
!0);this.a.win.DeviceMotionEvent&&(this.a.registeredDeviceMotionEventListener=L(this.a.win,"devicemotion",this,this.h),this.a.isDeviceMotionEventListenerRegistered=!0)};
$.prototype.h=function(a){a.acceleration&&(this.a.deviceAccelerationWithoutGravity=new ob(a.acceleration.x,a.acceleration.y,a.acceleration.z));a.accelerationIncludingGravity&&(this.a.deviceAccelerationWithGravity=new ob(a.accelerationIncludingGravity.x,a.accelerationIncludingGravity.y,a.accelerationIncludingGravity.z));rb(this.a.deviceMotionEventCallbacks);M(this.a.win,"devicemotion",this.a.registeredDeviceMotionEventListener)};
$.prototype.i=function(a){this.a.deviceOrientation=new pb(a.beta,a.gamma,a.alpha);rb(this.a.deviceOrientationEventCallbacks);M(this.a.win,"deviceorientation",this.a.registeredDeviceOrientationEventListener)};$.prototype.j=function(a){this.a.deviceOrientation=new pb(-90*a.y,90*a.x,null);rb(this.a.deviceOrientationEventCallbacks);M(this.a.win,"MozOrientation",this.a.registeredMozOrientationEventListener)};var rb=function(a){for(var b=0;b<a.length;++b)a[b]();a.length=0};Va("sa::main",Xa,function(){ya();if(!window.google_top_experiment&&!window.google_top_js_status){var a=window;if(2!==(a.top==a?0:O(a.top)?1:2))window.google_top_js_status=0;else if(top.postMessage){var b;try{b=F.top.frames.google_top_static_frame?!0:!1}catch(e){b=!1}if(b){if(window.google_top_experiment=N(["jp_c","jp_zl","jp_wfpmr"],fa),"jp_c"!==window.google_top_experiment){K(window,"message",nb);window.google_top_js_status=3;a={0:"google_loc_request",1:mb};b=[];for(var d in a)b.push(d+"="+a[d]);
top.postMessage(b.join("\n"),"*")}}else window.google_top_js_status=2}else window.google_top_js_status=1}var c;c=c||window;d=!1;c&&c.navigator&&c.navigator.userAgent&&(c=c.navigator.userAgent,d=0!=c.indexOf("Opera")&&-1!=c.indexOf("WebKit")&&-1!=c.indexOf("Mobile"));if(d){c=window;if(d=!/Android/.test(c.navigator.userAgent))d=c.google_unique_id,d=0==("number"==typeof d?d:0)&&!c.google_sensors;d&&(d=null,c.google_top_experiment&&"jp_c"!=c.google_top_experiment||(d=N(["ds_c","ds_zl","ds_wfea"],ka)),
d&&(c.google_sensors=new qb(c,d),"ds_c"!=d&&new $(c.google_sensors)))}c=window.google_ad_output;void 0!==window.google_always_use_delayed_impressions_experiment||c&&"html"!=c||(window.google_always_use_delayed_impressions_experiment=N(["C","E"],ja));(c=!1===window.google_enable_async)||(c=navigator.userAgent,za.test(c)?c=!1:(void 0!==window.google_async_for_oa_experiment||!Aa.test(navigator.userAgent)||za.test(navigator.userAgent)||(window.google_async_for_oa_experiment=N(["E","C"],ia)),c=Aa.test(c)?
"E"===window.google_async_for_oa_experiment:!0),c=!c||window.google_container_id||window.google_ad_output&&"html"!=window.google_ad_output);if(c)window.google_loader_used="sb",window.google_start_time=v,lb(window),document.write(hb());else{c=window;c.google_unique_id?++c.google_unique_id:c.google_unique_id=1;c=window;d={};a=0;for(b=R.length;a<b;a++){var f=R[a];null!=c[f]&&(d[f]=c[f])}d.google_loader_used="sa";a=0;for(b=R.length;a<b;a++)c[R[a]]=null;a=d.google_ad_width;b=d.google_ad_height;f={};kb(f,
a,b,!0);f.onload='"'+La+'"';for(var g,p=c.document,h=f.id,m=0;!h||p.getElementById(h);)h="aswift_"+m++;f.id=h;f.name=h;var m=d.google_ad_width,k=d.google_ad_height,h=["<iframe"];for(g in f)f.hasOwnProperty(g)&&wa(h,g+"="+f[g]);h.push('style="left:0;position:absolute;top:0;"');h.push("></iframe>");g="border:none;height:"+k+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+m+"px;background-color:transparent";p.write(['<ins style="display:inline-table;',g,'"><ins id="',f.id+"_anchor",
'" style="display:block;',g,'">',h.join(" "),"</ins></ins>"].join(""));g=f.id;f=window.google_override_format||!gb[window.google_ad_width+"x"+window.google_ad_height]&&"aa"==window.google_loader_used?N(["c","e"],la):null;lb(d,"e"==f);p=Ha(d);h=Ja(c);m=3==({visible:1,hidden:2,prerender:3,preview:4}[c.document.webkitVisibilityState||c.document.mozVisibilityState||c.document.visibilityState||""]||0);h&&!m&&void 0===c.google_ad_handling_mode&&(c.google_ad_handling_mode=N(["XN","AZ"],ga)||N(["EI"],ha));
h=c.google_ad_handling_mode?String(c.google_ad_handling_mode):null;if(Ja(c)&&1==c.google_unique_id&&"XN"!=h){m="zrt_ads_frame"+c.google_unique_id;k=d.google_page_url;if(!k){e:{var k=c.document,q=a||c.google_ad_width,y=b||c.google_ad_height;if(c.top==c)k=!1;else{var D=k.documentElement;if(q&&y){var u=1,r=1;c.innerHeight?(u=c.innerWidth,r=c.innerHeight):D&&D.clientHeight?(u=D.clientWidth,r=D.clientHeight):k.body&&(u=k.body.clientWidth,r=k.body.clientHeight);if(r>2*y||u>2*q){k=!1;break e}}k=!0}}k=k?
c.document.referrer:c.document.URL}k=encodeURIComponent(k);q=null;if("PC"==h||"EI"==h||"AZ"==h){switch(h){case "EI":q="I";break;case "AZ":q="Z";break;default:q="K"}q=q+"-"+(k+"/"+d.google_ad_unit_key+"/"+c.google_unique_id)}d={};kb(d,a,b,!1);d.style="display:none";a=q;d.id=m;d.name=m;d.src=Q(A("","googleads.g.doubleclick.net"),["/pagead/html/r20131107/r20130906/zrt_lookup.html",a?"#"+encodeURIComponent(a):
""].join(""));d=jb(d)}else d=null;a=(new Date).getTime();b=c.google_top_experiment;m=c.google_async_for_oa_experiment;k=c.google_always_use_delayed_impressions_experiment;d=["<!doctype html><html><body>",d,"<script>",p,"google_show_ads_impl=true;google_unique_id=",c.google_unique_id,';google_async_iframe_id="',g,'";google_start_time=',v,";",b?'google_top_experiment="'+b+'";':"",h?'google_ad_handling_mode="'+h+'";':"",m?'google_async_for_oa_experiment="'+m+'";':"",k?'google_always_use_delayed_impressions_experiment="'+
k+'";':"",f?'google_append_as_for_format_override="'+f+'";':"","google_bpp=",a>v?a-v:1,";\x3c/script>",hb(),"</body></html>"].join("");(c.document.getElementById(g)?eb:fb)(ib(c,g,d,!0))}});})();
