$(function () {
    H_login = {};
    H_login.openLogin = function(){
        $('.login-header a').click(function(){
            $('.login').show();
            $('.login-bg').show();
        });
    };
    H_login.closeLogin = function(){
        $('.close-login').click(function(){
            $('.login').hide();
            $('.login-bg').hide();
        });
    };
    H_login.opencountlogin = function(){
        $('#count_login_link').click(function(){
            $('.message_login').hide();
            $('.count_login').show();
            document.getElementById('count_login_title').style.borderBottom="solid red 1px";
            document.getElementById('message_login_title').style.borderBottom='none';
            lgcountgettk();
        });
    }
    H_login.openmsglogin = function(){
        $('#msg_login_link').click(function(){
            $('.count_login').hide();
            $('.message_login').show();
            document.getElementById('message_login_title').style.borderBottom='solid red 1px'
            document.getElementById('count_login_title').style.borderBottom="none";
            lgcountgettk();
        });
    }
    H_login.openregbox = function(){
        $('.reg_instant a').click(function(){
            $('.phone-log').hide();
            $('.register').show();
            lgcountgettk();
        });
    }
    H_login.openloginbox = function(){
        $('.login_instant a').click(function(){
            $('.register').hide();
            $('.phone-log').show();
            lgcountgettk();
        });
    }
    H_login.navregopen = function(){
        $('#navreg').click(function(){
            $('.login').show();
            $('.login-bg').show();
            $('.phone-log').hide();
            $('.register').show();
            lgcountgettk();
        });
    }
    H_login.run = function () {
        this.closeLogin();
        this.openLogin();
        this.opencountlogin();
        this.openmsglogin();
        this.openregbox();
        this.openloginbox();
        this.navregopen();
    };
    H_login.run();
});


  //账户登录
  function countlg(){
    var countinput = $('#lgusername');
    var lgusername = $('#lgusername').val();
    var pswdinput = $('#lgpassword');
    var pswdval = $('#lgpassword').val();
    var token = $('#lg_count_tk');
    var tokenval = $('#lg_count_tk').val();
    if (lgusername == "") {
        alert("请输入账号");
        countinput.focus();
        return false;
    };
    if (pswdval == "") {
        alert("请输入密码");
        pswdinput.focus();
        return false;
    };
    if(tokenval == ""){
        alert("请输入验证码");
        lgcountgettk();
        token.focus();
        return false;
    }
    $.post("http://www.homeuhere.com/api/auth/login",{
        "userTel":lgusername,
        "userPw":pswdval,
        "captchaToken":tokenval
    },function(data){
        if (data.code == 200) {
            $('.login').hide();
            $('.login-bg').hide();
            $('.list-input').val('');
            $('.token-input').val('');
            setuser();
        }else{
            alert(data.message);
            lgcountgettk();
            return false;
        }
        return true;
    },"json");
  }
    //短信登录
    function msglogin(){
        var phoneinput = $('#msg_phone');
        var phonenum = $('#msg_phone').val();
        var codeinput = $('#msg_lg_code_input');
        var codeval = $('#msg_lg_code_input').val();
        var token = $('#lg_msg_tk');
        var tokenval = $('#lg_msg_tk').val();
        if(phonenum == ""){
            alert("请输入手机号");
            phoneinput.focus();
            return false;
        }
        if (codeval == "") {
            alert("请输入手机号");
            codeinput.focus();
            return false;
        };
        if(tokenval == ""){
            alert("请输入验证码");
            lgcountgettk();
            token.focus();
            return false;
        }
        $.post("http://www.homeuhere.com/api/auth/login",
        {
            "userTel":phonenum,
            "authCode":codeval,
            "captchaToken":tokenval
        },function(data){
            if (data.code == 200) {
                $('.login').hide();
                $('.login-bg').hide();
                $('.item-input').val('');
                $('.token-input').val('');
                setuser();
            }else{
                alert(data.message);
                lgcountgettk();
                return false;
            }
            
            return true;
        });
    }
    //手机登录获取验证码
    function getmsgcode(){
        var phoneinput = $('#msg_phone');
        var phonenum = $('#msg_phone').val();
        if(phonenum == ""){
            alert("请输入手机号");
            phoneinput.focus();
            return false;
        }
        $.post("http://www.homeuhere.com/api/auth/getTelAuthCode",
        {
            "userTel":phonenum
        }, function(data){
            if(data.code == 200){
                time($('#getcodebt'));
            }
        }
            );
        var wait = 60;
        function time(o){
            if (wait == 0) {
                o.removeAttr("disabled");
                o.attr("value", "获取验证码"); 
                wait = 60;
            }else{
                o.attr("disabled", true); 
                o.attr("value", wait+"s"); 
                wait--; 
                setTimeout(function(){
                    time(o);
                },1000);
            }
        }
    }

    //注册验证码
    function regcode(){
        var phoneinput = $('#reg_phone_input');
        var phoneval = $('#reg_phone_input').val();
        if(phoneval == ""){
            alert("请输入手机号");
            phoneinput.focus();
            return false;
        }
        $.post("http://www.homeuhere.com/api/auth/getTelAuthCode",
        {
            "userTel":phoneval
        }, function(data){
            if(data.code == 200){
                time($('#reg_code_bt'));
            }
        }
            );
        var wait = 60;
        function time(o){
            if (wait == 0) {
                o.removeAttr("disabled");
                o.attr("value", "获取验证码"); 
                wait = 60;
            }else{
                o.attr("disabled", true); 
                o.attr("value", wait+"s"); 
                wait--; 
                setTimeout(function(){
                    time(o);
                },1000);
            }
        }
    }

    //注册
    function register(){
        var phoneinput = $('#reg_phone_input');
        var phoneval = $('#reg_phone_input').val();
        var codeinput = $('#reg_code_input');
        var codeval = $('#reg_code_input').val();
        var pswdinput = $('#reg_pswd');
        var pswdval = $('#reg_pswd').val();
        var token = $('#reg_tk');
        var tokenval = $('#reg_tk').val();
        if(phoneval == ""){
            alert("请输入手机号");
            phoneinput.focus();
            return false;
        }
        if(codeval == ""){
            alert("请输入验证码");
            codeinput.focus();
            return false;
        }
        if(pswdval == ""){
            alert("请输入密码");
            pswdinput.focus();
            return false;
        }
        if(tokenval == ""){
            alert("请输入验证码");
            lgcountgettk();
            token.focus();
            return false;
        }
        $.post("http://www.homeuhere.com/api/user/",
            {
                "userTel":phoneval,
                "userPw":pswdval,
                "authCode":codeval,
                "captchaToken":tokenval
            },
            function(data){
                if (data.code == 200) {
                    $('.login').hide();
                    $('.login-bg').hide();
                    $('.item-input').val('');
                    $('.token-input').val('');
                    setuser();
                }else{
                    alert(data.message);
                    lgcountgettk();
                    return false;
                }
                return true;
        });
    }
    
    //获取验证码
    function lgcountgettk(){
        $('.token_code').attr("src", "http://www.homeuhere.com/api/captcha/pcrimg");
    }
    //退出
    function logout(){
        $.get("http://www.homeuhere.com/api/auth/logout",null,function(data){
            if(data.code == 200){
                $('#nav_count').hide();
                $('#navhead').show();
            }
        });
    }
    //设置导航栏的信息
    function setuser(){
        $.get("http://www.homeuhere.com/api/user/",null,function(data){
            if(data.code == 200){
                $('#navhead').hide();
                $('#nav_count').show();
                document.getElementById('nav_username').innerHTML = data.userName;
                return true;
            }
        })
    }