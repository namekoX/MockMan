$(function () {
    $('#addButton').click(function () {
        const html = '<tr>' +
            '<td><input type="text" name="name" ></td>' +
            '<td><input type="text" name="val" ></td>' +
            '<td><button class="remove">-</button></td>' +
            '</tr>';
        $('tbody').append(html);
    });

    $(document).on('click', '.remove', function () {
        $(this).parents('tr').remove();
    });

    $('#sendButton').click(function () {
        var button = $(this);
        button.attr("disabled", true);

        ret = postbyurl('mock/create_entry/', createBody());
        let html;
        if (ret.status == "success" && ret.OK) {
            html = '<div class="alert alert-success" role="alert">' + ret.msg + '</div>';
            $('#msg').html(html);
            html = '以下のURLにアクセスすると、条件に登録したレスポンスが取得できます<br />';
            url = host + 'mock/get_entry/' + ret.entryNo + "/";
            html += '<a href="' + url + '" target="_blank">' + url + '</a>';
            $('#url').html(html);
        } else {
            html = '<div class="alert alert-danger" role="alert">登録で異常処理が発生しました</div>';
            $('#msg').html(html);
            $('#url').html("");
        }
        button.attr("disabled", false);
    });

    function createBody() {
        let fd = new FormData();
        let body = {};
        body["stateCd"] = $('#stateCd').val();
        body["contentType"] = $('#contentType').val();

        if ($('#contentType').val() != 'image/jpeg') {
            body["body"] = $('#body').val();
        } else {
            fd.append("image", $("input[name='file']").prop("files")[0]);
        }
        fd.append("body", JSON.stringify(body));

        let headers = [];
        let names = [];
        let values = [];
        $('input[name="name"]').each(function (i, elem) {
            names.push($(elem).val());
        });
        $('input[name="val"]').each(function (i, elem) {
            values.push($(elem).val());
        });
        for (var i = 0; i < names.length; i++) {
            if (!isnullundef(names[i]) && !isnullundef(values[i])) {
                head = {
                    headerPrm: names[i],
                    headerNo: i,
                    headerVal: values[i],
                }
                headers.push(head);
            }
        }
        fd.append("headers", JSON.stringify(headers));

        const postData = {
            type: "POST",
            dataType: "json",
            data: fd,
            processData: false,
            contentType: false,
        };

        return postData;
    }

    $('#contentType').change(function () {
        if ($('#contentType').val() != 'image/jpeg') {
            $('#file').val('');
            $('#body').css('display', 'block');
            $('#file').css('display', 'none');
        } else {
            $('#body').val('');
            $('#body').css('display', 'none');
            $('#file').css('display', 'block');
        }
    });
});