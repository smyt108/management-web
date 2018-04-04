
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
        checkIsSpecial($(this))
    })

    $("[name='productCode']").blur(function () {
        autoFillInfo($(this));
    })

    function checkIsSpecial($this){
        var $form = $this.parents("[name='orderItem']");
        if($this.prop('checked')){
            $form.find("[opertaion]").removeAttr("disabled");
        }
        else{
            $form.find("[opertaion]").attr("disabled","disabled");
        }
        $form.find('input[name="isSpecial"]').val($this.attr('checked'));
    }

    

    function autoFillInfo($this){
        var code = $this.val().trim();
        var matchList = productList.filter(function(item) {
            return item.productCode==code;
        });

        if(matchList.length<=0){
            //alert("没有该类型产品哦！");
            //$("#productinfo").find('[opertaion]').val("");
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

        $this.parents("[name='orderItem']").find('input[opertaion]').each(function(index,el){
            $(el).val(product[$(el).attr('name')]);
        })
    }

    $("#addcontinue").click(function(){
        var $form = $('<form class="form-horizontal" name="orderItem"><form>');
        $form = $form.append($("[name='orderItem']").html());
        $form.append("<button class='btn btn-info' type='button' delete>删除</button>")
        $(".order-item").append($form);

        $form.find("[name='isSpecialD']").click(function () {
            checkIsSpecial($(this))
        })

        $form.find("[name='productCode']").blur(function () {
            autoFillInfo($(this));
        })

        $form.find("[delete]").click(function() {
            $(this).parent().remove();
        })
    })

    // 订单提交
    $('#btnSubmit').click(function(event) {
        var obj = {};

        $("[name='orderbrife']").find("input[name]").each(function(index, el) {
            var $item = $(el);
            // console.log(el)
            obj[$item.attr('name')] = $item.val();
        });

        $('#orderBox input[name]').each(function(index,el){
            var $item = $(el);
            // console.log(el)
            obj[$item.attr('name')] = $item.val();
        })

        var productArr=[]
        $("[name='orderItem']").each(function(index, form) {
            var product={}
            $(form).find("input[name]").each(function(index, el) {
                var $item = $(el);
                // console.log(el)
                product[$item.attr('name')] = $item.val();
            });
            productArr.push(product);
        });

        obj["productInfos"] = productArr;
        
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