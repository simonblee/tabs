(function($){
	$.fn.tabs = function ( options ) {

		return this.each( function () {  
			var menu,
				mkp = '',
				$this = $(this),
				tmpl = '<li class="{class}"><a href="#{id}"><span>{title}</span></a></li>',
				elements = $this.find('.tab-container');

			//Return if no tab containers found
			if( !$this.find('.tab-container').length ){
				return;
			}

			// Overwrite defaults
			defaults = {
				menu: null,
				show: 0, //index of tab to show on init
				onShow: function(){}
			};
			options = $.extend( {}, defaults, options );

			// Create markup
			for( i=0; i<elements.length; i++ ){
				cls = i === 0 ? 'lefttab' : ( i === elements.length - 1  ? 'righttab' : '' );
				mkp +=  tmpl.replace( '{class}', cls )
							.replace( '{id}', $(elements[i]).attr('id') )
							.replace( '{title}', $(elements[i]).attr('title') );
			}
			mkp = '<ul>' + mkp + '</ul>';
			menu = options.menu ? $( mkp ).prependTo( options.menu ) : $( '<div class="tabs-menu">'+mkp+'</div>' ).prependTo( $this );

			// Bind the keyup event, and show the desired tab
			menu.find('li').on( 'click.tabs', function ( event ) {
				$(this).addClass('tabactive').siblings().removeClass('tabactive');   
				$this.find( '#' + $(this).find('a').attr('href') ).show().siblings('.tab-container').hide();
				options.onShow.call( $(this) );
				event.preventDefault();
			}).eq( options.show ).trigger( 'click.tabs' );
		});
	};
})(jQuery);