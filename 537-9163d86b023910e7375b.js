"use strict";(self.webpackChunktkfmtools=self.webpackChunktkfmtools||[]).push([[537],{23537:function(e,n,o){o.r(n),o.d(n,{BrowserInfo:function(){return r},NodeInfo:function(){return t},SearchBotDeviceInfo:function(){return s},BotInfo:function(){return a},ReactNativeInfo:function(){return u},detect:function(){return l},browserName:function(){return h},parseUserAgent:function(){return p},detectOS:function(){return v},getNodeVersion:function(){return m}});var i=function(e,n,o){if(o||2===arguments.length)for(var i,r=0,t=n.length;r<t;r++)!i&&r in n||(i||(i=Array.prototype.slice.call(n,0,r)),i[r]=n[r]);return e.concat(i||Array.prototype.slice.call(n))},r=function(e,n,o){this.name=e,this.version=n,this.os=o,this.type="browser"},t=function(e){this.version=e,this.type="node",this.name="node",this.os=process.platform},s=function(e,n,o,i){this.name=e,this.version=n,this.os=o,this.bot=i,this.type="bot-device"},a=function(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null},u=function(){this.type="react-native",this.name="react-native",this.version=null,this.os=null},c=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,d=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/]],f=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function l(e){return e?p(e):"undefined"==typeof document&&"undefined"!=typeof navigator&&"ReactNative"===navigator.product?new u:"undefined"!=typeof navigator?p(navigator.userAgent):m()}function w(e){return""!==e&&d.reduce((function(n,o){var i=o[0],r=o[1];if(n)return n;var t=r.exec(e);return!!t&&[i,t]}),!1)}function h(e){var n=w(e);return n?n[0]:null}function p(e){var n=w(e);if(!n)return null;var o=n[0],t=n[1];if("searchbot"===o)return new a;var u=t[1]&&t[1].split(".").join("_").split("_").slice(0,3);u?u.length<3&&(u=i(i([],u,!0),function(e){for(var n=[],o=0;o<e;o++)n.push("0");return n}(3-u.length),!0)):u=[];var d=u.join("."),f=v(e),l=c.exec(e);return l&&l[1]?new s(o,d,f,l[1]):new r(o,d,f)}function v(e){for(var n=0,o=f.length;n<o;n++){var i=f[n],r=i[0];if(i[1].exec(e))return r}return null}function m(){return"undefined"!=typeof process&&process.version?new t(process.version.slice(1)):null}}}]);
//# sourceMappingURL=537-9163d86b023910e7375b.js.map