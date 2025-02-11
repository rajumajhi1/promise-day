const promises = [
    "I promise to be your strength when you need someone to lean on, and your comfort when you need a shoulder to cry on.",
    "I promise to hold your hand through life's ups and downs, making every moment more beautiful with you by my side.",
    "I promise to cherish every smile, every tear, and every precious moment we share together.",
    "I promise to be your safe haven, where you can always find love, understanding, and acceptance.",
    "I promise to love you more with each passing day, making our bond stronger and deeper.",
    "I promise to be your biggest supporter, celebrating your victories and helping you through challenges.",
    "I promise to fill our life with tender moments, gentle kisses, and warm embraces.",
    "I promise to always remind you how special you are and how blessed I am to have you in my life.",
    "I promise to keep our love story alive, creating beautiful memories together every single day.",
    "I promise to be not just your lover, but your best friend, confidant, and soulmate.",
    "I promise to protect our love and nurture it like the precious gift it is.",
    "I promise to always choose you, in this moment and in all the moments to come.",
    "I promise to be your peace in chaos, your light in darkness, and your love in all seasons.",
    "I promise to make our love grow deeper and stronger with each passing moment.",
    "I promise to keep your heart safe and cherished, for it's the most precious gift I've ever received."
];

const finalPromise = `My dearest Kaju ❤️

From the moment you entered my life, everything became more beautiful and meaningful. You are the answer to every prayer I never knew I was making. Today, on this special Promise Day, I want to make the most important promise of my life:

I promise to love you with every breath, every heartbeat, and every moment of my existence. You are my first thought in the morning and my last prayer at night. I promise to be the shoulder you can cry on, the hand you can hold, and the heart that will always beat for you.

In your eyes, I see my home; in your smile, I find my peace; and in your love, I discover the true meaning of life. I promise to cherish this precious love we share and make it grow stronger with each passing day.

You are my today, my tomorrow, and my forever. I love you more than words could ever express, and I promise to show you this love in a million little ways, every single day of our lives together.

Forever Yours,
With All My Love ❤️`;

// DOM Elements
const heartButton = document.getElementById('heart-button');
const promiseText = document.getElementById('promise-text');
const finalMessage = document.getElementById('final-message');
const finalPromiseText = document.getElementById('final-promise');
const dingSound = document.getElementById('ding-sound');
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const themeToggle = document.getElementById('theme-toggle');
const promiseCounter = document.getElementById('promise-count');
const envelope = document.querySelector('.envelope');
const floatingHeartsContainer = document.querySelector('.floating-hearts');
const promiseSection = document.getElementById('promise-section');

let clickCount = 0;
let usedPromises = new Set();
let isMusicPlaying = false;
let isDarkTheme = false;
let finalMessageShown = false;

// Create starry background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        starsContainer.appendChild(star);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.setProperty('--translate-x', `${(Math.random() - 0.5) * 200}px`);
    heart.style.setProperty('--rotate', `${Math.random() * 360}deg`);
    heart.style.left = `${50 + (Math.random() - 0.5) * 20}%`;
    floatingHeartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}

function getRandomPromise() {
    if (usedPromises.size === promises.length) {
        usedPromises.clear();
    }
    
    let availablePromises = promises.filter(promise => !usedPromises.has(promise));
    let randomPromise = availablePromises[Math.floor(Math.random() * availablePromises.length)];
    usedPromises.add(randomPromise);
    return randomPromise;
}

function playDingSound() {
    dingSound.currentTime = 0;
    dingSound.play().catch(error => console.log("Audio play failed:", error));
}

function revealPromise(promise) {
    envelope.classList.add('open');
    gsap.to(promiseText, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
            promiseText.textContent = promise;
            gsap.to(promiseText, {
                opacity: 1,
                y: 0,
                duration: 0.3
            });
        }
    });
    
    setTimeout(() => {
        envelope.classList.remove('open');
    }, 1000);
}

function showFinalMessage() {
    if (finalMessageShown) return;
    
    finalMessageShown = true;
    finalPromiseText.textContent = finalPromise;
    
    // Hide the promise section with animation
    gsap.to(promiseSection, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
            promiseSection.style.display = 'none';
            
            // Show and animate the final message
            finalMessage.style.display = 'block';
            finalMessage.style.opacity = '1';
            
            gsap.fromTo(finalMessage, 
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "back.out(1.7)"
                }
            );
            
            gsap.from('.final-card', {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: "back.out(1.7)",
                onComplete: () => {
                    // Ensure the message stays visible
                    finalMessage.style.opacity = '1';
                    finalMessage.style.display = 'block';
                }
            });
        }
    });
    
    // Save state to localStorage
    localStorage.setItem('finalMessageShown', 'true');
    localStorage.setItem('clickCount', '10');
}

// Initialize the page state
function initializeState() {
    if (localStorage.getItem('finalMessageShown') === 'true') {
        clickCount = 10;
        promiseCounter.textContent = clickCount;
        promiseSection.style.display = 'none';
        finalMessage.style.display = 'block';
        finalMessage.style.opacity = '1';
        finalMessageShown = true;
        finalPromiseText.textContent = finalPromise;
    } else {
        finalMessage.style.display = 'none';
        finalMessage.style.opacity = '0';
    }
}

heartButton.addEventListener('click', () => {
    if (finalMessageShown) return;
    
    clickCount++;
    promiseCounter.textContent = clickCount;
    createFloatingHeart();
    playDingSound();
    
    if (clickCount < 10) {
        revealPromise(getRandomPromise());
        
        gsap.from(heartButton, {
            scale: 1.5,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    } else {
        showFinalMessage();
    }
});

// Handle mobile touch events for the final card
const finalCard = document.querySelector('.final-card');
if (finalCard) {
    let touchStartTime;
    let touchTimeout;
    
    finalCard.addEventListener('touchstart', () => {
        touchStartTime = Date.now();
        touchTimeout = setTimeout(() => {
            finalCard.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
        }, 200);
    });
    
    finalCard.addEventListener('touchend', () => {
        if (Date.now() - touchStartTime < 200) {
            clearTimeout(touchTimeout);
            const cardInner = finalCard.querySelector('.card-inner');
            cardInner.style.transform = 
                cardInner.style.transform === 'rotateY(180deg)' ? 
                'rotateY(0deg)' : 'rotateY(180deg)';
        }
    });
    
    finalCard.addEventListener('mousemove', (e) => {
        const rect = finalCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;
        
        gsap.to('.card-inner', {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    finalCard.addEventListener('mouseleave', () => {
        gsap.to('.card-inner', {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
}

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.querySelector('.button-icon').textContent = '🎵';
    } else {
        backgroundMusic.play().catch(error => console.log("Music play failed:", error));
        musicToggle.querySelector('.button-icon').textContent = '🔇';
    }
    isMusicPlaying = !isMusicPlaying;
});

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.querySelector('.button-icon').textContent = isDarkTheme ? '☀️' : '🌙';
});

// Initialize the page
createStars();
initializeState();
