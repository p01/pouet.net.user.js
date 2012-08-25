// ==UserScript==
// @name          onelinerUnicode
// @description   Fixes Unicodes not showing up in the so famous pouët.net oneliner
// @include http://pouet.net/*
// ==/UserScript==
/*
 * 2012.08.25 mog ( mog@trbl.at ). Trying to help out, by converting the Chrome only version to this
  */
!(function ()
{   var ext = ['jpg','png','gif'];
    var prev = {href:'/* oO */'};
 	// grab all the links to a prod
     var links = document.querySelectorAll('a[href*="prod.php?which="]');

    for( var i=0, link=null; link=links[i++]; prev=link)
    {
        // look for the prod_id and make sure it's different than the previous link
        var id = link.href!=prev.href && (link.href.match(/prod.php\?which=(\d+)/)||['']).pop();
        if(!id)
            continue;

		// create a span with multiple background images, thus trying to load the screenshot in the most common image formats.
		// NB: Pouet.net uses ETAGs. The servers should not blink despite this rather brutal approach.
        var s = document.createElement('span');
        s.style.cssText='display:inline-block;vertical-align:middle;width:100px;height:75px;margin:4px 4px 0 0;'+
        	'background:no-repeat center center;background-size:contain;background-image:'+
            ext.map(function(v){ return 'url("/screenshots/'+id+'.'+v+'")'})+';';
        link.insertBefore(s,link.firstChild);
    }
})();

(function(){
	"use strict";
	
	fixOnelinerEncoding();

	function fixOnelinerEncoding() {
		
		var onelinerComment = getOneliner();

		if(onelinerComment) {
		
			$.each(onelinerComment, function(index, element){
				
				var comment = $(element).html();
				
				//remove line breaks in &am..p;
				comment = comment.replace(/(\r\n|\n|\r)/g, '');
		
				//fix encoding problem - &amp;#9829; => &#9829;
				comment = comment.replace(/&amp;#/g, '&#');
		
				//this occours on the homepage oneliner - &amp;amp;#9829; => &#9829;
				comment = comment.replace(/&amp;amp;#/g, '&#');
				
				$(element).html(comment);
			});
		}
	}
	
	function hasClass(element, cls) {
	    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
	
	function getOneliner() {
		
		//if only pouet wasn't such a birch to parse, this could be a oneliner
		var oneliner = document.querySelectorAll(('img[title="talk"]'),
			onelinerLine,
			onelinerComment;
	
		if(oneliner) {
			
			//this is horrible, but finds the table rows with comments, title and submit
			oneliner = oneliner.parent().parent().parent();
			
			//the complete oneliner even needs more parent() calls
			if(!hasClass(oneliner.parent(), 'box'))
				oneliner = oneliner.parent().parent().parent().parent();
			
			//use the user images and their link as hook, to get their parent <tr>
			onelinerLine = oneliner.querySelectorAll('a[href^="user.php?who"]').parent().parent());
			
			//now we need every third td, this holds the comment
			onelinerComment = onelinerLine.find('td:nth-child(3)');
		}
		
		return onelinerComment;
	}
}());