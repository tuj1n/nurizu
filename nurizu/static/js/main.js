$(function () {
    var url = '';
    var md_text = '';

    $('.upload-btn').click(function () {
        $('#upload').click();
    });

    $('#upload').change(function () {
        var formData = new FormData($('#upload-form')[0]);

        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData ,
            processData : false,
            contentType : false ,
            success: function (data) {
                $('.progress-wrapper').hide();
                url = window.location.protocol + '//' + window.location.host + data.url;
                md_text = '![](' + url + ')';

                $('#raw-link').val(url);
                $('#markdown').val(md_text);
                $('#upload-img').attr('src', url);
                $('.modal').modal('toggle');
            },
            xhr: function() {
                // 获取 ajax 函数的 jqXHR 对象
                var xhr = $.ajaxSettings.xhr();
                if (onprogress && xhr.upload) {
                    xhr.upload.addEventListener('progress' , onprogress, false);
                    return xhr;
                }
            }
        });

        function onprogress(evt) {
            // 已经上传的百分比
            var percent = Math.floor(100 * evt.loaded / evt.total);

            $('.progress-wrapper').show();
            $('.progress-bar').css('width', percent + '%');
            $('.progress-bar').text(percent + '%');
        }
    });
    
    $('#copy').click(function () {
        $('#raw-link').select();
        document.execCommand("Copy");

         notie.alert(1, '图片地址已成功复制到剪贴板', 5);
    });

    $('#mk-copy').click(function () {
        $('#markdown').select();
        document.execCommand("Copy");

        notie.alert(1, '图片地址已成功复制到剪贴板', 5);
    });

    $('.thumbnail').click(function () {
        window.open(url);
    })
});