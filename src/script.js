document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const ballContainer = document.getElementById('ball-container');
    const themeToggle = document.getElementById('theme-toggle');

    // 다크모드 초기 설정 (로컬 스토리지 확인 또는 시스템 설정 확인)
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // 다크모드 토글 이벤트
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
        
        // 사용자 설정 저장
        localStorage.setItem('theme', theme);
    });

    // 번호에 따른 색상 클래스 반환 함수
    function getBallColorClass(num) {
        if (num <= 10) return 'color-yellow';
        if (num <= 20) return 'color-blue';
        if (num <= 30) return 'color-red';
        if (num <= 40) return 'color-gray';
        return 'color-green';
    }

    // 1~45 사이의 중복 없는 랜덤 숫자 6개 생성 및 정렬
    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // 버튼 클릭 이벤트
    generateBtn.addEventListener('click', () => {
        // 애니메이션 도중 중복 클릭 방지
        generateBtn.disabled = true;
        generateBtn.textContent = '생성 중...';

        // 기존 공들 제거
        ballContainer.innerHTML = '';

        // 새 번호 생성
        const numbers = generateLottoNumbers();

        // 생성된 번호로 공 DOM 요소 만들고 추가하기
        numbers.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.className = `ball ${getBallColorClass(num)}`;
            ball.textContent = num;
            
            // 순차적으로 나타나도록 애니메이션 딜레이 설정
            ball.style.animationDelay = `${index * 0.1}s`;
            
            ballContainer.appendChild(ball);
        });

        // 모든 애니메이션이 끝난 후 버튼 다시 활성화
        setTimeout(() => {
            generateBtn.disabled = false;
            generateBtn.textContent = '번호 생성하기';
        }, 600 + (5 * 100)); // 기본 애니메이션 시간(600ms) + 마지막 공 딜레이(500ms)
    });
});
