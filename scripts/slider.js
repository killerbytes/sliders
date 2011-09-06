$(function() {
	var item = 2;
	var elem = $('#slider');
	var temp = $('#temp')
	var xml;
	var APP = {
		Init : function() {
			APP.XML(function(data) {
				BUILD.List(data);
				//elem.find('ul').append(temp.find('li:lt('+item+')'));
				APP.Load(temp.find('li:lt('+item+')'));
				
			});
			APP.BindKeys();
			
		},
		BindKeys: function() {
			$('.button').click(function () {
			  	APP.Animate(this.id);
			})
		},
		Animate: function (direction) {
		  switch(direction){
		  	case "right":
		  		
		  		temp.find('ul').append(elem.find('li:lt('+item+')'))
		  		APP.Load(temp.find('li:lt('+item+')'));
		  		break;
		  	case "left":
		  		console.log("left");
		  		break;
		  } 
		},
		Load: function  (li) {
		  $(li).each(function () {
			 var src= $(this).find('image').text();
			 var img = $('<img>',{"src": "http://www.tarazz.com" + src});
			 elem.append($('<li>').append(img));
		  })
		},
		XML : function GetXML(callback) {
			$.ajax({
				type: "GET",
				dataType: "xml",
				url:"xml/tarazz_AU.xml" 	,
				success: function(data) {
					if($.isFunction(callback)) {
						var data = $(data).find('feeds');
						xml = data;
						callback.call(data, data);
					}
				}
			});
		}
		
	};
	
	var BUILD = {		List : function(data) {
			var ul = $('<ul>');
			$(data).each(function() {
				var name = $(this).find('image');
				ul.append($('<li>').append(name))
			})
			$('#temp').html(ul);
		}
	}
	APP.Init();
})