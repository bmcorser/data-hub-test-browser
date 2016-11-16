var require = patchRequire(require);
var env = require('system').env;

var login = function (casper) {
  casper.thenOpen(env.CDMS_BASE_URL)
  casper.waitForSelector(
    '#ctl00_ContentPlaceHolder1_PassiveIdentityProvidersDropDownList',
    function () {
      this.fill(
        'form#aspnetForm',
        {
          ctl00$ContentPlaceHolder1$PassiveIdentityProvidersDropDownList: env.CDMS_ADFS_URL,
        },
        true
      );
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
    this.waitForSelector( '#Content',
      function () {
        casper.open(env.CDMS_BASE_URL + '/main.aspx')
      },
      function () { login(casper); },
      1000
    );
  });
};

module.exports = {login: login};
