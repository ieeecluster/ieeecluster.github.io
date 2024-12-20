/*VLAB Common javascript create by www.cerc.cnic.cn  09-4-17
*	context list:
*   (1)get Browser's Type common function (line 11)
*	(2)dct fullscreen style function (line 50)
*   (3)javascript's cookie common function (line 100)
*   (4)js map struct (line 134)
*	(5)Fix Dom Tree(line 134)
*/

/*add by xiejianjun 09-8-27*/
function modifyUserbox(width){
	var pos = getElementPos('header');
	var userbox=document.getElementById('DCT_Login_di');
	if (width!=null){
		userbox.left=userbox.style.left-20;
		//add by diyanliang  上述计算有误差20px 导致出现在1024下出现横向滚动条
		userbox.top=userbox.style.top;
		userbox.style.left=null;
		userbox.style.right=0;
	}else{
		var offsetWidth=document.getElementById('header').offsetWidth;
		userbox.style.left=(pos.x+offsetWidth-userbox.offsetWidth)-20+'px';
		//add by diyanliang  上述计算有误差20px 导致出现在1024下出现横向滚动条
		userbox.style.top=0+'px';
		userbox.style.right=null;
	}
}
/*get Browser's Type 09-4-17 diyanliang@cnic.cn*/
var getBrowser=function (){
	var OsObject = "";
	if(navigator.userAgent.indexOf("MSIE")>0) {
		return "MSIE";
	}
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
		return "Firefox";
	}
	if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
		return "Safari";
	}
	if(isCamino=navigator.userAgent.indexOf("Camino")>0){
		return "Camino";
	}
	if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
		return "Gecko";
	}
	return "Unknown";
} 

/*get Browser's Height  & Width 09-4-17 diyanliang@cnic.cn*/
var GetViewPaneSize=function (elementId){
	var realheight=document.getElementById(elementId).clientHeight;
	var browser=getBrowser();
	if(browser=="MSIE"){
		var oSizeSource ;
		var oDoc = window.document.documentElement ;
		if ( oDoc && oDoc.clientWidth )	{
			oSizeSource = oDoc ;// IE6 Strict Mode
		}else{
			oSizeSource = top.document.body ;// Other IEs
		}					
		return { Width : oSizeSource.clientWidth, Height : oSizeSource.clientHeight-30>realheight?oSizeSource.clientHeight-26:realheight } ;
	}else if(browser=="Firefox"){
		return { Width : window.innerWidth-18, Height : window.innerHeight>realheight?window.innerHeight:realheight } ;
	}
}
/*add by xiejianjun 09-8-27*/
var dct_events = {
	adapters:new Array(),
	addListener:function(listener){
		if (listener!=null)
			this.adapters[this.adapters.length]=listener;
	},
	onFullScreen:function(width, height){
		for (var i=0;i<this.adapters.length;i++){
			this.adapters[i].onFullScreen(width, height);
		}
	},
	onCancelFullScreen:function(){
		for (var i=0;i<this.adapters.length;i++){
			this.adapters[i].onCancelFullScreen();
		}
	}
};
/* check Html's fullscreen style when button onclick09-4-20 diyanliang@cnic.cn*/
var changeFullScreen=function (elementId,cancelfullscrbutton,fullscrbutton){
	var cookievalue =getCookie("fullscr");
	if(cookievalue=="true"){
		cancelFullScreen(elementId,fullscrbutton);
	}else{
		doFullScreen(elementId,cancelfullscrbutton);
	}
}

/*do fullscreen style 09-4-20 diyanliang@cnic.cn*/
var doFullScreen=function (elementId,cancelfullscrbutton){
	var obje=GetViewPaneSize(elementId)
	hidebox('header');
	hidebox('nav');
	hidebox('leftcol');
	hidebox('box');
	hidebox('breadcrumbs');
	
	var login_height=document.getElementById("DCT_Login_di").clientHeight+11;
	var element=document.getElementById(elementId);
	element.style.zIndex="9";
	element.style.position="absolute";
	element.style.width=obje.Width+"px";
	element.style.height=obje.Height-login_height+"px";
	element.style.left="0px";
	element.style.top="0px";
	element.style.paddingTop=login_height+"px";
	element.style.backgroundColor="#F8F8F5";
	element.style.marginTop="0px";
	document.getElementById("FullScrA").innerHTML=cancelfullscrbutton;
	modifyUserbox(obje.Width);
	dct_events.onFullScreen(obje.Width, obje.Height);
	
	setCookie("fullscr","true");
}

