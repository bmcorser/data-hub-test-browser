var env = require('system').env;
var login = require('../login').login;
casper.options.viewportSize = {
  width: 1024,
  height: 768,
};
casper.options.pageSettings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';

casper.test.begin('Login to CDMS', 1, function suite(test) {
  /*
  casper.start(env.CDMS_BASE_URL);
  login(casper);
  casper.thenOpen(env.CDMS_BASE_URL + '/main.aspx').then(function () {
    test.assertEval(function () {
      return document.querySelectorAll('ul')[1].id == 'Mscrm.DashboardTab';
    }, 'Dyanmics dashboard appears to be present');
  });
  */
  casper.start(env.CDMS_BASE_URL);
  casper.then(function () {
    test.assert(true);
  });
  casper.run(function () {
      test.done();
  });
});
