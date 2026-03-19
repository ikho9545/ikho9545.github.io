// 웹페이지의 문서가 모두 준비되면 실행됩니다.
document.addEventListener("DOMContentLoaded", () => {
    
    // ======== 다크 모드 (화면 어둡게/밝게 변경) 기능 ======== //
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // 웹 브라우저에 저장된 이전 디자인 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme');
    
    // 이전에 다크 모드를 선택했다면 화면을 다시 다크 모드로 설정
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // 해 모양 아이콘으로 변경
    }

    // 테마 버튼을 클릭할 때마다 실행되는 기능
    themeToggleBtn.addEventListener('click', () => {
        // 현재 다크 모드라면 라이트 모드로 변경
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon'); // 달 모양 아이콘으로 변경
            localStorage.setItem('theme', 'light'); // 설정 저장
        } else {
            // 현재 라이트 모드라면 다크 모드로 변경
            body.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun'); 
            localStorage.setItem('theme', 'dark'); // 설정 저장
        }
    });


    // ======== 스크롤을 내릴 때 화면이 스르륵 나타나는 시각적 애니메이션 기능 ======== //
    
    // 요소가 화면에 얼마나 보일 때 동작할지 설정 (0.1은 10% 정도 보일 때)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // 약간 화면 아래쪽에서부터 인지하도록 마진 설정
    };

    // 화면 관찰자(IntersectionObserver)를 만듭니다.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 해당 영역이 우리 눈에 보이기 시작하면
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // visible 클래스를 추가해 투명도를 제거합니다.
                
                // 한 번 나타난 글이나 사진은 다시 숨기지 않도록 관찰을 종료합니다.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 문서 전체에서 "fade-in" 스르륵 효과를 주고 싶은 모든 요소를 찾아 관찰을 시작합니다.
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

});
