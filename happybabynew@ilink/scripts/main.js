function login() {
    var url = "http://202.105.183.158/bstest/mapi/api_au.ashx?ajax";
    return $.ajax({
        type: "Post",
        data:{methodName:"2",a:"5",b:"123",c:"34534532",d:""},
        dataType:"xml",
        url: url,
    }).done(function (data) {
        $(data).find("result").each(function(i) {
            if ($(this).text() == "true") {
                app.navigate("main.html");
            }
        }); 
    }).fail(function (a, b, c) {
        navigator.notification.alert("获取地址失败!", function() {
        }, "定位提示", "好的");
        document.getElementById("addressValue").value = "";
    });
}
function selectCtr(id){
    app.navigate(id);
}