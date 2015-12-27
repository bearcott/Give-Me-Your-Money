
//set it to test mode if its not declared
PUBLISHABLE_KEY = (typeof PUBLISHABLE_KEY !== 'undefined') ? PUBLISHABLE_KEY : "pk_test_6pRNASCoBOKtIshFeQd4XMUh";
IMAGE = (typeof IMAGE !== 'undefined') ? IMAGE  : "/me.png";
NAME = (typeof NAME !== 'undefined') ? NAME : "A Handsome Guy";
DESCRIPTION = (typeof DESCRIPTION !== 'undefined') ? DESCRIPTION : "with your money.";

//stripe handler
var handler = StripeCheckout.configure({
    key: PUBLISHABLE_KEY,
    image: IMAGE,
    locale: 'auto',
    allowRememberMe: false,
    bitcoin: true,
    token: function(token) {
      alert('thx');
    }
  });

//interaction
$(function() {

  $('button.ok').click(function(e) {
    e.preventDefault();
    $('.howMuch').show();
  });

  $('button.pay').click(function(e) {
    e.preventDefault();
    var amount = (isNaN(parseInt($('input[name=amount]').val())) || $('input[name=amount]').val() == 0) ? 1 : Math.abs(parseInt($('input[name=amount]').val()*100));

    handler.open({
      name: NAME,
      description: DESCRIPTION,
      amount: amount
    });
    e.preventDefault();
  });

  $('input').keyup(function(e) {
    if (e.keyCode == 13)
      $('button.pay').click(); 
  });
});
