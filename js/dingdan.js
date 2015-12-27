// function Select(num){
// 	for(var i=1; i<5; i++)
// 	{
// 		document.getElementById("button_"+i).style.backgroundColor="#CDCDCD";
// 		document.getElementById("button_"+i).style.color="#000000";
// 	}
// 	document.getElementById("button_"+num).style.backgroundColor="#696969";
// 	document.getElementById("button_"+num).style.color="#ffffff";
// }

//container 容器，count 总页数 pageindex 当前页数
function setPage(container, count, pageindex,loc) {
var container = container;
var count = count;
var pageindex = pageindex;
var location = loc;
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
      window.location=location+"?page="+inx;
      setPage(container, count, inx);
      return false;
    }
    for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
      oAlink[i].onclick = function() {
        inx = parseInt(this.innerHTML);
        window.location=location+"?page="+inx;
        setPage(container, count, inx);
        return false;
      }
    }
    oAlink[oAlink.length - 1].onclick = function() { //点击下一页
      if (inx == count) {
        return false;
      }
      inx++;
      window.location=location+"?page="+inx;
      setPage(container, count, inx);
      return false;
    }
  } ()
}
 function delclick(data,location){
  alert(location);
  // $.post("http://www.homeuhere.com/api/order/"+data.data[i].orderId,
  //   {
  //     "_method":"delete"
  //   },
  //   function(data){
  //     alert(data.message);
  //     if(data.message == "success"){
  //       alert("删除成功！");
  //       window.location.href=location;
  //     }
      
  // });
};
function loading(type){
  $.get("http://www.homeuhere.com/api/user/",null,function(data){
      if(data.code == 2001){
        window.location.href = 'home.html';
        alert(data.message);
      }
      else if(data.code == 200){
          document.getElementById('nav_all_username').innerHTML = data.userTel;
      }
  });
  $.get("http://www.homeuhere.com/api/order/",
  {
    "listType":type
  },function(data,state){
      var url = window.location.pathname;
      var loc = url.substring(url.lastIndexOf('/')+1, url.length);
      if(data.code == 200){
        var id = 1
        var url = document.location.search; 
          if (url.indexOf("?") != -1) {    
              var str = url.substr(1); 
              strs = str.split("=");   
              id = strs[1]       
          }
        var pages= parseInt(data.dataSize / 3);
        if(data.dataSize % 3 != 0 ){
          pages = pages + 1;
        }
        var num = (id-1)*3;
        if(data.dataSize > 0){
          setPage(document.getElementById("pages"),pages,id,loc);
        }
        
         for(var i =num; i<3+num&&i<data.dataSize;i++){
          var dataId = data.data[i].orderId;
          var table = document.createElement("table");
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          var img = document.createElement("img");
          img.src=data.data[i].picPath;
          td1.appendChild(img);

          var td2 = document.createElement("td");
          var div1 = document.createElement("div");
          div1.innerHTML=data.data[i].orderId;
          var div2 = document.createElement("div");
          div2.innerHTML="房屋名称:"+data.data[i].suiteTitle;
          var div3 = document.createElement("div");
          div3.innerHTML="下单时间:"+data.data[i].orderTime;
          var div4 = document.createElement("div");
          div4.innerHTML="入住离开时间:"+data.data[i].inTime+"至"+data.data[i].outTime;
          td2.appendChild(div1);
          td2.appendChild(div2);
          td2.appendChild(div3);
          td2.appendChild(div4);
          var td3 = document.createElement("td");
          var span1 = document.createElement("span");
          var span1_1 = document.createElement("span");
          span1_1.innerHTML = "￥"+data.data[i].realPrice;;
          span1_1.setAttribute("class","price");
          var span1_2 = document.createElement("span");
          span1_2.innerHTML = "/晚";
          span1.appendChild(span1_1);
          span1.appendChild(span1_2);
          var span2 = document.createElement("span");
          span2.innerHTML= "￥"+data.data[i].suitePrice;
          td3.appendChild(span1);
          td3.appendChild(span2);
          var td4 = document.createElement("td");
          var div5 = document.createElement("div");
          var div6 = document.createElement("div");
          var div7 = document.createElement("div");
          var a1 = document.createElement("a");
          var a2 = document.createElement("a");
          var a3 = document.createElement("a");
          var span0 = document.createElement("span");
          span0.setAttribute("class","grayspan");
          if(data.data[i].orderStatus==0){
            a1.href = "paydetail.html?orderId="+data.data[i].orderId;
            a2.href = "pay.html?id="+ dataId;
            a1.text = "订单详情";
            a2.text = "待支付";
            span0.innerHTML = "取消订单";
            div5.appendChild(a1);
            div6.appendChild(a2);
            div7.appendChild(span0);
            td4.appendChild(div5);
            td4.appendChild(div6);
            td4.appendChild(div7);
          }
          else if(data.data[i].orderStatus==1&&data.data[i].isDeleted==false){
            a1.href = "paydetail.html?orderId="+ data.data[i].orderId;
            a2.href = "javascript:void(0)";
            a1.text = "订单详情";
            a2.text = "删除";
            a2.onclick= function(){
                $.post("http://www.homeuhere.com/api/order/"+ dataId,
                  {
                    "_method":"delete"
                  },
                  function(data){
                    alert(data.message);
                    if(data.message == "success"){
                      alert("删除成功！");
                      window.location.href=loc;
                    }
                    
                });
            };

            span0.innerHTML = "已完成";
            div5.appendChild(a1);
            div7.appendChild(span0);
            div6.appendChild(a2);
            td4.appendChild(div5);
            td4.appendChild(div6);
            td4.appendChild(div7);
          }
          else if(data.data[i].orderStatus==1&&data.data[i].isDeleted==true){
            a1.href = "paydetail.html?orderId="+data.data[i].orderId;
            a2.href = "house.html?suitId="+data.data[i].suiteId;
            a1.text = "订单详情";
            a2.text = "立即下单";
            span0.innerHTML = "删除订单";
            div5.appendChild(a1);
            div7.appendChild(span0);
            div6.appendChild(a2);
            td4.appendChild(div5);
            td4.appendChild(div6);
            td4.appendChild(div7);
          }
          else if(data.data[i].orderStatus==2){
            a1.href = "paydetail.html?orderId="+data.data[i].orderId;
            a2.href = "house.html?suitId="+data.data[i].suiteId;
            a1.text = "订单详情";
            a2.text = "立即下单";
            //span0.innerHTML = "删除订单";
            div5.appendChild(a1);
            div7.appendChild(span0);
            div6.appendChild(a2);
            td4.appendChild(div5);
            td4.appendChild(div6);
            td4.appendChild(div7);
          }
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          table.appendChild(tr);
          var dditem = document.getElementById("dditem");
          dditem.appendChild(table);
         }
      } 
    });

    
}


// function mainfunction(type){
//   window.load = loading(type);
// }

function logout(){
    $.get("http://www.homeuhere.com/api/auth/logout",null,function(data){
        if(data.code == 200){
          window.location.href="home.html";
        }
    });
}
