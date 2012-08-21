// ==UserScript==
// @name          Pouet 'attention whores' toggle | v1.01
// @description	  adds to Pouet.net a feature to flag some users as 'attention whores' and to hide their messages
// @include       http://pouet.net/
// @include       http://pouet.net/index.php*
// @include       http://pouet.net/prod.php*
// @include       http://pouet.net/topic.php*
// @include       http://pouet.net/bbs.php*
// @include       http://pouet.net/oneliner.php*
// @include       http://pouet.net/comments.php*
// @include       http://*.pouet.net/
// @include       http://*.pouet.net/index.php*
// @include       http://*.pouet.net/prod.php*
// @include       http://*.pouet.net/topic.php*
// @include       http://*.pouet.net/bbs.php*
// @include       http://*.pouet.net/oneliner.php*
// @include       http://*.pouet.net/comments.php*
// ==/UserScript==

/* (c) january2005 by Mathieu 'P01' HENRI ( http://www.p01.org ) */



function toggleAttentionWhoresDisplay( maintainAttentionWhoresHiddenFlag )
/*
*	toggleAttentionWhoresDisplay( )
*	toggles the display of the 'attention whores'
*/
{
	if( !maintainAttentionWhoresHiddenFlag )
		attentionWhoresHidden ^= 1
	setCookie( "attentionWhoresHidden", attentionWhoresHidden, "pouet.net", "" )
	document.body.className = attentionWhoresHidden?"hide_attention_whores":""
	if( !attentionWhoresHidden )
	{
		var attentionWhoresIdReversedArray = []
		for( var i in attentionWhoresIdArray )
			if( attentionWhoresIdArray[ i ] )
				attentionWhoresIdReversedArray.push( i )
		var additionalHtml = attentionWhoresIdReversedArray.join(", ")
		additionalHtml = "<div id='attentionWhoresList'>"+ additionalHtml.replace( /(\d+)/g, "<a href=\"http://www.pouet.net/user.php?who=$1\" title=\"this user is an 'attention whore'\">$1</a>" ) +"</div>"
	}
	else
		var additionalHtml = ""

	document.getElementById('attentionWhoresDisplayToggle').innerHTML = '<img src="gfx/titles/trompette.gif" /> <span>\x27attention whores\x27 '+ (attentionWhoresHidden?'hidden':'visible') +'</span>'+ additionalHtml
	
}
function toggleAttentionWhorestatus( )
/*
*	toggleAttentionWhorestatus( )
*	toggles the 'attention whores' status of a user
*/
{
	attentionWhoresIdArray[ this.rel ] ^= 1
	createAttentionWhoresCssRule()
	toggleAttentionWhoresDisplay( true )
}

function addCssRule( selector, rule )
/*
*	addCssRule( selector, rule )
*	adds a CSS rule
*/
{
	styleSheetHandle.insertRule( selector +' { ' + rule + ' }', styleSheetHandle.cssRules.length )
}

function createAttentionWhoresCssRule( attentionWhoresIdCsv )
/*
*	createAttentionWhoresCssRule( )
*	creates the CSS rules to hide the 'attention whores'
*/
{
	while( styleSheetHandle.cssRules.length > requiredCssRules )
		styleSheetHandle.deleteRule( requiredCssRules )

	var attentionWhoresIdReversedArray = []
	for( var i in attentionWhoresIdArray )
		if( attentionWhoresIdArray[ i ] )
			attentionWhoresIdReversedArray.push( i )
	var attentionWhoresIdCsv = attentionWhoresIdReversedArray.join(",")
	setCookie( "attentionWhores", attentionWhoresIdCsv, "pouet.net", "" )
	if( attentionWhoresIdCsv=="" )
		return

	addCssRule( attentionWhoresIdCsv.replace( /(\d+)/g, "body.hide_attention_whores *[class='cite-$1']" ), "display:none;" )
	addCssRule( attentionWhoresIdCsv.replace( /(\d+)/g, "*[class='cite-$1'] > *" ), "background:#444;" )
}

function setCookie( name, value, domain, path )
{
	 var expires = new Date()
	 expires.setTime( expires.getTime() + 1000*60*60*24*365 )
	 document.cookie = name +"="+ ( value )+";expires="+ expires +";domain="+ domain +";path="+ path
}

