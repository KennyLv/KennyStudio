/*! scripts/tumblr.js */
(typeof Tumblr!=="undefined")||(Tumblr={});
/*! scripts/dialog.js */
/*!
 * Tumblr.Dialog
 * A highly customizable queuing dialog system with easy replacements for alert() and prompt()
 * Features:
 *   - Add custom templates
 *   - Tab between buttons + enter/escape support
 *   - Default buttons tied to keys
 *   - Multiple dialogs queue for user
 *   - Multiple button styles
 *   - Callbacks everywhere
 */
(function(d,f,g,b,e,c){var a=g.View.extend({el:".ui_dialog",translations:{},defaults:{},default_templates:{dialog:'<div class="ui_dialog <%= type %>"><%= content_html %><div class="buttons"><%= buttons_html %></div></div>',content:'<span class="text"><%= text %></span>',button:'<button class="ui_button btn_<%= btn_id %> chrome <%= btn_class %>" data-btn-id="<%= btn_id %>"><span><%= text %></span></button>'},events:{"click .ui_button":"button_click"},default_dialog:{text:"",type:"default",has_form:"auto",visible_glass:true,confirm_by_enter:true,close_by_space:true,key_tab:true,key_close:true,scroll_lock:false,animate:true,animate_in:{dialog_el:".ui_dialog",dialog_class:"add_animation fadeIn"},on_close:function(){},on_open:function(){}},initialize:function(h){this.options=d.extend(this.defaults,this.options);this.templates=this.default_templates;this.is_visible=false;this.dialog_queue_order=[];this.dialog_queue={};this.queue_counter=0;this.current_dialog=false;this.current_dialog_id=0;this.uid=0;this._init_click_lock();this._setup_keys();if(b&&!c.Dialog){this.listenTo(b,"dialog:dialog",this.dialog);this.listenTo(b,"dialog:confirm",this.confirm);this.listenTo(b,"dialog:alert",this.alert);this.listenTo(b,"dialog:close",this.close)}else{if(e&&e.bool("is_dev")&&console&&console.warn){if(b){console.warn("Dialog.js included twice!")}else{console.warn("Dialog.js couldn't find Tumblr.Events!")}}}},add_translations:function(h){jQuery.extend(this.translations,h)},unset_translations:function(){this.translations={}},__:function(h){return this.translations[h]||h},dialog:function(h){if(!d.isObject(h)){return false}return this._dialog(h)},confirm:function(i,m,n,k,h){if(d.isString(i)){i={text:i}}var l={callback_ok:m,callback_cancel:n,text_ok:k,text_cancel:h};i=d.extend({},l,i);var j={text:i.text,type:"confirm",visible_glass:true,templates:i.templates||null,escape_button:0,buttons:{0:{text:i.text_cancel||this.__("Cancel"),close:true,callback:((d.isFunction(i.callback_cancel))?i.callback_cancel:function(){})},1:{text:i.text_ok||this.__("OK"),selected:true,btn_class:"blue",close:true,callback:((d.isFunction(i.callback_ok))?i.callback_ok:function(){})}}};return this._dialog(j)},alert:function(h,l,j){if(d.isString(h)){h={text:h}}var k={callback_ok:l,text_ok:j};h=d.extend({},k,h);var i={text:h.text,type:"alert",visible_glass:true,templates:h.templates||null,escape_button:0,buttons:{0:{text:h.text_ok||this.__("OK"),selected:true,btn_class:"blue",close:true,callback:((d.isFunction(h.callback_ok))?h.callback_ok:function(){})}}};return this._dialog(i)},button_click:function(l){var k=f(l.currentTarget);var j=k.data("btn-id");if(d.isUndefined(this.current_dialog.buttons[j])||k.hasClass("disabled")){return false}var i=this.current_dialog.buttons[j];var h=null;if(d.isFunction(i.callback)){h=i.callback(this)}if(h!==false&&((!d.isUndefined(i.close)&&i.close)||d.isUndefined(i.close))){this.close()}},is_active:function(h){if((this.current_dialog===false)||(this.current_dialog.uid!=h)){return false}return true},close:function(j){if(this.current_dialog===false){return false}if(d.isUndefined(j)){j=false}if(j!==false&&this.current_dialog.uid!=j){return false}this.$dialog_lock.hide();f(".ui_dialog_pos").remove();this.is_visible=false;if(d.isObject(Tumblr.KeyCommands)){Tumblr.KeyCommands.resume()}if(d.isFunction(this.current_dialog.on_close)){this.current_dialog.on_close()}this.current_dialog=false;f("html").removeClass("dialog_lock");if(this.dialog_queue_order.length>0){var h=this.dialog_queue_order.shift();var i=this.dialog_queue[h];delete this.dialog_queue[h];this._dialog(i)}},_tab:function(k){var j=this.$el.find(".buttons .tab_frame");var n=j.filter(".focus");var m=j.index(n);var i=j.length;var h=false;if((m+1)<i){h=m+1}else{h=0}n.removeClass("focus init_focus");var l=j.eq(h);if(l.length>0){l.addClass("focus");l.find("button").focus()}},_form_is_tab_to_button:function(m,k){var n=this.$el.find(":focus");if(n.length===0){return true}var l=this.$el.find(".buttons .tab_frame");var j=this.$el.find(":input:visible");var i=j.index(n);if(k&&(i===(j.length-1))){this.$el.find(":input:visible:first").focus();m.preventDefault();l.removeClass("focus init_focus");return false}if(i>=0){var h=this.$el.find(":input:visible:eq("+(i+1)+")");if((h.length>0)&&h.hasClass("ui_button")){return true}}l.removeClass("focus init_focus");return false},_select:function(j){var i=this.$el.find(".buttons .tab_frame.focus");var h=i;if(h.length===1){h.find(".ui_button").click()}},_form_is_focus_on_button:function(h){var i=this.$el.find(":focus");if(i.length===0){return false}return i.hasClass("ui_button")},_escape:function(h){if(d.isUndefined(this.current_dialog.escape_button)){return}var i=this.$el.find(".btn_"+this.current_dialog.escape_button);if(i.length){i.click()}},_dialog:function(k){if(d.isUndefined(k.uid)){k.uid=this._get_uid()}if(this.current_dialog!==false){this.dialog_queue_order.push(this.queue_counter);this.dialog_queue[this.queue_counter]=k;this.queue_counter++;return k.uid}d.defaults(k,this.default_dialog);var l=this._build_buttons(k.buttons);d.extend(k,{buttons_html:l});var i=this.templates;if(d.isObject(k.templates)){i=d.extend({},this.templates,k.templates)}var h=d.template(i.dialog);var j=d.template(i.content);k.content_html=j(k);var m=h(k);this.$dialog_lock.show();if(!d.isUndefined(k.visible_glass)){if(k.visible_glass){this.$dialog_lock.addClass("opaque")}}else{this.$dialog_lock.removeClass("opaque")}if(!d.isUndefined(k.scroll_lock)&&k.scroll_lock){f("html").addClass("dialog_lock")}this.current_dialog_id=k.uid;this.current_dialog=k;f("body").append('<div id="dialog_'+this.current_dialog_id+'" class="ui_dialog_pos">'+m+"</div>");this.$el=f("#dialog_"+this.current_dialog_id);this.is_visible=true;if(k.animate&&d.isObject(k.animate_in)&&this.$el.find(k.animate_in.dialog_el).length){this.$el.find(k.animate_in.dialog_el).addClass(k.animate_in.dialog_class)}this._focus();if(d.isObject(Tumblr.KeyCommands)){Tumblr.KeyCommands.suspend()}if(d.isUndefined(k.has_form)){k.has_form="auto"}if(k.has_form==="auto"){k.has_form=(this.$el.find("form, input").length>0)}if(d.isFunction(k.on_open)){k.on_open()}this.el=this.$el[0];this.delegateEvents();return k.uid},_button:function(l,j,m,k){var i=d.template(this.templates.button);if(d.isObject(this.current_dialog.templates)){i=this.current_dialog.templates.button}if(k){j+=" default-pulse"}var h=i({btn_class:j,text:l,btn_id:((!d.isUndefined(m))?m:"")});h='<div class="tab_frame">'+h+"</div>";return h},_focus:function(){if(!this.current_dialog){return false}for(var i in this.current_dialog.buttons){var h=this.current_dialog.buttons[i];if(!d.isUndefined(h.selected)&&h.selected){$button=this.$el.find(".btn_"+i);if($button.length>0){$button.parent().addClass("focus init_focus")}}}},_setup_keys:function(){f(document).on("keydown",d.bind(function(j){var i=(j.ctrlKey||j.shiftKey||j.metaKey);if(!this.is_visible||i){return}var h=j.keyCode||j.which;if((h===9)&&this.current_dialog.key_tab){if(this.current_dialog.has_form){if(!this._form_is_tab_to_button(j,true)){return}}j.preventDefault();this._tab(j)}if(((h===13)&&this.current_dialog.confirm_by_enter)||((h===32)&&this.current_dialog.close_by_space)){if(this.current_dialog.has_form&&(h===32)){if(!this._form_is_focus_on_button(j)){return}}j.preventDefault();this._select(j)}if((h===27)&&this.current_dialog.key_close){j.preventDefault();this._escape(j)}},this))},_build_buttons:function(o){if(!d.isObject(o)){return""}var m=0;for(var l in o){if(o.hasOwnProperty(l)){m++}}var k="";for(var j=0;j<m;j++){if(d.isUndefined(o[j])){continue}var p=(!d.isUndefined(o[j].text))?o[j].text:"";var h=(!d.isUndefined(o[j].btn_class))?o[j].btn_class:"";var n=(!d.isUndefined(o[j].selected))?o[j].selected:false;k+=this._button(p,h,j,n)}return k},_init_click_lock:function(){var h=this.$dialog_lock=f("<div>",{"class":"ui_dialog_lock"});f(document).ready(function(){h.prependTo("body")})},_get_uid:function(){return this.uid++}});c.Dialog=new a()})(_,jQuery,Backbone,Tumblr.Events,Tumblr.Flags,Tumblr);
/*! scripts/tumblr.js */
(typeof Tumblr!=="undefined")||(Tumblr={});
/*! scripts/events.js */
(function(d,c,e,b){if(Tumblr.Events||(Tumblr.Prima&&Tumblr.Prima.Events)){return}else{if(e==null||e.Events==null){throw"Tumblr.Events depends on Backbone.Events"}var a=c.extend({},e.Events);b.Events=a}})(jQuery,_,Backbone,Tumblr);
/*! scripts/application/glass.js */
(function(c,a){var b=new (Backbone.View.extend({id:"glass_overlay",events:{click:"click"},locked:false,visible:false,initialize:function(){},render:function(){c(document.body).prepend(this.$el);this.rendered=true;Tumblr.Events.on("DOMEventor:escape",_.bind(this.keydown,this))},click:function(){if(this.locked){return}this.hide()},keydown:function(d){if(this.locked){return}if(this.visible){this.hide()}},show:function(e,d){if(_.isObject(Tumblr.KeyCommands)&&!Tumblr.KeyCommands.suspended){Tumblr.KeyCommands.suspend();this.glass_suspended_keys=true}if(!this.rendered){this.render()}d=d||"";this.on_close=e||function(){};this.visible=true;Tumblr.Events.trigger("Glass:show",this);this.$el.addClass("show");setTimeout(_.bind(function(){this.$el.addClass(d)},this),0)},hide:function(){this.visible=false;Tumblr.Events.trigger("Glass:hide",this);this.$el.removeClass("show");this.on_close();if(this.glass_suspended_keys){if(_.isObject(Tumblr.KeyCommands)){Tumblr.KeyCommands.resume()}this.glass_suspended_keys=false}},lock:function(){this.locked=true},unlock:function(){this.locked=false}}))();a.Glass=b})(jQuery,Tumblr);
/*! scripts/application/popover.js */
(function(d,b){var a=Backbone.View.extend({events:{click:"click"},initialize:function(e){this.button=d(e.el||this.$el);this.popover=e.popover||this.$el.find(".popover");this.on_hide=e.on_hide||function(){};this.on_show=e.on_show||function(){};this.auto_show=e.auto_show||false;this.prevent_default_click=e.prevent_default_click||false;if(this.auto_show){this.show()}a.register(this)},click:function(f){if(this.prevent_default_click){f.preventDefault()}this.toggle()},is_showing:false,show:function(){Tumblr.Glass.show(_.bind(function(){this.hide();this.on_hide()},this));this.popover.show();this.on_show();this.is_showing=true},hide:function(){if(!this.is_showing){return}Tumblr.Glass.on_close=_.bind(function(){if(this.is_showing){this.popover.hide();this.on_hide()}},this);Tumblr.Glass.hide();this.is_showing=false},toggle:function(){return this.is_showing?this.hide():this.show()}});a.instances=[];a.register=function(e){this.instances.push(e)};a.hide_all=function(){for(var e=0;e<this.instances.length;e++){this.instances[e].hide()}};a.hide_all_after=function(e){e=(e)?e:100;setTimeout(_.bind(function(){for(var f=0;f<this.instances.length;f++){this.instances[f].hide()}},this),e)};var c=a.extend({initialize:function(e){Tumblr.BasePopover.prototype.initialize.apply(this,arguments);this.skip_glass=e.skip_glass||false;this.skip_offset=e.skip_offset||false;this.direction=e.direction||"down";this.align=e.align||"left";this.options=e||{};this.options.left=e.left||0;this.options.right=e.right||0;this.options.top=e.top||0;this.options.bottom=e.bottom||0},click:function(){if(!this.options.disable_auto_show){this.show()}return},show:function(){if(!this.skip_glass){Tumblr.Glass.show(_.bind(function(){this.hide();this.on_hide()},this))}if(!this.$el.is(this.popover.parent())){var f={top:0,left:0};var e={};if(!this.skip_offset){f=this.button.position()}if(this.direction!=="up"){e.top=(this.options.top+f.top)+"px"}else{e.bottom=(this.options.bottom-f.top-this.button.height())+"px"}if(this.align!=="right"){e.left=(this.options.left+f.left)+"px"}else{e.right=(this.options.right-f.left-this.button.width())+"px"}this.popover.css(e)}this.popover.show();this.on_show();this.is_showing=true},hide:function(){if(!this.skip_glass){Tumblr.Glass.on_close=_.bind(function(){if(this.is_showing){this.popover.hide()}},this);Tumblr.Glass.hide()}else{this.popover.hide()}this.is_showing=false},position:function(){this.popover.show();var i=d(window);var e={top:i.scrollTop(),left:i.scrollLeft()};this.popover.removeClass("up nipple_on_bottom");e.right=e.left+i.width();e.bottom=e.top+i.height();var h=this.popover.offset();var g=this.popover.outerHeight();var f=i.height();h.right=h.left+this.popover.outerWidth();h.bottom=h.top+g;if(f>g&&e.bottom<h.bottom){this.popover.addClass("up nipple_on_bottom")}}});b.BasePopover=a;b.Popover=c})(jQuery,Tumblr);
/*! scripts/loader.js */
(function(c,b,a){var d={zIndex:2000000000,color:"inherit",top:"50%",left:"50%",position:"absolute",className:"leviathan"};function e(f){if(!this.start){return new e(f)}this.created=false;this.opts=this.opts||{};b.extend(this.opts,e.defaults,d,f)}e.defaults={};e.prototype={start:function(f){if(typeof f!=="object"){f=false}if(f&&f instanceof jQuery){f=f[0]}if(!this.created&&!f){return false}if(!f){f=this.$target[0]}this.destroy();this.uid=this._uid();this.$target=c(f);this.$target.data("loader-uid",this.uid);this.el=this._html();this.$target.append(this.el);this.$loader=c("#loader_"+this.uid);this._init();return this},stop:function(){if(typeof this.$loader!=="undefined"){this.$loader.hide();this.$loader.removeClass("animate")}return this},destroy:function(){this.stop();if(typeof this.$loader!=="undefined"){this.$loader.remove()}if(typeof this.$target!=="undefined"){this.$target.removeData("loader-uid")}return this},_init:function(){this.created=true;if(this.opts.color!=="auto"){c(".Knight-Rider-bar",this.$loader).css("background-color",this.opts.color)}this.$loader.css("position",this.opts.position);this.$loader.css("z-index",this.opts.zIndex);this.$loader.css("top",this.opts.top);this.$loader.css("left",this.opts.left);this.$loader.show()},_uid:function(){return Math.floor(Math.random()*10000000)},_html:function(){return'<div id="loader_'+this.uid+'" class="Knight-Rider-loader centered animate '+this.opts.className+'"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div>'}};a.Loader=e})(jQuery,_,Tumblr);
/*! scripts/archive/archive_view.js */
var Tumblr=Tumblr||{};(function(b,a){var c=Backbone.View.extend({el:"body",events:{"click #jump_to_month":"onMonthSelectorClick","click .year_navigation a":"onYearNavigationClick"},initialize:function(d){this.loading=true;this.current_month=0;this.month_selector_label="Month";this.loaded_url="";this.columnWidth=150;this.gutterWidth=10;this.loader=new Tumblr.Loader({color:"#D9D9D9",position:"absolute",top:"100%"});this.container=b(".l-content");this.month_selector=b("#jump_to_month .month");this.months_popover=new Tumblr.Popover({el:b("#jump_to_month"),popover:b("#browse_months_widget"),left:-85,top:40});b(window).one("load",_.bind(this.onFirstWindowLoad,this));b(window).on("load",_.bind(this.onWindowLoad,this));b(window).on("ghostscroll",_.bind(this.onWindowScroll,this));b(window).on("ghostbeforeresize",_.bind(this.onWindowResize,this));b(window).on("ghostafterresize",_.bind(this.onAfterResize,this));(function(){var h=b(window);var g=b(".l-content");var e="no-pointer-events";function f(){var j;var m;function i(){j=Math.floor(Math.random()*Math.pow(10,6));g.addClass(e);setTimeout(l,60);h.one("scroll",k);h.on("scroll."+j,_.debounce(n,80))}function n(){m=false;g.removeClass(e);h.off("scroll."+j);f()}function k(){m=true}function l(){if(!m){n()}}h.one("scroll",i)}h.load(function(){setTimeout(f,2000)})})();this.loader.start(this.container);this.__cache={cols:0,containerHeight:b(this.container).height(),windowHeight:b(window).height(),heading:[],currentMonth:""}},loadPosts:function(){if(b("a#next_page_link").length<1||b("a#next_page_link").attr("href")===this.loaded_url){return}this.loading=true;this.loader.start(this.container);this.loaded_url=b("a#next_page_link").attr("href");b.ajax({url:this.loaded_url,type:"GET",success:_.bind(function(f){var d=b(b.trim(f));var h=d.filter(".l-content"),g=d.filter("#pagination"),e=d.filter("script:contains(impixu)");(new Function(e.text()))();b("#pagination").html(g.html());this.addPosts(h);this.trackAjaxCalls(this.loaded_url)},this),error:function(){Tumblr.Dialog.alert("Sorry, something went wrong.")}})},trackAjaxCalls:function(e){var f={};var d=document.createElement("a");(function(){var i=document.getElementById("ga_target");if(!i){return true}d.href=e;e=d.href;var h="unknown_archive_route";if(d.pathname.match(/^\/archive/)){h="/archive"}if(d.pathname.match(/^\/archive\/\d{4}\/\d+/)){h="/archive/:year/:month"}try{var g=true;i.contentWindow.postMessage(["tick_google_analytics",g,e,h].join(";"),i.src.split("/analytics.html")[0]);if(typeof COMSCORE!="undefined"){i.contentWindow.postMessage("tick_comscore;"+e,i.src.split("/analytics.html")[0])}}catch(j){}return true})();(function(){try{if(window._qevents&&window.__qc){__qc.qpixelsent=[];_qevents.push({qacct:"p-19UtqE8ngoZbM"})}}catch(g){}return true})();(function(){return true})()},addPosts:function(e){var d=[];b(e).children().each(b.proxy(function(g,h){var l=h.id;b(h).children(".post").each(function(){d.push(this.getAttribute("data-id"))});if(l&&this.container.find("#"+l).length>0){var f=b(h).children();b("#"+l).append(f).masonry("appended",f)}else{var j=b.trim(b(".date",h).text());var k=_.find(this.__cache.heading,function(i){return i.month===j});if(k){return}this.container.append(b(h));this.__cache.heading.push({top:b(h).offset().top-120,month:b(h).text()});_.sortBy(this.__cache.heading,function(i){return i.top})}},this));this.updateLikeButtons(d);this.onWindowLoad()},updateLikeButtons:function(d){},updateLayout:function(){b(".posts:not(.masonry)").masonry({itemSelector:".post",gutterWidth:this.gutterWidth,columnWidth:this.columnWidth,ghoster:{}})},onAfterResize:function(d){this.__cache.windowHeight=b(window).height();this.__cache.containerHeight=b(this.container).outerHeight(true)},resizeContainer:function(f){var d=this.columnWidth+this.gutterWidth;var e=this.container.parent().width();var g=Math.floor(e/d);if(this.__cache.cols!==g){this.container.width(g*d)}},onMonthSelectorClick:function(d){d.preventDefault();this.months_popover.show()},onYearNavigationClick:function(g){g.preventDefault();var f=b(g.currentTarget),d=f.closest(".year");if(f.hasClass("next_year")&&d.prev().length>0){d.hide();d.prev().show()}else{if(f.hasClass("previous_year")&&d.next().length>0){d.hide();d.next().show()}}},onBackToTopClick:function(d){d.preventDefault();b("body,html").animate({scrollTop:0},200,_.bind(this.onWindowScroll,this))},onFirstWindowLoad:function(d){this.container.children("section, header").show()},onWindowLoad:function(){this.loading=false;this.loader.stop();b(".loading").removeClass("loading");this.resizeContainer();this.updateLayout();var d=b("header.heading .date");this.__cache.heading=this.__cache.heading.concat(_.map(d,function(f){var e=b(f);return{top:e.offset().top-120,month:e.text()}}));_.sortBy(this.__cache.heading,function(e){return e.top});this.__cache.containerHeight=b(this.container).outerHeight(true);this.__cache.windowHeight=b(window).height();if(this.__cache.containerHeight<this.__cache.windowHeight){this.loadPosts()}},onWindowResize:function(f,d){this.resizeContainer(d)},onWindowScroll:function(j,f){var h=f.scrollTop||0;var l=f.windowHeight||0;var g=this.__cache.containerHeight;var k=(g-l*2);for(var d=this.__cache.heading.length-1;d>=0;d--){if(h>this.__cache.heading[d].top){if(this.__cache.currentMonth==this.__cache.heading[d].month){}else{this.__cache.currentMonth=this.__cache.heading[d].month;this.month_selector.text(this.__cache.currentMonth)}break}}if(!this.loading){if(h>=k){this.loadPosts()}}}});b(function(){new c()})})(jQuery,Tumblr);
/*! scripts/archive/archive.js */