/*cancel fullscreen style 09-4-20 diyanliang@cnic.cn*/
var cancelFullScreen=function (elementId,fullscrbutton){
	showblock("header");
	showblock("nav");
	showblock("leftcol");
	showblock("box");
	showblock("breadcrumbs");
	var browser=getBrowser();
	if(browser=="MSIE"){
		document.getElementById(elementId).style.cssText="";
	}else{
		document.getElementById(elementId).removeAttribute("style");
	}
	document.getElementById("FullScrA").innerHTML=fullscrbutton;
	modifyUserbox();
	dct_events.onCancelFullScreen();
	
	delCookie("fullscr");
}
/*add by xiejianjun 09-8-27*/
function hidebox(domid){
	var box = document.getElementById(domid);
	if (box!=null)
		box.style.display='none';
}
/*add by xiejianjun 09-8-27*/
function showblock(domid){
	var box =document.getElementById(domid);
	if (box!=null)
		box.style.display='block';
}

/* check fullscreen style when  html init 09-4-20 diyanliang@cnic.cn*/
var initHTMLforFullScr=function (cancelfullscrbutton){
	var cookievalue =getCookie("fullscr");
	if(cookievalue=="true"){
		doFullScreen('center_right',cancelfullscrbutton);
	}
}

/*set cookie 09-4-20 diyanliang@cnic.cn*/
var setCookie=function (name, value) { 
    var argv = setCookie.arguments; 
    var argc = setCookie.arguments.length; 
    var expires = (argc > 2) ? argv[2] : null; 
    if(expires!=null) { 
        var LargeExpDate = new Date (); 
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));         
    } 
    document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString())); 
}

/*delete cookie by name 09-4-20 diyanliang@cnic.cn*/
var delCookie=function (name){
  var expdate = new Date(); 
  expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
  setCookie(name, "", expdate); 
}

/*get cookie by name 09-4-20 diyanliang@cnic.cn*/
var getCookie=function (name){ 
    var search = name + "=" 
    if(document.cookie.length > 0){ 
        offset = document.cookie.indexOf(search) 
        if(offset != -1){ 
            offset += search.length 
            end = document.cookie.indexOf(";", offset) 
            if(end == -1) end = document.cookie.length 
            return unescape(document.cookie.substring(offset, end)) 
        } 
        else return "" 
    } 
} 

/* js map struct 09-5-15 diyanlian@cnic.cn*/
var VLAB_Map = function() {  
	 this.m=new Array();
}
VLAB_Map.MapEntry=function(k,v){
    this.key=k;
    this.value=v;
    this.keyEquals=function(key2){
        if(this.key==key2){
            return true;
        }else{
            return false;
        }
    }
};

VLAB_Map.prototype={
	test:function(){
	alert("VLAB_Map!!!!!!!");
	},
    put:function(k,v){
        var newEntry=new VLAB_Map.MapEntry(k,v);
        for(var i=0;i<this.m.length;i++){
            var entry=this.m[i];
            if(entry.keyEquals(k)){
                return;
            }
        }
        this.m.push(newEntry);        
    },
    get:function(k){
        for(var i=0;i<this.m.length;i++){
            var entry=this.m[i];
            if(entry.keyEquals(k)){
                return entry.value;
            }
        }
        return null;
    },
    remove:function(k){
        var entryPoped;
        for(var i=0;i<this.m.length;i++){
            entryPoped=this.m.pop();
            if(entryPoped.keyEquals(k)){
                break;
            }else{
                this.m.unshift(entryPoped);
            }
        }
    }
    ,
    getSize:function(){
        return this.m.length;
    },
    getKeys:function(){
        var keys=new Array();
        for(var i=0;i<this.m.length;i++){
            keys.push(this.m[i].key);
        }
        return keys;
    },
    getValues:function(){
        var values=new Array();
        for(var i=0;i<this.m.length;i++){
            values.push(this.m[i].value);
        }
        return values;
    },
    isEmpty:function(){
        return (this.m==null||this.m.length<=0);
    },
    containsKey:function(k){
        for(var i=0;i<this.m.length;i++){
            if(this.m[i].keyEquals(k))
                return true;
        }
        return false;
    },
    putAll:function(map){
        if(map==null||typeof map!="object"){
            alert("the object to be put should be a valid object");
        }
        for(var i=0;i<map.getSize();i++){
            this.put(map.m[i].key,map.m[i].value);
        }
    }
};

//add by diyanliang DMLForm提交按钮检查
function check_DML_Input(obj){
	var  arrobj=document.getElementsByTagName("input");
	for(i=0;i<arrobj.length;i++){
		if(arrobj[i].getAttribute("allnulltype")=="false"){
			if(!arrobj[i].value){
				alert(arrobj[i].getAttribute('dmldesc')+" must be not null!")
				return ;
			}
		}
	}
	obj.submit();
	/*alert("goon")
	var  arrform=document.getElementsByTagName("form")
	for(i=0;i<arrform.length;i++){
			//alert(arrform[i].outerHTML)
	}
	var pFORM=findParent(obj,"FORM");
	if(pFORM.nodeName=="FORM"){
		pFORM.submit();
	}*/
	
}
//add by diyanliang 查看上级元素是否有传入的参数
function findParent(obj,pname){

	//alert(obj.parentNode.nodeName)
	while(obj.nodeName!=pname){
		obj=obj.parentNode;
	}
	return obj;
}


