;(function($, window, document, undefined) {
	var depthNode = 0;
	
	var params = {
			prependHasChildren:"",
			openAll: false,
			openUrl: null
	};
	
	
	var methods = {
		
		init : function(_params) {
			setParams(_params);
			this.children("li").children("a").addClass("level-1").addClass("menu-corner-all").attr("name", "level-1");
			this.children("li").attr("name", "level-1");
			this.find("ul").children("li").hide();
			this.find("li").has('ul').addClass("has-chlidren");
			this.find("li").not(":has(ul)").addClass("no-chlidren");
			this.find("a").attr("active", "false");
			var menu = this;
			this.find("li.has-chlidren > a").prepend(params.prependHasChildren);

			this.find("a").click(function (e) {
				$(this).blur();
				var active = $(this).attr("active");
				var level = $(this).attr("name");
				var elemUl = $(this).parent("li").children("ul");
				var elemThis = $(this);
				var className = $(this).parent("li").attr("class");
				if($(this).parent("li").children("ul").children("li").css("display")=="none" ||  $(this).parent("li").children("ul").size()==0)	{
					active = true;
				}	else	{
					active = false;
				}
				menu.find("li").removeClass("active");
				//activate
				if(active)	{
					if(level=="level-1")	{
						menu.find("a[name='level-1']").removeClass("active-element");
						menu.find("li[name='level-1'] ul").removeClass("level-2");
						menu.find("a[name='level-1']").removeClass("menu-corner-top").addClass("menu-corner-all");
						menu.children("li").children("a").addClass("level-1");
						$(this).removeClass("level-1").addClass("active-element");
						if(className=="has-chlidren")	{
							elemUl.addClass("level-2");
							$(this).removeClass("menu-corner-all").addClass("menu-corner-top");
						}
					}	else	{
						menu.find("a").removeClass("active-element");
						$(this).addClass("active-element");
					}
					$(this).parent("li").addClass("active");
					$(this).attr("active", "true");
					menu.find("a").not(this).attr("active", "false");
					menu.find("ul").children("li").hide();
					showAllParents($(this).parent("li"), true);
					$(this).parent("li").children("ul").each(function( index ) {
						  $(this).children("li").slideDown('fast');
					});
				//deactivate
				}	else	{
					showAllParents($(this).parent("li"), true);
					if(level!="level-1")	{
						$(this).removeClass("active-element");
					}	
					$(this).parent("li").children("ul").each(function( index ) {
						  $(this).children("li").slideUp('fast', function() {
							  $(this).children("a").removeClass("active-element");
							  if(level=="level-1")	{
								  elemUl.removeClass("level-2");
								  elemThis.removeClass("menu-corner-top").addClass("menu-corner-all");
								  elemThis.removeClass("active-element").addClass("level-1").attr("active", "false");
								}	
						  });
					});
				}
			});
			
			if(params.openUrl!=null&&params.openUrl){
				var node = this.find("a[href~='"+ params.openUrl + "']");
				openNode(node);
			}
			
			if(params.openAll!=null&&params.openAll){
				this.find("ul > li").show();
			}
			
			return this;
		},
		
		openMenu : function(nomLink) {
			
			this.find("ul").children("li").hide();
			this.find("a").removeClass("active-element");
			this.children("li").children("a").addClass("level-1");
			this.find("a[name='level-1']").removeClass("menu-corner-top").addClass("menu-corner-all");
			this.find("li[name='level-1'] ul").removeClass("level-2");
			
			if(typeof nomLink === 'undefined'){
				this.find("li").each(function( index ) {
					console.log($(this).text());
					showAllParents($(this));
				});
			}	else	{
				var node = this.find("a[href~='"+ nomLink + "']");
				openNode(node);
			}
			return this;
		},
		
		closeMenu : function() {
			this.find("ul").children("li").hide();
			this.find("a").removeClass("active-element");
			this.children("li").children("a").addClass("level-1");
			this.find("a[name='level-1']").removeClass("menu-corner-top").addClass("menu-corner-all");
			this.find("li[name='level-1'] ul").removeClass("level-2");
			return this;
		}
		
	};
	
	
	function openNode(node)	{
		showAllParents(node.parent("li"), true);
		node.addClass("active-element");
		node.parent("li").addClass("active");
		node.parent("li").children("ul").each(function( index ) {
			  $(this).children("li").show();
		});
	};
	
	function getLevelNode(node, level)	{
		if(node.parents("li").length>0)	{
			level++;
			getLevelNode(node.parent("ul").parent("li"), level);
		}	else	{
			depthNode = level;
		}
	};
	
	function showAllParents(node, markAsActive)	{
		node.show();
		if(markAsActive != undefined && markAsActive)	{
			node.children("a").addClass("active-element");
			node.addClass("active");
		}
		var level = node.attr("name");

		if(level=="level-1")	{
			var className = node.attr("class");
			if(className=="has-chlidren")	{
				node.children("ul").addClass("level-2");
				node.find("a[name='level-1']").removeClass("menu-corner-all").addClass("menu-corner-top");
			}
		}
		node.siblings().show();
		if(node.parents("li").length>0)	{
			showAllParents(node.parent("ul").parent("li"), markAsActive);
		}	else	{
			return node;
		}
	};
	
	var setParams	= function(_params)	{
		if ( typeof _params === "object" ) {
			$.each(_params, function(index, p) {
				params[index] = p; 
			});
		}
	};

	$.fn.accordionMenu = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery, window, document);