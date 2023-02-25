import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

$('.galary-accessories').slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  const btn = document.querySelector('.navigat__btn');
  const menu = document.querySelector('.navbar__menu');
  const lines =document.querySelector('.lines');
  const crossLines=  document.querySelector('.cross-lines'); 
  btn.addEventListener('click', ()=>{
      menu.classList.toggle('active-menu');
      lines.classList.toggle('active-menu');
      crossLines.classList.toggle('active-menu');
  })