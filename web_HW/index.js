window.addEventListener("DOMContentLoaded", function() {
    const ham = document.getElementById("ham");
    const moreMenu = document.querySelector("aside");
    const back = document.getElementById("back");
    ham.addEventListener("click", (e) => {
        const classList = moreMenu.classList;
        classList.remove("hidden");
        back.classList.add("on");
    });

    const exit = document.getElementById("exit");

    moreMenu.addEventListener("click", (e) => {
        console.log(e.target);
        if(e.target === moreMenu || e.target === exit) {
            moreMenu.classList.add("hidden");
            back.classList.remove("on");
        }
    })


    let index = 0;
    const images = document.getElementsByClassName("si");
    const imageList = document.getElementById("image-list");

    setInterval(, 1000)
    
    // 자동
    function f(data) {
        index++;

        console.log

        if (index === 3) {
            index = 0;
        }        

        imageList.style.transform = `translateX(-${index * document.body.offsetWidth}px)`;
    
        for (let image of images) {
            image.classList.add("hidden");
        }        
        images[index].classList.remove("hidden")
    
        // # 이전버튼
        if(index === 0) {
            prev.classList.add('hidden');
        } else {
            prev.classList.remove('hidden');
        }
        // # 다음버튼
        if(index === 2) {
            next.classList.add('hidden');
        } else {
            next.classList.remove('hidden')
        }

        // # indicator
        for(let dot of dots) {
            dot.classList.remove('active');
        }
        // 해당 index의 dot만 active 추가
        dots[index].classList.add('active')
        
    }




});