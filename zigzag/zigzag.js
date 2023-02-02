
let item1 = document.getElementById('item1');
let item2 = document.getElementById('item2');
let item3 = document.getElementById('item3');
let item4 = document.getElementById('item4');
let item5 = document.getElementById('item5');
let header = document.querySelector('header');
let left = document.getElementsByClassName('left');

function f(event) {
    document.querySelector('.main2').scrollIntoView();
}

window.addEventListener('scroll', (e) => {
    // console.log(document.documentElement.scrollTop);

    // header
    if(document.documentElement.scrollTop === 0) {
        header.style.backgroundColor = 'transparent'
        header.style.color = '#fff'
        left[0].children[0].classList.add('hidden');
        left[0].children[1].classList.remove('hidden');

    } else {
        header.style.backgroundColor = '#fff'
        header.style.color = 'black'
        left[0].children[0].classList.remove('hidden');
        left[0].children[1].classList.add('hidden');
    }

    // item translete
    if(document.documentElement.scrollTop > 2000) {
        item1.classList.add('translate');
    } else {
        item1.classList.remove('translate')
    }
    if(document.documentElement.scrollTop > 2400) {
        item2.classList.add('translate');
    } else {
        item2.classList.remove('translate')
    }
    if(document.documentElement.scrollTop > 2400) {
        item3.classList.add('translate');
    } else {
        item3.classList.remove('translate')
    }
    if(document.documentElement.scrollTop > 3100) {
        item4.classList.add('translate');
    } else {
        item4.classList.remove('translate')
    }
    if(document.documentElement.scrollTop > 3100) {
        item5.classList.add('translate');
    } else {
        item5.classList.remove('translate')
    }
})


// const target = document.getElementById('target'); // 요소의 id 값이 target이라 가정

// const item1Rect = item1.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
// const item1Top = item1Rect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.

// const scrolledTopLength = window.pageYOffset; // 스크롤된 길이
// //const scrolledTopLength = pageYOffset; // window 객체 없이 pageYOffset 메서드를 써도 가능하다.
// const absoluteTop = scrolledTopLength + item1Top; // 절대좌표