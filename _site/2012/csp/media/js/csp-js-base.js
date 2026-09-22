var dialogToTop = 80;
function addParameterForResourceURL(rawURL, paramName, paramValue) {
	var newURL = "";
	if (rawURL.indexOf('?') == rawURL.length - 1)
		newURL = rawURL + paramName + "=" + paramValue;
	else if (rawURL.indexOf('?') < 0)
		newURL = rawURL + "?" + paramName + "=" + paramValue;
	else if (rawURL.indexOf('?') > 0 && rawURL.indexOf('?') < rawURL.length - 1)
		newURL = rawURL + "&" + paramName + "=" + paramValue;
	return newURL;
};
/* BACK TO TOP */
function BackToTop(TEXT) {
	//append items
	this.fulH = $(document).height();
	this.winH = $(window).height();
	$('body').append('<div id="backToTop" title="'+TEXT+'"></div>');
	this.trigger = $('#backToTop');
	this.trigger.css('left', '80%');
	var entity = this;
	this.trigger.click(function(){
		entity.toTop();
	});
	$(window).scroll(function(){
		entity.appearance($(this).scrollTop());
	});
}
	BackToTop.prototype.appearance = function(SCRTOP) {
		if (SCRTOP > 0.2*this.winH) {
			this.trigger.fadeIn();
		}
		else {
			this.trigger.fadeOut();
		}
	};
	
	BackToTop.prototype.toTop = function() {
		$(window).scrollTop(0);
	};
/* END of BACK TO TOP */

$(document)
		.ready(
				function() {

					var backBox = new BackToTop('Top');

					
					/* 可折叠标题行为 */
					/* initiate */
					$('.csp_title-fold').next().hide();
					$('.csp_title-fold').attr('title', '点击以展开');
					$('.csp_title-expand').attr('title', '点击以收起');
					/* response */
					$('.csp_title-fold, .csp_title-expand')
							.click(
									function() {
										if ($(this).hasClass('csp_title-fold')) {
											$(this).next().slideDown();
											$(this).removeClass(
													'csp_title-fold').addClass(
													'csp_title-expand');
											$(this).attr('title', '点击以收起');
										} else if ($(this).hasClass(
												'csp_title-expand')) {
											$(this).next().slideUp();
											$(this).removeClass(
													'csp_title-expand')
													.addClass('csp_title-fold');
											$(this).attr('title', '点击以展开');
										}
									});

					/* 可折叠面板行为 */
					/* initiate */
					$('.csp_panel-fold').next().hide();
					$('.csp_panel-fold').attr('title', '点击以展开');
					$('.csp_panel-expand').attr('title', '点击以收起');
					/* response */
					$('.csp_panel-fold, .csp_panel-expand')
							.click(
									function() {
										if ($(this).hasClass('csp_panel-fold')) {
											if ($(this)
													.parent()
													.parent()
													.hasClass('csp_panel-group')) {
												/*
												 * fold other panels if marked
												 * in the same group
												 */
												$(this).parent().parent().find(
														'.csp_panel-expand')
														.click();
											}
											$(this).next().slideDown();
											$(this).removeClass(
													'csp_panel-fold').addClass(
													'csp_panel-expand');
											$(this).attr('title', '点击以收起');
										} else if ($(this).hasClass(
												'csp_panel-expand')) {
											$(this).next().slideUp();
											$(this).removeClass(
													'csp_panel-expand')
													.addClass('csp_panel-fold');
											$(this).attr('title', '点击以展开');
										}
									});

					/* 标签栏行为 */
					/* initiate */
					$('.csp_tab > ul > li, .csp_tab-ver > ul > li').each(
							function() {
								var thisIndex = $(this).parent().find('li')
										.index($(this));
								if ($(this).hasClass('csp_tab-current')) {
								} else {
									var corDiv = $(this).parent().parent()
											.find('.csp_tab-content').get(
													thisIndex);
									$(corDiv).hide();
								}
							});
					/* response */
					$('.csp_tab, .csp_tab-ver')
							.each(
									function() {
										if ($(this).hasClass('csp_tab-hover')) {
											$(this)
													.children('ul')
													.children()
													.mouseover(
															function() {
																$(this)
																		.parent()
																		.find(
																				'li')
																		.removeClass(
																				'csp_tab-current');
																$(this)
																		.parent()
																		.parent()
																		.find(
																				'.csp_tab-content')
																		.hide();
																$(this)
																		.addClass(
																				'csp_tab-current');
																var thisIndex = $(
																		this)
																		.parent()
																		.find(
																				'li')
																		.index(
																				$(this));
																var corDiv = $(
																		this)
																		.parent()
																		.parent()
																		.find(
																				'.csp_tab-content')
																		.get(
																				thisIndex);
																$(corDiv)
																		.show();
															});
										} else {
											$(this)
													.children('ul')
													.children()
													.click(
															function() {
																$(this)
																		.parent()
																		.find(
																				'li')
																		.removeClass(
																				'csp_tab-current');
																$(this)
																		.parent()
																		.parent()
																		.find(
																				'.csp_tab-content')
																		.hide();
																$(this)
																		.addClass(
																				'csp_tab-current');
																var thisIndex = $(
																		this)
																		.parent()
																		.find(
																				'li')
																		.index(
																				$(this));
																var corDiv = $(
																		this)
																		.parent()
																		.parent()
																		.find(
																				'.csp_tab-content')
																		.get(
																				thisIndex);
																$(corDiv)
																		.show();
															});
										}
									});

					/* 对话框 */
					// $('.csp_dialog-cover').hide();
					// $('.csp_dialog').hide();
					$('.csp_dialog-close, .csp_dialog-x').click(
							function() {
								csp_hideDialog($(this).parents('.csp_dialog')
										.attr('id'));
							});
					$('.csp_dialogy-close, .csp_dialog-y').click(
							function() {
								csp_hideDialog($(this).parents('.csp_dialog_ht')
										.attr('id'));
							});
					/*
					 * $(document).scroll(function(){
					 * $('.csp_dialog').each(function(){ if
					 * ($(this).css('display')!='none') { $(this).css('top',
					 * $(document).scrollTop() + dialogToTop); } }); });
					 */
					/* functions */
					// function csp_showDialog(objID) {}
					// function csp_hideDialog(objID) {}
					/* 聚光灯 */
					// $('.csp_spotLight').hide();
					$('.csp_spotLight').mouseover(function() {
					});
					/* functions */
					// function csp_spotLight(obj, stat, text, fade) {}

					/* 虚拟页面 */
					$('.csp_forgePage-content').each(
							function() {
								var indexThis = $(this).parent().find(
										'.csp_forgePage-content')
										.index($(this));
								if (indexThis == 0) {
									$(this).parents('.csp_forgePage').css(
											'height', $(this).height());
								} else {
									$(this).css('left', '100%');
								}
							});
					$('input.csp_forgePage-prev').click(
							function() {
								var $content = $(this).parents(
										'.csp_forgePage-content');
								if ($content.prev().html() != null) {
									if ($(this).parents('.csp_forgePage')
											.height() < $content.prev()
											.height()) {
										$(this).parents('.csp_forgePage')
												.animate(
														{
															height : $content
																	.prev()
																	.height()
														});
									}
									$content.animate({
										left : '100%'
									});
									// $content.prev().animate({left:'0%'});
									$content.prev().fadeIn();
								}
							});
					$('input.csp_forgePage-next').click(
							function() {
								var $content = $(this).parents(
										'.csp_forgePage-content');
								if ($content.next().html() != null) {
									if ($(this).parents('.csp_forgePage')
											.height() < $content.next()
											.height()) {
										$(this).parents('.csp_forgePage')
												.animate(
														{
															height : $content
																	.next()
																	.height()
														});
									}
									// $content.animate({left: '-100%'});
									$content.fadeOut();
									$content.next().animate({
										left : '0%'
									});
								}
							});

					/* 进度条 */
					/*
					 * $('.csp_progress > li').click(function(){
					 * $(this).parent().children('li').each(function(){
					 * $(this).removeClass('current'); });
					 * $(this).addClass('current'); });
					 */

					/* 半透明隐藏区域 */
					/*
					 * Low transparency to lower visual noise. Full transparency
					 * when focused
					 */
					$('.csp_transparency').mouseover(function() {
						$('.csp_transparency').removeClass('solid');
						$('.csp_transparency').addClass('trans');
						$(this).addClass('solid');
						$(this).removeClass('trans');
					});
				});

