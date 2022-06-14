// all
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function handleAll(){
    //prevent default form
    var formlist = document.querySelectorAll('form');
    for(var form of formlist) {
        form.onsubmit = (e) => {
            e.preventDefault();
        }
    }

    //btn shoping card + btn avatar
    let shopingCardBtn = $('#page-heading .shoping-card-title');
    let avatarBtn = $('#page-heading .avatar-wrapper img')
    shopingCardBtn.onclick = function() {
        this.parentElement.classList.toggle('onclick');
    }
    avatarBtn.onclick = function() {
        this.parentElement.classList.toggle('onclick');
    }

    document.onclick = (e)=> {  
        if(!e.target.closest('.shopping-card-wrapper')){
            if(shopingCardBtn.parentElement.classList.contains('onclick')){
                shopingCardBtn.parentElement.classList.remove('onclick');
            }
        }
        if(!e.target.closest('.avatar-wrapper')){
            if(avatarBtn.parentElement.classList.contains('onclick')){
                avatarBtn.parentElement.classList.remove('onclick');
            }
        }
    }

}

handleAll();

// index.html 
function handleIndex() {
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

    // =======watch movies==============
    let btnControllers = $$('#page-content .btn-controller .btn');
    function filterMovies(selector){
        let movieControlleds = $$('.btn-controller + .row .col-lg-3');  //nodelist

        for(let movieControlled of movieControlleds){
            if(movieControlled.classList.contains(selector)){
                movieControlled.style.display = 'block';
            }
            else movieControlled.style.display = 'none';
        }
    };
    filterMovies('top_rate');
    function btnRemoveClassActive(){
        for(let btnController of btnControllers){
            if(btnController.classList.contains('active')){
                btnController.classList.remove('active');
                break;
            }
        }
    }

    for(let btnController of btnControllers){
        btnController.addEventListener("click", ()=>{
            btnRemoveClassActive();
            btnController.classList.add('active');
            let choice = btnController.dataset.choice;
            filterMovies(choice);
        })
    }


    // ========testmonials =================================
    let T_show = $('.T-review-show');
    let T_container = $('.T-review-container');
    let T_reviewers = $$('.T-reviewer');
    let T_size = T_reviewers.length;
    let T_oneReviewer = T_container.clientWidth/T_size;
    let T_sliderSpace = 0;

    let T_pressed = false;
    let T_interval = true;
    let T_startP, T_currentP;
    let T_body = document.documentElement;
    let T_dotItems = $$('.T-dot-item');
    var T_id;

    function T_getTranslateX() {
        var style = window.getComputedStyle(T_container);
        var matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }

    function T_moveSlide(){
        T_interval = true;
        T_sliderSpace += T_oneReviewer;
        T_container.style.transition = "transform 0.4s ease-in-out";
        T_container.style.transform = `translateX(${-(T_sliderSpace)}px)`;
    }
    // truot slide
    T_id = setInterval(T_moveSlide, 3000);

    function T_setDot(index){
        for(let T_dotItem of T_dotItems){
            if(T_dotItem.classList.contains("active")){
                T_dotItem.classList.remove("active");
            }
        }
        T_dotItems[index-1].classList.add("active");
    }
    // config dot + clear interval
    T_container.addEventListener('transitionend',(e)=>{
        let space = -T_getTranslateX();
        T_sliderSpace = -T_getTranslateX();
        if(space===0 || space === T_oneReviewer*(1)){
            T_setDot(1);
        }
        if(space === T_oneReviewer*(2)|| space === T_oneReviewer*(3)){
            T_setDot(2);
        }
        if(space >= T_oneReviewer*(4)){
            T_setDot(3);
            clearInterval(T_id)
            T_interval = false;
            return;
        }
        if(!T_interval){
            T_interval = true;
            T_id = setInterval(T_moveSlide, 3000)
        }
    })

    // handle mouse touch
    T_container.addEventListener('mousedown', (e)=>{
        e.preventDefault();
        T_pressed = true;
        T_startP = e.screenX - T_getTranslateX();
        T_container.style.transition = "none";
        if(T_interval){
            clearInterval(T_id)
            T_interval = false;
        }
    })

    T_container.addEventListener('mousemove', T_handleMousemove);
    T_body.addEventListener("mousemove", T_handleMousemove);

    function T_handleMousemove(e){
        e.preventDefault();
        if(!T_pressed) return;
        T_currentP = e.screenX-T_startP;
        T_container.style.transform = `translateX(${T_currentP}px)`;

        let y = T_getTranslateX();
        if(y >= 0){
            T_container.style.transform = `translateX(${(300*y)/(300+y)}px)`;
            T_startP = e.screenX - y;
        }
        if(-y >= (T_container.clientWidth - T_show.clientWidth)){
            let k = -y - (T_container.clientWidth - T_show.clientWidth);
            T_container.style.transform = `translateX(-${(T_container.clientWidth - T_show.clientWidth + (300*k)/(k+300))}px)`;
            T_startP = e.screenX - y;
        }
    }

    T_container.addEventListener("mouseup", T_handleMouseUp);
    T_body.addEventListener("mouseup", T_handleMouseUp);

    function T_handleMouseUp(e) {
        e.preventDefault();
        T_pressed = false;
        let halfOfWidth = T_oneReviewer/2;
        let i=1;
        while(true) {
            if(-T_getTranslateX()>halfOfWidth*i){
                i++;
                continue;
            }
            break;
        }
        T_container.style.transition = "transform 0.4s ease-in-out";

        // handlde transform
        if(i%2 === 0 ){
            // counter=i/2;
            if(i>=8) i=8;
            T_container.style.transform = `translateX(${-(i)*halfOfWidth}px)`;
        }
        else {
            // counter=(i-1)/2;
            T_container.style.transform = `translateX(${-(i-1)*halfOfWidth}px)`;
        }
        // console.log(i)
        if(!T_interval && T_sliderSpace < T_oneReviewer*(4)){
            T_interval = true;
            T_id = setInterval(T_moveSlide, 3000)
        }
    }   
    // handle when click dot btn
    for(let T_dotItem of T_dotItems){
        T_dotItem.addEventListener('click', function(){
            T_setDot(T_dotItem.dataset.index);
            if(T_interval){
                T_interval = false;
                clearInterval(T_id);
            }
            T_container.style.transform = `translateX(-${(T_dotItem.dataset.index-1)*2*T_oneReviewer}px)`;
        })
    }
}

