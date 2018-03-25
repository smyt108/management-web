
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

    $.post('orderlist.json','',function(result){
    	var data = result.data;
    	var rowStr='';
    	$.each(data.rows,function(index, el) {
    		rowStr+=renderTr(index+1,el);
    	});

    	var orderList = JSON.parse(localStorage.getItem('orderList'));
    	$.each(orderList,function(index, el) {
    		rowStr+=renderTr((index+1+data.rows.length),el);
    	});

    	$('#orderListTa').append(rowStr);
    	console.log(data);
    })

    



    function renderTr(index,item){
    	var trHtml = "";
    	trHtml+='<tr>'+
	    '<td>'+index+'</td>'+
	    '<td>'+item.id+'</td>'+
	    '<td>'+item.outerOrderId+'</td>'+
	    '<td>'+item.buyer+'</td>'+
	    '<td>'+item.productCode+'</td>'+
	    '<td>'+item.deliveryTime+'</td>'+
	    '<td><a>查看</a></td>'+
	'</tr>';
		return trHtml; 		
    }

})