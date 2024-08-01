
jQuery.fn.InstaFilter = function($container, options) {
	setup_insta_filter(this, $container, options);
	return this;
}

// custom css expression for a case-insensitive contains()
jQuery.expr[':'].Contains = function(element, index, args){
		return (element.textContent || element.innerText || "").toUpperCase().indexOf(args[3].toUpperCase()) >= 0;
};

var insta_filter_default_options = {
	min_highlight_chars: 3,
	start_hidden: false,
	/* options

	typing_pause: 500,
	// if present, only does filtering after the user has not entered a char for this duration, in milliseconds

	search_unit_selector: ".search_unit",
	// jQuery selector string for specifying the filterable elements in the collection, defaults to all

	search_unit_ancestor_fields_selector: ".search_unit_category_title, .etc, ...",
	// list of jQuery selectors for allowing category titles to be searched over as well

	empty_result_msg_selector: ".empty_results_msg",
	// The selector for the element to display if the results of the filter is empty.

	ignore_selector: ""
	// don't change the visibility of these ancestors

	// E.g, if you have a bunch of sessions with multiple slots per session
	// you want to have the search unit be the slot, but you still want to
	// search over the session name, and show all that session's slots if its
	// name matches
	<div class="session">
		<span class="session-title">Really Good Session</span>

		<div class="session-slot">
			Really Good Slot
		</div>
	 	<div class="session-slot">
			Even Better Slot
		</div>
	</div>

	would use:

	search_unit_selector: ".session-slot",
	search_unit_ancestor_fields_selector: ".session-title"]

	ancestor field selectors must be immediate children of an ancestor of a search unit.
	*/
}


