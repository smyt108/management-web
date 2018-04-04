
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
    	var origionOrderList = result.data.rows;
    	var orderList = [];

    	if(localStorage.getItem('orderList')!=null){
    		orderList = JSON.parse(localStorage.getItem('orderList'));
    	}
    	

    	var orderIdList = orderList.map(function(item){
    			return item.id;
    	})

    	$.each(origionOrderList,function(index,value){
    		if($.inArray(value.id, orderIdList)<0){
				orderList.push(value);
    		}
　　　　})

    	orderList.sort(function (m, n) {
		 if (m.id < n.id) return -1
		 else if (m.id > n.id) return 1
		 else return 0
		});

    	localStorage.setItem('orderList',JSON.stringify(orderList));

    	var rowStr='';
    	
    	$.each(orderList,function(index, el) {
    		rowStr+=renderTr(index+1,el);
    	});

    	$('#orderListTa').append(rowStr);
    	
    	$(".order-view").click(function(){
    		var orderid=$(this).data("orderid")
    		showOrderInfo(orderid);
    	})

    })
var dialogVue = new Vue({
	el: '#orderinfo_app',
	data:{
		orderinfo:{
			productName:"",
    	    id: 0,
			outerOrderId: 0,
			buyer: 0,
			receiver: 0,
			phoneNo: 0,
			chargeType: 0,
			deliveryTime: 0,
			requiredBrand: 0,
			unit: 0,
			orderNum: 0,
			requiredQuality: 0,
			createTime: 0,
			createUserName: 0,
			productId: 0,
			productCode: 0,
			material: 0,
			wireType: 0,
			wireSize: 0,
			tension: 0,
			clothType: 0,
			thickness: 0,
			outerPerimeter: 0,
			attachSize: 0,
			actualMoldRequired: 0,
			isSpecial: 0,
			moldId: 0,
			moldCategory: 0,
			moldType: 0,
			moldSize: 0
		}
	}})
    

    function showOrderInfo(orderid){
    	$("#Ctl_OrderInfo").modal({backdrop:false})

		var orderList = JSON.parse(localStorage.getItem('orderList'));

		var orderinfo = orderList.filter(function(item){
			return item.id==orderid;
		})[0];

		dialogVue.orderinfo = orderinfo;

    }

    
    function renderTr(index,item){
    	var trHtml = "";
    	trHtml+='<tr>'+
	    '<td>'+index+'</td>'+
	    '<td>'+item.id+'</td>'+
	    '<td>'+item.outerOrderId+'</td>'+
	    '<td>'+item.buyer+'</td>'+
	    '<td>'+item.productName+'</td>'+
	    '<td>'+item.deliveryTime+'</td>'+
	    '<td><a href="javascript:void(0)" class="order-view" data-orderid="'+item.id+'">查看</a></td>'+
	'</tr>';
		return trHtml; 		
    }

})