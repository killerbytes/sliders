$(function() {
	var setting = {
		item : 3,
		elem : $('#slider'),
		xml : '',
		timer : 0,
		delay : 3000,
		autoSlide : function () {
	  		APP.Animate('right');
		}
	}
	var elem = $('#slider');
	var APP = {
		Init : function() {
			APP.XML(function(data) {
				setting.xml = data;
				APP.Load(setting.xml.splice(0,setting.item));
				APP.Load(setting.xml.splice(0,setting.item));
			});
			APP.BindKeys();
			APP.AutoSlide();
		},
		BindKeys: function() {
			$('.button').click(function () {
			  	APP.Animate(this.id);
			})
		},
		AutoSlide : function () {
		   clearTimeout(setting.timer);
		   setting.timer = setInterval(setting.autoSlide,setting.delay);
		},
		Animate: function (direction) {
		  var width = elem.find('li:first').width();
		  var left = -(width*setting.item);
		  var margin =  parseInt(elem.find('li:first').css('margin-left')) || 0; 
		  var leftMargin = margin+left  
		  switch(direction){
		  	case "right":
		  		var max = elem.find('li').length * width;
		  		if(APP.Load(setting.xml.splice(0,setting.item))){
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
			if(!setting.elem.find('li').is(':animated')){
	  			setting.elem.find('li:first').animate({'margin-left':(margin)+'px'},500);
	  		}
		},
		Load: function  (images) {
		  $(images).each(function () {
		 	 BUILD.List(this);
		  })
		  return images.length==0?true:false;
		},
		XML : function GetXML(callback) {
			$.ajax({
				type: "GET",
				dataType: "xml",
				url:"xml/tarazz_AU.xml" 	,
				success: function(data) {
					if($.isFunction(callback)) {
						var data = $(data).find('feeds');
						setting.xml = data;
						callback.call(data, data);
					}
				}
			});
		}
	};
	
	var ss = {
		List : function (item) {
			 var src= $(item).find('image').text();
			 var img = $('<img>',{"src": "http://www.tarazz.com" + src});
			 var div = $('<span>',{"class":"test"}).text('asdfsdf');
			 elem.find('ul').append($('<li>').append(div).append(img));
		}
	}
	
	var BUILD = {
		List : function (item) {
			 var src= $(item).find('image').text();
			 var img = $('<img>',{"src": "http://www.tarazz.com" + src});
			 elem.find('ul').append($('<li>').append(img));
		}
	}
	
    //$.extend(BUILD,ss);

	APP.Init();
	
	console.log(BUILD);
	
	
})