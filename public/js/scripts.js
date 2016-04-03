$(document).ready(function() {
$("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_square',autoplay_slideshow: false});
$("ul.inner_tab").tabs("div.panes > div");
$('blockquote').quovolver();
$('a[href=#top]').click(function(){
$('html, body').animate({scrollTop:0}, 'slow');
return false;
 });
var outer = $("#preview_outer");
var arrow = $("#arrow");
var thumbs = $("#thumbs span");
var preview_pos;
var preview_els = $("#preview_inner div");
var image_width = preview_els.eq(0).width(); // Get width of imaages
thumbs.click(function() {
preview_pos = preview_els.eq( thumbs.index( this) ).position();
outer.stop().animate( {'scrollLeft' : preview_pos.left}, 500 );
arrow.stop().animate( {'left' : $(this).position().left }, 500 );
});
arrow.css( {'left' : thumbs.eq(0).position().left } ).show();
outer.animate( {'scrollLeft' : 0}, 0 );
$("#preview_inner").css('width', preview_els.length * image_width);
       
var offset = $("#tab-menu").offset();
var topPadding = 15;
$(window).scroll(function() {
if ($(window).scrollTop() > offset.top) {
$("#tab-menu").stop().animate({
marginTop: $(window).scrollTop() - offset.top + topPadding
});
} else {
 $("#tab-menu").stop().animate({
marginTop: 0
});
};
});
});
$(function() {
//Get all the LI from the #tabMenu UL
$('#tab-menu > li').click(function(){
$('#tab-menu > li').removeClass('selected');
$(this).addClass('selected');
$('.tab-content div.tab').slideUp('slow');
$('.tab-content div.tab:eq(' + $('#tab-menu > li').index(this) + ')').slideDown('slow');
}).mouseover(function() {
$(this).addClass('mouseover');
$(this).removeClass('mouseout');   
}).mouseout(function() {
$(this).addClass('mouseout');
$(this).removeClass('mouseover');    
});
       
$('.acc_container').hide();
$('.acc_trigger:first').addClass('active').next().show();
$('.acc_trigger').click(function(){
if( $(this).next().is(':hidden') ) { 
$('.acc_trigger').removeClass('active').next().slideUp();
$(this).toggleClass('active').next().slideDown();
}
return false;
 });
 });


/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
//** Smooth Navigational Menu- By Dynamic Drive DHTML code library: http://www.dynamicdrive.com
//** Script Download/ instructions page: http://www.dynamicdrive.com/dynamicindex1/ddlevelsmenu/

var ddsmoothmenu={

//Specify full URL to down and right arrow images (23 is padding-right added to top level LIs with drop downs):
arrowimages: {down:['downarrowclass', 'down.gif'], right:['rightarrowclass', 'right.gif']},
transition: {overtime:300, outtime:300}, //duration of slide in/ out animation, in milliseconds
shadow: {enable:false, offsetx:5, offsety:5}, //enable shadow?
showhidedelay: {showdelay: 100, hidedelay: 200}, //set delay in milliseconds before sub menus appear and disappear, respectively

///////Stop configuring beyond here///////////////////////////

detectwebkit: navigator.userAgent.toLowerCase().indexOf("applewebkit")!=-1, //detect WebKit browsers (Safari, Chrome etc)
detectie6: document.all && !window.XMLHttpRequest,
css3support: window.msPerformance || (!document.all && document.querySelector), //detect browsers that support CSS3 box shadows (ie9+ or FF3.5+, Safari3+, Chrome etc)

getajaxmenu:function($, setting){ //function to fetch external page containing the panel DIVs
	var $menucontainer=$('#'+setting.contentsource[0]) //reference empty div on page that will hold menu
	$menucontainer.html("Loading Menu...")
	$.ajax({
		url: setting.contentsource[1], //path to external menu file
		async: true,
		error:function(ajaxrequest){
			$menucontainer.html('Error fetching content. Server Response: '+ajaxrequest.responseText)
		},
		success:function(content){
			$menucontainer.html(content)
			ddsmoothmenu.buildmenu($, setting)
		}
	})
},


buildmenu:function($, setting){
	var smoothmenu=ddsmoothmenu
	var $mainmenu=$("#"+setting.mainmenuid+">ul") //reference main menu UL
	$mainmenu.parent().get(0).className=setting.classname || "ddsmoothmenu"
	var $headers=$mainmenu.find("ul").parent()
	$headers.each(function(i){ //loop through each LI header
		var $curobj=$(this).css({zIndex: 100-i}) //reference current LI header
		var $subul=$(this).find('ul:eq(0)').css({display:'block'})
		$subul.data('timers', {})
		this._dimensions={w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()}
		this.istopheader=$curobj.parents("ul").length==1? true : false //is top level header?
		$subul.css({top:this.istopheader && setting.orientation!='v'? this._dimensions.h+"px" : 0})
		$curobj.children("a:eq(0)").css(this.istopheader? {paddingRight: smoothmenu.arrowimages.down[2]} : {}).append( //add arrow images
			
		)
		if (smoothmenu.shadow.enable && !smoothmenu.css3support){ //if shadows enabled and browser doesn't support CSS3 box shadows
			this._shadowoffset={x:(this.istopheader?$subul.offset().left+smoothmenu.shadow.offsetx : this._dimensions.w), y:(this.istopheader? $subul.offset().top+smoothmenu.shadow.offsety : $curobj.position().top)} //store this shadow's offsets
			if (this.istopheader)
				$parentshadow=$(document.body)
			else{
				var $parentLi=$curobj.parents("li:eq(0)")
				$parentshadow=$parentLi.get(0).$shadow
			}
			this.$shadow=$('<div class="ddshadow'+(this.istopheader? ' toplevelshadow' : '')+'"></div>').prependTo($parentshadow).css({left:this._shadowoffset.x+'px', top:this._shadowoffset.y+'px'})  //insert shadow DIV and set it to parent node for the next shadow div
		}
		$curobj.hover(
			function(e){
				var $targetul=$subul //reference UL to reveal
				var header=$curobj.get(0) //reference header LI as DOM object
				clearTimeout($targetul.data('timers').hidetimer)
				$targetul.data('timers').showtimer=setTimeout(function(){
					header._offsets={left:$curobj.offset().left, top:$curobj.offset().top}
					var menuleft=header.istopheader && setting.orientation!='v'? 0 : header._dimensions.w
					menuleft=(header._offsets.left+menuleft+header._dimensions.subulw>$(window).width())? (header.istopheader && setting.orientation!='v'? -header._dimensions.subulw+header._dimensions.w : -header._dimensions.w) : menuleft //calculate this sub menu's offsets from its parent
					if ($targetul.queue().length<=1){ //if 1 or less queued animations
						$targetul.css({left:menuleft+"px", width:header._dimensions.subulw+'px'}).animate({height:'show',opacity:'show'}, ddsmoothmenu.transition.overtime)
						if (smoothmenu.shadow.enable && !smoothmenu.css3support){
							var shadowleft=header.istopheader? $targetul.offset().left+ddsmoothmenu.shadow.offsetx : menuleft
							var shadowtop=header.istopheader?$targetul.offset().top+smoothmenu.shadow.offsety : header._shadowoffset.y
							if (!header.istopheader && ddsmoothmenu.detectwebkit){ //in WebKit browsers, restore shadow's opacity to full
								header.$shadow.css({opacity:1})
							}
							header.$shadow.css({overflow:'', width:header._dimensions.subulw+'px', left:shadowleft+'px', top:shadowtop+'px'}).animate({height:header._dimensions.subulh+'px'}, ddsmoothmenu.transition.overtime)
						}
					}
				}, ddsmoothmenu.showhidedelay.showdelay)
			},
			function(e){
				var $targetul=$subul
				var header=$curobj.get(0)
				clearTimeout($targetul.data('timers').showtimer)
				$targetul.data('timers').hidetimer=setTimeout(function(){
					$targetul.animate({height:'hide', opacity:'hide'}, ddsmoothmenu.transition.outtime)
					if (smoothmenu.shadow.enable && !smoothmenu.css3support){
						if (ddsmoothmenu.detectwebkit){ //in WebKit browsers, set first child shadow's opacity to 0, as "overflow:hidden" doesn't work in them
							header.$shadow.children('div:eq(0)').css({opacity:0})
						}
						header.$shadow.css({overflow:'hidden'}).animate({height:0}, ddsmoothmenu.transition.outtime)
					}
				}, ddsmoothmenu.showhidedelay.hidedelay)
			}
		) //end hover
	}) //end $headers.each()
	if (smoothmenu.shadow.enable && smoothmenu.css3support){ //if shadows enabled and browser supports CSS3 shadows
		var $toplevelul=$('#'+setting.mainmenuid+' ul li ul')
		var css3shadow=parseInt(smoothmenu.shadow.offsetx)+"px "+parseInt(smoothmenu.shadow.offsety)+"px 5px #aaa" //construct CSS3 box-shadow value
		var shadowprop=["boxShadow", "MozBoxShadow", "WebkitBoxShadow", "MsBoxShadow"] //possible vendor specific CSS3 shadow properties
		for (var i=0; i<shadowprop.length; i++){
			$toplevelul.css(shadowprop[i], css3shadow)
		}
	}
	$mainmenu.find("ul").css({display:'none', visibility:'visible'})
},

init:function(setting){
	if (typeof setting.customtheme=="object" && setting.customtheme.length==2){ //override default menu colors (default/hover) with custom set?
		var mainmenuid='#'+setting.mainmenuid
		var mainselector=(setting.orientation=="v")? mainmenuid : mainmenuid+', '+mainmenuid
		document.write('<style type="text/css">\n'
			+mainselector+' ul li a {background:'+setting.customtheme[0]+';}\n'
			+mainmenuid+' ul li a:hover {background:'+setting.customtheme[1]+';}\n'
		+'</style>')
	}
	this.shadow.enable=(document.all && !window.XMLHttpRequest)? false : this.shadow.enable //in IE6, always disable shadow
	jQuery(document).ready(function($){ //ajax menu?
		if (typeof setting.contentsource=="object"){ //if external ajax menu
			ddsmoothmenu.getajaxmenu($, setting)
		}
		else{ //else if markup menu
			ddsmoothmenu.buildmenu($, setting)
		}
	})
}

} //end ddsmoothmenu variable



/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
ddsmoothmenu.init({
	mainmenuid: "smoothmenu1", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	shadow: {enable:false}, //enable shadow?
	//customtheme: ["#1c5a80", "#18374a"],
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
})




/*-----------------------------------------------------------------------------------*/
/*	IMAGE HOVER
/*-----------------------------------------------------------------------------------*/
$(function() {
// OPACITY OF BUTTON SET TO 50%
$('ul.grid img, .post a img, #about a img, .content a img, .gallast img , .gal img ,  ul.social img').css("opacity","1.0");	
// ON MOUSE OVER
$('ul.grid img, .post a img, #about a img, .content a img, .gallast img , .gal img ,  ul.social img').hover(function () {										  
// SET OPACITY TO 100%
$(this).stop().animate({ opacity: 0.75 }, "fast"); },	
// ON MOUSE OUT
function () {			
// SET OPACITY BACK TO 50%
$(this).stop().animate({ opacity: 1.0 }, "fast");
});
});



/*-----------------------------------------------------------------------------------*/
/*	TOGGLE
/*-----------------------------------------------------------------------------------*/
$(document).ready(function(){
//Hide the tooglebox when page load
$(".togglebox").hide();
//slide up and down when click over heading 2
$("h2").click(function(){
// slide toggle effect set to slow you can set it to fast too.
$(this).toggleClass("active").next(".togglebox").slideToggle("slow");
return true;
});
});

/*-----------------------------------------------------------------------------------*/
/*	TABS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	//Default Action
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content
	
	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active content
		return false;
	});

});

/*-----------------------------------------------------------------------------------*/
/*	MOBILY NOTES
/*-----------------------------------------------------------------------------------*/
/* ==========================================================
 * MobilyNotes
 * date: 17.12.2010
 * author: Marcin Dziewulski
 * web: http://www.mobily.pl or http://playground.mobily.pl
 * email hello@mobily.pl
 * Free to use under the MIT license.
 * ========================================================== */
(function($){$.fn.mobilynotes=function(options){var defaults={init:"rotate",positionMultiplier:5,title:null,showList:true,autoplay:true,interval:4000};var sets=$.extend({},defaults,options);return this.each(function(){var $t=$(this),note=$t.find(".note"),size=note.length,autoplay;var notes={init:function(){notes.css();if(sets.showList){notes.list()}if(sets.autoplay){notes.autoplay()}notes.show()},random:function(l,u){return Math.floor((Math.random()*(u-l+1))+l)},css:function(){var zindex=note.length;note.each(function(i){var $t=$(this);switch(sets.init){case"plain":var x=notes.random(-(sets.positionMultiplier),sets.positionMultiplier),y=notes.random(-(sets.positionMultiplier),sets.positionMultiplier);$t.css({top:y+"px",left:x+"px",zIndex:zindex--});break;case"rotate":var rotate=notes.random(-(sets.positionMultiplier),sets.positionMultiplier),degrees="rotate("+rotate+"deg)";$t.css({"-webkit-transform":degrees,"-moz-transform":degrees,"-o-transform":degrees,filter:"progid:DXImageTransform.Microsoft.BasicImage(rotation="+rotate+")",zIndex:zindex--})}$t.attr("note",i)})},zindex:function(){var arr=new Array();note.each(function(i){arr[i]=$(this).css("z-index")});var z=Math.max.apply(Math,arr);return z},list:function(){$t.after($("<ul />").addClass("listNotes"));var ul=$t.find(".listNotes"),title=new Array();if(sets.title!=null){note.each(function(i){title[i]=$(this).find(sets.title).text()})}else{title[0]="Bad selector!"}for(x in title){$t.next(".listNotes").append($("<li />").append($("<a />").attr({href:"#",rel:x}).text(title[x])))}},autoplay:function(){var i=1,autoplay=setInterval(function(){i==size?i=0:"";var div=note.eq(i),w=div.width(),left=div.css("left");notes.animate(div,w,left);i++},sets.interval)},show:function(){$t.next(".listNotes").find("a").click(function(){var $t=$(this),nr=$t.attr("rel"),div=note.filter(function(){return $(this).attr("note")==nr}),left=div.css("left"),w=div.width(),h=div.height();clearInterval(autoplay);notes.animate(div,w,left);return false})},animate:function(selector,width,position){var z=notes.zindex();selector.animate({left:width+"px"},function(){selector.css({zIndex:z+1}).animate({left:position})})}};notes.init()})}}(jQuery));


$(function(){
	$('.notes_img').mobilynotes({
		init: 'plain',
		showList: false
	});
	$('.notes_txt').mobilynotes({
		init: 'plain',
		positionMultiplier: 20,
		title: 'h2',
		autoplay: false
	});
});

/*-----------------------------------------------------------------------------------*/
/*	PORTFOLIO SORTING
/*-----------------------------------------------------------------------------------*/
(function($) {
	$.fn.sorted = function(customOptions) {
		var options = {
			reversed: false,
			by: function(a) {
				return a.text();
			}
		};
		$.extend(options, customOptions);
	
		$data = $(this);
		arr = $data.get();
		arr.sort(function(a, b) {
			
		   	var valA = options.by($(a));
		   	var valB = options.by($(b));
			if (options.reversed) {
				return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
			} else {		
				return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
			}
		});
		return $(arr);
	};

})(jQuery);

$(function() {
  
  var read_button = function(class_names) {
    var r = {
      selected: false,
      type: 0
    };
    for (var i=0; i < class_names.length; i++) {
      if (class_names[i].indexOf('selected-') == 0) {
        r.selected = true;
      }
      if (class_names[i].indexOf('segment-') == 0) {
        r.segment = class_names[i].split('-')[1];
      }
    };
    return r;
  };
  
  var determine_sort = function($buttons) {
    var $selected = $buttons.parent().filter('[class*="selected-"]');
    return $selected.find('a').attr('data-value');
  };
  
  var determine_kind = function($buttons) {
    var $selected = $buttons.parent().filter('[class*="selected-"]');
    return $selected.find('a').attr('data-value');
  };
  
  var $preferences = {
    duration: 800,
    easing: 'easeInOutQuad',
    adjustHeight: false
  };
  
  var $list = $('#gallery');
  var $data = $list.clone();
  
  var $controls = $('.gallerynav');
  
  $controls.each(function(i) {
    
    var $control = $(this);
    var $buttons = $control.find('a');
    
    $buttons.bind('click', function(e) {
      
      var $button = $(this);
      var $button_container = $button.parent();
      var button_properties = read_button($button_container.attr('class').split(' '));      
      var selected = button_properties.selected;
      var button_segment = button_properties.segment;

      if (!selected) {

        $buttons.parent().removeClass('selected-1'); $button_container.addClass('selected-' + 1);
        
        var sorting_type = determine_sort($controls.eq(1).find('a'));
        var sorting_kind = determine_kind($controls.eq(0).find('a'));
        
        if (sorting_kind == 'all') {
          var $filtered_data = $data.find('li');
        } else {
          var $filtered_data = $data.find('li.' + sorting_kind);
        }
        
        if (sorting_type == 'size') {
          var $sorted_data = $filtered_data.sorted({
            by: function(v) {
              return parseFloat($(v).find('span').text());
            }
          });
        } else {
          var $sorted_data = $filtered_data.sorted({
            by: function(v) {
              return $(v).find('strong').text().toLowerCase();
            }
          });
        }
        
        $list.quicksand($sorted_data, function() {
    
    $(document).ready(function(){
			$("#gallery a[rel^='prettyPhoto']").prettyPhoto({theme:'light_square', autoplay_slideshow: false});
		});
		
    $(function() {
    // OPACITY OF BUTTON SET TO 50%
    $("ul.grid img").css("opacity","1.0");
    		
    // ON MOUSE OVER
    $("ul.grid img").hover(function () {
    										  
    // SET OPACITY TO 100%
    $(this).stop().animate({
    opacity: 0.5
    }, "slow");
    },
    		
    // ON MOUSE OUT
    function () {
    			
    // SET OPACITY BACK TO 50%
    $(this).stop().animate({
    opacity: 1.0
    }, "slow");
    });
    });
                                
	$("a.zoom2 img").mouseover(function(){
		$(this).stop(true,true);
		$(this).fadeTo(300, 0.5);
	});
	
	$("a.zoom2 img").mouseout(function(){
		$(this).fadeTo(400, 1.0);
	});
	
	
	$("a.play2 img").mouseover(function(){
		$(this).stop(true,true);
		$(this).fadeTo(300, 0.5);
	});
	
	$("a.play2 img").mouseout(function(){
		$(this).fadeTo(400, 1.0);
	});
	
    });
}  
      e.preventDefault();
    });
    
  }); 
  
});

/*-----------------------------------------------------------------------------------*/
/*	TOOLTIPS
/*-----------------------------------------------------------------------------------*/
 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);


        $(function(){
        $(".link").tipTip({maxWidth: "auto", edgeOffset: 5, defaultPosition: "top" });
        });
       
