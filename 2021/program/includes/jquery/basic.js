// We use a counter at the end of this file name to flush people's browser cache.

// This helps us resize an element when its contents change or are resized. Needs improvement. Use like:
// $('#foo').on("DOMSubtreeModified show hide", function() { do resizing here });
(function($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function() {
            var ans = el.apply(this, arguments);
            this.trigger(ev);
            return ans;
        };
    });
})(jQuery);


// Jump to the 'value' of the select-list option.
// use like this: <select onChange=jumpToSelectedValue(this)>...
function jumpToSelectedValue(selObj) {
    eval("parent.location='" + selObj.options[selObj.selectedIndex].value + "'");
}

// Jump to the 'id' of the select-list option.
// use like this: <select onChange=jumpToSelectedId(this)>...
function jumpToSelectedId(selObj) {
    //eval("parent.location='" + selObj.options[selObj.selectedIndex].id + "'");
    eval("document.location='" + selObj.options[selObj.selectedIndex].id + "'");
    eval("location.href = '" + selObj.options[selObj.selectedIndex].id + "'");
}


// DEPRECATED
function count_words(textfield, countfield) {
    var val = textfield.value.replace(/^\s+/g, "").replace(/\s+$/g, "");
    if (val) { val = val + ' '; }
    countfield.value = val.split(/\s+/).length - 1;
}


// This isn't treating html tags exactly like our python word count is.
function count_words_jq(textfield_name, countfield_id) {
    var field = $("[name='"+textfield_name+"']")

    val = field.attr("value").replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/<br \/>/g, " ");
    if (val) { val = val + ' '; }
    /* countfield.value = val.split(/\s+/).length - 1; */
    $("#"+countfield_id).html(val.split(/\s+/).length - 1);
}


function count_chars_jq(textfield_name, countfield_id) {
    var val = $("[name='"+textfield_name+"']").attr("value").replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/<br \/>/g, " ");
    $("#"+countfield_id).html(val.length);
}


function _____FILE_SIZE_ERROR_DETECTION______() {}


// Taken and modified from http://stackoverflow.com/questions/3717793/javascript-file-upload-size-validation

function get_file_size(file_field) {
	var file;

	// (Can't use `typeof FileReader === "function"` because apparently
	// it comes back as "object" on some browsers. So just see if it's there
	// at all.)
	if (!window.FileReader) {
	    return 0;
	}

	// We don't want the jquery object.
	var input = file_field[0];

	if (!input) {
		return 0;
	}
	else if (!input.files) {
		return 0;
	}
	else if (!input.files[0]) {
		return 0;
	}
	else {
	    file = input.files[0];
		return file.size;
	}
}


function check_file_size(event) {
	var file_field = $(event.target);
	var max_bytes = parseInt(file_field.attr('max_bytes'));

	if (max_bytes != NaN) {
		if (max_bytes == 0) {
			return;
		}
		var file_size = get_file_size(file_field);
		if (file_size > max_bytes) {
			alert('This file is too large. It is ' + readable_file_size(file_size) + ' but should not exceed ' + readable_file_size(max_bytes) + '.');
			file_field.val('');
			return false;
		}
	}
}


function readable_file_size(size) {
    if (size < 1024) {
		// Write it in bytes.
        return size.toString() + "B";
    } else {
        size = size / 1024.0
        if (size < 1024) {
			size = Math.round(size * 100) / 100
	        return size.toString() + "KB";
        } else {
            size = size / 1024.0
			size = Math.round(size * 100) / 100
	        return size.toString() + "MB";
		}
    }
}

// Set up the change handler for file fields.
$(function() {
	$(document).on('change', 'input:file', check_file_size);
})


function expandcollapse(id) {
	if (document.getElementById) {
	    // DOM3 = IE5, NS6
        id_style = document.getElementById(id).style;
        if(id_style.display == 'none') {
            id_style.display = ''; // visible (default inline/block for element)
        } else {
            id_style.display = 'none';
        }
	} else {
	    // Apparently this works for some browsers.
		if (document.layers) {
			if (document.id.display == "none") {
				document.id.display = 'block';
				filter(("img"+id),'imgin');
			} else {
				filter(("img"+id),'imgout');
				document.id.display = 'none';
			}
		} else {
			if (document.all.id.style.visibility == "none") {
				document.all.id.style.display = 'block';
			} else {
				filter(("img"+id),'imgout');
				document.all.id.style.display = 'none';
			}
		}
	}
}


function expandcollapse3(id) {
    expandcollapse(id);
    expandcollapse(id + '_show_span');
    expandcollapse(id + '_hide_span');
}


// DEPRECATED.
function getElementsByClass(strTagName, strClassName) {
	var arrElements = (strTagName == "*" && document.all)? document.all : document.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/-/g, "\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}


function expandcollapse_multi(tag_class) {
    var els = getElementsByClass('*', tag_class);
    for (var i=0; i<els.length; i++) {
        var el = els[i];
        var el_style = el.style;
        if(el_style.display == 'none') {
            el_style.display = ''; // visible (default inline/block for element)
        } else {
            el_style.display = 'none';
        }
    }
}


function expandcollapse_multi3(tag_class) {
    expandcollapse_multi(tag_class);
    expandcollapse_multi(tag_class + '_show_span');
    expandcollapse_multi(tag_class + '_hide_span');

    $(document).trigger('expandCollapseMulti')
}


// The below functions work together to hide all (no matter what state they were in initially) or show all.
function collapse_multi(tag_class) {
    var els = getElementsByClass('*', tag_class);
    for (var i=0; i<els.length; i++) {
        els[i].style.display = 'none';
    }
}


function expand_multi(tag_class) {
    var els = getElementsByClass('*', tag_class);
    for (var i=0; i<els.length; i++) {
        els[i].style.display = ''; // visible (default inline/block for element)
    }
}


function expand_multi3(tag_class) {
    expand_multi(tag_class);
    collapse_multi(tag_class + '_show_span');
    expand_multi(tag_class + '_hide_span');

    $(document).trigger('expandCollapseMulti')
}


function collapse_multi3(tag_class) {
    collapse_multi(tag_class);
    expand_multi(tag_class + '_show_span');
    collapse_multi(tag_class + '_hide_span');

    $(document).trigger('expandCollapseMulti')
}


// Functions below require jquery.

// Seems to infinitely loop if not given <req_msg>!
function jqueryGetReplaceEl(url, el_id, req_msg, callback) {
    $('#'+el_id).hide('normal', function() {
        $(this).html(req_msg).slideDown('normal');
    });
    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        data: {
            'uniq_param': (new Date()).getTime()   // This prevents IE from caching.
        },
        dataType: 'html',
        // contentType: "application/x-www-form-urlencoded; charset=iso-8859-1",
        // contentType: "text/html; charset=iso-8859-1",
        contentType: "text/html; charset=windows-1252",
        // beforeSend: function(xhr) { xhr.setRequestHeader('Accept', "text/html; charset=iso-8859-1") },
        success: function(data, textStatus, jqXHR) {
            $('#'+el_id).hide('normal', function() {
                $(this).html(data).slideDown('normal', function() {
                    if (callback) { callback() }
                })
            })
        }
    })
    // This is a shortcut way, with fewer available options.
    // $.get(url, function(data, textStatus, jqXHR) {
    //     $('#'+el_id).hide('normal', function() {
    //         $(this).html(data).slideDown('normal', function() {
    //             if (callback) { callback(); }
    //         });
    //     });
    // });
    // }, 'html');
    return false;
}


function jqueryPostReplaceEl(url, el_id, req_msg, postdata, callback) {
    // since this pretends to be a button it requires that one of the keys in
    // postdata be postdata['button_<encrypted_url>'] like when we submit a form
    // if <url> it will be placed into the post data
    // <el_id> can be either an element id string or a jQuery object

    if (url) { postdata[url] = 'button'; } // this is how we encode url args with forms

    el = el_id;
    if (!(el_id instanceof jQuery)) {el = $("#"+el_id);}

    if (!req_msg) { req_msg = "Loading..."; }
    req_msg = "<span class=\'loading\'>"+req_msg+"</span>";

    el.hide('normal', function(){
        $(this).html(req_msg).slideDown('normal');
    });

    // IE won't post to an empty url, so we set it to '?' which will be our default handler
    $.post('?', postdata, function(result_data) {
        el.hide('normal', function(){
            $(this).html(result_data).slideDown('normal', function() {
                if (callback) { callback(); }
            });
        });
    });
    return false;
}

function mmCgiEncodedPost(post_url, postdata, callback) {
  // <post_url> should be the result of a link(.., url_only=True) call.
  var post_loc = post_url[0];
  // this is standard for encoding args in a post submission
  var routing_url = "button_" + post_url.slice(1);
  
  if (typeof postdata === 'string' || postdata instanceof String) {
      // postdata is already a query arg style string
      postdata += '&' + encodeURIComponent(routing_url) + '=button';
  } else {
      // postdata is a data object
      postdata[routing_url] = "button";
  }
  
  $.post(post_loc, postdata, callback);
  return false;
}

function replaceElWithPostResponse($el, post_url, postdata, callback) {
  return mmCgiEncodedPost(post_url, postdata, function(result_data) {
    $el.html(result_data);
    if (callback) { callback(); }
  });
}

function replaceElWithPostResponseAnimated($el, post_url, postdata, loading_msg, callback) {
  if (loading_msg) {
    loading_msg = "<span class=\'loading\'>" + loading_msg + "</span>";
  } else {
    loading_msg = "<span class=\'loading\'>Loading...</span>";
  }
  $el.slideUp(function() {$(this).html(loading_msg).show()});
  return mmCgiEncodedPost(post_url, postdata, function(result_data) {
    $el.hide().html(result_data).slideDown();
    if (callback) { callback(); }
  });
}

function replaceElWithPostResponseOverlay($el, post_url, postdata, loading_msg, callback) {
  add_message_overlay($el, loading_msg);
  return mmCgiEncodedPost(post_url, postdata, function(result_data) {
    $el.html(result_data);
    if (callback) { callback(); }
  });
}


function add_message_overlay(el, message) {
    $el = $(el);
    if (message) {
      message = "<span class=\'loading\'>" + message + "</span>";
    } else {
      message = "<span class=\'loading\'>Loading...</span>";
    }
    $el.css("position", "relative");
    $el.append(
      $("<div Class='loading-overlay'></div>").css({
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'width': '100%',
        'height': '100%',
        'background': 'rgba(255, 255, 255, .7)'
      }).append(
        $("<div></div>").css({
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)'
        }).html(message)
      )
    );
}

function remove_loading_overlay(el) {
    $(el).find('.loading-overlay').remove();
}


function _____IFRAMES______() {}

function resize_iframe(iid, h) {
    // This one uses no sliding - better for changing the size of an existing iframe. Height only.
    $('#'+iid).attr({height: h + 'px'})
}
function slide_resize_iframe(iid, h) {
    // This one uses sliding. Height only
    if ($('#'+iid).is('iframe')) {
        $('#'+iid).hide().attr({height: h + 'px'}).slideDown()
    } else {
        // Using slideUp() for object tags causes an infinite loop.
        $('#'+iid).attr({height: h + 'px'}).slideDown()
    }
}
function resize_iframe_to_fit(iid) {
    // The idea is to get it roughly right, then re-check every half-second.
    // It is counter-intuitive that we need to wait 1 second after the document is "ready"
    // to get the right height, but in cases like jquery UI tabs, there is some
    // js reorganizing of the page that happens during that time.
    // We can't slide the second time, since in Firefox that causes it to jump
    // closed and then slide open.

    $(function() {
        function calc_height() {
            // Other values of interest:
            // document.body.scrollHeight,
            // document.documentElement.scrollHeight,
            // document.body.offsetHeight,
            // document.documentElement.offsetHeight,
            // document.body.clientHeight,
            // document.documentElement.clientHeight

            // ($.browser.mozilla & $.browser.version == '11.0')
            if ($.browser.msie || $.browser.opera || !!navigator.userAgent.match(/Trident\/7\./) ) {
                // Hard to really get IE and opera to shrink. Trust me.
                return Math.max($(document).height(), $('html').outerHeight(true), $('body').outerHeight(true))
            } else {
                return Math.min($(document).height(), $('html').outerHeight(true))
            }
        }
        var curr_height = calc_height()

        try {
            // This won't work if we're embedding it in an iframe outside of linklings.
            parent.slide_resize_iframe(iid, curr_height)
			window.parent.jQuery.colorbox.resize({
                innerWidth: $(document).width(),
                innerHeight: $(document).height()
            })

        } catch (e) {
            // Don't do anything here
        }

        // jquery.ba-resize.min.js seems to have some issues, so do a simple version.
        // Check every half-second if the height has changed, and adjust.
        function fix_size(old_height) {
            var new_height = calc_height()

            // This is a hack to give a viewable window if something has gone wrong.
            // We don't have a case that this is needed yet.
            if (new_height < 10) {new_height=500}

            if (new_height != old_height) {
                parent.resize_iframe(iid, new_height)

				window.parent.jQuery.colorbox.resize({
                    innerWidth: $(document).width(),
                    innerHeight: $(document).height()
                })
            }
            window.setTimeout(function() { fix_size(new_height) }, 500)
        }
        fix_size(curr_height)
    })
}


function rm_iframe(iid, idoc) {
    // Uses contents of the form tag, if exists, else body tag.
    var s = $('form', idoc).html();
    if (!s.length) {
        s = $(idoc.body).html();
    }
    $('#'+iid).parent().hide('normal', function () {
        $(this).html(s).slideDown();
    });
    // Fix this!
    vehif_view_mode(parse_iframe_id(iid));
}


function vehif_rm_iframe(iid, idoc) {
    // Uses contents of the form tag, if exists, else body tag.
    var s = $('form', idoc).html();
    if (!s.length) {
        s = $(idoc.body).html();
    }
    $('#'+iid).parent().hide('normal', function () {
        $(this).html(s).slideDown();
    });
    vehif_view_mode(parse_iframe_id(iid));
}


