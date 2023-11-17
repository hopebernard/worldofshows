"use strict"



const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    });
}

window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src],source[data-srcset]').length > 0) {
        lazyScrollCheck();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset');
        }
        delete lazyImagesPositions[imgIndex];
    }
}






const burgerIcon = document.querySelector('.icon-menu');
const burgerMenu = document.querySelector('.menu');

burgerIcon.addEventListener('click', function() {
    burgerIcon.classList.toggle('_burger-icon-active');
    burgerMenu.classList.toggle('_burger-menu-active');
})







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
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            pauseOnMouseEnter: true,
            loop: true,
            observer: true,
            observeParents: true,
            speed: 800, 
//            pagination: {
//                el: '.swiper-pagination',
//                clickable: true,
//            },
            spaceBetween: 30,
            allowTouchMove: true,
            breakpoints: {
                710: {
                    slidesPerView: 2,
                },
                780: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 2,
                },
                1590: {
                    slidesPerView: 3,
                },
                2220: {
                    slidesPerView: 4,
                    autoHeight: true,
                },
            }
        });
    }
    if (document.querySelector('.thumbs-images')) {
        const thumbsSwiper = new Swiper('.thumbs-images', {
            loop: true,
            observer: true,
            observeParents: true,
            spaceBetween: 10,
            slidesPerView: 4,
            speed: 800,
            autoplay: {
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            pauseOnMouseEnter: true,
            slideToClickedSlide: true,
            initialSlide: 1,
            allowTouchMove: true,
            breakpoints: {
                310: {
                    direction: 'horizontal',
                    spaceBetween: 10,
                    slidesPerView: 4,
                },
                860: {
                    direction: 'vertical',
                    spaceBetween: 10,
                    slidesPerView: 4,
                },
                992: {
                    direction: 'horizontal',
                    spaceBetween: 10,
                    slidesPerView: 4,
                },
            }
        });
        new Swiper('.images-product__slider', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            pauseOnMouseEnter: true,
            thumbs: {
                swiper: thumbsSwiper,
            },
            loop: true,
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800, 
            allowTouchMove: true,
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





const spoilersArray = document.querySelectorAll('[data-spoilers]');
if (spoilersArray.length > 0) {
    const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
        return !item.dataset.spoilers.split(',')[0];
    });
    if (spoilersRegular.length > 0) {
        initSpoilers(spoilersRegular);
    }
    const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
        return item.dataset.spoilers.split(',')[0];
    });
    if (spoilersMedia.length > 0) {
        const breakpointsArray = [];
        spoilersMedia.forEach(item => {
            const params = item.dataset.spoilers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray [1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        let mediaQueries = breakpointsArray.map(function (item) {
            return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            
            const spoilersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            });
            matchMedia.addListener(function() {
                initSpoilers(spoilersArray, matchMedia);
            });
            initSpoilers(spoilersArray, matchMedia);
        });
    }
    function initSpoilers(spoilersArray, matchMedia = false) {
        spoilersArray.forEach(spoilersBlock => {
            spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
            if (matchMedia.matches || !matchMedia) {
                spoilersBlock.classList.add('_init');
                initSpoilerBody(spoilersBlock);
                spoilersBlock.addEventListener("click", setSpoilerAction);
            } else {
                spoilersBlock.classList.remove('_init');
                initSpoilerBody(spoilersBlock, false);
                spoilersBlock.removeEventListener('click', setSpoilerAction);
            }
        });
    }
    function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
        const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
        if (spoilerTitles.length > 0) {
            spoilerTitles.forEach(spoilerTitle => {
                if (hideSpoilerBody) {
                    spoilerTitle.removeAttribute('tabindex');
                    if (!spoilerTitle.classList.contains('_active')) {
                        spoilerTitle.nextElementSibling.hidden = true;
                    }
                } else {
                    spoilerTitle.setAttribute('tabindex', '-1');
                    spoilerTitle.nextElementSibling.hidden = false;
                }
            });
        }
    }
    function setSpoilerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
            const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
            const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
            const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
            if (!spoilersBlock.querySelectorAll('_slide').length) {
                if (oneSpoiler && !spoilerTitle.classList.contains('_active')) {
                    hideSpoilersBody(spoilersBlock);
                }
                spoilerTitle.classList.toggle('_active');
                _slideToggle(spoilerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpoilersBody(spoilersBlock) {
        const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
        if (spoilerActiveTitle) {
            spoilerActiveTitle.classList.remove('_active');
            _slideUp(spoilerActiveTitle.nextElementSibling, 500);
        }
    }
}


let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration +'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp (target,duration);
    }
}