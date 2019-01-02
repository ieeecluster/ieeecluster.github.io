/**
 * @author xiejj@cnic.cn
 */

/**
 * 创建一个I18n管理工具
 * @param {String} prefix
 * @param {Object} bundle
 */
function I18nManager(prefix, bundle){
	this.preifx=prefix;
	this.bundle=bundle;
	/**
	 * 翻译一个字符串
	 * @param {String} str
	 */
	this.localize = function(str){
		var s = (this.bundle==null?null:this.bundle[this.preifx+str]);
		if(!s) return("???" + str + "???");
		return s;
	}
}
