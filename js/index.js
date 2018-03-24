$(function () {
    $.get("menu.html", function(result){
        $("#menu").html(result);
    });
})