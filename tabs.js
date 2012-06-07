
(function($){


	var Tabs = function(){
		this.options = {
			menu: null,
			onShow: function(){}
		}
	}

	Tabs.prototype = {

        constructor: Tabs,

        init: function( o ){
        	$.extend( this.options, o );

			//Create the tab menu markup
			this._createMarkup();

			//Add the events to the tabs
			this._bindEvents();
			this._showAndHide( this.options.menu.find('.lefttab') );
        },

		_bindEvents: function(){
			var self = this;
			this.options.menu.find('li').each(function(){
                //Bind the click event to display/hide the tabs
                $(this).bind( 'click.tabs', function( event ){
                	event.preventDefault();
                    self._showAndHide( $(this) );
                });
            });
		},

		_showAndHide: function( tab ){
			var id = tab.find('a').attr('href');

			//Show the tab
            tab.addClass('tabactive').siblings().removeClass('tabactive');   

            //Display the correct tab container
            this.element.find('#'+id).show()
            			.siblings('.tab-container').hide();
            
            //Trigger the custom onShow event
            this.options.onShow( this.element.find('#'+id) );
		},

		_createMarkup: function(){
			var i,
				mkp = '<div class="tabs-menu"><ul>',
				elements = this.element.find('.tab-container');
			
			//Create menu markup
			for(i=0;i<elements.length;i++){
				elem = $(elements[i]);
				mkp += 	'<li>'+
							'<a href="#'+elem.attr('id')+'">'+
								'<span>'+elem.attr('title')+'</span>'+
							'</a>'+
						'</li>';
			}

			//Add the menu markup
			if( this.options.menu ){
				this.options.menu.prepend( '<ul>' + mkp + '</ul>' )
								 .addClass('tabs-menu');
			} else {
				this.element.prepend( '<div class="tabs-menu"><ul>' + mkp + '</ul></div>' );
				this.options.menu = this.element.find('.tabs-menu');
			}

			//Assign left and right tabs, show left
			this.options.menu.find('li:first').addClass('lefttab');
			this.options.menu.find('li:last').addClass('righttab');			
		}
	};

	$.fn.tabs = function( method ){
		var data, args = arguments;

		//Return if no tab containers found
		if( !this.find('.tab-container').length ){
			return;
		}
	
		return this.each(function(){     
            data = $(this).data('tabs');            
            if( !data ){
            	//Instantiate tabs
                $(this).data('tabs', { o : new Tabs() });
                data = $(this).data('tabs');
                data.o.element = $(this);
                data.o.init( method ); //'method' will be options object here
            }     
        });  
	}
})(jQuery);