function getCookie()
{
	var cookiesArray = (""+document.cookie).split(";")
	for( var i in cookiesArray )
	{
		var currentCookie = cookiesArray[i].split( "=" )
		currentCookie[0] = currentCookie[0].replace( /^\s*(.*\S)\s*$/, "$1" )
		if( currentCookie[0]=="attentionWhores" && currentCookie[1]!="")
		{
			var tmpArray = currentCookie[1].split( "," )
			for( var j in tmpArray )
				attentionWhoresIdArray[ tmpArray[j] ] = 1
		}
		else if( currentCookie[0]=="attentionWhoresHidden" )
		{
			attentionWhoresHidden = parseInt( currentCookie[1] )
		}
		
	}
}



// create the attentionWhoresIdArray
var	attentionWhoresIdArray	= [],
	attentionWhoresHidden	= 1


// adds a stylesheet node if need be
if( document.styleSheets.length == 0 )
{
	var styleElement = document.createElement('style')
	if( styleElement )
	{
		styleElement.type	= 'text/css'
		document.getElementsByTagName('head')[0].appendChild( styleElement )
	}
}
var styleSheetHandle = document.styleSheets[0]


// adds the required rules
addCssRule( ".attentionWhorestatusToggle", "padding:4px;width:8px;height:8px;cursor:pointer;border:0;margin-right:2px;background:#000;-moz-border-radius:4px;" )
addCssRule( ".attentionWhorestatusToggle:hover", "padding:2px;width:12px;height:12px;cursor:pointer;" )
addCssRule( "#attentionWhoresDisplayToggle", "position:fixed;left:4px;top:4px;background:#000;-moz-border-radius:7px;color:#fff;cursor:pointer;padding:4px;font:18px system;border:2px solid #396BA5;" )
addCssRule( "#attentionWhoresDisplayToggle img", "width:16px;height:16px;padding:4px;vertical-align:middle;text-align:center;" )
addCssRule( "#attentionWhoresDisplayToggle:hover img", "width:24px;height:24px;padding:0px;" )
addCssRule( "#attentionWhoresDisplayToggle span, #attentionWhoresDisplayToggle div, body.hide_attention_whores .attentionWhorestatusToggle", "display:none;" )
addCssRule( "#attentionWhoresList *", "font:10px verdana !important;" )
addCssRule( "#attentionWhoresDisplayToggle:hover span", "display:inline;" )
addCssRule( "#attentionWhoresDisplayToggle:hover div", "display:block;width:11em;text-align:justify;" )
var requiredCssRules = styleSheetHandle.cssRules.length


// adds the attentionWhoresDisplayToggle
document.body.innerHTML += '<div id="attentionWhoresDisplayToggle" title="toggle the display of the users you marked as \x27attention whores\x27" onclick="toggleAttentionWhoresDisplay()"></div>'


// add toggle next to the avatars
var imgCollection = document.getElementsByTagName('IMG')
j = 0
for( var i=imgCollection.length; --i; )
{
	var currentImg = imgCollection[ i ]
	if( /avatars\//.test( currentImg.src ) )
	{
		if( currentImg.parentNode.nodeName == "A" && /user\x2ephp\x3fwho=/.test( currentImg.parentNode.href ) )
		{
			var attentionWhorestatusToggle 			= document.createElement('img')
			attentionWhorestatusToggle.src			= "gfx/titles/trompette.gif"
			attentionWhorestatusToggle.className	= "attentionWhorestatusToggle"
			attentionWhorestatusToggle.title		= "toggle the \x27attention whores\x27 status of \x27"+ currentImg.title +"\x27"
			attentionWhorestatusToggle.rel			= currentImg.parentNode.href.substr( currentImg.parentNode.href.lastIndexOf( "=" )+1 )
			attentionWhorestatusToggle.onclick		= toggleAttentionWhorestatus

			var tmpNode = currentImg
			while( tmpNode && tmpNode.nodeName!="FORM" )
				tmpNode = tmpNode.parentNode
			
			if( !tmpNode || !/add\x2ephp/.test( tmpNode.action ) )
				currentImg.parentNode.parentNode.insertBefore( attentionWhorestatusToggle, currentImg.parentNode )
			else
			{
				attentionWhorestatusToggle.setAttribute( "style","float:left;" )
				currentImg.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore( attentionWhorestatusToggle, currentImg.parentNode.parentNode.parentNode.parentNode.parentNode )
			}
		}
	}
}


// init the whole thing
getCookie()
createAttentionWhoresCssRule()
toggleAttentionWhoresDisplay( true )