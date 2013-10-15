// Backbone.Validation v0.8.1
//
// Copyright (c) 2011-2013 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
Backbone.Validation=function(a){"use strict";var b={forceUpdate:!1,selector:"name",labelFormatter:"sentenceCase",valid:Function.prototype,invalid:Function.prototype},c={formatLabel:function(a,c){return i[b.labelFormatter](a,c)},format:function(){var a=Array.prototype.slice.call(arguments),b=a.shift();return b.replace(/\{(\d+)\}/g,function(b,c){return"undefined"!=typeof a[c]?a[c]:b})}},d=function(b,c,e){return c=c||{},e=e||"",a.each(b,function(a,f){b.hasOwnProperty(f)&&(!a||"object"!=typeof a||a instanceof Array||a instanceof Date||a instanceof RegExp||a instanceof Backbone.Model||a instanceof Backbone.Collection?c[e+f]=a:d(a,c,e+f+"."))}),c},e=function(){var e=function(b){return a.reduce(a.keys(a.result(b,"validation")||{}),function(a,b){return a[b]=void 0,a},{})},g=function(b,c){var d=b.validation?a.result(b,"validation")[c]||{}:{};return(a.isFunction(d)||a.isString(d))&&(d={fn:d}),a.isArray(d)||(d=[d]),a.reduce(d,function(b,c){return a.each(a.without(a.keys(c),"msg"),function(a){b.push({fn:j[a],val:c[a],msg:c.msg})}),b},[])},h=function(b,d,e,f){return a.reduce(g(b,d),function(g,h){var i=a.extend({},c,j),k=h.fn.call(i,e,d,h.val,b,f);return k===!1||g===!1?!1:k&&!g?a.result(h,"msg")||k:g},"")},i=function(b,c){var e,f={},g=!0,i=a.clone(c),j=d(c);return a.each(j,function(a,c){e=h(b,c,a,i),e&&(f[c]=e,g=!1)}),{invalidAttrs:f,isValid:g}},k=function(b,c){return{preValidate:function(b,c){var d,e=this,f={};return a.isObject(b)?(a.each(b,function(a,b){d=e.preValidate(b,a),d&&(f[b]=d)}),a.isEmpty(f)?void 0:f):h(this,b,c,a.extend({},this.attributes))},isValid:function(b){var c=d(this.attributes);return a.isString(b)?!h(this,b,c[b],a.extend({},this.attributes)):a.isArray(b)?a.reduce(b,function(b,d){return b&&!h(this,d,c[d],a.extend({},this.attributes))},!0,this):(b===!0&&this.validate(),this.validation?this._isValid:!0)},validate:function(f,g){var h=this,j=!f,k=a.extend({},c,g),l=e(h),m=a.extend({},l,h.attributes,f),n=d(f||m),o=i(h,m);return h._isValid=o.isValid,a.each(l,function(a,c){var d=o.invalidAttrs.hasOwnProperty(c);d||k.valid(b,c,k.selector)}),a.each(l,function(a,c){var d=o.invalidAttrs.hasOwnProperty(c),e=n.hasOwnProperty(c);d&&(e||j)&&k.invalid(b,c,o.invalidAttrs[c],k.selector)}),a.defer(function(){h.trigger("validated",h._isValid,h,o.invalidAttrs),h.trigger("validated:"+(h._isValid?"valid":"invalid"),h,o.invalidAttrs)}),!k.forceUpdate&&a.intersection(a.keys(o.invalidAttrs),a.keys(n)).length>0?o.invalidAttrs:void 0}}},l=function(b,c,d){a.extend(c,k(b,d))},m=function(a){delete a.validate,delete a.preValidate,delete a.isValid},n=function(a){l(this.view,a,this.options)},o=function(a){m(a)};return{version:"0.8.1",configure:function(c){a.extend(b,c)},bind:function(c,d){var e=c.model,g=c.collection;if(d=a.extend({},b,f,d),"undefined"==typeof e&&"undefined"==typeof g)throw"Before you execute the binding your view must have a model or a collection.\nSee http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.";e?l(c,e,d):g&&(g.each(function(a){l(c,a,d)}),g.bind("add",n,{view:c,options:d}),g.bind("remove",o))},unbind:function(a){var b=a.model,c=a.collection;b&&m(a.model),c&&(c.each(function(a){m(a)}),c.unbind("add",n),c.unbind("remove",o))},mixin:k(null,b)}}(),f=e.callbacks={valid:function(a,b,c){a.$("["+c+'~="'+b+'"]').removeClass("invalid").removeAttr("data-error")},invalid:function(a,b,c,d){a.$("["+d+'~="'+b+'"]').addClass("invalid").attr("data-error",c)}},g=e.patterns={digits:/^\d+$/,number:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i},h=e.messages={required:"{0} is required",acceptance:"{0} must be accepted",min:"{0} must be greater than or equal to {1}",max:"{0} must be less than or equal to {1}",range:"{0} must be between {1} and {2}",length:"{0} must be {1} characters",minLength:"{0} must be at least {1} characters",maxLength:"{0} must be at most {1} characters",rangeLength:"{0} must be between {1} and {2} characters",oneOf:"{0} must be one of: {1}",equalTo:"{0} must be the same as {1}",pattern:"{0} must be a valid {1}"},i=e.labelFormatters={none:function(a){return a},sentenceCase:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w)/g,function(a,b){return 0===b?a.toUpperCase():" "+a.toLowerCase()}).replace(/_/g," ")},label:function(a,b){return b.labels&&b.labels[a]||i.sentenceCase(a,b)}},j=e.validators=function(){var b=String.prototype.trim?function(a){return null===a?"":String.prototype.trim.call(a)}:function(a){var b=/^\s+/,c=/\s+$/;return null===a?"":a.toString().replace(b,"").replace(c,"")},c=function(b){return a.isNumber(b)||a.isString(b)&&b.match(g.number)},d=function(c){return!(a.isNull(c)||a.isUndefined(c)||a.isString(c)&&""===b(c)||a.isArray(c)&&a.isEmpty(c))};return{fn:function(b,c,d,e,f){return a.isString(d)&&(d=e[d]),d.call(e,b,c,f)},required:function(b,c,e,f,g){var i=a.isFunction(e)?e.call(f,b,c,g):e;return i||d(b)?i&&!d(b)?this.format(h.required,this.formatLabel(c,f)):void 0:!1},acceptance:function(b,c,d,e){return"true"===b||a.isBoolean(b)&&b!==!1?void 0:this.format(h.acceptance,this.formatLabel(c,e))},min:function(a,b,d,e){return!c(a)||d>a?this.format(h.min,this.formatLabel(b,e),d):void 0},max:function(a,b,d,e){return!c(a)||a>d?this.format(h.max,this.formatLabel(b,e),d):void 0},range:function(a,b,d,e){return!c(a)||a<d[0]||a>d[1]?this.format(h.range,this.formatLabel(b,e),d[0],d[1]):void 0},length:function(a,c,e,f){return d(a)&&b(a).length===e?void 0:this.format(h.length,this.formatLabel(c,f),e)},minLength:function(a,c,e,f){return!d(a)||b(a).length<e?this.format(h.minLength,this.formatLabel(c,f),e):void 0},maxLength:function(a,c,e,f){return!d(a)||b(a).length>e?this.format(h.maxLength,this.formatLabel(c,f),e):void 0},rangeLength:function(a,c,e,f){return!d(a)||b(a).length<e[0]||b(a).length>e[1]?this.format(h.rangeLength,this.formatLabel(c,f),e[0],e[1]):void 0},oneOf:function(b,c,d,e){return a.include(d,b)?void 0:this.format(h.oneOf,this.formatLabel(c,e),d.join(", "))},equalTo:function(a,b,c,d,e){return a!==e[c]?this.format(h.equalTo,this.formatLabel(b,d),this.formatLabel(c,d)):void 0},pattern:function(a,b,c,e){return d(a)&&a.toString().match(g[c]||c)?void 0:this.format(h.pattern,this.formatLabel(b,e),c)}}}();return e}(_);