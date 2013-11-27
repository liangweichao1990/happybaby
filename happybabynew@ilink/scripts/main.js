/*登录*/
function login() {
    var a = $("#userName").val();
    var b = $("#passWord").val();
    var d = $("#publicinviteCode").val();
    alert(d);
    
    if (a == "" || a == null) {
        alert("请输入用户名");
        return;
    }
    if (b == "" || b == null) {
        alert("请输入密码");
        retrun;
    }
    return $.ajax({
        type: "Post",
        data:{methodName:"2",a:a,b:b,c:"34534532",d:d},
        dataType:"xml",
        url: "http://202.105.183.158/bstest/mapi/api_au.ashx",
    }).done(function (data) {
        $(data).find("result").each(function(i) {
            if ($(this).text() == "true") {
                if ($(data).find("route").text() == "1") {
                    app.navigate("#shitu");
                }
                else {
                    app.navigate("acceptInvite.html");  
                }
            }
            else {
                alert($(data).find("content").text());
            }
        }); 
    }).fail(function () {
        alert("登录失败！！！");
    });
}
/*登录界面选择操作*/
function selectCtr(id) {
    app.navigate(id);
}
/*注册*/
function register() {
    var a = $("#ruserName").val();
    var b = $("#rpassWord").val();
    var e = $("#rrpassWord").val();
    var d = $("#publicinviteCode").val();
    if (a == "" || a == null) {
        alert("请输入用户名");
        return;
    }
    if (b == "" || b == null) {
        alert("请输入密码");
        retrun;
    }
    if (e == "" || e == null) {
        alert("请再次输入密码");
        retrun;
    }
    if (b != e) {
        alert("两次输入密码不一致，请重新输入！");
        retrun;
    }
    return $.ajax({
        type: "Post",
        data:{methodName:"1",a:a,b:b,c:"34534532",d:d},
        dataType:"xml",
        url: "http://202.105.183.158/bstest/mapi/api_au.ashx",
    }).done(function (data) {
        if ($(data).find("result").text() == "true") {
            if ($(data).find("route").text() == "1") {
                app.navigate("#shitu");
            }
            else {
                var tabstrip = app.view().header.find(".km-tabstrip").data("kendoMobileTabStrip");
                tabstrip.switchTo("#libiao"); //activate "bar" tab
            }
        }
        else {
            alert($(data).find("content").text());
        }
    }).fail(function () {
        alert("注册失败！！！");
    });
}
/*使用邀请码*/
function invite() {
    var a = $("#inviteCode").val();
    if (a == "" || a == null) {
        alert("邀请码不能为空，请输入邀请码！");
        return;
    }
    return $.ajax({
        type: "Post",
        data:{methodName:"3",a:a},
        dataType:"xml",
        url: "http://202.105.183.158/bstest/mapi/api_au.ashx",
    }).done(function (data) {
        if ($(data).find("result").text() == "true") {
            $("#actionsheet").data("kendoMobileActionSheet").open();
            alert($(data).find("inviteCode").text());
            document.getElementById("publicinviteCode").value = $(data).find("inviteCode").text();
        }
        else {
            alert($(data).find("content").text());
        }
    }).fail(function () {
        alert("注册失败！！！");
    });
}

var foo = "";

function mobileListViewPullToRefresh() {
    foo = new kendo.data.DataSource({
        transport: {
            read: {
                type :"Post",
                dataType :"xml",
                url :"http://202.105.183.158/bstest/mapi/api_diary.ashx",
            },
            parameterMap: function(options) {
                return {
                    methodName:"1",
                    a:options.max_id ,
                    c:"V",
                    f:options.first_id 
                };
            }
        },
        serverPaging: true,
        pageSize: 10,
        schema: {
            type: "xml",
            data: "xml/objInfo",
            model
            : {
                fields: {
                    img:"user/@img",
                    id:"content/@id",
                    name: "user/@name",
                    date: "content/@date" ,
                    children:"content/pics/pic",
                }
            }
        }
    });
    $("#endless-scrolling").kendoMobileListView({
        dataSource: foo,
        template: $("#foo-template").html(),
        appendOnRefresh: true,
        pullToRefresh: true,
        //addition parameters which will be passed to the DataSource's read method
        pullParameters: function(firstItem) { //pass first data item of the ListView
            return {
                fist_id: firstItem.id
            };
        },
        endlessScroll: true,
        endlessScrollParameters:function(lastItem) {
            return {
                max_id : lastItem.id_str
            };
        }
    }
                
    );
}

/*加载userInfo*/
var userDetilDataSource = "";
var userShitu = "";

function showpUserInfo() {
    userDetilDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type :"Post",
                dataType :"xml",
                url :"http://202.105.183.158/bstest/mapi/api_user.ashx",
            },
            parameterMap: function(options) {
                return {
                    methodName:"1",
                };
            }
        },
        serverPaging: true,
        pageSize: 10,
        schema: {
            type: "xml",
            data: "xml",
            model
            : {
                fields: {
                    img:"user/@img",
                    code:"user/@code",
                    name: "user/@name",
                    qianming:"user/@qianming",
                    fabiao:"user/@fabiao",
                    zan:"user/@zan",
                    liulan:"user/@liulan",
                    pinglun:"user/@pinglun",
                    children:"banjilist/banji",
                }
            }
        }
    });
    userShitu = new kendo.data.DataSource({
        transport: {
            read: {
                type :"Post",
                dataType :"xml",
                url :"http://202.105.183.158/bstest/mapi/api_diary.ashx",
            },
            parameterMap: function(options) {
                return {
                    methodName:"1",
                    a:options.max_id ,
                    c:"V",
                    f:options.first_id 
                };
            }
        },
        serverPaging: true,
        pageSize: 10,
        schema: {
            type: "xml",
            data: "xml/objInfo",
            model
            : {
                fields: {
                    img:"user/@img",
                    id:"content/@id",
                    name: "user/@name",
                    date: "content/@date" ,
                    children:"content/pics/pic",
                }
            }
        }
    });
   
    $("#userShitu").kendoMobileListView({
        dataSource: userShitu,
        template: $("#foo-template").html(),
        //addition parameters which will be passed to the DataSource's read method
        endlessScroll: true,
        endlessScrollParameters:function(lastItem) {
            return {
                max_id : lastItem.id_str
            };
        }
    }
                
    );
}