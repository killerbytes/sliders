$(function() {
	var item = 4;
	var APP = {
		Init : function() {
			APP.XML(function(data) {
				BUILD.List(data);
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
		  		console.log("right");
		  	break;
		  	case "left":
		  		console.log("left");
		  	break;
		  	
		  } 
		},
		XML : function GetXML(callback) {
			$.get("xml/tarazz_AU.xml", function(data) {
				if($.isFunction(callback)) {
					var data = $(data).find('feeds');
					callback.call(data, data);
				}
			});
		}
		
	};
	var BUILD = {
		List : function(data) {
			var ul = $('<ul>');
			$(data).each(function(argument) {
				var name = $(this).find('Name');
				ul.append($('<li>').append(name))
			})
			$('#slider').html(ul);
		}
	}
	APP.Init();
})