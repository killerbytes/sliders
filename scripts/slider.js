
$.fn.SLIDER = function(list,options) {
	var setting = {
		item : 4,
		delay : 1000,
		auto : true
	}
	var	autoSlide = function () {
	  		APP.Animate('right');
		}
	var timer,elem = $(this);
	setting = $.extend(setting,options);

	var APP = {
		Init : function() {
			APP.Load(list.splice(0,setting.item));
			APP.Load(list.splice(0,setting.item));
			APP.BindKeys();
			APP.AutoSlide();
		},
		BindKeys: function() {
			elem.find('.button').click(function () {
			  	APP.Animate(this.id);
			})
			elem.find('ul, #controls span').bind('mouseover mouseout',function(evt){
				switch(evt.type){
					case 'mouseover':
						setting.auto = false;
					break;
					case 'mouseout':
						setting.auto = true;
					break;
				}
				APP.AutoSlide();
			})
		},
		AutoSlide : function () {
		   clearTimeout(timer);
			if(setting.auto){
			   timer = setInterval(autoSlide,setting.delay);
			}
		},
		Animate: function (direction) {
		  var width = elem.find('li:first').width();
		  var left = -(width*setting.item);
		  var margin =  parseInt(elem.find('li:first').css('margin-left')) || 0; 
		  var leftMargin = margin+left  
		  switch(direction){
		  	case "right":
		  		var max = elem.find('li').length * width;
		  		if(APP.Load(list.splice(0,setting.item))){
		  			 if((-(margin + left)) >= max){
		  			 	leftMargin = 0;
		  			 }
		  		}
				APP.Slide(leftMargin);
		  		break;
		  	case "left":
		  		if(margin != 0){
					leftMargin = margin-left  
					APP.Slide(leftMargin);
		  		}
		  		break;
		  } 
		},
		Slide : function  (margin) {
			if(!elem.find('li').is(':animated')){
	  			elem.find('li:first').animate({'margin-left':(margin)+'px'},500);
	  		}
		},
		Load: function  (items) {
		  $(items).each(function () {
		 	 BUILD.List(this);
		  })
		  return items.length==0?true:false;
		}
	};
	var BUILD = {
		List : function (item) {
			 var src= $(item).find('image').text();
			 var img = $('<img>',{"src": "http://www.tarazz.com" + src});
			 var anchor = $('<a>',{"href":$(item).find('link').text()}).append(img);
			 elem.find('ul').append($('<li>').append(anchor));
		}
	}
	APP.Init();
};