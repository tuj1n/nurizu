$(function () {
    $('.btn').click(function () {
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

            $('.progress').show();
            $('#bar').css('width', (percent > 90 ? percent - 1 : percent) + '%');

            if (percent == 100) {
                $('.progress').hide();
            }
        }
    });
});