import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Sync Lenis with ScrollTrigger so scroll-based animations (e.g. about highlighter) update
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Live Clock in Nav
function updateClock() {
    const timeElement = document.querySelector('.current-time-val');
    if (!timeElement) return;

    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    timeElement.textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Hero Animations Function
function initHeroAnimations() {
    const heroTl = gsap.timeline();

    heroTl.from('.hero-bg-text', {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
    })
        .from('.angled-mask', {
            xPercent: -100,
            skewX: 20,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        }, '-=1.5')
        .from('.hero-vision-text', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=1')
        .from('.hero-mission-text', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.hero-footer', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.5');

    // Parallax for Background Text
    gsap.to('.hero-bg-text', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Parallax Effect for Hero Video (Secondary)
    gsap.to('.hero-video', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Reveal Sections on scroll
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Logo resizing removed

    // Gallery Reveal Animation
    const projectBlocks = document.querySelectorAll('.project-block');
    projectBlocks.forEach(block => {
        const gallery = block.querySelector('.gallery-strip');
        const items = block.querySelectorAll('.gallery-item');

        gsap.from(items, {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: gallery,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Loader Logic
window.addEventListener('load', () => {
    const loaderTl = gsap.timeline();

    loaderTl.to('.loader-text', {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power4.in',
        delay: 1
    })
        .to('#loader', {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
                const loader = document.querySelector('#loader');
                if (loader) loader.style.display = 'none';
                initHeroAnimations();
            }
        });
});

// Menu Toggle Logic
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('#menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        if (menuOverlay.classList.contains('active')) {
            lenis.stop();
            // Optional: Animate menu links on open
            gsap.fromTo('.menu-link',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    overwrite: true
                }
            );
        } else {
            lenis.start();
        }
    });

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            lenis.start();
        });
    });
}

// Project blocks: thumbnail only, no video play on hover; click navigates to detail page

// Sticky Nav persistence and styling on scroll
const nav = document.querySelector('.sticky-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 50) {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.transform = 'translateY(0)';
    } else {
        nav.style.background = 'rgba(13, 13, 13, 0.8)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.transform = 'translateY(0)';
    }
});


// Project Animations
function initProjectAnimations() {
    gsap.utils.toArray('.project-block').forEach((project) => {
        const media = project.querySelector('.project-media');
        if (!media) return;

        // Parallax media
        gsap.fromTo(media, {
            y: 50
        }, {
            y: -50,
            scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Entrance animation for media
        gsap.from(media, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: project,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}
initProjectAnimations();

// About Section Highlighter Animation
function initAboutHighlighter() {
    const aboutText = document.querySelector('#about-highlighter');
    if (!aboutText) return;

    const text = aboutText.innerText;
    aboutText.innerHTML = text.split(' ').map(word => `<span>${word}</span>`).join(' ');

    const spans = aboutText.querySelectorAll('span');

    gsap.to(spans, {
        color: '#ffffff',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#about',
            start: 'top 50%',
            end: 'bottom 90%',
            scrub: true,
        }
    });
}
initAboutHighlighter();

// Lazy load thumbnail videos (metadata only for first frame)
const lazyThumbnails = document.querySelectorAll('video.project-thumbnail');
const thumbObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            video.load();
            observer.unobserve(video);
        }
    });
}, { threshold: 0.1 });

lazyThumbnails.forEach(video => {
    thumbObserver.observe(video);
});
