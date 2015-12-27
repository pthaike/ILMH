function fun_search(jsondata){
	
	$.post("http://www.homeuhere.com/api/suite/",
	jsondata,function(data){
		if(data.code == 200){

		document.getElementById("resnum").innerHTML = data.dataSize;

        var id = 1
        var url = document.location.search; 
          if (url.indexOf("?") != -1) {    
              var str = url.substr(1); 
              strs = str.split("=");   
              id = strs[1]
              if(isNaN(id)){
                id=1;
              }     
              // alert(id);
          }

        var pages= parseInt(data.dataSize / 4);
        if(data.dataSize % 4 != 0 ){
          pages = pages + 1;
        }
        var num = (id-1)*4;
        var searchtb = document.getElementById("searchtb");
        var numtmp = num;
        if(data.dataSize > 0){
          setPage(document.getElementById("pages"),pages,id);
          var map = new BMap.Map("leftmap");    // 创建Map实例
          map.centerAndZoom(new BMap.Point(parseFloat(data.data[num].posLongitude),parseFloat(data.data[num].posLatitude)), 15);  // 初始化地图,设置中心点坐标和地图级别
          map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          map.setCurrentCity("成都");          // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放 
        }

    		for( var i = 0; i<2&&numtmp<data.dataSize; i++){
    			var tr = document.createElement("tr");
    			for(var j = 0; j<2&&numtmp<data.dataSize;j++){
    				
    				var td1 = document.createElement("td");
    				var table1 = document.createElement("table");
    				table1.setAttribute("class","table2");
    				//alert(data.data[numtmp].pictureUrl);
    				var tr1_1 = document.createElement("tr");
    				var tr1_2 = document.createElement("tr");
    				var tr1_3 = document.createElement("tr");
    				var td1_1 = document.createElement("td");
    				var td1_2 = document.createElement("td");
    				var td1_3 = document.createElement("td");

    				var img1 = document.createElement("img");
    				img1.src=data.data[numtmp].pictureUrl;
    				
            var a1 = document.createElement("a");
            a1.appendChild(img1);
            a1.href = "house.html?suitId="+data.data[numtmp].suitId;
            td1_1.appendChild(a1);
    				td1_2.innerHTML =data.data[numtmp].suiteTitle;
    				td1_3.innerHTML = "￥"+data.data[numtmp].realPrice;
    				tr1_1.appendChild(td1_1);
    				tr1_2.appendChild(td1_2);
    				tr1_3.appendChild(td1_3);
    				table1.appendChild(tr1_1);
    				table1.appendChild(tr1_2);
    				table1.appendChild(tr1_3);
    				td1.appendChild(table1);
    				tr.appendChild(td1);

    				var marker = new BMap.Marker(new BMap.Point(parseFloat(data.data[num].posLongitude),parseFloat(data.data[num].posLatitude)));
    				map.addOverlay(marker);
    				marker.setAnimation(BMAP_ANIMATION_BOUNCE);

    				numtmp= numtmp +1;
    			}
    			searchtb.appendChild(tr);
    		}
    	}
		
   	});
}


var url = document.location.search; 
if (url.indexOf("?") != -1) {    
    var str = url.substr(1); 
    strs = str.split("=");   
    id = strs[1]
    if(isNaN(id)){
      strs = str.split("&");   
      fromtime = strs[0].split("=")[1];
      totime = strs[1].split("=")[1];  
      $("#search_1_2").val(fromtime+" to "+totime);
      var jsondata ={
        "fromDate":fromtime,
        "toDate":totime
      };
      $('#searchtb tr').remove();
      $('#pages a').remove();
      fun_search(jsondata);
    } else{
       fun_search(null);
    }   
    // alert(id);
}else{
  fun_search(null);
}


function setPage(container, count, pageindex) {
var container = container;
var count = count;
var pageindex = pageindex;
var a = [];
  //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
  if (pageindex == 1) {
    a[a.length] = "<a href=\"#\" class=\"prev unclick\">prev</a>";
  } else {
    a[a.length] = "<a href=\"#\" class=\"prev\">prev</a>";
  }
  function setPageList() {
    if (pageindex == i) {
      a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
    } else {
      a[a.length] = "<a href=\"#\">" + i + "</a>";
    }
  }
  //总页数小于10
  if (count <= 10) {
    for (var i = 1; i <= count; i++) {
      setPageList();
    }
  }
  //总页数大于10页
  else {
    if (pageindex <= 4) {
      for (var i = 1; i <= 5; i++) {
        setPageList();
      }
      a[a.length] = "...<a href=\"#\">" + count + "</a>";
    } else if (pageindex >= count - 3) {
      a[a.length] = "<a href=\"#\">1</a>...";
      for (var i = count - 4; i <= count; i++) {
        setPageList();
      }
    }
    else { //当前页在中间部分
      a[a.length] = "<a href=\"#\">1</a>...";
      for (var i = pageindex - 2; i <= pageindex + 2; i++) {
        setPageList();
      }
      a[a.length] = "...<a href=\"#\">" + count + "</a>";
    }
  }
  if (pageindex == count) {
    a[a.length] = "<a href=\"#\" class=\"next unclick\">next</a>";
  } else {
    a[a.length] = "<a href=\"#\" class=\"next\">next</a>";
  }
  container.innerHTML = a.join("");
  //事件点击
  var pageClick = function() {
    var oAlink = container.getElementsByTagName("a");
    var inx = pageindex; //初始的页码
    oAlink[0].onclick = function() { //点击上一页
      if (inx == 1) {
        return false;
      }
      inx--;
      window.location="search_home.html?page="+inx;
      setPage(container, count, inx);
      return false;
    }
    for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
      oAlink[i].onclick = function() {
        inx = parseInt(this.innerHTML);
        window.location="search_home.html?page="+inx;
        setPage(container, count, inx);
        return false;
      }
    }
    oAlink[oAlink.length - 1].onclick = function() { //点击下一页
      if (inx == count) {
        return false;
      }
      inx++;
      window.location="search_home.html?page="+inx;
      setPage(container, count, inx);
      return false;
    }
  } ()
}




function searchcon(){
	var date = $(".search_date").val().split("to");
	var fromDate = $.trim(date[0]);
	var toDate = $.trim(date[1]);
	var lowestPrice =  $( "#slider-range" ).slider( "values", 0 );
	var highestPrice =  $( "#slider-range" ).slider( "values", 1 );
	var fitnum = $("#select1").val();
	var spot = $("#select2").val();
	var spotname = $("#spotname").val();
	
	var jsondata ={
		"fromDate":fromDate,
		"toDate":toDate,
		"lowestPrice":lowestPrice,
		"highestPrice":highestPrice,
		"fitNum":fitnum,
		"spotType":spot,
		"spotName":spotname
	};
	$('#searchtb tr').remove();
  $('#pages a').remove();
	fun_search(jsondata);

}