$(document).ready(function() {
	/*左菜单树 start dylan 2010-7-16*/
	var menuParents = $("div#DCT_viewcontent,.DCT_bar");
	$(".DCT_leftmenu>li>ul", menuParents).not( $(".DefaultShow") ).css("display", "none");//二级菜单隐藏
	$(".DCT_leftmenu_mutex>li>ul", menuParents).not( $(".DefaultShow") ).css("display", "none");//二级菜单隐藏
	var obj=$(".DCT_leftmenu>li", menuParents);
	obj.each(function(i){
		odiv=document.createElement("div");
		odiv.style.cssText="cursor:pointer;"
		firstnode=this.childNodes[0];
		cloneNode=firstnode.cloneNode(true);
		if(firstnode.nodeType==3){
			odiv.innerHTML=firstnode.nodeValue;
		}else{
			odiv.appendChild(cloneNode);
		}
		this.replaceChild(odiv,this.childNodes[0]);
		odiv.onclick=function(){
			var displaytype=$(this).parent().find("ul").css("display");
			$(this).parent().find("ul").css("display",(displaytype=='none')?"block":"none");
		}
	})
	
	
	var obj=$(".DCT_leftmenu_mutex>li", menuParents)
	obj.each(function(i){
		odiv=document.createElement("div");
		odiv.style.cssText="cursor:pointer;"
		firstnode=this.childNodes[0];
		cloneNode=firstnode.cloneNode(true);
		if(firstnode.nodeType==3){
			odiv.innerHTML=firstnode.nodeValue;
		}else{
			odiv.appendChild(cloneNode);
		}
		this.replaceChild(odiv,this.childNodes[0]);
		odiv.onclick=function(){
			$(".DCT_leftmenu_mutex>li>ul", menuParents).css("display", "none");
			var displaytype=$(this).parent().find("ul").css("display");
			$(this).parent().find("ul").css("display",(displaytype=='none')?"block":"none");
		}
	})
	
	/*顶菜单下拉列表 dylan 2010-7-16*/
	var topmenuParents = $(".DCT_nav,div#DCT_viewcontent");
	$(".DCT_topmenu>li>ul", topmenuParents).css({display:'none', visibility:'visible',position: 'absolute'});//二级菜单隐藏
	$(".DCT_topmenu>li>ul>li",topmenuParents).css({display: 'list-item',float: 'none'});
	var obj=$(".DCT_topmenu>li",topmenuParents)
	obj.each(function(i){
		odiv=document.createElement("div");
		odiv.style.cssText="cursor:pointer;"
		firstnode=this.childNodes[0];
		cloneNode=firstnode.cloneNode(true);
		if(firstnode.nodeType==3){
			odiv.innerHTML=firstnode.nodeValue;
		}else{
			odiv.appendChild(cloneNode);
		}
		this.replaceChild(odiv,this.childNodes[0]);
		this.onmouseover=function(){
			$(this).find("ul").css({display:'block', visibility:'visible'})
		}
		this.onmouseout=function(){
			$(this).find("ul").css({display:'none', visibility:'visible'})
		}
	})
	
	
	/*切换语言栏链接*/
	var oDCT_locale_enus=$(".DCT_enus")
	oDCT_locale_enus.each(function(i){
		m_href=this.href;
		this.onclick=function(){
			change_locale('en_US',contextPath,m_href)
			//window.location=m_href;
			
		}
		
		
	})
	
	var oDCT_locale_enus=$(".DCT_zhcn")
	oDCT_locale_enus.each(function(i){
		m_href=this.href;
		this.onclick=function(){
			change_locale('zh_CN',contextPath,m_href)
			//window.location=m_href;
			
		}
		
		
	})
	
	
})

/* I18N dylan 2010-7-20*/
String.prototype.localize=function(){
	var s = LocalizedStrings["javascript."+this], args = arguments;
	if(!s) return("???" + this + "???");
	return s.replace(/\{(\d)\}/g, function(m){ 
		return args[m.charAt(1)] || "???"+m.charAt(1)+"???";
	});
}

