$(document).ready(function(){
		
		//Footer Copyright Year
		$('#year').html(new Date().getFullYear());
	
		//Bam Login Form
		$('#bam-login').clickToggle(function() {
				var toggleWidth = $("#bam-login").width() == 150 ? "300px" : "150px";

				$('#bam-login').animate({ width: toggleWidth },{complete: function(){
					$("#bam-form").slideToggle();
					}
				});
				}, function() {
					$("#bam-form").slideToggle("fast", "swing", function(){
						var toggleWidth = $("#bam-login").width() == 150 ? "300px" : "150px";
						$('#bam-login').animate({ width: toggleWidth });
				});
        
		});
		

    //Set Active Class on Nav Menus
		var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1).split('.');
		$('.menu_' + filename[0]).addClass('active');		
		
		if($('body').hasClass('content_page') && filename[0] != 'bam-login') {
				$('.menu_prescription-drugs').addClass('active');	
		}
		
		
		//Invoke Equal Height Function
		equalHeight($(".bucket-content"));
		equalHeight($(".callout_div a"));
		equalHeight($(".states"));
			
		
		//Invoke Phone Link Function
		phoneLink();
		
		//Invoke Text Scaler Function
			var i = 0,
				html_txt = [];
		
			$('.textfill').each(function(){
				html_txt.push($(this).html());
				$(this).html(html_txt[i]).textfill();
				
				i += 1;
			});
	
			
			
		 //Window Resize Function
			$(window).resize(function() {
				//Equal Height 
				equalHeight($(".bucket-content"));
				equalHeight($(".callout_div a"));
				equalHeight($(".states"));
				
				//Phone Link
				phoneLink();
				
				//Text Scaler
				i = 0,
				$('.textfill').each(function(){
					$(this).html(html_txt[i]).textfill();
					i += 1;
				});
				
				//Remove off canvas menu
				$('.off-canvas-wrap').removeClass('move-left');
			});

	});
// END DOCUMENT READY FUNCTION //////////////////////////////
/////////////////////////////////////////////////////////////	
	
	
//Bam Submit Function

function submitBam() {
	
	var state,
      pgURL = window.location.href;
	
		if (pgURL.indexOf('bcbstx') > -1) {
        state = "TX";
    }  else {
        state = "IL";
    }
	
		if ($(document).width() > 640){
			$("#BamLogin").attr("action","https://members.hcsc.net/wps/PA_BAMLogin/bamGateway?corpEntCode=" + state + "1&cmdAction=doLogin").submit();
		}else {
			$("#BamLoginMobile").attr("action","https://members.hcsc.net/wps/PA_BAMLogin/bamGateway?corpEntCode=" + state + "1&cmdAction=doLogin").submit();
		}
}

function phoneLink() {
	if ($(window).width() >= 640) {
		$('a.phoneLink, a.iconLink').unbind('click', false);
		$('a.phoneLink, a.iconLink').bind('click', false);
	} else {
		$('a.phoneLink, a.iconLink').unbind('click', false);
	}
}

		
//Equal Height Function
function equalHeight(group) {
   group.css("height","auto");
   tallest = 0;
	 
	 if ($(document).width() > 640) {
		 group.each(function() {
				thisHeight = $(this).height();
				if(thisHeight > tallest) {
					 tallest = thisHeight;
				}
		 });
	 } else {
		tallest = "auto"; 
	 }
   group.height(tallest);
}




//Toggle Function
(function($) {
	$.fn.clickToggle = function(func1, func2) {
			var funcs = [func1, func2];
			this.data('toggleclicked', 0);
			this.click(function() {
					var data = $(this).data();
					var tc = data.toggleclicked;
					$.proxy(funcs[tc], this)();
					data.toggleclicked = (tc + 1) % 2;
			});
			return this;
	};
}(jQuery));





//Font Scaler Function
(function($) {
    $.fn.textfill = function(maxFontSize, maxWords) {
        maxFontSize = parseInt(maxFontSize, 10);
        maxWords = parseInt(maxWords, 10) || 1;
				var fontfamily = "'UniversCondensedBold', Arial, sans-serif",
						lineheight = ($(window).width() > 640) ? '1em' : '.9em';
						
	
				
        return this.each(function(){
            var self = $(this),
                orgText = self.text(),
                fontSize = parseInt(self.css("fontSize"), 10),
                lineHeight = parseInt(self.css("lineHeight"), 10),
                maxHeight = self.height(),
                maxWidth = self.width(),
                words = self.html().split("<br>");
            
            function calcSize(text) {
                var ourText = $("<span>"+text+"</span>").appendTo(self),
                    multiplier = maxWidth/ourText.width(),
                    newSize = fontSize*(multiplier-0.1);
                
								ourText.css({
                    "font-family": fontfamily,
										"line-height": lineheight,
										"fontSize": 
                    (maxFontSize > 0 && newSize > maxFontSize) ? 
                        maxFontSize : 
                        newSize
										});
                
								var scrollHeight = self[0].scrollHeight;
                if (scrollHeight  > maxHeight) {
                    multiplier = maxHeight/scrollHeight;
                    newSize = (newSize*multiplier);
                    ourText.css({
										"font-family": fontfamily,
										"line-height": lineheight,
                        "fontSize":
                        (maxFontSize > 0 && newSize > maxFontSize) ? 
                            maxFontSize : 
                            newSize
												});
                }
            }
            self.empty();
            if (words.length > maxWords) {
                while (words.length > 0) {
                    var newText = words.splice(0, maxWords).join(" ");
                    console.log
                    calcSize(newText);
                    self.append("<br>");
                }
            } else {
                calcSize(orgText);
            }
        });
    };
})(jQuery);