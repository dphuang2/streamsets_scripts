$(document).ready(function(){
  var group_list = ".goals, .research, .script, .github";
  $(group_list).css("display", "none");
  $(".goals").css("display", "block");
  var button_list = "#goals, #research, #script, #github";
  $(button_list).click(function(){
    var button_name = "#"+this.id;
    var group_name = "."+this.id;
    $(button_list).removeClass("active");
    $(button_name).addClass("active");
    $(group_list).css("display","none");
    $(group_name).css("display","block");
  });
});
