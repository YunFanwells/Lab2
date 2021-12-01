$(function () {
    let bg = ['bg1.jpg', 'bg2.jpg']
    let i = 0
    setInterval(() => {
        i++;
        $('.main').css('background-image', `url('/public/banner/${bg[i % 2]}')`)
    }, 4000)

    $('.submit').click(function () {
        const $this = $(this);
        const $form = $this.closest('form');

        if (!$("[name='username']").val()) {
            return Qmsg.error(`<i></i><span style="color:red;line-height: 1.5">Please enter the username</span>`, {
                html: true,
                timeout: 5000,
                position: 'center'
            })

        }
        if (!$("[name='password']").val()) {
            return Qmsg.error(`<i></i><span style="color:red;line-height: 1.5">Please enter the password</span>`, {
                html: true,
                timeout: 5000,
                position: 'center'
            })
        }
        if ($("[name='email']").length) {
            let v = $("[name='email']").val();
            if (!v) {
                return Qmsg.error(`<i></i><span style="color:red;line-height: 1.5">Please enter the email</span>`, {
                    html: true,
                    timeout: 5000,
                    position: 'center'
                })
            }else{
                if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v)){
                    return Qmsg.error(`<i></i><span style="color:red;line-height: 1.5">The email is incorrect</span>`, {
                        html: true,
                        timeout: 5000,
                        position: 'center'
                    })
                }
            }
        }
        $.post($form.attr('action'), $('form').serialize())
            .then(res => {
                if (res.success) {
                    Qmsg.success(`<i></i><span  style="line-height: 1.5">${res.msg}</span>`, {
                        html: true
                    })
                    setTimeout(() => {
                        window.location.href = res.redirect;
                    }, 1500)
                } else {
                    Qmsg.error(`<i></i><span style="color:red;line-height: 1.5">${res.msg}</span>`, {
                        html: true,
                        timeout: 5000,
                        position: 'center'
                    })

                }
            })
    })
});