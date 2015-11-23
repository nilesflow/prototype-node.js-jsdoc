/**
 * @fileoverview WebSocketとRedisの連動
 *     起点ファイル
 */
var domain = require('domain');
var share = require('./share.js');
var logger = share.logger;

var WebSocketClient = require('./lib/WebSocketClient.js');
var Server = require('./lib/Server.js');


var d = domain.create();

d.on('error', function(err){
  logger.error('Init Error');
  logger.error(err);
//  logger.error(err.error);
});

d.run(function() {

	var wsclient = WebSocketClient.create();
	var server = Server.create();
  server.run();
  wsclient.run(process.argv[2]);
});

process.on('uncaughtException', onError);

function onError(err) {
  logger.fatal(err);
}