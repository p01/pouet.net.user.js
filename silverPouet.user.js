// ==UserScript==
// @name          Silver Pouet | v0.01
// @description	  Add a silver screen to watch video links without leaving Pouet.net.
// @include       http://pouet.net/*
// @include       http://*.pouet.net/*
// ==/UserScript==

/*
 * (c) 2012-2013 by Mathieu 'p01' HENRI ( http://www.p01.org ) and mog ( @mehmog )
 * Inspired and partly lifted from https://github.com/mog/pouet.net.user.js/blob/master/demoishVideoEmbed.js by mog / trbl & 3ln
 *
 * Links pointing to a recognized video get a clickable icon that updates the silver screen that drops down on hover.
 * This script supersede the ytEmbed.user.js.
 */

!(function(embedable)
{
	var CLASSNAME = 'silver-screen-'+ (''+Math.random()).slice(2);
	var S = document.createElement('style');
	var rules = '.'+CLASSNAME+'{position:fixed; top:-94%; left:.5%; width:99%; height:98%; background:#000; transition:all .3s ease-in-out; z-index: 2; box-shadow:0 0 1ex #000;border-right:1px solid #000;}.'+CLASSNAME+':hover{ top: 1%; }';
	rules += '\nspan[data-video-source]{cursor:pointer; display:inline-block; width: 16px; height: 16px; background: #357; padding: 3px; margin: 1px 4px 1px 1px; border-radius: 4px; box-shadow: 0 2px 4px #024 inset, 0 -1px 1px #9bd inset; text-shadow: 0 1px #024; vertical-align: middle;}';
	rules += '\nspan[data-video-source]:hover{background: #246;}';
	
	var count = 0;
	Object.keys(embedable).forEach(function(source)
	{
		var o = embedable[source];
		rules += '\nspan[data-video-source='+ source +']{content:url('+ o.favicon +');}';
		var list = document.querySelectorAll(o.selector);
		Array.prototype.forEach.call(list, function(e)
		{
			var id = (e.href.replace(/#.+/,'').match(o.id)||['']).pop();
			if (id)
			{
				var n = document.createElement('span');
				e.parentNode.insertBefore(n,e);
				n.setAttribute('data-video-id', id);
				n.setAttribute('data-video-source', source);
				count++;
			}
		}, this);
	});

	if (!count)
		return;

	var T = document.createElement('object');
	T.width = 640;
	T.height = 360;
	T.frameBorder = 0;
	T.allowfullscreen = 1;
	T.className = CLASSNAME;

	S.textContent = rules;
	document.head.appendChild(S);

	document.addEventListener("click", function(e)
	{
		var src = e.target.getAttribute("data-video-id");
		src = src && embedable[e.target.getAttribute("data-video-source")].src + src;
		if(src && src != T.data)
		{
			T.data = src;
			if (!T.parentNode)
				document.body.appendChild(T);
		} 
	});
})(
{
	youtube:
	{
		'selector': 'a[href*="youtu"]',
		'id': /(v=|youtu\.be\/)([^&\?]+)/,
		'favicon': 'http://youtube.com/favicon.ico',
		'src': 'http://www.youtube.com/embed/'
	},
	vimeo:
	{
		'selector': 'a[href*="vimeo"]',
		'id': /(vimeo\.com\/)([^&\?]+)/,
		'favicon': 'http://vimeo.com/favicon.ico',
		'src': 'http://player.vimeo.com/video/'
	},
	liveleak:
	{
        'selector': 'a[href*="liveleak.com/view?i="]',
        'id': /(i=)([^&\?]+)/,
		'favicon': 'http://liveleak.com/favicon.ico',
        'src': 'http://www.liveleak.com/e/'
    },
    dailymotion:
    {
    	'selector': 'a[href*="dailymotion.com/video/"]',
    	'id': /(video\/)([^_]+)/,
		'favicon': 'http://dailymotion.com/favicon.ico',
    	'src': 'http://www.dailymotion.com/embed/video/'
    },
    cappedtv:
    {
    	'selector': 'a[href*="capped.tv/"]',
    	'id': /(capped\.tv\/)(.+)/,
		'favicon': 'http://capped.tv/favicon.ico',
    	'src': 'http://capped.micksam7.com/play.swf?vid='
    },
    video:
    {
    	'selector': 'a[href*=".avi"],a[href*=".mp4"],a[href*=".mpg"]',
    	'id': /(^.*\.avi$|^.*\.mp4$|^.*\.mpg$)/,
		'favicon': 'http://www.pouet.net/favicon.ico',
    	'src': 'http://dhs.nu/player.swf?autostart=true&amp;file=' // :p Hope that's OK guys.
    }
});
