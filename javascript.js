
//set it to test mode if its not declared
PUBLISHABLE_KEY = (typeof PUBLISHABLE_KEY !== 'undefined') ? PUBLISHABLE_KEY : "pk_test_6pRNASCoBOKtIshFeQd4XMUh";
IMAGE = (typeof IMAGE !== 'undefined') ? IMAGE  : "me.png";
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
      $('h1').fadeOut(function() {
        $(this).html("Can I have more? lol").fadeIn();
      });
    }
  });

//interaction
$(function() {

  $('button.ok').click(function(e) {
    e.preventDefault();
    $('.howMuch').removeClass("out");
    $('.howMuch input').focus();
    $('button.ok').addClass('active');
    $('h1').fadeOut(function() {
      $(this).html("How much of your money?").fadeIn();
    });
  });
  $('a.close').click(function() {
  });

  $('button.pay').click(function(e) {
    e.preventDefault();
    var amount = (isNaN(parseInt($('input[name=amount]').val())) || $('input[name=amount]').val() == 0) ? 1 : Math.abs(parseInt($('input[name=amount]').val()*100));

    handler.open({
      name: NAME,
      description: DESCRIPTION,
      amount: amount,
      closed: function() {
        var random = ["Pretty pleaseee","Cmonnnnn","But im poor..","I'll pay it back..","No thats the wrong button..","Click the pay button!","What would denko do? (´・ω・`)","It's for a good cause","JUST DO IT","Ok, I agree, that was too much. Just give me like half of that."];
        $('h1').fadeOut(function() {
          $(this).html(random[Math.floor(Math.random()*random.length)]).fadeIn();
        });
      }
    });
    e.preventDefault();
  });

  $('input').keyup(function(e) {
    if (e.keyCode == 13)
      $('button.pay').click(); 
  });
});