function parse_iframe_id(iid) {
    var a = iid.split('_');
    return a[a.length-1];
}


function vehif_view_mode(uniq) {
    var view_id = 'vehif_view_' + uniq;
    var edit_id = 'vehif_edit_' + uniq;
    var hide_id = 'vehif_hide_' + uniq;
    var view2_id = 'vehif_view2_' + uniq;
    var edit2_id = 'vehif_edit2_' + uniq;
    var hide2_id = 'vehif_hide2_' + uniq;
    $('#'+view_id+', #'+edit2_id+', #'+hide2_id).hide();
    $('#'+view2_id+', #'+edit_id+', #'+hide_id).show();
}


function vehif_edit_mode(uniq) {
    var view_id = 'vehif_view_' + uniq;
    var edit_id = 'vehif_edit_' + uniq;
    var hide_id = 'vehif_hide_' + uniq;
    var view2_id = 'vehif_view2_' + uniq;
    var edit2_id = 'vehif_edit2_' + uniq;
    var hide2_id = 'vehif_hide2_' + uniq;
    $('#'+view2_id+', #'+edit_id+', #'+hide2_id).hide();
    $('#'+view_id+', #'+edit2_id+', #'+hide_id).show();
}


function vehif_hide_mode(uniq) {
    var view_id = 'vehif_view_' + uniq;
    var edit_id = 'vehif_edit_' + uniq;
    var hide_id = 'vehif_hide_' + uniq;
    var view2_id = 'vehif_view2_' + uniq;
    var edit2_id = 'vehif_edit2_' + uniq;
    var hide2_id = 'vehif_hide2_' + uniq;
    $('#'+view2_id+', #'+edit2_id+', #'+hide_id).hide();
    $('#'+view_id+', #'+edit_id+', #'+hide2_id).show();
}


function js_link_select(link_ctr, grp_ctr) {
    // el_id was selected: unselect all, and then select the right one.
    $('.link_group_'+grp_ctr+'_unselected').show();
    $('.link_group_'+grp_ctr+'_selected').hide();
    $('#link_'+link_ctr+'_unselected').hide();
    $('#link_'+link_ctr+'_selected').show();
}


function check_reqs() {
    var missing = false;
    $('.required_field').each(function(i) {
        if (!$(this).val().length) {
            missing = true;
            if (this.id) {
                $('[for='+this.id+']').css("color","red");
            }
            $(this).css("border","solid red 1px");
        }
    });
    if (missing) {
        alert('Some required fields have not been completed. Please verify that all fields marked with red are filled out.');
        return false;
    }
    return true;
}


function highlight_field_label(field, multi_ctr) {
    // Brefly highlights the label for <field>.

    var multi_fld = field;
    if (multi_ctr !== '') {
        multi_fld = field + '_' + multi_ctr;
    }

    var input_ob = $('[name=' + multi_fld + ']');

    // There may be other special cases here.
    if (
            input_ob.parents('.auto_height_cb_widget').length > 0 ||
            input_ob.parents('.cb_widget').length > 0
    ) {
        var input_class = field + '_cb';
        if (multi_ctr != '') {
            input_class = input_class + '_' + multi_ctr;
        }
        var label_ob = $('label[cbs_for=' + input_class + ']');
    } else {
        var input_id = input_ob.attr('id');
        var label_ob = $('label[for=' + input_id + ']');
    }

    var first_highlight_opts = {
        duration: 1,
        queue: true,
        complete: function () {
            // We don't know why but this doesn't work outside of the animation
            input_ob[0].focus();
        }
    }
    var highlight_opts = {
        duration: 1000,
        queue: true,
    }


    label_ob.parent().addClass('highlight', first_highlight_opts);
    label_ob.parent().removeClass('highlight', highlight_opts);
    label_ob.parent().addClass('highlight', highlight_opts);
    label_ob.parent().removeClass('highlight', highlight_opts);
}


function test_cookies() {
    $.removeCookie('testcookiesenabled');
    $.cookie('testcookiesenabled', 'enabled');
    if ($.cookie('testcookiesenabled')) {
        $.removeCookie('testcookiesenabled');
    } else {
        alert("For security reasons, this site requires that your browser has cookies enabled, but your browser has them disabled. Please change your browser settings.");
    }
}

function _____QTIP______() {}

// Make qtips disappear when the escape key is pressed.
$(function() {
    $(window).on('keydown', function(event) {
    	if(event.keyCode === 27) {
    		$('.qtip').qtip('hide', event);
    	}
    });
})


var setup_info_links_throttle = null;
var setup_info_links_request = null;

function setup_info_links() {

  // Setting up info links is an expensive operation
  // 0.25 - 0.75 seconds
  // With asynchronous snippets we are calling this after we've loaded each
  // snippet.  This is onerous and probably unnecessary.  Here we wrap and
  // rate limit calls to this function.

  var rate_limit = 2500; // call it no more than every 2.5 seconds?

  if (!setup_info_links_throttle) {
    // console.log("setting throttle _setup_info_links");
    setup_info_links_throttle = setInterval(
      function() {
        if (setup_info_links_request) {
          // console.log("calling _setup_info_links");
          _setup_info_links();
          setup_info_links_request = false;
        } else {
          // if there hasn't been a request in the last interval, then
          // we're done for now.
          // console.log("clearing throttle _setup_info_links");
          clearInterval(setup_info_links_throttle);
          setup_info_links_throttle = false;
        }
      },
      rate_limit
    );

    _setup_info_links();

  } else {
    // console.log("throttling _setup_info_links");
    setup_info_links_request = true;
  }
}


function _setup_info_links() {

    // Create qtip pop-ups.

    // button: "<img src='includes/images/action_delete.png' width='16px' height='16px' alt='close' />"

    var qtip_content_helper = function(el, no_clone) {
        /* <no_clone> is for when we don't want the contents cloned every time
        the qtip is shown. We started cloning when we needed qtip to not
        remove the contents from its current location; this was important when
        doing in-page searching in the presence of tooltips. */

        // only include the title if we have one.
        if ($($(el).attr('title')).length > 0) {
            title_opts = {
                // Should 'this' below be 'el'?
                text: function(api) { var title_id = $(this).attr('oldtitle'); return title_id ? $(title_id) : null; },
                button: true
            }
        } else {
            title_opts = ''
        }

        if (no_clone) {
            return {
                title: title_opts,
                text: function(api) { return $($(el).attr('rel')) }
            }
        } else {
            return {
                title: title_opts,
                text: function(api) { return $($(el).attr('rel')).clone() }
            }
        }
    }

    // Try to make sure they can view the whole pop-up on small screens.
    // This works better for people who need to click on scrollbars.
    // var position_args = {adjust: {method: 'shift flip'}, viewport: $(window)};
    var position_args = {adjust: {method: 'shift shift'}, viewport: $(window)};
    // This works better for people who can drag-scroll.
    // var position_args = {adjust: {method: 'none none'}};
    // I think the ideal would be to use force people on small screens to click the 'x' button (or 'esc' key).
    // var position_args = {my: 'top left', at: 'bottom right', target: 'event', adjust: {method: 'shift flip'}, viewport: $(window)};

    $('.ttip_object_info_hover').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=false),
            show: {solo: true},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip', tip: {width: 15, height: 10}},
            position: position_args
        })
    })
    $('.ttip_object_info_hover_no_clone').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=true),
            show: {solo: true},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip', tip: {width: 15, height: 10}},
            position: position_args
        })
    })

    $('.ttip_object_info, .ttip_object_info_blue, .ttip_object_info_white').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=false),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            // style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-narrow', tip: {width: 15, height: 10}},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-narrow', tip: {width: 15, height: 10}},
            position: position_args
        })
    })
    $('.ttip_object_info_no_clone, .ttip_object_info_blue_no_clone, .ttip_object_info_white_no_clone').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=true),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-narrow', tip: {width: 15, height: 10}},
            position: position_args
        })
    })

    $('.ttip_object_info_wide, .ttip_object_info_blue_wide, .ttip_object_info_white_wide').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=false),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-wide', tip: {width: 15, height: 10}},
            position: position_args
        })
    })
    $('.ttip_object_info_wide_no_clone, .ttip_object_info_blue_wide_no_clone, .ttip_object_info_white_wide_no_clone').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=true),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-wide', tip: {width: 15, height: 10}},
            position: position_args
        })
    })

    $('.ttip_object_info_very_wide, .ttip_object_info_blue_very_wide, .ttip_object_info_white_very_wide').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=false),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-very-wide', tip: {width: 15, height: 10}},
            position: position_args
        })
    })
    $('.ttip_object_info_very_wide_no_clone, .ttip_object_info_blue_very_wide_no_clone, .ttip_object_info_white_very_wide_no_clone').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=true),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-very-wide', tip: {width: 15, height: 10}},
            position: position_args
        })
    })

    $('.ttip_object_info_extra_wide, .ttip_object_info_blue_extra_wide, .ttip_object_info_white_extra_wide').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=false),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-extra-wide', tip: {width: 15, height: 10}},
            position: position_args
        })
    })
    $('.ttip_object_info_extra_wide_no_clone, .ttip_object_info_blue_extra_wide_no_clone, .ttip_object_info_white_extra_wide_no_clone').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=true),
            show: {solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-extra-wide', tip: {width: 15, height: 10}},
            position: position_args
        })
    })

    // modal ttips
    modal_position = {
        my: 'center',
        at: 'center',
        target: $(window) // Or $(document.body), if you don't want it centered as you scroll
    };

    $('.ttip_object_info_modal, .ttip_object_info_blue_modal, .ttip_object_info_white_modal').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=false),
            show: {modal: {on: true}, solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-modal'},
            position: modal_position
        })
    });

    $('.ttip_object_info_modal_no_clone, .ttip_object_info_blue_modal_no_clone, .ttip_object_info_white_modal_no_clone').each(function() {
        $(this).qtip({
            content: qtip_content_helper(this, no_clone=true),
            show: {modal: {on: true}, solo: true, event: 'click'},
            hide: {event: 'unfocus', leave: false},
            style: {widget: false, classes: 'qtip-rm qtip-rounded rm-qtip rm-qtip-modal'},
            position: modal_position
        })
    });

}


function setup_tab_menu_qtips() {

    // the hide and show objects used in calling qtip needs to be different if we're on a touchscreen.
    var hide_args = {
        fixed: true,
        delay: 50,
        effect: function() { $(this).slideUp(50); }
    }
    var show_args = {
        solo: true,
        event: 'hover',
        delay: 100,
        effect: function() { $(this).slideDown(100); }
    }


    if('ontouchstart' in document.documentElement) {
        var hide_args = {
            fixed: true,
            delay: 50,
            event: 'unfocus',
            effect: function() { $(this).slideUp(50); }
        }
        var show_args = {
            solo: true,
            event: 'click',
            delay: 100,
            effect: function() { $(this).slideDown(100); }
        }
    }

    $('.tab_menu_label').each(function() {
        $(this).qtip({
            content: { text: function(api) { return $($(this).attr('rel')) } },
            // show: {solo: true, event: 'hover', delay: 100,
            //     effect: function() { $(this).slideDown(100); }
            // },
            show: show_args,
            // hide: {fixed: true, delay: 50,
            //     effect: function() { $(this).slideUp(50); }
            // },
            hide: hide_args,
            events: {
                show: function(event, api) { $(api.elements.target).parent().addClass('active') },
                hide: function(event, api) { $(api.elements.target).parent().removeClass('active') }
            },
            style: {
                widget: false, classes: 'qtip-rm-tab-menu', tip: false,
            },
            position: {
                adjust: {method: 'none none'},
                // viewport: $(window),
                my: 'top left', at: 'bottom left', adjust: {y: 1}
            }
        })
    })
}


