/**
 * @fileoverview 基底クラス
 */
/**
 * @exports Base
 */
var share = require('../share');
var logger = share.logger;

var redis = require('redis');

var util = require('util');
var EventEmitter = require('events').EventEmitter;

util.inherits(Base, EventEmitter);

exports.Base = Base;

/**
 * @constructor
 * @extends EventEmitter
 * @param
 */
function Base() {
  EventEmitter.call(this);
}

/**
 * 実行関数
 * @abstract
 * @param arg {objcet} テスト
 */
Base.prototype.run = function(arg) {
	
};
