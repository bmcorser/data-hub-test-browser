var http = require('http');
casper.options.viewportSize = {
  width: 1024,
  height: 768,
};

casper.options.pageSettings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';

var cdmsDelete = function (odataName, guid, callback) {
  var httpOpts = {
    hostname: casper.cli.options.deleterHost,
    port: casper.cli.options.deleterPort,
    path: '/' + odataName + '/' + guid,
    agent: false,
  };
  http.get(httpOpts, callback);
};