function setup_filterable_lists() {

	// custom css expression for a case-insensitive contains()
	jQuery.expr[':'].Contains = function(a,i,m){
	      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	    };

	// simple list filter for javascript.filterable_eo_list()
  $(".list_filter")
    .change( function () {

	  var filter = $(this).val();
      var filt_list = $("#filterable_list_" + $(this).attr("id"));
      if(filter) {
        // this finds all links in a list that contain the input,
        // and hide the ones not containing the input while showing the ones that do

		//filt_list.find("div:not(:Contains(" + filter + "))").parent().slideUp();
        //filt_list.find("div:Contains(" + filter + ")").parent().slideDown();

		filt_list.find(".filt_str:not(:Contains(" + filter + "))").parent().hide();
        filt_list.find(".filt_str:Contains(" + filter + ")").parent().show();

		//filt_list.hide();
      } else {
        filt_list.find(".filt_str").parent().show();
      }
      return false;
    })
  .keyup( function () {
      // fire the above change event after every letter
      $(this).change();
  });

  return false;

  // like the above (sortof), but specifically tailored for filtering the roadmap
  // This is now handled by an insta filter setup in rm_page.py
  // $(".roadmap_filter")
  //   .change( function () {
  // $(document)
  //   .on( 'change', ".roadmap_filter", function () {
  //
  //     var filter = $(this).val();
  //     var filt_list = $("#filterable_list_" + $(this).attr("id"));
  //     if(filter) {
  //     // remove all highlights
  //     //filt_list.find("li>span").removeHighlight();
  //     filt_list.find("li").removeHighlight();
  //     //filt_list.find(".glossary>div>span").removeHighlight();
  //     filt_list.find(".glossary>div").removeHighlight();
  //
  //       // this finds all li elements that contain the input,
  //       // and hide the ones not containing the input while showing the ones that do
  //     //filt_list.find("li>span:not(:Contains(" + filter + "))").parent().hide();
  //     filt_list.find("li:not(:Contains(" + filter + "))").hide();
  //     //filt_list.find("li>span:Contains(" + filter + ")").each(function(){
  //       filt_list.find("li:Contains(" + filter + ")").each(function(){
  //       el = $(this);
  //       el.show();
  //         el.parents("li").show();
  //           if (filter.length > 2) {
  //         // rather just doing el.highlight() we highlight in el's children
  //         // that are not <ul>.  This eliminates a bug where we double highlight
  //         // li>ul>li constructs, resulting in strangely eliminated text when
  //         // removing highlights.
  //         el.children().not("ul")
  //           .highlight(filter);
  //       }
  //       });
  //
  //     // this handles the glossary
  //     //filt_list.find(".glossary>div>span:not(:Contains(" + filter + "))").parent().hide();
  //     filt_list.find(".glossary>div:not(:Contains(" + filter + "))").hide();
  //       //filt_list.find(".glossary>div>span:Contains(" + filter + ")").each(function(){
  //       filt_list.find(".glossary>div:Contains(" + filter + ")").each(function(){
  //       el = $(this);
  //       el.show();
  //           if (filter.length > 2) {
  //         el.highlight(filter);
  //       }
  //     });
  //
  //     // yoink the glossary header
  //     $("#glossary-header").hide();
  //
  //     // make sure all the sections are expanded or not, as appropriate
  //     // basically, close and remove the empty ones, and show and open the ones with content
  //     filt_list.find("div>a.clickable").each(function(){
  //       link = $(this);
  //       if (link.css('display') != 'none') { // there are usually two of these links that toggle... we want the currently visible one
  //
  //         list_container = link.parent().find("div.arrow-slidedown>ol");
  //         if (!list_container.length) {
  //           list_container = link.parent().find("div.arrow-slidedown>blockquote");
  //           items = "div"
  //         } else {
  //           items = "li"
  //         }
  //         is_shown = list_container.is(":visible");
  //         should_show = false;
  //         list_container.children(items).each(function(){
  //           if ($(this).css('display') != 'none') { should_show = true; }
  //         });
  //
  //         // open or close the the section
  //         if (is_shown != should_show) {
  //           link.click();
  //         }
  //
  //         // show or hide the section
  //         if (!should_show) {
  //           link.parent().hide();
  //         } else {
  //           link.parent().show();
  //         }
  //
  //       }
  //     });
  //
  //     } else {
  //       // show all items, remove highlights
  //       //filt_list.find("li>span").each(function(){
  //       filt_list.find("li").each(function(){
  //       el = $(this);
  //       el.removeHighlight();
  //       el.show();
  //     });
  //     //filt_list.find(".glossary>div>span").each(function(){
  //     filt_list.find(".glossary>div").each(function(){
  //       el = $(this);
  //       el.removeHighlight();
  //       el.show();
  //     });
  //
  //     // but close and show all sections
  //     filt_list.find("div>a.clickable").each(function(){
  //       link = $(this);
  //       if (link.css('display') != 'none') { // there are usually two of these links that toggle... we want the currently visible one
  //         list_container = link.parent().find("div.arrow-slidedown>ol");
  //         if (!list_container.length) {
  //           list_container = link.parent().find("div.arrow-slidedown>blockquote");
  //         }
  //         is_shown = list_container.is(":visible");
  //         if (is_shown) {
  //           link.click();
  //         }
  //         link.parent().show();
  //       }
  //     });
  //
  //     // put back glossary header
  //     $("#glossary-header").show();
  //     }
  //     return false;
  //   })
  // // .keyup( function () {
  // .on( 'keyup', ".roadmap_filter", function () {
  //     // fire the above change event after every letter
  //     $(this).change();
  // });
}


// ******************* reordering functions *********************************

// ###################### not yet working

function make_deletes_persistant(div_class) {
    $("." + div_class).each(function(i) {
        if($(this).children(':input[name$="delete"]').val() == "1") {
            $(this).hide()
            $(this).removeClass(div_class)
            $(this).parent().append($(this))
        }
    });
    return false
}


function sort_by_order_field(a, b) {
    var a_order = $(a).children(':input[name$="order"]').val()
    //var a_order = $(a'> input[name$="order"]').val()
    var b_order = $(b).children(':input[name$="order"]').val()
    //var b_order = $(b + '> input[name$="order"]').val()
    return (a_order < b_order) ? -1 : (a_order > b_order) ? 1 : 0;
}


function make_author_sort_persistant(div_class) {
    var authors = $('.' + div_class + ':visible')
    var template = $('.' + div_class + ':hidden')
    //authors.hide()
    authors.sort(sort_by_order_field)
    authors.each(function(i) {
        $(this).parent().children(':nth-child('+(i+2)+')').after($(this))
    })
    //authors.show()
    return false
}


function hide_show_from_selector_val($selector, suffix, instant) {
    // shows elements with class of selector.val()+suffix
    // hides elements with class of any non-selected selector vals + suffix
    // Use 'instant' to skip the animation - often needed when form elements are to be hide/shown.

    // hide all
    $selector.children("option").each(function() {
        non_selected_val = $(this).val();
        non_selected_el = $("."+non_selected_val+suffix);
        if (instant) { non_selected_el.hide(); } else { non_selected_el.slideUp(); }
    });

    // show selected
    sel_val = $selector.val();
    selected_el = $("."+sel_val+suffix);
    if (instant) { selected_el.show(); } else { selected_el.slideUp(); }

    return false;
}



// ################### end not yet working

function _______MULTI_BLOCK_BUTTONS______() {}

function delete_mb_entry(min, max, button_class, uniq, div_class, to_delete, delete_name) {

    /* The 'delete entry' button was pressed; don't clear deleted fields. */

    var to_delete = $("#" + to_delete)
    to_delete.animate({
        "height": "toggle"
    }, "slow", function() {
        to_delete.removeClass(div_class)
        to_delete.parent().append(to_delete)
        jQuery("#" + delete_name).val("1")
        fix_multi_block_buttons(min, max, div_class, button_class, uniq)
    })
    return false
}


function delete_mb_entry_and_clear(min, max, button_class, uniq, div_class, to_delete, delete_name) {

    /* The 'delete entry' button was pressed; clear out deleted fields. */

    var to_delete = $("#" + to_delete)
    to_delete.animate({
        "height": "toggle"
    }, "slow", function() {
        to_delete.find('input').val('') // Clear fields in the deleted entry. (What about textarea and select?)
        to_delete.removeClass(div_class)
        to_delete.parent().append(to_delete)
        jQuery("#" + delete_name).val("1")
        fix_multi_block_buttons(min, max, div_class, button_class, uniq)
    })
    return false
}


function get_tinymce_id_settings_map_for_container(container) {
    // Find any tinyMCE instances in container.
    // store their settings and remove the instance.

    var tinymce_settings_map = {};
    var editors = tinymce.editors;

    $.each(editors, function(i, editor) {
        if (typeof editor != 'undefined') {
            var editor_id = editor.id;
            var editor_dom_ob = $('#' + editor_id)
            if (container.has(editor_dom_ob).length > 0) {
                tinymce_settings_map[editor_id] = editor.settings;
                tinymce.remove('#' + editor_id);
            }
        }
    })
    return tinymce_settings_map;
}


function tinymce_editor_exists(tinymce_id) {
    for (var i in tinymce.editors) {
        if (tinymce.editors[i].id == tinymce_id) {return true}
    }
    return false
}


function restore_tinymce_instances_from_map(tinymce_settings_map) {
    // Restore the tinymce instances.
    for (var tinymce_id in tinymce_settings_map) {
        if (!tinymce_settings_map.hasOwnProperty(tinymce_id)) {
            //The current property is not a direct property of tinymce_settings_map
            continue;
        }
        // Do not make it if there is already one with that id.
        if (tinymce_editor_exists(tinymce_id)) {
            continue;
        }

        var editor = new tinymce.Editor(tinymce_id, tinymce_settings_map[tinymce_id], tinymce.EditorManager);
        editor.render();
    }
}


function handle_move_mb_entry_up(min, max, button_class, uniq, div_class, current) {

    /* The 'move entry up' button was pressed. */

    var tinymce_settings_map = {};

    var current = $("#" + current);
    var index = current.children("." + uniq + "_reorder").val();
    if(index > 0) {
        current.animate({
            "opacity": "toggle"
        }, "slow", function() {
            // Find any tinyMCE instances that will be moved.
            // store their settings and remove the instance.
            var moving_el = current.prev("." + div_class);
            tinymce_settings_map = get_tinymce_id_settings_map_for_container(moving_el);
            current.after(current.prev("." + div_class));
        }).animate({
            "opacity": "toggle"
        }, "slow", function() {
            fix_multi_block_buttons(min, max, div_class, button_class, uniq);
            restore_tinymce_instances_from_map(tinymce_settings_map);
        });
    }
    return false;
}


function handle_move_mb_entry_down(min, max, button_class, uniq, div_class, current) {

    /* The 'move entry down' button was pressed. */
    var tinymce_settings_map = {};

    var current = $("#" + current);
    var curr_max = $("." + div_class).length-2; //length-2 because of template div and zero-indexing.
    var index = current.children("." + uniq + "_reorder").val();
    if(index < curr_max) {
        current.animate({
            "opacity": "toggle"
        }, "slow", function() {
            var moving_el = current;
            // Find any tinyMCE instances that will be moved.
            // store their settings and remove the instance.
            tinymce_settings_map = get_tinymce_id_settings_map_for_container(moving_el);
            current.next("." + div_class).after(current);
        }).animate({
            "opacity": "toggle"
        }, "slow", function() {
            fix_multi_block_buttons(min, max, div_class, button_class, uniq);
            restore_tinymce_instances_from_map(tinymce_settings_map);
        });
    }
    return false;
}


function get_multi_block_count(div_class) {

    /* Get the count of active, non-template/deleted multi-blocks whether the
    whole thing is hidden or not. */

    var blocks = $("."+div_class);
    var count = 0;
    blocks.each(function() {
        var delete_field = $(this).find("[name$='delete']");
        // ignore template block
        if (delete_field.attr('name').indexOf('%%') == -1) {
            // ignore deleted blocks
            if (delete_field.val() != 1) {
                count += 1;
            }
        }
    })
    return count;
}


function fix_multi_block_buttons(min, max, div_class, button_class, uniq) {

    /* Fix which up/down reorder buttons, delete buttons, and add entry
    buttons are showing. <min> and <max> are the required min and max allowed.
    */

    // This is unreliable as we are hiding auth sections.
    // var count = $("."+div_class+":visible").length
    var count = get_multi_block_count(div_class)

    // Fix delete buttons.
    if(count <= min) {
        $("."+uniq+'_delete_button').hide()
    } else {
        $("."+uniq+'_delete_button').show()
    }

    // Fix add entry button.
    if(max == 0) {
        // No max.
        $("."+button_class).show()
    } else {
        if(count >= max) {
            $("."+button_class).hide()
        } else {
            $("."+button_class).show()
        }
    }

    // Fix reorder buttons.
    if(count <= 1) {
        // No need for reorder buttons.
        $("."+uniq+"_reorder_button_up").hide()
        $("."+uniq+"_reorder_button_down").hide()
    } else {
        // Up button on all but first.
        $("."+uniq+"_reorder_button_up").show()
        $("."+uniq+"_reorder_button_up:first").hide()
        // Down button on all but last (last visible).
        $("."+uniq+"_reorder_button_down").show()
        $("."+uniq+"_reorder_button_down:visible:last").hide()
    }

    // When we load these pages we want the numbers to straighten themselves out in case the user doesn't change anything pre-submit.
    $("." + uniq + "_reorderable > ." + uniq + "_reorder").each(function(i) {
        $(this).val(i);
    });
}


function _______OTHER______() {}


// Return a helper with preserved width of cells
var fixHelper = function(e, ui) {
    ui.children().each(function() {
        $(this).width($(this).width());
    });
    return ui;
};


// This is for dhtmlx grids.
function str_natural(a, b, order) {
  function chunkify(t) {
    var tz = new Array();
    var x = 0, y = -1, n = 0, i, j;

    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
      var m = (i == 46 || (i >=48 && i <= 57));
      if (m !== n) {
        tz[++y] = "";
        n = m;
      }
      tz[y] += j;
    }
    return tz;
  }

  var aa = chunkify(a.toLowerCase());
  var bb = chunkify(b.toLowerCase());

  for (x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      var c = Number(aa[x]), d = Number(bb[x]);
      if (c == aa[x] && d == bb[x]) {
        return (c - d)*(order=="asc"?1:-1);
      } else return ((aa[x] > bb[x]) ? 1 : -1)*(order=="asc"?1:-1);
    }
  }
  return (aa.length - bb.length)*(order=="asc"?1:-1);
}


function _______SET_UP_SORTABLES______() {}

/*
we have two different sortable tools,
jquery_ui_sortable doesn't work in IE 9 & 10
and the other doesn't work in colorboxes in safari.
Decide here which we are using based on the users browser.

new one from:
https://github.com/RubaXa/Sortable

A note about args that are functions: jquery_ui_sortable sends two arguments into
functions: <event>, <ui>, while the other just sends <event>. The two <event>
variables are not equivilant though. In jquery_ui_sortable the object that was
just sorted is ui.item, and it is event.item in the new one. If you're going to
use the arguments passed in you need to give two functions that use the
appropriate arguments.
*/

$(function() { // Wait till the page is loaded so we're sure both kinds are there.
	if ($.browser.msie  && parseInt($.browser.version, 10) > 8) {
      jQuery.fn.extend({
          rm_sortable: function(args) {
			  var new_args = {}
			  $.each(args, function(key, val) {
				  if (key == 'start' && !('onStart' in args)) {
					  new_args['onStart'] = val;
				  } else if (key == 'stop' && !('onEnd' in args)) {
					  new_args['onEnd'] = val;
				  } else if (key == 'update' && !('onUpdate' in args)) {
					  new_args['onUpdate'] = val;
				  } else if (key == 'helper') {
					  // ignore this
				  } else {
					  new_args[key] = val;
				  }
			  });
              return this.sortable(new_args);
          }
      });
	} else {
      jQuery.fn.extend({
          rm_sortable: function(args) {
			  var new_args = {}
			  $.each(args, function(key, val) {
				  if (key == 'onStart' && !('start' in args)) {
					  new_args['start'] = val;
				  } else if (key == 'onEnd' && !('stop' in args)) {
					  new_args['stop'] = val;
				  } else if (key == 'onUpdate' && !('update' in args)) {
					  new_args['update'] = val;
				  } else if (key == 'ghostClass') {
					  // ignore this
				  } else {
					  new_args[key] = val;
				  }
			  });
              return this.jquery_ui_sortable(new_args);
          }
      });
	}
})

