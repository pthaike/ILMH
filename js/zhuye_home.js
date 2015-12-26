
$.get("http://www.homeuhere.com/api/user/",function(data,state){
	if(data.code == 2001){
		window.location.href = 'home.html';
		alert(data.message);
	}
	else if(data.code == 200){
		document.getElementById("userTel").innerHTML = data.userTel;
		$("#nav_all_username").html(data.userTel);
		if(data.userName != undefined){
			document.getElementById("userName").innerHTML = data.userName;
			$("#userName1").html(data.userName);
		}
		if(data.userGender != undefined){
			if(data.userGender == 0){
				$("#userGender").html("女");
			}
			else{
				$("#userGender").html("男");
			}
		}
		if(data.userEmail != undefined){
			document.getElementById("userEmail").innerHTML = data.userEmail;
		}
		
	}
});

$.post("http://www.homeuhere.com/api/suite/",
	{
		"pageSize":8
	},function(data){
		if(data.code == 200){
			var pics = ["img1","img2","img3","img4","img5","img6","img7","img8"];
			var hrs = ["a1","a2","a3","a4","a5","a6","a7","a8"]
			for (var i = 0; i < data.data.length; i++) {
				document.getElementById(pics[i]).src = data.data[i].pictureUrl;
				document.getElementById(hrs[i]).href = "house.html?suitId="+data.data[i].suitId;
			};
		}
	});

function logout(){
    $.get("http://www.homeuhere.com/api/auth/logout",null,function(data){
        if(data.code == 200){
        	window.location.href="home.html";
        }
    });
}