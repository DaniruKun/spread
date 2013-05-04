require.config( {

	urlArgs: "bust=" +  Date.now(),

	paths: {
		text: "libs/require/plugin.text",
		dat: "libs/dat"
	}

} );

require( [ "spread/Controller" ], function( Flip ) {

	var container = document.getElementById( "container" );
	var tag = document.getElementById( "tag" );

	initListeners();
	setTag();

	function setTag() {
		tag.className = "before in";

		setTimeout( function() {
			tag.className = "";
		}, 300 );
	}

	function initListeners() {

		document.addEventListener( "click", onClick, false );
		document.addEventListener( "touchstart", onTouchEnd, false );

	}

	function onClick( event ) {

		var div = document.createElement( "div" );

		var size = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		var position = {
			x: event.pageX,
			y: event.pageY
		}

		var flip = new Flip( div, size, position );

		flip.onComplete( function() {

			document.body.style.backgroundColor = flip.getColor();
			container.removeChild( div );

		} );

		container.appendChild( div );

	}

	function onTouchEnd( event ) {

		var touch = event.touches[ 0 ];

		event.pageX = touch.pageX;
		event.pageY = touch.pageY;

		onClick( event );
	}

} );