// When the document is ready set up our sortable with it's inherant function(s)
// function make_table_sortable(table_id) {
//     var width = jQuery("#" + table_id).width()
//     $("#" + table_id + " tbody > tr:even").removeClass('odd even').addClass('odd')
//     $("#" + table_id + " tbody > tr:odd").removeClass('odd even').addClass('even')
//
//     $("#" + table_id + " tbody").sortable({
//         // axis: 'y', // This causes strange behaviour.
//         start: function(event, ui) {
//             $("body").disableSelection()
//             $("#" + table_id).width(width)
//         },
//         stop: function(event, ui) { $("body").enableSelection() },
//         helper: fixHelper,
//         handle: '.ui-icon-arrowthick-2-n-s',
//         update: function(event, ui) {
//             $(":input[name$='order']:hidden").each(function(i) {
//                 $(this).val(i);
//             });
//             $("#" + table_id + " tbody > tr:even").removeClass('odd even').addClass('odd');
//             $("#" + table_id + " tbody > tr:odd").removeClass('odd even').addClass('even');
//             // Don't give even-odd classes to the header rows.
//             $("#" + table_id + " tbody > tr > th").parents("#" + table_id + " tbody > tr").removeClass('odd even');
//         }
//     })
//     // In the beginning, fill in any missing order values.
//     $(":input[name$='order']:hidden").each(function(i) {
//         $(this).val(i);
//     });
//     // Don't give even-odd classes to the header rows.
//     $("#" + table_id + " tbody > tr > th").parents("#" + table_id + " tbody > tr").removeClass('odd even');
// }

// jQuery UI sortable breaks when you have to scroll in IE.
// This version uses the sortable from https://github.com/RubaXa/Sortable.
function make_table_sortable(table_id) {
    var width = jQuery("#" + table_id).width()
    $("#" + table_id + " > tbody > tr:even").removeClass('odd even').addClass('odd')
    $("#" + table_id + " > tbody > tr:odd").removeClass('odd even').addClass('even')

    $("#" + table_id + " > tbody").rm_sortable({
		// Shared options:
        handle: '.ui-icon-arrowthick-2-n-s',

		start: function(event, ui) {
		    $("body").disableSelection()
		    $("#" + table_id).width(width)
		},
		stop: function(event, ui) { $("body").enableSelection() },
		update: function(event, ui) {
		    $(":input[name$='order']:hidden").each(function(i) {
		        $(this).val(i);
		    });
		    $("#" + table_id + " > tbody > tr:even").removeClass('odd even').addClass('odd');
		    $("#" + table_id + " > tbody > tr:odd").removeClass('odd even').addClass('even');
		    // Don't give even-odd classes to the header rows.
		    $("#" + table_id + " > tbody > tr > th").parents("#" + table_id + " > tbody > tr").removeClass('odd even');
		},
		// Options for jquery_ui_sortable:
		helper: fixHelper,

		// Options for ie_sortable
		ghostClass: 'ghost'
    })
    // In the beginning, fill in any missing order values.
    $(":input[name$='order']:hidden").each(function(i) {
        $(this).val(i);
    });
    // Don't give even-odd classes to the header rows.
    $("#" + table_id + " tbody > tr > th").parents("#" + table_id + " tbody > tr").removeClass('odd even');
}


// Global cache for domain-affiliation used to autofill affiliations when a domain has already been used in a form.
var domain_aff_map = {}
function fill_dflt_aff_from_email(email_fld, aff_fld, mapping) {

    // Helps with institution management when filling out contact info / sub forms.
    $(document).on('change blur', "input[name='"+email_fld+"']", function() {
        var email = $(this).attr('value')
        if (email && email.indexOf('@')) {
            var domain = email.slice(email.indexOf('@')+1)
            fill_dflt(aff_fld, domain)
        }
    })
    // Fill domain_aff_map on email field blur with domain - affiliation pair.
    $(document).on('blur', "input[name='"+email_fld+"']", function() {
        var email = $(this).attr('value')
        var aff = $("input[name='"+aff_fld+"']").val()
        if (aff && email && email.indexOf('@')) {
            var domain = email.slice(email.indexOf('@')+1)
            domain_aff_map[domain] = aff
        }
    })
    // Fill domain_aff_map on affiliation field blur with domain - affiliation pair.
    $(document).on('blur', "input[name='"+aff_fld+"']", function() {
        var email = $("input[name='"+email_fld+"']").val()
        var aff = $(this).val()
        if (aff && email && email.indexOf('@')) {
            var domain = email.slice(email.indexOf('@')+1)
            domain_aff_map[domain] = aff
        }
    })

    function fill_dflt(aff_f, domain) {
        var aff_el = $("input[name='"+aff_f+"']")
        if (!aff_el.attr('value')) {
            var dflt = mapping[domain]
            if(dflt != undefined) {
                // Fill the affiliation using the site wide domain-aff map.
                aff_el.attr('value', dflt)
            } else {
                // If there isn't a value for the domain in the pre-approved mapping, use other examples from the same form.
                var dflt = domain_aff_map[domain]
                if(dflt != undefined) {
                    aff_el.attr('value', dflt)
                }
            }
        }
    }
}

// Global cache for affiliation-country used to autofill countries when an aff has already been used in a form.
var aff_country_map = {}
function fill_dflt_country_from_aff(aff_fld, country_fld, mapping) {

    $(document).on('change blur', "input[name='"+aff_fld+"']", function() {
        var aff = $(this).attr('value').toLowerCase();
        if (aff) {
            fill_dflt(country_fld, aff);
        }
    })
    // Fill aff_country_map on aff field blur with aff - country pair.
    $(document).on('blur', "input[name='"+aff_fld+"']", function() {
        var aff = $(this).attr('value').toLowerCase();
        var country = $("[name='"+country_fld+"']").val();
        if (aff && country) {
            aff_country_map[aff] = country;
        }
    })
    // Fill aff_country_map on country field blur with aff - country pair.
    $(document).on('blur', "[name='"+country_fld+"']", function() {
        var aff = $("input[name='"+aff_fld+"']").val().toLowerCase()
        var country = $(this).val()
        if (aff && country) {
            aff_country_map[aff] = country;
        }
    })

    function fill_dflt(country_fld, aff) {
        var country_el = $("[name='"+country_fld+"']")
        if (!country_el.attr('value')) {
            var dflt = mapping[aff];
            if(dflt != undefined) {
                // Fill the affiliation using the site wide domain-aff map.
                country_el.attr('value', dflt)
            } else {
                // If there isn't a value for the domain in the pre-approved mapping, use other examples from the same form.
                var dflt = aff_country_map[aff];
                if(dflt != undefined) {
                    country_el.attr('value', dflt)
                }
            }
        }
    }
}

state_country_map = {
    'alabama': 'United States of America',
    'alaska': 'United States of America',
    'arizona': 'United States of America',
    'arkansas': 'United States of America',
    'california': 'United States of America',
    'colorado': 'United States of America',
    'connecticut': 'United States of America',
    'delaware': 'United States of America',
    'florida': 'United States of America',
    'georgia': 'United States of America',
    'hawaii': 'United States of America',
    'idaho': 'United States of America',
    'illinois': 'United States of America',
    'indiana': 'United States of America',
    'iowa': 'United States of America',
    'kansas': 'United States of America',
    'kentucky': 'United States of America',
    'louisiana': 'United States of America',
    'maine': 'United States of America',
    'maryland': 'United States of America',
    'massachusetts': 'United States of America',
    'michigan': 'United States of America',
    'minnesota': 'United States of America',
    'mississippi': 'United States of America',
    'missouri': 'United States of America',
    'montana': 'United States of America',
    'nebraska': 'United States of America',
    'nevada': 'United States of America',
    'new hampshire': 'United States of America',
    'new jersey': 'United States of America',
    'new mexico': 'United States of America',
    'new york': 'United States of America',
    'north carolina': 'United States of America',
    'north dakota': 'United States of America',
    'ohio': 'United States of America',
    'oklahoma': 'United States of America',
    'oregon': 'United States of America',
    'pennsylvania': 'United States of America',
    'rhode island': 'United States of America',
    'south carolina': 'United States of America',
    'south dakota': 'United States of America',
    'tennessee': 'United States of America',
    'texas': 'United States of America',
    'utah': 'United States of America',
    'vermont': 'United States of America',
    'virginia': 'United States of America',
    'washington': 'United States of America',
    'west virginia': 'United States of America',
    'wisconsin': 'United States of America',
    'wyoming': 'United States of America',
    'al': 'United States of America',
    'ak': 'United States of America',
    'az': 'United States of America',
    'ar': 'United States of America',
    'ca': 'United States of America',
    'co': 'United States of America',
    'ct': 'United States of America',
    'de': 'United States of America',
    'fl': 'United States of America',
    'ga': 'United States of America',
    'hi': 'United States of America',
    'id': 'United States of America',
    'il': 'United States of America',
    'in': 'United States of America',
    'ia': 'United States of America',
    'ks': 'United States of America',
    'ky': 'United States of America',
    'la': 'United States of America',
    'me': 'United States of America',
    'md': 'United States of America',
    'ma': 'United States of America',
    'mi': 'United States of America',
    'mn': 'United States of America',
    'ms': 'United States of America',
    'mo': 'United States of America',
    'mt': 'United States of America',
    'ne': 'United States of America',
    'nv': 'United States of America',
    'nh': 'United States of America',
    'nj': 'United States of America',
    'nm': 'United States of America',
    'ny': 'United States of America',
    'nc': 'United States of America',
    'nd': 'United States of America',
    'oh': 'United States of America',
    'ok': 'United States of America',
    'or': 'United States of America',
    'pa': 'United States of America',
    'ri': 'United States of America',
    'sc': 'United States of America',
    'sd': 'United States of America',
    'tn': 'United States of America',
    'tx': 'United States of America',
    'ut': 'United States of America',
    'vt': 'United States of America',
    'va': 'United States of America',
    'wa': 'United States of America',
    'wv': 'United States of America',
    'wi': 'United States of America',
    'wy': 'United States of America',

    'ab': 'Canada',
    'alberta': 'Canada',
    'bc': 'Canada',
    'british columbia': 'Canada',
    'mb': 'Canada',
    'manitoba': 'Canada',
    'nb': 'Canada',
    'new brunswick': 'Canada',
    'nf': 'Canada',
    'newfoundland': 'Canada',
    'nt': 'Canada',
    'northwest territories': 'Canada',
    'ns': 'Canada',
    'nova scotia': 'Canada',
    'on': 'Canada',
    'ontario': 'Canada',
    'pe': 'Canada',
    'prince edward island': 'Canada',
    'qc': 'Canada',
    'quebec': 'Canada',
    'sk': 'Canada',
    'saskatchewan': 'Canada',
    'yt': 'Canada',
    'yukon': 'Canada',

    'australian capital territory': 'Australia',
    'act': 'Australia',
    'new south wales': 'Australia',
    'nsw': 'Australia',
    'northern territory': 'Australia',
    'nt': 'Australia',
    'queensland': 'Australia',
    'qld': 'Australia',
    'south australia': 'Australia',
    'sa': 'Australia',
    'tasmania': 'Australia',
    'tas': 'Australia',
    'victoria': 'Australia',
    'vic': 'Australia',
    'western australia': 'Australia',
    // 'wa': 'Australia',

    'aguascalientes': 'Mexico',
    'ags': 'Mexico',
    'baja california': 'Mexico',
    // 'bc': 'Mexico',
    'baja california sur': 'Mexico',
    'bcs': 'Mexico',
    'campeche': 'Mexico',
    'camp': 'Mexico',
    'chiapas': 'Mexico',
    'chis': 'Mexico',
    'chihuahua': 'Mexico',
    'chih': 'Mexico',
    'coahuila': 'Mexico',
    'coah': 'Mexico',
    'colima': 'Mexico',
    'col': 'Mexico',
    'distrito federal': 'Mexico',
    'df': 'Mexico',
    'durango': 'Mexico',
    'dgo': 'Mexico',
    'guanajuato': 'Mexico',
    'gto': 'Mexico',
    'guerrero': 'Mexico',
    'gro': 'Mexico',
    'hidalgo': 'Mexico',
    'hgo': 'Mexico',
    'jalisco': 'Mexico',
    'jal': 'Mexico',
    // 'méxico': 'Mexico',
    'mexico': 'Mexico',
    'edm': 'Mexico',
    // 'michoacán': 'Mexico',
    'michoacan': 'Mexico',
    'mich': 'Mexico',
    'morelos': 'Mexico',
    'mor': 'Mexico',
    'nayarit': 'Mexico',
    'nay': 'Mexico',
    // 'nuevo león': 'Mexico',
    'nuevo leon': 'Mexico',
    'nl': 'Mexico',
    'oaxaca': 'Mexico',
    'oax': 'Mexico',
    'puebla': 'Mexico',
    'pue': 'Mexico',
    // 'querétaro': 'Mexico',
    'queretaro': 'Mexico',
    'qro': 'Mexico',
    'quintana roo': 'Mexico',
    'qroo': 'Mexico',
    'san luis potosi': 'Mexico',
    'slp': 'Mexico',
    'sinaloa': 'Mexico',
    'sin': 'Mexico',
    'sonora': 'Mexico',
    'son': 'Mexico',
    'tabasco': 'Mexico',
    'tab': 'Mexico',
    'tamaulipas': 'Mexico',
    'tamps': 'Mexico',
    'tlaxcala': 'Mexico',
    'tlax': 'Mexico',
    'veracruz': 'Mexico',
    'ver': 'Mexico',
    // 'yucatán': 'Mexico',
    'yucatan': 'Mexico',
    'yuc': 'Mexico',
    'zacatecas': 'Mexico',
    'zac': 'Mexico',

    // These are counties not states.
    //'baden-württemberg': 'Germany',
    'baden-wurttemberg': 'Germany',
    'bw': 'Germany',
    'bayern': 'Germany',
    'by': 'Germany',
    'berlin': 'Germany',
    'be': 'Germany',
    'brandenburg': 'Germany',
    'bb': 'Germany',
    'bremen': 'Germany',
    'hb': 'Germany',
    'hamburg': 'Germany',
    'hh': 'Germany',
    'hessen': 'Germany',
    'he': 'Germany',
    'mecklenburg-vorpommern': 'Germany',
    'mv': 'Germany',
    'niedersachsen': 'Germany',
    'ni': 'Germany',
    'nordrhein-westfalen': 'Germany',
    'nw': 'Germany',
    'rheinland-pfalz': 'Germany',
    'rp': 'Germany',
    'saarland': 'Germany',
    'sl': 'Germany',
    'sachsen': 'Germany',
    'sn': 'Germany',
    'sachsen-anhalt': 'Germany',
    'st': 'Germany',
    'schleswig-holstein': 'Germany',
    'sh': 'Germany',
    // 'thüringen': 'Germany',
    'thuringen': 'Germany',
    'th': 'Germany',

    // These are counties
    'carlow': 'Ireland',
    'cw': 'Ireland',
    'cavan': 'Ireland',
    'cn': 'Ireland',
    'clare': 'Ireland',
    'ce': 'Ireland',
    'cork': 'Ireland',
    'c': 'Ireland',
    'donegal': 'Ireland',
    'dl': 'Ireland',
    'dublin': 'Ireland',
    'd': 'Ireland',
    'galway': 'Ireland',
    'g': 'Ireland',
    'kerry': 'Ireland',
    // 'ky': 'Ireland',
    'kildare': 'Ireland',
    'ke': 'Ireland',
    'kilkenny': 'Ireland',
    'kk': 'Ireland',
    'laois': 'Ireland',
    'ls': 'Ireland',
    'leitrim': 'Ireland',
    'lm': 'Ireland',
    'limerick': 'Ireland',
    'lk': 'Ireland',
    'longford': 'Ireland',
    'ld': 'Ireland',
    'louth': 'Ireland',
    'lh': 'Ireland',
    'mayo': 'Ireland',
    // 'mo': 'Ireland',
    'meath': 'Ireland',
    'mh': 'Ireland',
    'monaghan': 'Ireland',
    // 'mn': 'Ireland',
    'offaly': 'Ireland',
    'oy': 'Ireland',
    'roscommon': 'Ireland',
    'rn': 'Ireland',
    'sligo': 'Ireland',
    'so': 'Ireland',
    'tipperary': 'Ireland',
    'ta': 'Ireland',
    'waterford': 'Ireland',
    'wd': 'Ireland',
    'westmeath': 'Ireland',
    'wh': 'Ireland',
    'wexford': 'Ireland',
    'wx': 'Ireland',
    'wicklow': 'Ireland',
    'ww': 'Ireland',

    // These are provinces
    'drenthe': 'Netherlands',
    'dr': 'Netherlands',
    'flevoland': 'Netherlands',
    // 'fl': 'Netherlands',
    'friesland': 'Netherlands',
    'fr': 'Netherlands',
    'gelderland': 'Netherlands',
    'ge': 'Netherlands',
    'groningen': 'Netherlands',
    'gr': 'Netherlands',
    'limburg': 'Netherlands',
    'li': 'Netherlands',
    'noord-brabant': 'Netherlands',
    'nb': 'Netherlands',
    'noord-holland': 'Netherlands',
    // 'nh': 'Netherlands',
    'overijssel': 'Netherlands',
    'ov': 'Netherlands',
    'utrecht': 'Netherlands',
    'ut': 'Netherlands',
    'zeeland': 'Netherlands',
    'ze': 'Netherlands',
    'zuid-holland': 'Netherlands',
    'zh': 'Netherlands',
}

