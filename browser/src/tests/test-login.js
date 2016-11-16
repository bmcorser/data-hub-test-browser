var env = require('system').env;
var login = require('../login').login;


casper.test.begin('Login to CDMS', 1, function suite(test) {
  casper.start(env.CDMS_BASE_URL);
  login(casper);
  casper.then(function () {
    test.assertEval(function () {
      return document.querySelectorAll('ul')[1].id == 'Mscrm.DashboardTab';
    }, 'Dyanmics dashboard appears to be present');
  });
  casper.run(function () {
      test.done();
  });
});
