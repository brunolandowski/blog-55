console.log('test')

// PROGRESS READING BAR
$(window).on('scroll', function() {
   	var st = $(this).scrollTop();
   	var wh = $(document).height() - $(window).height();
	var perc = (st*100)/wh
	$('.percentage').css('width', perc + '%')
});
// REMOVE EMPTY P
$('p').not('p.alert-form').each(function() {
    var $this = $(this);
    if($this.html().replace(/\s|&nbsp;/g, '').length == 0)
        $this.remove();
});

// INIT MASONRY, GET LAST ELEMENT FROM COLUMN
$(document).ready(function(){
  var $container = $('.wrap');
  $container.imagesLoaded(function () {
	
		$container
        	.masonry({
          		columnWidth: '.grid-sizer',
				      gutter: '.gutter-sizer',
				      percentPosition: true
        	})
        	.masonry( 'on', 'layoutComplete', function( msnryInstance, laidOutItems ) {
            	styleMasonry();
            	check_if_in_view();
        	});

    check_if_in_view(); 
    styleMasonry();

    $('.super-wrap').animate({
    opacity: 1,
    
  }, 250, function() {
    $('.loader').hide();
  }); 

	function styleMasonry() {
        var cols = {};
        var top, left;
        
        $('.wrap > *').each(function(){
            $(this).removeClass('last');
            top = parseInt($(this).css('top').replace('px', ''));
            left = $(this).css('left');
            var articleLength = $('section').length;
            if (articleLength < 4) {
              
              $('section').addClass('last');
            }
            if(typeof cols[left] == 'undefined') {
                cols[left] = {top: top, object: $(this)};
            } else if(top > cols[left].top) {
                cols[left] = {top: top, object: $(this)};
            }
        });
        $.each(cols, function( index, item ) {
            item.object.addClass('last');
        });
    }
});
});
// RESTART MASONRY WHEN


// NAV BAR
$(".button-open-menu").click( function(event){
  event.preventDefault();
    if ( $(this).hasClass("isDown") ) {
    $("nav").stop().addClass('open');                
    $("nav .wrap-nav").stop().animate({
    opacity: 1,
    
  }, 500, function() {
    // Animation complete.
  }); 
    } else {
        $("nav").stop().removeClass('open');
        $("nav .wrap-nav").stop().animate({
            opacity: 0,
            
          }, 100, function() {
            // Animation complete.
          });
    }
    $(this).toggleClass("isDown");
  return false;
});


// WIDTH 50 TO FIRST ELEMENT IN HOME AND PAGE1 
$(location).attr('href');
var pathname = window.location.pathname;
if (window.location == document.location.origin + "/") {
      $("section:first-of-type").addClass("home-page");
} 
if (window.location == document.location.origin + "/?page=1") {
      $("section:first-of-type").addClass("home-page");
} 

 
//SCROLLING EFFECT
var $animation_elements = $('.home');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');



// FORM CONTACT
$(document).ready(function() {
  $('.contact-form').submit(function(e) {
      var article = $('#inputArticle')
      var comment = $('#inputComment')
      var email = $('#inputEmail')
    
      if(article.val() == "" || comment.val() == "" || email.val() == "") {
        $('.alert-form').html('Please fill all the fields');
       
        return false;
      }
      else {
        $.ajax({
          method: 'POST',
          url: 'https://www.getform.org/f/2ba69b7e-9feb-4ee6-af85-96151eacb232',
          data: $('.contact-form').serialize(),
          datatype: 'json'
        });
        e.preventDefault();
       
        $(this).get(0).reset();
        $('.alert-form').html('Sent!').css('color','green');
       
      }
    });
  
  $('.submit-fail, .submit-success').click(function() {
    $(this).hide();
  })
});


// PARALAXE
var dataalign = $(".img-header").attr("data-align");

if (dataalign == 'top') {
	$('.img-header').css('background-position','50% 25%');
	$(window).bind("load resize scroll",function(e) {
    var y = $(window).scrollTop();
    

    $(".img-header").filter(function() {
        return $(this).offset().top < (y + 450) &&
               $(this).offset().top + $(this).height() > y;
    }).css('background-position', '50% calc(25% + ' + parseInt(y / 4) + 'px');
});
}

if (dataalign == 'middle') {
	$('.img-header').css('background-position','50% 50%');
	$(window).bind("load resize scroll",function(e) {
    var y = $(window).scrollTop();
    

    $(".img-header").filter(function() {
        return $(this).offset().top < (y + 450) &&
               $(this).offset().top + $(this).height() > y;
    }).css('background-position', '50% calc(50% + ' + parseInt(y / 4) + 'px');
});
}

if (dataalign == 'bottom') {
	$('.img-header').css('background-position','50% 100%');
	$(window).bind("load resize scroll",function(e) {
    var y = $(window).scrollTop();
    

    $(".img-header").filter(function() {
        return $(this).offset().top < (y + 450) &&
               $(this).offset().top + $(this).height() > y;
    }).css('background-position', '50% calc(100% + ' + parseInt(y / 4) + 'px');
});
}





// UNWRAP ELEMENT POST
$('.extended img').unwrap();
$('.extended iframe').unwrap();

// OTOTYPO
$( 'section article h3 a, .wrap-post-view section.post-view h2' ).each(function( index ) {
    var html = $(this).html();
    html = html.replace(/[ \u202F]*([:])/g, "\u202F$1 ");
    html = html.replace(/[ \u202F]*([?])/g, "\u202F$1 ");
    html = html.replace(/[ \u202F]*([!])/g, "\u202F$1 ");
    html = html.replace(/[ ]*([)])/g, "\u202F$1 ").replace(/[ ]*([(])/g, " $1\u202F");

    $(this).html(html);
});

// LEGALS 
$(".close-legals").click( function(event){
  	event.preventDefault();
    	
    if ( $('.legals').hasClass("leop") ) {
    	$(".legals").stop().addClass('leop');                
    } else {
        $(".legals").stop().removeClass('leop');
    }
    
    $('.legals').toggleClass("leop");
  	return false;
});


$(".legalsopen").click( function(event){
  	event.preventDefault();
    	
    if ( $('.legals').hasClass("leop") ) {
    	$(".legals").stop().addClass('leop');                
    } else {
        $(".legals").stop().removeClass('leop');
    }
    
    $('.legals').toggleClass("leop");
  	return false;
});


