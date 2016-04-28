$(function(){
	var filterActive = false;

	function openFilterList(){
		$('.filter-list').addClass('open');
	}
	function closeFilterList(){
		$('.filter-list').removeClass('open');
	}

	function addFilter(element) {
		var code = element.attr('data-code');
		var filterElement="<div class='filter' data-code='"+ code +"'><span>" + code + "</span> <input type='text'><span class='close'>x</span></div>";
		$('.filter-box .filters').append(filterElement);
		element.addClass('selected');
		filterActive = true;
		$('.filter-box .filter[data-code="'+ code +'"] input').focus();
		$('.main-input').html('');
		closeFilterList();
		showFiltersMatching('');
	}
	function removeFilter(element){
		var code = element.attr('data-code');
		$('.filter-list li[data-code="'+ code +'"]').removeClass('selected');
		element.remove();
		if ($('.filter-box').find('.filter').length === 0){
			filterActive=false;
		}
	}
	function showFiltersMatching(string){
		$('.filter-list li').each(function(){
			var code = $(this).attr('data-code');
			if (code.match("^"+string)){
				$(this).removeClass('hidden');
			} else {
				$(this).addClass('hidden');
			}
		});
	};

	$('.main-input').on('input', function(){
		showFiltersMatching($(this).html());
	});

	$('.main-input').focus(function(){
		openFilterList();
	});

	$('.filter-list li').click(function(){
		addFilter($(this));
	});

	$('.filter-box').on('click', '.close', function(){
		removeFilter($(this).parent());
	});

	$('.filter-box').click(function(e){
		var target = $(e.target);
		if (target !== $('.filter')&& target.parents('.filter').length === 0)
		{
			openFilterList();
			$('.main-input').focus();
		}
	})

	$(document).click(function(e){
		var target = $(e.target);
		if(target.parents('.filter-list').length  === 0 
			&& target.parents('.filter-box').length === 0
			&& target !== $('.filter-list')
			&& target !== $('.filter-box')
			){
			closeFilterList();
			$('.main-input').blur();
		}
	});



});