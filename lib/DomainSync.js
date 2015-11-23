/**
 * @fileoverview ドメインWrapper
 */
/**
 * @exports DomainSync
 */
var util = require('util');
var Domain = require('domain');

/**
 * インスタンス生成
 * @public
 */
exports.create = function() {
  return new DomainSync();
};

/**
 * ドメインのWrapperをします。
 * @constructor
 * @param none
 */
function DomainSync() {
  this.d = Domain.create();
}

/**
 * イベント登録
 * @public
 * @param evt {String} イベント
 * @param fn {callback} コールバック
 */
DomainSync.prototype.on = function(evt, fn) {
  this.d.on(evt, fn);
};

/**
 * ドメイン開始
 * @public
 * @param fn {Function} 実行関数
 */
DomainSync.prototype.run = function(fn) {
  try {
    this.d.run(fn);
  }
  catch(e) {
    this.d.emit('error',e);
  }
};
