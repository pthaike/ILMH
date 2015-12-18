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

    // H_login.openreg = function(){
    //     $('.wantreg a').click(function(){
    //         $('.phone-log').hide();
    //         $('.wantreg').hide();
    //         $('.register').show();
    //         $('.havecount').show();
    //     });
    // };
    // H_login.reopenlogin = function(){
    //     $('.havecount a').click(function(){
    //         $('.phone-log').show();
    //         $('.wantreg').show();
    //         $('.register').hide();
    //         $('.havecount').hide();
    //     });
    // };

    H_login.opencountlogin = function(){
        $('#count_login_link').click(function(){
            $('.message_login').hide();
            $('.count_login').show();
            document.getElementById('count_login_title').style.borderBottom="solid red 1px";
            document.getElementById('message_login_title').style.borderBottom='none'
        });
    }
    H_login.openmsglogin = function(){
        $('#msg_login_link').click(function(){
            $('.count_login').hide();
            $('.message_login').show();
            document.getElementById('message_login_title').style.borderBottom='solid red 1px'
            document.getElementById('count_login_title').style.borderBottom="none";
        });
    }
    H_login.openregbox = function(){
        $('.reg_instant a').click(function(){
            $('.phone-log').hide();
            $('.register').show();
        });
    }
    H_login.openloginbox = function(){
        $('.login_instant a').click(function(){
            $('.register').hide();
            $('.phone-log').show();
        });
    }
    H_login.loginForm = function () {
        $("#login-button-submit").on('click',function(){
              var username = $("#username");
              var usernameValue = $("#username").val();
              var password = $("#password");
              var passwordValue = $("#password").val();
            if(usernameValue == ""){
                alert("用户名不能为空");
                username.focus();
                return false;
            }else if(usernameValue.length > 15){
                alert("用户名长度不能大于15字符");
                username.focus();
                return false;
            }else if(passwordValue == ""){
                alert("密码不能为空");
                password.focus();
                return false;
            }else if(passwordValue.length < 6 || passwordValue.length > 30){
                alert("密码长度不能小于6或大于30位字符");
                password.focus();
                return false;
            }else{
                alert("登录成功");
                setTimeout(function(){
                    $('.login').hide();
                    $('.login-bg').hide();
                    $('.list-input').val('');
                },2000);
            }
        });
    };
    H_login.run = function () {
        this.closeLogin();
        this.openLogin();
        this.loginForm();
        // this.openreg();
        // this.reopenlogin();
        this.opencountlogin();
        this.openmsglogin();
        this.openregbox();
        this.openloginbox();
    };
    H_login.run();
});