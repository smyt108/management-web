
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

    var productList =[];

    $.ajax({
        url: 'product.json',
        type: 'POST',
        dataType: 'json',
        data: {},
        async:false,
        success:function(data){
            productList = data;
        }
    })

    

    $("[name='isSpecialD']").click(function () {
        if($(this).prop('checked')){
            $("[opertaion]").removeAttr("disabled");
        }
        else{
            $("[opertaion]").attr("disabled","disabled");
        }
        $('input[name="isSpecial"]').val($(this).attr('checked'));
    })

    $("[name='productCode']").blur(function () {
        var code = $(this).val().trim();
        var matchList = productList.filter(function(item) {
            return item.productCode==code;
        });

        if(matchList.length<=0){
            alert("没有该类型产品哦！");
            $("#productinfo").find('[opertaion]').val("");
            return;
        }

        var product = matchList[0];
        /*$("[name='material']").val(product.material);
        $("[name='wireType']").val(product.wireType);
        $("[name='wireSize']").val(product.wireSize);
        $("[name='tension']").val(product.tension);
        $("[name='clothType']").val(product.clothType);
        $("[name='thickness']").val(product.thickness);
        $("[name='outerPerimeter']").val(product.outerPerimeter);
        $("[name='attachSize']").val(product.attachSize);
        $("[name='moldId']").val(product.moldId);*/

        $('input[opertaion]').each(function(index,el){
            $(el).val(product[$(el).attr('name')]);
        })
    })

    // 订单提交
    $('#btnSubmit').click(function(event) {
        var obj = {};
        $('#orderBox input[name]').each(function(index,el){
            var $item = $(el);
            // console.log(el)
            obj[$item.attr('name')] = $item.val();
        })
        var orderListStr = localStorage.getItem('orderList');
        var orderlist = []
        if(orderListStr!=undefined&&orderListStr!=""){
            orderlist = JSON.parse(orderListStr);
        }


        $.post('orderlist.json','',function(result){
            var rows = result.data.rows;



            var idArr = rows.map(function(item){
                return item.id;
            })

            var appendIdArr = orderlist.map(function(item){
                return item.id;
            })

            var newArr = idArr.concat(appendIdArr);
            obj.id = Math.max.apply(null, idArr.concat(appendIdArr))+1;
            orderlist.push(obj);
            localStorage.setItem('orderList',JSON.stringify(orderlist));
            
        })

        
    });
})