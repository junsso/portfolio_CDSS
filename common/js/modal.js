/** modal Class */
class setModal{
    
    constructor(id, body='', header=''){
        this.id = id;
        if(body) this.setBody(body);
        if(header) this.setHeader(header);
    }
    setBody(body){
        this.body = body;
    }
    setHeader(header){
        this.header = header;
    }
    setFooter(footer){
        this.footer = footer;
    }

    open(){
        setTimeout(() => {
            
            if(this.header){
                $('#'+this.id).find('.popup-header h2').html(this.header);
                $('#'+this.id).find('.popup-header').show();
            }
            else if($('#'+this.id).find('.popup-header h2').html() == ''){
                $('#'+this.id).find('.popup-header').hide();
            }
            if(this.body){
                if($('#'+this.id).hasClass('toast-alert-box') && $('#'+this.id).hasClass('show')){
                    $('#'+this.id).find('.toast-item:eq(0)').clone().prependTo($('#'+this.id)).find('.popup-body').html(this.body);
                }
                else{
                    $('#'+this.id).find('.popup-body').html(this.body);
                    $('#'+this.id).find('.popup-body').show();
                }
            }
            else if($('#'+this.id).find('.popup-body').html() == ''){
                $('#'+this.id).find('.popup-body').hide();
            }
            if(this.footer){
                $('#'+this.id).find('.popup-footer .btn-set').html(this.footer);
                $('#'+this.id).find('.popup-footer').show();
            }
            else if($('#'+this.id).find('.popup-footer .btn-set').html() == ''){
                $('#'+this.id).find('.popup-footer').hide();
            }
    
            $('body').removeClass('active-modal').addClass('active-modal');
            
            if($('#'+this.id).hasClass('toast-alert-box')){
                if($('.overlay').css('display') != 'block'){
                    $('.overlay').css('background-color','rgba(0,0,0,0)');
                }
            }
            else{
                $('.overlay').css('background-color','rgba(0,0,0,0.65)');
            }
            $('.overlay').fadeIn();
            $('#'+this.id).removeClass('show').addClass('show');
            $('#'+this.id).show();
        }, 100);

        //팝업내에 셀렉트박스
        var slTarget = $('.slt-box .title h2, .slt-box .title .arrow');

        $(slTarget).on('click', function(){
            $(this).parent('.title').toggleClass('on');
        });

        //목록 이외 클릭시 목록 닫힘
        $(document).on('mouseup',function (f){
            if(slParnets.has(f.target).length === 0){
                slTarget.parent('.title').removeClass("on");
                slTarget02.parent('.sort-box').removeClass('on');
            }
        });
    }
    close(){
        if($('#'+this.id).find('.toast-item').length > 1){
            $('#'+this.id).find('.toast-item:last-child').fadeOut(function(){
                $(this).remove();
            });
        }
        else if($('#'+this.id).hasClass('toast-alert-box') && $('.layerpop.show').length > 0){
            $('#'+this.id).fadeOut().removeClass('show');
        }
        else{
            $('body').removeClass('active-modal');
            $('.layerpop, .overlay, .toast-alert-box').fadeOut();
            $('.toast-alert-box.show').removeClass('show');
            $('.layerpop.show').removeClass('show');
        }
    }
}

// 먼저 개발 jsp 찾고 없으면 퍼블 html 찾는다.
$.ajax({
    url: '/asset/templates/popup-wrap.jsp',
    type: 'GET',
    dataType: false,
    data: false,
    success: function(data) {
        $('body').append(data);
    },
    error: function() {
        $.get('./popup-wrap.html', function(data){
            $('body').append(data);
        });
    }
});

function malert(body){
    let modal = new setModal('alertPopup',body);
    modal.open();
}

function mconfirm(body,callback){
    let modal = new setModal('confirmPopup',body);
    modal.open();
    $(document).on('click', '#confirmPopup .close, .call-ok', function(e){
        e.preventDefault();
        $('#confirmPopup button').unbind("click");
        callback($(this).hasClass('call-ok'));
        modal.close();
    });
}

function toast(body,$timeout = 2000){
    let modal = new setModal('alertToast',body);
    modal.open();
    setTimeout(() => modal.close(), $timeout);
}

// 팝업 닫기
$(document).on('click', '.overlay, .close, .close-btn', function (e) {
    e.preventDefault();
    // forever 클래스가 있는 경우 overlay를 클릭해도 팝업을 닫지 않음
    if ( $(e.target).hasClass('overlay') && $(e.target).hasClass('forever') ) {
        return false;
    } else {
        $('.overlay').removeClass('forever');
    }
    if($('.toast-alert-box.show').length > 0 && $('.layerpop.show').length > 0){
        $('.toast-alert-box.show').fadeOut().removeClass('show');
    }
    else{
        $('body').removeClass('active-modal');
        $('.layerpop, .overlay, .toast-alert-box').fadeOut();
        $('.toast-alert-box.show').removeClass('show');
        $('.layerpop.show').removeClass('show');

    }
    return false;
});

$(document).on('click', '[data-popup]',function(e){
    e.preventDefault();
    let this_id = $(this).data('popup');
    let modal = new setModal(this_id);
    modal.open();
});

$(document).on('click', '[data-toast-msg]',function(e){
    e.preventDefault();
    toast($(this).data('toast-msg'));
});


/*
mconfirm("정말로 삭제 하시겠습니까?", function(res){
    if(res){
        malert("`네`를 선택하셨습니다.");
    }
    else{
        malert('`아니요`를 선택하셨습니다.');
    }
});
*/