var tip_dynamic_event_x;
var tip_dynamic_event_y;
var tip_dynamic_showedObjId='dynamic_tip_check_pagename';
var tip_dynamic_formid;
var tip_dynamic_linkid;
var tip_dynamic_innerHtmlDiv='page_error_info';
var drag_=false;
var D = new Function("obj", "return document.getElementById(obj);");
var oevent = new Function("e", "if (!e) e = window.event;return e");
function Overlay(divid){
	var frameDivId="tmpdiv"+divid;
	var div=document.createElement("div");
	div.setAttribute("id", frameDivId);
}
function Move_obj(obj, titlebar) {
	var x, y;
	var pane = GetViewPaneSize('header');
	var objid=obj;
	var barid=titlebar;
	D(barid).onmousedown = function (e) {
		drag_ = true;
		with (this) {
			 D(objid).style.position = "absolute";
			var temp1 = D(objid).offsetLeft;
			var temp2 = D(objid).offsetTop;
			x = oevent(e).clientX;
			y = oevent(e).clientY;
			D(barid).onmousemove = function (e) {
				if (!drag_) {
					return false;
				}
				with (this) {
					var left= temp1 + oevent(e).clientX - x;
					if ((left+D(objid).clientWidth+5)>pane.Width)
						left=pane.Width-D(objid).clientWidth-5;
					if (left<0)
						left=0;
					 D(objid).style.left = left + "px";
					
					var top = temp2 + oevent(e).clientY -y;
					if ((top+D(objid).clientHeight)>pane.Height)
						top = pane.Height-D(objid).clientHeight;
					if (top<0)
						top=0;
					D(objid).style.top = top+ "px";
				}
				cancelBubble(e);
			};
		}
		D(barid).onmouseup = new Function("drag_=false");
	};
}
function cancelBubble(evt){
	var e=(evt)?evt:window.event;
	if (window.event) {
		e.cancelBubble=true;
	} else {
		e.preventDefault();
		e.stopPropagation();
	} 
}
function getBrowserWidth() {
	if (navigator.userAgent.indexOf("MSIE")) {
		return document.body.offsetWidth;
	}
	return window.innerWidth;
}
function hide() {
	tipdivobj.style.display = "none";
}
var tip_dynamic_page_name_time1;
function clearTimeoutO() {
	clearTimeout(tip_dynamic_page_name_time1);
}
function setto() {
	tip_dynamic_page_name_time1 = setTimeout("hide()", 1000);
}
  var tipdivobj;
  
function getBrowserWidth(){
	if (navigator.userAgent.indexOf('MSIE')){
		return document.body.offsetWidth;
	}
	return window.innerWidth;
}
function   showTip(tip)   
  { 
  	if  (typeof(tipdivobj) != "undefined") {  
  		clearTimeoutO();
  		hide();
  	}
   tipdivobj = document.getElementById(tip_dynamic_showedObjId);
   document.getElementById(tip_dynamic_innerHtmlDiv).innerHTML = tip;
   tipdivobj.style.display   =   "block"; 
  
   if(getBrowserWidth()-tip_dynamic_event_x<tipdivobj.offsetWidth)
   { 
    tipdivobj.style.left=(tip_dynamic_event_x-tipdivobj.offsetWidth)+"px" ;
   }else{
   	tipdivobj.style.left=(tip_dynamic_event_x+20)+"px" ;
   }  
   tipdivobj.style.top   =   (tip_dynamic_event_y+5)+"px" ;  
     

   
  }

function isValidPageName()
{
if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) { 
		   var domObj = xmlHttp.responseXML;
		   if(domObj){
		     var statusNodes = domObj.getElementsByTagName("valid");
	         var statusNode = statusNodes[0];
	         var status = statusNode.firstChild;
               if(status.nodeValue == "true"){
	                if(tip_dynamic_formid!=null)
	                {
	                 document.getElementById("tip_dynamic_formid").submit();
	                }else if(tip_dynamic_linkid!=null)
	                {
	                 window.location=tip_dynamic_linkid;
	                }
               }else{
                  var infoNodes = domObj.getElementsByTagName("info");
                  var infoNode = infoNodes[0];
                  var info = infoNode.firstChild;
                  var tip = info.nodeValue;
                  String.prototype.replaceAll  = function(s1,s2){return this.replace(new RegExp(s1,"g"),s2);} 
                  tip=tip.replaceAll("&lt;font","<font");
                  tip=tip.replaceAll("&lt;/font&gt;","</font>");
                  showTip(tip+"pagename.rules.tip".localize());
                  tip_dynamic_page_name_time1 = setTimeout("hide()", 1500);
               }      
		   }else{
		    alert("The format of xml data is wrong,The original data is :"+httpXML.responseText);
		   }
		}
	}
}
function isValidPageNameInBrowser(pageName)
{
	var pageNameRule = /^([.a-zA-Z0-9]|[-_]|[^\x00-\xff]){1,255}$/;
    if (!pageNameRule.exec(pageName))
    {
      return false  
    }else
    {
      return true;
    }
}