// ==UserScript==
// @name          prodScreenshot
// @description   Add the corresponding thumbnail inside each link to a prod.
// @include http://pouet.net/*
// @exclude http://pouet.net/
// @exclude http://pouet.net/index.php*
// @include http://www.pouet.net/*
// @exclude http://www.pouet.net/
// @exclude http://www.pouet.net/index.php*
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

    for( var i=0, j=0, link=null; link=links[i++]; prev=link)
    {
        // look for the prod_id and make sure it's different than the previous link
        var id = link.href!=prev.href && (link.href.match(/prod.php\?which=(\d+)$/)||['']).pop();
        if(!id)
            continue;

        // create a span with multiple background images, thus trying to load the screenshot in the most common image formats.
        // NB: Pouet.net uses ETAGs. The servers should not blink despite this rather brutal approach.
        var s = document.createElement('span');
        s.style.cssText='display:inline-block;vertical-align:middle;width:100px;height:75px;margin:4px 4px 0 0;'+
            'background:no-repeat center center;background-size:contain;'
        link.insertBefore(s,link.firstChild);
        setTimeout((function(s,id){s.style.backgroundImage=ext.map(function(v){ return 'url("/screenshots/'+id+'.'+v+'")'});}).bind(this,s,id), ++j*50);
    }
})();