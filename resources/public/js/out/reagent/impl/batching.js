// Compiled by ClojureScript 0.0-2644 {}
if(!goog.isProvided_('reagent.impl.batching')) {
goog.provide('reagent.impl.batching');
}
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('reagent.impl.util');
goog.require('reagent.ratom');
goog.require('reagent.debug');
reagent.impl.batching.fake_raf = (function fake_raf(f){
return setTimeout(f,(16));
});
reagent.impl.batching.next_tick = ((cljs.core.not.call(null,reagent.impl.util.is_client))?reagent.impl.batching.fake_raf:(function (){var w = window;
var or__3724__auto__ = w.requestAnimationFrame;
if(cljs.core.truth_(or__3724__auto__)){
return or__3724__auto__;
} else {
var or__3724__auto____$1 = w.webkitRequestAnimationFrame;
if(cljs.core.truth_(or__3724__auto____$1)){
return or__3724__auto____$1;
} else {
var or__3724__auto____$2 = w.mozRequestAnimationFrame;
if(cljs.core.truth_(or__3724__auto____$2)){
return or__3724__auto____$2;
} else {
var or__3724__auto____$3 = w.msRequestAnimationFrame;
if(cljs.core.truth_(or__3724__auto____$3)){
return or__3724__auto____$3;
} else {
return reagent.impl.batching.fake_raf;
}
}
}
}
})());
reagent.impl.batching.compare_levels = (function compare_levels(c1,c2){
return (((c1["props"])[reagent.impl.util.cljs_level]) - ((c2["props"])[reagent.impl.util.cljs_level]));
});
reagent.impl.batching.run_queue = (function run_queue(a){
a.sort(reagent.impl.batching.compare_levels);

var n__4611__auto__ = a.length;
var i = (0);
while(true){
if((i < n__4611__auto__)){
var C_6867 = (a[i]);
if(cljs.core.truth_(C_6867.cljsIsDirty)){
C_6867.forceUpdate();
} else {
}

var G__6868 = (i + (1));
i = G__6868;
continue;
} else {
return null;
}
break;
}
});

/**
* @constructor
*/
reagent.impl.batching.RenderQueue = (function (queue,scheduled_QMARK_){
this.queue = queue;
this.scheduled_QMARK_ = scheduled_QMARK_;
})
reagent.impl.batching.RenderQueue.prototype.queue_render = (function (C){
var self__ = this;
var this$ = this;
self__.queue.push(C);

return this$.schedule();
});

reagent.impl.batching.RenderQueue.prototype.schedule = (function (){
var self__ = this;
var this$ = this;
if(cljs.core.truth_(self__.scheduled_QMARK_)){
return null;
} else {
self__.scheduled_QMARK_ = true;

return reagent.impl.batching.next_tick.call(null,((function (this$){
return (function (){
return this$.run_queue();
});})(this$))
);
}
});

reagent.impl.batching.RenderQueue.prototype.run_queue = (function (){
var self__ = this;
var _ = this;
var q = self__.queue;
self__.queue = [];

self__.scheduled_QMARK_ = false;

return reagent.impl.batching.run_queue.call(null,q);
});

reagent.impl.batching.RenderQueue.cljs$lang$type = true;

reagent.impl.batching.RenderQueue.cljs$lang$ctorStr = "reagent.impl.batching/RenderQueue";

reagent.impl.batching.RenderQueue.cljs$lang$ctorPrWriter = (function (this__4311__auto__,writer__4312__auto__,opt__4313__auto__){
return cljs.core._write.call(null,writer__4312__auto__,"reagent.impl.batching/RenderQueue");
});

reagent.impl.batching.__GT_RenderQueue = (function __GT_RenderQueue(queue,scheduled_QMARK_){
return (new reagent.impl.batching.RenderQueue(queue,scheduled_QMARK_));
});

reagent.impl.batching.render_queue = (new reagent.impl.batching.RenderQueue([],false));
reagent.impl.batching.flush = (function flush(){
return reagent.impl.batching.render_queue.run_queue();
});
reagent.impl.batching.queue_render = (function queue_render(C){
C.cljsIsDirty = true;

return reagent.impl.batching.render_queue.queue_render(C);
});
reagent.impl.batching.mark_rendered = (function mark_rendered(C){
return C.cljsIsDirty = false;
});
reagent.impl.batching.is_reagent_component = (function is_reagent_component(C){
var and__3712__auto__ = !((C == null));
if(and__3712__auto__){
var and__3712__auto____$1 = (C["props"]);
if(cljs.core.truth_(and__3712__auto____$1)){
return ((C["props"])["cljsArgv"]);
} else {
return and__3712__auto____$1;
}
} else {
return and__3712__auto__;
}
});
reagent.impl.batching.run_reactively = (function run_reactively(C,run){
if(cljs.core.truth_(reagent.impl.batching.is_reagent_component.call(null,C))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"is-reagent-component","is-reagent-component",-1856228005,null),new cljs.core.Symbol(null,"C","C",1466901940,null))))].join('')));
}

reagent.impl.batching.mark_rendered.call(null,C);

var rat = C.cljsRatom;
if((rat == null)){
var res = reagent.ratom.capture_derefed.call(null,run,C);
var derefed = reagent.ratom.captured.call(null,C);
if(!((derefed == null))){
C.cljsRatom = reagent.ratom.make_reaction.call(null,run,new cljs.core.Keyword(null,"auto-run","auto-run",1958400437),((function (res,derefed,rat){
return (function (){
return reagent.impl.batching.queue_render.call(null,C);
});})(res,derefed,rat))
,new cljs.core.Keyword(null,"derefed","derefed",590684583),derefed);
} else {
}

return res;
} else {
return reagent.ratom.run.call(null,rat);
}
});
reagent.impl.batching.dispose = (function dispose(C){
var ratom_6869 = C.cljsRatom;
if(!((ratom_6869 == null))){
reagent.ratom.dispose_BANG_.call(null,ratom_6869);
} else {
}

return reagent.impl.batching.mark_rendered.call(null,C);
});

//# sourceMappingURL=batching.js.map