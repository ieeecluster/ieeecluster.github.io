
var timeOutVar = null;

function findPosition( oElement )   
{  
   var x2 = 0;  
   var y2 = 0;  
   var width = oElement.offsetWidth;  
   var height = oElement.offsetHeight;  
   if( typeof( oElement.offsetParent ) != 'undefined' )   
   {  
     for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent )   
     {  
       posX += oElement.offsetLeft;  
       posY += oElement.offsetTop;        
     }  
     x2 = posX + width;  
     y2 = posY + height;  
     return [ posX, posY ,x2, y2];  
       
     } else{  
       x2 = oElement.x + width;  
       y2 = oElement.y + height;  
       return [ oElement.x, oElement.y, x2, y2];  
   }  
}  

function showPopup(homepage, user, obj, position) {	
	if (timeOutVar != null) {
		window.clearInterval(timeOutVar);
		timeOutVar = null;
	}
	$('homepage').href = homepage;
	if ($('sendinfo'))
		$('sendinfo').href = "javascript:sendInfo('" + user + "')";	
	$('mailto').href = 'Mailto:' + user;
	
	$('info-signature').checked = false;
	var popup = $('#info-commpopup');
	var width = popup.width();
	var height = popup.height();

	if ((getL(obj) + 120) >= (window.screen.width + $(window).scrollLeft()))
		popup.css('left', getL(obj)-20 + 'px');
	else
		popup.css('left', getL(obj) + 20 + 'px');
	
	if ((getT(obj) + 12) >= (window.screen.height + $(window).scrollTop() - height))
		popup.css('top',getT(obj) - height - 20 + 'px');
	else{
		if ($('sendinfo'))
			popup.css('top', getT(obj) - 55 + 'px');
		else
			popup.css('top', getT(obj) - 45 + 'px');
				
		//popup.style.left = getL(obj) - 310 + 'px';
		//popup.style.top = getT(obj) - 210 + 'px';
	}
	//show popup
	popup.css("display", "block");
}

function hidePopup() {
	if (timeOutVar != null)
		window.clearInterval(timeOutVar);
	timeOutVar = window.setInterval("$('#info-commpopup').css('display','none')", 500);
}

function samewithspan() {
	if (timeOutVar != null) {
		window.clearInterval(timeOutVar);
		timeOutVar = null;
	}	
	var popup = $('info-commpopup');
	//set position
	//popup.style.left = getL(obj) + 10 + 'px';
	//popup.style.top = getT(obj) + 15 + 'px';
	
	//show popup
	popup.css('display','block');
}

function sendInfo(user) {
	//$('info-signature').value = '';
	$('info-message').value = '';
	$('charsmonitor').innerHTML = '200';
	
	var overwrite = $('window-overwrite');
	//if (window.getScrollHeight() <= window.screen.height) {
		overwrite.style.height = window.getScrollHeight()<=window.screen.height? window.screen.width + 'px':window.getScrollHeight() + 'px';
		overwrite.style.width = window.getScrollWidth()<=window.screen.width? window.screen.width + 'px':window.getScrollWidth() + 'px';
	//}
	//else {
	//	overwrite.style.width = window.getScrollWidth() + 'px';
//		overwrite.style.height = window.getScrollHeight() + 'px';
	//}
	
	//opacity
	if (isIe()) {
		overwrite.style.filter = 'alpha(opacity=50)';
	}
	else {
		overwrite.style.opacity = '0.5';
	}
	overwrite.style.display = 'block';
	
	var sendinfo = $('window-sendinfo');
	sendinfo.style.left = window.getScrollLeft() + (window.screen.width - sendinfo.style.width.substring(0, sendinfo.style.width.indexOf('px')))/2 - 50 +  'px';
	//sendinfo.style.left = (window.screen.availWidth - sendinfo.style.width.substring(0, sendinfo.style.width.indexOf('px')))/2 -50 + 'px';
	//sendinfo.style.top = '180px';
	sendinfo.style.top = window.getScrollTop() + (window.screen.height - sendinfo.style.height.substring(0, sendinfo.style.width.indexOf('px')))/2 - 100 + 'px';
	sendinfo.style.display = 'block';
	//window.scroll(sendinfo.style.left, sendinfo.style.top);	
	$('info-username').value = user;
	
	getMobile(user);
}

function closewindow() {
	$('window-sendinfo').style.display = 'none';
	$('window-overwrite').style.display = 'none';
}

function getMobile(user) {
	var ajaxurl = "servlet/SendSMSServlet?timeStamp=" + new Date().getTime();
	var queryString = buildQueryMobileString(user);
	send_request("post", ajaxurl, queryString, "XML", getMobileResult);
}

function buildQueryMobileString(user) {
	var queryString = "command=querymobile&user=" + encodeURIComponent(user);
    return queryString;
}

