/////////////////////////////////////////////////////////////////////////////////////////////////////

// jquery.keepTop.js
// version 1.0.2 
// 09/26/2011
/////////////////////////////////////////////////////////////////////////////////////////////////////

(function( $ ){

	$.fn.keepTop = function( options ) {  
		//default settings
		var settings={
			'init':true,
			'zindex':400,
			'createPrint':false,
			'divHolder':true,
			'divHolderClass':'keepTopHolder',
			'printClass':'banner-print',
			'rulerID':'keepTopRuler',
			'left':0,
			'fitWidth':true
		};  
		return this.each(function() {
			if ( options ) { $.extend( settings, options ); }
			
			var $this = $(this);
			if(settings.init==true){	
		
				if(settings.createPrint==true)$this.clone().removeAttr('id').addClass(settings.printClass).insertAfter($this);
				if(settings.divHolder==true)$this.after("<div style='height:"+$this.outerHeight()+"px' class='"+settings.divHolderClass+"'></div>");
				
				$this.after("<div style='height:0px' id='"+settings.rulerID+"'></div>");
				$this.css({'right':'0','position':'fixed','z-index':settings.zindex});
				settings.init=false;
				$(window).scroll(function(){$this.keepTop(settings);}).resize(function(){$this.keepTop(settings);});
			
			}
			var newTop=$('#'+settings.rulerID).offset().top-$(window).scrollTop();
			if(newTop<0) newTop=0;
			if(settings.fitWidth==true){
				var left=$('#'+settings.rulerID).offset().left;
				var width=$('#'+settings.rulerID).width()-($this.outerWidth()-$this.width());
				$this.css({'width':width+"px"});
			}
			else var left=settings.left;
			$this.css({'top':newTop+"px",'left':left+"px"});
	
		}); // End each

	};// end function
})( jQuery );
