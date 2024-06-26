$(function(){    
    var lnbToggleHandler = $('.lnb-toggle');
    var lnbWrap = $('.lnb-wrap')
    var layout = $('.container');
    var lnbMenu = $('.menus > li');
    var treeToggle = $('.tree > ul > li > p');
    var treeSelected = $('.tree li li');
    // lnb 메뉴 열림/닫힘
    lnbToggleHandler.on('click', function(){
        layout.toggleClass('closed');
        $(this).toggleClass('closed');
    });
    // lnb 메뉴 마우스 오버 시 
    lnbWrap.on('mouseenter', function(){
        layout.addClass('overlay-view');
    });
    lnbWrap.on('mouseleave', function(){
        layout.removeClass('overlay-view');
    });
    // lnb 메뉴 클릭 시 하위 메뉴 토글
    lnbMenu.on('click', function(){
        $(this).children('ul').toggle();
        $(this).toggleClass('toggle');
    })
    // lnb 페이지 인식 current 클래스 자식의 아이콘에도 클래스 부여(클래스: 흰색 아이콘 적용)
    lnbMenu.each(function(){
        if($(this).hasClass('current') === true) {
            $(this).children('a').find('i').addClass('current');
        };
    })
    // lnb 하위 메뉴 있는 경우 클래스 부여(클래스: 화살표 표시)
    lnbMenu.has('ul').addClass('has-sub');
    
    // 진단 카테고리 드레그 리사이즈
    $('.drag-wrap').resizable({ 
        grid: [1, 10000]
    });

    // 진단 카테고리 
    treeToggle.on('click',function(){
        $(this).closest('li').toggleClass('selected');
    });
    treeSelected.on('click',function(){
        $(this).toggleClass('selected');
        $(this).siblings('li').removeClass('selected');
        $(this).parents().siblings('li').find('li').removeClass('selected');
    });

    // 테이블-정렬버튼
    $('.orderby').on('click', function(){
        $(this).toggleClass('on');
    });

    // 증상/진단 키워드 클릭
    $(document).on('click', '.diag-keyword span', function(){
        $(this).siblings().removeClass('active');        
        $(this).toggleClass('active');
    });

    // 스위치
    $(document).on('click', '.swich-content', function(){
        $(this).toggleClass('on');
    });

    // 클릭 테이블(tr 클릭)
    $(document).on('click', '.tagging tr', function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
    });

    // tabs
    $(document).on('click', '.tabs li', function(){
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
    });

    // datepicker
    $(function(){
        //input을 datepicker로 선언
        $(".datepicker").datepicker({
        dateFormat:'yy-mm-dd'//Input Display Format 변경
        ,showOtherMonths:true//빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true//년도 먼저 나오고, 뒤에 월 표시
        ,changeYear:true//콤보박스에서 년 선택 가능
        ,changeMonth:true//콤보박스에서 월 선택 가능
        ,buttonText:"선택"//버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        ,yearSuffix:"년"//달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort:['1','2','3','4','5','6','7','8','9','10','11','12']//달력의 월 부분 텍스트
        ,monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']//달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin:['일','월','화','수','목','금','토']//달력의 요일 부분 텍스트
        ,dayNames:['일요일','월요일','화요일','수요일','목요일','금요일','토요일']//달력의 요일 부분 Tooltip 텍스트
        ,minDate:"-1M"//최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        ,maxDate:"+1M"//최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
        });
        //초기값을 오늘 날짜로 설정
        $('.datepicker').datepicker('setDate','today');//(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    });

    //의무기록 수정
            const selection = window.getSelection();
    $(function(){
        $(document).on('click', '.dragndrop-box .drag-box .col .txt .ico', function(){
            $(this).closest('.col').addClass('active');
            if($(this).closest('.col').hasClass('active') === true){
                $(this).removeClass('edit');
                $(this).addClass('save');
                $(this).closest('.txt').focus();
                $(this).closest('.col').siblings('.col').removeClass('active');
                $(this).closest('.col').siblings('.col').find('.ico').removeClass('save');
                $(this).closest('.col').siblings('.col').find('.ico').addClass('edit');
            }else{
                $(this).removeClass('save');
                $(this).addClass('edit');
            }

            let value = $(this).closest('.txt').attr('contenteditable');
            if (value == 'false') {
                $(this).closest('.txt').attr('contenteditable','true');
                $(this).closest('.col').siblings('.col').find('.txt').attr('contenteditable','false');
            }
            else {
                $(this).closest('.txt').attr('contenteditable','false');
            }
            
        });
        $(document).on('click', '.dragndrop-box .drag-box .col .txt .save', function(){
            $(this).closest('.txt').attr('contenteditable','false');
            $(this).closest('.col').removeClass('active');
            $(this).removeClass('save');
            $(this).addClass('edit');
        });

    });

    //탭
    $(document).on('click', '.tab-box .tab ul li', function(){
        var tab_id = $(this).attr('data-tab');
      
        $(this).addClass('current').siblings().removeClass('current');
        $("#"+tab_id).addClass('current').siblings().removeClass('current');
        return false;
    });

    //진료기록생성 > 처방 > 약품명
    let inputFocus = $('.data-table.receipt input');
    $(inputFocus).on('input', function(){
        $(this).closest('tr').addClass('selected');
        $(this).closest('tr').siblings().removeClass('selected');
    });
    $(document).on('click', function(event){
        if (!$(event.target).closest('tr').length) {
            $('tr').removeClass('selected');
        }
    });

    //DUR위배 현황 swiper
    var clGradeLIst = new Swiper('.swipe-wrap .swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        breakpointsBase: 'window',        
        navigation: {
            nextEl: '.swipe-wrap .swiper-button-next',
            prevEl: '.swipe-wrap .swiper-button-prev',
        }
    });
    $('.swipe-wrap .swiper-slide').on('click',function(){
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    })

    //DUR위배 현황 상세정보 툴팁
    $(document).on('click', '.tooltip-box .btn-more', function(){        
        $(this).closest('.tooltip-box').toggleClass('active');
        $(this).closest('tr').siblings().find('.tooltip-box.active').removeClass('active');
    });
    $(document).on('click', '.tooltip-box .close', function(){
        $(this).closest('.tooltip-box').removeClass('active');
    });

    //검색창 float
    let offsetSubTitle = $('.rela_wrap.scroll .subtitle.scroll');
    let offsetSearch = $('.rela_wrap.scroll .subtitle .search input');

    $('.rela_wrap.scroll .inner-wrap').scroll(function(){

        let top = $('.rela_wrap.scroll .inner-wrap').scrollTop();

        if(top > 0){
            offsetSubTitle.addClass('sticky');
            offsetSearch.attr('placeholder' , '검색');
        }else{
            offsetSubTitle.removeClass('sticky');
            offsetSubTitle.removeClass('input');
            offsetSearch.attr('placeholder' , '검색어를 입력해 주세요');
        }
    });

    $(document).on('click', '.subtitle input', function(){
        if($(offsetSubTitle).hasClass('scroll') === true){
            $(this).closest('.subtitle').addClass('input');
        }else{
            $(this).closest('.subtitle').removeClass('input');
        }
    });

    //home 진료 목록
    $(document).on('click', '.diagnosis-list .toggle', function(){
        $(this).closest('.diagnosis-list').toggleClass('active');
        $(this).closest('.dash-board').toggleClass('active');
    });

    //home 토픽키워드
    var swiper2 = new Swiper(".swiper-dur-wrap", {
    direction: 'vertical',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
    },
    on: {
        slideChangeTransitionEnd: function(){
            let idx = this.realIndex;
            $('.swiper-label-wrap .label').removeClass('active');
            $('.swiper-label-wrap .label').eq(idx).addClass('active');
        }
    },
    });
    $(document).on('click', '.swiper-label-wrap .label', function(){
        let index = $('.swiper-label-wrap .label').index(this);
        swiper2.slideTo(index);
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    //진단랭킹
    let rankObj = $('.data-table .ranking tbody tr');
    var rankIdx = 1;

    function addActiveClass() {     
        $(rankObj).removeClass('active'); 
        $(rankObj).eq(rankIdx).addClass('active'); 
        rankIdx = (rankIdx + 1) % $(rankObj).length;
    }

    setInterval(addActiveClass, 3000);

    //진료기록 조회 레이어
    $('[data-Layer]').on('click', function () {
        let layerName = $(this).data('layer');
        $('#' + layerName + 'Layer').addClass('active');
        return false;
    });
    $('.float-layer .close').on('click', function () {
        $('.float-layer').removeClass('active');
    });

    //진료기록 조회 > 진료기록 필터링 toggle
    //카테고리 목록 클릭시
    $(document).on('click', '.toggle-filter .view', function(c){
        let parentOBJ =  $(this).closest('li');
        parentOBJ.toggleClass('active');
        parentOBJ.siblings().removeClass('active');
        $(this).siblings('.list-box').stop().slideToggle();
        parentOBJ.siblings().find('.list-box').slideUp();
    });
    //랭킹레이어 클릭시
    let defSelectText = null;
    $(document).on('click', '.toggle-filter .list-box li', function(){
        
        let parentOBJ = $(this).parents('.toggle-filter li');
        let spanText = $(this).find('.data').text();
        //default text 임시저장
        if(defSelectText == null) defSelectText = parentOBJ.find('.view .value').text();
        if(parentOBJ.hasClass('active') === true){
            parentOBJ.removeClass('active').addClass('complete').find('.list-box').slideUp();
            parentOBJ.find('.view .value').text(spanText);
        }
        //search input 초기화
        $('.toggle-filter .search input').val('');
        $('.toggle-filter .search').removeClass('active');
    });
    //카테고리 목록 닫기버튼 클릭시
    $(document).on('click', '.toggle-filter .view .ico-delete', function(e){
        e.stopPropagation();
        let parentOBJ = $(this).closest('li');
        parentOBJ.removeClass('complete active').find('.list-box').slideUp();
        $(this).prev('.value').text(defSelectText);
    });
    //랭킹레이어 > 검색창 클릭시
    $(document).on('change keyup paste', '.toggle-filter .search input', function(){
        let inputVal = $(this).val();
        if(inputVal == 0){
            $(this).closest('.search').removeClass('active');
        }else{
            $(this).closest('.search').addClass('active');
        }
    });

    //계정 관리 > 메뉴전체 체크
    $(document).on('click', '[type=checkbox]', function() {

        // 전체선택
        $(this).parent().next('ul').find('[type=checkbox]').prop('checked',$(this).prop('checked'));

        // 아이템 선택 - depth 만큼 전체선택 자동 checked
        let groupDepth = 4;
        let parentGroup = $(this).closest('ul');       
        let countGroup = countCheckedGroup = null;
        for(var i = 0; i < groupDepth; i++){
            
            countGroup = parentGroup.find('[type=checkbox]').length;
            countCheckedGroup = parentGroup.find('[type=checkbox]:checked').length;
            parentGroup.prev('.form-wrap').children('[type=checkbox]').prop('checked',(countGroup==countCheckedGroup)? true : false);

            parentGroup = parentGroup.parent().closest('ul');

        }
    });

    
});