function getMobileResult() {
	if (xmlHttp.readyState == 4) { // judge object status
		if (xmlHttp.status == 200) { // success
			var doc = xmlHttp.responseXML;
			var sysTags = doc.getElementsByTagName("Success");
 			
 			if ((sysTags!=null) && (sysTags.length!=0)) {
	 			for (var i = 0; i < sysTags.length; i++)
				{
					var tag = sysTags[i];
					if(isIe()){
						var info = (tag.childNodes[0].firstChild==null)?"&nbsp;":tag.childNodes[0].firstChild.nodeValue;
					}else{
						//(i+1)*2 -1
						var info = (tag.childNodes[1].firstChild==null)?"&nbsp;":tag.childNodes[1].firstChild.nodeValue;
					}
				}
 			}
  	 		
 			//Error
 			var errorTags = doc.getElementsByTagName("Error");
 			if ((errorTags!=null) && (errorTags.length!=0)) {
 				for (var i=0; i<errorTags.length; i++) {
 					var tag = errorTags[i];
 					if(isIe()){
						var errorCode = (tag.childNodes[0].firstChild==null)?"&nbsp;":tag.childNodes[0].firstChild.nodeValue;
					}else{
						//(i+1)*2 -1
						var errorCode = (tag.childNodes[1].firstChild==null)?"&nbsp;":tag.childNodes[1].firstChild.nodeValue;
					}
					alert(errorCode.localize());
					closewindow();
 				}
 			}
		}
	}
}	

function onCharsChange(varField) {
		var monitor = $('charsmonitor');
		var msg = varField;

		//var signature = $('info-signature');
		var message = $('info-message');
		
		//var leftChars = getLeftChars(signature, message);
		var leftChars = getLeftChars(message);
		if (leftChars >= 0) {
			monitor.innerHTML = leftChars;
			return true;
		} else {
			monitor.innerHTML = "0";
			window.alert("error.sms.exceed".localize());
			var len = msg.value.length + leftChars;
			msg.value = msg.value.substring(0, len);
			leftChars = getLeftChars(msg);
			if (leftChars >= 0) {
				monitor.innerHTML = leftChars;
			}
			return false;
		}

	};
	//function getLeftChars(varField, varField1){
	function getLeftChars(varField1){
		var counter = 0;
		var cap = 200;

		var special = 0;
		
		for (var i = 0; i < varField1.value.length; i++) {
			if (varField1.value.charCodeAt(i) > 127) {
				cap = 100;
			}
			else if (varField1.value.charCodeAt(i) == 94) {
				special ++;
			}
		}
		
		var leftchars = cap;
		if (cap==100) {
		 	leftchars = cap - varField1.value.length;//varField.value.length -
		}
		else
			leftchars = cap - varField1.value.length - special;
		return (leftchars);
	}
	
function isIe(){
   var i=navigator.userAgent.toLowerCase().indexOf("msie");
   //alert(navigator.userAgent.toLowerCase());
   return i>=0;
}
function isFireFox(){
    var i=navigator.userAgent.toLowerCase().indexOf("firefox");
	return i>=0;
}
	
function getL(e){
	var l = e.offsetLeft;
	while (e = e.offsetParent)
		l += e.offsetLeft;
	return l;
}
function getT(e){
	var t = e.offsetTop;
	while (e = e.offsetParent)
		t += e.offsetTop;
	return t;
}

function sendSMSAjax() {
	var message, signature;
	var signature = $('info-signature');
	var check = 'off';
	if (signature.checked)
		check = 'on';
	else
		check = 'off';
	var message = $('info-message');
	var user = $('info-username'); 
		
    if (message.value.length == 0) {
    	alert('error.sms.empty'.localize());
    	message.focus();
    	return;
	}
	
	var ajaxurl = "servlet/SendSMSServlet?timeStamp=" + new Date().getTime();
	var queryString = buildQueryString(message.value, check, user.value);
	send_request("post", ajaxurl, queryString, "XML", getSMSResult);
}

function buildQueryString(message, signature, user) {
	var queryString = "command=send&user=" + encodeURIComponent(user) + "&message=" + encodeURIComponent(message) +  "&signature=" + encodeURIComponent(signature);
    return queryString;
}

function getSMSResult() {
	if (xmlHttp.readyState == 4) { // judge object status
		if (xmlHttp.status == 200) { // success
			var doc = xmlHttp.responseXML;
			var sysTags = doc.getElementsByTagName("Success");
 			
 			if ((sysTags!=null) && (sysTags.length!=0)) {
	 			for (var i = 0; i < sysTags.length; i++)
				{
					var tag = sysTags[i];
					if(isIe()){
						var info = (tag.childNodes[0].firstChild==null)?"&nbsp;":tag.childNodes[0].firstChild.nodeValue;
					}else{
						//(i+1)*2 -1
						var info = (tag.childNodes[1].firstChild==null)?"&nbsp;":tag.childNodes[1].firstChild.nodeValue;
					}
					closewindow();
					alert(info);
				}
 			}
  	 		
 			//Error
 			var errorTags = doc.getElementsByTagName("Error");
 			if ((errorTags!=null) && (errorTags.length!=0)) {
 				for (var i=0; i<errorTags.length; i++) {
 					var tag = errorTags[i];
 					if(isIe()){
						var errorCode = (tag.childNodes[0].firstChild==null)?"&nbsp;":tag.childNodes[0].firstChild.nodeValue;
					}else{
						//(i+1)*2 -1
						var errorCode = (tag.childNodes[1].firstChild==null)?"&nbsp;":tag.childNodes[1].firstChild.nodeValue;
					}
					alert(errorCode.localize());
 				}
 			}
		}
	}
}	
	