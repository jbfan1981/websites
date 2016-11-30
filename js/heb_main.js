// JavaScript Document


/**
 * Set Responsive Elements
 */
 
function reflow (docHeight, winWidth, phoneNum, phoneNumLink, iphone) {
	$('#complementary').css('height' , docHeight + 'px');
	
	if (winWidth > 768) {
		$('body').removeClass('active');
		$('.phoneNumber').empty().html(phoneNum);
	
	} else {		
		if (!iphone) {
			//set phone number href for iphone
			$('.phoneNumber').empty().html('<a href="tel:' + phoneNumLink + '">' + phoneNum + '</a>');
		}
	}
	
	
	//provider finder link click function
	$('a.provFinder').off('click').click(function(e) {
    provFinder(winWidth);
  });
}




/**
 * Column Equilizer Function
 */
function equilizer (winWidth) {
	
		var colHeights = [],
					colHeight,
					$equilize = $('.equilize');
					
		$($equilize).css('height', 'auto');
	
		if (winWidth > 480) {
			
				$equilize.each(function() {
					colHeights.push($(this).height());
				});
				
				colHeight = Math.max.apply(Math, colHeights);
				
				$($equilize).css('height', colHeight);
				
				colHeights = [];
		}
}


/**
 * Handle Provider Finder Links
 */
function provFinder (winWidth) {	
			var provFinderLink;
			
			if (winWidth < 769) {
				provFinderLink = "http://public.hcsc.net/MobileProviderFinder/?a=bcbstx";
			}
			else {
				provFinderLink = "https://public.hcsc.net/providerfinder/search.do?corpEntCd=TX1"
			}
			
			//if (es === true) { provFinderLink = provFinderLink + "&lang=es";}
			
			window.open(provFinderLink);
			return false;	
}





/**
 * Document Ready Function
 */
$(document).ready(function(e) {
	
  
	//Set doc variables
	var docURL = window.location.href ,
			docHeight = $(document).height() ,
			winWidth = $(window).width(),
			phoneNum,
			phoneNumLink,
			iphone;
			
			
	if ($('.phoneNumber').html()) {
			phoneNum = $('.phoneNumber').html(),
			phoneNumLink = phoneNum.replace(/-/g, '');
	}
		


	
	//Reload page on mobile when back button is clicked to close menu
	if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
		window.onpageshow = function(e) {
			if (e.persisted) {
				document.body.style.display = "none";
				location.reload();
			}
		};
		
		iphone = true;
		
	}
	

	
	
	//Call reflow function both on load and on window resize
	reflow(docHeight , winWidth, phoneNum, phoneNumLink, iphone);
	equilizer(winWidth);
	
	$( window ).resize(function() {
		docHeight = $(document).height();
		winWidth = $(window).width();
				
			reflow(docHeight , winWidth, phoneNum, phoneNumLink, iphone);
			equilizer(winWidth);
	});
	
	//Login header function
	$('#login-heb').click(function() {
		$('#login-heb').css('display','none');
		$('#loginContainer').css('display','block');
	});
	//$('#login-heb').click(function() {
		//$('#loginContainer').css('display','block');
	//});
	



	
});

	//Login Validation function 
	function submitBamtx() {
$("#BamLogin").attr("action","https://members.hcsc.net/wps/PA_BAMLogin/bamGateway?corpEntCode=TX1&cmdAction=doLogin");	
document.getElementById('BamLogin').submit();
//return false;
}