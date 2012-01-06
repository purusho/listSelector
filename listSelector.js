;(function($) {
	$.fn.listSelector = function(options) {
		return this.each(function() {
			var $element = $(this),
				$selectors = $('<div/>'),
				$container = $('body'),
				params = {
					'data': {},
					selected:[],
			};
			
			$.extend(true, params, options);
			
			//select element
			$selectors.delegate('span', 'click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				var $this = $(this),
					selectedKey = $this.data('key').toString();
				if(!$this.hasClass('selected')) {
					params.data[selectedKey]['selected'] = "true";
					$this.addClass("selected");
					if(params.selected.indexOf(selectedKey) == -1)
						params.selected.push(selectedKey);
				}
				else {
					$this.removeClass("selected");
					params.data[selectedKey]['selected'] = "false";
					var indexOfElement = params.selected.indexOf(selectedKey);
					params.selected.splice(indexOfElement, 1);	
				}

				$element.val(params.selected.join(','));
			});

			//close on outside clic
			$container.click(function(event) {
				$selectors.hide();
			});

			function init() {
				for(key in params.data) {
					if(params.data[key]['selected'] == 'true')
						params.selected.push(key);
				}
			}
			
			function buildElementDisplay() {
				$selectors.empty();
				var listWrapper = '<ul>',
					key;
				for(key in params.data) {
					listWrapper += '<li><span data-key="' + key + '" ' + (($.inArray(key, params.selected) != -1) ? "class=\"selected\"" :"") + '>' + params.data[key].name + '</span></li>';
				}
				listWrapper += '</ul>';
				$(listWrapper).appendTo($selectors);
				$selectors.show();
				$container.append($selectors);
			}

			$element.bind('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				$element.val(params.selected.join(','));
				if(!$selectors.is(':visible')) {
					buildElementDisplay();
				}
			});

			//call init function
			init();
		});
	}
})(jQuery);