/**
 * @fileoverview WebSocketサーバ 
 */
/**
 * @exports WebSocketServer
 */
var share = require('../share');
var logger = share.logger;

var domain = require('domain');

var Server = require('ws').Server;
var util = require('util');
var Base = require('./Base.js').Base;

/**
 * インスタンス生成
 */
exports.create = function() {
  return new WebSocketServer();
};


util.inherits(WebSocketServer, Base);

/**
 * @constructor
 * @extends Base
 */
function WebSocketServer() {
	Base.call(this);
}

/**
 * @public
 */
WebSocketServer.prototype.run = function () {
  this.wss = new Server({port: 8080});
  this.wss.on('connection', this.onConnection.bind(this));
};

/**
 * 接続のコールバック
 * @callback
 */
WebSocketServer.prototype.onConnection = function (ws) {
  ws.on('message', this.onMessage.bind(this));
  this.ws = ws;
};

/**
 * メッセージ受信時に呼ばれる
 * @callback
 */
WebSocketServer.prototype.onMessage = function (message) {
  var self = this;
  var d = domain.create();
  d.add(self);
  
  d.on('error', function(err){
    logger.error('Message Error');
    logger.error(err);
  });

  d.run(function() {
    if (message == 'wss') {
      throw new Error('in ws message');
    }
    var obj = {message : message, d: d};
    self.emit('message', obj);
  });
};

/**
 * メッセージを送信する
 * @public
 */
WebSocketServer.prototype.send = function(message) {
  if (message == 'send') {
    throw new Error('in send message');
  }
  this.ws.send(message, this.domain.bind( // process._tickDomainCallback ????
    this.onSend.bind(this, message)));
};

/**
 * @public
 */
WebSocketServer.prototype.error = function(message) {
  this.ws.send('Message Error', this.onSend.bind(this));
};

/**
 * メッセージ送信のコールバック
 * @callback
 * @see {WebSocketServer~send}
 * @see {WebSocketServer}
 * @see WebSocketServer
 * @see send
 */
WebSocketServer.prototype.onSend = function(message /* bind */) {
  logger.debug('sent.');
  if (message == 'sent') {
    throw new Error('in sent');
//    this.emit('error', new Error('in sent'));
  }

};