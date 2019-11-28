var loginFlag=false;

$(function () {
    var v_navHtml = "<nav class=\"navbar navbar-inverse\">\n" +
        "    <div class=\"container-fluid\">\n" +
        "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
        "        <div class=\"navbar-header\">\n" +
        "           <ul>" +
        "               <li><a class=\"navbar-brand\">飞狐电商前台</a></li>" +
        "           </ul>\n" +
        "        </div>\n" +
        "\n" +
        "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
        "        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">" +
        "            <ul class=\"nav navbar-nav navbar-right\" id='nav_ul'>" +
        "                <li id=\"loginInfo\"><a href=\"/login.html\">登录</a></li>" +
        "                <li><a href=\"/register.html\">注册</a></li>" +
        "                <li><a href=\"/index.html\">首页</a></li>" +
        "                <li><a href=\"/cart.html\">购物车</a></li>" +
        "            </ul>\n" +
        "        </div><!-- /.navbar-collapse -->\n" +
        "    </div><!-- /.container-fluid -->\n" +
        "</nav>";

    $("#navDiv").html(v_navHtml);

    $.ajaxSetup({
        beforeSend: function(xhr) {
            var token = window.localStorage.getItem("token");
            console.log("token:"+token);
            xhr.setRequestHeader("x-auth", token);
        }
    })

    $.ajax({
        url:"http://localhost.77:8081/member/isLogin",
        type:"post",
        async:false,
        success:function(result){
            if(result.status == 200){
                $("#loginInfo").html("<a>用户"+result.data.memberName+"已登录！！</a>")
                $("#nav_ul").append("<li><a href='#' onclick='outLogin()'>退出</a></li>")
                loginFlag = true;
            }else {
                alert(result.msg);
            }
        }
    });
})

function buyCart(productId,count,flag) {
    if (loginFlag) {
        $.ajax({
            type:"post",
            url:"http://localhost.77:8081/cart/add",
            data:{"productId":productId,"count":count},
            success:function (result) {
                if (result.status == 200) {
                    if(flag == 1){
                        location.href = "/cart.html";
                    }else{
                        initCart();
                    }
                }else {
                    alert(result.msg);
                }
            }
        })
    }else {
        alert("请登录！！！")
    }
}

function outLogin() {
    $.post(
        "http://localhost.77:8081/member/outLogin",
        function (result) {
            if (result.status == 200) {
                window.localStorage.setItem("token","");
                location.href = "index.html";
            }else {
                alert(result.msg);
            }
        }
    )
}







