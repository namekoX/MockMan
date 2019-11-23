var host = 'http://localhost:8000/';
function getbyurl(url) {
    var ret;
    $.ajaxSetup({
        async: false
    });
    $.get(
        host + url,
        null,
        function (data, status) {
            ret = data;
            ret["status"] = status;
        }
    )
        .fail(function (data, status) {
            ret = { "status": status };
        });
    $.ajaxSetup({ async: true });
    return ret;
}

function postbyurl(url, postData) {
    var ret;
    $.ajaxSetup({
        async: false
    });
    $.ajax(
        host + url,
        postData
    ).done(function (data, status) {
        ret = data;
        ret["status"] = status;
    })
    .fail(function (data, status) {
        ret = { "status": status };
    })
    ;
    $.ajaxSetup({ async: true });
    return ret;
}

function isnullundef(str) {
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
}