//movies.html
function handleMovies(){
    //btn pagination
    function handleClickPa(index){
        
        for(let paginationBtn of paginationBtns){
            if(paginationBtn.classList.contains('active')){
                paginationBtn.classList.remove('active');
            }
        }
        paginationBtns[index].classList.add('active');
        if(index == 1){
            paginationBtns[0].style.display='none';
        }
        else {
            paginationBtns[0].style.display='inline-block';
        }
        if(index == paginationBtns.length-2) {
            paginationBtns[paginationBtns.length-1].style.display='none';
        }
        else {
            paginationBtns[paginationBtns.length-1].style.display='inline-block';
        }
    }

    let paginationBtns = $$('.RC-pagination a');
    let currentIndex;
    for(let paginationBtn of paginationBtns){
        paginationBtn.addEventListener('click', ()=>{
            // let index = paginationBtn.dataset.index;
            // if(index>=1 && index <= paginationBtns.length-2){
            //     handleClickPa(index);
            //     currentIndex = index;
            //     // if(index == 1){
            //     //     paginationBtns[0].style.display='none';
            //     //     paginationBtns[paginationBtns.length-1].style.display='inline-block';
            //     // }
            //     // if(index == paginationBtns.length-2) {
            //     //     paginationBtns[0].style.display='inline-block';
            //     //     paginationBtns[paginationBtns.length-1].style.display='none';
            //     // }
            // }
            // else{
            //     let activeIndex = $('.RC-pagination a.active').dataset.index;
            //     if(index == 0){

            //     }
            // }
            let index = paginationBtn.dataset.index;
            let activeIndex = $('.RC-pagination a.active').dataset.index;
            if(index>=1 && index <= paginationBtns.length-2){
                currentIndex = index;
            }
            else if(index == 0) {
                if(activeIndex == 1){
                    currentIndex = paginationBtns.length-2;
                }
                else currentIndex = Number(activeIndex) - 1;
            }
            else {
                if(activeIndex == 6){
                    currentIndex = 1;
                }
                else currentIndex = Number(activeIndex) + 1;
            }
            handleClickPa(currentIndex)
        })
    }
}


