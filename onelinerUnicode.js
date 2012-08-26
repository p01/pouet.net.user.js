// ==UserScript==
// @name        onelinerUnicode
// @namespace   Pouet.net.user
// @description Fixes Unicodes not showing up in the so famous pouët.net oneliner
// @include     http://www.pouet.net/*
// @include     http://www.pouet.net/index.php
// @include     http://www.pouet.net/oneliner.php
// ==/UserScript==
(function(){
	"use strict";
	
	fixOnelinerEncoding();

	function fixOnelinerEncoding() {
		
		var onelinerComment = getOneliner();

		if(onelinerComment && (onelinerComment.length > 0)) {
		
			for(var i = 0; i < onelinerComment.length; i++) {
				
				var element = onelinerComment[i];
				
				var comment = element.innerHTML;
				
				//remove line breaks in &am..p;
				comment = comment.replace(/(\r\n|\n|\r)/g, '');
		
				//fix encoding problem - &amp;#9829; => &#9829;
				comment = comment.replace(/&amp;#/g, '&#');
		
				//this occours on the homepage oneliner - &amp;amp;#9829; => &#9829;
				comment = comment.replace(/&amp;amp;#/g, '&#');
				
				element.innerHTML = comment;
			}
		}
	}
	
	function hasClass(element, cls) {
	    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
	
	function getOneliner() {
		
		//if only pouet wasn't such a birch to parse, this could be a oneliner
		var oneliner = (document.querySelectorAll('img[title="talk"]'))[0],
			onelinerLine,
			onelinerComment = [];
	
		if(oneliner) {
			
			//this is horrible, but finds the table rows with comments, title and submit
			oneliner = oneliner.parentNode.parentNode.parentNode;
			
			//the complete oneliner even needs more parent() calls
			if(!hasClass(oneliner.parentNode, 'box'))
				oneliner = oneliner.parentNode.parentNode.parentNode.parentNode;

			//use the user images and their link as hook, to get their parent <tr>
			onelinerLine = oneliner.querySelectorAll('a[href^="user.php?who"]');
			
			//go up two nodes to the <tr> then find the third <td>, this holds the comment (first <td> is the pic above)
			for(var i = 0; i < onelinerLine.length; i++) {
				onelinerComment.push( (onelinerLine[i].parentNode.parentNode).querySelectorAll('td:nth-child(3)')[0] );
			}
		}
		
		return onelinerComment;
	}
	
}());