$(document).ready(function() {
  var onShow = $("#show-form-shipping");
  var height2 = $(".content-page-shift .content-page:visible").height();
  $(".content-page-shift").height(height2);
  var decrease = $("#btn-decrease");
  var increase = $("#btn-increase");
  var result = parseInt($("#result").val());

  onShow.click(function() {
    $(".form-shipping").slideToggle();
  });
  decrease.click(function() {
    console.log("test giam");
    if (result > 1) {
      result--;
      $("#result").val(result);
    }
  });
  increase.click(function() {
    if (result >= 1) {
      result++;
      $("#result").val(result);
    }
  });
});