// This fills in the country field based on the input in the state field.
function fill_country_from_state(state_fld_name, country_fld_name) {

    var state_sel = '[name="' + state_fld_name + '"]'
    var country_sel = '[name="' + country_fld_name + '"]'
    $(document).on('blur', state_sel, function() {
        var country_ob = $(country_sel)
        // Only change country if there's nothing there yet.
        if (!country_ob.val()) {
            var state = $.trim($(state_sel).val().toLowerCase())
            var country = state_country_map[state]
            if (country != undefined) {
                country_ob.val(country);
            }
        }
    })
}


function fill_out_message_and_recips(on_load) {
    var message = $('#message_selector').val()
    if(message == 'new') {
        $('#attendance_section').show();
        $('#message_contents_section').show();
        $('#preview_message_buttons').show();

        //$('.recipient_set_cb').parent().show()
        $('.recipient_set_cb').each(function(i) {
            $(this).attr('checked',false)
        })
        if (on_load != true) {
            $('[name="subject"]').val('')
            $('[name="body"]').val('')
        }
        $('#recipient_instructions').html('')
    }
    else if(message == 'registered_no_meals') {
        $('#attendance_section').hide();
        $('#message_contents_section').show();
        $('#preview_message_buttons').show();

        //$('.recipient_set_cb').parent().hide()
        $('.recipient_set_cb:eq(1)').attr('checked',true) // need something checked to not set off form error checking
        $('[name="subject"]').val('Register for REGISTERED_MEETINGS meals')
        $('[name="body"]').val('You have registered to attend the REGISTERED_MEETINGS meeting(s), but have not yet indicated whether you will attend any meals/events or not.  Please do so right away - otherwise we will ignore your meeting registration and assume you are not able to attend the meeting(s) after all.  Remember: please only sign up for meals/events that you are sure you will attend. \n\nDo so here: SIGNUP_URL')
        $('#recipient_instructions').html('The recipient list will be people who have registered to attend the meeting(s) but have not completed <b>any</b> meal/event sign-ups.')
    }
    else if(message == 'registered_incomplete_meals') {
        $('#attendance_section').hide();
        $('#message_contents_section').show();
        $('#preview_message_buttons').show();

        $('.recipient_set_cb:eq(1)').attr('checked',true) // need something checked to not set off form error checking
        $('[name="subject"]').val('Finish registering for REGISTERED_MEETINGS meals')
        $('[name="body"]').val('You have registered for the following meals/events at the REGISTERED_MEETINGS meeting(s):\nMEALS_ATTENDING\nThere are still some meals/events for which you have not indicated whether you will attend or not. Please log in to the committee website and update them right away.  Reminder: please only sign up for meals/events that you are sure you will attend. \n\nDo so here: SIGNUP_URL')
        $('#recipient_instructions').html('The recipient list will be people who have registered to attend the meeting(s) and have completed <b>some but not all</b> meal/event sign-ups.')
    }
    else if(message == 'meals_not_registered') {
        $('#attendance_section').hide();
        $('#message_contents_section').show();
        $('#preview_message_buttons').show();

        $('.recipient_set_cb:eq(1)').attr('checked',true) // need something checked to not set off form error checking
        $('[name="subject"]').val('Register for NO_RESPONSE_MEETINGS meeting(s)')
        $('[name="body"]').val('You have registered for meals/events at the NO_RESPONSE_MEETINGS meeting(s), but have not yet signed up to attend.  Please do so right away - otherwise we will ignore your meal/event signups and assume you are not able to attend the meeting(s) after all. Remember: please only sign up for meals/events that you are sure you will attend. \n\nDo so here: SIGNUP_URL')
        $('#recipient_instructions').html('The recipient list will be people who have signed up for meals/events for a meeting they are no longer registered to attend.')
    }
    else if(message == 'invited_no_response') {
        $('#attendance_section').hide();
        $('#message_contents_section').show();
        $('#preview_message_buttons').show();

        $('.recipient_set_cb:eq(1)').attr('checked',true) // need something checked to not set off form error checking
        $('[name="subject"]').val('Will you attend NO_RESPONSE_MEETINGS meeting(s)?')
        $('[name="body"]').val('You have not indicated whether or not you will be attending the NO_RESPONSE_MEETINGS meeting(s).  Please log in to the committee website and either sign up for the meeting(s) AND meals/events, or indicate that you will not be able to attend.  This information is important for our meeting planning, so please do it right away. \n\nDo so here: SIGNUP_URL')
        $('#recipient_instructions').html('The recipient list will be people who have been invited to the meeting(s) but have not yet indicated whether they will attend, nor have they signed up for meals/events at the meeting(s).')
    }
    else if(message == 'registered_and_mealed') {
        $('#attendance_section').hide();
        $('#message_contents_section').show();
        $('#preview_message_buttons').show();

        $('.recipient_set_cb:eq(1)').attr('checked',true) // need something checked to not set off form error checking
        $('[name="subject"]').val('Reminder: REGISTERED_MEETINGS meeting(s)')
        $('[name="body"]').val('You have registered for the following meals/events at the REGISTERED_MEETINGS meeting(s):\nMEALS_ATTENDING\nIf your travel plans have changed and the list is no longer accurate, please log in to the committee website and update them right away.  Reminder: please only sign up for meals/events that you are sure you will attend. \n\nDo so here: SIGNUP_URL')
        $('#recipient_instructions').html('The recipient list will be people who have registered to attend the meeting(s) and have completed their meal/event sign-ups.')
    }
    else {
        $('#attendance_section').hide();
        $('#message_contents_section').hide();
        $('#preview_message_buttons').hide();
    }
}


function toggle_visible(class_type) {
    var preview = $('.' + class_type)
    preview.toggle()
    $('.link' + class_type).html()
}


function hide_message_previews() {
    $('div[class^="usr"]').hide()
}

function ______AJAX_UTILITIES________() {}

function decode_return_data(data) {

    // This tries to do a better job of handling parsing errors caused by python bugs.
    // This handles responses created by util.package_ajax_response() and
    // improves handling python errors in response to ajax requests.

    // This has alredy been decoded?
    if (typeof data == 'object') {
        return data;
    }

    try {
        var return_data = jQuery.parseJSON(data);
    }
    catch(err) {
        var return_data = {};
        return_data['response'] = 'fail';
        return_data['message'] = data;
    }

    // We're always expecting an object ot be returned.
    if (typeof return_data === 'undefined' || return_data === null) {
        return_data = {};
    }

    return return_data
}

function _______FUNCTIONS_CALLED_ON_READY______() {}

// Handle 'return' key with care: explicitly click the first button after the
// focussed element.
$(function() {
    //$(document).keypress(function(event) {
    $(document).keypress(function(event) {
        if (event.keyCode == 13) {
            if (event && event.target && event.target.type && event.target.type == 'textarea') {
                return true // Allow return character in textareas.
            }
            if (event && event.target && $(event.target).hasClass("no_submit")) {
                // target specifies that we stop form submission
                event.cancelBubble = true;
                event.returnValue = false;
                // but we won't return false yet... we might still click a button
            }
            if ($.browser.msie && parseFloat($.browser.version) < 8) {
                // Turn off all return-key form submission for old versions of IE.
                event.cancelBubble = true;
                event.returnValue = false;
                return false;
            }
            if (!$(event.target).is(":input")) {
                // Only pay attention to return keys when form elements are in focus.
                event.cancelBubble = true;
                event.returnValue = false;
                return false;
            }
            clicked = false
            focus_el = $(document.activeElement)
            if (focus_el == $('body')) { alert('body in focus') }
            // Loop through focus_el and all its ancestor elements.
            anc = $($.makeArray(focus_el.add(focus_el.parents())).reverse())
            anc = anc.slice(0, anc.length-2)   // Ignore whole-page focus case.
            anc.each(function(index, element) {
                // Loop through 'this' and all of its later siblings.
                $(element).add($(element).nextAll()).each(function(index2, el2) {
                    submits = $(el2).find(':submit, :button').filter(':visible')
                    if (submits.length) {
                        submits.first().focus().click()
                        clicked = true
                        return false    // Stop the 'each' loop.
                    }
                })
                if (clicked) {
                    return false    // Stop the 'each' loop.
                }
            })
            // The above didn't find a button; don't submit anything.
            event.cancelBubble = true;
            event.returnValue = false;
            return false
        }
    });
});

// Allow tabs in textareas with the 'll_tabbable' class
$(function() {
    $(document).delegate('.ll_tabbable textarea', 'keydown', function(e) {
      var keyCode = e.keyCode || e.which;

      if (keyCode == 9) {
        e.preventDefault();
        var start = $(this).get(0).selectionStart;
        var end = $(this).get(0).selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start)
                    + "    "
                    + $(this).val().substring(end));

        // put caret at right position again
        $(this).get(0).selectionStart =
        $(this).get(0).selectionEnd = start + 4;
      }
    });
})


// When a form is submitted start a timer for 10 seconds during which form resubmission is disallowed.
// Better: get confirmation and skip the timer.
$(function() {
    var allow_form_submission = true;

    // function start_allow_countdown() {
    //     setTimeout(
    //         function() {
    //             allow_form_submission = true;
    //         },
    //         10000
    //     );
    // }

    $(document).on('submit', '#thisForm', function(e) {
        
        // allow skipping this confirmation for some buttons.
        // there is no way to access the button that was clicked at this point
        // so we do this globals hack instead.
        if (window.__skip_multi_click_check) {
            window.__skip_multi_click_check = false;
            return true;
        }
        
        if (allow_form_submission) {
            allow_form_submission = false;
            // start_allow_countdown();
            return true;
        } else {
            // Don't allow form submission.
            // alert('Please be patient while your data is being submitted.');
            // return false;
            // Better: allow it if confirmed. With this, we don't need the timer.
            return confirm('Your data is being processed; are you sure you want to re-submit?');
        }
    });
});

