const typed = new Typed('#element', {
    strings: ['Ai'],
    typeSpeed: 550,
    backSpeed: 50,
    loop: true,
});

const plane = document.getElementById('plane');
let positionX;
let scale = 0.5;
let direction = 'left';
let animationCount = 0;
const maxAnimations = 2;

function resetPosition() {
    if (direction === 'left') {
        positionX = -100;
        plane.classList.remove('mirrored');
        plane.classList.add('normal');
    } else {
        positionX = window.innerWidth + 100;
        plane.classList.remove('normal');
        plane.classList.add('mirrored');
    }
    plane.style.transform = `translate(${positionX}px, -50%) scale(${scale})`;
}

function animatePlane() {
    if (direction === 'left') {
        positionX += 3;
    } else {
        positionX -= 3;
    }

    scale = Math.min(scale + 0.003, 1.5);
    plane.style.transform = `translate(${positionX}px, -50%) scale(${scale})`;

    if ((direction === 'left' && positionX >= window.innerWidth) ||
        (direction === 'right' && positionX <= 0)) {
        animationCount++;
        if (animationCount >= maxAnimations) {
            return;
        }
        scale = 0.5;
        direction = direction === 'left' ? 'right' : 'left';
        resetPosition();
    }
    requestAnimationFrame(animatePlane);
}
resetPosition();
animatePlane();

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const backdrop = document.querySelector('.backdrop');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    backdrop.classList.toggle('active');
});

backdrop.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');
});

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header');
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                header.classList.add('visible');
            }
        },
        { threshold: 0.5 }
    );
    observer.observe(header);

    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.animation = `fadeIn 0.5s ease ${(index + 1) * 0.2}s forwards`;
        }, 100);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const ratings = document.querySelectorAll('.review');
    ratings.forEach(review => {
        const stars = document.createElement('div');
        stars.classList.add('stars');
        stars.innerHTML = '★★★★★'.split('').map((star, i) =>
            `<span style="color:${i < 5 ? '#FFD700' : '#CCC'};">${star}</span>`
        ).join('');
        review.prepend(stars);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector('.logo');

    logo.addEventListener('mouseenter', () => {
        logo.classList.add('animated');
        setTimeout(() => {
            logo.classList.remove('animated');
        }, 2000);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('imageModal');
    const modalImage = modal.querySelector('.modal-content img');
    const closeButton = modal.querySelector('.close-btn');
    const images = document.querySelectorAll('.screenshots img');

    let currentIndex = 0;
    let zoomLevel = 1;
    const openModal = (index) => {
        currentIndex = index;
        modalImage.src = images[currentIndex].src;
        modal.classList.add('active');
        modalImage.style.transform = `scale(${zoomLevel})`;
    };

    const closeModal = () => {
        modal.classList.remove('active');
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex].src;
        modalImage.style.transform = `scale(${zoomLevel})`;
    };
    const showPrevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentIndex].src;
        modalImage.style.transform = `scale(${zoomLevel})`;
    };

    const zoomIn = () => {
        zoomLevel += 0.1;
        modalImage.style.transform = `scale(${zoomLevel})`;
    };

    const zoomOut = () => {
        if (zoomLevel > 0.2) {
            zoomLevel -= 0.1;
            modalImage.style.transform = `scale(${zoomLevel})`;
        }
    };
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === '+') zoomIn();
        if (e.key === '-') zoomOut();
    });

    modalImage.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
        e.preventDefault();
    });
});

function openCustomModal() {
    document.getElementById('customModal').style.display = 'block';
    document.getElementById('customOverlay').style.display = 'block';
}

function closeCustomModal() {
    document.getElementById('customModal').style.display = 'none';
    document.getElementById('customOverlay').style.display = 'none';
}
function handleYes() {
    sendEmailToClient()
        .then(response => {
            alert("Email sent successfully!");
            closeCustomModal();
        })
        .catch(error => {
            alert("Failed to send email.");
            console.error(error);
        });
}

async function sendEmailToClient() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Email Sent");
        }, 1000);
    });
}