/*-----------------------------------------------------------------------------------*/
/*	TOOLS FOR TABS
/*-----------------------------------------------------------------------------------*/
/*
 * jQuery Tools 1.2.5 - The missing UI library for the Web
 * 
 * [tabs]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * File generated: Wed Jan 26 12:14:22 GMT 2011
 */
(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs=="a"&&d.find("[href="+location.hash+"]").length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.5"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);



/*-----------------------------------------------------------------------------------*/
/*	QUOVOLVER
/*-----------------------------------------------------------------------------------*/
/*
 * jQuery Quovolver v1.0 - http://sandbox.sebnitu.com/jquery/quovolver
 *
 * By Sebastian Nitu - Copyright 2009 - All rights reserved
 * 
 */

(function($) {
	$.fn.quovolver = function(speed, delay) {
		
		/* Sets default values */
		if (!speed) speed = 500;
		if (!delay) delay = 6000;
		
		// If "delay" is less than 4 times the "speed", it will break the effect 
		// If that's the case, make "delay" exactly 4 times "speed"
		var quaSpd = (speed*4);
		if (quaSpd > (delay)) delay = quaSpd;
		
		// Create the variables needed
		var	quote = $(this),
			firstQuo = $(this).filter(':first'),
			lastQuo = $(this).filter(':last'),
			wrapElem = '<div id="quote_wrap"></div>';
		
		// Wrap the quotes
		$(this).wrapAll(wrapElem);
		
		// Hide all the quotes, then show the first
		$(this).hide();
		$(firstQuo).show();
		
		// Set the hight of the wrapper
		$(this).parent().css({height: $(firstQuo).height()});		
		
		// Where the magic happens
		setInterval(function(){
			
			// Set required hight and element in variables for animation
			if($(lastQuo).is(':visible')) {
				var nextElem = $(firstQuo);
				var wrapHeight = $(nextElem).height();
			} else {
				var nextElem = $(quote).filter(':visible').next();
				var wrapHeight = $(nextElem).height();
			}
			
			// Fadeout the quote that is currently visible
			$(quote).filter(':visible').fadeOut(speed);
			
			// Set the wrapper to the hight of the next element, then fade that element in
			setTimeout(function() {
				$(quote).parent().animate({height: wrapHeight}, speed);
			}, speed);
			
			if($(lastQuo).is(':visible')) {
				setTimeout(function() {
					$(firstQuo).fadeIn(speed*2);
				}, speed*2);
				
			} else {
				setTimeout(function() {
					$(nextElem).fadeIn(speed);
				}, speed*2);
			}
			
		}, delay);
	
	};
})(jQuery);

/*-----------------------------------------------------------------------------------*/
/*	GOOGLE MAP
/*-----------------------------------------------------------------------------------*/
/*
///////Copyright © 2009 Bird Wing Productions, http://www.birdwingfx.com//////////
*/
(function($) {
    
    $.GoogleMapObjectDefaults = {        
        zoomLevel: 10,
	imagewidth: 50,
	imageheight: 50,
	center: '2000 Florida Ave NW Washington, DC 20009-1231',
	start: '#start',
        end: '#end',
	directions: 'directions',
        submit: '#getdirections',
	tooltip: 'false',
	image: 'false'
    };

    function GoogleMapObject(elementId, options) {
        /* private variables */
        this._inited = false;
        this._map = null;
        this._geocoder = null;
	
        /* Public properties */
        this.ElementId = elementId;
        this.Settings = $.extend({}, $.GoogleMapObjectDefaults, options || '');
    }

    $.extend(GoogleMapObject.prototype, {
        init: function() {
            if (!this._inited) {
                if (GBrowserIsCompatible()) {
                    this._map = new GMap2(document.getElementById(this.ElementId));
                    this._map.addControl(new GSmallMapControl());
                    this._geocoder = new GClientGeocoder();
                }
		
                this._inited = true;
            }
        },
        load: function() {
            //ensure existence
            this.init();
	    
            if (this._geocoder) {
                //"this" will be in the wrong context for the callback
                var zoom = this.Settings.zoomLevel;
                var center = this.Settings.center;
		var width = this.Settings.imagewidth;
		var height = this.Settings.imageheight;
                var map = this._map;
		
		if (this.Settings.tooltip != 'false') {
		    var customtooltip = true;
		    var tooltipinfo = this.Settings.tooltip;
		}
		
		if (this.Settings.image != 'false') {
		    var customimage = true;
		    var imageurl = this.Settings.image;
		}
		
                this._geocoder.getLatLng(center, function(point) {
                    if (!point) { alert(center + " not found"); }
                    else {
                        //set center on the map
                        map.setCenter(point, zoom);
			
			if (customimage == true) {
			    //add the marker
			    var customiconsize = new GSize(width, height);
			    var customicon = new GIcon(G_DEFAULT_ICON, imageurl);
			    customicon.iconSize = customiconsize;
			    var marker = new GMarker(point, { icon: customicon });
			    map.addOverlay(marker);
			} else {
			    var marker = new GMarker(point);
			    map.addOverlay(marker);
			}
			
			if(customtooltip == true) {
			    marker.openInfoWindowHtml(tooltipinfo);
			}
                    }
                });
            }
	    
	    
            //make this available to the click element
            $.data($(this.Settings.submit)[0], 'inst', this);
	    
            $(this.Settings.submit).click(function(e) {
                e.preventDefault();
                var obj = $.data(this, 'inst');
		var outputto = obj.Settings.directions;
                var from = $(obj.Settings.start).val();
                var to = $(obj.Settings.end).val();
		map.clearOverlays();
		var gdir = new GDirections(map, document.getElementById(outputto));
		gdir.load("from: " + from + " to: " + to);
		
                //open the google window
                //window.open("http://maps.google.com/maps?saddr=" + from + "&daddr=" + to, "GoogleWin", "menubar=1,resizable=1,scrollbars=1,width=750,height=500,left=10,top=10");
            });
	    
            return this;
        }
    });

    $.extend($.fn, {
        googleMap: function(options) {
            // check if a map was already created
            var mapInst = $.data(this[0], 'googleMap');
            if (mapInst) {
                return mapInst;
            }
	    
            //create a new map instance
            mapInst = new GoogleMapObject($(this).attr('id'), options);
            $.data(this[0], 'googleMap', mapInst);
            return mapInst;
        }
    });
})(jQuery);


/*-----------------------------------------------------------------------------------*/
/*	NIVO SLIDER
/*-----------------------------------------------------------------------------------*/

/*
 * jQuery Nivo Slider v2.4
 * http://nivo.dev7studios.com
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(a){var A=function(s,v){var f=a.extend({},a.fn.nivoSlider.defaults,v),g={currentSlide:0,currentImage:"",totalSlides:0,randAnim:"",running:false,paused:false,stop:false},e=a(s);e.data("nivo:vars",g);e.css("position","relative");e.addClass("nivoSlider");var j=e.children();j.each(function(){var b=a(this),h="";if(!b.is("img")){if(b.is("a")){b.addClass("nivo-imageLink");h=b}b=b.find("img:first")}var c=b.width();if(c==0)c=b.attr("width");var o=b.height();if(o==0)o=b.attr("height");c>e.width()&&
e.width(c);o>e.height()&&e.height(o);h!=""&&h.css("display","none");b.css("display","none");g.totalSlides++});if(f.startSlide>0){if(f.startSlide>=g.totalSlides)f.startSlide=g.totalSlides-1;g.currentSlide=f.startSlide}g.currentImage=a(j[g.currentSlide]).is("img")?a(j[g.currentSlide]):a(j[g.currentSlide]).find("img:first");a(j[g.currentSlide]).is("a")&&a(j[g.currentSlide]).css("display","block");e.css("background",'url("'+g.currentImage.attr("src")+'") no-repeat');for(var k=0;k<f.slices;k++){var p=
Math.round(e.width()/f.slices);k==f.slices-1?e.append(a('<div class="nivo-slice"></div>').css({left:p*k+"px",width:e.width()-p*k+"px"})):e.append(a('<div class="nivo-slice"></div>').css({left:p*k+"px",width:p+"px"}))}e.append(a('<div class="nivo-caption"><p></p></div>').css({display:"none",opacity:f.captionOpacity}));if(g.currentImage.attr("title")!=""){k=g.currentImage.attr("title");if(k.substr(0,1)=="#")k=a(k).html();a(".nivo-caption p",e).html(k);a(".nivo-caption",e).fadeIn(f.animSpeed)}var l=
0;if(!f.manualAdvance&&j.length>1)l=setInterval(function(){r(e,j,f,false)},f.pauseTime);if(f.directionNav){e.append('<div class="nivo-directionNav"><a class="nivo-prevNav">Prev</a><a class="nivo-nextNav">Next</a></div>');if(f.directionNavHide){a(".nivo-directionNav",e).hide();e.hover(function(){a(".nivo-directionNav",e).show()},function(){a(".nivo-directionNav",e).hide()})}a("a.nivo-prevNav",e).live("click",function(){if(g.running)return false;clearInterval(l);l="";g.currentSlide-=2;r(e,j,f,"prev")});
a("a.nivo-nextNav",e).live("click",function(){if(g.running)return false;clearInterval(l);l="";r(e,j,f,"next")})}if(f.controlNav){p=a('<div class="nivo-controlNav"></div>');e.append(p);for(k=0;k<j.length;k++)if(f.controlNavThumbs){var t=j.eq(k);t.is("img")||(t=t.find("img:first"));f.controlNavThumbsFromRel?p.append('<a class="nivo-control" rel="'+k+'"><img src="'+t.attr("rel")+'" alt="" /></a>'):p.append('<a class="nivo-control" rel="'+k+'"><img src="'+t.attr("src").replace(f.controlNavThumbsSearch,
f.controlNavThumbsReplace)+'" alt="" /></a>')}else p.append('<a class="nivo-control" rel="'+k+'">'+(k+1)+"</a>");a(".nivo-controlNav a:eq("+g.currentSlide+")",e).addClass("active");a(".nivo-controlNav a",e).live("click",function(){if(g.running)return false;if(a(this).hasClass("active"))return false;clearInterval(l);l="";e.css("background",'url("'+g.currentImage.attr("src")+'") no-repeat');g.currentSlide=a(this).attr("rel")-1;r(e,j,f,"control")})}f.keyboardNav&&a(window).keypress(function(b){if(b.keyCode==
"37"){if(g.running)return false;clearInterval(l);l="";g.currentSlide-=2;r(e,j,f,"prev")}if(b.keyCode=="39"){if(g.running)return false;clearInterval(l);l="";r(e,j,f,"next")}});f.pauseOnHover&&e.hover(function(){g.paused=true;clearInterval(l);l=""},function(){g.paused=false;if(l==""&&!f.manualAdvance)l=setInterval(function(){r(e,j,f,false)},f.pauseTime)});e.bind("nivo:animFinished",function(){g.running=false;a(j).each(function(){a(this).is("a")&&a(this).css("display","none")});a(j[g.currentSlide]).is("a")&&
a(j[g.currentSlide]).css("display","block");if(l==""&&!g.paused&&!f.manualAdvance)l=setInterval(function(){r(e,j,f,false)},f.pauseTime);f.afterChange.call(this)});var w=function(b,h){var c=0;a(".nivo-slice",b).each(function(){var o=a(this),d=Math.round(b.width()/h.slices);c==h.slices-1?o.css("width",b.width()-d*c+"px"):o.css("width",d+"px");c++})},r=function(b,h,c,o){var d=b.data("nivo:vars");d&&d.currentSlide==d.totalSlides-1&&c.lastSlide.call(this);if((!d||d.stop)&&!o)return false;c.beforeChange.call(this);
if(o){o=="prev"&&b.css("background",'url("'+d.currentImage.attr("src")+'") no-repeat');o=="next"&&b.css("background",'url("'+d.currentImage.attr("src")+'") no-repeat')}else b.css("background",'url("'+d.currentImage.attr("src")+'") no-repeat');d.currentSlide++;if(d.currentSlide==d.totalSlides){d.currentSlide=0;c.slideshowEnd.call(this)}if(d.currentSlide<0)d.currentSlide=d.totalSlides-1;d.currentImage=a(h[d.currentSlide]).is("img")?a(h[d.currentSlide]):a(h[d.currentSlide]).find("img:first");if(c.controlNav){a(".nivo-controlNav a",
b).removeClass("active");a(".nivo-controlNav a:eq("+d.currentSlide+")",b).addClass("active")}if(d.currentImage.attr("title")!=""){var u=d.currentImage.attr("title");if(u.substr(0,1)=="#")u=a(u).html();a(".nivo-caption",b).css("display")=="block"?a(".nivo-caption p",b).fadeOut(c.animSpeed,function(){a(this).html(u);a(this).fadeIn(c.animSpeed)}):a(".nivo-caption p",b).html(u);a(".nivo-caption",b).fadeIn(c.animSpeed)}else a(".nivo-caption",b).fadeOut(c.animSpeed);var m=0;a(".nivo-slice",b).each(function(){var i=
Math.round(b.width()/c.slices);a(this).css({height:"0px",opacity:"0",background:'url("'+d.currentImage.attr("src")+'") no-repeat -'+(i+m*i-i)+"px 0%"});m++});if(c.effect=="random"){h=["sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","slideInRight","slideInLeft"];d.randAnim=h[Math.floor(Math.random()*(h.length+1))];if(d.randAnim==undefined)d.randAnim="fade"}if(c.effect.indexOf(",")!=-1){h=c.effect.split(",");d.randAnim=h[Math.floor(Math.random()*
h.length)];if(d.randAnim==undefined)d.randAnim="fade"}d.running=true;if(c.effect=="sliceDown"||c.effect=="sliceDownRight"||d.randAnim=="sliceDownRight"||c.effect=="sliceDownLeft"||d.randAnim=="sliceDownLeft"){var n=0;m=0;w(b,c);h=a(".nivo-slice",b);if(c.effect=="sliceDownLeft"||d.randAnim=="sliceDownLeft")h=a(".nivo-slice",b)._reverse();h.each(function(){var i=a(this);i.css({top:"0px"});m==c.slices-1?setTimeout(function(){i.animate({height:"100%",opacity:"1.0"},c.animSpeed,"",function(){b.trigger("nivo:animFinished")})},
100+n):setTimeout(function(){i.animate({height:"100%",opacity:"1.0"},c.animSpeed)},100+n);n+=50;m++})}else if(c.effect=="sliceUp"||c.effect=="sliceUpRight"||d.randAnim=="sliceUpRight"||c.effect=="sliceUpLeft"||d.randAnim=="sliceUpLeft"){m=n=0;w(b,c);h=a(".nivo-slice",b);if(c.effect=="sliceUpLeft"||d.randAnim=="sliceUpLeft")h=a(".nivo-slice",b)._reverse();h.each(function(){var i=a(this);i.css({bottom:"0px"});m==c.slices-1?setTimeout(function(){i.animate({height:"100%",opacity:"1.0"},c.animSpeed,"",
function(){b.trigger("nivo:animFinished")})},100+n):setTimeout(function(){i.animate({height:"100%",opacity:"1.0"},c.animSpeed)},100+n);n+=50;m++})}else if(c.effect=="sliceUpDown"||c.effect=="sliceUpDownRight"||d.randAnim=="sliceUpDown"||c.effect=="sliceUpDownLeft"||d.randAnim=="sliceUpDownLeft"){var x=m=n=0;w(b,c);h=a(".nivo-slice",b);if(c.effect=="sliceUpDownLeft"||d.randAnim=="sliceUpDownLeft")h=a(".nivo-slice",b)._reverse();h.each(function(){var i=a(this);if(m==0){i.css("top","0px");m++}else{i.css("bottom",
"0px");m=0}x==c.slices-1?setTimeout(function(){i.animate({height:"100%",opacity:"1.0"},c.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+n):setTimeout(function(){i.animate({height:"100%",opacity:"1.0"},c.animSpeed)},100+n);n+=50;x++})}else if(c.effect=="fold"||d.randAnim=="fold"){m=n=0;w(b,c);a(".nivo-slice",b).each(function(){var i=a(this),y=i.width();i.css({top:"0px",height:"100%",width:"0px"});m==c.slices-1?setTimeout(function(){i.animate({width:y,opacity:"1.0"},c.animSpeed,"",function(){b.trigger("nivo:animFinished")})},
100+n):setTimeout(function(){i.animate({width:y,opacity:"1.0"},c.animSpeed)},100+n);n+=50;m++})}else if(c.effect=="fade"||d.randAnim=="fade"){var q=a(".nivo-slice:first",b);q.css({height:"100%",width:b.width()+"px"});q.animate({opacity:"1.0"},c.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(c.effect=="slideInRight"||d.randAnim=="slideInRight"){q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1"});q.animate({width:b.width()+"px"},c.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(c.effect==
"slideInLeft"||d.randAnim=="slideInLeft"){q=a(".nivo-slice:first",b);q.css({height:"100%",width:"0px",opacity:"1",left:"",right:"0px"});q.animate({width:b.width()+"px"},c.animSpeed*2,"",function(){q.css({left:"0px",right:""});b.trigger("nivo:animFinished")})}},z=function(b){this.console&&typeof console.log!="undefined"&&console.log(b)};this.stop=function(){if(!a(s).data("nivo:vars").stop){a(s).data("nivo:vars").stop=true;z("Stop Slider")}};this.start=function(){if(a(s).data("nivo:vars").stop){a(s).data("nivo:vars").stop=
false;z("Start Slider")}};f.afterLoad.call(this)};a.fn.nivoSlider=function(s){return this.each(function(){var v=a(this);if(!v.data("nivoslider")){var f=new A(this,s);v.data("nivoslider",f)}})};a.fn.nivoSlider.defaults={effect:"random",slices:15,animSpeed:500,pauseTime:3E3,startSlide:0,directionNav:true,directionNavHide:true,controlNav:true,controlNavThumbs:false,controlNavThumbsFromRel:false,controlNavThumbsSearch:".jpg",controlNavThumbsReplace:"_thumb.jpg",keyboardNav:true,pauseOnHover:true,manualAdvance:false,
captionOpacity:0.8,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};a.fn._reverse=[].reverse})(jQuery);