function setup_insta_filter($filter, $container, options) {

	var options = jQuery.extend({}, insta_filter_default_options, options);

	$filter.change(function() {
		$filter = jQuery(this);
		handle_filter_keypress($filter, $container, options);
		return false;
	});
	$filter.keyup(function () {
        jQuery(this).change();
		return false;
    });

	handle_filter_keypress($filter, $container, options); // immediate filter on any pre-filled text

	// end setup
	// begin private methods

	var pending_change_handler;
	var $matching_parents_cache = 0;

	function handle_filter_keypress($filter, $container, options) {
		if (options.typing_pause) {
			handle_change_after_pause($filter, $container, options);
		} else {
			handle_change_to_filter($filter, $container, options);
		}
	}

	function handle_change_after_pause($filter, $container, options) {
	    if(pending_change_handler) {
	        clearTimeout(pending_change_handler);
	        pending_change_handler = null;
	    }
		pending_change_handler = setTimeout(function(){
			handle_change_to_filter($filter, $container, options);
		}, options.typing_pause);
	}

	function handle_change_to_filter($filter, $container, options) {
	    var filter_val = $filter.val();
	    if (should_filter(filter_val)) {
			$container.show();
			update_collection_for_filter_val(filter_val, $container, options);
	    } else {
	    	return_collection_to_original_state($container, options);
	    }
	}

	function should_filter(filter_val) {
		return Boolean(filter_val);
	}

	function update_collection_for_filter_val(filter_val, $container, options) {
		var $search_units = get_search_units_from_collection($container, options);
		var $matching_search_units = setup_and_do_filtering(filter_val, $search_units, $container, options);

		show_only_matching_units($search_units, $matching_search_units, $container, options);
		highlight_only_matching_text(filter_val, $search_units, $matching_search_units, $container, options);
		if (options.empty_result_msg_selector) {
			if ($matching_search_units.length < 1) {
				jQuery(options.empty_result_msg_selector).show();
			} else {
				jQuery(options.empty_result_msg_selector).hide();
			}
		}
	}

	function get_search_units_from_collection($container, options) {
		if (options.search_unit_selector) {
			return $container.find(options.search_unit_selector);
		} else {
			return $container;
		}
	}

	function setup_and_do_filtering(filter_val, $search_units, $container, options) {
		reset_required_caches(options);
		var is_match_func = get_match_func(options);
		return elements_that_match_val(filter_val, $search_units, $container, is_match_func);
	}

	function reset_required_caches(options) {
		if (options.search_unit_ancestor_fields_selector) {
			reset_matching_parents_cache();
		}
	}

	function reset_matching_parents_cache() {
		$matching_parents_cache = 0;
	}

	function get_match_func(options) {
		if (options.search_unit_ancestor_fields_selector) {
			return generate_element_or_parent_match_func(options.search_unit_ancestor_fields_selector);
		} else {
			return element_matches_filter_val;
		}
	}

	function generate_element_or_parent_match_func(parent_fields_selector) {
		var parent_matches_filter_val = generate_parent_match_func(parent_fields_selector);

		var match_func = function(dom_el, filter_val, $container) {
			return Boolean(
				element_matches_filter_val(dom_el, filter_val)
				|| parent_matches_filter_val(dom_el, filter_val, $container)
			);
		}
		return match_func;
	}

	function generate_parent_match_func(parent_fields_selector) {
		var parent_match_func = function(dom_el, filter_val, $container) {
			var $element = $(dom_el);
			var $parents = $element.parentsUntil($container);

			var all_matching_p = all_matching_parents(filter_val, $container, parent_fields_selector);
			var $matched_parents = $parents.filter(all_matching_p);

			var has_matched_parent = Boolean($matched_parents.length);
			return has_matched_parent;
		}
		return parent_match_func;
	}

	function all_matching_parents(filter_val, $container, parent_fields_selector) {
		if ($matching_parents_cache == 0) {
			var $matchable_parent_fields = $(parent_fields_selector);
			var $matched_parent_fields = elements_that_match_val(filter_val, $matchable_parent_fields,
																$container, element_matches_filter_val);
			$matching_parents_cache = $matched_parent_fields.parent();
		}
		return $matching_parents_cache;
	}

	function elements_that_match_val(filter_val, $elements, $container, is_match_func) {
		return $elements.filter(function(index) {
			var element = this;
			return is_match_func(element, filter_val, $container);
		});
	}

	function element_matches_filter_val(dom_el, filter_val, $container) {
		var element_text = element_matchable_text(dom_el);

	    // break filter val into words and check that text contains them all
	    var is_match = false;
	    var words = filter_val.match(/\S+/g);
	    var words_len = words.length;
			var index_of_val_in_text;
	    for (var i=0; i<words_len; i++) {words[i];
	        index_of_val_in_text = element_text.toUpperCase().indexOf(
	            words[i].toUpperCase()
	        );
	    	is_match = index_of_val_in_text >= 0;
	        if (!is_match) {
	            break;
	        }
	    }

		return is_match;
	}

	function element_matchable_text(element) {
		return element.textContent || element.innerText || "";
	}

	function show_only_matching_units($all_elements, $matching_elements, $container, options) {
		var $non_matching = $all_elements.not($matching_elements);
	  var $matching_parents_in_collection = $matching_elements.parentsUntil($container);
		var $non_matching_parents_in_collection = $non_matching.parentsUntil($container);
	  $non_matching_parents_in_collection = $non_matching_parents_in_collection.not($matching_parents_in_collection);

	  if (options.ignore_selector) {
	    var $ignore = $container.find(options.ignore_selector);
	    $non_matching_parents_in_collection = $non_matching_parents_in_collection.not($ignore);
	    $matching_parents_in_collection = $matching_parents_in_collection.not($ignore);
	  }

	  smart_hide_elements($non_matching_parents_in_collection, options);
		smart_hide_elements($non_matching, options);

	  smart_show_elements($matching_parents_in_collection);
	  smart_show_elements($matching_elements);
	}

	function smart_show_elements($elements, options) {
	  var $click_controlled_elements = $elements.filter("[data-display-control]");
	  if ($click_controlled_elements) {
	    $click_controlled_elements.each(function() {
	      if (!$(this).is(":visible")) {
	        var control_id = $(this).attr('data-display-control');
	        $('#vhsjs_view_'+control_id).click();
	      }
	    });

	    $elements = $elements.not($click_controlled_elements);
	  }

	  $elements.show();
	}

	function smart_hide_elements($elements, options) {
	  var $click_controlled_elements = $elements.filter("[data-display-control]");
	  if ($click_controlled_elements) {
	    $click_controlled_elements.each(function() {
	      if ($(this).is(":visible")) {
	        var control_id = $(this).attr('data-display-control');
	        $('#vhsjs_hide_'+control_id).click();
	      }
	    });

	    $elements = $elements.not($click_controlled_elements);
	  }

	  $elements.hide();
	}

	function highlight_only_matching_text(text, $all_elements, $matching_elements, $container, options) {
		$all_elements.removeHighlight();

		if (should_highlight(text, options)) {
	        var words = text.match(/\S+/g);
					// console.log("words:", words);
	        for (var i=0; i<words.length; i++) {
	    	    $matching_elements.highlight(words[i]);
	        }
	        highlight_parent_searchable_fields(text, $matching_elements, options);
		}
	}

	function should_highlight(filter_val, options) {
		return Boolean(
				options.min_highlight_chars
				&& filter_val.length >= options.min_highlight_chars
		)
	}

	function highlight_parent_searchable_fields(text, $matching_elements, options) {
		if (options.search_unit_ancestor_fields_selector) {
			var $parent_fields = $(options.search_unit_ancestor_fields_selector);
			$parent_fields.removeHighlight();

	        var words = text.match(/\S+/g);
	        for (var i=0; i<words.length; i++) {
	    		$parent_fields.highlight(words[i]);
	        }
		}
	}

	function return_collection_to_original_state($container, options) {
		var $search_units = get_search_units_from_collection($container, options);
		var $search_units_parents = $search_units.parentsUntil($container);
	  var $hide_on_reset = jQuery(options.hide_on_reset_selector);

	  if (options.ignore_selector) {
	    var $ignore = $container.find(options.ignore_selector);
	    var $search_units_parents_safe = $search_units_parents.not($ignore).not($hide_on_reset);
	  } else {
	    var $search_units_parents_safe = $search_units_parents;
	  }

		$search_units
			.show()
			.removeHighlight();
		if (options.start_hidden) {
			$container
				.hide();
		}

	  smart_show_elements($search_units_parents_safe, options);
	  $search_units_parents.removeHighlight();

	  smart_hide_elements($hide_on_reset, options);
	}
}
