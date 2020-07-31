// ==UserScript==
// @name          prodScreenshot
// @version       0.1
// @description   Add the corresponding thumbnail inside each link to a prod.
// @match *://pouet.net/*
// @exclude *://pouet.net/
// @exclude *://pouet.net/index.php*
// @match *://www.pouet.net/*
// @exclude *://www.pouet.net/
// @exclude *://www.pouet.net/index.php*
// @run-at document-end
// ==/UserScript==
/*
 * 2012.08.24 Tigrou^ind ( tigrou.ind@gmail.com ). Original idea and implementation
 * 2012.08.24 Mathieu 'p01' Henri ( http://www.p01.org/ ). Rewrite working on ALL pages excluding the index which would get too busy.
 */
!(function ()
{
    var ext = ['png','jpg','gif'];
    var prev = {href:'/* oO */'};
    // grab all the links to a prod
    var links = document.querySelectorAll('a[href*="prod.php?which="]');

    for( var i=0, link=null; link=links[i++]; prev=link)
    {
        // look for the prod_id and make sure it's different than the previous link
        var id = link.href!=prev.href && (link.href.match(/prod.php\?which=(\d+)$/)||['']).pop();
        if(!id)
        {
            continue;
        }

        // create a span with multiple background images, thus trying to load the screenshot in the most common image formats.
        // NB: Pouet.net uses ETAGs. The servers should not blink despite this rather brutal approach.
        var s = document.createElement('span');
        s.style.cssText='display:inline-block;vertical-align:middle;width:100px;height:75px;margin:4px 4px 0 0;'+
            'background:no-repeat center center;background-size:contain;'
        link.insertBefore(s,link.firstChild);
        s.setAttribute('prodid', id);
    }

    //only try to load background when visible
    var refresh_handler = function(e) {
		var elements = document.querySelectorAll('span[prodid]');
        for (var i = 0, j=0; i < elements.length; i++) {
            var s = elements[i];
            var rect = s.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                var id = s.getAttribute('prodid');
                s.removeAttribute('prodid');
                setTimeout((function(s,id){s.style.backgroundImage=ext.map(function(v){ return 'url("/screenshots/'+id+'.'+v+'")'});}).bind(this,s,id), ++j*50);
            }
        }
    };

    window.addEventListener('scroll', refresh_handler);
    window.addEventListener('load', refresh_handler);
    window.addEventListener('resize', refresh_handler);
})();