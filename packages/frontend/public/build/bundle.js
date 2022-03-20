
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function xlink_attr(node, attribute, value) {
        node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function regexparam (str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* app/node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1, Object: Object_1, console: console_1 } = globals;

    // (209:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(209:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (207:0) {#if componentParams}
    function create_if_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return {
    			props: { params: /*componentParams*/ ctx[1] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[5]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*componentParams*/ 2) switch_instance_changes.params = /*componentParams*/ ctx[1];

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[5]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(207:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(route, userData, ...conditions) {
    	// Check if we don't have userData
    	if (userData && typeof userData == 'function') {
    		conditions = conditions && conditions.length ? conditions : [];
    		conditions.unshift(userData);
    		userData = undefined;
    	}

    	// Parameter route and each item of conditions must be functions
    	if (!route || typeof route != 'function') {
    		throw Error('Invalid parameter route');
    	}

    	if (conditions && conditions.length) {
    		for (let i = 0; i < conditions.length; i++) {
    			if (!conditions[i] || typeof conditions[i] != 'function') {
    				throw Error('Invalid parameter conditions[' + i + ']');
    			}
    		}
    	}

    	// Returns an object that contains all the functions to execute too
    	const obj = { route, userData };

    	if (conditions && conditions.length) {
    		obj.conditions = conditions;
    	}

    	// The _sveltesparouter flag is to confirm the object was created by this router
    	Object.defineProperty(obj, '_sveltesparouter', { value: true });

    	return obj;
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(getLocation(), // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location$1 = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);

    function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	return nextTickPromise(() => {
    		window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    	});
    }

    function pop() {
    	// Execute this code when the current call stack is complete
    	return nextTickPromise(() => {
    		window.history.back();
    	});
    }

    function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	return nextTickPromise(() => {
    		const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    		try {
    			window.history.replaceState(undefined, undefined, dest);
    		} catch(e) {
    			// eslint-disable-next-line no-console
    			console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    		}

    		// The method above doesn't trigger the hashchange event, so let's do that manually
    		window.dispatchEvent(new Event('hashchange'));
    	});
    }

    function link(node) {
    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	// Destination must start with '/'
    	const href = node.getAttribute('href');

    	if (!href || href.length < 1 || href.charAt(0) != '/') {
    		throw Error('Invalid value for "href" attribute');
    	}

    	// Add # to every href attribute
    	node.setAttribute('href', '#' + href);
    }

    function nextTickPromise(cb) {
    	return new Promise(resolve => {
    			setTimeout(
    				() => {
    					resolve(cb());
    				},
    				0
    			);
    		});
    }

    function instance($$self, $$props, $$invalidate) {
    	let $loc,
    		$$unsubscribe_loc = noop;

    	validate_store(loc, 'loc');
    	component_subscribe($$self, loc, $$value => $$invalidate(4, $loc = $$value));
    	$$self.$$.on_destroy.push(() => $$unsubscribe_loc());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent} component - Svelte component for the route
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument');
    			}

    			const { pattern, keys } = regexparam(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.route;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    			} else {
    				this.component = component;
    				this.conditions = [];
    				this.userData = undefined;
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, remove it before we run the matching
    			if (prefix && path.startsWith(prefix)) {
    				path = path.substr(prefix.length) || '/';
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				out[this._keys[i]] = matches[++i] || null;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {SvelteComponent} component - Svelte component
     * @property {string} name - Name of the Svelte component
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {Object} [userData] - Custom data passed by the user
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {bool} Returns true if all the conditions succeeded
     */
    		checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	const dispatchNextTick = (name, detail) => {
    		// Execute this code when the current call stack is complete
    		setTimeout(
    			() => {
    				dispatch(name, detail);
    			},
    			0
    		);
    	};

    	const writable_props = ['routes', 'prefix'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(3, prefix = $$props.prefix);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		derived,
    		wrap,
    		getLocation,
    		loc,
    		location: location$1,
    		querystring,
    		push,
    		pop,
    		replace,
    		link,
    		nextTickPromise,
    		createEventDispatcher,
    		regexparam,
    		routes,
    		prefix,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		dispatch,
    		dispatchNextTick,
    		$loc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(3, prefix = $$props.prefix);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*component, $loc*/ 17) {
    			// Handle hash change events
    			// Listen to changes in the $loc store and update the page
    			 {
    				// Find a route matching the location
    				$$invalidate(0, component = null);

    				let i = 0;

    				while (!component && i < routesList.length) {
    					const match = routesList[i].match($loc.location);

    					if (match) {
    						const detail = {
    							component: routesList[i].component,
    							name: routesList[i].component.name,
    							location: $loc.location,
    							querystring: $loc.querystring,
    							userData: routesList[i].userData
    						};

    						// Check if the route can be loaded - if all conditions succeed
    						if (!routesList[i].checkConditions(detail)) {
    							// Trigger an event to notify the user
    							dispatchNextTick('conditionsFailed', detail);

    							break;
    						}

    						$$invalidate(0, component = routesList[i].component);

    						// Set componentParams onloy if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    						// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    						if (match && typeof match == 'object' && Object.keys(match).length) {
    							$$invalidate(1, componentParams = match);
    						} else {
    							$$invalidate(1, componentParams = null);
    						}

    						dispatchNextTick('routeLoaded', detail);
    					}

    					i++;
    				}
    			}
    		}
    	};

    	return [
    		component,
    		componentParams,
    		routes,
    		prefix,
    		$loc,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { routes: 2, prefix: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Home.svelte generated by Svelte v3.46.4 */
    const file = "src/routes/Home.svelte";

    function create_fragment$1(ctx) {
    	let div2;
    	let div0;
    	let span0;
    	let t1;
    	let input0;
    	let t2;
    	let div1;
    	let span1;
    	let t4;
    	let input1;
    	let t5;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "Channel";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			div1 = element("div");
    			span1 = element("span");
    			span1.textContent = "Username";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			button = element("button");
    			button.textContent = "Join !";
    			add_location(span0, file, 17, 4, 267);
    			attr_dev(input0, "type", "text");
    			add_location(input0, file, 18, 4, 292);
    			add_location(div0, file, 16, 2, 257);
    			add_location(span1, file, 21, 4, 358);
    			attr_dev(input1, "type", "text");
    			add_location(input1, file, 22, 4, 384);
    			add_location(div1, file, 20, 2, 348);
    			add_location(button, file, 24, 2, 439);
    			add_location(div2, file, 15, 0, 249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			set_input_value(input0, /*channelId*/ ctx[0]);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, span1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			set_input_value(input1, /*username*/ ctx[1]);
    			append_dev(div2, t5);
    			append_dev(div2, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen_dev(button, "click", /*handleJoin*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*channelId*/ 1 && input0.value !== /*channelId*/ ctx[0]) {
    				set_input_value(input0, /*channelId*/ ctx[0]);
    			}

    			if (dirty & /*username*/ 2 && input1.value !== /*username*/ ctx[1]) {
    				set_input_value(input1, /*username*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let channelId = "";
    	let username = "";

    	const handleJoin = () => {
    		push(`/channel/${channelId}?user=${username}`);
    	};

    	const handleTest = () => {
    		push(`/test`);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		channelId = this.value;
    		$$invalidate(0, channelId);
    	}

    	function input1_input_handler() {
    		username = this.value;
    		$$invalidate(1, username);
    	}

    	$$self.$capture_state = () => ({
    		push,
    		channelId,
    		username,
    		handleJoin,
    		handleTest
    	});

    	$$self.$inject_state = $$props => {
    		if ('channelId' in $$props) $$invalidate(0, channelId = $$props.channelId);
    		if ('username' in $$props) $$invalidate(1, username = $$props.username);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [channelId, username, handleJoin, input0_input_handler, input1_input_handler];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const createChannelStore = (channelId) => {
      const { subscribe, set, update } = writable([]);
      const hostname = (new URL(window.location.href)).hostname;
      console.log('store2 hostname:', hostname);
      const eventSource = new EventSource(
        `http://${hostname}:4000/${channelId}/listen`
      );

      eventSource.onmessage = (e) => {
        update((messages) => messages.concat(JSON.parse(e.data)));
      };

      return {
        subscribe,
        reset: () => set([]),
        close: eventSource.close,
      };
    };

    /* src/components/Message.svelte generated by Svelte v3.46.4 */

    const file$1 = "src/components/Message.svelte";

    // (92:0) {:else}
    function create_else_block$1(ctx) {
    	let div2;
    	let div0;
    	let span0;
    	let i;
    	let t0;
    	let t1_value = /*message*/ ctx[1].username + "";
    	let t1;
    	let t2;
    	let span1;
    	let t3_value = `${new Date(/*message*/ ctx[1].time).toLocaleDateString()} ${new Date(/*message*/ ctx[1].time).toLocaleTimeString()}` + "";
    	let t3;
    	let t4;
    	let div1;
    	let t5_value = /*message*/ ctx[1].message + "";
    	let t5;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			span1 = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			div1 = element("div");
    			t5 = text(t5_value);
    			attr_dev(i, "class", "fa fa-circle online svelte-e23qsu");
    			add_location(i, file$1, 95, 8, 1571);
    			add_location(span0, file$1, 94, 6, 1556);
    			attr_dev(span1, "class", "time svelte-e23qsu");
    			add_location(span1, file$1, 98, 6, 1652);
    			attr_dev(div0, "class", "root svelte-e23qsu");
    			add_location(div0, file$1, 93, 4, 1531);
    			attr_dev(div1, "class", "message my-message svelte-e23qsu");
    			add_location(div1, file$1, 102, 4, 1807);
    			add_location(div2, file$1, 92, 2, 1521);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(span0, i);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, span1);
    			append_dev(span1, t3);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*message*/ 2 && t1_value !== (t1_value = /*message*/ ctx[1].username + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*message*/ 2 && t3_value !== (t3_value = `${new Date(/*message*/ ctx[1].time).toLocaleDateString()} ${new Date(/*message*/ ctx[1].time).toLocaleTimeString()}` + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*message*/ 2 && t5_value !== (t5_value = /*message*/ ctx[1].message + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(92:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (80:0) {#if alignRight}
    function create_if_block$1(ctx) {
    	let div2;
    	let div0;
    	let span0;
    	let t0_value = `${new Date(/*message*/ ctx[1].time).toLocaleDateString()} ${new Date(/*message*/ ctx[1].time).toLocaleTimeString()}` + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = /*message*/ ctx[1].username + "";
    	let t2;
    	let t3;
    	let i;
    	let t4;
    	let div1;
    	let t5_value = /*message*/ ctx[1].message + "";
    	let t5;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = text("\n         \n      ");
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			i = element("i");
    			t4 = space();
    			div1 = element("div");
    			t5 = text(t5_value);
    			attr_dev(span0, "class", "time svelte-e23qsu");
    			add_location(span0, file$1, 82, 6, 1182);
    			add_location(span1, file$1, 86, 6, 1348);
    			attr_dev(i, "class", "fa fa-circle me svelte-e23qsu");
    			add_location(i, file$1, 87, 6, 1386);
    			attr_dev(div0, "class", "root align-right svelte-e23qsu");
    			add_location(div0, file$1, 81, 4, 1145);
    			attr_dev(div1, "class", "message other-message float-right svelte-e23qsu");
    			add_location(div1, file$1, 89, 4, 1431);
    			add_location(div2, file$1, 80, 2, 1135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, span0);
    			append_dev(span0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, span1);
    			append_dev(span1, t2);
    			append_dev(div0, t3);
    			append_dev(div0, i);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*message*/ 2 && t0_value !== (t0_value = `${new Date(/*message*/ ctx[1].time).toLocaleDateString()} ${new Date(/*message*/ ctx[1].time).toLocaleTimeString()}` + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*message*/ 2 && t2_value !== (t2_value = /*message*/ ctx[1].username + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*message*/ 2 && t5_value !== (t5_value = /*message*/ ctx[1].message + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(80:0) {#if alignRight}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*alignRight*/ ctx[0]) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Message', slots, []);
    	let { alignRight = false } = $$props;

    	let { message = {
    		username: "Unknown",
    		message: "",
    		time: Date.now()
    	} } = $$props;

    	const writable_props = ['alignRight', 'message'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Message> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('alignRight' in $$props) $$invalidate(0, alignRight = $$props.alignRight);
    		if ('message' in $$props) $$invalidate(1, message = $$props.message);
    	};

    	$$self.$capture_state = () => ({ alignRight, message });

    	$$self.$inject_state = $$props => {
    		if ('alignRight' in $$props) $$invalidate(0, alignRight = $$props.alignRight);
    		if ('message' in $$props) $$invalidate(1, message = $$props.message);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [alignRight, message];
    }

    class Message extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { alignRight: 0, message: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Message",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get alignRight() {
    		throw new Error("<Message>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alignRight(value) {
    		throw new Error("<Message>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get message() {
    		throw new Error("<Message>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set message(value) {
    		throw new Error("<Message>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/TchatHeader.svelte generated by Svelte v3.46.4 */

    const file$2 = "src/components/TchatHeader.svelte";

    function create_fragment$3(ctx) {
    	let div3;
    	let img;
    	let img_src_value;
    	let t0;
    	let div2;
    	let div0;
    	let t1;
    	let t2;
    	let div1;
    	let t3;

    	let t4_value = (/*messageCount*/ ctx[1] > 1
    	? `${/*messageCount*/ ctx[1]} messages`
    	: `${/*messageCount*/ ctx[1]} message`) + "";

    	let t4;
    	let t5;
    	let i;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			img = element("img");
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			div1 = element("div");
    			t3 = text("already ");
    			t4 = text(t4_value);
    			t5 = space();
    			i = element("i");
    			if (!src_url_equal(img.src, img_src_value = "./logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "avatar");
    			attr_dev(img, "width", "55");
    			attr_dev(img, "class", "svelte-1hjxi75");
    			add_location(img, file$2, 48, 2, 673);
    			attr_dev(div0, "class", "with svelte-1hjxi75");
    			add_location(div0, file$2, 53, 4, 760);
    			attr_dev(div1, "class", "num-messages svelte-1hjxi75");
    			add_location(div1, file$2, 54, 4, 796);
    			attr_dev(div2, "class", "about svelte-1hjxi75");
    			add_location(div2, file$2, 52, 2, 736);
    			attr_dev(i, "class", "fa fa-star svelte-1hjxi75");
    			add_location(i, file$2, 58, 2, 935);
    			attr_dev(div3, "class", "root clearfix svelte-1hjxi75");
    			add_location(div3, file$2, 47, 0, 643);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, img);
    			append_dev(div3, t0);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, t3);
    			append_dev(div1, t4);
    			append_dev(div3, t5);
    			append_dev(div3, i);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);

    			if (dirty & /*messageCount*/ 2 && t4_value !== (t4_value = (/*messageCount*/ ctx[1] > 1
    			? `${/*messageCount*/ ctx[1]} messages`
    			: `${/*messageCount*/ ctx[1]} message`) + "")) set_data_dev(t4, t4_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TchatHeader', slots, []);
    	let { title = "Chat" } = $$props;
    	let { messageCount = 0 } = $$props;
    	const writable_props = ['title', 'messageCount'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TchatHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('messageCount' in $$props) $$invalidate(1, messageCount = $$props.messageCount);
    	};

    	$$self.$capture_state = () => ({ title, messageCount });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('messageCount' in $$props) $$invalidate(1, messageCount = $$props.messageCount);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, messageCount];
    }

    class TchatHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { title: 0, messageCount: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TchatHeader",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get title() {
    		throw new Error("<TchatHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<TchatHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get messageCount() {
    		throw new Error("<TchatHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set messageCount(value) {
    		throw new Error("<TchatHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/TchatInput.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/components/TchatInput.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let textarea;
    	let t0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			textarea = element("textarea");
    			t0 = space();
    			button = element("button");
    			button.textContent = "Send";
    			attr_dev(textarea, "placeholder", "Type your message");
    			attr_dev(textarea, "rows", "3");
    			attr_dev(textarea, "class", "svelte-13uqjv5");
    			add_location(textarea, file$3, 54, 2, 860);
    			attr_dev(button, "class", "svelte-13uqjv5");
    			add_location(button, file$3, 55, 2, 927);
    			attr_dev(div, "class", "root svelte-13uqjv5");
    			add_location(div, file$3, 53, 0, 839);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, textarea);
    			set_input_value(textarea, /*value*/ ctx[0]);
    			append_dev(div, t0);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[2]),
    					listen_dev(button, "click", /*handleSubmit*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value*/ 1) {
    				set_input_value(textarea, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TchatInput', slots, []);
    	const dispatch = createEventDispatcher();
    	let value = "";

    	const handleSubmit = () => {
    		dispatch("message", { text: value });
    		$$invalidate(0, value = "");
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TchatInput> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		value,
    		handleSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, handleSubmit, textarea_input_handler];
    }

    class TchatInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TchatInput",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/Tchat.svelte generated by Svelte v3.46.4 */
    const file$4 = "src/components/Tchat.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (91:6) {#each messages as message, i}
    function create_each_block(ctx) {
    	let li;
    	let message;
    	let t;
    	let current;

    	message = new Message({
    			props: {
    				alignRight: /*i*/ ctx[11] % 2,
    				message: /*message*/ ctx[9]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(message.$$.fragment);
    			t = space();
    			attr_dev(li, "class", "clearfix svelte-138uhin");
    			add_location(li, file$4, 91, 8, 1989);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(message, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const message_changes = {};
    			if (dirty & /*messages*/ 2) message_changes.message = /*message*/ ctx[9];
    			message.$set(message_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(message.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(message.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(message);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(91:6) {#each messages as message, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div1;
    	let tchatheader;
    	let t0;
    	let div0;
    	let ul;
    	let t1;
    	let tchatinput;
    	let current;

    	tchatheader = new TchatHeader({
    			props: {
    				title: `Chat on ${/*channelId*/ ctx[0]}`,
    				messageCount: /*messages*/ ctx[1].length
    			},
    			$$inline: true
    		});

    	let each_value = /*messages*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	tchatinput = new TchatInput({ $$inline: true });
    	tchatinput.$on("message", /*handleSendMessage*/ ctx[3]);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(tchatheader.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			create_component(tchatinput.$$.fragment);
    			attr_dev(ul, "class", "svelte-138uhin");
    			add_location(ul, file$4, 89, 4, 1939);
    			attr_dev(div0, "class", "history svelte-138uhin");
    			add_location(div0, file$4, 88, 2, 1897);
    			attr_dev(div1, "class", "root svelte-138uhin");
    			add_location(div1, file$4, 86, 0, 1796);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(tchatheader, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			/*div0_binding*/ ctx[4](div0);
    			append_dev(div1, t1);
    			mount_component(tchatinput, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const tchatheader_changes = {};
    			if (dirty & /*channelId*/ 1) tchatheader_changes.title = `Chat on ${/*channelId*/ ctx[0]}`;
    			if (dirty & /*messages*/ 2) tchatheader_changes.messageCount = /*messages*/ ctx[1].length;
    			tchatheader.$set(tchatheader_changes);

    			if (dirty & /*messages*/ 2) {
    				each_value = /*messages*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tchatheader.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(tchatinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tchatheader.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(tchatinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(tchatheader);
    			destroy_each(each_blocks, detaching);
    			/*div0_binding*/ ctx[4](null);
    			destroy_component(tchatinput);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $querystring;
    	validate_store(querystring, 'querystring');
    	component_subscribe($$self, querystring, $$value => $$invalidate(6, $querystring = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tchat', slots, []);

    	const getUsername = querystring => {
    		const match = querystring.match(/user=([^&]*)/);
    		return match ? match[1] : null;
    	};

    	let { channelId } = $$props;
    	let messages = [];
    	let username = getUsername($querystring) || "Unknown";
    	let div;
    	let autoscroll;

    	beforeUpdate(() => {
    		autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
    	});

    	afterUpdate(() => {
    		if (autoscroll) div.scrollTo(0, div.scrollHeight);
    	});

    	const handleSendMessage = async e => {
    		await fetch(`http://localhost:3000/${channelId}/send`, {
    			body: JSON.stringify({
    				message: e.detail.text,
    				username,
    				time: Date.now()
    			}),
    			headers: { "Content-Type": "application/json" },
    			method: "POST"
    		});
    	};

    	onMount(() => {
    		const store = createChannelStore(channelId);

    		store.subscribe(incomingMessages => {
    			$$invalidate(1, messages = incomingMessages);
    		});

    		return store.close;
    	});

    	const writable_props = ['channelId'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tchat> was created with unknown prop '${key}'`);
    	});

    	function div0_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			div = $$value;
    			$$invalidate(2, div);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('channelId' in $$props) $$invalidate(0, channelId = $$props.channelId);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		beforeUpdate,
    		afterUpdate,
    		querystring,
    		createChannelStore,
    		Message,
    		TchatHeader,
    		TchatInput,
    		getUsername,
    		channelId,
    		messages,
    		username,
    		div,
    		autoscroll,
    		handleSendMessage,
    		$querystring
    	});

    	$$self.$inject_state = $$props => {
    		if ('channelId' in $$props) $$invalidate(0, channelId = $$props.channelId);
    		if ('messages' in $$props) $$invalidate(1, messages = $$props.messages);
    		if ('username' in $$props) username = $$props.username;
    		if ('div' in $$props) $$invalidate(2, div = $$props.div);
    		if ('autoscroll' in $$props) autoscroll = $$props.autoscroll;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [channelId, messages, div, handleSendMessage, div0_binding];
    }

    class Tchat extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { channelId: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tchat",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*channelId*/ ctx[0] === undefined && !('channelId' in props)) {
    			console.warn("<Tchat> was created without expected prop 'channelId'");
    		}
    	}

    	get channelId() {
    		throw new Error("<Tchat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set channelId(value) {
    		throw new Error("<Tchat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Channel.svelte generated by Svelte v3.46.4 */
    const file$5 = "src/routes/Channel.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let tchat;
    	let current;

    	tchat = new Tchat({
    			props: { channelId: /*params*/ ctx[0].id },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(tchat.$$.fragment);
    			attr_dev(div, "class", "root svelte-u2bc5z");
    			add_location(div, file$5, 13, 0, 151);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(tchat, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const tchat_changes = {};
    			if (dirty & /*params*/ 1) tchat_changes.channelId = /*params*/ ctx[0].id;
    			tchat.$set(tchat_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tchat.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tchat.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(tchat);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Channel', slots, []);
    	let { params = {} } = $$props;
    	const writable_props = ['params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Channel> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(0, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({ Tchat, params });

    	$$self.$inject_state = $$props => {
    		if ('params' in $$props) $$invalidate(0, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [params];
    }

    class Channel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { params: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Channel",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get params() {
    		throw new Error("<Channel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<Channel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Test.svelte generated by Svelte v3.46.4 */

    const { console: console_1$1 } = globals;
    const file$6 = "src/routes/Test.svelte";

    function create_fragment$7(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Test tweak";
    			add_location(div, file$6, 13, 0, 490);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Test', slots, []);
    	let redisSub = { 'message': 'not store' };
    	console.log('redisSub', redisSub);

    	onMount(async () => {
    		console.log('Test.svelte onMount');
    		let response = await fetch('http://localhost:3000/stage1/fetch');
    		console.log('response', await response.json());
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Test> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		redisSub,
    		onMount,
    		beforeUpdate,
    		afterUpdate
    	});

    	$$self.$inject_state = $$props => {
    		if ('redisSub' in $$props) redisSub = $$props.redisSub;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class Test extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Test",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    // export const createChannelStore2 = (channelId) => {
    function createStore2() {
      const { subscribe, set, update } = writable([]);
      const channelId = 'test2';
      const hostname = (new URL(window.location.href)).hostname;
      console.log('store2 hostname:', hostname);
      const eventSource = new EventSource(
        `http://${hostname}:4000/${channelId}/listen`
      );
      eventSource.onmessage = (e) => {
        console.log('createStore2 event.data', e.data);
        let msg = JSON.parse(e.data);
        if (Array.isArray(msg)) {
            console.log('convert from array');
            msg = msg[0];
        }
        update(() => msg);
      };

      return {
        subscribe,
        reset: () => set([]),
        close: eventSource.close,
      };
    }
    const redisSub=createStore2();

    var HOOKS = [
        "onChange",
        "onClose",
        "onDayCreate",
        "onDestroy",
        "onKeyDown",
        "onMonthChange",
        "onOpen",
        "onParseConfig",
        "onReady",
        "onValueUpdate",
        "onYearChange",
        "onPreCalendarPosition",
    ];
    var defaults = {
        _disable: [],
        allowInput: false,
        allowInvalidPreload: false,
        altFormat: "F j, Y",
        altInput: false,
        altInputClass: "form-control input",
        animate: typeof window === "object" &&
            window.navigator.userAgent.indexOf("MSIE") === -1,
        ariaDateFormat: "F j, Y",
        autoFillDefaultTime: true,
        clickOpens: true,
        closeOnSelect: true,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: false,
        enableSeconds: false,
        enableTime: false,
        errorHandler: function (err) {
            return typeof console !== "undefined" && console.warn(err);
        },
        getWeek: function (givenDate) {
            var date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
            var week1 = new Date(date.getFullYear(), 0, 4);
            return (1 +
                Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                    3 +
                    ((week1.getDay() + 6) % 7)) /
                    7));
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: false,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        monthSelectorType: "dropdown",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: false,
        now: new Date(),
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: undefined,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: false,
        showMonths: 1,
        static: false,
        time_24hr: false,
        weekNumbers: false,
        wrap: false,
    };

    var english = {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
        },
        months: {
            shorthand: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            longhand: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: function (nth) {
            var s = nth % 100;
            if (s > 3 && s < 21)
                return "th";
            switch (s % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"],
        yearAriaLabel: "Year",
        monthAriaLabel: "Month",
        hourAriaLabel: "Hour",
        minuteAriaLabel: "Minute",
        time_24hr: false,
    };

    var pad = function (number, length) {
        if (length === void 0) { length = 2; }
        return ("000" + number).slice(length * -1);
    };
    var int = function (bool) { return (bool === true ? 1 : 0); };
    function debounce(fn, wait) {
        var t;
        return function () {
            var _this = this;
            var args = arguments;
            clearTimeout(t);
            t = setTimeout(function () { return fn.apply(_this, args); }, wait);
        };
    }
    var arrayify = function (obj) {
        return obj instanceof Array ? obj : [obj];
    };

    function toggleClass(elem, className, bool) {
        if (bool === true)
            return elem.classList.add(className);
        elem.classList.remove(className);
    }
    function createElement(tag, className, content) {
        var e = window.document.createElement(tag);
        className = className || "";
        content = content || "";
        e.className = className;
        if (content !== undefined)
            e.textContent = content;
        return e;
    }
    function clearNode(node) {
        while (node.firstChild)
            node.removeChild(node.firstChild);
    }
    function findParent(node, condition) {
        if (condition(node))
            return node;
        else if (node.parentNode)
            return findParent(node.parentNode, condition);
        return undefined;
    }
    function createNumberInput(inputClassName, opts) {
        var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
        if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
            numInput.type = "number";
        }
        else {
            numInput.type = "text";
            numInput.pattern = "\\d*";
        }
        if (opts !== undefined)
            for (var key in opts)
                numInput.setAttribute(key, opts[key]);
        wrapper.appendChild(numInput);
        wrapper.appendChild(arrowUp);
        wrapper.appendChild(arrowDown);
        return wrapper;
    }
    function getEventTarget(event) {
        try {
            if (typeof event.composedPath === "function") {
                var path = event.composedPath();
                return path[0];
            }
            return event.target;
        }
        catch (error) {
            return event.target;
        }
    }

    var doNothing = function () { return undefined; };
    var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
    var revFormat = {
        D: doNothing,
        F: function (dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: function (dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        H: function (dateObj, hour) {
            dateObj.setHours(parseFloat(hour));
        },
        J: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        K: function (dateObj, amPM, locale) {
            dateObj.setHours((dateObj.getHours() % 12) +
                12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
        },
        M: function (dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
        W: function (dateObj, weekNum, locale) {
            var weekNumber = parseInt(weekNum);
            var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: function (dateObj, year) {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: function (_, ISODate) { return new Date(ISODate); },
        d: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        h: function (dateObj, hour) {
            dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
        },
        i: function (dateObj, minutes) {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: function (dateObj, day) {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: function (dateObj, month) {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: function (dateObj, seconds) {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: function (_, unixMillSeconds) {
            return new Date(parseFloat(unixMillSeconds));
        },
        w: doNothing,
        y: function (dateObj, year) {
            dateObj.setFullYear(2000 + parseFloat(year));
        },
    };
    var tokenRegex = {
        D: "",
        F: "",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        u: "(.+)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})",
    };
    var formats = {
        Z: function (date) { return date.toISOString(); },
        D: function (date, locale, options) {
            return locale.weekdays.shorthand[formats.w(date, locale, options)];
        },
        F: function (date, locale, options) {
            return monthToStr(formats.n(date, locale, options) - 1, false, locale);
        },
        G: function (date, locale, options) {
            return pad(formats.h(date, locale, options));
        },
        H: function (date) { return pad(date.getHours()); },
        J: function (date, locale) {
            return locale.ordinal !== undefined
                ? date.getDate() + locale.ordinal(date.getDate())
                : date.getDate();
        },
        K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
        M: function (date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        S: function (date) { return pad(date.getSeconds()); },
        U: function (date) { return date.getTime() / 1000; },
        W: function (date, _, options) {
            return options.getWeek(date);
        },
        Y: function (date) { return pad(date.getFullYear(), 4); },
        d: function (date) { return pad(date.getDate()); },
        h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
        i: function (date) { return pad(date.getMinutes()); },
        j: function (date) { return date.getDate(); },
        l: function (date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        m: function (date) { return pad(date.getMonth() + 1); },
        n: function (date) { return date.getMonth() + 1; },
        s: function (date) { return date.getSeconds(); },
        u: function (date) { return date.getTime(); },
        w: function (date) { return date.getDay(); },
        y: function (date) { return String(date.getFullYear()).substring(2); },
    };

    var createDateFormatter = function (_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
        return function (dateObj, frmt, overrideLocale) {
            var locale = overrideLocale || l10n;
            if (config.formatDate !== undefined && !isMobile) {
                return config.formatDate(dateObj, frmt, locale);
            }
            return frmt
                .split("")
                .map(function (c, i, arr) {
                return formats[c] && arr[i - 1] !== "\\"
                    ? formats[c](dateObj, locale, config)
                    : c !== "\\"
                        ? c
                        : "";
            })
                .join("");
        };
    };
    var createDateParser = function (_a) {
        var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
        return function (date, givenFormat, timeless, customLocale) {
            if (date !== 0 && !date)
                return undefined;
            var locale = customLocale || l10n;
            var parsedDate;
            var dateOrig = date;
            if (date instanceof Date)
                parsedDate = new Date(date.getTime());
            else if (typeof date !== "string" &&
                date.toFixed !== undefined)
                parsedDate = new Date(date);
            else if (typeof date === "string") {
                var format = givenFormat || (config || defaults).dateFormat;
                var datestr = String(date).trim();
                if (datestr === "today") {
                    parsedDate = new Date();
                    timeless = true;
                }
                else if (config && config.parseDate) {
                    parsedDate = config.parseDate(date, format);
                }
                else if (/Z$/.test(datestr) ||
                    /GMT$/.test(datestr)) {
                    parsedDate = new Date(date);
                }
                else {
                    var matched = void 0, ops = [];
                    for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                        var token = format[i];
                        var isBackSlash = token === "\\";
                        var escaped = format[i - 1] === "\\" || isBackSlash;
                        if (tokenRegex[token] && !escaped) {
                            regexStr += tokenRegex[token];
                            var match = new RegExp(regexStr).exec(date);
                            if (match && (matched = true)) {
                                ops[token !== "Y" ? "push" : "unshift"]({
                                    fn: revFormat[token],
                                    val: match[++matchIndex],
                                });
                            }
                        }
                        else if (!isBackSlash)
                            regexStr += ".";
                    }
                    parsedDate =
                        !config || !config.noCalendar
                            ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                            : new Date(new Date().setHours(0, 0, 0, 0));
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                    });
                    parsedDate = matched ? parsedDate : undefined;
                }
            }
            if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
                config.errorHandler(new Error("Invalid date provided: " + dateOrig));
                return undefined;
            }
            if (timeless === true)
                parsedDate.setHours(0, 0, 0, 0);
            return parsedDate;
        };
    };
    function compareDates(date1, date2, timeless) {
        if (timeless === void 0) { timeless = true; }
        if (timeless !== false) {
            return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
                new Date(date2.getTime()).setHours(0, 0, 0, 0));
        }
        return date1.getTime() - date2.getTime();
    }
    var isBetween = function (ts, ts1, ts2) {
        return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
    };
    var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
        return hours * 3600 + minutes * 60 + seconds;
    };
    var parseSeconds = function (secondsSinceMidnight) {
        var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
        return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
    };
    var duration = {
        DAY: 86400000,
    };
    function getDefaultHours(config) {
        var hours = config.defaultHour;
        var minutes = config.defaultMinute;
        var seconds = config.defaultSeconds;
        if (config.minDate !== undefined) {
            var minHour = config.minDate.getHours();
            var minMinutes = config.minDate.getMinutes();
            var minSeconds = config.minDate.getSeconds();
            if (hours < minHour) {
                hours = minHour;
            }
            if (hours === minHour && minutes < minMinutes) {
                minutes = minMinutes;
            }
            if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
                seconds = config.minDate.getSeconds();
        }
        if (config.maxDate !== undefined) {
            var maxHr = config.maxDate.getHours();
            var maxMinutes = config.maxDate.getMinutes();
            hours = Math.min(hours, maxHr);
            if (hours === maxHr)
                minutes = Math.min(maxMinutes, minutes);
            if (hours === maxHr && minutes === maxMinutes)
                seconds = config.maxDate.getSeconds();
        }
        return { hours: hours, minutes: minutes, seconds: seconds };
    }

    if (typeof Object.assign !== "function") {
        Object.assign = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!target) {
                throw TypeError("Cannot convert undefined or null to object");
            }
            var _loop_1 = function (source) {
                if (source) {
                    Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
                }
            };
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var source = args_1[_a];
                _loop_1(source);
            }
            return target;
        };
    }

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var DEBOUNCED_CHANGE_MS = 300;
    function FlatpickrInstance(element, instanceConfig) {
        var self = {
            config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
            l10n: english,
        };
        self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
        self._handlers = [];
        self.pluginElements = [];
        self.loadedPlugins = [];
        self._bind = bind;
        self._setHoursFromDate = setHoursFromDate;
        self._positionCalendar = positionCalendar;
        self.changeMonth = changeMonth;
        self.changeYear = changeYear;
        self.clear = clear;
        self.close = close;
        self.onMouseOver = onMouseOver;
        self._createElement = createElement;
        self.createDay = createDay;
        self.destroy = destroy;
        self.isEnabled = isEnabled;
        self.jumpToDate = jumpToDate;
        self.updateValue = updateValue;
        self.open = open;
        self.redraw = redraw;
        self.set = set;
        self.setDate = setDate;
        self.toggle = toggle;
        function setupHelperFunctions() {
            self.utils = {
                getDaysInMonth: function (month, yr) {
                    if (month === void 0) { month = self.currentMonth; }
                    if (yr === void 0) { yr = self.currentYear; }
                    if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                        return 29;
                    return self.l10n.daysInMonth[month];
                },
            };
        }
        function init() {
            self.element = self.input = element;
            self.isOpen = false;
            parseConfig();
            setupLocale();
            setupInputs();
            setupDates();
            setupHelperFunctions();
            if (!self.isMobile)
                build();
            bindEvents();
            if (self.selectedDates.length || self.config.noCalendar) {
                if (self.config.enableTime) {
                    setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
                }
                updateValue(false);
            }
            setCalendarWidth();
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (!self.isMobile && isSafari) {
                positionCalendar();
            }
            triggerEvent("onReady");
        }
        function getClosestActiveElement() {
            var _a;
            return ((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
        }
        function bindToInstance(fn) {
            return fn.bind(self);
        }
        function setCalendarWidth() {
            var config = self.config;
            if (config.weekNumbers === false && config.showMonths === 1) {
                return;
            }
            else if (config.noCalendar !== true) {
                window.requestAnimationFrame(function () {
                    if (self.calendarContainer !== undefined) {
                        self.calendarContainer.style.visibility = "hidden";
                        self.calendarContainer.style.display = "block";
                    }
                    if (self.daysContainer !== undefined) {
                        var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                        self.daysContainer.style.width = daysWidth + "px";
                        self.calendarContainer.style.width =
                            daysWidth +
                                (self.weekWrapper !== undefined
                                    ? self.weekWrapper.offsetWidth
                                    : 0) +
                                "px";
                        self.calendarContainer.style.removeProperty("visibility");
                        self.calendarContainer.style.removeProperty("display");
                    }
                });
            }
        }
        function updateTime(e) {
            if (self.selectedDates.length === 0) {
                var defaultDate = self.config.minDate === undefined ||
                    compareDates(new Date(), self.config.minDate) >= 0
                    ? new Date()
                    : new Date(self.config.minDate.getTime());
                var defaults = getDefaultHours(self.config);
                defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
                self.selectedDates = [defaultDate];
                self.latestSelectedDateObj = defaultDate;
            }
            if (e !== undefined && e.type !== "blur") {
                timeWrapper(e);
            }
            var prevValue = self._input.value;
            setHoursFromInputs();
            updateValue();
            if (self._input.value !== prevValue) {
                self._debouncedChange();
            }
        }
        function ampm2military(hour, amPM) {
            return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
        }
        function military2ampm(hour) {
            switch (hour % 24) {
                case 0:
                case 12:
                    return 12;
                default:
                    return hour % 12;
            }
        }
        function setHoursFromInputs() {
            if (self.hourElement === undefined || self.minuteElement === undefined)
                return;
            var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
                ? (parseInt(self.secondElement.value, 10) || 0) % 60
                : 0;
            if (self.amPM !== undefined) {
                hours = ampm2military(hours, self.amPM.textContent);
            }
            var limitMinHours = self.config.minTime !== undefined ||
                (self.config.minDate &&
                    self.minDateHasTime &&
                    self.latestSelectedDateObj &&
                    compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                        0);
            var limitMaxHours = self.config.maxTime !== undefined ||
                (self.config.maxDate &&
                    self.maxDateHasTime &&
                    self.latestSelectedDateObj &&
                    compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                        0);
            if (self.config.maxTime !== undefined &&
                self.config.minTime !== undefined &&
                self.config.minTime > self.config.maxTime) {
                var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
                var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
                var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
                if (currentTime > maxBound && currentTime < minBound) {
                    var result = parseSeconds(minBound);
                    hours = result[0];
                    minutes = result[1];
                    seconds = result[2];
                }
            }
            else {
                if (limitMaxHours) {
                    var maxTime = self.config.maxTime !== undefined
                        ? self.config.maxTime
                        : self.config.maxDate;
                    hours = Math.min(hours, maxTime.getHours());
                    if (hours === maxTime.getHours())
                        minutes = Math.min(minutes, maxTime.getMinutes());
                    if (minutes === maxTime.getMinutes())
                        seconds = Math.min(seconds, maxTime.getSeconds());
                }
                if (limitMinHours) {
                    var minTime = self.config.minTime !== undefined
                        ? self.config.minTime
                        : self.config.minDate;
                    hours = Math.max(hours, minTime.getHours());
                    if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                        minutes = minTime.getMinutes();
                    if (minutes === minTime.getMinutes())
                        seconds = Math.max(seconds, minTime.getSeconds());
                }
            }
            setHours(hours, minutes, seconds);
        }
        function setHoursFromDate(dateObj) {
            var date = dateObj || self.latestSelectedDateObj;
            if (date && date instanceof Date) {
                setHours(date.getHours(), date.getMinutes(), date.getSeconds());
            }
        }
        function setHours(hours, minutes, seconds) {
            if (self.latestSelectedDateObj !== undefined) {
                self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
            }
            if (!self.hourElement || !self.minuteElement || self.isMobile)
                return;
            self.hourElement.value = pad(!self.config.time_24hr
                ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
                : hours);
            self.minuteElement.value = pad(minutes);
            if (self.amPM !== undefined)
                self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
            if (self.secondElement !== undefined)
                self.secondElement.value = pad(seconds);
        }
        function onYearInput(event) {
            var eventTarget = getEventTarget(event);
            var year = parseInt(eventTarget.value) + (event.delta || 0);
            if (year / 1000 > 1 ||
                (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
                changeYear(year);
            }
        }
        function bind(element, event, handler, options) {
            if (event instanceof Array)
                return event.forEach(function (ev) { return bind(element, ev, handler, options); });
            if (element instanceof Array)
                return element.forEach(function (el) { return bind(el, event, handler, options); });
            element.addEventListener(event, handler, options);
            self._handlers.push({
                remove: function () { return element.removeEventListener(event, handler, options); },
            });
        }
        function triggerChange() {
            triggerEvent("onChange");
        }
        function bindEvents() {
            if (self.config.wrap) {
                ["open", "close", "toggle", "clear"].forEach(function (evt) {
                    Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                        return bind(el, "click", self[evt]);
                    });
                });
            }
            if (self.isMobile) {
                setupMobile();
                return;
            }
            var debouncedResize = debounce(onResize, 50);
            self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
            if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
                bind(self.daysContainer, "mouseover", function (e) {
                    if (self.config.mode === "range")
                        onMouseOver(getEventTarget(e));
                });
            bind(self._input, "keydown", onKeyDown);
            if (self.calendarContainer !== undefined) {
                bind(self.calendarContainer, "keydown", onKeyDown);
            }
            if (!self.config.inline && !self.config.static)
                bind(window, "resize", debouncedResize);
            if (window.ontouchstart !== undefined)
                bind(window.document, "touchstart", documentClick);
            else
                bind(window.document, "mousedown", documentClick);
            bind(window.document, "focus", documentClick, { capture: true });
            if (self.config.clickOpens === true) {
                bind(self._input, "focus", self.open);
                bind(self._input, "click", self.open);
            }
            if (self.daysContainer !== undefined) {
                bind(self.monthNav, "click", onMonthNavClick);
                bind(self.monthNav, ["keyup", "increment"], onYearInput);
                bind(self.daysContainer, "click", selectDate);
            }
            if (self.timeContainer !== undefined &&
                self.minuteElement !== undefined &&
                self.hourElement !== undefined) {
                var selText = function (e) {
                    return getEventTarget(e).select();
                };
                bind(self.timeContainer, ["increment"], updateTime);
                bind(self.timeContainer, "blur", updateTime, { capture: true });
                bind(self.timeContainer, "click", timeIncrement);
                bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
                if (self.secondElement !== undefined)
                    bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
                if (self.amPM !== undefined) {
                    bind(self.amPM, "click", function (e) {
                        updateTime(e);
                    });
                }
            }
            if (self.config.allowInput) {
                bind(self._input, "blur", onBlur);
            }
        }
        function jumpToDate(jumpDate, triggerChange) {
            var jumpTo = jumpDate !== undefined
                ? self.parseDate(jumpDate)
                : self.latestSelectedDateObj ||
                    (self.config.minDate && self.config.minDate > self.now
                        ? self.config.minDate
                        : self.config.maxDate && self.config.maxDate < self.now
                            ? self.config.maxDate
                            : self.now);
            var oldYear = self.currentYear;
            var oldMonth = self.currentMonth;
            try {
                if (jumpTo !== undefined) {
                    self.currentYear = jumpTo.getFullYear();
                    self.currentMonth = jumpTo.getMonth();
                }
            }
            catch (e) {
                e.message = "Invalid date supplied: " + jumpTo;
                self.config.errorHandler(e);
            }
            if (triggerChange && self.currentYear !== oldYear) {
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            if (triggerChange &&
                (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
                triggerEvent("onMonthChange");
            }
            self.redraw();
        }
        function timeIncrement(e) {
            var eventTarget = getEventTarget(e);
            if (~eventTarget.className.indexOf("arrow"))
                incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
        }
        function incrementNumInput(e, delta, inputElem) {
            var target = e && getEventTarget(e);
            var input = inputElem ||
                (target && target.parentNode && target.parentNode.firstChild);
            var event = createEvent("increment");
            event.delta = delta;
            input && input.dispatchEvent(event);
        }
        function build() {
            var fragment = window.document.createDocumentFragment();
            self.calendarContainer = createElement("div", "flatpickr-calendar");
            self.calendarContainer.tabIndex = -1;
            if (!self.config.noCalendar) {
                fragment.appendChild(buildMonthNav());
                self.innerContainer = createElement("div", "flatpickr-innerContainer");
                if (self.config.weekNumbers) {
                    var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                    self.innerContainer.appendChild(weekWrapper);
                    self.weekNumbers = weekNumbers;
                    self.weekWrapper = weekWrapper;
                }
                self.rContainer = createElement("div", "flatpickr-rContainer");
                self.rContainer.appendChild(buildWeekdays());
                if (!self.daysContainer) {
                    self.daysContainer = createElement("div", "flatpickr-days");
                    self.daysContainer.tabIndex = -1;
                }
                buildDays();
                self.rContainer.appendChild(self.daysContainer);
                self.innerContainer.appendChild(self.rContainer);
                fragment.appendChild(self.innerContainer);
            }
            if (self.config.enableTime) {
                fragment.appendChild(buildTime());
            }
            toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
            toggleClass(self.calendarContainer, "animate", self.config.animate === true);
            toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
            self.calendarContainer.appendChild(fragment);
            var customAppend = self.config.appendTo !== undefined &&
                self.config.appendTo.nodeType !== undefined;
            if (self.config.inline || self.config.static) {
                self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
                if (self.config.inline) {
                    if (!customAppend && self.element.parentNode)
                        self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                    else if (self.config.appendTo !== undefined)
                        self.config.appendTo.appendChild(self.calendarContainer);
                }
                if (self.config.static) {
                    var wrapper = createElement("div", "flatpickr-wrapper");
                    if (self.element.parentNode)
                        self.element.parentNode.insertBefore(wrapper, self.element);
                    wrapper.appendChild(self.element);
                    if (self.altInput)
                        wrapper.appendChild(self.altInput);
                    wrapper.appendChild(self.calendarContainer);
                }
            }
            if (!self.config.static && !self.config.inline)
                (self.config.appendTo !== undefined
                    ? self.config.appendTo
                    : window.document.body).appendChild(self.calendarContainer);
        }
        function createDay(className, date, dayNumber, i) {
            var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
            dayElement.dateObj = date;
            dayElement.$i = i;
            dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
            if (className.indexOf("hidden") === -1 &&
                compareDates(date, self.now) === 0) {
                self.todayDateElem = dayElement;
                dayElement.classList.add("today");
                dayElement.setAttribute("aria-current", "date");
            }
            if (dateIsEnabled) {
                dayElement.tabIndex = -1;
                if (isDateSelected(date)) {
                    dayElement.classList.add("selected");
                    self.selectedDateElem = dayElement;
                    if (self.config.mode === "range") {
                        toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                            compareDates(date, self.selectedDates[0], true) === 0);
                        toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                            compareDates(date, self.selectedDates[1], true) === 0);
                        if (className === "nextMonthDay")
                            dayElement.classList.add("inRange");
                    }
                }
            }
            else {
                dayElement.classList.add("flatpickr-disabled");
            }
            if (self.config.mode === "range") {
                if (isDateInRange(date) && !isDateSelected(date))
                    dayElement.classList.add("inRange");
            }
            if (self.weekNumbers &&
                self.config.showMonths === 1 &&
                className !== "prevMonthDay" &&
                dayNumber % 7 === 1) {
                self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
            }
            triggerEvent("onDayCreate", dayElement);
            return dayElement;
        }
        function focusOnDayElem(targetNode) {
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        }
        function getFirstAvailableDay(delta) {
            var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            for (var m = startMonth; m != endMonth; m += delta) {
                var month = self.daysContainer.children[m];
                var startIndex = delta > 0 ? 0 : month.children.length - 1;
                var endIndex = delta > 0 ? month.children.length : -1;
                for (var i = startIndex; i != endIndex; i += delta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                        return c;
                }
            }
            return undefined;
        }
        function getNextAvailableDay(current, delta) {
            var givenMonth = current.className.indexOf("Month") === -1
                ? current.dateObj.getMonth()
                : self.currentMonth;
            var endMonth = delta > 0 ? self.config.showMonths : -1;
            var loopDelta = delta > 0 ? 1 : -1;
            for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
                var month = self.daysContainer.children[m];
                var startIndex = givenMonth - self.currentMonth === m
                    ? current.$i + delta
                    : delta < 0
                        ? month.children.length - 1
                        : 0;
                var numMonthDays = month.children.length;
                for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                    var c = month.children[i];
                    if (c.className.indexOf("hidden") === -1 &&
                        isEnabled(c.dateObj) &&
                        Math.abs(current.$i - i) >= Math.abs(delta))
                        return focusOnDayElem(c);
                }
            }
            self.changeMonth(loopDelta);
            focusOnDay(getFirstAvailableDay(loopDelta), 0);
            return undefined;
        }
        function focusOnDay(current, offset) {
            var activeElement = getClosestActiveElement();
            var dayFocused = isInView(activeElement || document.body);
            var startElem = current !== undefined
                ? current
                : dayFocused
                    ? activeElement
                    : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                        ? self.selectedDateElem
                        : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                            ? self.todayDateElem
                            : getFirstAvailableDay(offset > 0 ? 1 : -1);
            if (startElem === undefined) {
                self._input.focus();
            }
            else if (!dayFocused) {
                focusOnDayElem(startElem);
            }
            else {
                getNextAvailableDay(startElem, offset);
            }
        }
        function buildMonthDays(year, month) {
            var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
            var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
            var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
            var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
            for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
                days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
            }
            for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
                days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
            }
            for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
                (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
                days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
            }
            var dayContainer = createElement("div", "dayContainer");
            dayContainer.appendChild(days);
            return dayContainer;
        }
        function buildDays() {
            if (self.daysContainer === undefined) {
                return;
            }
            clearNode(self.daysContainer);
            if (self.weekNumbers)
                clearNode(self.weekNumbers);
            var frag = document.createDocumentFragment();
            for (var i = 0; i < self.config.showMonths; i++) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
            }
            self.daysContainer.appendChild(frag);
            self.days = self.daysContainer.firstChild;
            if (self.config.mode === "range" && self.selectedDates.length === 1) {
                onMouseOver();
            }
        }
        function buildMonthSwitch() {
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType !== "dropdown")
                return;
            var shouldBuildMonth = function (month) {
                if (self.config.minDate !== undefined &&
                    self.currentYear === self.config.minDate.getFullYear() &&
                    month < self.config.minDate.getMonth()) {
                    return false;
                }
                return !(self.config.maxDate !== undefined &&
                    self.currentYear === self.config.maxDate.getFullYear() &&
                    month > self.config.maxDate.getMonth());
            };
            self.monthsDropdownContainer.tabIndex = -1;
            self.monthsDropdownContainer.innerHTML = "";
            for (var i = 0; i < 12; i++) {
                if (!shouldBuildMonth(i))
                    continue;
                var month = createElement("option", "flatpickr-monthDropdown-month");
                month.value = new Date(self.currentYear, i).getMonth().toString();
                month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
                month.tabIndex = -1;
                if (self.currentMonth === i) {
                    month.selected = true;
                }
                self.monthsDropdownContainer.appendChild(month);
            }
        }
        function buildMonth() {
            var container = createElement("div", "flatpickr-month");
            var monthNavFragment = window.document.createDocumentFragment();
            var monthElement;
            if (self.config.showMonths > 1 ||
                self.config.monthSelectorType === "static") {
                monthElement = createElement("span", "cur-month");
            }
            else {
                self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
                self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
                bind(self.monthsDropdownContainer, "change", function (e) {
                    var target = getEventTarget(e);
                    var selectedMonth = parseInt(target.value, 10);
                    self.changeMonth(selectedMonth - self.currentMonth);
                    triggerEvent("onMonthChange");
                });
                buildMonthSwitch();
                monthElement = self.monthsDropdownContainer;
            }
            var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
            var yearElement = yearInput.getElementsByTagName("input")[0];
            yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
            if (self.config.minDate) {
                yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
            }
            if (self.config.maxDate) {
                yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
                yearElement.disabled =
                    !!self.config.minDate &&
                        self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
            }
            var currentMonth = createElement("div", "flatpickr-current-month");
            currentMonth.appendChild(monthElement);
            currentMonth.appendChild(yearInput);
            monthNavFragment.appendChild(currentMonth);
            container.appendChild(monthNavFragment);
            return {
                container: container,
                yearElement: yearElement,
                monthElement: monthElement,
            };
        }
        function buildMonths() {
            clearNode(self.monthNav);
            self.monthNav.appendChild(self.prevMonthNav);
            if (self.config.showMonths) {
                self.yearElements = [];
                self.monthElements = [];
            }
            for (var m = self.config.showMonths; m--;) {
                var month = buildMonth();
                self.yearElements.push(month.yearElement);
                self.monthElements.push(month.monthElement);
                self.monthNav.appendChild(month.container);
            }
            self.monthNav.appendChild(self.nextMonthNav);
        }
        function buildMonthNav() {
            self.monthNav = createElement("div", "flatpickr-months");
            self.yearElements = [];
            self.monthElements = [];
            self.prevMonthNav = createElement("span", "flatpickr-prev-month");
            self.prevMonthNav.innerHTML = self.config.prevArrow;
            self.nextMonthNav = createElement("span", "flatpickr-next-month");
            self.nextMonthNav.innerHTML = self.config.nextArrow;
            buildMonths();
            Object.defineProperty(self, "_hidePrevMonthArrow", {
                get: function () { return self.__hidePrevMonthArrow; },
                set: function (bool) {
                    if (self.__hidePrevMonthArrow !== bool) {
                        toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                        self.__hidePrevMonthArrow = bool;
                    }
                },
            });
            Object.defineProperty(self, "_hideNextMonthArrow", {
                get: function () { return self.__hideNextMonthArrow; },
                set: function (bool) {
                    if (self.__hideNextMonthArrow !== bool) {
                        toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                        self.__hideNextMonthArrow = bool;
                    }
                },
            });
            self.currentYearElement = self.yearElements[0];
            updateNavigationCurrentMonth();
            return self.monthNav;
        }
        function buildTime() {
            self.calendarContainer.classList.add("hasTime");
            if (self.config.noCalendar)
                self.calendarContainer.classList.add("noCalendar");
            var defaults = getDefaultHours(self.config);
            self.timeContainer = createElement("div", "flatpickr-time");
            self.timeContainer.tabIndex = -1;
            var separator = createElement("span", "flatpickr-time-separator", ":");
            var hourInput = createNumberInput("flatpickr-hour", {
                "aria-label": self.l10n.hourAriaLabel,
            });
            self.hourElement = hourInput.getElementsByTagName("input")[0];
            var minuteInput = createNumberInput("flatpickr-minute", {
                "aria-label": self.l10n.minuteAriaLabel,
            });
            self.minuteElement = minuteInput.getElementsByTagName("input")[0];
            self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
            self.hourElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getHours()
                : self.config.time_24hr
                    ? defaults.hours
                    : military2ampm(defaults.hours));
            self.minuteElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getMinutes()
                : defaults.minutes);
            self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
            self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
            self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
            self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
            self.hourElement.setAttribute("maxlength", "2");
            self.minuteElement.setAttribute("min", "0");
            self.minuteElement.setAttribute("max", "59");
            self.minuteElement.setAttribute("maxlength", "2");
            self.timeContainer.appendChild(hourInput);
            self.timeContainer.appendChild(separator);
            self.timeContainer.appendChild(minuteInput);
            if (self.config.time_24hr)
                self.timeContainer.classList.add("time24hr");
            if (self.config.enableSeconds) {
                self.timeContainer.classList.add("hasSeconds");
                var secondInput = createNumberInput("flatpickr-second");
                self.secondElement = secondInput.getElementsByTagName("input")[0];
                self.secondElement.value = pad(self.latestSelectedDateObj
                    ? self.latestSelectedDateObj.getSeconds()
                    : defaults.seconds);
                self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
                self.secondElement.setAttribute("min", "0");
                self.secondElement.setAttribute("max", "59");
                self.secondElement.setAttribute("maxlength", "2");
                self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
                self.timeContainer.appendChild(secondInput);
            }
            if (!self.config.time_24hr) {
                self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                    ? self.hourElement.value
                    : self.config.defaultHour) > 11)]);
                self.amPM.title = self.l10n.toggleTitle;
                self.amPM.tabIndex = -1;
                self.timeContainer.appendChild(self.amPM);
            }
            return self.timeContainer;
        }
        function buildWeekdays() {
            if (!self.weekdayContainer)
                self.weekdayContainer = createElement("div", "flatpickr-weekdays");
            else
                clearNode(self.weekdayContainer);
            for (var i = self.config.showMonths; i--;) {
                var container = createElement("div", "flatpickr-weekdaycontainer");
                self.weekdayContainer.appendChild(container);
            }
            updateWeekdays();
            return self.weekdayContainer;
        }
        function updateWeekdays() {
            if (!self.weekdayContainer) {
                return;
            }
            var firstDayOfWeek = self.l10n.firstDayOfWeek;
            var weekdays = __spreadArrays(self.l10n.weekdays.shorthand);
            if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
                weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
            }
            for (var i = self.config.showMonths; i--;) {
                self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
            }
        }
        function buildWeeks() {
            self.calendarContainer.classList.add("hasWeeks");
            var weekWrapper = createElement("div", "flatpickr-weekwrapper");
            weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
            var weekNumbers = createElement("div", "flatpickr-weeks");
            weekWrapper.appendChild(weekNumbers);
            return {
                weekWrapper: weekWrapper,
                weekNumbers: weekNumbers,
            };
        }
        function changeMonth(value, isOffset) {
            if (isOffset === void 0) { isOffset = true; }
            var delta = isOffset ? value : value - self.currentMonth;
            if ((delta < 0 && self._hidePrevMonthArrow === true) ||
                (delta > 0 && self._hideNextMonthArrow === true))
                return;
            self.currentMonth += delta;
            if (self.currentMonth < 0 || self.currentMonth > 11) {
                self.currentYear += self.currentMonth > 11 ? 1 : -1;
                self.currentMonth = (self.currentMonth + 12) % 12;
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
            buildDays();
            triggerEvent("onMonthChange");
            updateNavigationCurrentMonth();
        }
        function clear(triggerChangeEvent, toInitial) {
            if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
            if (toInitial === void 0) { toInitial = true; }
            self.input.value = "";
            if (self.altInput !== undefined)
                self.altInput.value = "";
            if (self.mobileInput !== undefined)
                self.mobileInput.value = "";
            self.selectedDates = [];
            self.latestSelectedDateObj = undefined;
            if (toInitial === true) {
                self.currentYear = self._initialDate.getFullYear();
                self.currentMonth = self._initialDate.getMonth();
            }
            if (self.config.enableTime === true) {
                var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
                setHours(hours, minutes, seconds);
            }
            self.redraw();
            if (triggerChangeEvent)
                triggerEvent("onChange");
        }
        function close() {
            self.isOpen = false;
            if (!self.isMobile) {
                if (self.calendarContainer !== undefined) {
                    self.calendarContainer.classList.remove("open");
                }
                if (self._input !== undefined) {
                    self._input.classList.remove("active");
                }
            }
            triggerEvent("onClose");
        }
        function destroy() {
            if (self.config !== undefined)
                triggerEvent("onDestroy");
            for (var i = self._handlers.length; i--;) {
                self._handlers[i].remove();
            }
            self._handlers = [];
            if (self.mobileInput) {
                if (self.mobileInput.parentNode)
                    self.mobileInput.parentNode.removeChild(self.mobileInput);
                self.mobileInput = undefined;
            }
            else if (self.calendarContainer && self.calendarContainer.parentNode) {
                if (self.config.static && self.calendarContainer.parentNode) {
                    var wrapper = self.calendarContainer.parentNode;
                    wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                    if (wrapper.parentNode) {
                        while (wrapper.firstChild)
                            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                        wrapper.parentNode.removeChild(wrapper);
                    }
                }
                else
                    self.calendarContainer.parentNode.removeChild(self.calendarContainer);
            }
            if (self.altInput) {
                self.input.type = "text";
                if (self.altInput.parentNode)
                    self.altInput.parentNode.removeChild(self.altInput);
                delete self.altInput;
            }
            if (self.input) {
                self.input.type = self.input._type;
                self.input.classList.remove("flatpickr-input");
                self.input.removeAttribute("readonly");
            }
            [
                "_showTimeInput",
                "latestSelectedDateObj",
                "_hideNextMonthArrow",
                "_hidePrevMonthArrow",
                "__hideNextMonthArrow",
                "__hidePrevMonthArrow",
                "isMobile",
                "isOpen",
                "selectedDateElem",
                "minDateHasTime",
                "maxDateHasTime",
                "days",
                "daysContainer",
                "_input",
                "_positionElement",
                "innerContainer",
                "rContainer",
                "monthNav",
                "todayDateElem",
                "calendarContainer",
                "weekdayContainer",
                "prevMonthNav",
                "nextMonthNav",
                "monthsDropdownContainer",
                "currentMonthElement",
                "currentYearElement",
                "navigationCurrentMonth",
                "selectedDateElem",
                "config",
            ].forEach(function (k) {
                try {
                    delete self[k];
                }
                catch (_) { }
            });
        }
        function isCalendarElem(elem) {
            return self.calendarContainer.contains(elem);
        }
        function documentClick(e) {
            if (self.isOpen && !self.config.inline) {
                var eventTarget_1 = getEventTarget(e);
                var isCalendarElement = isCalendarElem(eventTarget_1);
                var isInput = eventTarget_1 === self.input ||
                    eventTarget_1 === self.altInput ||
                    self.element.contains(eventTarget_1) ||
                    (e.path &&
                        e.path.indexOf &&
                        (~e.path.indexOf(self.input) ||
                            ~e.path.indexOf(self.altInput)));
                var lostFocus = !isInput &&
                    !isCalendarElement &&
                    !isCalendarElem(e.relatedTarget);
                var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                    return elem.contains(eventTarget_1);
                });
                if (lostFocus && isIgnored) {
                    if (self.config.allowInput) {
                        self.setDate(self._input.value, false, self.config.altInput
                            ? self.config.altFormat
                            : self.config.dateFormat);
                    }
                    if (self.timeContainer !== undefined &&
                        self.minuteElement !== undefined &&
                        self.hourElement !== undefined &&
                        self.input.value !== "" &&
                        self.input.value !== undefined) {
                        updateTime();
                    }
                    self.close();
                    if (self.config &&
                        self.config.mode === "range" &&
                        self.selectedDates.length === 1)
                        self.clear(false);
                }
            }
        }
        function changeYear(newYear) {
            if (!newYear ||
                (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
                (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
                return;
            var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
            self.currentYear = newYearNum || self.currentYear;
            if (self.config.maxDate &&
                self.currentYear === self.config.maxDate.getFullYear()) {
                self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
            }
            else if (self.config.minDate &&
                self.currentYear === self.config.minDate.getFullYear()) {
                self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
            }
            if (isNewYear) {
                self.redraw();
                triggerEvent("onYearChange");
                buildMonthSwitch();
            }
        }
        function isEnabled(date, timeless) {
            var _a;
            if (timeless === void 0) { timeless = true; }
            var dateToCheck = self.parseDate(date, undefined, timeless);
            if ((self.config.minDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
                (self.config.maxDate &&
                    dateToCheck &&
                    compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
                return false;
            if (!self.config.enable && self.config.disable.length === 0)
                return true;
            if (dateToCheck === undefined)
                return false;
            var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
            for (var i = 0, d = void 0; i < array.length; i++) {
                d = array[i];
                if (typeof d === "function" &&
                    d(dateToCheck))
                    return bool;
                else if (d instanceof Date &&
                    dateToCheck !== undefined &&
                    d.getTime() === dateToCheck.getTime())
                    return bool;
                else if (typeof d === "string") {
                    var parsed = self.parseDate(d, undefined, true);
                    return parsed && parsed.getTime() === dateToCheck.getTime()
                        ? bool
                        : !bool;
                }
                else if (typeof d === "object" &&
                    dateToCheck !== undefined &&
                    d.from &&
                    d.to &&
                    dateToCheck.getTime() >= d.from.getTime() &&
                    dateToCheck.getTime() <= d.to.getTime())
                    return bool;
            }
            return !bool;
        }
        function isInView(elem) {
            if (self.daysContainer !== undefined)
                return (elem.className.indexOf("hidden") === -1 &&
                    elem.className.indexOf("flatpickr-disabled") === -1 &&
                    self.daysContainer.contains(elem));
            return false;
        }
        function onBlur(e) {
            var isInput = e.target === self._input;
            if (isInput &&
                (self.selectedDates.length > 0 || self._input.value.length > 0) &&
                !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
            }
        }
        function onKeyDown(e) {
            var eventTarget = getEventTarget(e);
            var isInput = self.config.wrap
                ? element.contains(eventTarget)
                : eventTarget === self._input;
            var allowInput = self.config.allowInput;
            var allowKeydown = self.isOpen && (!allowInput || !isInput);
            var allowInlineKeydown = self.config.inline && isInput && !allowInput;
            if (e.keyCode === 13 && isInput) {
                if (allowInput) {
                    self.setDate(self._input.value, true, eventTarget === self.altInput
                        ? self.config.altFormat
                        : self.config.dateFormat);
                    self.close();
                    return eventTarget.blur();
                }
                else {
                    self.open();
                }
            }
            else if (isCalendarElem(eventTarget) ||
                allowKeydown ||
                allowInlineKeydown) {
                var isTimeObj = !!self.timeContainer &&
                    self.timeContainer.contains(eventTarget);
                switch (e.keyCode) {
                    case 13:
                        if (isTimeObj) {
                            e.preventDefault();
                            updateTime();
                            focusAndClose();
                        }
                        else
                            selectDate(e);
                        break;
                    case 27:
                        e.preventDefault();
                        focusAndClose();
                        break;
                    case 8:
                    case 46:
                        if (isInput && !self.config.allowInput) {
                            e.preventDefault();
                            self.clear();
                        }
                        break;
                    case 37:
                    case 39:
                        if (!isTimeObj && !isInput) {
                            e.preventDefault();
                            var activeElement = getClosestActiveElement();
                            if (self.daysContainer !== undefined &&
                                (allowInput === false ||
                                    (activeElement && isInView(activeElement)))) {
                                var delta_1 = e.keyCode === 39 ? 1 : -1;
                                if (!e.ctrlKey)
                                    focusOnDay(undefined, delta_1);
                                else {
                                    e.stopPropagation();
                                    changeMonth(delta_1);
                                    focusOnDay(getFirstAvailableDay(1), 0);
                                }
                            }
                        }
                        else if (self.hourElement)
                            self.hourElement.focus();
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var delta = e.keyCode === 40 ? 1 : -1;
                        if ((self.daysContainer &&
                            eventTarget.$i !== undefined) ||
                            eventTarget === self.input ||
                            eventTarget === self.altInput) {
                            if (e.ctrlKey) {
                                e.stopPropagation();
                                changeYear(self.currentYear - delta);
                                focusOnDay(getFirstAvailableDay(1), 0);
                            }
                            else if (!isTimeObj)
                                focusOnDay(undefined, delta * 7);
                        }
                        else if (eventTarget === self.currentYearElement) {
                            changeYear(self.currentYear - delta);
                        }
                        else if (self.config.enableTime) {
                            if (!isTimeObj && self.hourElement)
                                self.hourElement.focus();
                            updateTime(e);
                            self._debouncedChange();
                        }
                        break;
                    case 9:
                        if (isTimeObj) {
                            var elems = [
                                self.hourElement,
                                self.minuteElement,
                                self.secondElement,
                                self.amPM,
                            ]
                                .concat(self.pluginElements)
                                .filter(function (x) { return x; });
                            var i = elems.indexOf(eventTarget);
                            if (i !== -1) {
                                var target = elems[i + (e.shiftKey ? -1 : 1)];
                                e.preventDefault();
                                (target || self._input).focus();
                            }
                        }
                        else if (!self.config.noCalendar &&
                            self.daysContainer &&
                            self.daysContainer.contains(eventTarget) &&
                            e.shiftKey) {
                            e.preventDefault();
                            self._input.focus();
                        }
                        break;
                }
            }
            if (self.amPM !== undefined && eventTarget === self.amPM) {
                switch (e.key) {
                    case self.l10n.amPM[0].charAt(0):
                    case self.l10n.amPM[0].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                        break;
                    case self.l10n.amPM[1].charAt(0):
                    case self.l10n.amPM[1].charAt(0).toLowerCase():
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                        break;
                }
            }
            if (isInput || isCalendarElem(eventTarget)) {
                triggerEvent("onKeyDown", e);
            }
        }
        function onMouseOver(elem, cellClass) {
            if (cellClass === void 0) { cellClass = "flatpickr-day"; }
            if (self.selectedDates.length !== 1 ||
                (elem &&
                    (!elem.classList.contains(cellClass) ||
                        elem.classList.contains("flatpickr-disabled"))))
                return;
            var hoverDate = elem
                ? elem.dateObj.getTime()
                : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
            var containsDisabled = false;
            var minRange = 0, maxRange = 0;
            for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
                if (!isEnabled(new Date(t), true)) {
                    containsDisabled =
                        containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                    if (t < initialDate && (!minRange || t > minRange))
                        minRange = t;
                    else if (t > initialDate && (!maxRange || t < maxRange))
                        maxRange = t;
                }
            }
            var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
            hoverableCells.forEach(function (dayElem) {
                var date = dayElem.dateObj;
                var timestamp = date.getTime();
                var outOfRange = (minRange > 0 && timestamp < minRange) ||
                    (maxRange > 0 && timestamp > maxRange);
                if (outOfRange) {
                    dayElem.classList.add("notAllowed");
                    ["inRange", "startRange", "endRange"].forEach(function (c) {
                        dayElem.classList.remove(c);
                    });
                    return;
                }
                else if (containsDisabled && !outOfRange)
                    return;
                ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                if (elem !== undefined) {
                    elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                        ? "startRange"
                        : "endRange");
                    if (initialDate < hoverDate && timestamp === initialDate)
                        dayElem.classList.add("startRange");
                    else if (initialDate > hoverDate && timestamp === initialDate)
                        dayElem.classList.add("endRange");
                    if (timestamp >= minRange &&
                        (maxRange === 0 || timestamp <= maxRange) &&
                        isBetween(timestamp, initialDate, hoverDate))
                        dayElem.classList.add("inRange");
                }
            });
        }
        function onResize() {
            if (self.isOpen && !self.config.static && !self.config.inline)
                positionCalendar();
        }
        function open(e, positionElement) {
            if (positionElement === void 0) { positionElement = self._positionElement; }
            if (self.isMobile === true) {
                if (e) {
                    e.preventDefault();
                    var eventTarget = getEventTarget(e);
                    if (eventTarget) {
                        eventTarget.blur();
                    }
                }
                if (self.mobileInput !== undefined) {
                    self.mobileInput.focus();
                    self.mobileInput.click();
                }
                triggerEvent("onOpen");
                return;
            }
            else if (self._input.disabled || self.config.inline) {
                return;
            }
            var wasOpen = self.isOpen;
            self.isOpen = true;
            if (!wasOpen) {
                self.calendarContainer.classList.add("open");
                self._input.classList.add("active");
                triggerEvent("onOpen");
                positionCalendar(positionElement);
            }
            if (self.config.enableTime === true && self.config.noCalendar === true) {
                if (self.config.allowInput === false &&
                    (e === undefined ||
                        !self.timeContainer.contains(e.relatedTarget))) {
                    setTimeout(function () { return self.hourElement.select(); }, 50);
                }
            }
        }
        function minMaxDateSetter(type) {
            return function (date) {
                var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
                var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
                if (dateObj !== undefined) {
                    self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                        dateObj.getHours() > 0 ||
                            dateObj.getMinutes() > 0 ||
                            dateObj.getSeconds() > 0;
                }
                if (self.selectedDates) {
                    self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                    if (!self.selectedDates.length && type === "min")
                        setHoursFromDate(dateObj);
                    updateValue();
                }
                if (self.daysContainer) {
                    redraw();
                    if (dateObj !== undefined)
                        self.currentYearElement[type] = dateObj.getFullYear().toString();
                    else
                        self.currentYearElement.removeAttribute(type);
                    self.currentYearElement.disabled =
                        !!inverseDateObj &&
                            dateObj !== undefined &&
                            inverseDateObj.getFullYear() === dateObj.getFullYear();
                }
            };
        }
        function parseConfig() {
            var boolOpts = [
                "wrap",
                "weekNumbers",
                "allowInput",
                "allowInvalidPreload",
                "clickOpens",
                "time_24hr",
                "enableTime",
                "noCalendar",
                "altInput",
                "shorthandCurrentMonth",
                "inline",
                "static",
                "enableSeconds",
                "disableMobile",
            ];
            var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
            var formats = {};
            self.config.parseDate = userConfig.parseDate;
            self.config.formatDate = userConfig.formatDate;
            Object.defineProperty(self.config, "enable", {
                get: function () { return self.config._enable; },
                set: function (dates) {
                    self.config._enable = parseDateRules(dates);
                },
            });
            Object.defineProperty(self.config, "disable", {
                get: function () { return self.config._disable; },
                set: function (dates) {
                    self.config._disable = parseDateRules(dates);
                },
            });
            var timeMode = userConfig.mode === "time";
            if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
                var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
                formats.dateFormat =
                    userConfig.noCalendar || timeMode
                        ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                        : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            }
            if (userConfig.altInput &&
                (userConfig.enableTime || timeMode) &&
                !userConfig.altFormat) {
                var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
                formats.altFormat =
                    userConfig.noCalendar || timeMode
                        ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                        : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
            }
            Object.defineProperty(self.config, "minDate", {
                get: function () { return self.config._minDate; },
                set: minMaxDateSetter("min"),
            });
            Object.defineProperty(self.config, "maxDate", {
                get: function () { return self.config._maxDate; },
                set: minMaxDateSetter("max"),
            });
            var minMaxTimeSetter = function (type) { return function (val) {
                self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
            }; };
            Object.defineProperty(self.config, "minTime", {
                get: function () { return self.config._minTime; },
                set: minMaxTimeSetter("min"),
            });
            Object.defineProperty(self.config, "maxTime", {
                get: function () { return self.config._maxTime; },
                set: minMaxTimeSetter("max"),
            });
            if (userConfig.mode === "time") {
                self.config.noCalendar = true;
                self.config.enableTime = true;
            }
            Object.assign(self.config, formats, userConfig);
            for (var i = 0; i < boolOpts.length; i++)
                self.config[boolOpts[i]] =
                    self.config[boolOpts[i]] === true ||
                        self.config[boolOpts[i]] === "true";
            HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
                self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
            });
            self.isMobile =
                !self.config.disableMobile &&
                    !self.config.inline &&
                    self.config.mode === "single" &&
                    !self.config.disable.length &&
                    !self.config.enable &&
                    !self.config.weekNumbers &&
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            for (var i = 0; i < self.config.plugins.length; i++) {
                var pluginConf = self.config.plugins[i](self) || {};
                for (var key in pluginConf) {
                    if (HOOKS.indexOf(key) > -1) {
                        self.config[key] = arrayify(pluginConf[key])
                            .map(bindToInstance)
                            .concat(self.config[key]);
                    }
                    else if (typeof userConfig[key] === "undefined")
                        self.config[key] = pluginConf[key];
                }
            }
            if (!userConfig.altInputClass) {
                self.config.altInputClass =
                    getInputElem().className + " " + self.config.altInputClass;
            }
            triggerEvent("onParseConfig");
        }
        function getInputElem() {
            return self.config.wrap
                ? element.querySelector("[data-input]")
                : element;
        }
        function setupLocale() {
            if (typeof self.config.locale !== "object" &&
                typeof flatpickr.l10ns[self.config.locale] === "undefined")
                self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
            self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
                ? self.config.locale
                : self.config.locale !== "default"
                    ? flatpickr.l10ns[self.config.locale]
                    : undefined));
            tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
            tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
            tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
            tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
            tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
            var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
            if (userConfig.time_24hr === undefined &&
                flatpickr.defaultConfig.time_24hr === undefined) {
                self.config.time_24hr = self.l10n.time_24hr;
            }
            self.formatDate = createDateFormatter(self);
            self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
        }
        function positionCalendar(customPositionElement) {
            if (typeof self.config.position === "function") {
                return void self.config.position(self, customPositionElement);
            }
            if (self.calendarContainer === undefined)
                return;
            triggerEvent("onPreCalendarPosition");
            var positionElement = customPositionElement || self._positionElement;
            var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
                (configPosVertical !== "below" &&
                    distanceFromBottom < calendarHeight &&
                    inputBounds.top > calendarHeight);
            var top = window.pageYOffset +
                inputBounds.top +
                (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
            toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
            toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
            if (self.config.inline)
                return;
            var left = window.pageXOffset + inputBounds.left;
            var isCenter = false;
            var isRight = false;
            if (configPosHorizontal === "center") {
                left -= (calendarWidth - inputBounds.width) / 2;
                isCenter = true;
            }
            else if (configPosHorizontal === "right") {
                left -= calendarWidth - inputBounds.width;
                isRight = true;
            }
            toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
            toggleClass(self.calendarContainer, "arrowCenter", isCenter);
            toggleClass(self.calendarContainer, "arrowRight", isRight);
            var right = window.document.body.offsetWidth -
                (window.pageXOffset + inputBounds.right);
            var rightMost = left + calendarWidth > window.document.body.offsetWidth;
            var centerMost = right + calendarWidth > window.document.body.offsetWidth;
            toggleClass(self.calendarContainer, "rightMost", rightMost);
            if (self.config.static)
                return;
            self.calendarContainer.style.top = top + "px";
            if (!rightMost) {
                self.calendarContainer.style.left = left + "px";
                self.calendarContainer.style.right = "auto";
            }
            else if (!centerMost) {
                self.calendarContainer.style.left = "auto";
                self.calendarContainer.style.right = right + "px";
            }
            else {
                var doc = getDocumentStyleSheet();
                if (doc === undefined)
                    return;
                var bodyWidth = window.document.body.offsetWidth;
                var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
                var centerBefore = ".flatpickr-calendar.centerMost:before";
                var centerAfter = ".flatpickr-calendar.centerMost:after";
                var centerIndex = doc.cssRules.length;
                var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
                toggleClass(self.calendarContainer, "rightMost", false);
                toggleClass(self.calendarContainer, "centerMost", true);
                doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
                self.calendarContainer.style.left = centerLeft + "px";
                self.calendarContainer.style.right = "auto";
            }
        }
        function getDocumentStyleSheet() {
            var editableSheet = null;
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                if (!sheet.cssRules)
                    continue;
                try {
                    sheet.cssRules;
                }
                catch (err) {
                    continue;
                }
                editableSheet = sheet;
                break;
            }
            return editableSheet != null ? editableSheet : createStyleSheet();
        }
        function createStyleSheet() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        }
        function redraw() {
            if (self.config.noCalendar || self.isMobile)
                return;
            buildMonthSwitch();
            updateNavigationCurrentMonth();
            buildDays();
        }
        function focusAndClose() {
            self._input.focus();
            if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
                navigator.msMaxTouchPoints !== undefined) {
                setTimeout(self.close, 0);
            }
            else {
                self.close();
            }
        }
        function selectDate(e) {
            e.preventDefault();
            e.stopPropagation();
            var isSelectable = function (day) {
                return day.classList &&
                    day.classList.contains("flatpickr-day") &&
                    !day.classList.contains("flatpickr-disabled") &&
                    !day.classList.contains("notAllowed");
            };
            var t = findParent(getEventTarget(e), isSelectable);
            if (t === undefined)
                return;
            var target = t;
            var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
            var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
                selectedDate.getMonth() >
                    self.currentMonth + self.config.showMonths - 1) &&
                self.config.mode !== "range";
            self.selectedDateElem = target;
            if (self.config.mode === "single")
                self.selectedDates = [selectedDate];
            else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex)
                    self.selectedDates.splice(parseInt(selectedIndex), 1);
                else
                    self.selectedDates.push(selectedDate);
            }
            else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) {
                    self.clear(false, false);
                }
                self.latestSelectedDateObj = selectedDate;
                self.selectedDates.push(selectedDate);
                if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                    self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
            }
            setHoursFromInputs();
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
                if (isNewYear) {
                    triggerEvent("onYearChange");
                    buildMonthSwitch();
                }
                triggerEvent("onMonthChange");
            }
            updateNavigationCurrentMonth();
            buildDays();
            updateValue();
            if (!shouldChangeMonth &&
                self.config.mode !== "range" &&
                self.config.showMonths === 1)
                focusOnDayElem(target);
            else if (self.selectedDateElem !== undefined &&
                self.hourElement === undefined) {
                self.selectedDateElem && self.selectedDateElem.focus();
            }
            if (self.hourElement !== undefined)
                self.hourElement !== undefined && self.hourElement.focus();
            if (self.config.closeOnSelect) {
                var single = self.config.mode === "single" && !self.config.enableTime;
                var range = self.config.mode === "range" &&
                    self.selectedDates.length === 2 &&
                    !self.config.enableTime;
                if (single || range) {
                    focusAndClose();
                }
            }
            triggerChange();
        }
        var CALLBACKS = {
            locale: [setupLocale, updateWeekdays],
            showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
            minDate: [jumpToDate],
            maxDate: [jumpToDate],
            positionElement: [updatePositionElement],
            clickOpens: [
                function () {
                    if (self.config.clickOpens === true) {
                        bind(self._input, "focus", self.open);
                        bind(self._input, "click", self.open);
                    }
                    else {
                        self._input.removeEventListener("focus", self.open);
                        self._input.removeEventListener("click", self.open);
                    }
                },
            ],
        };
        function set(option, value) {
            if (option !== null && typeof option === "object") {
                Object.assign(self.config, option);
                for (var key in option) {
                    if (CALLBACKS[key] !== undefined)
                        CALLBACKS[key].forEach(function (x) { return x(); });
                }
            }
            else {
                self.config[option] = value;
                if (CALLBACKS[option] !== undefined)
                    CALLBACKS[option].forEach(function (x) { return x(); });
                else if (HOOKS.indexOf(option) > -1)
                    self.config[option] = arrayify(value);
            }
            self.redraw();
            updateValue(true);
        }
        function setSelectedDate(inputDate, format) {
            var dates = [];
            if (inputDate instanceof Array)
                dates = inputDate.map(function (d) { return self.parseDate(d, format); });
            else if (inputDate instanceof Date || typeof inputDate === "number")
                dates = [self.parseDate(inputDate, format)];
            else if (typeof inputDate === "string") {
                switch (self.config.mode) {
                    case "single":
                    case "time":
                        dates = [self.parseDate(inputDate, format)];
                        break;
                    case "multiple":
                        dates = inputDate
                            .split(self.config.conjunction)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                    case "range":
                        dates = inputDate
                            .split(self.l10n.rangeSeparator)
                            .map(function (date) { return self.parseDate(date, format); });
                        break;
                }
            }
            else
                self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
            self.selectedDates = (self.config.allowInvalidPreload
                ? dates
                : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
            if (self.config.mode === "range")
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        function setDate(date, triggerChange, format) {
            if (triggerChange === void 0) { triggerChange = false; }
            if (format === void 0) { format = self.config.dateFormat; }
            if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
                return self.clear(triggerChange);
            setSelectedDate(date, format);
            self.latestSelectedDateObj =
                self.selectedDates[self.selectedDates.length - 1];
            self.redraw();
            jumpToDate(undefined, triggerChange);
            setHoursFromDate();
            if (self.selectedDates.length === 0) {
                self.clear(false);
            }
            updateValue(triggerChange);
            if (triggerChange)
                triggerEvent("onChange");
        }
        function parseDateRules(arr) {
            return arr
                .slice()
                .map(function (rule) {
                if (typeof rule === "string" ||
                    typeof rule === "number" ||
                    rule instanceof Date) {
                    return self.parseDate(rule, undefined, true);
                }
                else if (rule &&
                    typeof rule === "object" &&
                    rule.from &&
                    rule.to)
                    return {
                        from: self.parseDate(rule.from, undefined),
                        to: self.parseDate(rule.to, undefined),
                    };
                return rule;
            })
                .filter(function (x) { return x; });
        }
        function setupDates() {
            self.selectedDates = [];
            self.now = self.parseDate(self.config.now) || new Date();
            var preloadedDate = self.config.defaultDate ||
                ((self.input.nodeName === "INPUT" ||
                    self.input.nodeName === "TEXTAREA") &&
                    self.input.placeholder &&
                    self.input.value === self.input.placeholder
                    ? null
                    : self.input.value);
            if (preloadedDate)
                setSelectedDate(preloadedDate, self.config.dateFormat);
            self._initialDate =
                self.selectedDates.length > 0
                    ? self.selectedDates[0]
                    : self.config.minDate &&
                        self.config.minDate.getTime() > self.now.getTime()
                        ? self.config.minDate
                        : self.config.maxDate &&
                            self.config.maxDate.getTime() < self.now.getTime()
                            ? self.config.maxDate
                            : self.now;
            self.currentYear = self._initialDate.getFullYear();
            self.currentMonth = self._initialDate.getMonth();
            if (self.selectedDates.length > 0)
                self.latestSelectedDateObj = self.selectedDates[0];
            if (self.config.minTime !== undefined)
                self.config.minTime = self.parseDate(self.config.minTime, "H:i");
            if (self.config.maxTime !== undefined)
                self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
            self.minDateHasTime =
                !!self.config.minDate &&
                    (self.config.minDate.getHours() > 0 ||
                        self.config.minDate.getMinutes() > 0 ||
                        self.config.minDate.getSeconds() > 0);
            self.maxDateHasTime =
                !!self.config.maxDate &&
                    (self.config.maxDate.getHours() > 0 ||
                        self.config.maxDate.getMinutes() > 0 ||
                        self.config.maxDate.getSeconds() > 0);
        }
        function setupInputs() {
            self.input = getInputElem();
            if (!self.input) {
                self.config.errorHandler(new Error("Invalid input element specified"));
                return;
            }
            self.input._type = self.input.type;
            self.input.type = "text";
            self.input.classList.add("flatpickr-input");
            self._input = self.input;
            if (self.config.altInput) {
                self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
                self._input = self.altInput;
                self.altInput.placeholder = self.input.placeholder;
                self.altInput.disabled = self.input.disabled;
                self.altInput.required = self.input.required;
                self.altInput.tabIndex = self.input.tabIndex;
                self.altInput.type = "text";
                self.input.setAttribute("type", "hidden");
                if (!self.config.static && self.input.parentNode)
                    self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
            }
            if (!self.config.allowInput)
                self._input.setAttribute("readonly", "readonly");
            updatePositionElement();
        }
        function updatePositionElement() {
            self._positionElement = self.config.positionElement || self._input;
        }
        function setupMobile() {
            var inputType = self.config.enableTime
                ? self.config.noCalendar
                    ? "time"
                    : "datetime-local"
                : "date";
            self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
            self.mobileInput.tabIndex = 1;
            self.mobileInput.type = inputType;
            self.mobileInput.disabled = self.input.disabled;
            self.mobileInput.required = self.input.required;
            self.mobileInput.placeholder = self.input.placeholder;
            self.mobileFormatStr =
                inputType === "datetime-local"
                    ? "Y-m-d\\TH:i:S"
                    : inputType === "date"
                        ? "Y-m-d"
                        : "H:i:S";
            if (self.selectedDates.length > 0) {
                self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
            }
            if (self.config.minDate)
                self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
            if (self.config.maxDate)
                self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
            if (self.input.getAttribute("step"))
                self.mobileInput.step = String(self.input.getAttribute("step"));
            self.input.type = "hidden";
            if (self.altInput !== undefined)
                self.altInput.type = "hidden";
            try {
                if (self.input.parentNode)
                    self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
            }
            catch (_a) { }
            bind(self.mobileInput, "change", function (e) {
                self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
                triggerEvent("onChange");
                triggerEvent("onClose");
            });
        }
        function toggle(e) {
            if (self.isOpen === true)
                return self.close();
            self.open(e);
        }
        function triggerEvent(event, data) {
            if (self.config === undefined)
                return;
            var hooks = self.config[event];
            if (hooks !== undefined && hooks.length > 0) {
                for (var i = 0; hooks[i] && i < hooks.length; i++)
                    hooks[i](self.selectedDates, self.input.value, self, data);
            }
            if (event === "onChange") {
                self.input.dispatchEvent(createEvent("change"));
                self.input.dispatchEvent(createEvent("input"));
            }
        }
        function createEvent(name) {
            var e = document.createEvent("Event");
            e.initEvent(name, true, true);
            return e;
        }
        function isDateSelected(date) {
            for (var i = 0; i < self.selectedDates.length; i++) {
                var selectedDate = self.selectedDates[i];
                if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0)
                    return "" + i;
            }
            return false;
        }
        function isDateInRange(date) {
            if (self.config.mode !== "range" || self.selectedDates.length < 2)
                return false;
            return (compareDates(date, self.selectedDates[0]) >= 0 &&
                compareDates(date, self.selectedDates[1]) <= 0);
        }
        function updateNavigationCurrentMonth() {
            if (self.config.noCalendar || self.isMobile || !self.monthNav)
                return;
            self.yearElements.forEach(function (yearElement, i) {
                var d = new Date(self.currentYear, self.currentMonth, 1);
                d.setMonth(self.currentMonth + i);
                if (self.config.showMonths > 1 ||
                    self.config.monthSelectorType === "static") {
                    self.monthElements[i].textContent =
                        monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
                }
                else {
                    self.monthsDropdownContainer.value = d.getMonth().toString();
                }
                yearElement.value = d.getFullYear().toString();
            });
            self._hidePrevMonthArrow =
                self.config.minDate !== undefined &&
                    (self.currentYear === self.config.minDate.getFullYear()
                        ? self.currentMonth <= self.config.minDate.getMonth()
                        : self.currentYear < self.config.minDate.getFullYear());
            self._hideNextMonthArrow =
                self.config.maxDate !== undefined &&
                    (self.currentYear === self.config.maxDate.getFullYear()
                        ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                        : self.currentYear > self.config.maxDate.getFullYear());
        }
        function getDateStr(format) {
            return self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, format); })
                .filter(function (d, i, arr) {
                return self.config.mode !== "range" ||
                    self.config.enableTime ||
                    arr.indexOf(d) === i;
            })
                .join(self.config.mode !== "range"
                ? self.config.conjunction
                : self.l10n.rangeSeparator);
        }
        function updateValue(triggerChange) {
            if (triggerChange === void 0) { triggerChange = true; }
            if (self.mobileInput !== undefined && self.mobileFormatStr) {
                self.mobileInput.value =
                    self.latestSelectedDateObj !== undefined
                        ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                        : "";
            }
            self.input.value = getDateStr(self.config.dateFormat);
            if (self.altInput !== undefined) {
                self.altInput.value = getDateStr(self.config.altFormat);
            }
            if (triggerChange !== false)
                triggerEvent("onValueUpdate");
        }
        function onMonthNavClick(e) {
            var eventTarget = getEventTarget(e);
            var isPrevMonth = self.prevMonthNav.contains(eventTarget);
            var isNextMonth = self.nextMonthNav.contains(eventTarget);
            if (isPrevMonth || isNextMonth) {
                changeMonth(isPrevMonth ? -1 : 1);
            }
            else if (self.yearElements.indexOf(eventTarget) >= 0) {
                eventTarget.select();
            }
            else if (eventTarget.classList.contains("arrowUp")) {
                self.changeYear(self.currentYear + 1);
            }
            else if (eventTarget.classList.contains("arrowDown")) {
                self.changeYear(self.currentYear - 1);
            }
        }
        function timeWrapper(e) {
            e.preventDefault();
            var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
            if (self.amPM !== undefined && eventTarget === self.amPM) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
                (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
            var newValue = curValue + step * delta;
            if (typeof input.value !== "undefined" && input.value.length === 2) {
                var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
                if (newValue < min) {
                    newValue =
                        max +
                            newValue +
                            int(!isHourElem) +
                            (int(isHourElem) && int(!self.amPM));
                    if (isMinuteElem)
                        incrementNumInput(undefined, -1, self.hourElement);
                }
                else if (newValue > max) {
                    newValue =
                        input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                    if (isMinuteElem)
                        incrementNumInput(undefined, 1, self.hourElement);
                }
                if (self.amPM &&
                    isHourElem &&
                    (step === 1
                        ? newValue + curValue === 23
                        : Math.abs(newValue - curValue) > step)) {
                    self.amPM.textContent =
                        self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
                }
                input.value = pad(newValue);
            }
        }
        init();
        return self;
    }
    function _flatpickr(nodeList, config) {
        var nodes = Array.prototype.slice
            .call(nodeList)
            .filter(function (x) { return x instanceof HTMLElement; });
        var instances = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            try {
                if (node.getAttribute("data-fp-omit") !== null)
                    continue;
                if (node._flatpickr !== undefined) {
                    node._flatpickr.destroy();
                    node._flatpickr = undefined;
                }
                node._flatpickr = FlatpickrInstance(node, config || {});
                instances.push(node._flatpickr);
            }
            catch (e) {
                console.error(e);
            }
        }
        return instances.length === 1 ? instances[0] : instances;
    }
    if (typeof HTMLElement !== "undefined" &&
        typeof HTMLCollection !== "undefined" &&
        typeof NodeList !== "undefined") {
        HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
        HTMLElement.prototype.flatpickr = function (config) {
            return _flatpickr([this], config);
        };
    }
    var flatpickr = function (selector, config) {
        if (typeof selector === "string") {
            return _flatpickr(window.document.querySelectorAll(selector), config);
        }
        else if (selector instanceof Node) {
            return _flatpickr([selector], config);
        }
        else {
            return _flatpickr(selector, config);
        }
    };
    flatpickr.defaultConfig = {};
    flatpickr.l10ns = {
        en: __assign({}, english),
        default: __assign({}, english),
    };
    flatpickr.localize = function (l10n) {
        flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
    };
    flatpickr.setDefaults = function (config) {
        flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
    };
    flatpickr.parseDate = createDateParser({});
    flatpickr.formatDate = createDateFormatter({});
    flatpickr.compareDates = compareDates;
    if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
        jQuery.fn.flatpickr = function (config) {
            return _flatpickr(this, config);
        };
    }
    Date.prototype.fp_incr = function (days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
    };
    if (typeof window !== "undefined") {
        window.flatpickr = flatpickr;
    }

    /* src/components/Flatpickr.svelte generated by Svelte v3.46.4 */
    const file$7 = "src/components/Flatpickr.svelte";

    // (1:6)      
    function fallback_block(ctx) {
    	let input_1;
    	let input_1_levels = [/*$$restProps*/ ctx[1]];
    	let input_1_data = {};

    	for (let i = 0; i < input_1_levels.length; i += 1) {
    		input_1_data = assign(input_1_data, input_1_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input_1 = element("input");
    			set_attributes(input_1, input_1_data);
    			add_location(input_1, file$7, 1, 4, 11);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input_1, anchor);
    			if (input_1.autofocus) input_1.focus();
    			/*input_1_binding*/ ctx[10](input_1);
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1]]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input_1);
    			/*input_1_binding*/ ctx[10](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(1:6)      ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*$$restProps, input*/ 3)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function stripOn(hook) {
    	return hook.charAt(2).toLowerCase() + hook.substring(3);
    }

    function instance$8($$self, $$props, $$invalidate) {
    	const omit_props_names = ["value","formattedValue","element","dateFormat","options","input","flatpickr"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Flatpickr', slots, ['default']);

    	const hooks = new Set([
    			'onChange',
    			'onOpen',
    			'onClose',
    			'onMonthChange',
    			'onYearChange',
    			'onReady',
    			'onValueUpdate',
    			'onDayCreate'
    		]);

    	let { value = '', formattedValue = '', element = null, dateFormat = null } = $$props;
    	let { options = {} } = $$props;
    	let { input = undefined, flatpickr: fp = undefined } = $$props;

    	onMount(() => {
    		const elem = element || input;
    		$$invalidate(3, fp = flatpickr(elem, Object.assign(addHooks(options), element ? { wrap: true } : {})));

    		return () => {
    			fp.destroy();
    		};
    	});

    	const dispatch = createEventDispatcher();

    	function addHooks(opts = {}) {
    		opts = Object.assign({}, opts);

    		for (const hook of hooks) {
    			const firer = (selectedDates, dateStr, instance) => {
    				dispatch(stripOn(hook), [selectedDates, dateStr, instance]);
    			};

    			if (hook in opts) {
    				// Hooks must be arrays
    				if (!Array.isArray(opts[hook])) opts[hook] = [opts[hook]];

    				opts[hook].push(firer);
    			} else {
    				opts[hook] = [firer];
    			}
    		}

    		if (opts.onChange && !opts.onChange.includes(updateValue)) opts.onChange.push(updateValue);
    		return opts;
    	}

    	function updateValue(newValue, dateStr) {
    		$$invalidate(2, value = Array.isArray(newValue) && newValue.length === 1
    		? newValue[0]
    		: newValue);

    		$$invalidate(4, formattedValue = dateStr);
    	}

    	function input_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			input = $$value;
    			$$invalidate(0, input);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('value' in $$new_props) $$invalidate(2, value = $$new_props.value);
    		if ('formattedValue' in $$new_props) $$invalidate(4, formattedValue = $$new_props.formattedValue);
    		if ('element' in $$new_props) $$invalidate(5, element = $$new_props.element);
    		if ('dateFormat' in $$new_props) $$invalidate(6, dateFormat = $$new_props.dateFormat);
    		if ('options' in $$new_props) $$invalidate(7, options = $$new_props.options);
    		if ('input' in $$new_props) $$invalidate(0, input = $$new_props.input);
    		if ('flatpickr' in $$new_props) $$invalidate(3, fp = $$new_props.flatpickr);
    		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		flatpickr,
    		hooks,
    		value,
    		formattedValue,
    		element,
    		dateFormat,
    		options,
    		input,
    		fp,
    		dispatch,
    		addHooks,
    		updateValue,
    		stripOn
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('value' in $$props) $$invalidate(2, value = $$new_props.value);
    		if ('formattedValue' in $$props) $$invalidate(4, formattedValue = $$new_props.formattedValue);
    		if ('element' in $$props) $$invalidate(5, element = $$new_props.element);
    		if ('dateFormat' in $$props) $$invalidate(6, dateFormat = $$new_props.dateFormat);
    		if ('options' in $$props) $$invalidate(7, options = $$new_props.options);
    		if ('input' in $$props) $$invalidate(0, input = $$new_props.input);
    		if ('fp' in $$props) $$invalidate(3, fp = $$new_props.fp);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*fp, value, dateFormat*/ 76) {
    			 if (fp) {
    				fp.setDate(value, false, dateFormat);
    			}
    		}

    		if ($$self.$$.dirty & /*fp, options*/ 136) {
    			 if (fp) {
    				for (const [key, val] of Object.entries(addHooks(options))) {
    					fp.set(key, val);
    				}
    			}
    		}
    	};

    	return [
    		input,
    		$$restProps,
    		value,
    		fp,
    		formattedValue,
    		element,
    		dateFormat,
    		options,
    		$$scope,
    		slots,
    		input_1_binding
    	];
    }

    class Flatpickr extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			value: 2,
    			formattedValue: 4,
    			element: 5,
    			dateFormat: 6,
    			options: 7,
    			input: 0,
    			flatpickr: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Flatpickr",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get value() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get formattedValue() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set formattedValue(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get element() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set element(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dateFormat() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dateFormat(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get input() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set input(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get flatpickr() {
    		throw new Error("<Flatpickr>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set flatpickr(value) {
    		throw new Error("<Flatpickr>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/timepicker.svelte generated by Svelte v3.46.4 */
    const file$8 = "src/components/timepicker.svelte";

    function create_fragment$9(ctx) {
    	let link;
    	let t0;
    	let div;
    	let t1;
    	let flatpickr;
    	let updating_value;
    	let current;

    	function flatpickr_value_binding(value) {
    		/*flatpickr_value_binding*/ ctx[3](value);
    	}

    	let flatpickr_props = {
    		options: /*flatpickrOptions*/ ctx[2],
    		disabled: /*disabled*/ ctx[1],
    		style: "width:150px; font-size: 15px;"
    	};

    	if (/*date*/ ctx[0] !== void 0) {
    		flatpickr_props.value = /*date*/ ctx[0];
    	}

    	flatpickr = new Flatpickr({ props: flatpickr_props, $$inline: true });
    	binding_callbacks.push(() => bind(flatpickr, 'value', flatpickr_value_binding));

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			div = element("div");
    			t1 = text("Next Auto Recycle Time\n    ");
    			create_component(flatpickr.$$.fragment);
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css");
    			add_location(link, file$8, 13, 0, 320);
    			add_location(div, file$8, 14, 0, 413);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, link, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, t1);
    			mount_component(flatpickr, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const flatpickr_changes = {};
    			if (dirty & /*disabled*/ 2) flatpickr_changes.disabled = /*disabled*/ ctx[1];

    			if (!updating_value && dirty & /*date*/ 1) {
    				updating_value = true;
    				flatpickr_changes.value = /*date*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			flatpickr.$set(flatpickr_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flatpickr.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flatpickr.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(flatpickr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Timepicker', slots, []);
    	let { date = new Date() } = $$props;
    	let { disabled = false } = $$props;

    	const flatpickrOptions = {
    		enableTime: true,
    		minDate: "today",
    		onChange: (selectedDates, dateStr, instance) => {
    			
    		}
    	};

    	const writable_props = ['date', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Timepicker> was created with unknown prop '${key}'`);
    	});

    	function flatpickr_value_binding(value) {
    		date = value;
    		$$invalidate(0, date);
    	}

    	$$self.$$set = $$props => {
    		if ('date' in $$props) $$invalidate(0, date = $$props.date);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		Flatpickr,
    		date,
    		disabled,
    		flatpickrOptions
    	});

    	$$self.$inject_state = $$props => {
    		if ('date' in $$props) $$invalidate(0, date = $$props.date);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [date, disabled, flatpickrOptions, flatpickr_value_binding];
    }

    class Timepicker extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { date: 0, disabled: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timepicker",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get date() {
    		throw new Error("<Timepicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set date(value) {
    		throw new Error("<Timepicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Timepicker>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Timepicker>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/temperature_table.svelte generated by Svelte v3.46.4 */

    const file$9 = "src/components/temperature_table.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (36:4) {#each table_array as row}
    function create_each_block$1(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*row*/ ctx[3].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let td1;
    	let t3;
    	let t4_value = /*row*/ ctx[3].value + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = text("  ");
    			t2 = space();
    			td1 = element("td");
    			t3 = text("  ");
    			t4 = text(t4_value);
    			t5 = space();
    			attr_dev(td0, "class", "svelte-1ctjo1t");
    			add_location(td0, file$9, 37, 6, 791);
    			attr_dev(td1, "class", "svelte-1ctjo1t");
    			add_location(td1, file$9, 38, 6, 828);
    			add_location(tr, file$9, 36, 4, 780);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(td0, t1);
    			append_dev(tr, t2);
    			append_dev(tr, td1);
    			append_dev(td1, t3);
    			append_dev(td1, t4);
    			append_dev(tr, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*table_array*/ 2 && t0_value !== (t0_value = /*row*/ ctx[3].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*table_array*/ 2 && t4_value !== (t4_value = /*row*/ ctx[3].value + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(36:4) {#each table_array as row}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let h4;
    	let t0;
    	let t1;
    	let table;
    	let tbody;
    	let each_value = /*table_array*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			table = element("table");
    			tbody = element("tbody");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h4, file$9, 30, 0, 706);
    			add_location(tbody, file$9, 34, 2, 737);
    			add_location(table, file$9, 33, 0, 727);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, table, anchor);
    			append_dev(table, tbody);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (dirty & /*table_array*/ 2) {
    				each_value = /*table_array*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Temperature_table', slots, []);
    	let { title = 'temperature table' } = $$props;

    	let { table_data = {
    		'1k': 4.978491,
    		'4k': 3.070931,
    		pump: 6.659844,
    		switch: 17.41950,
    		hp: 0.000000,
    		hs: 4.000000,
    		relays: 0
    	} } = $$props;

    	let table_array;
    	const writable_props = ['title', 'table_data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Temperature_table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('table_data' in $$props) $$invalidate(2, table_data = $$props.table_data);
    	};

    	$$self.$capture_state = () => ({ title, table_data, table_array });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('table_data' in $$props) $$invalidate(2, table_data = $$props.table_data);
    		if ('table_array' in $$props) $$invalidate(1, table_array = $$props.table_array);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*table_data, table_array*/ 6) {
    			 {
    				// console.log('table_data', table_data, Object.keys(table_data))
    				$$invalidate(1, table_array = []);

    				for (let key in table_data) {
    					let value = Number(table_data[key]);
    					value = Number.isInteger(value) ? value : value.toPrecision(4);
    					table_array.push({ name: key, value });
    				} // console.log('key', key);
    			} // console.log('table_array', table_array);
    		}
    	};

    	return [title, table_array, table_data];
    }

    class Temperature_table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { title: 0, table_data: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Temperature_table",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get title() {
    		throw new Error("<Temperature_table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Temperature_table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get table_data() {
    		throw new Error("<Temperature_table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set table_data(value) {
    		throw new Error("<Temperature_table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    let table_data_default = {
        '1k': -1,
        '4k':   3.070931,
        '40k': -1,
        'pump': 6.659844,
        'switch':   17.41950,
        'hp':   0.000000,
        'hs':   4.000000,
        'relays':   0,
    };
    let controls_default = [
            { value: false, text: 'Pump on' },
            { value: false, text: 'Switch on' },
            { value: false, text: 'Compressor' },
            //{ value: false, test: 'Enable heaters'}
        ];

    let states_default = [
            {id: 1, text: 'manual'},
            {id: 2, text: 'unknown'},
            {id: 3, text: 'warming to 300K'},
            {id: 4, text: 'cooling to 4K'},
            {id: 5, text: 'Warm pump'},
            {id: 6, text: 'Keep pump hot'},
            {id: 7, text: 'Cool pump'},
        ];

    /**
    * Copyright (c) 2022, Leon Sorokin
    * All rights reserved. (MIT Licensed)
    *
    * uPlot.js (μPlot)
    * A small, fast chart for time series, lines, areas, ohlc & bars
    * https://github.com/leeoniya/uPlot (v1.6.19)
    */

    const FEAT_TIME          = true;

    // binary search for index of closest value
    function closestIdx(num, arr, lo, hi) {
    	let mid;
    	lo = lo || 0;
    	hi = hi || arr.length - 1;
    	let bitwise = hi <= 2147483647;

    	while (hi - lo > 1) {
    		mid = bitwise ? (lo + hi) >> 1 : floor((lo + hi) / 2);

    		if (arr[mid] < num)
    			lo = mid;
    		else
    			hi = mid;
    	}

    	if (num - arr[lo] <= arr[hi] - num)
    		return lo;

    	return hi;
    }

    function nonNullIdx(data, _i0, _i1, dir) {
    	for (let i = dir == 1 ? _i0 : _i1; i >= _i0 && i <= _i1; i += dir) {
    		if (data[i] != null)
    			return i;
    	}

    	return -1;
    }

    function getMinMax(data, _i0, _i1, sorted) {
    //	console.log("getMinMax()");

    	let _min = inf;
    	let _max = -inf;

    	if (sorted == 1) {
    		_min = data[_i0];
    		_max = data[_i1];
    	}
    	else if (sorted == -1) {
    		_min = data[_i1];
    		_max = data[_i0];
    	}
    	else {
    		for (let i = _i0; i <= _i1; i++) {
    			if (data[i] != null) {
    				_min = min(_min, data[i]);
    				_max = max(_max, data[i]);
    			}
    		}
    	}

    	return [_min, _max];
    }

    function getMinMaxLog(data, _i0, _i1) {
    //	console.log("getMinMax()");

    	let _min = inf;
    	let _max = -inf;

    	for (let i = _i0; i <= _i1; i++) {
    		if (data[i] > 0) {
    			_min = min(_min, data[i]);
    			_max = max(_max, data[i]);
    		}
    	}

    	return [
    		_min ==  inf ?  1 : _min,
    		_max == -inf ? 10 : _max,
    	];
    }

    const _fixedTuple = [0, 0];

    function fixIncr(minIncr, maxIncr, minExp, maxExp) {
    	_fixedTuple[0] = minExp < 0 ? roundDec(minIncr, -minExp) : minIncr;
    	_fixedTuple[1] = maxExp < 0 ? roundDec(maxIncr, -maxExp) : maxIncr;
    	return _fixedTuple;
    }

    function rangeLog(min, max, base, fullMags) {
    	let minSign = sign(min);

    	let logFn = base == 10 ? log10 : log2;

    	if (min == max) {
    		if (minSign == -1) {
    			min *= base;
    			max /= base;
    		}
    		else {
    			min /= base;
    			max *= base;
    		}
    	}

    	let minExp, maxExp, minMaxIncrs;

    	if (fullMags) {
    		minExp = floor(logFn(min));
    		maxExp =  ceil(logFn(max));

    		minMaxIncrs = fixIncr(pow(base, minExp), pow(base, maxExp), minExp, maxExp);

    		min = minMaxIncrs[0];
    		max = minMaxIncrs[1];
    	}
    	else {
    		minExp = floor(logFn(abs(min)));
    		maxExp = floor(logFn(abs(max)));

    		minMaxIncrs = fixIncr(pow(base, minExp), pow(base, maxExp), minExp, maxExp);

    		min = incrRoundDn(min, minMaxIncrs[0]);
    		max = incrRoundUp(max, minMaxIncrs[1]);
    	}

    	return [min, max];
    }

    function rangeAsinh(min, max, base, fullMags) {
    	let minMax = rangeLog(min, max, base, fullMags);

    	if (min == 0)
    		minMax[0] = 0;

    	if (max == 0)
    		minMax[1] = 0;

    	return minMax;
    }

    const rangePad = 0.1;

    const autoRangePart = {
    	mode: 3,
    	pad: rangePad,
    };

    const _eqRangePart = {
    	pad:  0,
    	soft: null,
    	mode: 0,
    };

    const _eqRange = {
    	min: _eqRangePart,
    	max: _eqRangePart,
    };

    // this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
    // TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
    function rangeNum(_min, _max, mult, extra) {
    	if (isObj(mult))
    		return _rangeNum(_min, _max, mult);

    	_eqRangePart.pad  = mult;
    	_eqRangePart.soft = extra ? 0 : null;
    	_eqRangePart.mode = extra ? 3 : 0;

    	return _rangeNum(_min, _max, _eqRange);
    }

    // nullish coalesce
    function ifNull(lh, rh) {
    	return lh == null ? rh : lh;
    }

    // checks if given index range in an array contains a non-null value
    // aka a range-bounded Array.some()
    function hasData(data, idx0, idx1) {
    	idx0 = ifNull(idx0, 0);
    	idx1 = ifNull(idx1, data.length - 1);

    	while (idx0 <= idx1) {
    		if (data[idx0] != null)
    			return true;
    		idx0++;
    	}

    	return false;
    }

    function _rangeNum(_min, _max, cfg) {
    	let cmin = cfg.min;
    	let cmax = cfg.max;

    	let padMin = ifNull(cmin.pad, 0);
    	let padMax = ifNull(cmax.pad, 0);

    	let hardMin = ifNull(cmin.hard, -inf);
    	let hardMax = ifNull(cmax.hard,  inf);

    	let softMin = ifNull(cmin.soft,  inf);
    	let softMax = ifNull(cmax.soft, -inf);

    	let softMinMode = ifNull(cmin.mode, 0);
    	let softMaxMode = ifNull(cmax.mode, 0);

    	let delta        = _max - _min;

    	// this handles situations like 89.7, 89.69999999999999
    	// by assuming 0.001x deltas are precision errors
    //	if (delta > 0 && delta < abs(_max) / 1e3)
    //		delta = 0;

    	// treat data as flat if delta is less than 1 billionth
    	if (delta < 1e-9) {
    		delta = 0;

    		// if soft mode is 2 and all vals are flat at 0, avoid the 0.1 * 1e3 fallback
    		// this prevents 0,0,0 from ranging to -100,100 when softMin/softMax are -1,1
    		if (_min == 0 || _max == 0) {
    			delta = 1e-9;

    			if (softMinMode == 2 && softMin != inf)
    				padMin = 0;

    			if (softMaxMode == 2 && softMax != -inf)
    				padMax = 0;
    		}
    	}

    	let nonZeroDelta = delta || abs(_max) || 1e3;
    	let mag          = log10(nonZeroDelta);
    	let base         = pow(10, floor(mag));

    	let _padMin  = nonZeroDelta * (delta == 0 ? (_min == 0 ? .1 : 1) : padMin);
    	let _newMin  = roundDec(incrRoundDn(_min - _padMin, base/10), 9);
    	let _softMin = _min >= softMin && (softMinMode == 1 || softMinMode == 3 && _newMin <= softMin || softMinMode == 2 && _newMin >= softMin) ? softMin : inf;
    	let minLim   = max(hardMin, _newMin < _softMin && _min >= _softMin ? _softMin : min(_softMin, _newMin));

    	let _padMax  = nonZeroDelta * (delta == 0 ? (_max == 0 ? .1 : 1) : padMax);
    	let _newMax  = roundDec(incrRoundUp(_max + _padMax, base/10), 9);
    	let _softMax = _max <= softMax && (softMaxMode == 1 || softMaxMode == 3 && _newMax >= softMax || softMaxMode == 2 && _newMax <= softMax) ? softMax : -inf;
    	let maxLim   = min(hardMax, _newMax > _softMax && _max <= _softMax ? _softMax : max(_softMax, _newMax));

    	if (minLim == maxLim && minLim == 0)
    		maxLim = 100;

    	return [minLim, maxLim];
    }

    // alternative: https://stackoverflow.com/a/2254896
    const fmtNum = new Intl.NumberFormat(navigator.language).format;

    const M = Math;

    const PI = M.PI;
    const abs = M.abs;
    const floor = M.floor;
    const round = M.round;
    const ceil = M.ceil;
    const min = M.min;
    const max = M.max;
    const pow = M.pow;
    const sign = M.sign;
    const log10 = M.log10;
    const log2 = M.log2;
    // TODO: seems like this needs to match asinh impl if the passed v is tweaked?
    const sinh =  (v, linthresh = 1) => M.sinh(v) * linthresh;
    const asinh = (v, linthresh = 1) => M.asinh(v / linthresh);

    const inf = Infinity;

    function numIntDigits(x) {
    	return (log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
    }

    function incrRound(num, incr) {
    	return round(num/incr)*incr;
    }

    function clamp(num, _min, _max) {
    	return min(max(num, _min), _max);
    }

    function fnOrSelf(v) {
    	return typeof v == "function" ? v : () => v;
    }

    const retArg0 = _0 => _0;

    const retArg1 = (_0, _1) => _1;

    const retNull = _ => null;

    const retTrue = _ => true;

    const retEq = (a, b) => a == b;

    function incrRoundUp(num, incr) {
    	return ceil(num/incr)*incr;
    }

    function incrRoundDn(num, incr) {
    	return floor(num/incr)*incr;
    }

    function roundDec(val, dec) {
    	return round(val * (dec = 10**dec)) / dec;
    }

    const fixedDec = new Map();

    function guessDec(num) {
    	return ((""+num).split(".")[1] || "").length;
    }

    function genIncrs(base, minExp, maxExp, mults) {
    	let incrs = [];

    	let multDec = mults.map(guessDec);

    	for (let exp = minExp; exp < maxExp; exp++) {
    		let expa = abs(exp);
    		let mag = roundDec(pow(base, exp), expa);

    		for (let i = 0; i < mults.length; i++) {
    			let _incr = mults[i] * mag;
    			let dec = (_incr >= 0 && exp >= 0 ? 0 : expa) + (exp >= multDec[i] ? 0 : multDec[i]);
    			let incr = roundDec(_incr, dec);
    			incrs.push(incr);
    			fixedDec.set(incr, dec);
    		}
    	}

    	return incrs;
    }

    //export const assign = Object.assign;

    const EMPTY_OBJ = {};
    const EMPTY_ARR = [];

    const nullNullTuple = [null, null];

    const isArr = Array.isArray;

    function isStr(v) {
    	return typeof v == 'string';
    }

    function isObj(v) {
    	let is = false;

    	if (v != null) {
    		let c = v.constructor;
    		is = c == null || c == Object;
    	}

    	return is;
    }

    function fastIsObj(v) {
    	return v != null && typeof v == 'object';
    }

    function copy(o, _isObj = isObj) {
    	let out;

    	if (isArr(o)) {
    		let val = o.find(v => v != null);

    		if (isArr(val) || _isObj(val)) {
    			out = Array(o.length);
    			for (let i = 0; i < o.length; i++)
    			  out[i] = copy(o[i], _isObj);
    		}
    		else
    			out = o.slice();
    	}
    	else if (_isObj(o)) {
    		out = {};
    		for (let k in o)
    			out[k] = copy(o[k], _isObj);
    	}
    	else
    		out = o;

    	return out;
    }

    function assign$1(targ) {
    	let args = arguments;

    	for (let i = 1; i < args.length; i++) {
    		let src = args[i];

    		for (let key in src) {
    			if (isObj(targ[key]))
    				assign$1(targ[key], copy(src[key]));
    			else
    				targ[key] = copy(src[key]);
    		}
    	}

    	return targ;
    }

    // nullModes
    const NULL_REMOVE = 0;  // nulls are converted to undefined (e.g. for spanGaps: true)
    const NULL_RETAIN = 1;  // nulls are retained, with alignment artifacts set to undefined (default)
    const NULL_EXPAND = 2;  // nulls are expanded to include any adjacent alignment artifacts

    // sets undefined values to nulls when adjacent to existing nulls (minesweeper)
    function nullExpand(yVals, nullIdxs, alignedLen) {
    	for (let i = 0, xi, lastNullIdx = -1; i < nullIdxs.length; i++) {
    		let nullIdx = nullIdxs[i];

    		if (nullIdx > lastNullIdx) {
    			xi = nullIdx - 1;
    			while (xi >= 0 && yVals[xi] == null)
    				yVals[xi--] = null;

    			xi = nullIdx + 1;
    			while (xi < alignedLen && yVals[xi] == null)
    				yVals[lastNullIdx = xi++] = null;
    		}
    	}
    }

    // nullModes is a tables-matched array indicating how to treat nulls in each series
    // output is sorted ASC on the joined field (table[0]) and duplicate join values are collapsed
    function join(tables, nullModes) {
    	let xVals = new Set();

    	for (let ti = 0; ti < tables.length; ti++) {
    		let t = tables[ti];
    		let xs = t[0];
    		let len = xs.length;

    		for (let i = 0; i < len; i++)
    			xVals.add(xs[i]);
    	}

    	let data = [Array.from(xVals).sort((a, b) => a - b)];

    	let alignedLen = data[0].length;

    	let xIdxs = new Map();

    	for (let i = 0; i < alignedLen; i++)
    		xIdxs.set(data[0][i], i);

    	for (let ti = 0; ti < tables.length; ti++) {
    		let t = tables[ti];
    		let xs = t[0];

    		for (let si = 1; si < t.length; si++) {
    			let ys = t[si];

    			let yVals = Array(alignedLen).fill(undefined);

    			let nullMode = nullModes ? nullModes[ti][si] : NULL_RETAIN;

    			let nullIdxs = [];

    			for (let i = 0; i < ys.length; i++) {
    				let yVal = ys[i];
    				let alignedIdx = xIdxs.get(xs[i]);

    				if (yVal === null) {
    					if (nullMode != NULL_REMOVE) {
    						yVals[alignedIdx] = yVal;

    						if (nullMode == NULL_EXPAND)
    							nullIdxs.push(alignedIdx);
    					}
    				}
    				else
    					yVals[alignedIdx] = yVal;
    			}

    			nullExpand(yVals, nullIdxs, alignedLen);

    			data.push(yVals);
    		}
    	}

    	return data;
    }

    const microTask = typeof queueMicrotask == "undefined" ? fn => Promise.resolve().then(fn) : queueMicrotask;

    const WIDTH       = "width";
    const HEIGHT      = "height";
    const TOP         = "top";
    const BOTTOM      = "bottom";
    const LEFT        = "left";
    const RIGHT       = "right";
    const hexBlack    = "#000";
    const transparent = hexBlack + "0";

    const mousemove   = "mousemove";
    const mousedown   = "mousedown";
    const mouseup     = "mouseup";
    const mouseenter  = "mouseenter";
    const mouseleave  = "mouseleave";
    const dblclick    = "dblclick";
    const resize      = "resize";
    const scroll      = "scroll";

    const change      = "change";
    const dppxchange  = "dppxchange";

    const pre = "u-";

    const UPLOT          =       "uplot";
    const ORI_HZ         = pre + "hz";
    const ORI_VT         = pre + "vt";
    const TITLE          = pre + "title";
    const WRAP           = pre + "wrap";
    const UNDER          = pre + "under";
    const OVER           = pre + "over";
    const AXIS           = pre + "axis";
    const OFF            = pre + "off";
    const SELECT         = pre + "select";
    const CURSOR_X       = pre + "cursor-x";
    const CURSOR_Y       = pre + "cursor-y";
    const CURSOR_PT      = pre + "cursor-pt";
    const LEGEND         = pre + "legend";
    const LEGEND_LIVE    = pre + "live";
    const LEGEND_INLINE  = pre + "inline";
    const LEGEND_THEAD   = pre + "thead";
    const LEGEND_SERIES  = pre + "series";
    const LEGEND_MARKER  = pre + "marker";
    const LEGEND_LABEL   = pre + "label";
    const LEGEND_VALUE   = pre + "value";

    const doc = document;
    const win = window;
    let pxRatio;

    let query;

    function setPxRatio() {
    	let _pxRatio = devicePixelRatio;

    	// during print preview, Chrome fires off these dppx queries even without changes
    	if (pxRatio != _pxRatio) {
    		pxRatio = _pxRatio;

    		query && off(change, query, setPxRatio);
    		query = matchMedia(`(min-resolution: ${pxRatio - 0.001}dppx) and (max-resolution: ${pxRatio + 0.001}dppx)`);
    		on(change, query, setPxRatio);

    		win.dispatchEvent(new CustomEvent(dppxchange));
    	}
    }

    function addClass(el, c) {
    	if (c != null) {
    		let cl = el.classList;
    		!cl.contains(c) && cl.add(c);
    	}
    }

    function remClass(el, c) {
    	let cl = el.classList;
    	cl.contains(c) && cl.remove(c);
    }

    function setStylePx(el, name, value) {
    	el.style[name] = value + "px";
    }

    function placeTag(tag, cls, targ, refEl) {
    	let el = doc.createElement(tag);

    	if (cls != null)
    		addClass(el, cls);

    	if (targ != null)
    		targ.insertBefore(el, refEl);

    	return el;
    }

    function placeDiv(cls, targ) {
    	return placeTag("div", cls, targ);
    }

    const xformCache = new WeakMap();

    function elTrans(el, xPos, yPos, xMax, yMax) {
    	let xform = "translate(" + xPos + "px," + yPos + "px)";
    	let xformOld = xformCache.get(el);

    	if (xform != xformOld) {
    		el.style.transform = xform;
    		xformCache.set(el, xform);

    		if (xPos < 0 || yPos < 0 || xPos > xMax || yPos > yMax)
    			addClass(el, OFF);
    		else
    			remClass(el, OFF);
    	}
    }

    const colorCache = new WeakMap();

    function elColor(el, background, borderColor) {
    	let newColor = background + borderColor;
    	let oldColor = colorCache.get(el);

    	if (newColor != oldColor) {
    		colorCache.set(el, newColor);
    		el.style.background = background;
    		el.style.borderColor = borderColor;
    	}
    }

    const sizeCache = new WeakMap();

    function elSize(el, newWid, newHgt, centered) {
    	let newSize = newWid + "" + newHgt;
    	let oldSize = sizeCache.get(el);

    	if (newSize != oldSize) {
    		sizeCache.set(el, newSize);
    		el.style.height = newHgt + "px";
    		el.style.width = newWid + "px";
    		el.style.marginLeft = centered ? -newWid/2 + "px" : 0;
    		el.style.marginTop = centered ? -newHgt/2 + "px" : 0;
    	}
    }

    const evOpts = {passive: true};
    const evOpts2 = assign$1({capture: true}, evOpts);

    function on(ev, el, cb, capt) {
    	el.addEventListener(ev, cb, capt ? evOpts2 : evOpts);
    }

    function off(ev, el, cb, capt) {
    	el.removeEventListener(ev, cb, capt ? evOpts2 : evOpts);
    }

    setPxRatio();

    const months = [
    	"January",
    	"February",
    	"March",
    	"April",
    	"May",
    	"June",
    	"July",
    	"August",
    	"September",
    	"October",
    	"November",
    	"December",
    ];

    const days = [
    	"Sunday",
    	"Monday",
    	"Tuesday",
    	"Wednesday",
    	"Thursday",
    	"Friday",
    	"Saturday",
    ];

    function slice3(str) {
    	return str.slice(0, 3);
    }

    const days3 = days.map(slice3);

    const months3 = months.map(slice3);

    const engNames = {
    	MMMM: months,
    	MMM:  months3,
    	WWWW: days,
    	WWW:  days3,
    };

    function zeroPad2(int) {
    	return (int < 10 ? '0' : '') + int;
    }

    function zeroPad3(int) {
    	return (int < 10 ? '00' : int < 100 ? '0' : '') + int;
    }

    /*
    function suffix(int) {
    	let mod10 = int % 10;

    	return int + (
    		mod10 == 1 && int != 11 ? "st" :
    		mod10 == 2 && int != 12 ? "nd" :
    		mod10 == 3 && int != 13 ? "rd" : "th"
    	);
    }
    */

    const subs = {
    	// 2019
    	YYYY:	d => d.getFullYear(),
    	// 19
    	YY:		d => (d.getFullYear()+'').slice(2),
    	// July
    	MMMM:	(d, names) => names.MMMM[d.getMonth()],
    	// Jul
    	MMM:	(d, names) => names.MMM[d.getMonth()],
    	// 07
    	MM:		d => zeroPad2(d.getMonth()+1),
    	// 7
    	M:		d => d.getMonth()+1,
    	// 09
    	DD:		d => zeroPad2(d.getDate()),
    	// 9
    	D:		d => d.getDate(),
    	// Monday
    	WWWW:	(d, names) => names.WWWW[d.getDay()],
    	// Mon
    	WWW:	(d, names) => names.WWW[d.getDay()],
    	// 03
    	HH:		d => zeroPad2(d.getHours()),
    	// 3
    	H:		d => d.getHours(),
    	// 9 (12hr, unpadded)
    	h:		d => {let h = d.getHours(); return h == 0 ? 12 : h > 12 ? h - 12 : h;},
    	// AM
    	AA:		d => d.getHours() >= 12 ? 'PM' : 'AM',
    	// am
    	aa:		d => d.getHours() >= 12 ? 'pm' : 'am',
    	// a
    	a:		d => d.getHours() >= 12 ? 'p' : 'a',
    	// 09
    	mm:		d => zeroPad2(d.getMinutes()),
    	// 9
    	m:		d => d.getMinutes(),
    	// 09
    	ss:		d => zeroPad2(d.getSeconds()),
    	// 9
    	s:		d => d.getSeconds(),
    	// 374
    	fff:	d => zeroPad3(d.getMilliseconds()),
    };

    function fmtDate(tpl, names) {
    	names = names || engNames;
    	let parts = [];

    	let R = /\{([a-z]+)\}|[^{]+/gi, m;

    	while (m = R.exec(tpl))
    		parts.push(m[0][0] == '{' ? subs[m[1]] : m[0]);

    	return d => {
    		let out = '';

    		for (let i = 0; i < parts.length; i++)
    			out += typeof parts[i] == "string" ? parts[i] : parts[i](d, names);

    		return out;
    	}
    }

    const localTz = new Intl.DateTimeFormat().resolvedOptions().timeZone;

    // https://stackoverflow.com/questions/15141762/how-to-initialize-a-javascript-date-to-a-particular-time-zone/53652131#53652131
    function tzDate(date, tz) {
    	let date2;

    	// perf optimization
    	if (tz == 'UTC' || tz == 'Etc/UTC')
    		date2 = new Date(+date + date.getTimezoneOffset() * 6e4);
    	else if (tz == localTz)
    		date2 = date;
    	else {
    		date2 = new Date(date.toLocaleString('en-US', {timeZone: tz}));
    		date2.setMilliseconds(date.getMilliseconds());
    	}

    	return date2;
    }

    //export const series = [];

    // default formatters:

    const onlyWhole = v => v % 1 == 0;

    const allMults = [1,2,2.5,5];

    // ...0.01, 0.02, 0.025, 0.05, 0.1, 0.2, 0.25, 0.5
    const decIncrs = genIncrs(10, -16, 0, allMults);

    // 1, 2, 2.5, 5, 10, 20, 25, 50...
    const oneIncrs = genIncrs(10, 0, 16, allMults);

    // 1, 2,      5, 10, 20, 25, 50...
    const wholeIncrs = oneIncrs.filter(onlyWhole);

    const numIncrs = decIncrs.concat(oneIncrs);

    const NL = "\n";

    const yyyy    = "{YYYY}";
    const NLyyyy  = NL + yyyy;
    const md      = "{M}/{D}";
    const NLmd    = NL + md;
    const NLmdyy  = NLmd + "/{YY}";

    const aa      = "{aa}";
    const hmm     = "{h}:{mm}";
    const hmmaa   = hmm + aa;
    const NLhmmaa = NL + hmmaa;
    const ss      = ":{ss}";

    const _ = null;

    function genTimeStuffs(ms) {
    	let	s  = ms * 1e3,
    		m  = s  * 60,
    		h  = m  * 60,
    		d  = h  * 24,
    		mo = d  * 30,
    		y  = d  * 365;

    	// min of 1e-3 prevents setting a temporal x ticks too small since Date objects cannot advance ticks smaller than 1ms
    	let subSecIncrs = ms == 1 ? genIncrs(10, 0, 3, allMults).filter(onlyWhole) : genIncrs(10, -3, 0, allMults);

    	let timeIncrs = subSecIncrs.concat([
    		// minute divisors (# of secs)
    		s,
    		s * 5,
    		s * 10,
    		s * 15,
    		s * 30,
    		// hour divisors (# of mins)
    		m,
    		m * 5,
    		m * 10,
    		m * 15,
    		m * 30,
    		// day divisors (# of hrs)
    		h,
    		h * 2,
    		h * 3,
    		h * 4,
    		h * 6,
    		h * 8,
    		h * 12,
    		// month divisors TODO: need more?
    		d,
    		d * 2,
    		d * 3,
    		d * 4,
    		d * 5,
    		d * 6,
    		d * 7,
    		d * 8,
    		d * 9,
    		d * 10,
    		d * 15,
    		// year divisors (# months, approx)
    		mo,
    		mo * 2,
    		mo * 3,
    		mo * 4,
    		mo * 6,
    		// century divisors
    		y,
    		y * 2,
    		y * 5,
    		y * 10,
    		y * 25,
    		y * 50,
    		y * 100,
    	]);

    	// [0]:   minimum num secs in the tick incr
    	// [1]:   default tick format
    	// [2-7]: rollover tick formats
    	// [8]:   mode: 0: replace [1] -> [2-7], 1: concat [1] + [2-7]
    	const _timeAxisStamps = [
    	//   tick incr    default          year                    month   day                   hour    min       sec   mode
    		[y,           yyyy,            _,                      _,      _,                    _,      _,        _,       1],
    		[d * 28,      "{MMM}",         NLyyyy,                 _,      _,                    _,      _,        _,       1],
    		[d,           md,              NLyyyy,                 _,      _,                    _,      _,        _,       1],
    		[h,           "{h}" + aa,      NLmdyy,                 _,      NLmd,                 _,      _,        _,       1],
    		[m,           hmmaa,           NLmdyy,                 _,      NLmd,                 _,      _,        _,       1],
    		[s,           ss,              NLmdyy + " " + hmmaa,   _,      NLmd + " " + hmmaa,   _,      NLhmmaa,  _,       1],
    		[ms,          ss + ".{fff}",   NLmdyy + " " + hmmaa,   _,      NLmd + " " + hmmaa,   _,      NLhmmaa,  _,       1],
    	];

    	// the ensures that axis ticks, values & grid are aligned to logical temporal breakpoints and not an arbitrary timestamp
    	// https://www.timeanddate.com/time/dst/
    	// https://www.timeanddate.com/time/dst/2019.html
    	// https://www.epochconverter.com/timezones
    	function timeAxisSplits(tzDate) {
    		return (self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace) => {
    			let splits = [];
    			let isYr = foundIncr >= y;
    			let isMo = foundIncr >= mo && foundIncr < y;

    			// get the timezone-adjusted date
    			let minDate = tzDate(scaleMin);
    			let minDateTs = roundDec(minDate * ms, 3);

    			// get ts of 12am (this lands us at or before the original scaleMin)
    			let minMin = mkDate(minDate.getFullYear(), isYr ? 0 : minDate.getMonth(), isMo || isYr ? 1 : minDate.getDate());
    			let minMinTs = roundDec(minMin * ms, 3);

    			if (isMo || isYr) {
    				let moIncr = isMo ? foundIncr / mo : 0;
    				let yrIncr = isYr ? foundIncr / y  : 0;
    			//	let tzOffset = scaleMin - minDateTs;		// needed?
    				let split = minDateTs == minMinTs ? minDateTs : roundDec(mkDate(minMin.getFullYear() + yrIncr, minMin.getMonth() + moIncr, 1) * ms, 3);
    				let splitDate = new Date(round(split / ms));
    				let baseYear = splitDate.getFullYear();
    				let baseMonth = splitDate.getMonth();

    				for (let i = 0; split <= scaleMax; i++) {
    					let next = mkDate(baseYear + yrIncr * i, baseMonth + moIncr * i, 1);
    					let offs = next - tzDate(roundDec(next * ms, 3));

    					split = roundDec((+next + offs) * ms, 3);

    					if (split <= scaleMax)
    						splits.push(split);
    				}
    			}
    			else {
    				let incr0 = foundIncr >= d ? d : foundIncr;
    				let tzOffset = floor(scaleMin) - floor(minDateTs);
    				let split = minMinTs + tzOffset + incrRoundUp(minDateTs - minMinTs, incr0);
    				splits.push(split);

    				let date0 = tzDate(split);

    				let prevHour = date0.getHours() + (date0.getMinutes() / m) + (date0.getSeconds() / h);
    				let incrHours = foundIncr / h;

    				let minSpace = self.axes[axisIdx]._space;
    				let pctSpace = foundSpace / minSpace;

    				while (1) {
    					split = roundDec(split + foundIncr, ms == 1 ? 0 : 3);

    					if (split > scaleMax)
    						break;

    					if (incrHours > 1) {
    						let expectedHour = floor(roundDec(prevHour + incrHours, 6)) % 24;
    						let splitDate = tzDate(split);
    						let actualHour = splitDate.getHours();

    						let dstShift = actualHour - expectedHour;

    						if (dstShift > 1)
    							dstShift = -1;

    						split -= dstShift * h;

    						prevHour = (prevHour + incrHours) % 24;

    						// add a tick only if it's further than 70% of the min allowed label spacing
    						let prevSplit = splits[splits.length - 1];
    						let pctIncr = roundDec((split - prevSplit) / foundIncr, 3);

    						if (pctIncr * pctSpace >= .7)
    							splits.push(split);
    					}
    					else
    						splits.push(split);
    				}
    			}

    			return splits;
    		}
    	}

    	return [
    		timeIncrs,
    		_timeAxisStamps,
    		timeAxisSplits,
    	];
    }

    const [ timeIncrsMs, _timeAxisStampsMs, timeAxisSplitsMs ] = genTimeStuffs(1);
    const [ timeIncrsS,  _timeAxisStampsS,  timeAxisSplitsS  ] = genTimeStuffs(1e-3);

    // base 2
    genIncrs(2, -53, 53, [1]);

    /*
    console.log({
    	decIncrs,
    	oneIncrs,
    	wholeIncrs,
    	numIncrs,
    	timeIncrs,
    	fixedDec,
    });
    */

    function timeAxisStamps(stampCfg, fmtDate) {
    	return stampCfg.map(s => s.map((v, i) =>
    		i == 0 || i == 8 || v == null ? v : fmtDate(i == 1 || s[8] == 0 ? v : s[1] + v)
    	));
    }

    // TODO: will need to accept spaces[] and pull incr into the loop when grid will be non-uniform, eg for log scales.
    // currently we ignore this for months since they're *nearly* uniform and the added complexity is not worth it
    function timeAxisVals(tzDate, stamps) {
    	return (self, splits, axisIdx, foundSpace, foundIncr) => {
    		let s = stamps.find(s => foundIncr >= s[0]) || stamps[stamps.length - 1];

    		// these track boundaries when a full label is needed again
    		let prevYear;
    		let prevMnth;
    		let prevDate;
    		let prevHour;
    		let prevMins;
    		let prevSecs;

    		return splits.map(split => {
    			let date = tzDate(split);

    			let newYear = date.getFullYear();
    			let newMnth = date.getMonth();
    			let newDate = date.getDate();
    			let newHour = date.getHours();
    			let newMins = date.getMinutes();
    			let newSecs = date.getSeconds();

    			let stamp = (
    				newYear != prevYear && s[2] ||
    				newMnth != prevMnth && s[3] ||
    				newDate != prevDate && s[4] ||
    				newHour != prevHour && s[5] ||
    				newMins != prevMins && s[6] ||
    				newSecs != prevSecs && s[7] ||
    				                       s[1]
    			);

    			prevYear = newYear;
    			prevMnth = newMnth;
    			prevDate = newDate;
    			prevHour = newHour;
    			prevMins = newMins;
    			prevSecs = newSecs;

    			return stamp(date);
    		});
    	}
    }

    // for when axis.values is defined as a static fmtDate template string
    function timeAxisVal(tzDate, dateTpl) {
    	let stamp = fmtDate(dateTpl);
    	return (self, splits, axisIdx, foundSpace, foundIncr) => splits.map(split => stamp(tzDate(split)));
    }

    function mkDate(y, m, d) {
    	return new Date(y, m, d);
    }

    function timeSeriesStamp(stampCfg, fmtDate) {
    	return fmtDate(stampCfg);
    }
    const _timeSeriesStamp = '{YYYY}-{MM}-{DD} {h}:{mm}{aa}';

    function timeSeriesVal(tzDate, stamp) {
    	return (self, val) => stamp(tzDate(val));
    }

    function legendStroke(self, seriesIdx) {
    	let s = self.series[seriesIdx];
    	return s.width ? s.stroke(self, seriesIdx) : s.points.width ? s.points.stroke(self, seriesIdx) : null;
    }

    function legendFill(self, seriesIdx) {
    	return self.series[seriesIdx].fill(self, seriesIdx);
    }

    const legendOpts = {
    	show: true,
    	live: true,
    	isolate: false,
    	markers: {
    		show: true,
    		width: 2,
    		stroke: legendStroke,
    		fill: legendFill,
    		dash: "solid",
    	},
    	idx: null,
    	idxs: null,
    	values: [],
    };

    function cursorPointShow(self, si) {
    	let o = self.cursor.points;

    	let pt = placeDiv();

    	let size = o.size(self, si);
    	setStylePx(pt, WIDTH, size);
    	setStylePx(pt, HEIGHT, size);

    	let mar = size / -2;
    	setStylePx(pt, "marginLeft", mar);
    	setStylePx(pt, "marginTop", mar);

    	let width = o.width(self, si, size);
    	width && setStylePx(pt, "borderWidth", width);

    	return pt;
    }

    function cursorPointFill(self, si) {
    	let sp = self.series[si].points;
    	return sp._fill || sp._stroke;
    }

    function cursorPointStroke(self, si) {
    	let sp = self.series[si].points;
    	return sp._stroke || sp._fill;
    }

    function cursorPointSize(self, si) {
    	let sp = self.series[si].points;
    	return ptDia(sp.width, 1);
    }

    function dataIdx(self, seriesIdx, cursorIdx) {
    	return cursorIdx;
    }

    const moveTuple = [0,0];

    function cursorMove(self, mouseLeft1, mouseTop1) {
    	moveTuple[0] = mouseLeft1;
    	moveTuple[1] = mouseTop1;
    	return moveTuple;
    }

    function filtBtn0(self, targ, handle) {
    	return e => {
    		e.button == 0 && handle(e);
    	};
    }

    function passThru(self, targ, handle) {
    	return handle;
    }

    const cursorOpts = {
    	show: true,
    	x: true,
    	y: true,
    	lock: false,
    	move: cursorMove,
    	points: {
    		show:   cursorPointShow,
    		size:   cursorPointSize,
    		width:  0,
    		stroke: cursorPointStroke,
    		fill:   cursorPointFill,
    	},

    	bind: {
    		mousedown:   filtBtn0,
    		mouseup:     filtBtn0,
    		click:       filtBtn0,
    		dblclick:    filtBtn0,

    		mousemove:   passThru,
    		mouseleave:  passThru,
    		mouseenter:  passThru,
    	},

    	drag: {
    		setScale: true,
    		x: true,
    		y: false,
    		dist: 0,
    		uni: null,
    		_x: false,
    		_y: false,
    	},

    	focus: {
    		prox: -1,
    	},

    	left: -10,
    	top: -10,
    	idx: null,
    	dataIdx,
    	idxs: null,
    };

    const axisLines = {
    	show: true,
    	stroke: "rgba(0,0,0,0.07)",
    	width: 2,
    //	dash: [],
    };

    const grid = assign$1({}, axisLines, {
    	filter: retArg1,
    });

    const ticks = assign$1({}, grid, {
    	size: 10,
    });

    const border = assign$1({}, axisLines, {
    	show: false,
    });

    const font      = '12px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
    const labelFont = "bold " + font;
    const lineMult = 1.5;		// font-size multiplier

    const xAxisOpts = {
    	show: true,
    	scale: "x",
    	stroke: hexBlack,
    	space: 50,
    	gap: 5,
    	size: 50,
    	labelGap: 0,
    	labelSize: 30,
    	labelFont,
    	side: 2,
    //	class: "x-vals",
    //	incrs: timeIncrs,
    //	values: timeVals,
    //	filter: retArg1,
    	grid,
    	ticks,
    	border,
    	font,
    	rotate: 0,
    };

    const numSeriesLabel = "Value";
    const timeSeriesLabel = "Time";

    const xSeriesOpts = {
    	show: true,
    	scale: "x",
    	auto: false,
    	sorted: 1,
    //	label: "Time",
    //	value: v => stamp(new Date(v * 1e3)),

    	// internal caches
    	min: inf,
    	max: -inf,
    	idxs: [],
    };

    function numAxisVals(self, splits, axisIdx, foundSpace, foundIncr) {
    	return splits.map(v => v == null ? "" : fmtNum(v));
    }

    function numAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
    	let splits = [];

    	let numDec = fixedDec.get(foundIncr) || 0;

    	scaleMin = forceMin ? scaleMin : roundDec(incrRoundUp(scaleMin, foundIncr), numDec);

    	for (let val = scaleMin; val <= scaleMax; val = roundDec(val + foundIncr, numDec))
    		splits.push(Object.is(val, -0) ? 0 : val);		// coalesces -0

    	return splits;
    }

    // this doesnt work for sin, which needs to come off from 0 independently in pos and neg dirs
    function logAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
    	const splits = [];

    	const logBase = self.scales[self.axes[axisIdx].scale].log;

    	const logFn = logBase == 10 ? log10 : log2;

    	const exp = floor(logFn(scaleMin));

    	foundIncr = pow(logBase, exp);

    	if (exp < 0)
    		foundIncr = roundDec(foundIncr, -exp);

    	let split = scaleMin;

    	do {
    		splits.push(split);
    		split = roundDec(split + foundIncr, fixedDec.get(foundIncr));

    		if (split >= foundIncr * logBase)
    			foundIncr = split;

    	} while (split <= scaleMax);

    	return splits;
    }

    function asinhAxisSplits(self, axisIdx, scaleMin, scaleMax, foundIncr, foundSpace, forceMin) {
    	let sc = self.scales[self.axes[axisIdx].scale];

    	let linthresh = sc.asinh;

    	let posSplits = scaleMax > linthresh ? logAxisSplits(self, axisIdx, max(linthresh, scaleMin), scaleMax, foundIncr) : [linthresh];
    	let zero = scaleMax >= 0 && scaleMin <= 0 ? [0] : [];
    	let negSplits = scaleMin < -linthresh ? logAxisSplits(self, axisIdx, max(linthresh, -scaleMax), -scaleMin, foundIncr): [linthresh];

    	return negSplits.reverse().map(v => -v).concat(zero, posSplits);
    }

    const RE_ALL   = /./;
    const RE_12357 = /[12357]/;
    const RE_125   = /[125]/;
    const RE_1     = /1/;

    function logAxisValsFilt(self, splits, axisIdx, foundSpace, foundIncr) {
    	let axis = self.axes[axisIdx];
    	let scaleKey = axis.scale;
    	let sc = self.scales[scaleKey];

    	if (sc.distr == 3 && sc.log == 2)
    		return splits;

    	let valToPos = self.valToPos;

    	let minSpace = axis._space;

    	let _10 = valToPos(10, scaleKey);

    	let re = (
    		valToPos(9, scaleKey) - _10 >= minSpace ? RE_ALL :
    		valToPos(7, scaleKey) - _10 >= minSpace ? RE_12357 :
    		valToPos(5, scaleKey) - _10 >= minSpace ? RE_125 :
    		RE_1
    	);

    	return splits.map(v => ((sc.distr == 4 && v == 0) || re.test(v)) ? v : null);
    }

    function numSeriesVal(self, val) {
    	return val == null ? "" : fmtNum(val);
    }

    const yAxisOpts = {
    	show: true,
    	scale: "y",
    	stroke: hexBlack,
    	space: 30,
    	gap: 5,
    	size: 50,
    	labelGap: 0,
    	labelSize: 30,
    	labelFont,
    	side: 3,
    //	class: "y-vals",
    //	incrs: numIncrs,
    //	values: (vals, space) => vals,
    //	filter: retArg1,
    	grid,
    	ticks,
    	border,
    	font,
    	rotate: 0,
    };

    // takes stroke width
    function ptDia(width, mult) {
    	let dia = 3 + (width || 1) * 2;
    	return roundDec(dia * mult, 3);
    }

    function seriesPointsShow(self, si) {
    	let { scale, idxs } = self.series[0];
    	let xData = self._data[0];
    	let p0 = self.valToPos(xData[idxs[0]], scale, true);
    	let p1 = self.valToPos(xData[idxs[1]], scale, true);
    	let dim = abs(p1 - p0);

    	let s = self.series[si];
    //	const dia = ptDia(s.width, pxRatio);
    	let maxPts = dim / (s.points.space * pxRatio);
    	return idxs[1] - idxs[0] <= maxPts;
    }

    const facet = {
    	scale: null,
    	auto: true,
    	sorted: 0,

    	// internal caches
    	min: inf,
    	max: -inf,
    };

    const xySeriesOpts = {
    	show: true,
    	auto: true,
    	sorted: 0,
    	alpha: 1,
    	facets: [
    		assign$1({}, facet, {scale: 'x'}),
    		assign$1({}, facet, {scale: 'y'}),
    	],
    };

    const ySeriesOpts = {
    	scale: "y",
    	auto: true,
    	sorted: 0,
    	show: true,
    	spanGaps: false,
    	gaps: (self, seriesIdx, idx0, idx1, nullGaps) => nullGaps,
    	alpha: 1,
    	points: {
    		show: seriesPointsShow,
    		filter: null,
    	//  paths:
    	//	stroke: "#000",
    	//	fill: "#fff",
    	//	width: 1,
    	//	size: 10,
    	},
    //	label: "Value",
    //	value: v => v,
    	values: null,

    	// internal caches
    	min: inf,
    	max: -inf,
    	idxs: [],

    	path: null,
    	clip: null,
    };

    function clampScale(self, val, scaleMin, scaleMax, scaleKey) {
    /*
    	if (val < 0) {
    		let cssHgt = self.bbox.height / pxRatio;
    		let absPos = self.valToPos(abs(val), scaleKey);
    		let fromBtm = cssHgt - absPos;
    		return self.posToVal(cssHgt + fromBtm, scaleKey);
    	}
    */
    	return scaleMin / 10;
    }

    const xScaleOpts = {
    	time: FEAT_TIME,
    	auto: true,
    	distr: 1,
    	log: 10,
    	asinh: 1,
    	min: null,
    	max: null,
    	dir: 1,
    	ori: 0,
    };

    const yScaleOpts = assign$1({}, xScaleOpts, {
    	time: false,
    	ori: 1,
    });

    const syncs = {};

    function _sync(key, opts) {
    	let s = syncs[key];

    	if (!s) {
    		s = {
    			key,
    			plots: [],
    			sub(plot) {
    				s.plots.push(plot);
    			},
    			unsub(plot) {
    				s.plots = s.plots.filter(c => c != plot);
    			},
    			pub(type, self, x, y, w, h, i) {
    				for (let j = 0; j < s.plots.length; j++)
    					s.plots[j] != self && s.plots[j].pub(type, self, x, y, w, h, i);
    			},
    		};

    		if (key != null)
    			syncs[key] = s;
    	}

    	return s;
    }

    const BAND_CLIP_FILL   = 1 << 0;
    const BAND_CLIP_STROKE = 1 << 1;

    function orient(u, seriesIdx, cb) {
    	const series = u.series[seriesIdx];
    	const scales = u.scales;
    	const bbox   = u.bbox;
    	const scaleX = u.mode == 2 ? scales[series.facets[0].scale] : scales[u.series[0].scale];

    	let dx = u._data[0],
    		dy = u._data[seriesIdx],
    		sx = scaleX,
    		sy = u.mode == 2 ? scales[series.facets[1].scale] : scales[series.scale],
    		l = bbox.left,
    		t = bbox.top,
    		w = bbox.width,
    		h = bbox.height,
    		H = u.valToPosH,
    		V = u.valToPosV;

    	return (sx.ori == 0
    		? cb(
    			series,
    			dx,
    			dy,
    			sx,
    			sy,
    			H,
    			V,
    			l,
    			t,
    			w,
    			h,
    			moveToH,
    			lineToH,
    			rectH,
    			arcH,
    			bezierCurveToH,
    		)
    		: cb(
    			series,
    			dx,
    			dy,
    			sx,
    			sy,
    			V,
    			H,
    			t,
    			l,
    			h,
    			w,
    			moveToV,
    			lineToV,
    			rectV,
    			arcV,
    			bezierCurveToV,
    		)
    	);
    }

    function bandFillClipDirs(self, seriesIdx) {
    	let fillDir = 0;

    	// 2 bits, -1 | 1
    	let clipDirs = 0;

    	let bands = ifNull(self.bands, EMPTY_ARR);

    	for (let i = 0; i < bands.length; i++) {
    		let b = bands[i];

    		// is a "from" band edge
    		if (b.series[0] == seriesIdx)
    			fillDir = b.dir;
    		// is a "to" band edge
    		else if (b.series[1] == seriesIdx) {
    			if (b.dir == 1)
    				clipDirs |= 1;
    			else
    				clipDirs |= 2;
    		}
    	}

    	return [
    		fillDir,
    		(
    			clipDirs == 1 ? -1 : // neg only
    			clipDirs == 2 ?  1 : // pos only
    			clipDirs == 3 ?  2 : // both
    			                 0   // neither
    		)
    	];
    }

    function seriesFillTo(self, seriesIdx, dataMin, dataMax, bandFillDir) {
    	let scale = self.scales[self.series[seriesIdx].scale];

    	return (
    		bandFillDir == -1 ? scale.min :
    		bandFillDir ==  1 ? scale.max :
    		scale.distr ==  3 ? (
    			scale.dir == 1 ? scale.min :
    			scale.max
    		) : 0
    	);
    }

    // creates inverted band clip path (from stroke path -> yMax || yMin)
    // clipDir is always inverse of fillDir
    // default clip dir is upwards (1), since default band fill is downwards/fillBelowTo (-1) (highIdx -> lowIdx)
    function clipBandLine(self, seriesIdx, idx0, idx1, strokePath, clipDir) {
    	return orient(self, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
    		let pxRound = series.pxRound;

    		const dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);
    		const lineTo = scaleX.ori == 0 ? lineToH : lineToV;

    		let frIdx, toIdx;

    		if (dir == 1) {
    			frIdx = idx0;
    			toIdx = idx1;
    		}
    		else {
    			frIdx = idx1;
    			toIdx = idx0;
    		}

    		// path start
    		let x0 = pxRound(valToPosX(dataX[frIdx], scaleX, xDim, xOff));
    		let y0 = pxRound(valToPosY(dataY[frIdx], scaleY, yDim, yOff));
    		// path end x
    		let x1 = pxRound(valToPosX(dataX[toIdx], scaleX, xDim, xOff));
    		// upper or lower y limit
    		let yLimit = pxRound(valToPosY(clipDir == 1 ? scaleY.max : scaleY.min, scaleY, yDim, yOff));

    		let clip = new Path2D(strokePath);

    		lineTo(clip, x1, yLimit);
    		lineTo(clip, x0, yLimit);
    		lineTo(clip, x0, y0);

    		return clip;
    	});
    }

    function clipGaps(gaps, ori, plotLft, plotTop, plotWid, plotHgt) {
    	let clip = null;

    	// create clip path (invert gaps and non-gaps)
    	if (gaps.length > 0) {
    		clip = new Path2D();

    		const rect = ori == 0 ? rectH : rectV;

    		let prevGapEnd = plotLft;

    		for (let i = 0; i < gaps.length; i++) {
    			let g = gaps[i];

    			if (g[1] > g[0]) {
    				let w = g[0] - prevGapEnd;

    				w > 0 && rect(clip, prevGapEnd, plotTop, w, plotTop + plotHgt);

    				prevGapEnd = g[1];
    			}
    		}

    		let w = plotLft + plotWid - prevGapEnd;

    		w > 0 && rect(clip, prevGapEnd, plotTop, w, plotTop + plotHgt);
    	}

    	return clip;
    }

    function addGap(gaps, fromX, toX) {
    	let prevGap = gaps[gaps.length - 1];

    	if (prevGap && prevGap[0] == fromX)			// TODO: gaps must be encoded at stroke widths?
    		prevGap[1] = toX;
    	else
    		gaps.push([fromX, toX]);
    }

    function pxRoundGen(pxAlign) {
    	return pxAlign == 0 ? retArg0 : pxAlign == 1 ? round : v => incrRound(v, pxAlign);
    }

    function rect(ori) {
    	let moveTo = ori == 0 ?
    		moveToH :
    		moveToV;

    	let arcTo = ori == 0 ?
    		(p, x1, y1, x2, y2, r) => { p.arcTo(x1, y1, x2, y2, r); } :
    		(p, y1, x1, y2, x2, r) => { p.arcTo(x1, y1, x2, y2, r); };

    	let rect = ori == 0 ?
    		(p, x, y, w, h) => { p.rect(x, y, w, h); } :
    		(p, y, x, h, w) => { p.rect(x, y, w, h); };

    	return (p, x, y, w, h, r = 0) => {
    		if (r == 0)
    			rect(p, x, y, w, h);
    		else {
    			r = min(r, w / 2, h / 2);

    			// adapted from https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas/7838871#7838871
    			moveTo(p, x + r, y);
    			arcTo(p, x + w, y, x + w, y + h, r);
    			arcTo(p, x + w, y + h, x, y + h, r);
    			arcTo(p, x, y + h, x, y, r);
    			arcTo(p, x, y, x + w, y, r);
    			p.closePath();
    		}
    	};
    }

    // orientation-inverting canvas functions
    const moveToH = (p, x, y) => { p.moveTo(x, y); };
    const moveToV = (p, y, x) => { p.moveTo(x, y); };
    const lineToH = (p, x, y) => { p.lineTo(x, y); };
    const lineToV = (p, y, x) => { p.lineTo(x, y); };
    const rectH = rect(0);
    const rectV = rect(1);
    const arcH = (p, x, y, r, startAngle, endAngle) => { p.arc(x, y, r, startAngle, endAngle); };
    const arcV = (p, y, x, r, startAngle, endAngle) => { p.arc(x, y, r, startAngle, endAngle); };
    const bezierCurveToH = (p, bp1x, bp1y, bp2x, bp2y, p2x, p2y) => { p.bezierCurveTo(bp1x, bp1y, bp2x, bp2y, p2x, p2y); };
    const bezierCurveToV = (p, bp1y, bp1x, bp2y, bp2x, p2y, p2x) => { p.bezierCurveTo(bp1x, bp1y, bp2x, bp2y, p2x, p2y); };

    // TODO: drawWrap(seriesIdx, drawPoints) (save, restore, translate, clip)
    function points(opts) {
    	return (u, seriesIdx, idx0, idx1, filtIdxs) => {
    	//	log("drawPoints()", arguments);

    		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
    			let { pxRound, points } = series;

    			let moveTo, arc;

    			if (scaleX.ori == 0) {
    				moveTo = moveToH;
    				arc = arcH;
    			}
    			else {
    				moveTo = moveToV;
    				arc = arcV;
    			}

    			const width = roundDec(points.width * pxRatio, 3);

    			let rad = (points.size - points.width) / 2 * pxRatio;
    			let dia = roundDec(rad * 2, 3);

    			let fill = new Path2D();
    			let clip = new Path2D();

    			let { left: lft, top: top, width: wid, height: hgt } = u.bbox;

    			rectH(clip,
    				lft - dia,
    				top - dia,
    				wid + dia * 2,
    				hgt + dia * 2,
    			);

    			const drawPoint = pi => {
    				if (dataY[pi] != null) {
    					let x = pxRound(valToPosX(dataX[pi], scaleX, xDim, xOff));
    					let y = pxRound(valToPosY(dataY[pi], scaleY, yDim, yOff));

    					moveTo(fill, x + rad, y);
    					arc(fill, x, y, rad, 0, PI * 2);
    				}
    			};

    			if (filtIdxs)
    				filtIdxs.forEach(drawPoint);
    			else {
    				for (let pi = idx0; pi <= idx1; pi++)
    					drawPoint(pi);
    			}

    			return {
    				stroke: width > 0 ? fill : null,
    				fill,
    				clip,
    				flags: BAND_CLIP_FILL | BAND_CLIP_STROKE,
    			};
    		});
    	};
    }

    function _drawAcc(lineTo) {
    	return (stroke, accX, minY, maxY, inY, outY) => {
    		if (minY != maxY) {
    			if (inY != minY && outY != minY)
    				lineTo(stroke, accX, minY);
    			if (inY != maxY && outY != maxY)
    				lineTo(stroke, accX, maxY);

    			lineTo(stroke, accX, outY);
    		}
    	};
    }

    const drawAccH = _drawAcc(lineToH);
    const drawAccV = _drawAcc(lineToV);

    function linear() {
    	return (u, seriesIdx, idx0, idx1) => {
    		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
    			let pxRound = series.pxRound;

    			let lineTo, drawAcc;

    			if (scaleX.ori == 0) {
    				lineTo = lineToH;
    				drawAcc = drawAccH;
    			}
    			else {
    				lineTo = lineToV;
    				drawAcc = drawAccV;
    			}

    			const dir = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

    			const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
    			const stroke = _paths.stroke;

    			let minY = inf,
    				maxY = -inf,
    				inY, outY, outX, drawnAtX;

    			let gaps = [];

    			let accX = pxRound(valToPosX(dataX[dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
    			let accGaps = false;
    			let prevYNull = false;

    			// data edges
    			let lftIdx = nonNullIdx(dataY, idx0, idx1,  1 * dir);
    			let rgtIdx = nonNullIdx(dataY, idx0, idx1, -1 * dir);
    			let lftX =  pxRound(valToPosX(dataX[lftIdx], scaleX, xDim, xOff));
    			let rgtX =  pxRound(valToPosX(dataX[rgtIdx], scaleX, xDim, xOff));

    			if (lftX > xOff)
    				addGap(gaps, xOff, lftX);

    			for (let i = dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += dir) {
    				let x = pxRound(valToPosX(dataX[i], scaleX, xDim, xOff));

    				if (x == accX) {
    					if (dataY[i] != null) {
    						outY = pxRound(valToPosY(dataY[i], scaleY, yDim, yOff));

    						if (minY == inf) {
    							lineTo(stroke, x, outY);
    							inY = outY;
    						}

    						minY = min(outY, minY);
    						maxY = max(outY, maxY);
    					}
    					else if (dataY[i] === null)
    						accGaps = prevYNull = true;
    				}
    				else {
    					let _addGap = false;

    					if (minY != inf) {
    						drawAcc(stroke, accX, minY, maxY, inY, outY);
    						outX = drawnAtX = accX;
    					}
    					else if (accGaps) {
    						_addGap = true;
    						accGaps = false;
    					}

    					if (dataY[i] != null) {
    						outY = pxRound(valToPosY(dataY[i], scaleY, yDim, yOff));
    						lineTo(stroke, x, outY);
    						minY = maxY = inY = outY;

    						// prior pixel can have data but still start a gap if ends with null
    						if (prevYNull && x - accX > 1)
    							_addGap = true;

    						prevYNull = false;
    					}
    					else {
    						minY = inf;
    						maxY = -inf;

    						if (dataY[i] === null) {
    							accGaps = true;

    							if (x - accX > 1)
    								_addGap = true;
    						}
    					}

    					_addGap && addGap(gaps, outX, x);

    					accX = x;
    				}
    			}

    			if (minY != inf && minY != maxY && drawnAtX != accX)
    				drawAcc(stroke, accX, minY, maxY, inY, outY);

    			if (rgtX < xOff + xDim)
    				addGap(gaps, rgtX, xOff + xDim);

    			let [ bandFillDir, bandClipDir ] = bandFillClipDirs(u, seriesIdx);

    			if (series.fill != null || bandFillDir != 0) {
    				let fill = _paths.fill = new Path2D(stroke);

    				let fillToVal = series.fillTo(u, seriesIdx, series.min, series.max, bandFillDir);
    				let fillToY = pxRound(valToPosY(fillToVal, scaleY, yDim, yOff));

    				lineTo(fill, rgtX, fillToY);
    				lineTo(fill, lftX, fillToY);
    			}

    			_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

    			if (!series.spanGaps)
    				_paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim);

    			if (bandClipDir != 0) {
    				_paths.band = bandClipDir == 2 ? [
    					clipBandLine(u, seriesIdx, idx0, idx1, stroke, -1),
    					clipBandLine(u, seriesIdx, idx0, idx1, stroke,  1),
    				] : clipBandLine(u, seriesIdx, idx0, idx1, stroke, bandClipDir);
    			}

    			return _paths;
    		});
    	};
    }

    function stepped(opts) {
    	const align = ifNull(opts.align, 1);
    	// whether to draw ascenders/descenders at null/gap bondaries
    	const ascDesc = ifNull(opts.ascDesc, false);

    	return (u, seriesIdx, idx0, idx1) => {
    		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
    			let pxRound = series.pxRound;

    			let lineTo = scaleX.ori == 0 ? lineToH : lineToV;

    			const _paths = {stroke: new Path2D(), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
    			const stroke = _paths.stroke;

    			const _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

    			idx0 = nonNullIdx(dataY, idx0, idx1,  1);
    			idx1 = nonNullIdx(dataY, idx0, idx1, -1);

    			let gaps = [];
    			let inGap = false;
    			let prevYPos  = pxRound(valToPosY(dataY[_dir == 1 ? idx0 : idx1], scaleY, yDim, yOff));
    			let firstXPos = pxRound(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
    			let prevXPos = firstXPos;

    			lineTo(stroke, firstXPos, prevYPos);

    			for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
    				let yVal1 = dataY[i];

    				let x1 = pxRound(valToPosX(dataX[i], scaleX, xDim, xOff));

    				if (yVal1 == null) {
    					if (yVal1 === null) {
    						addGap(gaps, prevXPos, x1);
    						inGap = true;
    					}
    					continue;
    				}

    				let y1 = pxRound(valToPosY(yVal1, scaleY, yDim, yOff));

    				if (inGap) {
    					addGap(gaps, prevXPos, x1);
    					inGap = false;
    				}

    				if (align == 1)
    					lineTo(stroke, x1, prevYPos);
    				else
    					lineTo(stroke, prevXPos, y1);

    				lineTo(stroke, x1, y1);

    				prevYPos = y1;
    				prevXPos = x1;
    			}

    			let [ bandFillDir, bandClipDir ] = bandFillClipDirs(u, seriesIdx);

    			if (series.fill != null || bandFillDir != 0) {
    				let fill = _paths.fill = new Path2D(stroke);

    				let fillTo = series.fillTo(u, seriesIdx, series.min, series.max, bandFillDir);
    				let fillToY = pxRound(valToPosY(fillTo, scaleY, yDim, yOff));

    				lineTo(fill, prevXPos, fillToY);
    				lineTo(fill, firstXPos, fillToY);
    			}

    			_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

    			// expand/contract clips for ascenders/descenders
    			let halfStroke = (series.width * pxRatio) / 2;
    			let startsOffset = (ascDesc || align ==  1) ?  halfStroke : -halfStroke;
    			let endsOffset   = (ascDesc || align == -1) ? -halfStroke :  halfStroke;

    			gaps.forEach(g => {
    				g[0] += startsOffset;
    				g[1] += endsOffset;
    			});

    			if (!series.spanGaps)
    				_paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim);

    			if (bandClipDir != 0) {
    				_paths.band = bandClipDir == 2 ? [
    					clipBandLine(u, seriesIdx, idx0, idx1, stroke, -1),
    					clipBandLine(u, seriesIdx, idx0, idx1, stroke,  1),
    				] : clipBandLine(u, seriesIdx, idx0, idx1, stroke, bandClipDir);
    			}

    			return _paths;
    		});
    	};
    }

    function bars(opts) {
    	opts = opts || EMPTY_OBJ;
    	const size = ifNull(opts.size, [0.6, inf, 1]);
    	const align = opts.align || 0;
    	const extraGap = (opts.gap || 0) * pxRatio;

    	const radius = ifNull(opts.radius, 0);

    	const gapFactor = 1 - size[0];
    	const maxWidth  = ifNull(size[1], inf) * pxRatio;
    	const minWidth  = ifNull(size[2], 1) * pxRatio;

    	const disp = ifNull(opts.disp, EMPTY_OBJ);
    	const _each = ifNull(opts.each, _ => {});

    	const { fill: dispFills, stroke: dispStrokes } = disp;

    	return (u, seriesIdx, idx0, idx1) => {
    		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
    			let pxRound = series.pxRound;

    			const _dirX = scaleX.dir * (scaleX.ori == 0 ? 1 : -1);
    			const _dirY = scaleY.dir * (scaleY.ori == 1 ? 1 : -1);

    			let rect = scaleX.ori == 0 ? rectH : rectV;

    			let each = scaleX.ori == 0 ? _each : (u, seriesIdx, i, top, lft, hgt, wid) => {
    				_each(u, seriesIdx, i, lft, top, wid, hgt);
    			};

    			let [ bandFillDir, bandClipDir ] = bandFillClipDirs(u, seriesIdx);

    		//	let fillToY = series.fillTo(u, seriesIdx, series.min, series.max, bandFillDir);
    			let fillToY = scaleY.distr == 3 ? (bandFillDir == 1 ? scaleY.max : scaleY.min) : 0;

    			let y0Pos = valToPosY(fillToY, scaleY, yDim, yOff);

    			// barWid is to center of stroke
    			let xShift, barWid;

    			let strokeWidth = pxRound(series.width * pxRatio);

    			let multiPath = false;

    			let fillColors = null;
    			let fillPaths = null;
    			let strokeColors = null;
    			let strokePaths = null;

    			if (dispFills != null && (strokeWidth == 0 || dispStrokes != null)) {
    				multiPath = true;

    				fillColors = dispFills.values(u, seriesIdx, idx0, idx1);
    				fillPaths = new Map();
    				(new Set(fillColors)).forEach(color => {
    					if (color != null)
    						fillPaths.set(color, new Path2D());
    				});

    				if (strokeWidth > 0) {
    					strokeColors = dispStrokes.values(u, seriesIdx, idx0, idx1);
    					strokePaths = new Map();
    					(new Set(strokeColors)).forEach(color => {
    						if (color != null)
    							strokePaths.set(color, new Path2D());
    					});
    				}
    			}

    			let { x0, size } = disp;

    			if (x0 != null && size != null) {
    				dataX = x0.values(u, seriesIdx, idx0, idx1);

    				if (x0.unit == 2)
    					dataX = dataX.map(pct => u.posToVal(xOff + pct * xDim, scaleX.key, true));

    				// assumes uniform sizes, for now
    				let sizes = size.values(u, seriesIdx, idx0, idx1);

    				if (size.unit == 2)
    					barWid = sizes[0] * xDim;
    				else
    					barWid = valToPosX(sizes[0], scaleX, xDim, xOff) - valToPosX(0, scaleX, xDim, xOff); // assumes linear scale (delta from 0)

    				barWid = pxRound(barWid - strokeWidth);

    				xShift = (_dirX == 1 ? -strokeWidth / 2 : barWid + strokeWidth / 2);
    			}
    			else {
    				let colWid = xDim;

    				if (dataX.length > 1) {
    					// prior index with non-undefined y data
    					let prevIdx = null;

    					// scan full dataset for smallest adjacent delta
    					// will not work properly for non-linear x scales, since does not do expensive valToPosX calcs till end
    					for (let i = 0, minDelta = Infinity; i < dataX.length; i++) {
    						if (dataY[i] !== undefined) {
    							if (prevIdx != null) {
    								let delta = abs(dataX[i] - dataX[prevIdx]);

    								if (delta < minDelta) {
    									minDelta = delta;
    									colWid = abs(valToPosX(dataX[i], scaleX, xDim, xOff) - valToPosX(dataX[prevIdx], scaleX, xDim, xOff));
    								}
    							}

    							prevIdx = i;
    						}
    					}
    				}

    				let gapWid = colWid * gapFactor;

    				barWid = pxRound(min(maxWidth, max(minWidth, colWid - gapWid)) - strokeWidth - extraGap);

    				xShift = (align == 0 ? barWid / 2 : align == _dirX ? 0 : barWid) - align * _dirX * extraGap / 2;
    			}

    			const _paths = {stroke: null, fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL | BAND_CLIP_STROKE};  // disp, geom

    			let yLimit;

    			if (bandClipDir != 0) {
    				_paths.band = new Path2D();
    				yLimit = pxRound(valToPosY(bandClipDir == 1 ? scaleY.max : scaleY.min, scaleY, yDim, yOff));
    			}

    			const stroke = multiPath ? null : new Path2D();
    			const band = _paths.band;

    			let { y0, y1 } = disp;

    			let dataY0 = null;

    			if (y0 != null && y1 != null) {
    				dataY = y1.values(u, seriesIdx, idx0, idx1);
    				dataY0 = y0.values(u, seriesIdx, idx0, idx1);
    			}

    			for (let i = _dirX == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dirX) {
    				let yVal = dataY[i];

    			/*
    				// interpolate upwards band clips
    				if (yVal == null) {
    				//	if (hasBands)
    				//		yVal = costlyLerp(i, idx0, idx1, _dirX, dataY);
    				//	else
    						continue;
    				}
    			*/

    				let xVal = scaleX.distr != 2 || disp != null ? dataX[i] : i;

    				// TODO: all xPos can be pre-computed once for all series in aligned set
    				let xPos = valToPosX(xVal, scaleX, xDim, xOff);
    				let yPos = valToPosY(ifNull(yVal, fillToY), scaleY, yDim, yOff);

    				if (dataY0 != null && yVal != null)
    					y0Pos = valToPosY(dataY0[i], scaleY, yDim, yOff);

    				let lft = pxRound(xPos - xShift);
    				let btm = pxRound(max(yPos, y0Pos));
    				let top = pxRound(min(yPos, y0Pos));
    				// this includes the stroke
    				let barHgt = btm - top;

    				let r = radius * barWid;

    				if (yVal != null) {  // && yVal != fillToY (0 height bar)
    					if (multiPath) {
    						if (strokeWidth > 0 && strokeColors[i] != null)
    							rect(strokePaths.get(strokeColors[i]), lft, top + floor(strokeWidth / 2), barWid, max(0, barHgt - strokeWidth), r);

    						if (fillColors[i] != null)
    							rect(fillPaths.get(fillColors[i]), lft, top + floor(strokeWidth / 2), barWid, max(0, barHgt - strokeWidth), r);
    					}
    					else
    						rect(stroke, lft, top + floor(strokeWidth / 2), barWid, max(0, barHgt - strokeWidth), r);

    					each(u, seriesIdx, i,
    						lft    - strokeWidth / 2,
    						top,
    						barWid + strokeWidth,
    						barHgt,
    					);
    				}

    				if (bandClipDir != 0) {
    					if (_dirY * bandClipDir == 1) {
    						btm = top;
    						top = yLimit;
    					}
    					else {
    						top = btm;
    						btm = yLimit;
    					}

    					barHgt = btm - top;

    					rect(band, lft - strokeWidth / 2, top, barWid + strokeWidth, max(0, barHgt), 0);
    				}
    			}

    			if (strokeWidth > 0)
    				_paths.stroke = multiPath ? strokePaths : stroke;

    			_paths.fill = multiPath ? fillPaths : stroke;

    			return _paths;
    		});
    	};
    }

    function splineInterp(interp, opts) {
    	return (u, seriesIdx, idx0, idx1) => {
    		return orient(u, seriesIdx, (series, dataX, dataY, scaleX, scaleY, valToPosX, valToPosY, xOff, yOff, xDim, yDim) => {
    			let pxRound = series.pxRound;

    			let moveTo, bezierCurveTo, lineTo;

    			if (scaleX.ori == 0) {
    				moveTo = moveToH;
    				lineTo = lineToH;
    				bezierCurveTo = bezierCurveToH;
    			}
    			else {
    				moveTo = moveToV;
    				lineTo = lineToV;
    				bezierCurveTo = bezierCurveToV;
    			}

    			const _dir = 1 * scaleX.dir * (scaleX.ori == 0 ? 1 : -1);

    			idx0 = nonNullIdx(dataY, idx0, idx1,  1);
    			idx1 = nonNullIdx(dataY, idx0, idx1, -1);

    			let gaps = [];
    			let inGap = false;
    			let firstXPos = pxRound(valToPosX(dataX[_dir == 1 ? idx0 : idx1], scaleX, xDim, xOff));
    			let prevXPos = firstXPos;

    			let xCoords = [];
    			let yCoords = [];

    			for (let i = _dir == 1 ? idx0 : idx1; i >= idx0 && i <= idx1; i += _dir) {
    				let yVal = dataY[i];
    				let xVal = dataX[i];
    				let xPos = valToPosX(xVal, scaleX, xDim, xOff);

    				if (yVal == null) {
    					if (yVal === null) {
    						addGap(gaps, prevXPos, xPos);
    						inGap = true;
    					}
    					continue;
    				}
    				else {
    					if (inGap) {
    						addGap(gaps, prevXPos, xPos);
    						inGap = false;
    					}

    					xCoords.push((prevXPos = xPos));
    					yCoords.push(valToPosY(dataY[i], scaleY, yDim, yOff));
    				}
    			}

    			const _paths = {stroke: interp(xCoords, yCoords, moveTo, lineTo, bezierCurveTo, pxRound), fill: null, clip: null, band: null, gaps: null, flags: BAND_CLIP_FILL};
    			const stroke = _paths.stroke;

    			let [ bandFillDir, bandClipDir ] = bandFillClipDirs(u, seriesIdx);

    			if (series.fill != null || bandFillDir != 0) {
    				let fill = _paths.fill = new Path2D(stroke);

    				let fillTo = series.fillTo(u, seriesIdx, series.min, series.max, bandFillDir);
    				let fillToY = pxRound(valToPosY(fillTo, scaleY, yDim, yOff));

    				lineTo(fill, prevXPos, fillToY);
    				lineTo(fill, firstXPos, fillToY);
    			}

    			_paths.gaps = gaps = series.gaps(u, seriesIdx, idx0, idx1, gaps);

    			if (!series.spanGaps)
    				_paths.clip = clipGaps(gaps, scaleX.ori, xOff, yOff, xDim, yDim);

    			if (bandClipDir != 0) {
    				_paths.band = bandClipDir == 2 ? [
    					clipBandLine(u, seriesIdx, idx0, idx1, stroke, -1),
    					clipBandLine(u, seriesIdx, idx0, idx1, stroke,  1),
    				] : clipBandLine(u, seriesIdx, idx0, idx1, stroke, bandClipDir);
    			}

    			return _paths;

    			//  if FEAT_PATHS: false in rollup.config.js
    			//	u.ctx.save();
    			//	u.ctx.beginPath();
    			//	u.ctx.rect(u.bbox.left, u.bbox.top, u.bbox.width, u.bbox.height);
    			//	u.ctx.clip();
    			//	u.ctx.strokeStyle = u.series[sidx].stroke;
    			//	u.ctx.stroke(stroke);
    			//	u.ctx.fillStyle = u.series[sidx].fill;
    			//	u.ctx.fill(fill);
    			//	u.ctx.restore();
    			//	return null;
    		});
    	};
    }

    function monotoneCubic(opts) {
    	return splineInterp(_monotoneCubic);
    }

    // Monotone Cubic Spline interpolation, adapted from the Chartist.js implementation:
    // https://github.com/gionkunz/chartist-js/blob/e7e78201bffe9609915e5e53cfafa29a5d6c49f9/src/scripts/interpolation.js#L240-L369
    function _monotoneCubic(xs, ys, moveTo, lineTo, bezierCurveTo, pxRound) {
    	const n = xs.length;

    	if (n < 2)
    		return null;

    	const path = new Path2D();

    	moveTo(path, xs[0], ys[0]);

    	if (n == 2)
    		lineTo(path, xs[1], ys[1]);
    	else {
    		let ms  = Array(n),
    			ds  = Array(n - 1),
    			dys = Array(n - 1),
    			dxs = Array(n - 1);

    		// calc deltas and derivative
    		for (let i = 0; i < n - 1; i++) {
    			dys[i] = ys[i + 1] - ys[i];
    			dxs[i] = xs[i + 1] - xs[i];
    			ds[i]  = dys[i] / dxs[i];
    		}

    		// determine desired slope (m) at each point using Fritsch-Carlson method
    		// http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation
    		ms[0] = ds[0];

    		for (let i = 1; i < n - 1; i++) {
    			if (ds[i] === 0 || ds[i - 1] === 0 || (ds[i - 1] > 0) !== (ds[i] > 0))
    				ms[i] = 0;
    			else {
    				ms[i] = 3 * (dxs[i - 1] + dxs[i]) / (
    					(2 * dxs[i] + dxs[i - 1]) / ds[i - 1] +
    					(dxs[i] + 2 * dxs[i - 1]) / ds[i]
    				);

    				if (!isFinite(ms[i]))
    					ms[i] = 0;
    			}
    		}

    		ms[n - 1] = ds[n - 2];

    		for (let i = 0; i < n - 1; i++) {
    			bezierCurveTo(
    				path,
    				xs[i] + dxs[i] / 3,
    				ys[i] + ms[i] * dxs[i] / 3,
    				xs[i + 1] - dxs[i] / 3,
    				ys[i + 1] - ms[i + 1] * dxs[i] / 3,
    				xs[i + 1],
    				ys[i + 1],
    			);
    		}
    	}

    	return path;
    }

    const cursorPlots = new Set();

    function invalidateRects() {
    	cursorPlots.forEach(u => {
    		u.syncRect(true);
    	});
    }

    on(resize, win, invalidateRects);
    on(scroll, win, invalidateRects, true);

    const linearPath = linear() ;
    const pointsPath = points() ;

    function setDefaults(d, xo, yo, initY) {
    	let d2 = initY ? [d[0], d[1]].concat(d.slice(2)) : [d[0]].concat(d.slice(1));
    	return d2.map((o, i) => setDefault(o, i, xo, yo));
    }

    function setDefaults2(d, xyo) {
    	return d.map((o, i) => i == 0 ? null : assign$1({}, xyo, o));  // todo: assign() will not merge facet arrays
    }

    function setDefault(o, i, xo, yo) {
    	return assign$1({}, (i == 0 ? xo : yo), o);
    }

    function snapNumX(self, dataMin, dataMax) {
    	return dataMin == null ? nullNullTuple : [dataMin, dataMax];
    }

    const snapTimeX = snapNumX;

    // this ensures that non-temporal/numeric y-axes get multiple-snapped padding added above/below
    // TODO: also account for incrs when snapping to ensure top of axis gets a tick & value
    function snapNumY(self, dataMin, dataMax) {
    	return dataMin == null ? nullNullTuple : rangeNum(dataMin, dataMax, rangePad, true);
    }

    function snapLogY(self, dataMin, dataMax, scale) {
    	return dataMin == null ? nullNullTuple : rangeLog(dataMin, dataMax, self.scales[scale].log, false);
    }

    const snapLogX = snapLogY;

    function snapAsinhY(self, dataMin, dataMax, scale) {
    	return dataMin == null ? nullNullTuple : rangeAsinh(dataMin, dataMax, self.scales[scale].log, false);
    }

    const snapAsinhX = snapAsinhY;

    // dim is logical (getClientBoundingRect) pixels, not canvas pixels
    function findIncr(minVal, maxVal, incrs, dim, minSpace) {
    	let intDigits = max(numIntDigits(minVal), numIntDigits(maxVal));

    	let delta = maxVal - minVal;

    	let incrIdx = closestIdx((minSpace / dim) * delta, incrs);

    	do {
    		let foundIncr = incrs[incrIdx];
    		let foundSpace = dim * foundIncr / delta;

    		if (foundSpace >= minSpace && intDigits + (foundIncr < 5 ? fixedDec.get(foundIncr) : 0) <= 17)
    			return [foundIncr, foundSpace];
    	} while (++incrIdx < incrs.length);

    	return [0, 0];
    }

    function pxRatioFont(font) {
    	let fontSize, fontSizeCss;
    	font = font.replace(/(\d+)px/, (m, p1) => (fontSize = round((fontSizeCss = +p1) * pxRatio)) + 'px');
    	return [font, fontSize, fontSizeCss];
    }

    function syncFontSize(axis) {
    	if (axis.show) {
    		[axis.font, axis.labelFont].forEach(f => {
    			let size = roundDec(f[2] * pxRatio, 1);
    			f[0] = f[0].replace(/[0-9.]+px/, size + 'px');
    			f[1] = size;
    		});
    	}
    }

    function uPlot(opts, data, then) {
    	const self = {
    		mode: ifNull(opts.mode, 1),
    	};

    	const mode = self.mode;

    	// TODO: cache denoms & mins scale.cache = {r, min, }
    	function getValPct(val, scale) {
    		let _val = (
    			scale.distr == 3 ? log10(val > 0 ? val : scale.clamp(self, val, scale.min, scale.max, scale.key)) :
    			scale.distr == 4 ? asinh(val, scale.asinh) :
    			val
    		);

    		return (_val - scale._min) / (scale._max - scale._min);
    	}

    	function getHPos(val, scale, dim, off) {
    		let pct = getValPct(val, scale);
    		return off + dim * (scale.dir == -1 ? (1 - pct) : pct);
    	}

    	function getVPos(val, scale, dim, off) {
    		let pct = getValPct(val, scale);
    		return off + dim * (scale.dir == -1 ? pct : (1 - pct));
    	}

    	function getPos(val, scale, dim, off) {
    		return scale.ori == 0 ? getHPos(val, scale, dim, off) : getVPos(val, scale, dim, off);
    	}

    	self.valToPosH = getHPos;
    	self.valToPosV = getVPos;

    	let ready = false;
    	self.status = 0;

    	const root = self.root = placeDiv(UPLOT);

    	if (opts.id != null)
    		root.id = opts.id;

    	addClass(root, opts.class);

    	if (opts.title) {
    		let title = placeDiv(TITLE, root);
    		title.textContent = opts.title;
    	}

    	const can = placeTag("canvas");
    	const ctx = self.ctx = can.getContext("2d");

    	const wrap = placeDiv(WRAP, root);
    	const under = self.under = placeDiv(UNDER, wrap);
    	wrap.appendChild(can);
    	const over = self.over = placeDiv(OVER, wrap);

    	opts = copy(opts);

    	const pxAlign = +ifNull(opts.pxAlign, 1);

    	const pxRound = pxRoundGen(pxAlign);

    	(opts.plugins || []).forEach(p => {
    		if (p.opts)
    			opts = p.opts(self, opts) || opts;
    	});

    	const ms = opts.ms || 1e-3;

    	const series  = self.series = mode == 1 ?
    		setDefaults(opts.series || [], xSeriesOpts, ySeriesOpts, false) :
    		setDefaults2(opts.series || [null], xySeriesOpts);
    	const axes    = self.axes   = setDefaults(opts.axes   || [], xAxisOpts,   yAxisOpts,    true);
    	const scales  = self.scales = {};
    	const bands   = self.bands  = opts.bands || [];

    	bands.forEach(b => {
    		b.fill = fnOrSelf(b.fill || null);
    		b.dir = ifNull(b.dir, -1);
    	});

    	const xScaleKey = mode == 2 ? series[1].facets[0].scale : series[0].scale;

    	const drawOrderMap = {
    		axes: drawAxesGrid,
    		series: drawSeries,
    	};

    	const drawOrder = (opts.drawOrder || ["axes", "series"]).map(key => drawOrderMap[key]);

    	function initScale(scaleKey) {
    		let sc = scales[scaleKey];

    		if (sc == null) {
    			let scaleOpts = (opts.scales || EMPTY_OBJ)[scaleKey] || EMPTY_OBJ;

    			if (scaleOpts.from != null) {
    				// ensure parent is initialized
    				initScale(scaleOpts.from);
    				// dependent scales inherit
    				scales[scaleKey] = assign$1({}, scales[scaleOpts.from], scaleOpts, {key: scaleKey});
    			}
    			else {
    				sc = scales[scaleKey] = assign$1({}, (scaleKey == xScaleKey ? xScaleOpts : yScaleOpts), scaleOpts);

    				sc.key = scaleKey;

    				let isTime = sc.time;

    				let rn = sc.range;

    				let rangeIsArr = isArr(rn);

    				if (scaleKey != xScaleKey || (mode == 2 && !isTime)) {
    					// if range array has null limits, it should be auto
    					if (rangeIsArr && (rn[0] == null || rn[1] == null)) {
    						rn = {
    							min: rn[0] == null ? autoRangePart : {
    								mode: 1,
    								hard: rn[0],
    								soft: rn[0],
    							},
    							max: rn[1] == null ? autoRangePart : {
    								mode: 1,
    								hard: rn[1],
    								soft: rn[1],
    							},
    						};
    						rangeIsArr = false;
    					}

    					if (!rangeIsArr && isObj(rn)) {
    						let cfg = rn;
    						// this is similar to snapNumY
    						rn = (self, dataMin, dataMax) => dataMin == null ? nullNullTuple : rangeNum(dataMin, dataMax, cfg);
    					}
    				}

    				sc.range = fnOrSelf(rn || (isTime ? snapTimeX : scaleKey == xScaleKey ?
    					(sc.distr == 3 ? snapLogX : sc.distr == 4 ? snapAsinhX : snapNumX) :
    					(sc.distr == 3 ? snapLogY : sc.distr == 4 ? snapAsinhY : snapNumY)
    				));

    				sc.auto = fnOrSelf(rangeIsArr ? false : sc.auto);

    				sc.clamp = fnOrSelf(sc.clamp || clampScale);

    				// caches for expensive ops like asinh() & log()
    				sc._min = sc._max = null;
    			}
    		}
    	}

    	initScale("x");
    	initScale("y");

    	// TODO: init scales from facets in mode: 2
    	if (mode == 1) {
    		series.forEach(s => {
    			initScale(s.scale);
    		});
    	}

    	axes.forEach(a => {
    		initScale(a.scale);
    	});

    	for (let k in opts.scales)
    		initScale(k);

    	const scaleX = scales[xScaleKey];

    	const xScaleDistr = scaleX.distr;

    	let valToPosX, valToPosY;

    	if (scaleX.ori == 0) {
    		addClass(root, ORI_HZ);
    		valToPosX = getHPos;
    		valToPosY = getVPos;
    		/*
    		updOriDims = () => {
    			xDimCan = plotWid;
    			xOffCan = plotLft;
    			yDimCan = plotHgt;
    			yOffCan = plotTop;

    			xDimCss = plotWidCss;
    			xOffCss = plotLftCss;
    			yDimCss = plotHgtCss;
    			yOffCss = plotTopCss;
    		};
    		*/
    	}
    	else {
    		addClass(root, ORI_VT);
    		valToPosX = getVPos;
    		valToPosY = getHPos;
    		/*
    		updOriDims = () => {
    			xDimCan = plotHgt;
    			xOffCan = plotTop;
    			yDimCan = plotWid;
    			yOffCan = plotLft;

    			xDimCss = plotHgtCss;
    			xOffCss = plotTopCss;
    			yDimCss = plotWidCss;
    			yOffCss = plotLftCss;
    		};
    		*/
    	}

    	const pendScales = {};

    	// explicitly-set initial scales
    	for (let k in scales) {
    		let sc = scales[k];

    		if (sc.min != null || sc.max != null) {
    			pendScales[k] = {min: sc.min, max: sc.max};
    			sc.min = sc.max = null;
    		}
    	}

    //	self.tz = opts.tz || Intl.DateTimeFormat().resolvedOptions().timeZone;
    	const _tzDate  = (opts.tzDate || (ts => new Date(round(ts / ms))));
    	const _fmtDate = (opts.fmtDate || fmtDate);

    	const _timeAxisSplits = (ms == 1 ? timeAxisSplitsMs(_tzDate) : timeAxisSplitsS(_tzDate));
    	const _timeAxisVals   = timeAxisVals(_tzDate, timeAxisStamps((ms == 1 ? _timeAxisStampsMs : _timeAxisStampsS), _fmtDate));
    	const _timeSeriesVal  = timeSeriesVal(_tzDate, timeSeriesStamp(_timeSeriesStamp, _fmtDate));

    	const activeIdxs = [];

    	const legend     = (self.legend = assign$1({}, legendOpts, opts.legend));
    	const showLegend = legend.show;
    	const markers    = legend.markers;

    	{
    		legend.idxs = activeIdxs;

    		markers.width  = fnOrSelf(markers.width);
    		markers.dash   = fnOrSelf(markers.dash);
    		markers.stroke = fnOrSelf(markers.stroke);
    		markers.fill   = fnOrSelf(markers.fill);
    	}

    	let legendEl;
    	let legendRows = [];
    	let legendCells = [];
    	let legendCols;
    	let multiValLegend = false;
    	let NULL_LEGEND_VALUES = {};

    	if (legend.live) {
    		const getMultiVals = series[1] ? series[1].values : null;
    		multiValLegend = getMultiVals != null;
    		legendCols = multiValLegend ? getMultiVals(self, 1, 0) : {_: 0};

    		for (let k in legendCols)
    			NULL_LEGEND_VALUES[k] = "--";
    	}

    	if (showLegend) {
    		legendEl = placeTag("table", LEGEND, root);

    		if (multiValLegend) {
    			let head = placeTag("tr", LEGEND_THEAD, legendEl);
    			placeTag("th", null, head);

    			for (var key in legendCols)
    				placeTag("th", LEGEND_LABEL, head).textContent = key;
    		}
    		else {
    			addClass(legendEl, LEGEND_INLINE);
    			legend.live && addClass(legendEl, LEGEND_LIVE);
    		}
    	}

    	const son  = {show: true};
    	const soff = {show: false};

    	function initLegendRow(s, i) {
    		if (i == 0 && (multiValLegend || !legend.live || mode == 2))
    			return nullNullTuple;

    		let cells = [];

    		let row = placeTag("tr", LEGEND_SERIES, legendEl, legendEl.childNodes[i]);

    		addClass(row, s.class);

    		if (!s.show)
    			addClass(row, OFF);

    		let label = placeTag("th", null, row);

    		if (markers.show) {
    			let indic = placeDiv(LEGEND_MARKER, label);

    			if (i > 0) {
    				let width  = markers.width(self, i);

    				if (width)
    					indic.style.border = width + "px " + markers.dash(self, i) + " " + markers.stroke(self, i);

    				indic.style.background = markers.fill(self, i);
    			}
    		}

    		let text = placeDiv(LEGEND_LABEL, label);
    		text.textContent = s.label;

    		if (i > 0) {
    			if (!markers.show)
    				text.style.color = s.width > 0 ? markers.stroke(self, i) : markers.fill(self, i);

    			onMouse("click", label, e => {
    				if (cursor._lock)
    					return;

    				let seriesIdx = series.indexOf(s);

    				if ((e.ctrlKey || e.metaKey) != legend.isolate) {
    					// if any other series is shown, isolate this one. else show all
    					let isolate = series.some((s, i) => i > 0 && i != seriesIdx && s.show);

    					series.forEach((s, i) => {
    						i > 0 && setSeries(i, isolate ? (i == seriesIdx ? son : soff) : son, true, syncOpts.setSeries);
    					});
    				}
    				else
    					setSeries(seriesIdx, {show: !s.show}, true, syncOpts.setSeries);
    			});

    			if (cursorFocus) {
    				onMouse(mouseenter, label, e => {
    					if (cursor._lock)
    						return;

    					setSeries(series.indexOf(s), FOCUS_TRUE, true, syncOpts.setSeries);
    				});
    			}
    		}

    		for (var key in legendCols) {
    			let v = placeTag("td", LEGEND_VALUE, row);
    			v.textContent = "--";
    			cells.push(v);
    		}

    		return [row, cells];
    	}

    	const mouseListeners = new Map();

    	function onMouse(ev, targ, fn) {
    		const targListeners = mouseListeners.get(targ) || {};
    		const listener = cursor.bind[ev](self, targ, fn);

    		if (listener) {
    			on(ev, targ, targListeners[ev] = listener);
    			mouseListeners.set(targ, targListeners);
    		}
    	}

    	function offMouse(ev, targ, fn) {
    		const targListeners = mouseListeners.get(targ) || {};

    		for (let k in targListeners) {
    			if (ev == null || k == ev) {
    				off(k, targ, targListeners[k]);
    				delete targListeners[k];
    			}
    		}

    		if (ev == null)
    			mouseListeners.delete(targ);
    	}

    	let fullWidCss = 0;
    	let fullHgtCss = 0;

    	let plotWidCss = 0;
    	let plotHgtCss = 0;

    	// plot margins to account for axes
    	let plotLftCss = 0;
    	let plotTopCss = 0;

    	let plotLft = 0;
    	let plotTop = 0;
    	let plotWid = 0;
    	let plotHgt = 0;

    	self.bbox = {};

    	let shouldSetScales = false;
    	let shouldSetSize = false;
    	let shouldConvergeSize = false;
    	let shouldSetCursor = false;
    	let shouldSetLegend = false;

    	function _setSize(width, height, force) {
    		if (force || (width != self.width || height != self.height))
    			calcSize(width, height);

    		resetYSeries(false);

    		shouldConvergeSize = true;
    		shouldSetSize = true;
    		shouldSetCursor = shouldSetLegend = cursor.left >= 0;
    		commit();
    	}

    	function calcSize(width, height) {
    	//	log("calcSize()", arguments);

    		self.width  = fullWidCss = plotWidCss = width;
    		self.height = fullHgtCss = plotHgtCss = height;
    		plotLftCss  = plotTopCss = 0;

    		calcPlotRect();
    		calcAxesRects();

    		let bb = self.bbox;

    		plotLft = bb.left   = incrRound(plotLftCss * pxRatio, 0.5);
    		plotTop = bb.top    = incrRound(plotTopCss * pxRatio, 0.5);
    		plotWid = bb.width  = incrRound(plotWidCss * pxRatio, 0.5);
    		plotHgt = bb.height = incrRound(plotHgtCss * pxRatio, 0.5);

    	//	updOriDims();
    	}

    	// ensures size calc convergence
    	const CYCLE_LIMIT = 3;

    	function convergeSize() {
    		let converged = false;

    		let cycleNum = 0;

    		while (!converged) {
    			cycleNum++;

    			let axesConverged = axesCalc(cycleNum);
    			let paddingConverged = paddingCalc(cycleNum);

    			converged = cycleNum == CYCLE_LIMIT || (axesConverged && paddingConverged);

    			if (!converged) {
    				calcSize(self.width, self.height);
    				shouldSetSize = true;
    			}
    		}
    	}

    	function setSize({width, height}) {
    		_setSize(width, height);
    	}

    	self.setSize = setSize;

    	// accumulate axis offsets, reduce canvas width
    	function calcPlotRect() {
    		// easements for edge labels
    		let hasTopAxis = false;
    		let hasBtmAxis = false;
    		let hasRgtAxis = false;
    		let hasLftAxis = false;

    		axes.forEach((axis, i) => {
    			if (axis.show && axis._show) {
    				let {side, _size} = axis;
    				let isVt = side % 2;
    				let labelSize = axis.label != null ? axis.labelSize : 0;

    				let fullSize = _size + labelSize;

    				if (fullSize > 0) {
    					if (isVt) {
    						plotWidCss -= fullSize;

    						if (side == 3) {
    							plotLftCss += fullSize;
    							hasLftAxis = true;
    						}
    						else
    							hasRgtAxis = true;
    					}
    					else {
    						plotHgtCss -= fullSize;

    						if (side == 0) {
    							plotTopCss += fullSize;
    							hasTopAxis = true;
    						}
    						else
    							hasBtmAxis = true;
    					}
    				}
    			}
    		});

    		sidesWithAxes[0] = hasTopAxis;
    		sidesWithAxes[1] = hasRgtAxis;
    		sidesWithAxes[2] = hasBtmAxis;
    		sidesWithAxes[3] = hasLftAxis;

    		// hz padding
    		plotWidCss -= _padding[1] + _padding[3];
    		plotLftCss += _padding[3];

    		// vt padding
    		plotHgtCss -= _padding[2] + _padding[0];
    		plotTopCss += _padding[0];
    	}

    	function calcAxesRects() {
    		// will accum +
    		let off1 = plotLftCss + plotWidCss;
    		let off2 = plotTopCss + plotHgtCss;
    		// will accum -
    		let off3 = plotLftCss;
    		let off0 = plotTopCss;

    		function incrOffset(side, size) {
    			switch (side) {
    				case 1: off1 += size; return off1 - size;
    				case 2: off2 += size; return off2 - size;
    				case 3: off3 -= size; return off3 + size;
    				case 0: off0 -= size; return off0 + size;
    			}
    		}

    		axes.forEach((axis, i) => {
    			if (axis.show && axis._show) {
    				let side = axis.side;

    				axis._pos = incrOffset(side, axis._size);

    				if (axis.label != null)
    					axis._lpos = incrOffset(side, axis.labelSize);
    			}
    		});
    	}

    	const cursor = (self.cursor = assign$1({}, cursorOpts, {drag: {y: mode == 2}}, opts.cursor));

    	{
    		cursor.idxs = activeIdxs;

    		cursor._lock = false;

    		let points = cursor.points;

    		points.show   = fnOrSelf(points.show);
    		points.size   = fnOrSelf(points.size);
    		points.stroke = fnOrSelf(points.stroke);
    		points.width  = fnOrSelf(points.width);
    		points.fill   = fnOrSelf(points.fill);
    	}

    	const focus = self.focus = assign$1({}, opts.focus || {alpha: 0.3}, cursor.focus);
    	const cursorFocus = focus.prox >= 0;

    	// series-intersection markers
    	let cursorPts = [null];

    	function initCursorPt(s, si) {
    		if (si > 0) {
    			let pt = cursor.points.show(self, si);

    			if (pt) {
    				addClass(pt, CURSOR_PT);
    				addClass(pt, s.class);
    				elTrans(pt, -10, -10, plotWidCss, plotHgtCss);
    				over.insertBefore(pt, cursorPts[si]);

    				return pt;
    			}
    		}
    	}

    	function initSeries(s, i) {
    		if (mode == 1 || i > 0) {
    			let isTime = mode == 1 && scales[s.scale].time;

    			let sv = s.value;
    			s.value = isTime ? (isStr(sv) ? timeSeriesVal(_tzDate, timeSeriesStamp(sv, _fmtDate)) : sv || _timeSeriesVal) : sv || numSeriesVal;
    			s.label = s.label || (isTime ? timeSeriesLabel : numSeriesLabel);
    		}

    		if (i > 0) {
    			s.width  = s.width == null ? 1 : s.width;
    			s.paths  = s.paths || linearPath || retNull;
    			s.fillTo = fnOrSelf(s.fillTo || seriesFillTo);
    			s.pxAlign = +ifNull(s.pxAlign, pxAlign);
    			s.pxRound = pxRoundGen(s.pxAlign);

    			s.stroke = fnOrSelf(s.stroke || null);
    			s.fill   = fnOrSelf(s.fill || null);
    			s._stroke = s._fill = s._paths = s._focus = null;

    			let _ptDia = ptDia(s.width, 1);
    			let points = s.points = assign$1({}, {
    				size: _ptDia,
    				width: max(1, _ptDia * .2),
    				stroke: s.stroke,
    				space: _ptDia * 2,
    				paths: pointsPath,
    				_stroke: null,
    				_fill: null,
    			}, s.points);
    			points.show   = fnOrSelf(points.show);
    			points.filter = fnOrSelf(points.filter);
    			points.fill   = fnOrSelf(points.fill);
    			points.stroke = fnOrSelf(points.stroke);
    			points.paths  = fnOrSelf(points.paths);
    			points.pxAlign = s.pxAlign;
    		}

    		if (showLegend) {
    			let rowCells = initLegendRow(s, i);
    			legendRows.splice(i, 0, rowCells[0]);
    			legendCells.splice(i, 0, rowCells[1]);
    			legend.values.push(null);	// NULL_LEGEND_VALS not yet avil here :(
    		}

    		if (cursor.show) {
    			activeIdxs.splice(i, 0, null);

    			let pt = initCursorPt(s, i);
    			pt && cursorPts.splice(i, 0, pt);
    		}

    		fire("addSeries", i);
    	}

    	function addSeries(opts, si) {
    		si = si == null ? series.length : si;

    		opts = setDefault(opts, si, xSeriesOpts, ySeriesOpts);
    		series.splice(si, 0, opts);
    		initSeries(series[si], si);
    	}

    	self.addSeries = addSeries;

    	function delSeries(i) {
    		series.splice(i, 1);

    		if (showLegend) {
    			legend.values.splice(i, 1);

    			legendCells.splice(i, 1);
    			let tr = legendRows.splice(i, 1)[0];
    			offMouse(null, tr.firstChild);
    			tr.remove();
    		}

    		if (cursor.show) {
    			activeIdxs.splice(i, 1);

    			cursorPts.length > 1 && cursorPts.splice(i, 1)[0].remove();
    		}

    		// TODO: de-init no-longer-needed scales?

    		fire("delSeries", i);
    	}

    	self.delSeries = delSeries;

    	const sidesWithAxes = [false, false, false, false];

    	function initAxis(axis, i) {
    		axis._show = axis.show;

    		if (axis.show) {
    			let isVt = axis.side % 2;

    			let sc = scales[axis.scale];

    			// this can occur if all series specify non-default scales
    			if (sc == null) {
    				axis.scale = isVt ? series[1].scale : xScaleKey;
    				sc = scales[axis.scale];
    			}

    			// also set defaults for incrs & values based on axis distr
    			let isTime = sc.time;

    			axis.size   = fnOrSelf(axis.size);
    			axis.space  = fnOrSelf(axis.space);
    			axis.rotate = fnOrSelf(axis.rotate);
    			axis.incrs  = fnOrSelf(axis.incrs  || (          sc.distr == 2 ? wholeIncrs : (isTime ? (ms == 1 ? timeIncrsMs : timeIncrsS) : numIncrs)));
    			axis.splits = fnOrSelf(axis.splits || (isTime && sc.distr == 1 ? _timeAxisSplits : sc.distr == 3 ? logAxisSplits : sc.distr == 4 ? asinhAxisSplits : numAxisSplits));

    			axis.stroke        = fnOrSelf(axis.stroke);
    			axis.grid.stroke   = fnOrSelf(axis.grid.stroke);
    			axis.ticks.stroke  = fnOrSelf(axis.ticks.stroke);
    			axis.border.stroke = fnOrSelf(axis.border.stroke);

    			let av = axis.values;

    			axis.values = (
    				// static array of tick values
    				isArr(av) && !isArr(av[0]) ? fnOrSelf(av) :
    				// temporal
    				isTime ? (
    					// config array of fmtDate string tpls
    					isArr(av) ?
    						timeAxisVals(_tzDate, timeAxisStamps(av, _fmtDate)) :
    					// fmtDate string tpl
    					isStr(av) ?
    						timeAxisVal(_tzDate, av) :
    					av || _timeAxisVals
    				) : av || numAxisVals
    			);

    			axis.filter = fnOrSelf(axis.filter || (          sc.distr >= 3 ? logAxisValsFilt : retArg1));

    			axis.font      = pxRatioFont(axis.font);
    			axis.labelFont = pxRatioFont(axis.labelFont);

    			axis._size   = axis.size(self, null, i, 0);

    			axis._space  =
    			axis._rotate =
    			axis._incrs  =
    			axis._found  =	// foundIncrSpace
    			axis._splits =
    			axis._values = null;

    			if (axis._size > 0) {
    				sidesWithAxes[i] = true;
    				axis._el = placeDiv(AXIS, wrap);
    			}

    			// debug
    		//	axis._el.style.background = "#"  + Math.floor(Math.random()*16777215).toString(16) + '80';
    		}
    	}

    	function autoPadSide(self, side, sidesWithAxes, cycleNum) {
    		let [hasTopAxis, hasRgtAxis, hasBtmAxis, hasLftAxis] = sidesWithAxes;

    		let ori = side % 2;
    		let size = 0;

    		if (ori == 0 && (hasLftAxis || hasRgtAxis))
    			size = (side == 0 && !hasTopAxis || side == 2 && !hasBtmAxis ? round(xAxisOpts.size / 3) : 0);
    		if (ori == 1 && (hasTopAxis || hasBtmAxis))
    			size = (side == 1 && !hasRgtAxis || side == 3 && !hasLftAxis ? round(yAxisOpts.size / 2) : 0);

    		return size;
    	}

    	const padding = self.padding = (opts.padding || [autoPadSide,autoPadSide,autoPadSide,autoPadSide]).map(p => fnOrSelf(ifNull(p, autoPadSide)));
    	const _padding = self._padding = padding.map((p, i) => p(self, i, sidesWithAxes, 0));

    	let dataLen;

    	// rendered data window
    	let i0 = null;
    	let i1 = null;
    	const idxs = mode == 1 ? series[0].idxs : null;

    	let data0 = null;

    	let viaAutoScaleX = false;

    	function setData(_data, _resetScales) {
    		if (mode == 2) {
    			dataLen = 0;
    			for (let i = 1; i < series.length; i++)
    				dataLen += data[i][0].length;
    			self.data = data = _data;
    		}
    		else {
    			data = (_data || []).slice();
    			data[0] = data[0] || [];

    			self.data = data.slice();
    			data0 = data[0];
    			dataLen = data0.length;

    			if (xScaleDistr == 2)
    				data[0] = data0.map((v, i) => i);
    		}

    		self._data = data;

    		resetYSeries(true);

    		fire("setData");

    		if (_resetScales !== false) {
    			let xsc = scaleX;

    			if (xsc.auto(self, viaAutoScaleX))
    				autoScaleX();
    			else
    				_setScale(xScaleKey, xsc.min, xsc.max);

    			shouldSetCursor = cursor.left >= 0;
    			shouldSetLegend = true;
    			commit();
    		}
    	}

    	self.setData = setData;

    	function autoScaleX() {
    		viaAutoScaleX = true;

    		let _min, _max;

    		if (mode == 1) {
    			if (dataLen > 0) {
    				i0 = idxs[0] = 0;
    				i1 = idxs[1] = dataLen - 1;

    				_min = data[0][i0];
    				_max = data[0][i1];

    				if (xScaleDistr == 2) {
    					_min = i0;
    					_max = i1;
    				}
    				else if (dataLen == 1) {
    					if (xScaleDistr == 3)
    						[_min, _max] = rangeLog(_min, _min, scaleX.log, false);
    					else if (xScaleDistr == 4)
    						[_min, _max] = rangeAsinh(_min, _min, scaleX.log, false);
    					else if (scaleX.time)
    						_max = _min + round(86400 / ms);
    					else
    						[_min, _max] = rangeNum(_min, _max, rangePad, true);
    				}
    			}
    			else {
    				i0 = idxs[0] = _min = null;
    				i1 = idxs[1] = _max = null;
    			}
    		}

    		_setScale(xScaleKey, _min, _max);
    	}

    	let ctxStroke, ctxFill, ctxWidth, ctxDash, ctxJoin, ctxCap, ctxFont, ctxAlign, ctxBaseline;
    	let ctxAlpha;

    	function setCtxStyle(stroke = transparent, width, dash = EMPTY_ARR, cap = "butt", fill = transparent, join = "round") {
    		if (stroke != ctxStroke)
    			ctx.strokeStyle = ctxStroke = stroke;
    		if (fill != ctxFill)
    			ctx.fillStyle = ctxFill = fill;
    		if (width != ctxWidth)
    			ctx.lineWidth = ctxWidth = width;
    		if (join != ctxJoin)
    			ctx.lineJoin = ctxJoin = join;
    		if (cap != ctxCap)
    			ctx.lineCap = ctxCap = cap; // (‿|‿)
    		if (dash != ctxDash)
    			ctx.setLineDash(ctxDash = dash);
    	}

    	function setFontStyle(font, fill, align, baseline) {
    		if (fill != ctxFill)
    			ctx.fillStyle = ctxFill = fill;
    		if (font != ctxFont)
    			ctx.font = ctxFont = font;
    		if (align != ctxAlign)
    			ctx.textAlign = ctxAlign = align;
    		if (baseline != ctxBaseline)
    			ctx.textBaseline = ctxBaseline = baseline;
    	}

    	function accScale(wsc, psc, facet, data, sorted = 0) {
    		if (wsc.auto(self, viaAutoScaleX) && (psc == null || psc.min == null)) {
    			let _i0 = ifNull(i0, 0);
    			let _i1 = ifNull(i1, data.length - 1);

    			// only run getMinMax() for invalidated series data, else reuse
    			let minMax = facet.min == null ? (wsc.distr == 3 ? getMinMaxLog(data, _i0, _i1) : getMinMax(data, _i0, _i1, sorted)) : [facet.min, facet.max];

    			// initial min/max
    			wsc.min = min(wsc.min, facet.min = minMax[0]);
    			wsc.max = max(wsc.max, facet.max = minMax[1]);
    		}
    	}

    	function setScales() {
    	//	log("setScales()", arguments);

    		// wip scales
    		let wipScales = copy(scales, fastIsObj);

    		for (let k in wipScales) {
    			let wsc = wipScales[k];
    			let psc = pendScales[k];

    			if (psc != null && psc.min != null) {
    				assign$1(wsc, psc);

    				// explicitly setting the x-scale invalidates everything (acts as redraw)
    				if (k == xScaleKey)
    					resetYSeries(true);
    			}
    			else if (k != xScaleKey || mode == 2) {
    				if (dataLen == 0 && wsc.from == null) {
    					let minMax = wsc.range(self, null, null, k);
    					wsc.min = minMax[0];
    					wsc.max = minMax[1];
    				}
    				else {
    					wsc.min = inf;
    					wsc.max = -inf;
    				}
    			}
    		}

    		if (dataLen > 0) {
    			// pre-range y-scales from y series' data values
    			series.forEach((s, i) => {
    				if (mode == 1) {
    					let k = s.scale;
    					let wsc = wipScales[k];
    					let psc = pendScales[k];

    					if (i == 0) {
    						let minMax = wsc.range(self, wsc.min, wsc.max, k);

    						wsc.min = minMax[0];
    						wsc.max = minMax[1];

    						i0 = closestIdx(wsc.min, data[0]);
    						i1 = closestIdx(wsc.max, data[0]);

    						// closest indices can be outside of view
    						if (data[0][i0] < wsc.min)
    							i0++;
    						if (data[0][i1] > wsc.max)
    							i1--;

    						s.min = data0[i0];
    						s.max = data0[i1];
    					}
    					else if (s.show && s.auto)
    						accScale(wsc, psc, s, data[i], s.sorted);

    					s.idxs[0] = i0;
    					s.idxs[1] = i1;
    				}
    				else {
    					if (i > 0) {
    						if (s.show && s.auto) {
    							// TODO: only handles, assumes and requires facets[0] / 'x' scale, and facets[1] / 'y' scale
    							let [ xFacet, yFacet ] = s.facets;
    							let xScaleKey = xFacet.scale;
    							let yScaleKey = yFacet.scale;
    							let [ xData, yData ] = data[i];

    							accScale(wipScales[xScaleKey], pendScales[xScaleKey], xFacet, xData, xFacet.sorted);
    							accScale(wipScales[yScaleKey], pendScales[yScaleKey], yFacet, yData, yFacet.sorted);

    							// temp
    							s.min = yFacet.min;
    							s.max = yFacet.max;
    						}
    					}
    				}
    			});

    			// range independent scales
    			for (let k in wipScales) {
    				let wsc = wipScales[k];
    				let psc = pendScales[k];

    				if (wsc.from == null && (psc == null || psc.min == null)) {
    					let minMax = wsc.range(
    						self,
    						wsc.min ==  inf ? null : wsc.min,
    						wsc.max == -inf ? null : wsc.max,
    						k
    					);
    					wsc.min = minMax[0];
    					wsc.max = minMax[1];
    				}
    			}
    		}

    		// range dependent scales
    		for (let k in wipScales) {
    			let wsc = wipScales[k];

    			if (wsc.from != null) {
    				let base = wipScales[wsc.from];

    				if (base.min == null)
    					wsc.min = wsc.max = null;
    				else {
    					let minMax = wsc.range(self, base.min, base.max, k);
    					wsc.min = minMax[0];
    					wsc.max = minMax[1];
    				}
    			}
    		}

    		let changed = {};
    		let anyChanged = false;

    		for (let k in wipScales) {
    			let wsc = wipScales[k];
    			let sc = scales[k];

    			if (sc.min != wsc.min || sc.max != wsc.max) {
    				sc.min = wsc.min;
    				sc.max = wsc.max;

    				let distr = sc.distr;

    				sc._min = distr == 3 ? log10(sc.min) : distr == 4 ? asinh(sc.min, sc.asinh) : sc.min;
    				sc._max = distr == 3 ? log10(sc.max) : distr == 4 ? asinh(sc.max, sc.asinh) : sc.max;

    				changed[k] = anyChanged = true;
    			}
    		}

    		if (anyChanged) {
    			// invalidate paths of all series on changed scales
    			series.forEach((s, i) => {
    				if (mode == 2) {
    					if (i > 0 && changed.y)
    						s._paths = null;
    				}
    				else {
    					if (changed[s.scale])
    						s._paths = null;
    				}
    			});

    			for (let k in changed) {
    				shouldConvergeSize = true;
    				fire("setScale", k);
    			}

    			if (cursor.show)
    				shouldSetCursor = shouldSetLegend = cursor.left >= 0;
    		}

    		for (let k in pendScales)
    			pendScales[k] = null;
    	}

    	// grabs the nearest indices with y data outside of x-scale limits
    	function getOuterIdxs(ydata) {
    		let _i0 = clamp(i0 - 1, 0, dataLen - 1);
    		let _i1 = clamp(i1 + 1, 0, dataLen - 1);

    		while (ydata[_i0] == null && _i0 > 0)
    			_i0--;

    		while (ydata[_i1] == null && _i1 < dataLen - 1)
    			_i1++;

    		return [_i0, _i1];
    	}

    	function drawSeries() {
    		if (dataLen > 0) {
    			series.forEach((s, i) => {
    				if (i > 0 && s.show && s._paths == null) {
    					let _idxs = getOuterIdxs(data[i]);
    					s._paths = s.paths(self, i, _idxs[0], _idxs[1]);
    				}
    			});

    			series.forEach((s, i) => {
    				if (i > 0 && s.show) {
    					if (ctxAlpha != s.alpha)
    						ctx.globalAlpha = ctxAlpha = s.alpha;

    					{
    						cacheStrokeFill(i, false);
    						s._paths && drawPath(i, false);
    					}

    					{
    						cacheStrokeFill(i, true);

    						let show = s.points.show(self, i, i0, i1);
    						let idxs = s.points.filter(self, i, show, s._paths ? s._paths.gaps : null);

    						if (show || idxs) {
    							s.points._paths = s.points.paths(self, i, i0, i1, idxs);
    							drawPath(i, true);
    						}
    					}

    					if (ctxAlpha != 1)
    						ctx.globalAlpha = ctxAlpha = 1;

    					fire("drawSeries", i);
    				}
    			});
    		}
    	}

    	function cacheStrokeFill(si, _points) {
    		let s = _points ? series[si].points : series[si];

    		s._stroke = s.stroke(self, si);
    		s._fill   = s.fill(self, si);
    	}

    	function drawPath(si, _points) {
    		let s = _points ? series[si].points : series[si];

    		let strokeStyle = s._stroke;
    		let fillStyle   = s._fill;

    		let { stroke, fill, clip: gapsClip, flags } = s._paths;
    		let boundsClip = null;
    		let width = roundDec(s.width * pxRatio, 3);
    		let offset = (width % 2) / 2;

    		if (_points && fillStyle == null)
    			fillStyle = width > 0 ? "#fff" : strokeStyle;

    		let _pxAlign = s.pxAlign == 1;

    		_pxAlign && ctx.translate(offset, offset);

    		if (!_points) {
    			let lft = plotLft,
    				top = plotTop,
    				wid = plotWid,
    				hgt = plotHgt;

    			let halfWid = width * pxRatio / 2;

    			if (s.min == 0)
    				hgt += halfWid;

    			if (s.max == 0) {
    				top -= halfWid;
    				hgt += halfWid;
    			}

    			boundsClip = new Path2D();
    			boundsClip.rect(lft, top, wid, hgt);
    		}

    		// the points pathbuilder's gapsClip is its boundsClip, since points dont need gaps clipping, and bounds depend on point size
    		if (_points)
    			strokeFill(strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill, flags, gapsClip);
    		else
    			fillStroke(si, strokeStyle, width, s.dash, s.cap, fillStyle, stroke, fill, flags, boundsClip, gapsClip);

    		_pxAlign && ctx.translate(-offset, -offset);
    	}

    	function fillStroke(si, strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip) {
    		let didStrokeFill = false;

    		// for all bands where this series is the top edge, create upwards clips using the bottom edges
    		// and apply clips + fill with band fill or dfltFill
    		bands.forEach((b, bi) => {
    			// isUpperEdge?
    			if (b.series[0] == si) {
    				let lowerEdge = series[b.series[1]];
    				let lowerData = data[b.series[1]];

    				let bandClip = (lowerEdge._paths || EMPTY_OBJ).band;

    				if (isArr(bandClip))
    					bandClip = b.dir == 1 ? bandClip[0] : bandClip[1];

    				let gapsClip2;

    				let _fillStyle = null;

    				// hasLowerEdge?
    				if (lowerEdge.show && bandClip && hasData(lowerData, i0, i1)) {
    					_fillStyle = b.fill(self, bi) || fillStyle;
    					gapsClip2 = lowerEdge._paths.clip;
    				}
    				else
    					bandClip = null;

    				strokeFill(strokeStyle, lineWidth, lineDash, lineCap, _fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip, gapsClip2, bandClip);

    				didStrokeFill = true;
    			}
    		});

    		if (!didStrokeFill)
    			strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip);
    	}

    	const CLIP_FILL_STROKE = BAND_CLIP_FILL | BAND_CLIP_STROKE;

    	function strokeFill(strokeStyle, lineWidth, lineDash, lineCap, fillStyle, strokePath, fillPath, flags, boundsClip, gapsClip, gapsClip2, bandClip) {
    		setCtxStyle(strokeStyle, lineWidth, lineDash, lineCap, fillStyle);

    		if (boundsClip || gapsClip || bandClip) {
    			ctx.save();
    			boundsClip && ctx.clip(boundsClip);
    			gapsClip && ctx.clip(gapsClip);
    		}

    		if (bandClip) {
    			if ((flags & CLIP_FILL_STROKE) == CLIP_FILL_STROKE) {
    				ctx.clip(bandClip);
    				gapsClip2 && ctx.clip(gapsClip2);
    				doFill(fillStyle, fillPath);
    				doStroke(strokeStyle, strokePath, lineWidth);
    			}
    			else if (flags & BAND_CLIP_STROKE) {
    				doFill(fillStyle, fillPath);
    				ctx.clip(bandClip);
    				doStroke(strokeStyle, strokePath, lineWidth);
    			}
    			else if (flags & BAND_CLIP_FILL) {
    				ctx.save();
    				ctx.clip(bandClip);
    				gapsClip2 && ctx.clip(gapsClip2);
    				doFill(fillStyle, fillPath);
    				ctx.restore();
    				doStroke(strokeStyle, strokePath, lineWidth);
    			}
    		}
    		else {
    			doFill(fillStyle, fillPath);
    			doStroke(strokeStyle, strokePath, lineWidth);
    		}

    		if (boundsClip || gapsClip || bandClip)
    			ctx.restore();
    	}

    	function doStroke(strokeStyle, strokePath, lineWidth) {
    		if (lineWidth > 0) {
    			if (strokePath instanceof Map) {
    				strokePath.forEach((strokePath, strokeStyle) => {
    					ctx.strokeStyle = ctxStroke = strokeStyle;
    					ctx.stroke(strokePath);
    				});
    			}
    			else
    				strokePath != null && strokeStyle && ctx.stroke(strokePath);
    		}
    	}

    	function doFill(fillStyle, fillPath) {
    		if (fillPath instanceof Map) {
    			fillPath.forEach((fillPath, fillStyle) => {
    				ctx.fillStyle = ctxFill = fillStyle;
    				ctx.fill(fillPath);
    			});
    		}
    		else
    			fillPath != null && fillStyle && ctx.fill(fillPath);
    	}

    	function getIncrSpace(axisIdx, min, max, fullDim) {
    		let axis = axes[axisIdx];

    		let incrSpace;

    		if (fullDim <= 0)
    			incrSpace = [0, 0];
    		else {
    			let minSpace = axis._space = axis.space(self, axisIdx, min, max, fullDim);
    			let incrs    = axis._incrs = axis.incrs(self, axisIdx, min, max, fullDim, minSpace);
    			incrSpace    = findIncr(min, max, incrs, fullDim, minSpace);
    		}

    		return (axis._found = incrSpace);
    	}

    	function drawOrthoLines(offs, filts, ori, side, pos0, len, width, stroke, dash, cap) {
    		let offset = (width % 2) / 2;

    		pxAlign == 1 && ctx.translate(offset, offset);

    		setCtxStyle(stroke, width, dash, cap, stroke);

    		ctx.beginPath();

    		let x0, y0, x1, y1, pos1 = pos0 + (side == 0 || side == 3 ? -len : len);

    		if (ori == 0) {
    			y0 = pos0;
    			y1 = pos1;
    		}
    		else {
    			x0 = pos0;
    			x1 = pos1;
    		}

    		for (let i = 0; i < offs.length; i++) {
    			if (filts[i] != null) {
    				if (ori == 0)
    					x0 = x1 = offs[i];
    				else
    					y0 = y1 = offs[i];

    				ctx.moveTo(x0, y0);
    				ctx.lineTo(x1, y1);
    			}
    		}

    		ctx.stroke();

    		pxAlign == 1 && ctx.translate(-offset, -offset);
    	}

    	function axesCalc(cycleNum) {
    	//	log("axesCalc()", arguments);

    		let converged = true;

    		axes.forEach((axis, i) => {
    			if (!axis.show)
    				return;

    			let scale = scales[axis.scale];

    			if (scale.min == null) {
    				if (axis._show) {
    					converged = false;
    					axis._show = false;
    					resetYSeries(false);
    				}
    				return;
    			}
    			else {
    				if (!axis._show) {
    					converged = false;
    					axis._show = true;
    					resetYSeries(false);
    				}
    			}

    			let side = axis.side;
    			let ori = side % 2;

    			let {min, max} = scale;		// 		// should this toggle them ._show = false

    			let [_incr, _space] = getIncrSpace(i, min, max, ori == 0 ? plotWidCss : plotHgtCss);

    			if (_space == 0)
    				return;

    			// if we're using index positions, force first tick to match passed index
    			let forceMin = scale.distr == 2;

    			let _splits = axis._splits = axis.splits(self, i, min, max, _incr, _space, forceMin);

    			// tick labels
    			// BOO this assumes a specific data/series
    			let splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
    			let incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

    			let values = axis._values = axis.values(self, axis.filter(self, splits, i, _space, incr), i, _space, incr);

    			// rotating of labels only supported on bottom x axis
    			axis._rotate = side == 2 ? axis.rotate(self, values, i, _space) : 0;

    			let oldSize = axis._size;

    			axis._size = ceil(axis.size(self, values, i, cycleNum));

    			if (oldSize != null && axis._size != oldSize)			// ready && ?
    				converged = false;
    		});

    		return converged;
    	}

    	function paddingCalc(cycleNum) {
    		let converged = true;

    		padding.forEach((p, i) => {
    			let _p = p(self, i, sidesWithAxes, cycleNum);

    			if (_p != _padding[i])
    				converged = false;

    			_padding[i] = _p;
    		});

    		return converged;
    	}

    	function drawAxesGrid() {
    		for (let i = 0; i < axes.length; i++) {
    			let axis = axes[i];

    			if (!axis.show || !axis._show)
    				continue;

    			let side = axis.side;
    			let ori = side % 2;

    			let x, y;

    			let fillStyle = axis.stroke(self, i);

    			let shiftDir = side == 0 || side == 3 ? -1 : 1;

    			// axis label
    			if (axis.label) {
    				let shiftAmt = axis.labelGap * shiftDir;
    				let baseLpos = round((axis._lpos + shiftAmt) * pxRatio);

    				setFontStyle(axis.labelFont[0], fillStyle, "center", side == 2 ? TOP : BOTTOM);

    				ctx.save();

    				if (ori == 1) {
    					x = y = 0;

    					ctx.translate(
    						baseLpos,
    						round(plotTop + plotHgt / 2),
    					);
    					ctx.rotate((side == 3 ? -PI : PI) / 2);

    				}
    				else {
    					x = round(plotLft + plotWid / 2);
    					y = baseLpos;
    				}

    				ctx.fillText(axis.label, x, y);

    				ctx.restore();
    			}

    			let [_incr, _space] = axis._found;

    			if (_space == 0)
    				continue;

    			let scale = scales[axis.scale];

    			let plotDim = ori == 0 ? plotWid : plotHgt;
    			let plotOff = ori == 0 ? plotLft : plotTop;

    			let axisGap = round(axis.gap * pxRatio);

    			let _splits = axis._splits;

    			// tick labels
    			// BOO this assumes a specific data/series
    			let splits = scale.distr == 2 ? _splits.map(i => data0[i]) : _splits;
    			let incr   = scale.distr == 2 ? data0[_splits[1]] - data0[_splits[0]] : _incr;

    			let ticks = axis.ticks;
    			let border = axis.border;
    			let tickSize = ticks.show ? round(ticks.size * pxRatio) : 0;

    			// rotating of labels only supported on bottom x axis
    			let angle = axis._rotate * -PI/180;

    			let basePos  = pxRound(axis._pos * pxRatio);
    			let shiftAmt = (tickSize + axisGap) * shiftDir;
    			let finalPos = basePos + shiftAmt;
    			    y        = ori == 0 ? finalPos : 0;
    			    x        = ori == 1 ? finalPos : 0;

    			let font         = axis.font[0];
    			let textAlign    = axis.align == 1 ? LEFT :
    			                   axis.align == 2 ? RIGHT :
    			                   angle > 0 ? LEFT :
    			                   angle < 0 ? RIGHT :
    			                   ori == 0 ? "center" : side == 3 ? RIGHT : LEFT;
    			let textBaseline = angle ||
    			                   ori == 1 ? "middle" : side == 2 ? TOP   : BOTTOM;

    			setFontStyle(font, fillStyle, textAlign, textBaseline);

    			let lineHeight = axis.font[1] * lineMult;

    			let canOffs = _splits.map(val => pxRound(getPos(val, scale, plotDim, plotOff)));

    			let _values = axis._values;

    			for (let i = 0; i < _values.length; i++) {
    				let val = _values[i];

    				if (val != null) {
    					if (ori == 0)
    						x = canOffs[i];
    					else
    						y = canOffs[i];

    					val = "" + val;

    					let _parts = val.indexOf("\n") == -1 ? [val] : val.split(/\n/gm);

    					for (let j = 0; j < _parts.length; j++) {
    						let text = _parts[j];

    						if (angle) {
    							ctx.save();
    							ctx.translate(x, y + j * lineHeight); // can this be replaced with position math?
    							ctx.rotate(angle); // can this be done once?
    							ctx.fillText(text, 0, 0);
    							ctx.restore();
    						}
    						else
    							ctx.fillText(text, x, y + j * lineHeight);
    					}
    				}
    			}

    			// ticks
    			if (ticks.show) {
    				drawOrthoLines(
    					canOffs,
    					ticks.filter(self, splits, i, _space, incr),
    					ori,
    					side,
    					basePos,
    					tickSize,
    					roundDec(ticks.width * pxRatio, 3),
    					ticks.stroke(self, i),
    					ticks.dash,
    					ticks.cap,
    				);
    			}

    			// grid
    			let grid = axis.grid;

    			if (grid.show) {
    				drawOrthoLines(
    					canOffs,
    					grid.filter(self, splits, i, _space, incr),
    					ori,
    					ori == 0 ? 2 : 1,
    					ori == 0 ? plotTop : plotLft,
    					ori == 0 ? plotHgt : plotWid,
    					roundDec(grid.width * pxRatio, 3),
    					grid.stroke(self, i),
    					grid.dash,
    					grid.cap,
    				);
    			}

    			if (border.show) {
    				drawOrthoLines(
    					[basePos],
    					[1],
    					ori == 0 ? 1 : 0,
    					ori == 0 ? 1 : 2,
    					ori == 1 ? plotTop : plotLft,
    					ori == 1 ? plotHgt : plotWid,
    					roundDec(border.width * pxRatio, 3),
    					border.stroke(self, i),
    					border.dash,
    					border.cap,
    				);
    			}
    		}

    		fire("drawAxes");
    	}

    	function resetYSeries(minMax) {
    	//	log("resetYSeries()", arguments);

    		series.forEach((s, i) => {
    			if (i > 0) {
    				s._paths = null;

    				if (minMax) {
    					if (mode == 1) {
    						s.min = null;
    						s.max = null;
    					}
    					else {
    						s.facets.forEach(f => {
    							f.min = null;
    							f.max = null;
    						});
    					}
    				}
    			}
    		});
    	}

    	let queuedCommit = false;

    	function commit() {
    		if (!queuedCommit) {
    			microTask(_commit);
    			queuedCommit = true;
    		}
    	}

    	function _commit() {
    	//	log("_commit()", arguments);

    		if (shouldSetScales) {
    			setScales();
    			shouldSetScales = false;
    		}

    		if (shouldConvergeSize) {
    			convergeSize();
    			shouldConvergeSize = false;
    		}

    		if (shouldSetSize) {
    			setStylePx(under, LEFT,   plotLftCss);
    			setStylePx(under, TOP,    plotTopCss);
    			setStylePx(under, WIDTH,  plotWidCss);
    			setStylePx(under, HEIGHT, plotHgtCss);

    			setStylePx(over, LEFT,    plotLftCss);
    			setStylePx(over, TOP,     plotTopCss);
    			setStylePx(over, WIDTH,   plotWidCss);
    			setStylePx(over, HEIGHT,  plotHgtCss);

    			setStylePx(wrap, WIDTH,   fullWidCss);
    			setStylePx(wrap, HEIGHT,  fullHgtCss);

    			// NOTE: mutating this during print preview in Chrome forces transparent
    			// canvas pixels to white, even when followed up with clearRect() below
    			can.width  = round(fullWidCss * pxRatio);
    			can.height = round(fullHgtCss * pxRatio);

    			axes.forEach(({ _el, _show, _size, _pos, side }) => {
    				if (_el != null) {
    					if (_show) {
    						let posOffset = (side === 3 || side === 0 ? _size : 0);
    						let isVt = side % 2 == 1;

    						setStylePx(_el, isVt ? "left"   : "top",    _pos - posOffset);
    						setStylePx(_el, isVt ? "width"  : "height", _size);
    						setStylePx(_el, isVt ? "top"    : "left",   isVt ? plotTopCss : plotLftCss);
    						setStylePx(_el, isVt ? "height" : "width",  isVt ? plotHgtCss : plotWidCss);

    						remClass(_el, OFF);
    					}
    					else
    						addClass(_el, OFF);
    				}
    			});

    			// invalidate ctx style cache
    			ctxStroke = ctxFill = ctxWidth = ctxJoin = ctxCap = ctxFont = ctxAlign = ctxBaseline = ctxDash = null;
    			ctxAlpha = 1;

    			syncRect(false);

    			fire("setSize");

    			shouldSetSize = false;
    		}

    		if (fullWidCss > 0 && fullHgtCss > 0) {
    			ctx.clearRect(0, 0, can.width, can.height);
    			fire("drawClear");
    			drawOrder.forEach(fn => fn());
    			fire("draw");
    		}

    	//	if (shouldSetSelect) {
    		// TODO: update .u-select metrics (if visible)
    		//	setStylePx(selectDiv, TOP, select.top = 0);
    		//	setStylePx(selectDiv, LEFT, select.left = 0);
    		//	setStylePx(selectDiv, WIDTH, select.width = 0);
    		//	setStylePx(selectDiv, HEIGHT, select.height = 0);
    		//	shouldSetSelect = false;
    	//	}

    		if (cursor.show && shouldSetCursor) {
    			updateCursor(null, true, false);
    			shouldSetCursor = false;
    		}

    	//	if (FEAT_LEGEND && legend.show && legend.live && shouldSetLegend) {}

    		if (!ready) {
    			ready = true;
    			self.status = 1;

    			fire("ready");
    		}

    		viaAutoScaleX = false;

    		queuedCommit = false;
    	}

    	self.redraw = (rebuildPaths, recalcAxes) => {
    		shouldConvergeSize = recalcAxes || false;

    		if (rebuildPaths !== false)
    			_setScale(xScaleKey, scaleX.min, scaleX.max);
    		else
    			commit();
    	};

    	// redraw() => setScale('x', scales.x.min, scales.x.max);

    	// explicit, never re-ranged (is this actually true? for x and y)
    	function setScale(key, opts) {
    		let sc = scales[key];

    		if (sc.from == null) {
    			if (dataLen == 0) {
    				let minMax = sc.range(self, opts.min, opts.max, key);
    				opts.min = minMax[0];
    				opts.max = minMax[1];
    			}

    			if (opts.min > opts.max) {
    				let _min = opts.min;
    				opts.min = opts.max;
    				opts.max = _min;
    			}

    			if (dataLen > 1 && opts.min != null && opts.max != null && opts.max - opts.min < 1e-16)
    				return;

    			if (key == xScaleKey) {
    				if (sc.distr == 2 && dataLen > 0) {
    					opts.min = closestIdx(opts.min, data[0]);
    					opts.max = closestIdx(opts.max, data[0]);

    					if (opts.min == opts.max)
    						opts.max++;
    				}
    			}

    		//	log("setScale()", arguments);

    			pendScales[key] = opts;

    			shouldSetScales = true;
    			commit();
    		}
    	}

    	self.setScale = setScale;

    //	INTERACTION

    	let xCursor;
    	let yCursor;
    	let vCursor;
    	let hCursor;

    	// starting position before cursor.move
    	let rawMouseLeft0;
    	let rawMouseTop0;

    	// starting position
    	let mouseLeft0;
    	let mouseTop0;

    	// current position before cursor.move
    	let rawMouseLeft1;
    	let rawMouseTop1;

    	// current position
    	let mouseLeft1;
    	let mouseTop1;

    	let dragging = false;

    	const drag = cursor.drag;

    	let dragX = drag.x;
    	let dragY = drag.y;

    	if (cursor.show) {
    		if (cursor.x)
    			xCursor = placeDiv(CURSOR_X, over);
    		if (cursor.y)
    			yCursor = placeDiv(CURSOR_Y, over);

    		if (scaleX.ori == 0) {
    			vCursor = xCursor;
    			hCursor = yCursor;
    		}
    		else {
    			vCursor = yCursor;
    			hCursor = xCursor;
    		}

    		mouseLeft1 = cursor.left;
    		mouseTop1 = cursor.top;
    	}

    	const select = self.select = assign$1({
    		show:   true,
    		over:   true,
    		left:   0,
    		width:  0,
    		top:    0,
    		height: 0,
    	}, opts.select);

    	const selectDiv = select.show ? placeDiv(SELECT, select.over ? over : under) : null;

    	function setSelect(opts, _fire) {
    		if (select.show) {
    			for (let prop in opts)
    				setStylePx(selectDiv, prop, select[prop] = opts[prop]);

    			_fire !== false && fire("setSelect");
    		}
    	}

    	self.setSelect = setSelect;

    	function toggleDOM(i, onOff) {
    		let s = series[i];
    		let label = showLegend ? legendRows[i] : null;

    		if (s.show)
    			label && remClass(label, OFF);
    		else {
    			label && addClass(label, OFF);
    			cursorPts.length > 1 && elTrans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
    		}
    	}

    	function _setScale(key, min, max) {
    		setScale(key, {min, max});
    	}

    	function setSeries(i, opts, _fire, _pub) {
    	//	log("setSeries()", arguments);

    		let s = series[i];

    		if (opts.focus != null)
    			setFocus(i);

    		if (opts.show != null) {
    			s.show = opts.show;
    			toggleDOM(i, opts.show);

    			_setScale(mode == 2 ? s.facets[1].scale : s.scale, null, null);
    			commit();
    		}

    		_fire !== false && fire("setSeries", i, opts);

    		_pub && pubSync("setSeries", self, i, opts);
    	}

    	self.setSeries = setSeries;

    	function setBand(bi, opts) {
    		assign$1(bands[bi], opts);
    	}

    	function addBand(opts, bi) {
    		opts.fill = fnOrSelf(opts.fill || null);
    		opts.dir = ifNull(opts.dir, -1);
    		bi = bi == null ? bands.length : bi;
    		bands.splice(bi, 0, opts);
    	}

    	function delBand(bi) {
    		if (bi == null)
    			bands.length = 0;
    		else
    			bands.splice(bi, 1);
    	}

    	self.addBand = addBand;
    	self.setBand = setBand;
    	self.delBand = delBand;

    	function setAlpha(i, value) {
    		series[i].alpha = value;

    		if (cursor.show && cursorPts[i])
    			cursorPts[i].style.opacity = value;

    		if (showLegend && legendRows[i])
    			legendRows[i].style.opacity = value;
    	}

    	// y-distance
    	let closestDist;
    	let closestSeries;
    	let focusedSeries;
    	const FOCUS_TRUE  = {focus: true};

    	function setFocus(i) {
    		if (i != focusedSeries) {
    		//	log("setFocus()", arguments);

    			let allFocused = i == null;

    			let _setAlpha = focus.alpha != 1;

    			series.forEach((s, i2) => {
    				let isFocused = allFocused || i2 == 0 || i2 == i;
    				s._focus = allFocused ? null : isFocused;
    				_setAlpha && setAlpha(i2, isFocused ? 1 : focus.alpha);
    			});

    			focusedSeries = i;
    			_setAlpha && commit();
    		}
    	}

    	if (showLegend && cursorFocus) {
    		on(mouseleave, legendEl, e => {
    			if (cursor._lock)
    				return;

    			if (focusedSeries != null)
    				setSeries(null, FOCUS_TRUE, true, syncOpts.setSeries);
    		});
    	}

    	function posToVal(pos, scale, can) {
    		let sc = scales[scale];

    		if (can)
    			pos = pos / pxRatio - (sc.ori == 1 ? plotTopCss : plotLftCss);

    		let dim = plotWidCss;

    		if (sc.ori == 1) {
    			dim = plotHgtCss;
    			pos = dim - pos;
    		}

    		if (sc.dir == -1)
    			pos = dim - pos;

    		let _min = sc._min,
    			_max = sc._max,
    			pct = pos / dim;

    		let sv = _min + (_max - _min) * pct;

    		let distr = sc.distr;

    		return (
    			distr == 3 ? pow(10, sv) :
    			distr == 4 ? sinh(sv, sc.asinh) :
    			sv
    		);
    	}

    	function closestIdxFromXpos(pos, can) {
    		let v = posToVal(pos, xScaleKey, can);
    		return closestIdx(v, data[0], i0, i1);
    	}

    	self.valToIdx = val => closestIdx(val, data[0]);
    	self.posToIdx = closestIdxFromXpos;
    	self.posToVal = posToVal;
    	self.valToPos = (val, scale, can) => (
    		scales[scale].ori == 0 ?
    		getHPos(val, scales[scale],
    			can ? plotWid : plotWidCss,
    			can ? plotLft : 0,
    		) :
    		getVPos(val, scales[scale],
    			can ? plotHgt : plotHgtCss,
    			can ? plotTop : 0,
    		)
    	);

    	// defers calling expensive functions
    	function batch(fn) {
    		fn(self);
    		commit();
    	}

    	self.batch = batch;

    	(self.setCursor = (opts, _fire, _pub) => {
    		mouseLeft1 = opts.left;
    		mouseTop1 = opts.top;
    	//	assign(cursor, opts);
    		updateCursor(null, _fire, _pub);
    	});

    	function setSelH(off, dim) {
    		setStylePx(selectDiv, LEFT,  select.left = off);
    		setStylePx(selectDiv, WIDTH, select.width = dim);
    	}

    	function setSelV(off, dim) {
    		setStylePx(selectDiv, TOP,    select.top = off);
    		setStylePx(selectDiv, HEIGHT, select.height = dim);
    	}

    	let setSelX = scaleX.ori == 0 ? setSelH : setSelV;
    	let setSelY = scaleX.ori == 1 ? setSelH : setSelV;

    	function syncLegend() {
    		if (showLegend && legend.live) {
    			for (let i = mode == 2 ? 1 : 0; i < series.length; i++) {
    				if (i == 0 && multiValLegend)
    					continue;

    				let vals = legend.values[i];

    				let j = 0;

    				for (let k in vals)
    					legendCells[i][j++].firstChild.nodeValue = vals[k];
    			}
    		}
    	}

    	function setLegend(opts, _fire) {
    		if (opts != null) {
    			let idx = opts.idx;

    			legend.idx = idx;
    			series.forEach((s, sidx) => {
    				(sidx > 0 || !multiValLegend) && setLegendValues(sidx, idx);
    			});
    		}

    		if (showLegend && legend.live)
    			syncLegend();

    		shouldSetLegend = false;

    		_fire !== false && fire("setLegend");
    	}

    	self.setLegend = setLegend;

    	function setLegendValues(sidx, idx) {
    		let val;

    		if (idx == null)
    			val = NULL_LEGEND_VALUES;
    		else {
    			let s = series[sidx];
    			let src = sidx == 0 && xScaleDistr == 2 ? data0 : data[sidx];
    			val = multiValLegend ? s.values(self, sidx, idx) : {_: s.value(self, src[idx], sidx, idx)};
    		}

    		legend.values[sidx] = val;
    	}

    	function updateCursor(src, _fire, _pub) {
    	//	ts == null && log("updateCursor()", arguments);

    		rawMouseLeft1 = mouseLeft1;
    		rawMouseTop1 = mouseTop1;

    		[mouseLeft1, mouseTop1] = cursor.move(self, mouseLeft1, mouseTop1);

    		if (cursor.show) {
    			vCursor && elTrans(vCursor, round(mouseLeft1), 0, plotWidCss, plotHgtCss);
    			hCursor && elTrans(hCursor, 0, round(mouseTop1), plotWidCss, plotHgtCss);
    		}

    		let idx;

    		// when zooming to an x scale range between datapoints the binary search
    		// for nearest min/max indices results in this condition. cheap hack :D
    		let noDataInRange = i0 > i1; // works for mode 1 only

    		closestDist = inf;

    		// TODO: extract
    		let xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss;
    		let yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss;

    		// if cursor hidden, hide points & clear legend vals
    		if (mouseLeft1 < 0 || dataLen == 0 || noDataInRange) {
    			idx = null;

    			for (let i = 0; i < series.length; i++) {
    				if (i > 0) {
    					cursorPts.length > 1 && elTrans(cursorPts[i], -10, -10, plotWidCss, plotHgtCss);
    				}
    			}

    			if (cursorFocus)
    				setSeries(null, FOCUS_TRUE, true, src == null && syncOpts.setSeries);

    			if (legend.live) {
    				activeIdxs.fill(null);
    				shouldSetLegend = true;

    				for (let i = 0; i < series.length; i++)
    					legend.values[i] = NULL_LEGEND_VALUES;
    			}
    		}
    		else {
    		//	let pctY = 1 - (y / rect.height);

    			let mouseXPos, valAtPosX, xPos;

    			if (mode == 1) {
    				mouseXPos = scaleX.ori == 0 ? mouseLeft1 : mouseTop1;
    				valAtPosX = posToVal(mouseXPos, xScaleKey);
    				idx = closestIdx(valAtPosX, data[0], i0, i1);
    				xPos = incrRoundUp(valToPosX(data[0][idx], scaleX, xDim, 0), 0.5);
    			}

    			for (let i = mode == 2 ? 1 : 0; i < series.length; i++) {
    				let s = series[i];

    				let idx1  = activeIdxs[i];
    				let yVal1 = mode == 1 ? data[i][idx1] : data[i][1][idx1];

    				let idx2  = cursor.dataIdx(self, i, idx, valAtPosX);
    				let yVal2 = mode == 1 ? data[i][idx2] : data[i][1][idx2];

    				shouldSetLegend = shouldSetLegend || yVal2 != yVal1 || idx2 != idx1;

    				activeIdxs[i] = idx2;

    				let xPos2 = idx2 == idx ? xPos : incrRoundUp(valToPosX(mode == 1 ? data[0][idx2] : data[i][0][idx2], scaleX, xDim, 0), 0.5);

    				if (i > 0 && s.show) {
    					let yPos = yVal2 == null ? -10 : incrRoundUp(valToPosY(yVal2, mode == 1 ? scales[s.scale] : scales[s.facets[1].scale], yDim, 0), 0.5);

    					if (yPos > 0 && mode == 1) {
    						let dist = abs(yPos - mouseTop1);

    						if (dist <= closestDist) {
    							closestDist = dist;
    							closestSeries = i;
    						}
    					}

    					let hPos, vPos;

    					if (scaleX.ori == 0) {
    						hPos = xPos2;
    						vPos = yPos;
    					}
    					else {
    						hPos = yPos;
    						vPos = xPos2;
    					}

    					if (shouldSetLegend && cursorPts.length > 1) {
    						elColor(cursorPts[i], cursor.points.fill(self, i), cursor.points.stroke(self, i));

    						let ptWid, ptHgt, ptLft, ptTop,
    							centered = true,
    							getBBox = cursor.points.bbox;

    						if (getBBox != null) {
    							centered = false;

    							let bbox = getBBox(self, i);

    							ptLft = bbox.left;
    							ptTop = bbox.top;
    							ptWid = bbox.width;
    							ptHgt = bbox.height;
    						}
    						else {
    							ptLft = hPos;
    							ptTop = vPos;
    							ptWid = ptHgt = cursor.points.size(self, i);
    						}

    						elSize(cursorPts[i], ptWid, ptHgt, centered);
    						elTrans(cursorPts[i], ptLft, ptTop, plotWidCss, plotHgtCss);
    					}
    				}

    				if (legend.live) {
    					if (!shouldSetLegend || i == 0 && multiValLegend)
    						continue;

    					setLegendValues(i, idx2);
    				}
    			}
    		}

    		cursor.idx = idx;
    		cursor.left = mouseLeft1;
    		cursor.top = mouseTop1;

    		if (shouldSetLegend) {
    			legend.idx = idx;
    			setLegend();
    		}

    		// nit: cursor.drag.setSelect is assumed always true
    		if (select.show && dragging) {
    			if (src != null) {
    				let [xKey, yKey] = syncOpts.scales;
    				let [matchXKeys, matchYKeys] = syncOpts.match;
    				let [xKeySrc, yKeySrc] = src.cursor.sync.scales;

    				// match the dragX/dragY implicitness/explicitness of src
    				let sdrag = src.cursor.drag;
    				dragX = sdrag._x;
    				dragY = sdrag._y;

    				if (dragX || dragY) {
    					let { left, top, width, height } = src.select;

    					let sori = src.scales[xKey].ori;
    					let sPosToVal = src.posToVal;

    					let sOff, sDim, sc, a, b;

    					let matchingX = xKey != null && matchXKeys(xKey, xKeySrc);
    					let matchingY = yKey != null && matchYKeys(yKey, yKeySrc);

    					if (matchingX) {
    						if (sori == 0) {
    							sOff = left;
    							sDim = width;
    						}
    						else {
    							sOff = top;
    							sDim = height;
    						}

    						sc = scales[xKey];

    						a = valToPosX(sPosToVal(sOff, xKeySrc),        sc, xDim, 0);
    						b = valToPosX(sPosToVal(sOff + sDim, xKeySrc), sc, xDim, 0);

    						setSelX(min(a,b), abs(b-a));
    					}
    					else
    						setSelX(0, xDim);

    					if (matchingY) {
    						if (sori == 1) {
    							sOff = left;
    							sDim = width;
    						}
    						else {
    							sOff = top;
    							sDim = height;
    						}

    						sc = scales[yKey];

    						a = valToPosY(sPosToVal(sOff, yKeySrc),        sc, yDim, 0);
    						b = valToPosY(sPosToVal(sOff + sDim, yKeySrc), sc, yDim, 0);

    						setSelY(min(a,b), abs(b-a));
    					}
    					else
    						setSelY(0, yDim);
    				}
    				else
    					hideSelect();
    			}
    			else {
    				let rawDX = abs(rawMouseLeft1 - rawMouseLeft0);
    				let rawDY = abs(rawMouseTop1 - rawMouseTop0);

    				if (scaleX.ori == 1) {
    					let _rawDX = rawDX;
    					rawDX = rawDY;
    					rawDY = _rawDX;
    				}

    				dragX = drag.x && rawDX >= drag.dist;
    				dragY = drag.y && rawDY >= drag.dist;

    				let uni = drag.uni;

    				if (uni != null) {
    					// only calc drag status if they pass the dist thresh
    					if (dragX && dragY) {
    						dragX = rawDX >= uni;
    						dragY = rawDY >= uni;

    						// force unidirectionality when both are under uni limit
    						if (!dragX && !dragY) {
    							if (rawDY > rawDX)
    								dragY = true;
    							else
    								dragX = true;
    						}
    					}
    				}
    				else if (drag.x && drag.y && (dragX || dragY))
    					// if omni with no uni then both dragX / dragY should be true if either is true
    					dragX = dragY = true;

    				let p0, p1;

    				if (dragX) {
    					if (scaleX.ori == 0) {
    						p0 = mouseLeft0;
    						p1 = mouseLeft1;
    					}
    					else {
    						p0 = mouseTop0;
    						p1 = mouseTop1;
    					}

    					setSelX(min(p0, p1), abs(p1 - p0));

    					if (!dragY)
    						setSelY(0, yDim);
    				}

    				if (dragY) {
    					if (scaleX.ori == 1) {
    						p0 = mouseLeft0;
    						p1 = mouseLeft1;
    					}
    					else {
    						p0 = mouseTop0;
    						p1 = mouseTop1;
    					}

    					setSelY(min(p0, p1), abs(p1 - p0));

    					if (!dragX)
    						setSelX(0, xDim);
    				}

    				// the drag didn't pass the dist requirement
    				if (!dragX && !dragY) {
    					setSelX(0, 0);
    					setSelY(0, 0);
    				}
    			}
    		}

    		drag._x = dragX;
    		drag._y = dragY;

    		if (src == null) {
    			if (_pub) {
    				if (syncKey != null) {
    					let [xSyncKey, ySyncKey] = syncOpts.scales;

    					syncOpts.values[0] = xSyncKey != null ? posToVal(scaleX.ori == 0 ? mouseLeft1 : mouseTop1, xSyncKey) : null;
    					syncOpts.values[1] = ySyncKey != null ? posToVal(scaleX.ori == 1 ? mouseLeft1 : mouseTop1, ySyncKey) : null;
    				}

    				pubSync(mousemove, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, idx);
    			}

    			if (cursorFocus) {
    				let shouldPub = _pub && syncOpts.setSeries;
    				let p = focus.prox;

    				if (focusedSeries == null) {
    					if (closestDist <= p)
    						setSeries(closestSeries, FOCUS_TRUE, true, shouldPub);
    				}
    				else {
    					if (closestDist > p)
    						setSeries(null, FOCUS_TRUE, true, shouldPub);
    					else if (closestSeries != focusedSeries)
    						setSeries(closestSeries, FOCUS_TRUE, true, shouldPub);
    				}
    			}
    		}

    		ready && _fire !== false && fire("setCursor");
    	}

    	let rect = null;

    	function syncRect(defer) {
    		if (defer === true)
    			rect = null;
    		else {
    			rect = over.getBoundingClientRect();
    			fire("syncRect", rect);
    		}
    	}

    	function mouseMove(e, src, _l, _t, _w, _h, _i) {
    		if (cursor._lock)
    			return;

    		cacheMouse(e, src, _l, _t, _w, _h, _i, false, e != null);

    		if (e != null)
    			updateCursor(null, true, true);
    		else
    			updateCursor(src, true, false);
    	}

    	function cacheMouse(e, src, _l, _t, _w, _h, _i, initial, snap) {
    		if (rect == null)
    			syncRect(false);

    		if (e != null) {
    			_l = e.clientX - rect.left;
    			_t = e.clientY - rect.top;
    		}
    		else {
    			if (_l < 0 || _t < 0) {
    				mouseLeft1 = -10;
    				mouseTop1 = -10;
    				return;
    			}

    			let [xKey, yKey] = syncOpts.scales;

    			let syncOptsSrc = src.cursor.sync;
    			let [xValSrc, yValSrc] = syncOptsSrc.values;
    			let [xKeySrc, yKeySrc] = syncOptsSrc.scales;
    			let [matchXKeys, matchYKeys] = syncOpts.match;

    			let rotSrc = src.axes[0].side % 2 == 1;

    			let xDim = scaleX.ori == 0 ? plotWidCss : plotHgtCss,
    				yDim = scaleX.ori == 1 ? plotWidCss : plotHgtCss,
    				_xDim = rotSrc ? _h : _w,
    				_yDim = rotSrc ? _w : _h,
    				_xPos = rotSrc ? _t : _l,
    				_yPos = rotSrc ? _l : _t;

    			if (xKeySrc != null)
    				_l = matchXKeys(xKey, xKeySrc) ? getPos(xValSrc, scales[xKey], xDim, 0) : -10;
    			else
    				_l = xDim * (_xPos/_xDim);

    			if (yKeySrc != null)
    				_t = matchYKeys(yKey, yKeySrc) ? getPos(yValSrc, scales[yKey], yDim, 0) : -10;
    			else
    				_t = yDim * (_yPos/_yDim);

    			if (scaleX.ori == 1) {
    				let __l = _l;
    				_l = _t;
    				_t = __l;
    			}
    		}

    		if (snap) {
    			if (_l <= 1 || _l >= plotWidCss - 1)
    				_l = incrRound(_l, plotWidCss);

    			if (_t <= 1 || _t >= plotHgtCss - 1)
    				_t = incrRound(_t, plotHgtCss);
    		}

    		if (initial) {
    			rawMouseLeft0 = _l;
    			rawMouseTop0 = _t;

    			[mouseLeft0, mouseTop0] = cursor.move(self, _l, _t);
    		}
    		else {
    			mouseLeft1 = _l;
    			mouseTop1 = _t;
    		}
    	}

    	const _hideProps = {
    		width: 0,
    		height: 0,
    	};

    	function hideSelect() {
    		setSelect(_hideProps, false);
    	}

    	function mouseDown(e, src, _l, _t, _w, _h, _i) {
    		dragging = true;
    		dragX = dragY = drag._x = drag._y = false;

    		cacheMouse(e, src, _l, _t, _w, _h, _i, true, false);

    		if (e != null) {
    			onMouse(mouseup, doc, mouseUp);
    			pubSync(mousedown, self, mouseLeft0, mouseTop0, plotWidCss, plotHgtCss, null);
    		}
    	}

    	function mouseUp(e, src, _l, _t, _w, _h, _i) {
    		dragging = drag._x = drag._y = false;

    		cacheMouse(e, src, _l, _t, _w, _h, _i, false, true);

    		let { left, top, width, height } = select;

    		let hasSelect = width > 0 || height > 0;

    		hasSelect && setSelect(select);

    		if (drag.setScale && hasSelect) {
    		//	if (syncKey != null) {
    		//		dragX = drag.x;
    		//		dragY = drag.y;
    		//	}

    			let xOff = left,
    				xDim = width,
    				yOff = top,
    				yDim = height;

    			if (scaleX.ori == 1) {
    				xOff = top,
    				xDim = height,
    				yOff = left,
    				yDim = width;
    			}

    			if (dragX) {
    				_setScale(xScaleKey,
    					posToVal(xOff, xScaleKey),
    					posToVal(xOff + xDim, xScaleKey)
    				);
    			}

    			if (dragY) {
    				for (let k in scales) {
    					let sc = scales[k];

    					if (k != xScaleKey && sc.from == null && sc.min != inf) {
    						_setScale(k,
    							posToVal(yOff + yDim, k),
    							posToVal(yOff, k)
    						);
    					}
    				}
    			}

    			hideSelect();
    		}
    		else if (cursor.lock) {
    			cursor._lock = !cursor._lock;

    			if (!cursor._lock)
    				updateCursor(null, true, false);
    		}

    		if (e != null) {
    			offMouse(mouseup, doc);
    			pubSync(mouseup, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
    		}
    	}

    	function mouseLeave(e, src, _l, _t, _w, _h, _i) {
    		if (!cursor._lock) {
    			let _dragging = dragging;

    			if (dragging) {
    				// handle case when mousemove aren't fired all the way to edges by browser
    				let snapH = true;
    				let snapV = true;
    				let snapProx = 10;

    				let dragH, dragV;

    				if (scaleX.ori == 0) {
    					dragH = dragX;
    					dragV = dragY;
    				}
    				else {
    					dragH = dragY;
    					dragV = dragX;
    				}

    				if (dragH && dragV) {
    					// maybe omni corner snap
    					snapH = mouseLeft1 <= snapProx || mouseLeft1 >= plotWidCss - snapProx;
    					snapV = mouseTop1  <= snapProx || mouseTop1  >= plotHgtCss - snapProx;
    				}

    				if (dragH && snapH)
    					mouseLeft1 = mouseLeft1 < mouseLeft0 ? 0 : plotWidCss;

    				if (dragV && snapV)
    					mouseTop1 = mouseTop1 < mouseTop0 ? 0 : plotHgtCss;

    				updateCursor(null, true, true);

    				dragging = false;
    			}

    			mouseLeft1 = -10;
    			mouseTop1 = -10;

    			// passing a non-null timestamp to force sync/mousemove event
    			updateCursor(null, true, true);

    			if (_dragging)
    				dragging = _dragging;
    		}
    	}

    	function dblClick(e, src, _l, _t, _w, _h, _i) {
    		autoScaleX();

    		hideSelect();

    		if (e != null)
    			pubSync(dblclick, self, mouseLeft1, mouseTop1, plotWidCss, plotHgtCss, null);
    	}

    	function syncPxRatio() {
    		axes.forEach(syncFontSize);
    		_setSize(self.width, self.height, true);
    	}

    	on(dppxchange, win, syncPxRatio);

    	// internal pub/sub
    	const events = {};

    	events.mousedown = mouseDown;
    	events.mousemove = mouseMove;
    	events.mouseup = mouseUp;
    	events.dblclick = dblClick;
    	events["setSeries"] = (e, src, idx, opts) => {
    		setSeries(idx, opts, true, false);
    	};

    	if (cursor.show) {
    		onMouse(mousedown,  over, mouseDown);
    		onMouse(mousemove,  over, mouseMove);
    		onMouse(mouseenter, over, syncRect);
    		onMouse(mouseleave, over, mouseLeave);

    		onMouse(dblclick, over, dblClick);

    		cursorPlots.add(self);

    		self.syncRect = syncRect;
    	}

    	// external on/off
    	const hooks = self.hooks = opts.hooks || {};

    	function fire(evName, a1, a2) {
    		if (evName in hooks) {
    			hooks[evName].forEach(fn => {
    				fn.call(null, self, a1, a2);
    			});
    		}
    	}

    	(opts.plugins || []).forEach(p => {
    		for (let evName in p.hooks)
    			hooks[evName] = (hooks[evName] || []).concat(p.hooks[evName]);
    	});

    	const syncOpts = assign$1({
    		key: null,
    		setSeries: false,
    		filters: {
    			pub: retTrue,
    			sub: retTrue,
    		},
    		scales: [xScaleKey, series[1] ? series[1].scale : null],
    		match: [retEq, retEq],
    		values: [null, null],
    	}, cursor.sync);

    	(cursor.sync = syncOpts);

    	const syncKey = syncOpts.key;

    	const sync = _sync(syncKey);

    	function pubSync(type, src, x, y, w, h, i) {
    		if (syncOpts.filters.pub(type, src, x, y, w, h, i))
    			sync.pub(type, src, x, y, w, h, i);
    	}

    	sync.sub(self);

    	function pub(type, src, x, y, w, h, i) {
    		if (syncOpts.filters.sub(type, src, x, y, w, h, i))
    			events[type](null, src, x, y, w, h, i);
    	}

    	(self.pub = pub);

    	function destroy() {
    		sync.unsub(self);
    		cursorPlots.delete(self);
    		mouseListeners.clear();
    		off(dppxchange, win, syncPxRatio);
    		root.remove();
    		fire("destroy");
    	}

    	self.destroy = destroy;

    	function _init() {
    		fire("init", opts, data);

    		setData(data || opts.data, false);

    		if (pendScales[xScaleKey])
    			setScale(xScaleKey, pendScales[xScaleKey]);
    		else
    			autoScaleX();

    		_setSize(opts.width, opts.height);

    		updateCursor(null, true, false);

    		setSelect(select, false);
    	}

    	series.forEach(initSeries);

    	axes.forEach(initAxis);

    	if (then) {
    		if (then instanceof HTMLElement) {
    			then.appendChild(root);
    			_init();
    		}
    		else
    			then(self, _init);
    	}
    	else
    		_init();

    	return self;
    }

    uPlot.assign = assign$1;
    uPlot.fmtNum = fmtNum;
    uPlot.rangeNum = rangeNum;
    uPlot.rangeLog = rangeLog;
    uPlot.rangeAsinh = rangeAsinh;
    uPlot.orient   = orient;

    {
    	uPlot.join = join;
    }

    {
    	uPlot.fmtDate = fmtDate;
    	uPlot.tzDate  = tzDate;
    }

    {
    	uPlot.sync = _sync;
    }

    {
    	uPlot.addGap = addGap;
    	uPlot.clipGaps = clipGaps;

    	let paths = uPlot.paths = {
    		points,
    	};

    	(paths.linear  = linear);
    	(paths.stepped = stepped);
    	(paths.bars    = bars);
    	(paths.spline  = monotoneCubic);
    }

    let data_config = [
                [1546300800, 1546387200],    // x-values (timestamps)
                [        35,         71],    // y-values (series 1)
                [        90,         15],    // y-values (series 2)
                ];

    let opts_config = {
        title: "",
        width: 600,
        height: 400,
        cursor: {
            y: true,
            // points: {
            //     show: false,
            // },
            drag: {
                // setScale: false,
                x: true,
                y: true,
            },
            bind: {},
        },
        scales: {
            x: {
                time:true,
                auto: true,
            },
            y: {
                auto: true,
                // distr: (a,b)=>{console.log(a,b); return 3;},
                distr: 3,
                log: 10,
                // range: (self, min, max) => {console.log([min, max]); return [min, max]}
            }
        },
        series: [
            {
                label: "Time",
            },
            {
                spanGaps: true,
                // in-legend display
                label: "y1",
                stroke: "red",
                width: 1,
                dash: [10, 5],
            },
            {
                spanGaps: true,
                label: "y2",
                stroke: "blue",
                width: 1,
            }
        ],
    };
        const colors = ['lavender',
            'thistle',
            'plum',
            'violet',
            'orchid',
            'fuchsia',
            'magenta',
            'mediumorchid',
            'mediumpurple',
            'blueviolet',
            'darkviolet',
            'darkorchid',
            'darkmagenta',
            'purple',
            'indigo'
            ];

    // const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'});
    // const blob = new Blob(["1,1\n","2,2\n","3,3\n","4,4\n"], { type: 'text/csv' });


    function downloadBlob(blob, filename) {
        //https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
        // Create an object URL for the blob object
        const url = URL.createObjectURL(blob);

        // Create a new anchor element
        const a = document.createElement('a');

        // Set the href and download attributes for the anchor element
        // You can optionally set other attributes like `title`, etc
        // Especially, if the anchor element will be attached to the DOM
        a.href = url;
        a.download = filename || 'download';

        // Click handler that releases the object URL after the element has been clicked
        // This is required for one-off downloads of the blob content
        const clickHandler = () => {
            setTimeout(() => {
                URL.revokeObjectURL(url);
                // this.removeEventListener('click', clickHandler);
                a.removeEventListener('click', clickHandler);
            }, 150);
        };

        // Add the click event listener on the anchor element
        // Comment out this line if you don't want a one-off download of the blob content
        a.addEventListener('click', clickHandler, false);

        // Programmatically trigger a click on the anchor element
        // Useful if you want the download to happen automatically
        // Without attaching the anchor element to the DOM
        // Comment out this line if you don't want an automatic download of the blob content
        a.click();

        // Return the anchor element
        // Useful if you want a reference to the element
        // in order to attach it to the DOM or use it in some other way
        return a;
    }

    /* src/components/SvgIcon.svelte generated by Svelte v3.46.4 */

    const file$a = "src/components/SvgIcon.svelte";

    function create_fragment$b(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", /*d*/ ctx[1]);
    			attr_dev(path, "stroke", "#4A5568");
    			attr_dev(path, "stroke-width", "2");
    			attr_dev(path, "stroke-linecap", "round");
    			attr_dev(path, "stroke-linejoin", "round");
    			add_location(path, file$a, 6, 0, 173);
    			attr_dev(svg, "class", "icon svelte-1nvbvo2");
    			attr_dev(svg, "width", "24");
    			attr_dev(svg, "height", "24");
    			attr_dev(svg, "viewBox", "0 -2 24 24");
    			attr_dev(svg, "fill", /*fill*/ ctx[0]);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$a, 5, 0, 63);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*d*/ 2) {
    				attr_dev(path, "d", /*d*/ ctx[1]);
    			}

    			if (dirty & /*fill*/ 1) {
    				attr_dev(svg, "fill", /*fill*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SvgIcon', slots, []);
    	let { fill = "none" } = $$props;
    	let { d = "" } = $$props;
    	const writable_props = ['fill', 'd'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SvgIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
    		if ('d' in $$props) $$invalidate(1, d = $$props.d);
    	};

    	$$self.$capture_state = () => ({ fill, d });

    	$$self.$inject_state = $$props => {
    		if ('fill' in $$props) $$invalidate(0, fill = $$props.fill);
    		if ('d' in $$props) $$invalidate(1, d = $$props.d);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [fill, d];
    }

    class SvgIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { fill: 0, d: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SvgIcon",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get fill() {
    		throw new Error("<SvgIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fill(value) {
    		throw new Error("<SvgIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get d() {
    		throw new Error("<SvgIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set d(value) {
    		throw new Error("<SvgIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/LogIcon.svelte generated by Svelte v3.46.4 */

    const file$b = "src/components/LogIcon.svelte";

    function create_fragment$c(ctx) {
    	let svg;
    	let defs;
    	let path0;
    	let path1;
    	let path2;
    	let g4;
    	let g3;
    	let g0;
    	let use0;
    	let g1;
    	let use1;
    	let g2;
    	let use2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			g4 = svg_element("g");
    			g3 = svg_element("g");
    			g0 = svg_element("g");
    			use0 = svg_element("use");
    			g1 = svg_element("g");
    			use1 = svg_element("use");
    			g2 = svg_element("g");
    			use2 = svg_element("use");
    			attr_dev(path0, "id", "MJX-5-TEX-I-6C");
    			attr_dev(path0, "d", "M117 59Q117 26 142 26Q179 26 205 131Q211 151 215 152Q217 153 225 153H229Q238 153 241 153T246 151T248 144Q247 138 245 128T234 90T214 43T183 6T137 -11Q101 -11 70 11T38 85Q38 97 39 102L104 360Q167 615 167 623Q167 626 166 628T162 632T157 634T149 635T141 636T132 637T122 637Q112 637 109 637T101 638T95 641T94 647Q94 649 96 661Q101 680 107 682T179 688Q194 689 213 690T243 693T254 694Q266 694 266 686Q266 675 193 386T118 83Q118 81 118 75T117 65V59Z");
    			add_location(path0, file$b, 0, 151, 151);
    			attr_dev(path1, "id", "MJX-5-TEX-I-6F");
    			attr_dev(path1, "d", "M201 -11Q126 -11 80 38T34 156Q34 221 64 279T146 380Q222 441 301 441Q333 441 341 440Q354 437 367 433T402 417T438 387T464 338T476 268Q476 161 390 75T201 -11ZM121 120Q121 70 147 48T206 26Q250 26 289 58T351 142Q360 163 374 216T388 308Q388 352 370 375Q346 405 306 405Q243 405 195 347Q158 303 140 230T121 120Z");
    			add_location(path1, file$b, 0, 630, 630);
    			attr_dev(path2, "id", "MJX-5-TEX-I-67");
    			attr_dev(path2, "d", "M311 43Q296 30 267 15T206 0Q143 0 105 45T66 160Q66 265 143 353T314 442Q361 442 401 394L404 398Q406 401 409 404T418 412T431 419T447 422Q461 422 470 413T480 394Q480 379 423 152T363 -80Q345 -134 286 -169T151 -205Q10 -205 10 -137Q10 -111 28 -91T74 -71Q89 -71 102 -80T116 -111Q116 -121 114 -130T107 -144T99 -154T92 -162L90 -164H91Q101 -167 151 -167Q189 -167 211 -155Q234 -144 254 -122T282 -75Q288 -56 298 -13Q311 35 311 43ZM384 328L380 339Q377 350 375 354T369 368T359 382T346 393T328 402T306 405Q262 405 221 352Q191 313 171 233T151 117Q151 38 213 38Q269 38 323 108L331 118L384 328Z");
    			add_location(path2, file$b, 0, 971, 971);
    			add_location(defs, file$b, 0, 145, 145);
    			xlink_attr(use0, "xlink:href", "#MJX-5-TEX-I-6C");
    			add_location(use0, file$b, 0, 1744, 1744);
    			attr_dev(g0, "data-mml-node", "mi");
    			add_location(g0, file$b, 0, 1722, 1722);
    			xlink_attr(use1, "xlink:href", "#MJX-5-TEX-I-6F");
    			add_location(use1, file$b, 0, 1851, 1851);
    			attr_dev(g1, "data-mml-node", "mi");
    			attr_dev(g1, "transform", "translate(298, 0) scale(1,1)");
    			add_location(g1, file$b, 0, 1788, 1788);
    			xlink_attr(use2, "xlink:href", "#MJX-5-TEX-I-67");
    			add_location(use2, file$b, 0, 1958, 1958);
    			attr_dev(g2, "data-mml-node", "mi");
    			attr_dev(g2, "transform", "translate(783, 0) scale(1,1)");
    			add_location(g2, file$b, 0, 1895, 1895);
    			attr_dev(g3, "data-mml-node", "math");
    			add_location(g3, file$b, 0, 1698, 1698);
    			attr_dev(g4, "stroke", "currentColor");
    			attr_dev(g4, "fill", "currentColor");
    			attr_dev(g4, "stroke-width", "0");
    			attr_dev(g4, "transform", "matrix(1 0 0 -1 0 0) scale(1,1)");
    			add_location(g4, file$b, 0, 1592, 1592);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "24px");
    			attr_dev(svg, "height", "24px");
    			attr_dev(svg, "viewBox", "0 -894 1260 899");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "style", "");
    			add_location(svg, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, path0);
    			append_dev(defs, path1);
    			append_dev(defs, path2);
    			append_dev(svg, g4);
    			append_dev(g4, g3);
    			append_dev(g3, g0);
    			append_dev(g0, use0);
    			append_dev(g3, g1);
    			append_dev(g1, use1);
    			append_dev(g3, g2);
    			append_dev(g2, use2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LogIcon', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LogIcon> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class LogIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LogIcon",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/components/LinIcon.svelte generated by Svelte v3.46.4 */

    const file$c = "src/components/LinIcon.svelte";

    function create_fragment$d(ctx) {
    	let svg;
    	let defs;
    	let path0;
    	let path1;
    	let path2;
    	let g4;
    	let g3;
    	let g0;
    	let use0;
    	let g1;
    	let use1;
    	let g2;
    	let use2;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			g4 = svg_element("g");
    			g3 = svg_element("g");
    			g0 = svg_element("g");
    			use0 = svg_element("use");
    			g1 = svg_element("g");
    			use1 = svg_element("use");
    			g2 = svg_element("g");
    			use2 = svg_element("use");
    			attr_dev(path0, "id", "MJX-6-TEX-I-6C");
    			attr_dev(path0, "d", "M117 59Q117 26 142 26Q179 26 205 131Q211 151 215 152Q217 153 225 153H229Q238 153 241 153T246 151T248 144Q247 138 245 128T234 90T214 43T183 6T137 -11Q101 -11 70 11T38 85Q38 97 39 102L104 360Q167 615 167 623Q167 626 166 628T162 632T157 634T149 635T141 636T132 637T122 637Q112 637 109 637T101 638T95 641T94 647Q94 649 96 661Q101 680 107 682T179 688Q194 689 213 690T243 693T254 694Q266 694 266 686Q266 675 193 386T118 83Q118 81 118 75T117 65V59Z");
    			add_location(path0, file$c, 0, 151, 151);
    			attr_dev(path1, "id", "MJX-6-TEX-I-69");
    			attr_dev(path1, "d", "M184 600Q184 624 203 642T247 661Q265 661 277 649T290 619Q290 596 270 577T226 557Q211 557 198 567T184 600ZM21 287Q21 295 30 318T54 369T98 420T158 442Q197 442 223 419T250 357Q250 340 236 301T196 196T154 83Q149 61 149 51Q149 26 166 26Q175 26 185 29T208 43T235 78T260 137Q263 149 265 151T282 153Q302 153 302 143Q302 135 293 112T268 61T223 11T161 -11Q129 -11 102 10T74 74Q74 91 79 106T122 220Q160 321 166 341T173 380Q173 404 156 404H154Q124 404 99 371T61 287Q60 286 59 284T58 281T56 279T53 278T49 278T41 278H27Q21 284 21 287Z");
    			add_location(path1, file$c, 0, 630, 630);
    			attr_dev(path2, "id", "MJX-6-TEX-I-6E");
    			attr_dev(path2, "d", "M21 287Q22 293 24 303T36 341T56 388T89 425T135 442Q171 442 195 424T225 390T231 369Q231 367 232 367L243 378Q304 442 382 442Q436 442 469 415T503 336T465 179T427 52Q427 26 444 26Q450 26 453 27Q482 32 505 65T540 145Q542 153 560 153Q580 153 580 145Q580 144 576 130Q568 101 554 73T508 17T439 -10Q392 -10 371 17T350 73Q350 92 386 193T423 345Q423 404 379 404H374Q288 404 229 303L222 291L189 157Q156 26 151 16Q138 -11 108 -11Q95 -11 87 -5T76 7T74 17Q74 30 112 180T152 343Q153 348 153 366Q153 405 129 405Q91 405 66 305Q60 285 60 284Q58 278 41 278H27Q21 284 21 287Z");
    			add_location(path2, file$c, 0, 1188, 1188);
    			add_location(defs, file$c, 0, 145, 145);
    			xlink_attr(use0, "xlink:href", "#MJX-6-TEX-I-6C");
    			add_location(use0, file$c, 0, 1928, 1928);
    			attr_dev(g0, "data-mml-node", "mi");
    			add_location(g0, file$c, 0, 1906, 1906);
    			xlink_attr(use1, "xlink:href", "#MJX-6-TEX-I-69");
    			add_location(use1, file$c, 0, 2024, 2024);
    			attr_dev(g1, "data-mml-node", "mi");
    			attr_dev(g1, "transform", "translate(298, 0)");
    			add_location(g1, file$c, 0, 1972, 1972);
    			xlink_attr(use2, "xlink:href", "#MJX-6-TEX-I-6E");
    			add_location(use2, file$c, 0, 2120, 2120);
    			attr_dev(g2, "data-mml-node", "mi");
    			attr_dev(g2, "transform", "translate(643, 0)");
    			add_location(g2, file$c, 0, 2068, 2068);
    			attr_dev(g3, "data-mml-node", "math");
    			add_location(g3, file$c, 0, 1882, 1882);
    			attr_dev(g4, "stroke", "currentColor");
    			attr_dev(g4, "fill", "currentColor");
    			attr_dev(g4, "stroke-width", "0");
    			attr_dev(g4, "transform", "matrix(1 0 0 -1 0 0)");
    			add_location(g4, file$c, 0, 1787, 1787);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "24px");
    			attr_dev(svg, "height", "24px");
    			attr_dev(svg, "viewBox", "0 -794 1243 705");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "style", "");
    			add_location(svg, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, path0);
    			append_dev(defs, path1);
    			append_dev(defs, path2);
    			append_dev(svg, g4);
    			append_dev(g4, g3);
    			append_dev(g3, g0);
    			append_dev(g0, use0);
    			append_dev(g3, g1);
    			append_dev(g1, use1);
    			append_dev(g3, g2);
    			append_dev(g2, use2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LinIcon', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LinIcon> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class LinIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LinIcon",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    const bellIcon = "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9";
    const home="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
    const png="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z";
    const download ="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4";

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var FileSaver_min = createCommonjsModule(function (module, exports) {
    (function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else {var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});

    //# sourceMappingURL=FileSaver.min.js.map
    });

    /* src/components/uplot_v3.svelte generated by Svelte v3.46.4 */

    const { console: console_1$2 } = globals;
    const file$d = "src/components/uplot_v3.svelte";

    // (394:12) {:else}
    function create_else_block$2(ctx) {
    	let logicon;
    	let current;
    	logicon = new LogIcon({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(logicon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(logicon, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(logicon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(394:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (392:12) {#if logy==3}
    function create_if_block$2(ctx) {
    	let linicon;
    	let current;
    	linicon = new LinIcon({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(linicon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(linicon, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(linicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(linicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(linicon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(392:12) {#if logy==3}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let link;
    	let t0;
    	let div0;
    	let button0;
    	let svgicon0;
    	let t1;
    	let button1;
    	let current_block_type_index;
    	let if_block;
    	let t2;
    	let button2;
    	let svgicon1;
    	let t3;
    	let button3;
    	let svgicon2;
    	let t4;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;
    	svgicon0 = new SvgIcon({ props: { d: home }, $$inline: true });
    	const if_block_creators = [create_if_block$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*logy*/ ctx[1] == 3) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	svgicon1 = new SvgIcon({ props: { d: png }, $$inline: true });
    	svgicon2 = new SvgIcon({ props: { d: download }, $$inline: true });

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			div0 = element("div");
    			button0 = element("button");
    			create_component(svgicon0.$$.fragment);
    			t1 = space();
    			button1 = element("button");
    			if_block.c();
    			t2 = space();
    			button2 = element("button");
    			create_component(svgicon1.$$.fragment);
    			t3 = space();
    			button3 = element("button");
    			create_component(svgicon2.$$.fragment);
    			t4 = space();
    			div1 = element("div");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://leeoniya.github.io/uPlot/dist/uPlot.min.css");
    			add_location(link, file$d, 385, 4, 12678);
    			attr_dev(button0, "class", "svelte-ntrb8o");
    			add_location(button0, file$d, 387, 8, 12779);
    			attr_dev(button1, "class", "svelte-ntrb8o");
    			add_location(button1, file$d, 390, 8, 12868);
    			attr_dev(button2, "class", "svelte-ntrb8o");
    			add_location(button2, file$d, 397, 8, 13046);
    			attr_dev(button3, "class", "svelte-ntrb8o");
    			add_location(button3, file$d, 400, 8, 13135);
    			add_location(div0, file$d, 386, 4, 12765);
    			add_location(div1, file$d, 404, 4, 13238);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, link, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, button0);
    			mount_component(svgicon0, button0, null);
    			append_dev(div0, t1);
    			append_dev(div0, button1);
    			if_blocks[current_block_type_index].m(button1, null);
    			append_dev(div0, t2);
    			append_dev(div0, button2);
    			mount_component(svgicon1, button2, null);
    			append_dev(div0, t3);
    			append_dev(div0, button3);
    			mount_component(svgicon2, button3, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div1, anchor);
    			/*div1_binding*/ ctx[10](div1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*resetAxis*/ ctx[2], false, false, false),
    					listen_dev(button1, "click", /*toggle_logy*/ ctx[3], false, false, false),
    					listen_dev(button2, "click", /*saveCanvas*/ ctx[4], false, false, false),
    					listen_dev(button3, "click", /*downloadData*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(button1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svgicon0.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(svgicon1.$$.fragment, local);
    			transition_in(svgicon2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svgicon0.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(svgicon1.$$.fragment, local);
    			transition_out(svgicon2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			destroy_component(svgicon0);
    			if_blocks[current_block_type_index].d();
    			destroy_component(svgicon1);
    			destroy_component(svgicon2);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div1);
    			/*div1_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Uplot_v3', slots, []);
    	let { data = data_config } = $$props;
    	let { opts = opts_config } = $$props;
    	let { labels = ['y0', 'y1'] } = $$props;
    	let { size = { width: 600, height: 400 } } = $$props;
    	let plotDiv;

    	// let uPlot;
    	let uplot;

    	let html2canvas;
    	let autox = true;
    	let autoy = true;
    	let logy = 3;

    	// console.log(opts)
    	let y_range;

    	let x_range;
    	opts = { ...opts, ...size };

    	opts.scales.x.auto = () => {
    		return autox;
    	};

    	opts.scales.y.auto = () => {
    		return autoy;
    	};

    	//console.log(opts.scales.y.range);
    	opts.scales.x.range = (self, min, max) => {
    		min = min == null ? min : parseFloat(min);
    		max = max == null ? max : parseFloat(max);
    		x_range = [min, max];

    		// console.log('x', x_range);
    		return x_range;
    	};

    	opts.scales.y.range = (self, min, max) => {
    		console.log('before', min, max);

    		if (!autoy) {
    			let max_calc = [];
    			let min_calc = [];

    			for (let i = 1; i < data.length; i++) {
    				max_calc.push(Math.max(...data[i]));
    				min_calc.push(Math.min(...data[i]));
    			}

    			max = Math.max(...max_calc);
    			min = Math.min(...min_calc);
    			console.log(min, max);
    			min = 0.1;
    			max = 3;
    			y_range = uPlot.rangeNum(min, max, 0.1, true);
    		} else {
    			y_range = uPlot.rangeNum(0.1, 3, 0.1, true);
    		}

    		console.log('y:', y_range);
    		return y_range;
    	};

    	opts.scales.y.range = null;

    	/*
    opts['plugins'] =  [ 
       legendAsTooltipPlugin(),
     ]
    */
    	opts['plugins'] = [wheelZoomPlugin(0.75)];

    	opts.cursor.bind.dblclick = (u, targ, handler) => {
    		return e => {
    			console.log('in dblclick');
    			autox = true;
    			autoy = true;
    			handler(e);
    		};
    	};

    	opts.cursor.bind.mousemove = (u, targ, handler) => {
    		return e => {
    			if (e.buttons == 1) {
    				autox = false;
    				autoy = false;
    			} // console.log(e)
    			// console.log('mousemove button', e.button, 'buttons', e.buttons);

    			handler(e);
    		};
    	};

    	let s = [{}];

    	for (let i = 0; i < data.length - 1; i++) {
    		s.push({
    			spanGaps: true,
    			label: "y" + i,
    			stroke: colors[9 - i],
    			width: 2
    		});
    	}

    	opts.series = s;

    	// console.log('opts.series', opts.series)
    	// console.log('labels', labels);
    	labels.forEach((item, index) => {
    		$$invalidate(6, opts.series[index + 1].label = item, opts); // offset index by 1, index 0: time
    	});

    	let mounted = false;

    	onMount(async () => {
    		/*
    const module = await import ('uplot');
    uPlot = module.default;
    console.log("uplot onMount")
    uplot = new uPlot(opts,data,plotDiv); 
    mounted = true;
    */
    		uplot = uPlot(opts, data, plotDiv);

    		mounted = true;
    	}); /*
    const m = await import ('html2canvas');
    html2canvas = m.default;
    console.log(html2canvas)
     */

    	/*
    $: {console.log('data changed into uPlot, data.length', data.length);}
    $: {console.log('labels changed into uPlot, label.length', labels.length);}
    */
    	afterUpdate(() => {
    		// console.log('afterUpdate data[0].length', data[0].length)
    		if (mounted) {
    			if (uplot && autox && autoy) {
    				uplot.setData(data);
    			} else if (uplot) {
    				uplot.setData(data, false); // console.log('setData with auto');

    				// console.log('setData with false');
    				// console.log('uplot', uplot.scales);
    				let xMin = uplot.scales.x.min;

    				let xMax = uplot.scales.x.max;
    				let yMin = uplot.scales.y.min;
    				let yMax = uplot.scales.y.max;

    				// console.log(xMin, xMax, yMin, yMax);
    				uplot.setScale('x', { min: xMin, max: xMax });

    				uplot.setScale('y', { min: yMin, max: yMax });
    			}

    			uplot.setSize(size);
    		}
    	});

    	function toggle_autox() {
    		autox = !autox;
    	}

    	function toggle_autoy() {
    		autoy = !autoy;
    	}

    	function resetAxis() {
    		autox = true;
    		autoy = true;
    		uplot.setData(data);
    	}

    	function toggle_logy() {
    		if (logy == 3) {
    			$$invalidate(1, logy = 1);
    		} else {
    			$$invalidate(1, logy = 3);
    		}

    		$$invalidate(6, opts.scales.y.distr = logy, opts);

    		// Not sure which way is better...
    		// plotDiv.innerHTML = '';
    		plotDiv.removeChild(plotDiv.firstChild);

    		// console.log('toggle_logy', data.length);
    		uplot = new uPlot(opts, data, plotDiv);
    	}

    	function saveCanvas() {
    		var canvas = document.querySelector(".u-wrap > canvas:nth-child(2)");
    		console.log("canvas", canvas);

    		canvas.toBlob(function (blob) {
    			FileSaver_min.saveAs(blob, "uplot.png");
    		});
    	}

    	function saveCanvas2() {
    		html2canvas(plotDiv).then(canvas => {
    			document.body.appendChild(canvas);
    		});
    	}

    	function downloadData() {
    		console.log("Download file");
    		const filename = 'fridge.json';
    		const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    		downloadBlob(blob, filename);
    	}

    	function wheelZoomPlugin(opts) {
    		let factor = opts.factor || 0.75;
    		let xMin, xMax, yMin, yMax, xRange, yRange;

    		function clamp(nRange, nMin, nMax, fRange, fMin, fMax) {
    			if (nRange > fRange) {
    				nMin = fMin;
    				nMax = fMax;
    			} else if (nMin < fMin) {
    				nMin = fMin;
    				nMax = fMin + nRange;
    			} else if (nMax > fMax) {
    				nMax = fMax;
    				nMin = fMax - nRange;
    			}

    			// turn off autoscale when data added
    			return [nMin, nMax];
    		}

    		return {
    			hooks: {
    				ready: u => {
    					xMin = u.scales.x.min;
    					xMax = u.scales.x.max;
    					yMin = u.scales.y.min;
    					yMax = u.scales.y.max;
    					xRange = xMax - xMin;
    					yRange = yMax - yMin;
    					let over = u.over;
    					let rect = over.getBoundingClientRect();

    					// wheel drag pan
    					over.addEventListener("mousedown", e => {
    						if (e.button == 1) {
    							//	plot.style.cursor = "move";
    							e.preventDefault();

    							let left0 = e.clientX;
    							let top0 = e.clientY;
    							let scXMin0 = u.scales.x.min;
    							let scXMax0 = u.scales.x.max;

    							// Remember y settings... somehow they get reset 
    							let scYMin0 = u.scales.y.min;

    							let scYMax0 = u.scales.y.max;
    							let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');
    							let yUnitsPerPx = u.posToVal(1, 'y') - u.posToVal(0, 'y');

    							function onmove(e) {
    								e.preventDefault();
    								autox = false;
    								let left1 = e.clientX;
    								let top1 = e.clientY;
    								let dx = xUnitsPerPx * (left1 - left0);
    								let dy = yUnitsPerPx * (top1 - top0);
    								u.setScale('x', { min: scXMin0 - dx, max: scXMax0 - dx });

    								// set y scale so that they are not null
    								u.setScale('y', { min: scYMin0 - dy, max: scYMax0 - dy });
    							}

    							function onup(e) {
    								document.removeEventListener("mousemove", onmove);
    								document.removeEventListener("mouseup", onup);
    							}

    							document.addEventListener("mousemove", onmove);
    							document.addEventListener("mouseup", onup);
    						}
    					});

    					// wheel scroll zoom
    					over.addEventListener("wheel", e => {
    						e.preventDefault();
    						let { left, top } = u.cursor;
    						let leftPct = left / rect.width;
    						let btmPct = 1 - top / rect.height;
    						let xVal = u.posToVal(left, "x");
    						let yVal = u.posToVal(top, "y");
    						let oxRange = u.scales.x.max - u.scales.x.min;
    						let oyRange = u.scales.y.max - u.scales.y.min;
    						let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
    						let nxMin = xVal - leftPct * nxRange;
    						let nxMax = nxMin + nxRange;
    						[nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);
    						let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
    						let nyMin = yVal - btmPct * nyRange;
    						let nyMax = nyMin + nyRange;
    						[nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);
    						console.log('wheel', nxMin, nxMax, nyMin, nyMax);

    						u.batch(() => {
    							u.setScale("x", { min: nxMin, max: nxMax });
    							u.setScale("y", { min: nyMin, max: nyMax });
    						});
    					}); // autox = false;
    					// autoy = false;
    				}
    			}
    		};
    	}

    	function legendAsTooltipPlugin(
    		{ className, style = {
    			backgroundColor: "rgba(255, 249, 196, 0.92)",
    			color: "black"
    		} } = {}
    	) {
    		let legendEl;

    		function init(u, opts) {
    			legendEl = u.root.querySelector(".u-legend");
    			legendEl.classList.remove("u-inline");
    			className && legendEl.classList.add(className);

    			// console.log(legendEl)
    			uPlot.assign(legendEl.style, {
    				textAlign: "left",
    				pointerEvents: "none",
    				display: "none",
    				position: "absolute",
    				left: 0,
    				top: 0
    			}); // zIndex: 100,
    			// boxShadow: "2px 2px 10px rgba(0,0,0,0.5)",
    			// ...style

    			// hide series color markers
    			const idents = legendEl.querySelectorAll(".u-marker");

    			for (let i = 0; i < idents.length; i++) idents[i].style.display = "none";
    			const overEl = u.root.querySelector(".u-over");
    			overEl.style.overflow = "visible";

    			// move legend into plot bounds
    			overEl.appendChild(legendEl);

    			// show/hide tooltip on enter/exit
    			overEl.addEventListener("mouseenter", () => {
    				legendEl.style.display = null;
    			});

    			overEl.addEventListener("mouseleave", () => {
    				legendEl.style.display = "none";
    			});
    		} // let tooltip exit plot
    		//  overEl.style.overflow = "visible";

    		function update(u) {
    			const { left, top } = u.cursor;
    			legendEl.style.transform = "translate(" + left + "px, " + top + "px)";
    		}

    		return { hooks: { init, setCursor: update } };
    	}

    	const writable_props = ['data', 'opts', 'labels', 'size'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<Uplot_v3> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			plotDiv = $$value;
    			$$invalidate(0, plotDiv);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(7, data = $$props.data);
    		if ('opts' in $$props) $$invalidate(6, opts = $$props.opts);
    		if ('labels' in $$props) $$invalidate(8, labels = $$props.labels);
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    	};

    	$$self.$capture_state = () => ({
    		uPlot,
    		onMount,
    		afterUpdate,
    		data_config,
    		opts_config,
    		colors,
    		downloadBlob,
    		SvgIcon,
    		LogIcon,
    		LinIcon,
    		bellIcon,
    		download,
    		home,
    		png,
    		filesaver: FileSaver_min,
    		data,
    		opts,
    		labels,
    		size,
    		plotDiv,
    		uplot,
    		html2canvas,
    		autox,
    		autoy,
    		logy,
    		y_range,
    		x_range,
    		s,
    		mounted,
    		toggle_autox,
    		toggle_autoy,
    		resetAxis,
    		toggle_logy,
    		saveCanvas,
    		saveCanvas2,
    		downloadData,
    		wheelZoomPlugin,
    		legendAsTooltipPlugin
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(7, data = $$props.data);
    		if ('opts' in $$props) $$invalidate(6, opts = $$props.opts);
    		if ('labels' in $$props) $$invalidate(8, labels = $$props.labels);
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('plotDiv' in $$props) $$invalidate(0, plotDiv = $$props.plotDiv);
    		if ('uplot' in $$props) uplot = $$props.uplot;
    		if ('html2canvas' in $$props) html2canvas = $$props.html2canvas;
    		if ('autox' in $$props) autox = $$props.autox;
    		if ('autoy' in $$props) autoy = $$props.autoy;
    		if ('logy' in $$props) $$invalidate(1, logy = $$props.logy);
    		if ('y_range' in $$props) y_range = $$props.y_range;
    		if ('x_range' in $$props) x_range = $$props.x_range;
    		if ('s' in $$props) s = $$props.s;
    		if ('mounted' in $$props) mounted = $$props.mounted;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		plotDiv,
    		logy,
    		resetAxis,
    		toggle_logy,
    		saveCanvas,
    		downloadData,
    		opts,
    		data,
    		labels,
    		size,
    		div1_binding
    	];
    }

    class Uplot_v3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { data: 7, opts: 6, labels: 8, size: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Uplot_v3",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get data() {
    		throw new Error("<Uplot_v3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Uplot_v3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get opts() {
    		throw new Error("<Uplot_v3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set opts(value) {
    		throw new Error("<Uplot_v3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labels() {
    		throw new Error("<Uplot_v3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labels(value) {
    		throw new Error("<Uplot_v3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Uplot_v3>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Uplot_v3>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Loader.svelte generated by Svelte v3.46.4 */

    const file$e = "src/components/Loader.svelte";

    function create_fragment$f(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "id", "spinner");
    			attr_dev(div, "style", div_style_value = /*loading*/ ctx[0] ? "display:block;" : "display:none;");
    			attr_dev(div, "class", "svelte-11oa33g");
    			add_location(div, file$e, 33, 0, 636);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*loading*/ 1 && div_style_value !== (div_style_value = /*loading*/ ctx[0] ? "display:block;" : "display:none;")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Loader', slots, []);
    	let { loading = false } = $$props;
    	const writable_props = ['loading'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Loader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('loading' in $$props) $$invalidate(0, loading = $$props.loading);
    	};

    	$$self.$capture_state = () => ({ loading });

    	$$self.$inject_state = $$props => {
    		if ('loading' in $$props) $$invalidate(0, loading = $$props.loading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [loading];
    }

    class Loader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { loading: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Loader",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get loading() {
    		throw new Error("<Loader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loading(value) {
    		throw new Error("<Loader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function collapse (node, params) {

        const defaultParams = {
            open: true,
            duration: 0.2,
            easing: 'ease'
        };

        params = Object.assign(defaultParams, params);

        const noop = () => {};
        let transitionEndResolve = noop;
        let transitionEndReject = noop;

        const listener = node.addEventListener('transitionend', () => {
            transitionEndResolve();
            transitionEndResolve = noop;
            transitionEndReject = noop;
        });

        // convenience functions
        async function asyncTransitionEnd () {
            return new Promise((resolve, reject) => {
                transitionEndResolve = resolve;
                transitionEndReject = reject;
            })
        }

        async function nextFrame () {
            return new Promise(requestAnimationFrame)
        }

        function transition () {
            return `height ${params.duration}s ${params.easing}`
        }

        // set initial styles
        node.style.overflow = 'hidden';
        node.style.transition = transition();
        node.style.height = params.open ? 'auto' : '0px';

        async function enter () {

            // height is already in pixels
            // start the transition
            node.style.height = node.scrollHeight + 'px';

            // wait for transition to end,
            // then switch back to height auto
            try {
                await asyncTransitionEnd();
                node.style.height = 'auto';
            } catch(err) {
                // interrupted by a leave transition
            }

        }

        async function leave () {

            if (node.style.height === 'auto') {

                // temporarily turn transitions off
                node.style.transition = 'none';
                await nextFrame();

                // set height to pixels, and turn transition back on
                node.style.height = node.scrollHeight + 'px';
                node.style.transition = transition();
                await nextFrame();

                // start the transition
                node.style.height = '0px';

            }
            else {

                // we are interrupting an enter transition
                transitionEndReject();
                node.style.height = '0px';

            }

        }

        function update (newParams) {
            params = Object.assign(params, newParams);
            params.open ? enter() : leave();
        }

        function destroy () {
            node.removeEventListener('transitionend', listener);
        }

        return { update, destroy }

    }

    /* src/components/MyCollapse.svelte generated by Svelte v3.46.4 */
    const file$f = "src/components/MyCollapse.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (44:3) {#each menu as item}
    function create_each_block$2(ctx) {
    	let label_1;
    	let input;
    	let input_value_value;
    	let t0;
    	let t1_value = /*item*/ ctx[10] + "";
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "name", "choices");
    			input.__value = input_value_value = /*item*/ ctx[10];
    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[8][0].push(input);
    			add_location(input, file$f, 45, 4, 1174);
    			add_location(label_1, file$f, 44, 3, 1105);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, input);
    			input.checked = ~/*choices*/ ctx[0].indexOf(input.__value);
    			append_dev(label_1, t0);
    			append_dev(label_1, t1);
    			append_dev(label_1, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*menu*/ 8 && input_value_value !== (input_value_value = /*item*/ ctx[10])) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*choices*/ 1) {
    				input.checked = ~/*choices*/ ctx[0].indexOf(input.__value);
    			}

    			if (dirty & /*menu*/ 8 && t1_value !== (t1_value = /*item*/ ctx[10] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			/*$$binding_groups*/ ctx[8][0].splice(/*$$binding_groups*/ ctx[8][0].indexOf(input), 1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(44:3) {#each menu as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let collapse_action;
    	let mounted;
    	let dispose;
    	let each_value = /*menu*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(/*label*/ ctx[2]);
    			t1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "card-header svelte-1ylc792");
    			set_style(div0, "margin", "0.5em");
    			set_style(div0, "cursor", "pointer");
    			attr_dev(div0, "onmouseover", "this.style.color='red';");
    			attr_dev(div0, "onmouseout", "this.style.color='';");
    			add_location(div0, file$f, 35, 4, 748);
    			attr_dev(div1, "class", "card-body");
    			add_location(div1, file$f, 42, 4, 966);
    			attr_dev(div2, "class", "config svelte-1ylc792");
    			attr_dev(div2, "aria-expanded", /*open*/ ctx[1]);
    			toggle_class(div2, "open", /*open*/ ctx[1]);
    			add_location(div2, file$f, 33, 0, 689);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*handleToggle*/ ctx[6], false, false, false),
    					action_destroyer(collapse_action = collapse.call(null, div1, {
    						open: /*open*/ ctx[1],
    						duration: /*duration*/ ctx[4],
    						easing: /*easing*/ ctx[5]
    					}))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*label*/ 4) set_data_dev(t0, /*label*/ ctx[2]);

    			if (dirty & /*menu, choices*/ 9) {
    				each_value = /*menu*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (collapse_action && is_function(collapse_action.update) && dirty & /*open, duration, easing*/ 50) collapse_action.update.call(null, {
    				open: /*open*/ ctx[1],
    				duration: /*duration*/ ctx[4],
    				easing: /*easing*/ ctx[5]
    			});

    			if (dirty & /*open*/ 2) {
    				attr_dev(div2, "aria-expanded", /*open*/ ctx[1]);
    			}

    			if (dirty & /*open*/ 2) {
    				toggle_class(div2, "open", /*open*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MyCollapse', slots, []);
    	let { label = 'my collapse' } = $$props;
    	let { menu = ['A', 'B', 'C'] } = $$props;
    	let { choices = [...menu] } = $$props;
    	let { open = false } = $$props;
    	let { duration = 0.2 } = $$props;
    	let { easing = 'ease' } = $$props;
    	const dispatch = createEventDispatcher();

    	function handleToggle() {
    		$$invalidate(1, open = !open);

    		if (open) {
    			dispatch('open');
    		} else {
    			dispatch('close');
    		}
    	}

    	const writable_props = ['label', 'menu', 'choices', 'open', 'duration', 'easing'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MyCollapse> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		choices = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		$$invalidate(0, choices);
    	}

    	$$self.$$set = $$props => {
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('menu' in $$props) $$invalidate(3, menu = $$props.menu);
    		if ('choices' in $$props) $$invalidate(0, choices = $$props.choices);
    		if ('open' in $$props) $$invalidate(1, open = $$props.open);
    		if ('duration' in $$props) $$invalidate(4, duration = $$props.duration);
    		if ('easing' in $$props) $$invalidate(5, easing = $$props.easing);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		collapse,
    		label,
    		menu,
    		choices,
    		open,
    		duration,
    		easing,
    		dispatch,
    		handleToggle
    	});

    	$$self.$inject_state = $$props => {
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('menu' in $$props) $$invalidate(3, menu = $$props.menu);
    		if ('choices' in $$props) $$invalidate(0, choices = $$props.choices);
    		if ('open' in $$props) $$invalidate(1, open = $$props.open);
    		if ('duration' in $$props) $$invalidate(4, duration = $$props.duration);
    		if ('easing' in $$props) $$invalidate(5, easing = $$props.easing);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		choices,
    		open,
    		label,
    		menu,
    		duration,
    		easing,
    		handleToggle,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class MyCollapse extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			label: 2,
    			menu: 3,
    			choices: 0,
    			open: 1,
    			duration: 4,
    			easing: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MyCollapse",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get label() {
    		throw new Error("<MyCollapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<MyCollapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get menu() {
    		throw new Error("<MyCollapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set menu(value) {
    		throw new Error("<MyCollapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get choices() {
    		throw new Error("<MyCollapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set choices(value) {
    		throw new Error("<MyCollapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get open() {
    		throw new Error("<MyCollapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set open(value) {
    		throw new Error("<MyCollapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error("<MyCollapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<MyCollapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get easing() {
    		throw new Error("<MyCollapse>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set easing(value) {
    		throw new Error("<MyCollapse>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/checkbox_list_component.svelte generated by Svelte v3.46.4 */

    const file$g = "src/components/checkbox_list_component.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[5] = list;
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (32:4) {#if manual_mode}
    function create_if_block$3(ctx) {
    	let each_1_anchor;
    	let each_value = /*controls*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*manual_mode, controls*/ 3) {
    				each_value = /*controls*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(32:4) {#if manual_mode}",
    		ctx
    	});

    	return block;
    }

    // (33:8) {#each controls as control}
    function create_each_block$3(ctx) {
    	let label;
    	let input;
    	let input_disabled_value;
    	let t0;
    	let t1_value = /*control*/ ctx[4].text + "";
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;

    	function input_change_handler_1() {
    		/*input_change_handler_1*/ ctx[3].call(input, /*each_value*/ ctx[5], /*control_index*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = text("\n                          ");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(input, "type", "checkbox");
    			input.disabled = input_disabled_value = !/*manual_mode*/ ctx[1];
    			add_location(input, file$g, 34, 16, 965);
    			attr_dev(label, "class", "svelte-4x5pkm");
    			toggle_class(label, "disabled", !/*manual_mode*/ ctx[1]);
    			add_location(label, file$g, 33, 12, 911);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = /*control*/ ctx[4].value;
    			append_dev(label, t0);
    			append_dev(label, t1);
    			append_dev(label, t2);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", input_change_handler_1);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*manual_mode*/ 2 && input_disabled_value !== (input_disabled_value = !/*manual_mode*/ ctx[1])) {
    				prop_dev(input, "disabled", input_disabled_value);
    			}

    			if (dirty & /*controls*/ 1) {
    				input.checked = /*control*/ ctx[4].value;
    			}

    			if (dirty & /*controls*/ 1 && t1_value !== (t1_value = /*control*/ ctx[4].text + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*manual_mode*/ 2) {
    				toggle_class(label, "disabled", !/*manual_mode*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(33:8) {#each controls as control}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let br;
    	let t0;
    	let div;
    	let label;
    	let input;
    	let t1;
    	let t2;
    	let mounted;
    	let dispose;
    	let if_block = /*manual_mode*/ ctx[1] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			br = element("br");
    			t0 = space();
    			div = element("div");
    			label = element("label");
    			input = element("input");
    			t1 = text("\n                  Heaters Manual Mode");
    			t2 = space();
    			if (if_block) if_block.c();
    			add_location(br, file$g, 22, 0, 636);
    			attr_dev(input, "type", "checkbox");
    			add_location(input, file$g, 25, 8, 688);
    			attr_dev(label, "class", "svelte-4x5pkm");
    			add_location(label, file$g, 24, 4, 672);
    			set_style(div, "margin", "0.5em");
    			add_location(div, file$g, 23, 0, 641);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(label, input);
    			input.checked = /*manual_mode*/ ctx[1];
    			append_dev(label, t1);
    			append_dev(div, t2);
    			if (if_block) if_block.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*manual_mode*/ 2) {
    				input.checked = /*manual_mode*/ ctx[1];
    			}

    			if (/*manual_mode*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Checkbox_list_component', slots, []);

    	let { controls = [
    		{ value: false, text: 'He3 Pump A on' },
    		{ value: false, text: 'He3 Pump B on' },
    		{ value: false, text: 'He4 Pump A on' },
    		{ value: false, text: 'He4 Pump B on' },
    		{
    			value: false,
    			text: 'He3 Heat Switch A on'
    		},
    		{
    			value: false,
    			text: 'He3 Heat Switch B on'
    		},
    		{
    			value: false,
    			text: 'He4 Heat Switch A on'
    		},
    		{
    			value: false,
    			text: 'He4 Heat Switch B on'
    		}
    	] } = $$props;

    	let { manual_mode = true } = $$props;
    	const writable_props = ['controls', 'manual_mode'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Checkbox_list_component> was created with unknown prop '${key}'`);
    	});

    	function input_change_handler() {
    		manual_mode = this.checked;
    		$$invalidate(1, manual_mode);
    	}

    	function input_change_handler_1(each_value, control_index) {
    		each_value[control_index].value = this.checked;
    		$$invalidate(0, controls);
    	}

    	$$self.$$set = $$props => {
    		if ('controls' in $$props) $$invalidate(0, controls = $$props.controls);
    		if ('manual_mode' in $$props) $$invalidate(1, manual_mode = $$props.manual_mode);
    	};

    	$$self.$capture_state = () => ({ controls, manual_mode });

    	$$self.$inject_state = $$props => {
    		if ('controls' in $$props) $$invalidate(0, controls = $$props.controls);
    		if ('manual_mode' in $$props) $$invalidate(1, manual_mode = $$props.manual_mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [controls, manual_mode, input_change_handler, input_change_handler_1];
    }

    class Checkbox_list_component extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { controls: 0, manual_mode: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Checkbox_list_component",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get controls() {
    		throw new Error("<Checkbox_list_component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set controls(value) {
    		throw new Error("<Checkbox_list_component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get manual_mode() {
    		throw new Error("<Checkbox_list_component>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set manual_mode(value) {
    		throw new Error("<Checkbox_list_component>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Test2.svelte generated by Svelte v3.46.4 */

    const { Object: Object_1$1, console: console_1$3 } = globals;
    const file$h = "src/routes/Test2.svelte";

    // (210:8) {:else}
    function create_else_block$3(ctx) {
    	let loader;
    	let current;

    	loader = new Loader({
    			props: {
    				loading: !/*loaded*/ ctx[2] || /*update*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(loader.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(loader, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const loader_changes = {};
    			if (dirty & /*loaded, update*/ 12) loader_changes.loading = !/*loaded*/ ctx[2] || /*update*/ ctx[3];
    			loader.$set(loader_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(loader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(loader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(loader, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(210:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (208:8) {#if loaded && !update}
    function create_if_block$4(ctx) {
    	let uplot;
    	let current;

    	uplot = new Uplot_v3({
    			props: {
    				data: /*plot_data*/ ctx[1],
    				labels: /*plot_keys*/ ctx[4],
    				size: /*uplot_size*/ ctx[9]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(uplot.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(uplot, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const uplot_changes = {};
    			if (dirty & /*plot_data*/ 2) uplot_changes.data = /*plot_data*/ ctx[1];
    			if (dirty & /*plot_keys*/ 16) uplot_changes.labels = /*plot_keys*/ ctx[4];
    			if (dirty & /*uplot_size*/ 512) uplot_changes.size = /*uplot_size*/ ctx[9];
    			uplot.$set(uplot_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(uplot.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(uplot.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(uplot, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(208:8) {#if loaded && !update}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let t0;
    	let table;
    	let tr;
    	let td0;
    	let temptable;
    	let t1;
    	let config0;
    	let updating_choices;
    	let t2;
    	let config1;
    	let updating_choices_1;
    	let t3;
    	let heater;
    	let t4;
    	let timepicker;
    	let t5;
    	let td1;
    	let current_block_type_index;
    	let if_block;
    	let current;

    	temptable = new Temperature_table({
    			props: {
    				table_data: /*table_data*/ ctx[0],
    				title: /*title*/ ctx[6]
    			},
    			$$inline: true
    		});

    	function config0_choices_binding(value) {
    		/*config0_choices_binding*/ ctx[15](value);
    	}

    	let config0_props = {
    		label: `click to choose plot items`,
    		menu: /*all_plot_keys*/ ctx[5]
    	};

    	if (/*plot_keys*/ ctx[4] !== void 0) {
    		config0_props.choices = /*plot_keys*/ ctx[4];
    	}

    	config0 = new MyCollapse({ props: config0_props, $$inline: true });
    	binding_callbacks.push(() => bind(config0, 'choices', config0_choices_binding));
    	config0.$on("close", /*handleConfigPlotClose*/ ctx[11]);
    	config0.$on("open", /*handleConfigPlotOpen*/ ctx[10]);

    	function config1_choices_binding(value) {
    		/*config1_choices_binding*/ ctx[16](value);
    	}

    	let config1_props = {
    		label: `choose table items`,
    		menu: /*all_table_keys*/ ctx[8]
    	};

    	if (/*table_keys*/ ctx[7] !== void 0) {
    		config1_props.choices = /*table_keys*/ ctx[7];
    	}

    	config1 = new MyCollapse({ props: config1_props, $$inline: true });
    	binding_callbacks.push(() => bind(config1, 'choices', config1_choices_binding));
    	config1.$on("close", /*handleConfigTableClose*/ ctx[12]);
    	config1.$on("open", handleConfigTableOpen);
    	heater = new Checkbox_list_component({ $$inline: true });
    	timepicker = new Timepicker({ $$inline: true });
    	const if_block_creators = [create_if_block$4, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loaded*/ ctx[2] && !/*update*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			t0 = space();
    			table = element("table");
    			tr = element("tr");
    			td0 = element("td");
    			create_component(temptable.$$.fragment);
    			t1 = space();
    			create_component(config0.$$.fragment);
    			t2 = space();
    			create_component(config1.$$.fragment);
    			t3 = space();
    			create_component(heater.$$.fragment);
    			t4 = space();
    			create_component(timepicker.$$.fragment);
    			t5 = space();
    			td1 = element("td");
    			if_block.c();
    			document.title = "Test2 nodeWebFridge";
    			attr_dev(td0, "class", "column side");
    			set_style(td0, "max-width", "250px");
    			add_location(td0, file$h, 187, 8, 6839);
    			attr_dev(td1, "class", "column main");
    			set_style(td1, "width", "80%");
    			add_location(td1, file$h, 206, 4, 7493);
    			attr_dev(tr, "valign", "top");
    			add_location(tr, file$h, 186, 4, 6813);
    			add_location(table, file$h, 185, 0, 6801);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, table, anchor);
    			append_dev(table, tr);
    			append_dev(tr, td0);
    			mount_component(temptable, td0, null);
    			append_dev(td0, t1);
    			mount_component(config0, td0, null);
    			append_dev(td0, t2);
    			mount_component(config1, td0, null);
    			append_dev(td0, t3);
    			mount_component(heater, td0, null);
    			append_dev(td0, t4);
    			mount_component(timepicker, td0, null);
    			append_dev(tr, t5);
    			append_dev(tr, td1);
    			if_blocks[current_block_type_index].m(td1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const temptable_changes = {};
    			if (dirty & /*table_data*/ 1) temptable_changes.table_data = /*table_data*/ ctx[0];
    			if (dirty & /*title*/ 64) temptable_changes.title = /*title*/ ctx[6];
    			temptable.$set(temptable_changes);
    			const config0_changes = {};
    			if (dirty & /*all_plot_keys*/ 32) config0_changes.menu = /*all_plot_keys*/ ctx[5];

    			if (!updating_choices && dirty & /*plot_keys*/ 16) {
    				updating_choices = true;
    				config0_changes.choices = /*plot_keys*/ ctx[4];
    				add_flush_callback(() => updating_choices = false);
    			}

    			config0.$set(config0_changes);
    			const config1_changes = {};
    			if (dirty & /*all_table_keys*/ 256) config1_changes.menu = /*all_table_keys*/ ctx[8];

    			if (!updating_choices_1 && dirty & /*table_keys*/ 128) {
    				updating_choices_1 = true;
    				config1_changes.choices = /*table_keys*/ ctx[7];
    				add_flush_callback(() => updating_choices_1 = false);
    			}

    			config1.$set(config1_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(td1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(temptable.$$.fragment, local);
    			transition_in(config0.$$.fragment, local);
    			transition_in(config1.$$.fragment, local);
    			transition_in(heater.$$.fragment, local);
    			transition_in(timepicker.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(temptable.$$.fragment, local);
    			transition_out(config0.$$.fragment, local);
    			transition_out(config1.$$.fragment, local);
    			transition_out(heater.$$.fragment, local);
    			transition_out(timepicker.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(table);
    			destroy_component(temptable);
    			destroy_component(config0);
    			destroy_component(config1);
    			destroy_component(heater);
    			destroy_component(timepicker);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function handleConfigTableOpen(e) {
    	console.log('handleConfigTableOpen', e);
    }

    function getSize() {
    	return {
    		width: window.innerWidth - 300, // left column
    		height: window.innerHeight - 100, // top row of icons
    		
    	};
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let $redisSub;
    	validate_store(redisSub, 'redisSub');
    	component_subscribe($$self, redisSub, $$value => $$invalidate(14, $redisSub = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Test2', slots, []);
    	console.log(table_data_default);
    	let table_data = table_data_default;
    	table_data = { 'stage1': '', 'stage2': '' };
    	let all_plot_data = null;
    	let plot_data = null;
    	let loaded = false;
    	let update = false;
    	let title = new Date().toLocaleString();
    	let plot_keys; //  = ['stage1', 'stage2'];
    	let table_keys;
    	let all_plot_keys;
    	let all_table_keys;
    	let hostname = 'localhost';
    	let uplot_size = { width: 600, height: 400 };

    	function handleConfigPlotOpen(e) {
    		console.log('handleConfigPlotOpen', e);
    		$$invalidate(3, update = true);
    	}

    	function handleConfigPlotClose(e) {
    		console.log('handleConfigPlotClose', e);
    		build_plot_data();
    		$$invalidate(3, update = false);
    	}

    	function handleConfigTableClose(e) {
    		console.log('handleConfigTableClose', e);
    		$$invalidate(0, table_data = {});
    		table_keys.forEach(elt => $$invalidate(0, table_data[elt] = '-1', table_data));
    	}

    	async function getRedis(list_name) {
    		// Fetch all the sensor data from the server
    		console.log(`get list ${list_name} from redis`);

    		// let response = await fetch(`http://localhost:4000/get/${list_name}`)
    		let response = await fetch(`http://${hostname}:4000/get/${list_name}`);

    		let data = await response.json();
    		console.log('got ', data);
    		return data;
    	}

    	function build_plot_data() {
    		$$invalidate(1, plot_data = [all_plot_data[0]]);

    		plot_keys.forEach(key => {
    			let idx = all_plot_keys.indexOf(key);

    			// console.log( 'index of', idx);
    			plot_data.push(all_plot_data[idx + 1]);
    		});
    	}

    	async function fetchRedis() {
    		// Fetch all the sensor data from the server
    		console.log('fetchRedis');

    		$$invalidate(13, all_plot_data = null);

    		for (let key of all_plot_keys) {
    			console.log('process redis data', key);

    			// let response = await fetch(`http://localhost:4000/${key}/fetch`)
    			let response = await fetch(`http://${hostname}:4000/${key}/fetch`);

    			let data = await response.json();
    			let times = data.data.map(outer => Number(outer[0]) / 1000); //  convert from ms to s
    			let readings = data.data.map(outer => Number(outer[1]));

    			/*
    let times=[];
    let readings=[];
    */
    			if (all_plot_data) {
    				// plot_data defined... need to merge in new data
    				// console.log('merge into plot_data');
    				all_plot_data.push(readings);
    			} else {
    				$$invalidate(13, all_plot_data = [times, readings]);
    			} // console.log('create plot_data');
    			// console.log('times', times, readings);
    		}

    		build_plot_data();
    		$$invalidate(2, loaded = true);
    	}

    	// window resize debouncer from:
    	// https://svelte.dev/repl/33d2066858a44c6e800f2377105d8c38?version=3.46.4
    	const debounce = (func, delay) => {
    		let timer;

    		return function () {
    			const context = this;
    			const args = arguments;
    			clearTimeout(timer);
    			timer = setTimeout(() => func.apply(context, args), delay);
    		};
    	};

    	const setWindowWidth = () => {
    		let windowWidth = `${window.innerWidth}px`;
    		$$invalidate(9, uplot_size = getSize());
    		console.log(windowWidth, getSize());
    	};

    	const debouncedSetWindowWidth = debounce(setWindowWidth, 300);

    	onMount(async () => {
    		$$invalidate(9, uplot_size = getSize());
    		hostname = new URL(window.location.href).hostname;
    		console.log('hostname', hostname);
    		$$invalidate(5, all_plot_keys = await getRedis('plot_keys'));
    		$$invalidate(4, plot_keys = [...all_plot_keys]);
    		$$invalidate(4, plot_keys = ['CoolantIn', 'CoollantOut']);
    		console.log('onMount all_plot_keys', all_plot_keys, plot_keys);
    		$$invalidate(8, all_table_keys = await getRedis('table_keys'));
    		$$invalidate(7, table_keys = [...all_table_keys]);
    		console.log('onMount table_keys', table_keys);
    		$$invalidate(0, table_data = {});
    		$$invalidate(7, table_keys = ['CoolantIn', 'CoollantOut']);
    		table_keys.forEach(elt => $$invalidate(0, table_data[elt] = '-1', table_data));

    		// console.log('got p_k', p_k);
    		await fetchRedis();

    		window.addEventListener('resize', debouncedSetWindowWidth);
    		console.log('Finished onMounted');

    		return () => {
    			window.removeEventListener('resize', debouncedSetWindowWidth);
    		};
    	});

    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<Test2> was created with unknown prop '${key}'`);
    	});

    	function config0_choices_binding(value) {
    		plot_keys = value;
    		$$invalidate(4, plot_keys);
    	}

    	function config1_choices_binding(value) {
    		table_keys = value;
    		$$invalidate(7, table_keys);
    	}

    	$$self.$capture_state = () => ({
    		redisSub,
    		onMount,
    		Timepicker,
    		TempTable: Temperature_table,
    		table_data_default,
    		controls_default,
    		states_default,
    		Uplot: Uplot_v3,
    		Loader,
    		Config: MyCollapse,
    		Heater: Checkbox_list_component,
    		table_data,
    		all_plot_data,
    		plot_data,
    		loaded,
    		update,
    		title,
    		plot_keys,
    		table_keys,
    		all_plot_keys,
    		all_table_keys,
    		hostname,
    		uplot_size,
    		handleConfigPlotOpen,
    		handleConfigPlotClose,
    		handleConfigTableOpen,
    		handleConfigTableClose,
    		getRedis,
    		build_plot_data,
    		fetchRedis,
    		getSize,
    		debounce,
    		setWindowWidth,
    		debouncedSetWindowWidth,
    		$redisSub
    	});

    	$$self.$inject_state = $$props => {
    		if ('table_data' in $$props) $$invalidate(0, table_data = $$props.table_data);
    		if ('all_plot_data' in $$props) $$invalidate(13, all_plot_data = $$props.all_plot_data);
    		if ('plot_data' in $$props) $$invalidate(1, plot_data = $$props.plot_data);
    		if ('loaded' in $$props) $$invalidate(2, loaded = $$props.loaded);
    		if ('update' in $$props) $$invalidate(3, update = $$props.update);
    		if ('title' in $$props) $$invalidate(6, title = $$props.title);
    		if ('plot_keys' in $$props) $$invalidate(4, plot_keys = $$props.plot_keys);
    		if ('table_keys' in $$props) $$invalidate(7, table_keys = $$props.table_keys);
    		if ('all_plot_keys' in $$props) $$invalidate(5, all_plot_keys = $$props.all_plot_keys);
    		if ('all_table_keys' in $$props) $$invalidate(8, all_table_keys = $$props.all_table_keys);
    		if ('hostname' in $$props) hostname = $$props.hostname;
    		if ('uplot_size' in $$props) $$invalidate(9, uplot_size = $$props.uplot_size);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*plot_keys*/ 16) {
    			 console.log('plot_keys', plot_keys);
    		}

    		if ($$self.$$.dirty & /*$redisSub, table_data, loaded, all_plot_data, all_plot_keys, plot_data*/ 24615) {
    			 {
    				let msg = $redisSub.message;
    				let ready_to_update = false;

    				// console.log('got this redisSub message: ', msg);
    				if (msg) {
    					// Check if it is a valid dictionary
    					try {
    						// Try to convert message to dictonary
    						msg = JSON.parse(msg);

    						ready_to_update = true;
    					} catch(e) {
    						console.log('parse redis failed msg:', msg);
    					}
    				}

    				if (ready_to_update) {
    					// Update table
    					Object.keys(table_data).forEach(elt => {
    						$$invalidate(0, table_data[elt] = msg[elt], table_data);
    					});

    					// Update time
    					$$invalidate(6, title = new Date(msg.time).toLocaleString());

    					// Update plot
    					if (loaded) {
    						// console.log('got time:', msg.time);
    						all_plot_data[0].push(msg.time / 1000); // push time into plot_data, convert to seconds

    						all_plot_keys.forEach((key, idx) => {
    							// push sensor readings
    							all_plot_data[idx + 1].push(msg[key]);
    						});

    						build_plot_data();
    						((((($$invalidate(1, plot_data), $$invalidate(14, $redisSub)), $$invalidate(0, table_data)), $$invalidate(2, loaded)), $$invalidate(13, all_plot_data)), $$invalidate(5, all_plot_keys)); // this causes the plot to be updated
    					} // plot_keys = plot_keys;
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*loaded, plot_data*/ 6) {
    			 console.log('loaded', loaded, 'plot_data', plot_data);
    		}

    		if ($$self.$$.dirty & /*update*/ 8) {
    			 {
    				console.log('update', update);
    			}
    		}
    	};

    	return [
    		table_data,
    		plot_data,
    		loaded,
    		update,
    		plot_keys,
    		all_plot_keys,
    		title,
    		table_keys,
    		all_table_keys,
    		uplot_size,
    		handleConfigPlotOpen,
    		handleConfigPlotClose,
    		handleConfigTableClose,
    		all_plot_data,
    		$redisSub,
    		config0_choices_binding,
    		config1_choices_binding
    	];
    }

    class Test2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Test2",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/routes/Collapse.svelte generated by Svelte v3.46.4 */

    const { console: console_1$4 } = globals;
    const file$i = "src/routes/Collapse.svelte";

    function create_fragment$j(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = `Hello ${/*name*/ ctx[0]}!`;
    			add_location(h1, file$i, 10, 0, 218);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Collapse', slots, []);
    	let name = 'world';
    	let plot_keys = ['A', 'B', 'Ca'];
    	let show_keys = [...plot_keys];
    	let expanded = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$4.warn(`<Collapse> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ name, plot_keys, show_keys, expanded });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('plot_keys' in $$props) plot_keys = $$props.plot_keys;
    		if ('show_keys' in $$props) $$invalidate(2, show_keys = $$props.show_keys);
    		if ('expanded' in $$props) expanded = $$props.expanded;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	 console.log(show_keys);
    	return [name];
    }

    class Collapse extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Collapse",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.4 */

    function create_fragment$k(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: { routes: /*routes*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const routes = {
    		"/home": Home,
    		"/channel/:id": Channel,
    		"/test": Test,
    		"/": Test2,
    		"/test2": Test2,
    		"/Collapse": Collapse
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		Home,
    		Channel,
    		Test,
    		Test2,
    		Collapse,
    		routes
    	});

    	return [routes];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {},
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
