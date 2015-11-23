/**
 * @fileoverview サーバ
 */
/**
 * @exports Server
 * @requires WebSocketServer
 */
var share = require('../share');
var logger = share.logger;

var util = require('util');

var Base = require('./Base.js').Base;
var WebSocketServer = require('./WebSocketServer');
var RedisClient = require('./RedisClient');
var domain = require('./DomainSync');

/**
 * インスタンス生成
 */
exports.create = function() {
  return new Server();
};

util.inherits(Server, Base);

/**
 * @constructor
 * @extends Base
 */
function Server() {
	Base.call(this);
  
  this.wsserver = WebSocketServer.create();
  this.redis = RedisClient.create();
  
  // ���g�ɔ�΂��Ă݂�
  this.on('message', this.onMyMessage.bind(this));
}

/**
 * サーバ起動
 * @public
 * @override
 */
Server.prototype.run = function () {
  this.wsserver.on('message', this.onMessage.bind(this));
  this.redis.on('message', this.onRedisMessage.bind(this));
  
  this.wsserver.run();
  this.redis.run();
};

/**
 * WebSocketからのメッセージ受信
 * @callback
 */
Server.prototype.onMessage = function (obj) { 
  if (obj.message == 's') {
    throw new Error('in server message');
  }
//  obj.d.add(this);
  this.emit('message', obj);
};

/**
 * 自身のメッセージ受信
 * @callback
 */
Server.prototype.onMyMessage = function (obj) {
	obj.d.add(this);

	logger.debug(obj.message);
	this.redis.publish(obj);
}

/**
 * Redisからのメッセージ受信
 * @callback
 */
Server.prototype.onRedisMessage = function (message) {
  var self = this;
  var d = domain.create();
  
  d.on('error', function(err){
    logger.error('Message Error');
    logger.error(err);
    self.wsserver.error();
  });

  logger.debug(message);

  d.run(function() {
    if (message == 'rm') {
      throw new Error('in redis message');
    }
    self.wsserver.send(message);
  });
};

/**
 * ログ出力
 * @protected
 */
Server.prototype.log = function (msg) {
	
};

/**
 * サーバ定期イベント開始
 * @private
 * @param
 */
Server.prototype.startTick = function () {
	
};
