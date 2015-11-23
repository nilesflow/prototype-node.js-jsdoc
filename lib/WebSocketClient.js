/**
 * @fileoverview WebSocketクライアント
 */
/**
 * @exports WebSocketClient
 */
var share = require('../share');
var logger = share.logger;

var WebSocket = require('ws');

var util = require('util');
var Base = require('./Base.js').Base;

/**
 * インスタンス生成
 */
exports.create = function() {
  return new WebSocketClient();
};


util.inherits(WebSocketClient, Base);

/**
 * @constructor
 * @extends Base
 */
function WebSocketClient() {
	Base.call(this);
}

/**
 * @public
 * @override
 */
WebSocketClient.prototype.run = function (message) {
  this.ws = new WebSocket('ws://127.0.0.1:8080/');
  this.ws.on('open', this.onOpen.bind(this));
  
  if (message !== undefined) {
    this.message = message;
  }
  else {
    this.message = 'undefined message';
  }
};

/**
 * @callback
 */
WebSocketClient.prototype.onOpen = function () {
  logger.debug('opened.');
  
  this.ws.on('message', this.onMessage.bind(this));

  this.ws.send(this.message);
};

/**
 * @callback
 */
WebSocketClient.prototype.onMessage = function (message) {
  logger.debug(message);
};