/* --- 自定义函数 --- */
/* 对话框 */
function csp_showDialog(objID) {
	var dialog = document.getElementById(objID);
	var posTop = $(document).scrollTop();
	var posLeft = (document.body.scrollWidth - $(dialog).width()) / 2;
	if (posLeft < 0)
		posLeft = 0;
	$('.csp_dialog-cover').css('width', $(document).width());
	$('.csp_dialog-cover').css('height', document.body.scrollHeight + 30);
	// 30 is an adjustment in FF and IE
	$(dialog).css('top', posTop + dialogToTop);
	$(dialog).css('left', posLeft);
	$('.csp_dialog-cover').show();
	$(dialog).fadeIn();
}

function csp_hideDialog(objID) {
	var dialog = document.getElementById(objID);
	// $('.csp_dialog-cover').fadeOut();
	$('.csp_dialog-cover').hide();
	$(dialog).hide();
}

/* 聚光灯 */
function csp_spotLight(obj, stat, text, fade) {
	if (typeof (obj) == 'object')
		var spotLight = obj;
	else if (typeof (obj) == 'string')
		var spotLight = document.getElementById(obj);
	$(spotLight).removeClass('csp_spotLight-success').removeClass(
			'csp_spotLight-fail').removeClass('csp_spotLight-processing');

	switch (stat) {
	case 'processing': {
		$(spotLight).addClass('csp_spotLight-processing');
		$(spotLight).html(text);
		$(spotLight).show();
		break;
	}
	case 'success': {
		$(spotLight).addClass('csp_spotLight-success');
		$(spotLight).html(text);
		$(spotLight).show();
		if (fade == 'fade')
			$(spotLight).delay(1000).fadeOut();
		break;
	}
	case 'fail': {
		$(spotLight).addClass('csp_spotLight-fail');
		$(spotLight).html(text);
		$(spotLight).show();
		if (fade == 'fade')
			$(spotLight).delay(2000).fadeOut();
		break;
	}
	case 'show': {
		$(spotLight).slideDown();
		break;
	}
	case 'hide': {
		$(spotLight).fadeOut();
		break;
	}
	}// end of switch
}

/** 实现starWith和endWith */
String.prototype.endWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
}

String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
}
