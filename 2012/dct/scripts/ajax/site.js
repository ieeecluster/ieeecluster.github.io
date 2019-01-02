var site = {
	baseurl:"",
	viewport:"page/",
	init:function(baseurl){
		if (baseurl){
			this.baseurl=new String(baseurl);
			if (!this.endWith("/"))
				this.baseurl=this.baseurl+"/";
		}
	},
	endWith:function(bematch){
		if (bematch){
			var len = this.baseurl.length;
			var str=this.baseurl.substr(len - bematch.length);
			return str==bematch;
		}
		return true;
	},
	getViewURL:function(pageid){
		return this.baseurl+this.viewport+pageid;
	},
	getEditURL:function(pageid){
		return this.baseurl+this.viewport+pageid+"?a=edit";
	},
	getJSPURL: function(jsp){
		return this.baseurl+jsp;
	}
};