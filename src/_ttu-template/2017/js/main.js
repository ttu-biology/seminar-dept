jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MqL = 1000;
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile - open lateral menu clicking on the menu icon
	$('.ttu-nav-trigger').on('click', function(event){
		event.preventDefault();
		if( $('.ttu-main-content').hasClass('nav-is-visible') ) {
			closeNav();
			$('.ttu-overlay').removeClass('is-visible');

		} else {
			$(this).addClass('nav-is-visible');
		
			$('.ttu-primary-nav').addClass('nav-is-visible');
			$('.ttu-main-header').addClass('nav-is-visible');
			$('.ttu-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').addClass('overflow-hidden');
			});
			toggleSearch('close');
			$('.ttu-overlay').addClass('is-visible');
		}
	});

	//open search form
	$('.ttu-search-trigger').on('click', function(event){
		event.preventDefault();
		toggleSearch();
		closeNav();
	});

	//close lateral menu on mobile 
	$('.ttu-overlay').on('swiperight', function(){
		if($('.ttu-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.ttu-overlay').removeClass('is-visible');
		}
	});
	$('.nav-on-left .ttu-overlay').on('swipeleft', function(){
		if($('.ttu-primary-nav').hasClass('nav-is-visible')) {
			closeNav();
			$('.ttu-overlay').removeClass('is-visible');
		}
	});
	$('.ttu-overlay').on('click', function(){
		closeNav();
		toggleSearch('close')
		$('.ttu-overlay').removeClass('is-visible');
	});




	//prevent default clicking on direct children of .ttu-primary-nav 
	$('.ttu-primary-nav').children('.has-children').children('a').on('click', function(event){
		event.preventDefault();
	});
	//open submenu
	$('.has-children').children('a').on('click', function(event){
		if( !checkWindowWidth() ) event.preventDefault();
		var selected = $(this);
		if( selected.next('ul').hasClass('is-hidden') ) {
			//desktop version only
			selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
			selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
			$('.ttu-overlay').addClass('is-visible');
		} else {
			selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
			$('.ttu-overlay').removeClass('is-visible');
		}
		toggleSearch('close');
	});

	//submenu items - go back link
	$('.go-back').on('click', function(){
		$(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
	});

	function closeNav() {

		$('.ttu-nav-trigger').removeClass('nav-is-visible');
		$('.ttu-main-header').removeClass('nav-is-visible');
		$('.ttu-primary-nav').removeClass('nav-is-visible');
		$('.has-children ul').addClass('is-hidden');
		$('.has-children a').removeClass('selected');
		$('.moves-out').removeClass('moves-out');
		$('.ttu-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			$('body').removeClass('overflow-hidden');
		});
	}

	function toggleSearch(type) {
		if(type=="close") {
			//close serach 
			$('.ttu-search').removeClass('is-visible');
			$('.ttu-search-trigger').removeClass('search-is-visible');
			$('.ttu-overlay').removeClass('search-is-visible');
		} else {
			//toggle search visibility
			$('.ttu-search').toggleClass('is-visible');
			$('.ttu-search-trigger').toggleClass('search-is-visible');
			$('.ttu-overlay').toggleClass('search-is-visible');
			if($(window).width() > MqL && $('.ttu-search').hasClass('is-visible')) $('.ttu-search').find('input[type="search"]').focus();
			($('.ttu-search').hasClass('is-visible')) ? $('.ttu-overlay').addClass('is-visible') : $('.ttu-overlay').removeClass('is-visible') ;
		}
	}

	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window, 
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var navigation = $('.ttu-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.ttu-header-buttons');
		} else {
			navigation.detach();
			navigation.insertAfter('.ttu-main-content');
		}
	}
});