//display sub menu
var subMenu = document.getElementById('menu-sub');
subMenu.addEventListener("click",displaySubMenu);
function displaySubMenu(){
    let ulMenu = document.getElementById('my-sub-menu');
    ulMenu.style.height === '' ? ulMenu.style.height = '0px' : '';
    ulMenu.style.height === '0px' ? ulMenu.style.height='auto':ulMenu.style.height = '0px';
}
/*----------------------slide ------------------- */
//images
// let dotSlide = document.getElementsByClassName('slide-dot')[ 0 ].children;
// let slide = document.getElementsByClassName('slide');
// let index = 0;

// const images = [
//     './asset/images/1.jpg',
//     './asset/images/2.png',
//     './asset/images/3.jpg',
//     './asset/images/4.jpg',
//     './asset/images/5.jpg',
//     './asset/images/6.jpg'
// ]

// window.addEventListener('load',setBackgroundForSlide);

// function setBackgroundForSlide()
// {
   
//     for(let i = 0; i < slide.length ; i ++)
//     {
//         if(i>0)
//         {
//             slide[i].style.display='none';
//         }
//         slide[i].style.background="linear-gradient( rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.3)100%),url('"+images[i]+"')";
//         slide[i].style.backgroundSize='cover';
//         slide[i].style.backgroundRepeat='no-repeat';
//     }
// }

// function slider(index)
// {
    
//     for(let i=0;i<slide.length;i++)
//     {
//         slide[i].style.display='none';
//         dotSlide[i].classList.remove('dot-active');
//     }
//     dotSlide[index].classList.add('dot-active');
//     slide[index].style.display='block';
// }

// window.addEventListener('load',carousel);

// function carousel(clear)
// {
//     let idInterval;
  
//     idInterval=setInterval(function(){
//         slider(index);
//         index++;
//         if(index>5)
//             index=0;
//     },4000);
//     if(clear===1)
//     {
//         clearInterval(idInterval);  
//     }
// }

// for(let i=0;i<dotSlide.length;i++)
// {
//     dotSlide[i].addEventListener('click',()=>{
//         index=i;
//         slider(index);
//         carousel(1);
//     })
// }
// /*--------------end slide-------------------- */

// /*-----cabin carousel------ */
// let arrowLeft=document.getElementById('arrow-left');
// let arrowRight=document.getElementById('arrow-right');
// let num=0;
// arrowLeft.addEventListener('click',function(){
//     if(num===0)
//     {
//         num=5;
//     }
//     num===5?document.getElementsByClassName('cabin-dot')[0].children[0].classList.remove('cabin-dot-active'):document.getElementsByClassName('cabin-dot')[0].children[num].classList.remove('cabin-dot-active');
//     num--;
//     document.getElementsByClassName('cabin-slide-item')[0].style.marginLeft=-num*100+'%';
//     document.getElementsByClassName('cabin-dot')[0].children[num].classList.add('cabin-dot-active');
    
    
// })
// arrowRight.addEventListener('click',function(){
//     if(num===4)
//     {
//         num=-1;
//     }
    
//     num===-1?document.getElementsByClassName('cabin-dot')[0].children[4].classList.remove('cabin-dot-active'):document.getElementsByClassName('cabin-dot')[0].children[num].classList.remove('cabin-dot-active');
//     num++;
//    document.getElementsByClassName('cabin-slide-item')[0].style.marginLeft=-num*100+'%';
//    document.getElementsByClassName('cabin-dot')[0].children[num].classList.add('cabin-dot-active');
// })

// /*----end cabin carousel-------- */

// /*----image gallery-------- */
// const gallery=[
//     './asset/images/galery1.jpg',
//     './asset/images/galery2.jpg',
//     './asset/images/galery3.jpg',
//     './asset/images/galery4.jpg',
//     './asset/images/galery5.jpg',
//     './asset/images/galery6.jpg'
// ]
// let galleryWrap=document.getElementsByClassName('gallery-wrap')[0];
// let galleryItem=document.getElementsByClassName('image-gallery-item');
// for(let i=0;i<galleryItem.length;i++)
// {
//     galleryItem[i].style.backgroundImage="url("+gallery[i]+")";
//     galleryItem[i].addEventListener('click',()=>{
//       let indexGallery=i;
//       console.log(indexGallery);
//         document.getElementsByClassName('gallery-carousel')[0].style.display='block';
//                 /*----gallery carousel----------- */
//         let gallerySlide=document.getElementsByClassName('gallery-slide-wrap');
//         let arrowControlLeft=document.getElementById('arrow-left-gallery');
//         let arrowControlRight=document.getElementById('arrow-right-gallery');
//         let bgItem=document.getElementsByClassName('gallery-slide-img');
//         for(let i=0;i<bgItem.length;i++)
//         {
//             bgItem[i].style.backgroundImage="url("+gallery[i]+")";
//             gallerySlide[indexGallery].style.display='block';
//             if(i!==indexGallery)
//             {
//                 gallerySlide[i].style.display='none';
//             }
//         }


//         arrowControlRight.addEventListener('click',()=>{
//             indexGallery++;
//             for(let i=0;i<gallerySlide.length;i++)
//             {
//                 gallerySlide[i].style.display='none';
//             }
//             if(indexGallery>5)
//             {
//                 indexGallery=0;
//             }
//             gallerySlide[indexGallery].style.display='block';
          

//         })

//         arrowControlLeft.addEventListener('click',()=>{
//             indexGallery--;
//             for(let i=0;i<gallerySlide.length;i++)
//             {
//                 gallerySlide[i].style.display='none';
//             }
//             if(indexGallery<0)
//             {
//                 indexGallery=5;
//             }
//             gallerySlide[indexGallery].style.display='block';
           

//         })


//         /*------end gallery carousel----------- */
//     })
// }   
// function closeCarousel(){   
//     document.getElementsByClassName('gallery-carousel')[0].style.display='none';  
// }

// /*----end image gallery---------- */

// /**---------quote -------*/
// let quoteContent=document.getElementsByClassName('quote-content');
// let indexQuote=0;
// function displayQuote(index){
//     for(let i=0;i<quoteContent.length;i++)
//     {
//         quoteContent[i].style.display='none';
//     }
//     quoteContent[index].style.display='block';
// }
// displayQuote(indexQuote);
// setInterval(function(){
//     indexQuote++;
//     if(indexQuote>2)
//         indexQuote=0;
//     displayQuote(indexQuote);
   
// },3000);
// /**---------end quote ------*/

/*----------menu-mobile----------- */
    let wrapper=document.getElementById('wrapper');
    let subMenuMb=document.getElementById('menu-mb-sub');
    let menuMb=document.getElementsByClassName('menu-mobile')[0];
    let ulSubMenu=document.getElementById('sub-mb-menu');
    // ulSubMenu.style.height=='0px'
    menuMb.style.marginLeft='-250px';
    // subMenuMb.addEventListener('click',function(e){

    //     ulSubMenu.style.height=='0px' ? ulSubMenu.style.height='auto':ulSubMenu.style.height='0px';
    // })

    let iconMenu=document.getElementById('icon-menu');
    iconMenu.addEventListener('click',toggleMenuMobile);
    function toggleMenuMobile(){

        if(menuMb.style.marginLeft=='-250px')
        {
            menuMb.style.marginLeft='0';
            wrapper.style.display='block';
        }
        else
        {
            menuMb.style.marginLeft='-250px';
            wrapper.style.display='none';

        } 
    }

    wrapper.addEventListener('click',function(){
        menuMb.style.marginLeft='-250px';
        wrapper.style.display='none';
    })
/**----------end menu mobile------------------- */

