// ======================================================
// MODAL ZOOM
// ======================================================

function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");

    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = src;
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");

    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}


// Close modal with Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});


// ======================================================
// ENTER PORTFOLIO
// ======================================================

function enterPortfolio() {
    const welcomeScreen = document.getElementById("welcome-screen");

    if (!welcomeScreen) return;

    // Pastikan mulai dari Home
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    // Hindari animasi dipanggil berkali-kali
    if (welcomeScreen.classList.contains("fade-out")) return;

    // Jika GSAP tersedia
    if (typeof gsap !== "undefined") {

        gsap.to(welcomeScreen, {
            opacity: 0,
            scale: 0.98,
            duration: 0.8,
            ease: "power2.inOut",

            onComplete: () => {

                welcomeScreen.classList.add("fade-out");

                // Hero content
                gsap.fromTo(
                    ".hero-content",
                    {
                        y: 30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out"
                    }
                );

                // Lanyard / ID card
                gsap.fromTo(
                    ".hero-lanyard-container",
                    {
                        y: -30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out"
                    }
                );
            }
        });

    } else {

        // Fallback jika GSAP gagal dimuat
        welcomeScreen.classList.add("fade-out");
    }
}


// ======================================================
// INITIALIZATION
// ======================================================

window.addEventListener("load", () => {

    initDiagDots();
    initWebDots();
    startAutoSliders();
    init3DTilt();

});


// ======================================================
// 3D TILT ID CARD
// ======================================================

function init3DTilt() {

    const tiltCard =
        document.getElementById("tiltCard");

    if (!tiltCard) return;

    // Tidak menjalankan tilt pada perangkat touch
    if (
        window.matchMedia("(hover: none)").matches
    ) {
        return;
    }

    tiltCard.addEventListener("mousemove", (e) => {

        const rect =
            tiltCard.getBoundingClientRect();

        const x =
            e.clientX -
            rect.left -
            rect.width / 2;

        const y =
            e.clientY -
            rect.top -
            rect.height / 2;

        // Dibuat lebih subtle supaya terasa premium
        const rotateY =
            (x / (rect.width / 2)) * 10;

        const rotateX =
            -(y / (rect.height / 2)) * 10;

        if (typeof gsap !== "undefined") {

            gsap.to(tiltCard, {
                rotationY: rotateY,
                rotationX: rotateX,
                transformPerspective: 1200,
                duration: 0.25,
                ease: "power1.out",
                overwrite: true
            });
        }
    });


    tiltCard.addEventListener("mouseleave", () => {

        if (typeof gsap !== "undefined") {

            gsap.to(tiltCard, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            });
        }
    });
}


// ======================================================
// DIAGRAM SLIDER
// ======================================================

let currentDiagIndex = 0;


function initDiagDots() {

    const items =
        document.querySelectorAll(".diag-item");

    const container =
        document.getElementById("diagDots");

    if (!container) return;

    container.innerHTML = "";

    items.forEach((_, i) => {

        const dot =
            document.createElement("div");

        dot.className =
            `carousel-dot ${
                i === 0 ? "active" : ""
            }`;

        dot.onclick = () => {

            currentDiagIndex = i;

            updateDiagUI();
        };

        container.appendChild(dot);
    });
}


function shiftDiagSlide(direction) {

    const items =
        document.querySelectorAll(".diag-item");

    if (!items.length) return;

    currentDiagIndex =
        (
            currentDiagIndex +
            direction +
            items.length
        ) % items.length;

    updateDiagUI();
}


function updateDiagUI() {

    const items =
        document.querySelectorAll(".diag-item");

    const dots =
        document.querySelectorAll(
            "#diagDots .carousel-dot"
        );

    items.forEach((item, i) => {

        item.classList.toggle(
            "active",
            i === currentDiagIndex
        );
    });

    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentDiagIndex
        );
    });
}


// ======================================================
// WEB PROJECT SLIDER
// ======================================================

let currentWebIndex = 0;


function initWebDots() {

    const items =
        document.querySelectorAll(".web-item");

    const container =
        document.getElementById("webDots");

    if (!container) return;

    container.innerHTML = "";

    items.forEach((_, i) => {

        const dot =
            document.createElement("div");

        dot.className =
            `carousel-dot ${
                i === 0 ? "active" : ""
            }`;

        dot.onclick = () => {

            currentWebIndex = i;

            updateWebUI();
        };

        container.appendChild(dot);
    });
}


function shiftWebSlide(direction) {

    const items =
        document.querySelectorAll(".web-item");

    if (!items.length) return;

    currentWebIndex =
        (
            currentWebIndex +
            direction +
            items.length
        ) % items.length;

    updateWebUI();
}


function updateWebUI() {

    const items =
        document.querySelectorAll(".web-item");

    const dots =
        document.querySelectorAll(
            "#webDots .carousel-dot"
        );

    items.forEach((item, i) => {

        item.classList.toggle(
            "active",
            i === currentWebIndex
        );
    });

    dots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentWebIndex
        );
    });
}


// ======================================================
// AUTO PLAY SLIDER
// ======================================================

function startAutoSliders() {

    // Diagram slider
    setInterval(() => {

        shiftDiagSlide(1);

    }, 4500);


    // Web project slider
    setInterval(() => {

        shiftWebSlide(1);

    }, 5000);
}


// ======================================================
// DYNAMIC NAVBAR + PAGE TITLE
// ======================================================

const sections =
    document.querySelectorAll("section, header");

const navLinks =
    document.querySelectorAll(".nav-links a");

const pageTitle =
    document.getElementById("page-title");


const titleMap = {

    hero:
        "Karina Salma Rizkita - System & Business Analyst",

    about:
        "About Me | Karina Salma Rizkita",

    experience:
        "Experience | Karina Salma Rizkita",

    diagrams:
        "Diagrams | Karina Salma Rizkita",

    projects:
        "Web Projects | Karina Salma Rizkita",

    skills:
        "Portfolio | Karina Salma Rizkita",

    contact:
        "Contact | Karina Salma Rizkita"
};


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const id =
                    entry.target.getAttribute("id");

                if (!id) return;


                // Update browser title
                if (
                    pageTitle &&
                    titleMap[id]
                ) {
                    pageTitle.textContent =
                        titleMap[id];
                }


                // Update active navbar
                navLinks.forEach((link) => {

                    link.classList.remove(
                        "active-nav"
                    );

                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {

                        link.classList.add(
                            "active-nav"
                        );
                    }
                });

            });

        },

        {
            threshold: 0.3
        }
    );


sections.forEach((section) => {
    observer.observe(section);
});