// $(function() {
//   show_touch_elements_for_touch_devices();
// });


function ________COMBOBOX_STUFF________() {}

$(function(){
	// Improve the click listener on the combo-box widget to focus on the text-area when it is clicked anywhere.
	$(document).on('click', '.jqx-combobox-content', function(event_ob) {
		var target = $(event_ob.target);
		var ta = target.find('input[type=textarea]');
		if (ta.length > 0) {
			ta[0].focus();
		}
	})

	// Set up the checkbox version of combo-boxes to open when you click on the whitespace too.
	$(document).on('click', '.jqx_checkbox', function(event_ob) {
		var target = $(event_ob.target);
		var jqx_ob = $(target[0]).parents('.jqx_checkbox');
		if (jqx_ob.jqxComboBox('isOpened')) {
			jqx_ob.jqxComboBox('close');
		} else {
			jqx_ob.jqxComboBox('open');
		}
	})

	// Focus back on the textarea when something changes.
    // This is causing trouble in Chrome, when two comboboxes have contents it won't let anything else have focus.
	// $(document).on('select unselect', '.jqx_multiselect', function(event) {
	// 	$(event.target).focus();
	// })

	// $('.jqx_detector').on('open', function(event) {
	// 	$(event.target).focus();
	// })

	// $(window).on('keydown', function(event) {
	// 	if(event.keyCode == 8 & $(event.target).hasClass('jqx-combobox-input')) {
	// 		$(event.target).focus();
	// 	}
	// });

	window.setInterval(init_combo_boxes, 500);

})

function init_combo_boxes() {
	// Comboboxes can't be initialized while they're hidden.
	$('.jqx_detector:visible').each(function(i, el) {
		var cbox = $(el);
		// console.log(cbox)
		// This could be jqx-widget
		if (!cbox.hasClass('jqx-combobox')) {
			var cbox_id = cbox.attr('id');
			var init_func = 'init_combo_box_' + cbox_id + '()';
            // This gets called sometimes when there isn't an init_func.
            // eval(init_func);
            try {
                eval(init_func);
            }
            catch(err) {}
		}
	})
}

// var combo_box_inits = []
//
// function init_combo_boxes() {
// 	var i = 0
// 	for (i = 0; i < combo_box_inits.length; i++) {
// 	    combo_box_inits[i]();
// 	}
// 	// reset it for next time.
// 	combo_box_inits = []
// }


