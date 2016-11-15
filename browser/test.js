var env = require('system').env;
casper.options.viewportSize = {
  width: 1024,
  height: 768,
};
var login = function (casper) {
  casper.thenOpen(env.CDMS_BASE_URL)
  casper.waitForSelector(
    '#ctl00_ContentPlaceHolder1_PassiveIdentityProvidersDropDownList',
    function () {
      this.fill('form#aspnetForm', {
          ctl00$ContentPlaceHolder1$PassiveIdentityProvidersDropDownList: env.CDMS_ADFS_URL,
        }, true);
    }
  );
  casper.then(function () {
    this.click('#ctl00_ContentPlaceHolder1_PassiveSignInButton');
  });
  casper.waitForSelector('#ContentPlaceHolder1_SubmitButton',
    function () {
      this.sendKeys('#ContentPlaceHolder1_UsernameTextBox', env.CDMS_USERNAME);
      this.sendKeys('#ContentPlaceHolder1_PasswordTextBox', env.CDMS_PASSWORD);
      this.click('#ContentPlaceHolder1_SubmitButton');
    }
  ).then(function () {
    if (this.getTitle() == 'Mobile Express - Microsoft Dynamics CRM') {
      casper.echo('Logged in');
      this.thenOpen(env.CDMS_BASE_URL);
    } else {
      casper.echo('Waiting for login to succeed');
      login(casper);
    }
  });
};

casper.test.begin('Login to CDMS', 1, function suite(test) {
  casper.start(env.CDMS_BASE_URL);
  login(casper);
  casper.waitForSelector('#CrmChart', function () {
    test.assert(true);
  });
  /*
  */
  casper.wait(500000);
  casper.run(function () {
      test.done();
  });
});
