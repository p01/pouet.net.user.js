// ==UserScript==
// @name          Pouet 'YT embed'
// @version       0.01
// @description	  replace the screenshot of the prods on Pouet.net by the embedded YT capture if possible
// @match       *://pouet.net/prod.php*
// @match       *://*.pouet.net/prod.php*
// ==/UserScript==

/* (c) August 2012 by Mathieu 'P01' HENRI ( http://www.p01.org ) */

!(function()
{	//	replace screenshot by embeded YT capture if possible
	var screenshot = document.querySelector('#screenshot img');
	var yt = screenshot && document.querySelector('#links a[href*="v="][href*="youtu"]');
	if( yt )
	{
		var i=document.createElement('iframe');
		var code = (yt.href.match(/(v=|youtu\.be\/)([^&\?]+)/)||['']).pop();
		i.width=400;
		i.height=300;
		i.frameBorder=0;
		i.allowfullscreen=1;
		i.src = 'https://www.youtube.com/embed/'+code;
		screenshot.parentNode.appendChild(i);
		screenshot.parentNode.removeChild(screenshot);
	}
})();
