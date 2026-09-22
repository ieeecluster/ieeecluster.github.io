function change_locale(val, apath,href) {
	var pcookie=new PortalCookie();
	pcookie.deleteCookie("Portal.Locale");
	pcookie.setCookie("Portal.Locale", val,{expireDays:365,path:apath});
	if(href){
		window.location=m_href;
	}else{
		window.location.reload();
	}
	
	return true;
}
function getElementPos(elementId) {
 var ua = navigator.userAgent.toLowerCase();
 var isOpera = (ua.indexOf('opera') != -1);
 var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
 var el = document.getElementById(elementId);
 if(el.parentNode === null || el.style.display == 'none') {
  return false;
 }     
 var parent = null;
 var pos = [];    
 var box;    
 if(el.getBoundingClientRect)    //IE
 {         
  box = el.getBoundingClientRect();
  var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  return {x:box.left + scrollLeft, y:box.top + scrollTop};
 }else if(document.getBoxObjectFor){    // gecko   
  box = document.getBoxObjectFor(el);
  var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0;
  var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0;
  pos = [box.x - borderLeft, box.y - borderTop];
 } else    // safari & opera   
 {
  pos = [el.offsetLeft, el.offsetTop]; 
  parent = el.offsetParent;    
  if (parent != el) {
   while (parent) { 
    pos[0] += parent.offsetLeft;
    pos[1] += parent.offsetTop;
    parent = parent.offsetParent;
   } 
  }  
  if (ua.indexOf('opera') != -1 || ( ua.indexOf('safari') != -1 && el.style.position == 'absolute' )) {
   pos[0] -= document.body.offsetLeft;
   pos[1] -= document.body.offsetTop;        
  }   
 }             
 if (el.parentNode) {
    parent = el.parentNode;
   } else {
    parent = null;
   }
 while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
  pos[0] -= parent.scrollLeft;
  pos[1] -= parent.scrollTop;
  if (parent.parentNode) {
   parent = parent.parentNode;
  } else {
   parent = null;
  }
 }
 return {x:pos[0], y:pos[1]};
}
	langTimeOutVar=null;
	function hidemenu(){
		if (langTimeOutVar != null)
			window.clearInterval(langTimeOutVar);
		langTimeOutVar = window.setInterval("document.getElementById('language').style.display = 'none'", 1000);
	}
	function showmenu(){
		if (langTimeOutVar != null) {
			window.clearInterval(langTimeOutVar);
			langTimeOutVar = null;
		};
		var pos = getElementPos("langtirgger");
		var clientWidth=document.getElementById('langtirgger').clientWidth;
		var lanuage=document.getElementById('language');
		lanuage.style.left=(pos.x+clientWidth-73)+'px';
		lanuage.style.top=(pos.y+20)+'px';
		lanuage.style.display="block";
	}
	function isIE(){
		return navigator.userAgent.toLowerCase().indexOf('msie')!=-1;
	}
function el(id){
	return document.getElementById(id);
}
function PortalCookie() {
	this.setCookie = function (name, value, option) {
     var str=name+"="+escape(value);  
     if(option){
            if(option.expireDays){
                   var date=new Date();
                   var ms=option.expireDays*24*3600*1000;
                   date.setTime(date.getTime()+ms);
                   str+="; expires="+date.toGMTString();
            } 
            if(option.path)str+="; path="+option.path;
            if(option.domain)str+="; domain"+option.domain;
            if(option.secure)str+="; true";
     }
     document.cookie=str;
	};
	this.getCookieVal = function (offset) {
		var endstr = document.cookie.indexOf(";", offset);
		if (endstr == -1) {
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	};
	this.getCookie = function (name) {
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				return getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i === 0) {
				break;
			}
		}
		return null;
	};
	
	this.deleteCookie=function(name){
		this.setCookie(name,"",{expireDays:-1});
	};
}