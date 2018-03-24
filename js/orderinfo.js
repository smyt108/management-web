
$(function(){
    $.get("sidebar.html", function(result){
        $(".main-sidebar").html(result);
    });

    $.get("head.html", function(result){
        $(".main-header").html(result);
    });
    $.get("foot.html", function(result){
        $(".main-footer").html(result);
    });

    $("#chkIsSpecial").click(function () {
        if($(this).prop('checked')){
            $("[opertaion]").removeAttr("disabled");
        }
        else{
            $("[opertaion]").attr("disabled","disabled");
        }

    })
})