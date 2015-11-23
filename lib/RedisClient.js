/**
 * @fileoverview Redisのクライアント
 */
/**
 * @exports RedisClient
 */
var share = require('../share');
var logger = share.logger;

var redis = require('redis');

var util = require('util');
var Base = require('./Base.js').Base;

/**
 * インスタンス生成
 */
exports.create = function() {
  return new RedisClient();
};

util.inherits(RedisClient, Base);

/**
 * @constructor
 * @extends {Base}
 */
function RedisClient() {
	Base.call(this);
  var self = this;
  
  this.pub = redis.createClient();
  this.sub = redis.createClient();
  this.pub.on('error', function(err) {
    logger.error(err);
  });
  this.sub.on('error', function(err) {
    logger.error(err);
    self.emit('error', err);
  });
}

/**
 * 実行
 * @public
 * @override
 */
RedisClient.prototype.run = function () {

  this.sub.subscribe('test', function(err, reply) {
	  
  });
  this.sub.on('message', this.onSubscribe.bind(this));
};

/**
 * サブスクライブでのメッセージ受信
 * @callback {RedisClient~onSubscribe}
 * @fires message
 */
RedisClient.prototype.onSubscribe = function(channel, message) {
  logger.debug(message);
  if (message == 'sub') {
    throw new Error('in subscribe');
  }
  this.emit('message', message);
};

/**
 * メッセージをpublish
 * @public
 * @link RedisClient~onPublish
 */
RedisClient.prototype.publish = function(obj) {
  if (obj.message == 'pub') {
    throw new Error('in publish');
  }
  this.pub.publish('test', obj.message, this.onPublish.bind(this, obj));
};

/**
 * publiscのコールバック
 * 成功したかどうか
 * @callback {RedisClient~onPublish}
 */
RedisClient.prototype.onPublish = function(obj /*b*/, err, reply) {
  logger.debug(err);
  logger.debug('published ' + reply);
  
  if (obj.message == 'onpub') {
    throw new Error('in onpub');
  }
};