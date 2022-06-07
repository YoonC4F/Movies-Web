// all
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


var formlist = document.querySelectorAll('form');
for(var form of formlist) {
    form.onsubmit = (e) => {
        e.preventDefault();
    }
}

// index.html 
function handeIndex() {
    //============== nav =================
    let nav_header = $("#page-heading nav");
    window.onscroll = ()=> {
        if(window.scrollY>100){
            nav_header.classList.remove("container");
            nav_header.classList.add("onactive");
        }
        else{
            nav_header.classList.remove("onactive");
            nav_header.classList.add("container");
        }
    }
    // ==============slider-btn-click==============
    let sliderContainer = $(".slider-containers");
    let sliderItem = $(".slider-container");
    let sliderImg = $$(".slider-container .slider1");
    let size = sliderImg.length;
    let oneSlider = sliderItem.clientWidth / size;
    let dotBtns = $$(".dot-item");
    let counter = 1;

    for(let dotBtn of dotBtns){
        // console.log(dotBtn.dataset.index)
        dotBtn.addEventListener("click",()=>{
            counter = dotBtn.dataset.index;

            for(let dotBtnTemp of dotBtns){
                dotBtnTemp.classList.remove("active");
            }
            dotBtn.classList.add("active");

            sliderItem.style.transition = "transform 0.4s ease-in-out";
            sliderItem.style.transform = `translateX(${-((2*counter)*oneSlider)}px)`;
        })
    }

    //==================slider-touch-move=========
    let body = document.documentElement;
    let isPress = false;
    let startP, currentP;
    
    // an cai clone cuoi khi xuat hien
    sliderItem.style.transform = `translateX(${-(2*oneSlider)}px)`;

    function getTranslateX() {
        var style = window.getComputedStyle(sliderItem);
        var matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }

    sliderContainer.addEventListener("mouseenter", ()=>{
        sliderContainer.style.cursor = "pointer";
    })

    sliderItem.addEventListener("mousedown", (e)=>{
        isPress = true;
        startP = e.screenX - getTranslateX();
        sliderItem.style.transition = "none";
    })

    sliderItem.addEventListener("mouseup", (e)=>{
        e.preventDefault();
        isPress = false;
        handleMouseUp(e);
        // changeDotBtnWhenMouseUp();
    })
    body.addEventListener("mouseup", (e)=>{
        e.preventDefault();
        isPress = false;
        handleMouseUp(e);
        // changeDotBtnWhenMouseUp();
    })
    
    sliderItem.addEventListener("mousemove", (e)=>{
        e.preventDefault();
        if(!isPress) return;
        currentP = e.screenX-startP;

        sliderItem.style.transform = `translateX(${currentP}px)`;
        handleMousemove(e);
    })

    body.addEventListener("mousemove", (e)=>{
        e.preventDefault();
        if(!isPress) return;
        currentP = e.screenX-startP;

        sliderItem.style.transform = `translateX(${currentP}px)`;
        handleMousemove(e);
    })

    function handleMousemove(e){
        if(getTranslateX() >= 0){
            sliderItem.style.transform = `translateX(${-(size - 4)*oneSlider}px)`;
            startP = e.screenX - getTranslateX();
        }
        if(-getTranslateX() >= (sliderItem.clientWidth - 2*oneSlider)){
            sliderItem.style.transform = `translateX(${-(2)*oneSlider}px)`;
            startP = e.screenX - getTranslateX();
        }
    }

    function setDotActive(index){
        for(let i=0; i<dotBtns.length; i++){
            dotBtns[i].classList.remove('active');
        }
        dotBtns[index-1].classList.add('active');
    }

    function changeDotBtnWhenMouseUp(){
        // handel change dot btn
        if(getTranslateX()==(-2*oneSlider) || getTranslateX()==(-3*oneSlider) || getTranslateX()==(-8*oneSlider) || getTranslateX()==(-9*oneSlider)){
            setDotActive(1);
        }
        if(getTranslateX()==(-4*oneSlider) || getTranslateX()==(-5*oneSlider)){
            setDotActive(2);
        }
        if(getTranslateX()==(-6*oneSlider) || getTranslateX()==(-7*oneSlider) || getTranslateX()==(-1*oneSlider) || getTranslateX()==(-0*oneSlider)){
            setDotActive(3);
        }
    }
    function handleMouseUp(e) {
        let halfOfWidth = oneSlider/2;
        let i=1;
        while(true) {
            if(-getTranslateX()>halfOfWidth*i){
                i++;
                continue;
            }
            break;
        }
        sliderItem.style.transition = "transform 0.4s ease-in-out";

        // handlde transform
        if(i%2 === 0 ){
            // counter=i/2;
            sliderItem.style.transform = `translateX(${-(i)*halfOfWidth}px)`;
        }
        else {
            // counter=(i-1)/2;
            sliderItem.style.transform = `translateX(${-(i-1)*halfOfWidth}px)`;
        }
    }   

    // ================setInterval cho slide ================
    let startPSlide = -2*oneSlider;
    sliderItem.addEventListener("transitionend", (e)=>{
        changeDotBtnWhenMouseUp();
        startPSlide = getTranslateX();
        if(startPSlide== -(size-2)*oneSlider){
            startPSlide = -2 * oneSlider;
            sliderItem.style.transition = "none";
            sliderItem.style.transform = `translateX(${startPSlide}px)`;
        }
    })
    setInterval(()=>{
        if(!isPress){
            startPSlide -= oneSlider;
            sliderItem.style.transition = "transform 0.4s ease-in-out";
            sliderItem.style.transform = `translateX(${startPSlide}px)`;
        }
    }, 3000);
}


handeIndex()
