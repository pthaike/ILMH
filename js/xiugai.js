function loading(){
	$.get("http://www.homeuhere.com/api/user/",function(data,state){
		if(data.code == 2001){
			window.location.href = 'home.html';
			alert(data.message);
		}
		else if(data.code == 200){
			document.getElementById("userTel").value = data.userTel;
			document.getElementById("tokens").value = data.token;
			$("#nav_all_username").html(data.userTel);
			if(data.userName != undefined){
				document.getElementById("userName").value = data.userName;
			}
			if(data.userGender != undefined){
				if(userGender == 0){
					document.getElementById("female").style.checked ="checked";
				}else{
					document.getElementById("male").style.checked ="checked";
				}
			}
			if(data.userEmail != undefined){
				document.getElementById("userEmail").value = data.userEmail;
			}
		}
	});

}
window.load = loading();

function changeInfo(){
	var gender = 1;
	if(document.getElementById("female").checked == true){
		gender = 0;
	}
	if( $("#new_pwd").val() == ""){
		$.post("http://www.homeuhere.com/api/user/",{
	        "userName":document.getElementById("userName").value,
	        "userEmail":document.getElementById("userEmail").value,
	        "token":document.getElementById("tokens").value,
	        "userGener":gender,
	        "_method":"put"
	    },function(data){
	        if(data.code == 200){
	        	alert("修改成功");
	        }else if(data.code == 2001){
	        	window.location.href = 'home.html';
				alert(data.message);
	        }
	        }
	    );
	}else{
		$.post("http://www.homeuhere.com/api/user/",{
	        "userName":document.getElementById("userName").value,
	        "userEmail":document.getElementById("userEmail").value,
	        "token":document.getElementById("tokens").value,
	        "userGener":gender,
	        "userNewPw":$("#new_pwd").val(),
	        "_method":"put"
	    },function(data){
	        if(data.code == 200){
	        	alert("修改成功");
	        }else if(data.code == 2001){
	        	window.location.href = 'home.html';
				alert(data.message);
	        }
	        }
	    );
	}
	
}	

function logout(){
    $.get("http://www.homeuhere.com/api/auth/logout",null,function(data){
        if(data.code == 200){
        	window.location.href="home.html";
        }
    });
}