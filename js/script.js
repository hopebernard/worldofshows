"use strict"

const burgerIcon = document.querySelector('.icon-menu');
const burgerMenu = document.querySelector('.menu');

burgerIcon.addEventListener('click', function() {
    burgerIcon.classList.toggle('_burger-icon-active');
    burgerMenu.classList.toggle('_burger-menu-active');
})


const parent_original = document.querySelector('.menu-top-header__rows');
const parent = document.querySelector('.menu__body');
const item = document.querySelector('.menu-top-header__list');

window.addEventListener('load', function(event) {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport_width <= 992) {
        if(!item.classList.contains('done')) {
            parent.insertBefore(item, parent.children[0]);
            item.classList.add('done');
        } 
    } else {
        if (item.classList.contains('done')) {
            parent_original.insertBefore(item,parent_original.children[0]);
            item.classList.remove('done');
        }
    }
});
window.addEventListener('resize', function(event) {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport_width <= 992) {
        if(!item.classList.contains('done')) {
            parent.insertBefore(item, parent.children[0]);
            item.classList.add('done');
        } 
    } else {
        if (item.classList.contains('done')) {
            parent_original.insertBefore(item,parent_original.children[0]);
            item.classList.remove('done');
        }
    }
});



const parent_original_header = document.querySelector('.menu-top-header__rows');
const parent_header = document.querySelector('.header__small-block');
const item_header = document.querySelector('.actions-header');

window.addEventListener('load', function(event) {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport_width <= 580) {
        if(!item_header.classList.contains('done_header')) {
            parent_header.insertBefore(item_header, parent_header.children[0]);
            item_header.classList.add('done_header');
        } 
    } else {
        if (item_header.classList.contains('done_header')) {
            parent_original_header.insertBefore(item_header,parent_original_header.children[1]);
            item_header.classList.remove('done_header');
        }
    }
});
window.addEventListener('resize', function(event) {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport_width <= 580) {
        if(!item_header.classList.contains('done_header')) {
            parent_header.insertBefore(item_header, parent_header.children[0]);
            item_header.classList.add('done_header');
        } 
    } else {
        if (item_header.classList.contains('done_header')) {
            parent_original_header.insertBefore(item_header,parent_original_header.children[1]);
            item_header.classList.remove('done_header');
        }
    }
});








/*====================================
======================================
======================================
======================================
======================================
======================================
======================================*/




function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
    if (sliders) {
        sliders.forEach(slider => {
            slider.parentElement.classList.add('swiper');
            slider.classList.add('swiper-wrapper');
            for (const slide of slider.children) {
                slide.classList.add('swiper-slide');
            }
        });
    }
}

function initSliders() {
    bildSliders();
    if (document.querySelector('.show__slider')) {
        new Swiper('.show__slider', {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            observer: true,
            observeParents: true,
            speed: 800, 
            pagination: {
                el: '.show__dotts',
                clickable: true,
            },
            breakpoints: {
                2800: {
                    slidesPerView: 1,
                    spaceBetween:20,
                    autoHeight: true,
                },
                605: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1020: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1370: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }
        });
    }
};

window.addEventListener('load', function(e) {
    initSliders();
});
window.addEventListener('resize', function(e) {
    initSliders();
});





/*======================================
========================================
========================================
========================================
========================================
========================================*/





