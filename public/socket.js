/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function() {
	/* __modules is an Array of functions; each function is a module added
		to the project */
var __modules = {},
	/* __modulesCache is an Array of cached modules, much like
		`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},
	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
/* If the module with the specified `uid` is cached, return it;
	otherwise, execute and cache it first. */
function __require(uid, parentUid) {
	if(!__moduleIsCached[uid]) {
		// Populate the cache initially with an empty `exports` Object
		__modulesCache[uid] = {"exports": {}, "loaded": false};
		__moduleIsCached[uid] = true;
		if(uid === 0 && typeof require === "function") {
			require.main = __modulesCache[0];
		} else {
			__modulesCache[uid].parent = __modulesCache[parentUid];
		}
		/* Note: if this module requires itself, or if its depenedencies
			require it, they will only see an empty Object for now */
		// Now load the module
		__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
		__modulesCache[uid].loaded = true;
	}
	return __modulesCache[uid].exports;
}
/* This function is the replacement for all `__filename` references within a
	project file.  The idea is to return the correct `__filename` as if the
	file was not concatenated at all.  Therefore, we should return the
	filename relative to the output file's path.

	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getFilename(path) {
	return require("path").resolve(__dirname + "/" + path);
}
/* Same deal as __getFilename.
	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getDirname(path) {
	return require("path").resolve(__dirname + "/" + path + "/../");
}
/********** End of header **********/
/********** Start module 0: C:\Users\Haryormeedey\Desktop\vidchat\public\test.js **********/
__modules[0] = function(module, exports) {
const WebSocketWrapper = __require(1,0);

window.socket = (server = "wss://" + location.host) => {
  let socket = new WebSocketWrapper(new WebSocket(server));
  socket.on("disconnect", function (wasOpen) {
    if (wasOpen) {
      console.log("qwertyu");
    }
    console.log("Reconnecting in 5 secs...");
    setTimeout(() => {
      socket.bind(new WebSocket(server));
    }, 5000);
  });
  socket.on("error", () => {
    socket.disconnect();
  });
  return socket;
};

return module.exports;
}
/********** End of module 0: C:\Users\Haryormeedey\Desktop\vidchat\public\test.js **********/
/********** Start module 1: C:\Users\Haryormeedey\Desktop\vidchat\public\wrapper.js **********/
__modules[1] = function(module, exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function () {
	/* __modules is an Array of functions; each function is a module added
 	to the project */
	var __modules = {},

	/* __modulesCache is an Array of cached modules, much like
 	`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},

	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
	/* If the module with the specified `uid` is cached, return it;
 	otherwise, execute and cache it first. */
	function __require(uid, parentUid) {
		if (!__moduleIsCached[uid]) {
			__modulesCache[uid] = { "exports": {}, "loaded": false };
			__moduleIsCached[uid] = true;
			if (uid === 0 && typeof require === "function") {
				require.main = __modulesCache[0];
			} else {
				__modulesCache[uid].parent = __modulesCache[parentUid];
			}
			/* Note: if this module requires itself, or if its depenedencies
   	require it, they will only see an empty Object for now */
			__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
			__modulesCache[uid].loaded = true;
		}
		return __modulesCache[uid].exports;
	}
	/* This function is the replacement for all `__getFilename("wrapper.js")` references within a
 	project file.  The idea is to return the correct `__getFilename("wrapper.js")` as if the
 	file was not concatenated at all.  Therefore, we should return the
 	filename relative to the output file's path.
 
 	`path` is the path relative to the output file's path at the time the
 	project file was concatenated and added to the output file.
 */
	function __getFilename(path) {
		return require("path").resolve(__getDirname("wrapper.js") + "/" + path);
	}
	/* Same deal as __getFilename.
 	`path` is the path relative to the output file's path at the time the
 	project file was concatenated and added to the output file.
 */
	function __getDirname(path) {
		return require("path").resolve(__getDirname("wrapper.js") + "/" + path + "/../");
	}
	/********** End of header **********/
	/********** Start module 0: /home/blake/Repositories/ws-wrapper/lib/wrapper.js **********/
	__modules[0] = function (module, exports) {
		"use strict";

		var WebSocketChannel = __require(1, 0);

		var WebSocketWrapper = function (_WebSocketChannel) {
			_inherits(WebSocketWrapper, _WebSocketChannel);

			function WebSocketWrapper(socket, options) {
				_classCallCheck(this, WebSocketWrapper);

				var _this = _possibleConstructorReturn(this, (WebSocketWrapper.__proto__ || Object.getPrototypeOf(WebSocketWrapper)).call(this));

				_this._wrapper = _this;
				options = options || {};
				if (typeof options.debug === "function") {
					_this._debug = options.debug;
				} else if (options.debug === true) {
					_this._debug = console.log.bind(console);
				} else {
					_this._debug = function () {}; // no-op
				}
				if (typeof options.errorToJSON !== "function") {
					_this._errorToJSON = function (err) {
						if (typeof window === "undefined") {
							return JSON.stringify({ "message": err.message });
						} else {
							return JSON.stringify(err, Object.getOwnPropertyNames(err));
						}
					};
				} else {
					_this._errorToJSON = options.errorToJSON;
				}
				if (options.requestTimeout > 0) _this._requestTimeout = options.requestTimeout | 0;
				_this._opened = false;
				_this._pendingSend = [];
				_this._lastRequestId = 0;
				/* Object of pending requests; keys are the request ID, values are
    	Objects containing `resolve` and `reject` functions used to
    	resolve the request's Promise. */
				_this._pendingRequests = {};
				/* Object of WebSocketChannels (except `this` associated with this
    	WebSocket); keys are the channel name. */
				_this._channels = {};
				_this._data = {};
				_this._socket = null;
				if (socket && socket.constructor) {
					_this.bind(socket);
				}
				return _this;
			}

			_createClass(WebSocketWrapper, [{
				key: "bind",
				value: function bind(socket) {
					var _this2 = this;

					if (this._socket) {
						var s = this._socket;
						s.onopen = s.onmessage = s.onerror = s.onclose = null;
					}
					this._socket = socket;
					socket.onopen = function (event) {
						_this2._opened = true;
						_this2._debug("socket: onopen");
						for (var i = 0; i < _this2._pendingSend.length; i++) {
							if (_this2.isConnected) {
								_this2._debug("wrapper: Sending pending message:", _this2._pendingSend[i]);
								try {
									_this2._socket.send(_this2._pendingSend[i]);
								} catch (e) {
									_this2._pendingSend = _this2._pendingSend.slice(i - 1);
									throw e;
								}
							} else {
								break;
							}
						}
						_this2._pendingSend = _this2._pendingSend.slice(i);
						_this2.emit("open", event);
						_this2.emit("connect", event);
					};
					socket.onmessage = function (event) {
						_this2._debug("socket: onmessage", event.data);
						_this2.emit("message", event, event.data);
						_this2._onMessage(event.data);
					};
					socket.onerror = function (event) {
						_this2._debug("socket: onerror", event);
						_this2.emit("error", event);
					};
					socket.onclose = function (event) {
						var opened = _this2._opened;
						_this2._opened = false;
						_this2._debug("socket: onclose", event);
						_this2.emit("close", event, opened);
						_this2.emit("disconnect", event, opened);
					};
					if (this.isConnected) {
						socket.onopen();
					}
					return this;
				}
			}, {
				key: "abort",
				value: function abort() {
					for (var id in this._pendingRequests) {
						this._pendingRequests[id].reject(new Error("Request was aborted"));
					}
					this._pendingRequests = {};
					this._pendingSend = [];
					return this;
				}
			}, {
				key: "of",
				value: function of(namespace) {
					if (namespace == null) {
						return this;
					}
					if (!this._channels[namespace]) {
						this._channels[namespace] = new WebSocketChannel(namespace, this);
					}
					return this._channels[namespace];
				}
			}, {
				key: "send",
				value: function send(data, ignoreMaxQueueSize) {
					if (this.isConnected) {
						this._debug("wrapper: Sending message:", data);
						this._socket.send(data);
					} else if (ignoreMaxQueueSize || this._pendingSend.length < WebSocketWrapper.MAX_SEND_QUEUE_SIZE) {
						this._debug("wrapper: Queuing message:", data);
						this._pendingSend.push(data);
					} else {
						throw new Error("WebSocket is not connected and send queue is full");
					}
					return this;
				}
			}, {
				key: "disconnect",
				value: function disconnect() {
					if (this._socket) this._socket.close.apply(this._socket, arguments);
					return this;
				}
			}, {
				key: "_onMessage",
				value: function _onMessage(msg) {
					try {
						msg = JSON.parse(msg);
						if (msg["ws-wrapper"] === false) return;
						if (msg.a) {
							var argsArray = [];
							for (var i in msg.a) {
								argsArray[i] = msg.a[i];
							}
							msg.a = argsArray;
						}
						/* If `msg` does not have an `a` Array with at least 1 element,
      	ignore the message because it is not a valid event/request */
						if (msg.a instanceof Array && msg.a.length >= 1 && (msg.c || WebSocketChannel.NO_WRAP_EVENTS.indexOf(msg.a[0]) < 0)) {
							var event = {
								"name": msg.a.shift(),
								"args": msg.a,
								"requestId": msg.i
							};
							var channel = msg.c == null ? this : this._channels[msg.c];
							if (!channel) {
								if (msg.i >= 0) {
									this._sendReject(msg.i, new Error("Channel '" + msg.c + "' does not exist"));
								}
								this._debug("wrapper: Event '" + event.name + "' ignored " + ("because channel '" + msg.c + "' does not exist."));
							} else if (channel._emitter.emit(event.name, event)) {
								this._debug("wrapper: Event '" + event.name + "' sent to " + "event listener");
							} else {
								if (msg.i >= 0) {
									this._sendReject(msg.i, new Error("No event listener for '" + event.name + "'" + (msg.c ? " on channel '" + msg.c + "'" : "")));
								}
								this._debug("wrapper: Event '" + event.name + "' had no " + "event listener");
							}
						} else if (this._pendingRequests[msg.i]) {
							this._debug("wrapper: Processing response for request", msg.i);
							if (msg.e !== undefined) {
								var err = msg.e;
								if (msg._ && err) {
									err = new Error(err.message);
									for (var key in msg.e) {
										err[key] = msg.e[key];
									}
								}
								this._pendingRequests[msg.i].reject(err);
							} else {
								this._pendingRequests[msg.i].resolve(msg.d);
							}
							clearTimeout(this._pendingRequests[msg.i].timer);
							delete this._pendingRequests[msg.i];
						}
					} catch (e) {
						/* Note: It's also possible for uncaught exceptions from event
      	handlers to end up here. */
					}
				}

				/* The following methods are called by a WebSocketChannel to send data
    	to the Socket. */

			}, {
				key: "_sendEvent",
				value: function _sendEvent(channel, eventName, args, isRequest) {
					var _this3 = this;

					var data = { "a": Array.prototype.slice.call(args) };
					if (channel != null) {
						data.c = channel;
					}
					var request;
					if (isRequest) {
						/* Unless we send petabytes of data using the same socket,
      	we won't worry about `_lastRequestId` getting too big. */
						data.i = ++this._lastRequestId;
						request = new Promise(function (resolve, reject) {
							var pendReq = _this3._pendingRequests[data.i] = {
								"resolve": resolve,
								"reject": reject
							};
							if (_this3._requestTimeout > 0) {
								pendReq.timer = setTimeout(function () {
									reject(new Error("Request timed out"));
									delete _this3._pendingRequests[data.i];
								}, _this3._requestTimeout);
							}
						});
					}
					this.send(JSON.stringify(data));
					return request;
				}
			}, {
				key: "_sendResolve",
				value: function _sendResolve(id, data) {
					this.send(JSON.stringify({
						"i": id,
						"d": data
					}), true /* ignore max queue length */);
				}
			}, {
				key: "_sendReject",
				value: function _sendReject(id, err) {
					var isError = err instanceof Error;
					if (isError) {
						err = JSON.parse(this._errorToJSON(err));
					}
					this.send(JSON.stringify({
						"i": id,
						"e": err,
						"_": isError ? 1 : undefined
					}), true /* ignore max queue length */);
				}
			}, {
				key: "get",
				value: function get(key) {
					return this._data[key];
				}
			}, {
				key: "set",
				value: function set(key, value) {
					this._data[key] = value;
					return this;
				}
			}, {
				key: "socket",
				get: function get() {
					return this._socket;
				},
				set: function set(socket) {
					this.bind(socket);
				}
			}, {
				key: "isConnecting",
				get: function get() {
					return this._socket && this._socket.readyState === this._socket.constructor.CONNECTING;
				}
			}, {
				key: "isConnected",
				get: function get() {
					return this._socket && this._socket.readyState === this._socket.constructor.OPEN;
				}
			}]);

			return WebSocketWrapper;
		}(WebSocketChannel);

		/* Maximum number of items in the send queue.  If a user tries to send more
  	messages than this number while a WebSocket is not connected, errors will
  	be thrown. */


		WebSocketWrapper.MAX_SEND_QUEUE_SIZE = 10;

		module.exports = WebSocketWrapper;

		return module.exports;
	};
	/********** End of module 0: /home/blake/Repositories/ws-wrapper/lib/wrapper.js **********/
	/********** Start module 1: /home/blake/Repositories/ws-wrapper/lib/channel.js **********/
	__modules[1] = function (module, exports) {
		"use strict";

		var EventEmitter = __require(2, 1).EventEmitter;

		/* A WebSocketChannel exposes an EventEmitter-like API for sending and handling
  	events or requests over the channel through the attached WebSocketWrapper.
  
  	`var channel = new WebSocketChannel(name, socketWrapper);`
  		- `name` - the namespace for the channel
  		- `socketWrapper` - the WebSocketWrapper instance to which data should
  			be sent
  */

		var WebSocketChannel = function () {
			function WebSocketChannel(name, socketWrapper) {
				_classCallCheck(this, WebSocketChannel);

				this._name = name;
				this._wrapper = socketWrapper;
				this._emitter = new EventEmitter();
				this._wrappedListeners = new WeakMap();
			}

			_createClass(WebSocketChannel, [{
				key: "on",


				/* Expose EventEmitter-like API
    	When `eventName` is one of the `NO_WRAP_EVENTS`, the event handlers
    	are left untouched, and the emitted events are just sent to the
    	EventEmitter; otherwise, event listeners are wrapped to process the
    	incoming request and the emitted events are sent to the WebSocketWrapper
    	to be serialized and sent over the WebSocket. */

				value: function on(eventName, listener) {
					if (this._name == null && WebSocketChannel.NO_WRAP_EVENTS.indexOf(eventName) >= 0)
						/* Note: The following is equivalent to:
      		`this._emitter.on(eventName, listener.bind(this));`
      	But thanks to eventemitter3, the following is a touch faster. */
						this._emitter.on(eventName, listener, this);else this._emitter.on(eventName, this._wrapListener(listener));
					return this;
				}
			}, {
				key: "once",
				value: function once(eventName, listener) {
					if (this._name == null && WebSocketChannel.NO_WRAP_EVENTS.indexOf(eventName) >= 0) this._emitter.once(eventName, listener, this);else this._emitter.once(eventName, this._wrapListener(listener));
					return this;
				}
			}, {
				key: "removeListener",
				value: function removeListener(eventName, listener) {
					if (this._name == null && WebSocketChannel.NO_WRAP_EVENTS.indexOf(eventName) >= 0) this._emitter.removeListener(eventName, listener);else this._emitter.removeListener(eventName, this._wrappedListeners.get(listener));
					return this;
				}
			}, {
				key: "removeAllListeners",
				value: function removeAllListeners(eventName) {
					this._emitter.removeAllListeners(eventName);
					return this;
				}
			}, {
				key: "eventNames",
				value: function eventNames() {
					return this._emitter.eventNames();
				}
			}, {
				key: "listeners",
				value: function listeners(eventName) {
					if (this._name == null && WebSocketChannel.NO_WRAP_EVENTS.indexOf(eventName) >= 0) return this._emitter.listeners(eventName);else {
						return this._emitter.listeners(eventName).map(function (wrapper) {
							return wrapper._original;
						});
					}
				}

				/* The following `emit` and `request` methods will serialize and send the
    	event over the WebSocket using the WebSocketWrapper. */

			}, {
				key: "emit",
				value: function emit(eventName) {
					if (this._name == null && WebSocketChannel.NO_WRAP_EVENTS.indexOf(eventName) >= 0) return this._emitter.emit.apply(this._emitter, arguments);else return this._wrapper._sendEvent(this._name, eventName, arguments);
				}

				/* Temporarily set the request timeout for the next request. */

			}, {
				key: "timeout",
				value: function timeout(tempTimeout) {
					this._tempTimeout = tempTimeout;
					return this;
				}
			}, {
				key: "request",
				value: function request(eventName) {
					var oldTimeout = this._wrapper._requestTimeout;
					if (this._tempTimeout !== undefined) {
						this._wrapper._requestTimeout = this._tempTimeout;
						delete this._tempTimeout;
					}
					var ret = this._wrapper._sendEvent(this._name, eventName, arguments, true);
					this._wrapper._requestTimeout = oldTimeout;
					return ret;
				}
			}, {
				key: "_wrapListener",
				value: function _wrapListener(listener) {
					if (typeof listener !== "function") {
						throw new TypeError("\"listener\" argument must be a function");
					}
					var wrapped = this._wrappedListeners.get(listener);
					if (!wrapped) {
						wrapped = function channelListenerWrapper(event) {
							var _this4 = this;

							/* This function is called when an event is emitted on this
       	WebSocketChannel's `_emitter` when the WebSocketWrapper
       	receives an incoming message for this channel.  If this
       	event is a request, special processing is needed to
       	send the response back over the socket.  Below we use
       	the return value from the original `listener` to
       	determine what response should be sent back.
       		`this` refers to the WebSocketChannel instance
       	`event` has the following properties:
       	- `name`
       	- `args`
       	- `requestId`
       */
							try {
								var returnVal = listener.apply(this, event.args);
							} catch (err) {
								if (event.requestId >= 0) {
									/* If event listener throws, pass that Error back
         	as a response to the request */
									this._wrapper._sendReject(event.requestId, err);
								}
								throw err;
							}
							if (returnVal instanceof Promise) {
								/* If event listener returns a Promise, respond once
        	the Promise resolves */
								returnVal.then(function (data) {
									if (event.requestId >= 0) {
										_this4._wrapper._sendResolve(event.requestId, data);
									}
								}).catch(function (err) {
									if (event.requestId >= 0) {
										_this4._wrapper._sendReject(event.requestId, err);
									}
								});
							} else if (event.requestId >= 0) {
								/* Otherwise, assume that the `returnVal` is what
        	should be passed back as the response */
								this._wrapper._sendResolve(event.requestId, returnVal);
							}
						}.bind(this); // Bind the channel to the `channelListenerWrapper`
						wrapped._original = listener;
						this._wrappedListeners.set(listener, wrapped);
					}
					return wrapped;
				}
			}, {
				key: "get",
				value: function get(key) {
					return this._wrapper.get(key);
				}
			}, {
				key: "set",
				value: function set(key, value) {
					this._wrapper.set(key, value);
					return this;
				}
			}, {
				key: "name",
				get: function get() {
					return this._name;
				},
				set: function set(name) {
					throw new Error("Setting the channel name is not allowed");
				}
			}]);

			return WebSocketChannel;
		}();

		WebSocketChannel.prototype.addListener = WebSocketChannel.prototype.on;
		WebSocketChannel.prototype.off = WebSocketChannel.prototype.removeListener;
		WebSocketChannel.NO_WRAP_EVENTS = ["open", "message", "error", "close", "disconnect"];
		module.exports = WebSocketChannel;

		return module.exports;
	};
	/********** End of module 1: /home/blake/Repositories/ws-wrapper/lib/channel.js **********/
	/********** Start module 2: /home/blake/Repositories/ws-wrapper/node_modules/eventemitter3/index.js **********/
	__modules[2] = function (module, exports) {
		'use strict';

		var has = Object.prototype.hasOwnProperty,
		    prefix = '~';

		/**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @private
   */
		function Events() {}
		if (Object.create) {
			Events.prototype = Object.create(null);
			if (!new Events().__proto__) prefix = false;
		}

		/**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @private
   */
		function EE(fn, context, once) {
			this.fn = fn;
			this.context = context;
			this.once = once || false;
		}

		/**
   * Add a listener for a given event.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @private
   */
		function addListener(emitter, event, fn, context, once) {
			if (typeof fn !== 'function') {
				throw new TypeError('The listener must be a function');
			}

			var listener = new EE(fn, context || emitter, once),
			    evt = prefix ? prefix + event : event;

			if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);else emitter._events[evt] = [emitter._events[evt], listener];

			return emitter;
		}

		/**
   * Clear event by name.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} evt The Event name.
   * @private
   */
		function clearEvent(emitter, evt) {
			if (--emitter._eventsCount === 0) emitter._events = new Events();else delete emitter._events[evt];
		}

		/**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @public
   */
		function EventEmitter() {
			this._events = new Events();
			this._eventsCount = 0;
		}

		/**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @public
   */
		EventEmitter.prototype.eventNames = function eventNames() {
			var names = [],
			    events,
			    name;

			if (this._eventsCount === 0) return names;

			for (name in events = this._events) {
				if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
			}

			if (Object.getOwnPropertySymbols) {
				return names.concat(Object.getOwnPropertySymbols(events));
			}

			return names;
		};

		/**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @public
   */
		EventEmitter.prototype.listeners = function listeners(event) {
			var evt = prefix ? prefix + event : event,
			    handlers = this._events[evt];

			if (!handlers) return [];
			if (handlers.fn) return [handlers.fn];

			for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
				ee[i] = handlers[i].fn;
			}

			return ee;
		};

		/**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @public
   */
		EventEmitter.prototype.listenerCount = function listenerCount(event) {
			var evt = prefix ? prefix + event : event,
			    listeners = this._events[evt];

			if (!listeners) return 0;
			if (listeners.fn) return 1;
			return listeners.length;
		};

		/**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */
		EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
			var evt = prefix ? prefix + event : event;

			if (!this._events[evt]) return false;

			var listeners = this._events[evt],
			    len = arguments.length,
			    args,
			    i;

			if (listeners.fn) {
				if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

				switch (len) {
					case 1:
						return listeners.fn.call(listeners.context), true;
					case 2:
						return listeners.fn.call(listeners.context, a1), true;
					case 3:
						return listeners.fn.call(listeners.context, a1, a2), true;
					case 4:
						return listeners.fn.call(listeners.context, a1, a2, a3), true;
					case 5:
						return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
					case 6:
						return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
				}

				for (i = 1, args = new Array(len - 1); i < len; i++) {
					args[i - 1] = arguments[i];
				}

				listeners.fn.apply(listeners.context, args);
			} else {
				var length = listeners.length,
				    j;

				for (i = 0; i < length; i++) {
					if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

					switch (len) {
						case 1:
							listeners[i].fn.call(listeners[i].context);break;
						case 2:
							listeners[i].fn.call(listeners[i].context, a1);break;
						case 3:
							listeners[i].fn.call(listeners[i].context, a1, a2);break;
						case 4:
							listeners[i].fn.call(listeners[i].context, a1, a2, a3);break;
						default:
							if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
								args[j - 1] = arguments[j];
							}

							listeners[i].fn.apply(listeners[i].context, args);
					}
				}
			}

			return true;
		};

		/**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
		EventEmitter.prototype.on = function on(event, fn, context) {
			return addListener(this, event, fn, context, false);
		};

		/**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
		EventEmitter.prototype.once = function once(event, fn, context) {
			return addListener(this, event, fn, context, true);
		};

		/**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @public
   */
		EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
			var evt = prefix ? prefix + event : event;

			if (!this._events[evt]) return this;
			if (!fn) {
				clearEvent(this, evt);
				return this;
			}

			var listeners = this._events[evt];

			if (listeners.fn) {
				if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
					clearEvent(this, evt);
				}
			} else {
				for (var i = 0, events = [], length = listeners.length; i < length; i++) {
					if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
						events.push(listeners[i]);
					}
				}
				if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;else clearEvent(this, evt);
			}

			return this;
		};

		/**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @public
   */
		EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
			var evt;

			if (event) {
				evt = prefix ? prefix + event : event;
				if (this._events[evt]) clearEvent(this, evt);
			} else {
				this._events = new Events();
				this._eventsCount = 0;
			}

			return this;
		};
		EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
		EventEmitter.prototype.addListener = EventEmitter.prototype.on;
		EventEmitter.prefixed = prefix;
		EventEmitter.EventEmitter = EventEmitter;
		if ('undefined' !== typeof module) {
			module.exports = EventEmitter;
		}

		return module.exports;
	};
	/********** End of module 2: /home/blake/Repositories/ws-wrapper/node_modules/eventemitter3/index.js **********/
	/********** Footer **********/
	if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") module.exports = __require(0);else return __require(0);
})();
/********** End of footer **********/

return module.exports;
}
/********** End of module 1: C:\Users\Haryormeedey\Desktop\vidchat\public\wrapper.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/
