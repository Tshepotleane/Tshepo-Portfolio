/* =========================================================
   TSHEPO TLEANE — PORTFOLIO
   JAVASCRIPT
========================================================= */


/* =========================================================
   PROJECT DATA
   Add future projects here.
========================================================= */

const projects = [

    {
        number: "01",
        title: "The Art Of AI",
        type: "AI / CREATIVE DEVELOPMENT",
        description:
            "A creative AI web application exploring the intersection of artificial intelligence, software development and digital creativity.",
        technologies: [
            "Python",
            "Flask",
            "Gemini",
            "HTML",
            "CSS"
        ],
        github:
            "https://github.com/Tshepotleane/The-Art-Of-AI",
        demo:
            "#"
    },

    {
        number: "02",
        title: "Job Application Tracker",
        type: "WEB APPLICATION",
        description:
            "A practical web application designed to organize, track and manage job applications using a simple and intuitive interface.",
        technologies: [
            "Python",
            "Flask",
            "SQLite",
            "HTML",
            "CSS"
        ],
        github:
            "#",
        demo:
            "#"
    },

    {
        number: "03",
        title: "SentimentScope",
        type: "DATA / NLP / WEB APPLICATION",
        description:
            "A Python and Flask sentiment analysis platform that analyzes customer reviews, classifies sentiment and presents review insights through a web dashboard.",
        technologies: [
            "Python",
            "Flask",
            "Pandas",
            "NLTK",
            "VADER"
        ],
        github:
            "https://github.com/Tshepotleane/SentimentScope",
        demo:
            "#"
    }

];

/* =========================================================
   GENERATE PROJECTS
========================================================= */

const projectsContainer =
    document.getElementById("projects-container");

const themeToggle =
    document.querySelector(".theme-toggle");

const themeIcon =
    document.querySelector(".theme-toggle__icon");

const themeLabel =
    document.querySelector(".theme-toggle__label");


function applyTheme(theme) {

    const isLight = theme === "light";

    document.body.dataset.theme = theme;

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-pressed",
            String(isLight)
        );

        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    }

    if (themeIcon) {
        themeIcon.textContent = isLight ? "☀" : "☾";
    }

    if (themeLabel) {
        themeLabel.textContent = isLight ? "Light" : "Dark";
    }

    try {
        localStorage.setItem(
            "portfolio-theme",
            theme
        );
    } catch (error) {
        console.warn(
            "Theme preference could not be saved.",
            error
        );
    }

}


function initializeTheme() {

    try {
        const savedTheme = localStorage.getItem(
            "portfolio-theme"
        );

        const preferredTheme =
            savedTheme || "dark";

        applyTheme(preferredTheme);

    } catch (error) {
        applyTheme("dark");
    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.body.dataset.theme === "light"
                    ? "light"
                    : "dark";

            const nextTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            applyTheme(nextTheme);

        }
    );

}


initializeTheme();


function createProjectCard(project) {

    const card = document.createElement("article");

    card.className = "project-card";

    card.innerHTML = `

        <div class="project-art"></div>

        <span class="project-number">
            ${project.number}
        </span>

        <div class="project-content">

            <span class="project-type">
                ${project.type}
            </span>

            <h3 class="project-title">
                ${project.title}
            </h3>

            <p class="project-description">
                ${project.description}
            </p>

            <div class="project-footer">

                <div class="project-tech">

                    ${project.technologies
                        .map(
                            technology =>
                                `<span>${technology}</span>`
                        )
                        .join("")
                    }

                </div>

                <a
                    href="${project.github}"
                    class="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                    <span>↗</span>
                </a>

            </div>

        </div>

    `;

    return card;
}


/* =========================================================
   DISPLAY PROJECTS
========================================================= */

if (projectsContainer) {

    projects.forEach(project => {

        const projectCard =
            createProjectCard(project);

        projectsContainer.appendChild(projectCard);

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section, .statement, .project-card, .skill-row"
);


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   NAVIGATION — ACTIVE SECTION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentSection =
                        entry.target.getAttribute("id");


                    navigationLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href") ===
                            `#${currentSection}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                }

            });

        },

        {
            threshold: 0.45
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId &&
                targetId.startsWith("#")
            ) {

                event.preventDefault();


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }

        }
    );

});


/* =========================================================
   PROJECT HOVER EFFECT
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        function(event) {

            const rectangle =
                this.getBoundingClientRect();


            const x =
                event.clientX -
                rectangle.left;


            const y =
                event.clientY -
                rectangle.top;


            const centerX =
                rectangle.width / 2;


            const centerY =
                rectangle.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -1.5;


            const rotateY =
                ((x - centerX) / centerX) * 1.5;


            this.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function() {

            this.style.transform =
                "";

        }
    );

});


/* =========================================================
   PARALLAX HERO ART
========================================================= */

const heroArtwork =
    document.querySelector(".hero-background");


window.addEventListener(
    "mousemove",
    function(event) {

        if (!heroArtwork) {
            return;
        }


        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 20;


        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 20;


        heroArtwork.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


/* =========================================================
   DYNAMIC FOOTER YEAR
========================================================= */

const footerYear =
    document.querySelector(
        ".footer-bottom span:first-child"
    );


if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} Tshepo Tleane`;

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "Tshepo Tleane — Systems Developer / Digital Creative"
);

console.log(
    "Code is a creative medium."
);