String.prototype.trim = function() { 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 


/*滚动图片效果 Dylan*/
function sendImageScrollajax(name){
	var strpath=""
	var img=$("#"+name)
	img.each(function(i){
		strpath+=this.id+":"+this.getAttribute("path")+"|";
	})
	$.ajax({
	   type: "POST",
	   url: Wiki["BaseUrl"]+"/ImgScrService.do",
	   data: "path="+strpath,
	   dataType:"text",
	   success: function(msg){
	   		imageScrollCallBack(msg,name);
	   }
	});
}
/*滚动图片效果 Dylan*/
function imageScrollCallBack(msg,name){
	var obj=document.getElementById(name);
	if(obj){
		eval(msg)
		var img=$("#"+name)
		img.each(function(i){
			if(!this.imgid)this.imgid=0;
			var list=eval(this.id);
			this.lh=eval(this.id).length;
			if(this.imgid>=this.lh){
				this.imgid=0;
			}
//			this.src=list[this.imgid]+"?ver="+Math.random();
			this.src=list[this.imgid];
			this.imgid++;
			
			this.onload = function(){
				
				$(this).css("width", "auto"); // 设定实际显示宽度
			    $(this).css("height", "auto");  // 设定等比例缩放后的高度
				/*增加图片缩放功能*/
				this.removeAttribute("style");
				var maxWidth = this.getAttribute("maxWidth"); // 图片最大宽度
			    var maxHeight = this.getAttribute("maxHeight");   // 图片最大高度
			    indentwidth=parseInt(maxWidth/10)
			    indentheight=parseInt(maxHeight/10)
			    maxWidth=maxWidth-10;
			    maxHeight=maxHeight-10;
//			    alert(maxWidth+"|"+maxHeight)
			    var ratio = 0;  // 缩放比例
			    var width = $(this).width();    // 图片实际宽度
			    var height = $(this).height();  // 图片实际高度
//			    alert("1|maxWidth="+maxWidth+"|maxHeight="+maxHeight+"|width="+width+"|height="+height)
			    // 检查图片是否超宽
			    if(width > maxWidth){
			        ratio = maxWidth / width;   // 计算缩放比例
			        
			        $(this).css("width", maxWidth+"px"); // 设定实际显示宽度
			        $(this).css("height", height * ratio+"px");  // 设定等比例缩放后的高度
			        width=maxWidth;
			        height=height * ratio;
			    }
//			    alert("2|maxWidth="+maxWidth+"|maxHeight="+maxHeight+"|width="+width+"|height="+height)
			    // 检查图片是否超高
			    if(height > maxHeight){
			        ratio = maxHeight / height; // 计算缩放比例
			        $(this).css("height", maxHeight+"px");   // 设定实际显示高度
			        $(this).css("width", width * ratio+"px");    // 设定等比例缩放后的高度
			        width=width * ratio;
			        height=maxHeight;
			    }
//			    alert("3|maxWidth="+maxWidth+"|maxHeight="+maxHeight+"|width="+width+"|height="+height)
		        
			    	
			}

			
		});
	}
	
}

/*自动缩放image dylan*/
function changeimg(strobj){
	
	obj=document.getElementById(strobj);
	obj.onload = function(){
		
		$(this).css("width", "auto"); // 设定实际显示宽度
	    $(this).css("height", "auto");  // 设定等比例缩放后的高度
		/*增加图片缩放功能*/
		this.removeAttribute("style");
		var maxWidth = this.getAttribute("maxWidth"); // 图片最大宽度
	    var maxHeight = this.getAttribute("maxHeight");   // 图片最大高度
	    indentwidth=parseInt(maxWidth/10)
	    indentheight=parseInt(maxHeight/10)
	    maxWidth=maxWidth-10;
	    maxHeight=maxHeight-10;
//	    alert(maxWidth+"|"+maxHeight)
	    var ratio = 0;  // 缩放比例
	    var width = $(this).width();    // 图片实际宽度
	    var height = $(this).height();  // 图片实际高度
//	    alert("1|maxWidth="+maxWidth+"|maxHeight="+maxHeight+"|width="+width+"|height="+height)
	    // 检查图片是否超宽
	    if(width > maxWidth){
	        ratio = maxWidth / width;   // 计算缩放比例
	        
	        $(this).css("width", maxWidth+"px"); // 设定实际显示宽度
	        $(this).css("height", height * ratio+"px");  // 设定等比例缩放后的高度
	        width=maxWidth;
	        height=height * ratio;
	    }
//	    alert("2|maxWidth="+maxWidth+"|maxHeight="+maxHeight+"|width="+width+"|height="+height)
	    // 检查图片是否超高
	    if(height > maxHeight){
	        ratio = maxHeight / height; // 计算缩放比例
	        $(this).css("height", maxHeight+"px");   // 设定实际显示高度
	        $(this).css("width", width * ratio+"px");    // 设定等比例缩放后的高度
	        width=width * ratio;
	        height=maxHeight;
	    }
//	    alert("3|maxWidth="+maxWidth+"|maxHeight="+maxHeight+"|width="+width+"|height="+height)
        
	    	
	}
    
    	
}
