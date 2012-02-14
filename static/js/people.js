function activatedesc() {
    $("#activatedesc").hide();
    $(".descform").show();
    return false;
}
function changedesc() {
    $("#textdesc").hide();
    $(".the-icons").hide();
    $(".descform").show();
    $('#description').val($("#textdesc").text());
    return false;
}
function canceldesc() {
    $(".descform").hide();
    if($("#textdesc").text() != ""){
        $("#textdesc").css("display", "inline");
        $(".the-icons").show();
    }
    else
        $("#activatedesc").show();
    return false;
}
function submitdesc() {
    var selfdesc = $('#description').val();
    if(selfdesc == '')
        return false;
    if($("#textdesc").text() != "" && $("#textdesc").text() == $('#description').val()){
        $(".descform").hide();
        $("#textdesc").css("display", "inline");
        $(".the-icons").show();
        $("#textdesc").html(selfdesc);
        return false;
    }
    $.ajax({
        type:"POST",
        url:"/selfdesc",
        data:{selfdesc:selfdesc,_xsrf:getCookie("_xsrf")},
        success:function(data){
            $(".descform").hide();
            $("#textdesc").css("display", "inline");
            $(".the-icons").show();
            $("#textdesc").html(selfdesc);
        }       
    });
    return false;
}
function follow(button_id, from_user, to_user){
    if($("#" + button_id).attr("disabled") == "disabled" || $("#" + button_id).attr("disabled") == "true")
        return false;
    $("#" + button_id).addClass("disabled");
    $("#" + button_id).attr("disabled",true);
    $("#un" + button_id).removeClass("disabled");
    $("#un" + button_id).attr("disabled",false);
    $.ajax({
    type:"POST",
    url:"/follow",
    data:{from_user:from_user,to_user:to_user,_xsrf:getCookie("_xsrf")},
    success:function(data){
        $("#" + button_id).hide();
        $("#un" + button_id).show();
    }       
    });
    return false;
}

function unfollow(button_id, from_user, to_user){
    if($("#un" + button_id).attr("disabled") == "disabled" || $("#un" + button_id).attr("disabled") == "true")
        return false;
    $("#un" + button_id).addClass("disabled");
    $("#un" + button_id).attr("disabled",true);
    $("#" + button_id).removeClass("disabled");
    $("#" + button_id).attr("disabled",false);
    $.ajax({
    type:"POST",
    url:"/unfollow",
    data:{from_user:from_user,to_user:to_user,_xsrf:getCookie("_xsrf")},
    success:function(data){
        $("#un" + button_id).hide();
        $("#" + button_id).show();
    }       
    });
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}
