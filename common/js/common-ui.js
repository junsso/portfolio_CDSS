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
});