function build_combo_box_data(disp_vals, val_vals) {
    var data = new Array();
    var k = 0;
    for (var i = 0; i < disp_vals.length; i++) {
        var row = {};
        row["disp"] = disp_vals[k];
        row["val"] = val_vals[k];
        data[i] = row;
        k++;
    }
    var source =
    {
        localdata: data,
        datatype: "array"
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    return dataAdapter;
}


function _______TO_DO_LIST_______() {}

function show_hide_no_to_dos_rows() {
    var rows = $('#to_do_table tr:visible');
    if (rows.length > 0) {
        $('#no_to_dos_row').fadeOut();
    } else {
        $('#no_to_dos_row').fadeIn();
    }
    var done_rows = $('#finished_table .to_do_item');
    // > 1 here because there's the TH row.
    if (done_rows.length > 0) {
        $('#no_done_to_dos_row').fadeOut();
        $('#finished_table_header').fadeIn();
    } else {
        $('#finished_table_header').fadeOut();
        $('#no_done_to_dos_row').fadeIn();
    }
}


function update_to_do_alert() {

    var to_do_alert = $('#to_do_alert');
    var new_num = $('#to_do_table .to_do_item').length;
    if (new_num > 0) {
        var alert_span = $('#to_do_alert_num');
        to_do_alert.fadeIn(); // This may or may not be hidden.
        alert_span.html(new_num);
    } else {
        to_do_alert.fadeOut();
    }

}

function check_to_do_item(event, check_url, uncheck_url) {
    var cb = $(event.target);
	if (!cb.hasClass('to_do_cb')) {
		cb = $(cb.parent());
	}
    var to_do_id = cb.attr('to_do_id');
    var row = cb.parents('.to_do_item');

    // someone clicked something where we couldn't find an id - just bail.
    if (typeof to_do_id == "undefined") {
        return
    }

    // Figure out whether it's being checked off or unchecked.
//    if (cb.attr('checked')) {
    if (cb.attr('status') == 'unchecked') {
        row.css('color', 'gray');
        var button = 'button_' + check_url;
        var success_func = function(cb_) {
            // var row = cb_.parents('.to_do_item');
            row.fadeOut(500, function() {
                row.find('.disp_ts').html('just now');
                row.css('color', 'gray');
                var dest_table = $('#finished_table');
				if (dest_table.length > 0) {
					// This is when we're in the to-do page.
	                dest_table.find('#finished_table_header').after(row);
	                row.fadeIn(500);
				} else {
					// This is when we're just in the to-do box.
					row.remove();
				}
                show_hide_no_to_dos_rows();
                update_to_do_alert();
            });
        }
		cb.attr('status', 'checked');
		cb.find('.action_verb').html('restore');
    } else {
        row.css('color', 'black');
        var button = 'button_' + uncheck_url;
        var success_func = function(cb_) {
            // var row = cb_.parents('.to_do_item');
            row.fadeOut(500, function() {
                row.find('.disp_ts').html('');
                row.css('color', 'black');
                var dest_table = $('#to_do_table')
                dest_table.find('tr:first').before(row);
                show_hide_no_to_dos_rows();
                row.fadeIn(500);
                update_to_do_alert();
            });
        }
		cb.attr('status', 'unchecked');
		cb.find('.action_verb').html('hide item');
    }

    // Gather args.
    var data = {
        'uniq_param': (new Date()).getTime(),   // This prevents IE from caching.
        'do_not_print': 'True', // Not sure if this is needed.
        'to_do_id': to_do_id,
    }
    data[button] = 'Submit'

    // Encode arguments.
    data = jQuery.param(data);

    // show_updating()

    // Make request
    return $.ajax({
        url: ".",
        type: "POST",
        cache: false,
        data: data
    }).done(function(return_data, textStatus, jqXHR) {
        // var return_data = jQuery.parseJSON(return_data);
        var return_data = decode_return_data(return_data);

        if (return_data.response == 'success') {
            success_func(cb);
        } else {
            $.colorbox({
                html: return_data.message,
                overlayClose: false,
                trapFocus: true,
                closeButton: false,
                opacity: .3,
                className: 'modal_form_colorbox',
                onComplete: setup_info_links
            })
            return
        }

    })

}


function _______OTHER______() {}


function check_allow_other(other_field_name) {

    // This disables the other field when the other checkbox isn't checked in checkbox widgets.

    var checkbox = $("input[value='"+other_field_name+"']")
    var text_field = $("input[name='"+other_field_name+"']")

    if (checkbox.is(':checked')) {
        text_field.removeAttr('disabled')
    } else {
        text_field.attr('disabled', 'disabled')
        text_field.val('')
    }
}


function setup_check_select_other(select_name, other_name) {

    var s_selector = '[name="' + select_name + '"]'
    var s = $(s_selector)
    var t = $('[name="' + other_name + '"]')

    check_select_other(s, t)
    $(document).on('change', s_selector, function () {
        check_select_other(s, t)
    })
}


function check_select_other(s, t) {

    if (s.val()) {
        t.val('')
        t.attr('disabled', 'disabled')
    } else {
        t.removeAttr('disabled')
    }

}


function import_reservation(date_id, start_hour, start_min, end_hour, end_min, room) {

    /* This is for the prog_pour. It moves defaults for a space
    reservation into a session's info. */

    $('[name="date"]').val(date_id)
    $('[name="start_hour"]').val(start_hour)
    $('[name="start_min"]').val(start_min)
    $('[name="end_hour"]').val(end_hour)
    $('[name="end_min"]').val(end_min)
    $('[name="room"]').val(room)
    $('[name="time"]').val('')
}


function set_nat_width(image_ob) {

    // This should only be called on the load event of image_ob. Otherwise the width will be 0.
    // Sets the property 'nat_width' for <image_ob>. This is used to make a good min-width and max for resizing.
    // This could be expanded to set <nat_height> and reset min-height too.

    alert('set_nat_width is not working, do not use it')

    var off_screen_image = new Image();
    off_screen_image.src = image_ob.attr("src");
    $(off_screen_image).on('load', function() {
        image_ob.attr('nat_width', off_screen_image.width)
        reset_min_width(image_ob)
    })
}


function reset_min_width(image_ob) {

    // resets the default min-width for image_ob to the natural size of the image if it is smaller than the min-width.

    alert('reset_min_width is not working, do not use it')

    var min = image_ob.css('min-width')
    var min_num = min.slice(0, min.indexOf('px'))
    var real_size = image_ob.attr('nat_width')
    if (parseInt(min_num) > parseInt(real_size)) {
        image_ob.css('min-width', real_size + 'px')
        $(window).resize() // Trigger a resize to redraw the image.
    }
}



function _______USER_GROUPING_IFRAME_WIDGET______() {}



function _____GENERAL_HELPER_FUNCTIONS_________() {}


function get_input_field_type(field) {
    // Find the input type of a jquery object <field>.
    // can be radio, text, checkbox, textarea, select

    type = field.attr('type')
    if (type) {
        type = type.toLowerCase() // For 'radio', 'text', 'checkbox', 'file', 'password'
    } else if (jQuery.inArray(type, ['text', 'checkbox', 'radio', 'file']) == -1) {
        type = field.get(0).nodeName.toLowerCase() // For 'textarea', 'select'
    }
    return type
}


function tanslate_seconds_to_min_secs(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds - (mins * 60);

    // if(mins.toString().length == 1) mins = '0' + mins;
    // if(secs.toString().length == 1) secs = '0' + secs;

    // return mins + ':' + secs;
    // return mins + ':' + secs + ' min';
    return mins + 'min ' + secs + 's';
}


function _____REQUIRED_INPUT_FIELD________() {}


var setup_required_input_field_checks_has_been_called = false;
function setup_required_input_field_checks() {

    // This only needs to be called once per page.
    if (setup_required_input_field_checks_has_been_called) {
        return false;
    }
    setup_required_input_field_checks_has_been_called = true;

    // tinymce.on( 'AddEditor', function(ed) {
    //     console.log(ed)
    //     ed.on('keyup', function (e) {
    //         console.log('yo')
    //         check_required_input_filled(e)
    //     })
    // })

    // setup events.
    jQuery(document).on('change blur focus', 'input, select, textarea, .jqx_detector', function () {
        check_required_input_filled(jQuery(this));
    })

    jQuery(document).on('keyup', 'input, textarea', function () {
        check_required_input_filled(jQuery(this));
    })

    $('input, select, textarea, .jqx_detector').each(function (index, el) {
        // If this isn't an input in a multi-block template then check it now.
        if ($(this).attr('name') && $(this).attr('name').indexOf('%%') == -1) {
            check_required_input_filled($(this));
        }
    })
}


function check_required_input_filled(caller_field) {

    // This checks to see whether <caller_field>, which is required in some way, has a value (so requirement is filled).

    // Make sure this isn't a multi-field template
    if (!$(caller_field).attr('name') || $(caller_field).attr('name').indexOf('%%') != -1) {return}

    var values = get_field_values(caller_field)

    // straight-forward label
    var label_ob = jQuery("label[for='" + caller_field.attr('id') + "']")

    // This may be an 'other' field.
    var caller_id = caller_field.attr('id')
    if (caller_id && caller_id.indexOf('_other') != -1) {
        orig_id = caller_id.substring(0, caller_id.length - 6)
        label_ob = $("label[for='" + orig_id + "']")
    }

    // check for checkbox label first - allow both labels and spans
    // var checkboxes_label_ob = jQuery("label[cbs_for='" + caller_field.attr('class') + "']")
    var checkboxes_label_ob = jQuery("[cbs_for='" + caller_field.attr('class') + "']")
    if (checkboxes_label_ob.length > 0) {
        label_ob = checkboxes_label_ob
    } else if (label_ob.length == 0) {
        label_ob = jQuery("label[for='" + caller_field.attr('name') + "']")
    }

    // Change classes as needed.
    // if (values.length > 0) {
    if (values[0] != '') {
        label_ob.removeClass('required_if_font')
        // label_ob.children().removeClass('error_font')
    } else if (label_ob.hasClass('required_flag')) {
        label_ob.addClass('required_if_font')
    }
}


function check_fields_dependant_on(input_label) {

    // <input_label> is a label for an input object.
    // This figures out what it is and calls check_required_input_filled on the appropriate dom element.

    dependant_input = input_label.attr('cbs_for')

    if (typeof dependant_input == 'undefined') {
        dependant_input = input_label.attr('for')
        var dependant_input_objects = jQuery('#' + dependant_input)
        if (dependant_input_objects.length != 0) {
            // Do we need this?
            // Include the other field in this. I'm assuming there won't be any inputs that are only other fields.
            // $.merge(dependant_input_objects, jQuery('#' + dependant_input + '_other'))

            jQuery.each(dependant_input_objects, function (index, element) {
                check_required_input_filled(jQuery(element))
            })
            return false
            // return true
        }
    }

    // <input_label> is the label for a collection of checkboxes.
    var dependant_input_objects = jQuery('.' + dependant_input)
    $.merge(dependant_input_objects, $('.' + dependant_input + "_other"))
    if (dependant_input_objects.length != 0) {
        jQuery.each(dependant_input_objects, function (index, element) {
            check_required_input_filled(jQuery(element))
        })
    }
}


function get_field_values(field_ob) {
    // Returns the values of <field_ob>.
    // Returns [''] if no value is found (we want an empty input field to be reliably testable).

    if (field_ob.length == 0) {
        return ['']
    }

    var values = []
	if (field_ob.hasClass('jqx-combobox')) {
		// Two cases: multi or single.
		if (field_ob.jqxComboBox('multiSelect')) {
			// This returns an array of objects.
			var values_ = field_ob.jqxComboBox('getSelectedItems');
			if (values_.length > 0) {
				for (var i=0; i<values_.length; i++) {
					val_ob = values_[i];
					if (typeof(val_ob) == 'object') {
						values.push(val_ob.value);
					}
				}
			}
		} else {
			var value_ = field_ob.jqxComboBox('getSelectedItem');
			if (value_ != undefined) {
				values.push(value_.value)
			}
		}
	} else {
	    // Find the type of field_ob
	    var type = get_input_field_type(field_ob)
		// console.log('type', type)

	    // Find the current value(s) for <field_ob>.
	    if (jQuery.inArray(type, ['text', 'textarea', 'hidden', 'file', 'password']) != -1) {
	        var file_field_name = field_ob.attr("name") + '_infn'
	        var file_field_ob = jQuery("[name='"+file_field_name+"']")

	        // console.log('triggered')
	        // var field_id = field_ob.attr('id')
	        // var tinymce_ob = tinyMCE.get(field_id)
	        // if (field_id && typeof(tinymce_ob) != 'undefined') {
	        //     values = tinymce.get(field_id).getContent() || ['']
	        //     console.log(values)
	        // } else {
	        //     values = field_ob.val() || file_field_ob.val() || ['']
	        // }

	        values = field_ob.val() || file_field_ob.val() || ['']

	    } else if (type == 'select') {
	        var selected = field_ob.find('option:selected')
	        // This version only gets one value (I believe).
	        // values = selected.val() || []
	        selected.each(function(i) {
	            var value = jQuery(this).val()
	            if (value != '') {
	                values[i] = value
	            }
	        })

	        // If we couldn't find a value in the select list, see if there's something in the 'other' text field.
	        if (values.length == 0) {
	            select_id = field_ob.attr('id')
	            other_id = select_id + '_other'
	            other_ob = $('#' + other_id)
	            if (other_ob.length > 0 && other_ob.val()) {
	                values.push(other_ob.val())
	            }
	        }
	    } else if (jQuery.inArray(type, ['checkbox', 'radio']) != -1) {
	        var name = field_ob.attr("name")
	        var checked = jQuery("input[name='"+name+"']:checked")
	        // values = checked.val() || [] // returns the first matched elements value
	        // This version gets all the values.
	        checked.each(function(i) {values[i] = jQuery(this).val()}) || ['']
	    }
	}

    if (!jQuery.isArray(values)) {
        values = [values]
    }

    if (values.length == 0) { values = [''] }

    return values

    // // It's ok to count the 'other' checkbox as having a value when its checked even if the text is empty.
    // // Checkboxes use a particular pattern for the 'other' checkbox, we want to get the real value, not the convention.
    // var new_values = []
    // for (var i=0; i<values.length; i++) {
    //     var val_str = values[i]
    //     if (val_str.match("_other$")) {
    //         var new_val = $('[name="' + val_str + '"]').val()
    //         if (new_val) {new_values.push(new_val)}
    //     } else {
    //         new_values.push(val_str)
    //     }
    // }
    // console.log(field_ob, new_values)
    // return new_values
}


function setup_check_required(label_selector, dependent_field_id) {

    // This does the basic is required check.

    var label_ob = jQuery(label_selector)
    label_ob.addClass('required_if_font required_flag')
    check_fields_dependant_on(jQuery('#' + dependent_field_id))
}


function check_req_if(field_ob, label_selector, vals, dependent_field_id) {

    // This checks the value in <field_ob> against <vals>, and if it is in <vals>, turns <label_selector> red to indicate it is now required.
    // <label_selector> is the label of the dependent field.
    // <dependent_field_id> is the id of the field required if <field_ob>.val() in <vals>. In the case of checkboxes it is the id of the field's label.

    // Get the values of the field object
    var values = get_field_values(field_ob);

    var found = false;
    var label_ob = jQuery(label_selector);
    jQuery.each(vals, function(i1, v1) {
        jQuery.each(values, function(i2, v2) {
            if (v1 == v2) {
                label_ob.addClass('required_if_font required_flag')
                found = true
                return false    // This tells .each() to stop (like break).
            }
        })
        if (found) return false // Break out of outer loop.
    })
    if (!found) {
        label_ob.removeClass('required_if_font required_flag')
    }

    // If this is required but filled we don't want to make it red
    check_fields_dependant_on(jQuery('#' + dependent_field_id))
}


function get_other_field_selector(field_ob) {

    // If <field_ob> has an attached 'other' field than this returns a selector string to get it.

    var field_id = field_ob.attr('id')
    var other_id = field_id + '_other'
    other_ob = $('#' + other_id)
    if (other_ob.length == 1) {
        return '#' + other_id
    } else {
        return get_other_field_selector_by_name(field_ob)
    }
}

function get_other_field_selector_by_name(field_ob)
{

    // If <field_ob> has an attached 'other' field than this returns a selector string to get it.

    var field_name = field_ob.attr('name')
    var other_name = field_name + '_other'
    other_ob = $('[name="' + other_name + '"]')
    if (other_ob.length == 1) {
        return '[name="' + other_name + '"]'
    } else {
        return false
    }
}


function setup_other_check_req_if(field_selector, label_selector, vals, dependent_field_id) {

    // This sets up the check_req_if for the 'other' field case. It doesn't
    // need to deal with the multi vs. plain trouble because that is dealt with in the caller.

    var field_ob = $(field_selector)
    // // If there is an 'other' field, get that selector and set that up too.
    // var other_selector = get_other_field_selector(field_ob)
    // if (other_selector) {setup_check_req_if(other_selector, label_selector, vals, dependent_field_id)}

    // var type = get_input_field_type(field_ob)

    // if (jQuery.inArray(type, ['text', 'textarea']) != -1) {
    //     $(document).on('keyup', field_selector,
    //         function () {
    //             check_req_if(field_ob, label_selector, vals, dependent_field_id)
    //         }
    //     )
    // }
    // $(document).on('change', field_selector,
    //     function () {
    //         check_req_if(field_ob, label_selector, vals, dependent_field_id)
    //     }
    // )

    $(document).on('keyup change', field_selector,
        function () {
            check_req_if(field_ob, label_selector, vals, dependent_field_id)
        }
    )

    check_req_if(field_ob, label_selector, vals, dependent_field_id)
}


function setup_check_req_if(field, label_selector, vals, dependent_field_id, multi_suffix) {

    field_selector = "[name='" + field + "']"

    var field_ob = $(field_selector)
    // If we haven't found the trigger field try the multi case.
    if (field_ob.length == 0) {
        field_selector = "[name='" + field + multi_suffix + "']"
        field_ob = $(field_selector)
    }

    // If there is an 'other' field, get that selector and set that up too.
    var other_selector = get_other_field_selector(field_ob)
    if (other_selector) {setup_other_check_req_if(other_selector, label_selector, vals, dependent_field_id)}

    // var type = get_input_field_type(field_ob)

    // if (jQuery.inArray(type, ['text', 'textarea']) != -1) {
    //     $(document).on('keyup', field_selector,
    //         function () {
    //             check_req_if(field_ob, label_selector, vals, dependent_field_id)
    //         }
    //     )
    // }
    // $(document).on('change', field_selector,
    //     function () {
    //         check_req_if(field_ob, label_selector, vals, dependent_field_id)
    //     }
    // )

    $(document).on('keyup change', field_selector,
        function () {
            check_req_if(field_ob, label_selector, vals, dependent_field_id)
        }
    )

    check_req_if(field_ob, label_selector, vals, dependent_field_id)
}


function check_req_if_not(field_ob, label_selector, vals, dependent_field_id) {

    // This checks the value in <field_ob> against <vals>, and if it is in <vals>, turns <label_selector> black to indicate it is no longer required.
    // <label_selector> is the label of the dependent field.
    // <dependent_field_id> is the id of the field required if <field_ob>.val() not in <vals>. In the case of checkboxes it is the id of the field's label.

    // Get the values of the field object
    var values = get_field_values(field_ob)
    var found = false
    var label_ob = jQuery(label_selector)
    jQuery.each(vals, function(i1, v1) {
        jQuery.each(values, function(i2, v2) {
            if (v1 == v2) {
                found = true
                return false    // This tells .each() to stop (like break).
            }
        })
        if (found) return false // Break out of outer loop.
    })
    if (found) {
        label_ob.removeClass('required_if_font required_flag')
    } else {
        label_ob.addClass('required_if_font required_flag')
    }

    // If this is required but filled we don't want to make it red
    check_fields_dependant_on(jQuery('#' + dependent_field_id))

}


function setup_other_check_req_if_not(field_selector, label_selector, vals, dependent_field_id) {

    // This sets up the check_req_if_not for the 'other' field case. It doesn't
    // need to deal with the multi vs. plain trouble because that is dealt with in the caller.

    var field_ob = $(field_selector)

    // // If there is an 'other' field, get that selector and set that up too.
    // var other_selector = get_other_field_selector(field_ob)
    // if (other_selector) {setup_check_req_if_not(other_selector, label_selector, vals, dependent_field_id)}

    // var type = get_input_field_type(field_ob)

    // if (jQuery.inArray(type, ['text', 'textarea']) != -1) {
    //     $(document).on('keyup', field_selector,
    //         function () {
    //             check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
    //         }
    //     )
    // } else {
    //     $(document).on('change', field_selector,
    //         function () {
    //             check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
    //         }
    //     )
    // }

    $(document).on('keyup change', field_selector,
        function () {
            check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
        }
    )

    check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
}


function setup_check_req_if_not(field, label_selector, vals, dependent_field_id, multi_suffix) {

    field_selector = "[name='" + field + "']"

    var field_ob = $(field_selector)
    // If we haven't found the trigger field try the multi case.
    if (field_ob.length == 0) {
        field_selector = "[name='" + field + multi_suffix + "']"
        field_ob = $(field_selector)
    }

    // If there is an 'other' field, get that selector and set that up too.
    var other_selector = get_other_field_selector(field_ob)
    if (other_selector) {setup_other_check_req_if_not(other_selector, label_selector, vals, dependent_field_id)}

    // var type = get_input_field_type(field_ob)

    // if (jQuery.inArray(type, ['text', 'textarea']) != -1) {
    //
    //     $(document).on('keyup', field_selector,
    //         function () {
    //             check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
    //         }
    //     )
    // } else {
    //     $(document).on('change', field_selector,
    //         function () {
    //             check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
    //         }
    //     )
    // }

    // I don't know why we were checking for the type of field above instead of just attaching it to both events.
    $(document).on('keyup change', field_selector,
        function () {
            check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
        }
    )

    check_req_if_not(field_ob, label_selector, vals, dependent_field_id)
}


function check_req_if_none(label_selector, dependent_field_id, new_fields) {

    // <label_selector> is the label of the dependent field.
    // <dependent_field_id> is the id of the field required if <new_fields> don't have any values. In the case of checkboxes it is the id of the field's label.
    var found = false
    for (var i=0; i<new_fields.length; i++) {
        var field = new_fields[i]

        // Get the values of the field object
        var values = get_field_values(field)

        // if (values.length > 0) {
        if (values[0] != '') {
            found = true
            break
        }
    }
    var label_ob = jQuery(label_selector)
    if (found) {
        label_ob.removeClass('required_if_font required_flag')
    } else {
        label_ob.addClass('required_if_font required_flag')
    }

    // If this is required but filled we don't want to make it red
    check_fields_dependant_on(jQuery('#' + dependent_field_id))
}


function setup_check_req_if_none(fields, label_selector, dependent_field_id) {

    // <fields> are the fields that need to be empty for dependent_field_id to be required.

    var new_fields = []

    // populate new_fields with jquery objects.
    for (var i=0; i<fields.length; i++) {
        var new_field_ob = jQuery("[name='"+fields[i]+"']")
        // fields includes fields that might not exist depending on whether they are multi-fields or not.  Only include fields we can find.
        if (new_field_ob.length > 0) {
            new_fields.push(new_field_ob)

            // If <new_field_ob> has an attached 'other' field, include that in these checks too
            var other_selector = get_other_field_selector(new_field_ob)
            if (other_selector) {new_fields.push($(other_selector))}
        }
    }

    check_req_if_none(label_selector, dependent_field_id, new_fields)
    jQuery.each(new_fields, function(key, val) {
        // type = get_input_field_type(val)
        // if (jQuery.inArray(type, ['text', 'textarea']) != -1) {
        //     val.keyup(function() {check_req_if_none(label_selector, dependent_field_id, new_fields)})
        // } else {
        //     val.change(function() {check_req_if_none(label_selector, dependent_field_id, new_fields)})
        // }

        $(document).on('keyup change', val, function() {check_req_if_none(label_selector, dependent_field_id, new_fields)})
    })
}


function check_req_if_any(label_selector, dependent_field_id, new_fields) {

    // <label_selector> is the label of the dependent field.
    // <dependent_field_id> is the id of the field required if any of <new_fields> have a value. In the case of checkboxes it is the id of the field's label.

    var found = false
    for (var i=0; i<new_fields.length; i++) {
        var field = new_fields[i]

        // Get the values of the field object
        var values = get_field_values(field)

        // if (values.length > 0) {
        if (values[0] != '') {
            found = true
            break
        }
    }
    var label_ob = jQuery(label_selector)
    if (found) {
        label_ob.addClass('required_if_font required_flag')
    } else {
        label_ob.removeClass('required_if_font required_flag')
    }

    // If this is required but filled we don't want to make it red
    // check_fields_dependant_on(jQuery('#' + dependent_field_id))
    // We are always getting label_ids now:
    check_fields_dependant_on(jQuery(label_selector))
}


function setup_check_req_if_any(fields, label_selector, dependent_field_id) {

    // <fields> are the fields that make dependent_field_id required if any have any value.

    var new_fields = [];

    // populate new_fields with jquery objects.
    for (var i=0; i<fields.length; i++) {
        var field_name = fields[i];
        var field_object = jQuery("[name='"+field_name+"']");
        // fields includes fields that might not exist depending on whether they are multi-fields or not.  Only include fields we can find.
        if (field_object.length > 0) {
            new_fields.push(field_object);

            // If <field_object> has an attached 'other' field, include that in these checks too
            var other_selector = get_other_field_selector(field_object);
            if (other_selector) {new_fields.push($(other_selector))};
        }
    }

    check_req_if_any(label_selector, dependent_field_id, new_fields);

    jQuery.each(new_fields, function(key, val) {
        // val.change(function() {check_req_if_any(label_selector, dependent_field_id, new_fields)})
        // type = get_input_field_type(val)
        // if (jQuery.inArray(type, ['text', 'textarea']) != -1) {
        //     val.keyup(function() {check_req_if_any(label_selector, dependent_field_id, new_fields)})
        // }
        $(document).on('keyup change', val, function() {check_req_if_any(label_selector, dependent_field_id, new_fields)});
    })
}


function ______SHOW_IF___________() {}


function get_show_hide_targets(target_field_id, is_target) {

    if (is_target) {
        return jQuery('#' + target_field_id);
    }
    // We need different targets for different layout classes.
    var target_obs = jQuery('.input_format_tr.left_right_cols');
    jQuery.merge(target_obs, jQuery('.input_format_tr.one_col'));
    jQuery.merge(target_obs, jQuery('.input_format_tr.two_cols > td'));
    jQuery.merge(target_obs, jQuery('.input_format_tr.three_cols > td'));
    jQuery.merge(target_obs, jQuery('.input_format_tr.four_cols > td'));
    target_obs = target_obs.has('#' + target_field_id)

    return target_obs
}


function arrays_overlap(array1, array2) {

    var found = false;
    jQuery.each(array1, function(i1, v1) {
        jQuery.each(array2, function(i2, v2) {
            if (v1 == v2) {
                found = true;
                return false;   // This tells .each() to stop (like break).
            }
        })
        if (found) return false; // Break out of outer loop.
    })

    return found;
}


function setup_check_show_if(target_field_id, target_label_id, trigger_field_name, trigger_vals, multi_suffix, is_target) {

    var field_selector = "[name='" + trigger_field_name + "']";

    var trigger_field_ob = $(field_selector)
    // If we haven't found the trigger field try the multi case.
    if (trigger_field_ob.length == 0) {
        field_selector = "[name='" + trigger_field_name + multi_suffix + "']"
        trigger_field_ob = $(field_selector)
    }

    // If there is an 'other' field, get that selector and set that up too.
    var other_selector = get_other_field_selector(trigger_field_ob)
    if (other_selector) {
        setup_other_check_show_if(target_field_id, target_label_id, other_selector, trigger_vals, is_target);
    }

    $(document).on('keyup change', field_selector,
        function () {
            check_show_if(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target);
        }
    )
    check_show_if(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target);
}


function setup_other_check_show_if(target_field_id, target_label_id, trigger_field_selector, trigger_vals, is_target) {

    // This sets up the check_req_if for the 'other' field case. It doesn't
    // need to deal with the multi vs. plain trouble because that is dealt with in the caller.

    var trigger_field_ob = $(trigger_field_selector)

    $(document).on('keyup change', trigger_field_selector,
        function () {
            check_show_if(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target)
        }
    )
    check_show_if(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target)
}


function check_show_if(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target) {

    var values = get_field_values(trigger_field_ob);
    var target_obs = get_show_hide_targets(target_field_id, is_target);

    if (arrays_overlap(trigger_vals, values)) {
        target_obs.show();
    } else {
        target_obs.hide();
    }
}


function setup_check_show_if_not(target_field_id, target_label_id, trigger_field_name, trigger_vals, multi_suffix, is_target) {

    var field_selector = "[name='" + trigger_field_name + "']";

    var trigger_field_ob = $(field_selector)
    // If we haven't found the trigger field try the multi case.
    if (trigger_field_ob.length == 0) {
        field_selector = "[name='" + trigger_field_name + multi_suffix + "']"
        trigger_field_ob = $(field_selector)
    }

    // If there is an 'other' field, get that selector and set that up too.
    var other_selector = get_other_field_selector(trigger_field_ob)
    if (other_selector) {
        setup_other_check_show_if_not(target_field_id, target_label_id, other_selector, trigger_vals, is_target);
    }

    $(document).on('keyup change', field_selector,
        function () {
            check_show_if_not(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target);
        }
    )
    check_show_if_not(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target);
}


function setup_other_check_show_if_not(target_field_id, target_label_id, trigger_field_selector, trigger_vals, is_target) {

    // This sets up the check_req_if for the 'other' field case. It doesn't
    // need to deal with the multi vs. plain trouble because that is dealt with in the caller.

    var trigger_field_ob = $(trigger_field_selector)

    $(document).on('keyup change', trigger_field_selector,
        function () {
            check_show_if_not(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target)
        }
    )
    check_show_if_not(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target)
}


function check_show_if_not(target_field_id, target_label_id, trigger_field_ob, trigger_vals, is_target) {

    var values = get_field_values(trigger_field_ob);
    var target_obs = get_show_hide_targets(target_field_id, is_target);

    if (arrays_overlap(trigger_vals, values)) {
        target_obs.hide();
    } else {
        target_obs.show();
    }
}


function setup_check_show_if_none(target_field_id, trigger_fields, is_target) {

    var new_fields = []

    // populate new_fields with jquery objects.
    for (var i=0; i<trigger_fields.length; i++) {
        var new_field_ob = jQuery("[name='"+trigger_fields[i]+"']")
        // fields includes fields that might not exist depending on whether they are multi-fields or not.  Only include fields we can find.
        if (new_field_ob.length > 0) {
            new_fields.push(new_field_ob)

            // If <new_field_ob> has an attached 'other' field, include that in these checks too
            var other_selector = get_other_field_selector(new_field_ob)
            if (other_selector) {new_fields.push($(other_selector))}
        }
    }

    check_show_if_none(target_field_id, new_fields, is_target)
    jQuery.each(new_fields, function(key, val) {
        $(document).on('keyup change', val, function() {check_show_if_none(target_field_id, new_fields, is_target)})
    })
}


function check_show_if_none(target_field_id, trigger_fields, is_target) {
    var found = false;
    for (var i=0; i<trigger_fields.length; i++) {
        var field = trigger_fields[i];
        // Get the values of the field object
        var values = get_field_values(field);
        if (values[0] != '') {
            found = true;
            break;
        }
    }

    var target_obs = get_show_hide_targets(target_field_id, is_target);
    if (found) {
        target_obs.hide();
    } else {
        target_obs.show();
    }
}


function setup_check_show_if_any(target_field_id, trigger_fields, is_target) {

    var new_fields = []

    // populate new_fields with jquery objects.
    for (var i=0; i<trigger_fields.length; i++) {
        var new_field_ob = jQuery("[name='"+trigger_fields[i]+"']")
        // fields includes fields that might not exist depending on whether they are multi-fields or not.  Only include fields we can find.
        if (new_field_ob.length > 0) {
            new_fields.push(new_field_ob)

            // If <new_field_ob> has an attached 'other' field, include that in these checks too
            var other_selector = get_other_field_selector(new_field_ob)
            if (other_selector) {new_fields.push($(other_selector))}
        }
    }

    check_show_if_any(target_field_id, new_fields, is_target)
    jQuery.each(new_fields, function(key, val) {
        $(document).on('keyup change', val, function() {check_show_if_any(target_field_id, new_fields, is_target)})
    })
}


function check_show_if_any(target_field_id, trigger_fields, is_target) {
    var found = false;
    for (var i=0; i<trigger_fields.length; i++) {
        var field = trigger_fields[i];
        // Get the values of the field object
        var values = get_field_values(field);
        if (values[0] != '') {
            found = true;
            break;
        }
    }

    var target_obs = get_show_hide_targets(target_field_id, is_target);
    if (found) {
        target_obs.show();
    } else {
        target_obs.hide();
    }
}


function ______OTHER_FIELD_TESTERS______() {}

function contains_html(field_sel) {
    // Returns true if any fields selected by <field_sel> contains any HTML tags (or really < and >).
    var found = false;
    $(field_sel).each(function() {
        try {
            found = (found || ($($(this).val()).length > 0))
            return !found   // Breaks out of each if found.
        } catch(err) {}
    });
    return found
}


function ______MISC_____() {}

function strip_html(s) {
    // This can't deal with the script tag properly - it returns the contents of the script. Improve when needed.
    if (typeof s == 'undefined') { return ''; }
    if (s.toLowerCase().indexOf('script') != -1) { return $('<span>'+s+'</span>').text(); }
    var div = document.createElement("div");
    div.innerHTML = s;
    var ans = div.textContent || div.innerText || "";
    // This works, too.
    // var ans = $(div).text();
    return ans;
}

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escape_html(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}


function _____STARS_RATING_WIGET_____(){}

/* These routines are used by star_rating_widget.py */


function make_selectable_stars(stars_id) {

    var stars_el = $('#'+stars_id);
    var star = stars_el.children('.rm_star');

    star.hover(function() {
        // hover enter

        var $this = $(this);

        // when starting a hover we store the saved non-hover value in '_tmp_saved_val'
        var non_hover_saved_val = $this.parent().data('_tmp_saved_val');
        if (!non_hover_saved_val) {
            var lit_stars = $this.parent().children('.fa-star');
            curr_val = lit_stars.length;
            $this.parent().data('_tmp_saved_val', curr_val);
        }

        // hide show correct stars
        $this.removeClass('fa-star-o fa-star-half-o');
        $this.addClass('fa-star');

        $prev_stars = $this.prevAll('.rm_star');
        $prev_stars.removeClass('fa-star-o fa-star-half-o');
        $prev_stars.addClass('fa-star');

        $next_stars = $this.nextAll('.rm_star');
        $next_stars.removeClass('fa-star fa-star-half-o');
        $next_stars.addClass('fa-star-o');

        // fire custom dom event
        var curr_hover_val = $prev_stars.length + 1;
        $this.parent().trigger('rm-stars-hover-val-update', [curr_hover_val]);

    }, function(){
        // hover exit

        var $this = $(this);

        // return stars to non-hover value
        var non_hover_saved_val = $this.parent().data('_tmp_saved_val');
        if (non_hover_saved_val || non_hover_saved_val === 0) {
            $this.parent().data('_tmp_saved_val', null);
            $this.parent().trigger('rm-stars-hover-val-update', [non_hover_saved_val]);

            update_stars_display_for_value(stars_el, non_hover_saved_val);
        }
    });

    star.click(function(){
        // trigger custom dom event on stars element with value of clicked star
        var $this = $(this);

        // we get the value of the clicked star by counting sibling stars
        // that are previous to it in the dom
        var num_previous_stars = $this.prevAll('.rm_star').length;
        var clicked_star_value = num_previous_stars + 1;

        // current policy is that if the user clicks the currently
        // selected star, then we clear the star value -- set it to 0
        var curr_non_hover_val = $this.parent().data('_tmp_saved_val');
        if (clicked_star_value == curr_non_hover_val) {
            // clicked_star_value = 0;
            // Giving this a value of 0 breaks the required js
            clicked_star_value = '';
        }

        stars_el.trigger('rm-stars-val-update', [clicked_star_value]);
    });

    stars_el.on('rm-stars-val-update', function(e, new_val){
        $this = $(this);
        $this.data('_tmp_saved_val', new_val);
        update_stars_display_for_value(stars_el, new_val);
    });

    function update_stars_display_for_value(stars_el, value) {
        var stars = stars_el.children('.rm_star');

        stars.slice(0, value)
            .removeClass('fa-star-o fa-star-half-o')
            .addClass('fa-star');

        stars.slice(value)
            .removeClass('fa-star fa-star-half-o')
            .addClass('fa-star-o')
    }
}


function make_selectable_labeled_stars(labeled_stars_id, stars_opts) {

    var labeled_stars = $('#'+labeled_stars_id);
    var stars_label = labeled_stars.find('.rm_stars_label');
    var stars = labeled_stars.find('.rm_stars');

    stars.on('rm-stars-hover-val-update', function(e, val) {
        stars_label.html(stars_opts[val]);

        // Try to improve the min-width as different labels are shown.
        var width = stars_label.css('width').slice(0, -2);
        var old_min_width = stars_label.css('min-width').slice(0, -2);
        width = parseInt(width);
        old_min_width = parseInt(old_min_width);
        var new_min = Math.max(width, old_min_width);
        stars_label.css('min-width', new_min);
    });

    stars.on('rm-stars-val-update', function(e, val) {
        var new_label = stars_opts[val]
        if (val == '') {
            // We've replaced 0 with '' as a val to let required_js work.
            new_label = stars_opts[0];
        }
        stars_label.html(new_label);
    });
}


function connect_stars_input_hidden_field(input_widget_id, hidden_field_id) {

    var input_widget_el = $('#'+input_widget_id);
    var hidden_field_el = $('#'+hidden_field_id);
    var stars = input_widget_el.find('.rm_stars');
    stars.on('rm-stars-val-update', function(e, val) {
        hidden_field_el.val(val);
        // This isn't triggered on the hidden text field so we have to trigger
        // it by hand.
        hidden_field_el.trigger( "change" );
    });
}


function _____TOUCH_CHECKING___(){}

/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-cssclasses-teststyles-prefixes-cssclassprefix:modernizr!

Includings only touch device detection.
Example: if (Modernizr.touch) { alert("touch") }

 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" modernizr-"+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" modernizr-js modernizr-"+q.join(" modernizr-"):""),e}(this,this.document);
