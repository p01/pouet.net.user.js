// ==UserScript==
// @name          unicoder
// @description   Time is to unicode on the pouet.net
// @include http://pouet.net/*
// @include http://www.pouet.net/*
// ==/UserScript==
/*
 * 2012.08.26 Mathieu 'p01' Henri ( http://www.p01.org/ ).
 */
!(function ()
{
	// grab the elements whose textNode contains a "&"
	var textnodes = document.evaluate( '//*[contains(text(),"&")]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for( var i=0, e; e=textnodes.snapshotItem(i++); )
	{
		// catter for double escaping
		var t=e.textContent.replace( /\&amp;/g, '&' );
		// look for &#1337; codes, withstanding line breaks.
		while( f=(t.match( /\&[\n\r]?#[\n\r]?[\n\r\d]+;/ )||['']).pop() )
			// replace the code by the correstponding character
			t = t.replace( f, String.fromCharCode( Number(f.replace(/\D/g,''))) );
		// and voila
		e.textContent = t;
	}
})();