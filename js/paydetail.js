function paydetail(){
	var url = document.location.search; 
	var id = 0;
	if (url.indexOf("?") != -1) {    
		var str = url.substr(1); 
		strs = str.split("=");   
		id = strs[1]       
	}else{
		alert("无效订单页面");
		window.location.href = 'home.html';
	}
	$.get("http://www.homeuhere.com/api/user/",null,function(data){
	    if(data.code == 2001){
	      window.location.href = 'home.html';
	      alert(data.message);
	    }
	    else if(data.code == 200){
	        document.getElementById('nav_all_username').innerHTML = data.userTel;
	    }
	});

	$.get("http://www.homeuhere.com/api/order/"+id,function(data){
		if(data.orderStatus == 0){
			$("#orderStatus").html("待支付");
	    	$("#orderStatus1").html("待支付");
		}
	    else if(data.orderStatus == 1&&data.isDeleted==false){
	    	$("#orderStatus").html("已完成");
	    	$("#orderStatus1").html("已完成");
	    }else if(data.orderStatus == 1&&data.isDeleted==true){
	    	$("#orderStatus").html("已删除");
	    	$("#orderStatus1").html("已删除");
	    }else{
	    	$("#orderStatus").html("已关闭");
	    	$("#orderStatus1").html("已关闭");
	    }
	    $("#picPath").attr("src",data.picPath);
	    $("#picPath1").attr("src",data.picPath);
	    $("#orderId").html(data.orderId);
	    $("#suiteTitle").html(data.suiteTitle);
	    $("#inTime").html(data.inTime);
	    $("#outTime").html(data.outTime);
	    $("#orderTime").html(data.orderTime);
	    $("#payType").html(data.payType);
	    $("#totalPrice").html("￥"+data.totalPrice);
	    $("#stayTime").html(data.stayTime+"天");
	    $("#realPrice").html("￥"+data.realPrice);

	    var map = new BMap.Map("leftmap1");    // 创建Map实例
		map.centerAndZoom(new BMap.Point(parseFloat(data.posLongitude),parseFloat(data.posLatitude)), 15);  // 初始化地图,设置中心点坐标和地图级别
		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
		map.setCurrentCity("成都");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放   
		var marker = new BMap.Marker(new BMap.Point(parseFloat(data.posLongitude),parseFloat(data.posLatitude)));
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	});
}

window.load = paydetail();

