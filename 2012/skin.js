$(document).ready(function() {
	/*左菜单树 start dylan 2010-7-16*/
	$(".DCT_leftmenu>li>ul").css("display", "none");//二级菜单隐藏
	var obj=$(".DCT_leftmenu>li")
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
	
	/*顶菜单下拉列表*/
	$(".DCT_topmenu>li>ul").css({display:'none', visibility:'visible',position: 'absolute'});//二级菜单隐藏
	$(".DCT_topmenu>li>ul>li").css({display: 'list-item',float: 'none'});
	var obj=$(".DCT_topmenu>li")
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
	
})

