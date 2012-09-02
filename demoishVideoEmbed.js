// ==UserScript==
// @name          Pouet Demoish Videos | v0.01
// @description	  replace the links to videos in the Demo'ish videos thread
// @match       http://www.pouet.net/topic.php?which=3199*
// @match       http://*.pouet.net/topic.php?which=3199*
// ==/UserScript==

/* based on Mathieu 'P01' HENRI ( http://www.p01.org ) ytEmbed.user.js */
/* https://github.com/p01/pouet.net.user.js/blob/master/ytEmbed.user.js */

/* mog - mog@trbl.at */
!(function() {
	
    var WIDTH = 400,
        HEIGHT = 300;
    
    linkify();
    
    //type isn't needed at all, just find it more maintainable this way, somehow
    var embedables = [ {'type': 'yt',
                        'selector': 'a[href*="youtu"]',
                        'id':/(v=|youtu\.be\/)([^&\?]+)/,
                        'iFrameSrc':'http://www.youtube.com/embed/'},{
                      
                        'type': 'vimeo',
                        'selector': 'a[href*="vimeo"]',
                        'id':/(vimeo\.com\/)([^&\?]+)/,
                        'iFrameSrc':'http://player.vimeo.com/video/'}, {
                        
                        'type': 'liveleak',
                        'selector': 'a[href*="liveleak.com/view?i="]',
                        'id':/(i=)([^&\?]+)/,
                        'iFrameSrc':'http://www.liveleak.com/e/'}];
    
    for(var i = 0; i < embedables.length; i++) {
    
        var linkList = document.querySelectorAll( embedables[i].selector );
        
        if(linkList && linkList.length) {
            
            for(var c = 0; c < linkList.length; c++) {
                
                embedVideo(linkList[c], embedables[i]);
            }
        }
    }
    
    function embedVideo(link, embedInstructions) {
        
        var iFrame,
            p,
            code = (link.href.match(embedInstructions.id)||['']).pop();
        
        if(code) {
            
            iFrame = document.createElement('iframe');
            p = document.createElement('p');
            iFrame.width = WIDTH;
            iFrame.height = HEIGHT;
            iFrame.frameBorder = 0;
            iFrame.allowfullscreen = 1;
            iFrame.src = embedInstructions.iFrameSrc + code;
            link.parentNode.appendChild(p);
            p.appendChild(iFrame);
        }
    }
    
    //Note that this code is wonky and will only, if at all, catch some links
    //lazy mans linkage for bbcode lamers
    function linkify(){
        
        //this will break if the comment background changes,
        //id is for not selecting the commentbox by accident
        var commentList = document.querySelectorAll('td[bgcolor="#446688"][id]');

        //make sure to not break the whole script, if the backgroundColor changes
        if(commentList && commentList.length > 0) {
            
            for(var i = 0; i < commentList.length; i++) {
                
                var commentText = commentList[i],
                    links = commentText.getElementsByTagName('a');
                
                //test if that comment has links, if not search for URLs that could be linkified
                //TODO Can querySelectorAll detect linkless comments?
                //NOTE Second condition might be a bug in pouet, see page 42 on the thread
                if((links.length == 0) || (links.length == 1 && links[0].name == "lastpost")) {
                
                    //dirty approach to get oneline comments fixed as well
                    var comment = ((commentText.innerHTML).trim() + ' \n').replace('<br>', ' <br>'),
                        wordList = comment.split(' ');
                    
                    for(var c = 0; c < wordList.length; c++) {
                    
                        if(wordList[c].indexOf('http') == 0) {
                           wordList[c] = '<a title="[FIXED BBCODE LAMER]" href="' + wordList[c] +'">' + wordList[c] + '</a>';
                        }
                    }
                    
                    commentText.innerHTML = wordList.join(' ');
                }
            }
        }
    }
})();