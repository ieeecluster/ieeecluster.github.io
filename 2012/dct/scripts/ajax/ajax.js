
//定义XMLHttpRequest对象实例
var xmlHttp = false;
//定义可复用的http请求发送函数
function send_request(method,url,content,responseType,callback) {//初始化、指定处理函数、发送请求的函数
	xmlHttp = false;
	//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) { //Mozilla 浏览器
		xmlHttp = new XMLHttpRequest();
		if (xmlHttp.overrideMimeType) {//设置MiME类别
			xmlHttp.overrideMimeType("text/xml");
		}
	}
	else if (window.ActiveXObject) { // IE浏览器
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!xmlHttp) { // 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	if(responseType.toLowerCase()=="text") {
		//xmlHttp.onreadystatechange = processTextResponse;
		xmlHttp.onreadystatechange = callback;
	}
	else if(responseType.toLowerCase()=="xml") {
		//xmlHttp.onreadystatechange = processXMLResponse;
		xmlHttp.onreadystatechange = callback;
	}
	else {
		window.alert("响应类别参数错误。");
		return false;
	}
	// 确定发送请求的方式和URL以及是否异步执行下段代码
	if(method.toLowerCase()=="get") {
		xmlHttp.open(method, url, true);
	}
	else if(method.toLowerCase()=="post") {
		xmlHttp.open(method, url, true);
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	else {
		window.alert("http请求类别参数错误。");
		return false;
	}
	xmlHttp.send(content);
}
// 处理返回文本格式信息的函数
function processTextResponse() {
	if (xmlHttp.readyState == 4) { // 判断对象状态
		if (xmlHttp.status == 200) { // 信息已经成功返回，开始处理信息
			//alert(xmlHttp.responseText);
			alert("Text文档响应。");
		} else { //页面不正常
			alert("您所请求的页面有异常。");
		}
	}
}
//处理返回的XML格式文档的函数
function processXMLResponse() {
	if (xmlHttp.readyState == 4) { // 判断对象状态
		if (xmlHttp.status == 200) { // 信息已经成功返回，开始处理信息
			//alert(xmlHttp.responseXML);
			alert("XML文档响应。");
		} else { //页面不正常
			alert("您所请求的页面有异常。");
		}
	}
}

//test ajax.js
function testajax(){
	alert("testajax")
}

