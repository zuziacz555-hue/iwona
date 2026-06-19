document.addEventListener('DOMContentLoaded', () => {
    
    // --- STICKY HEADER ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // --- MOBILE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    // --- SCROLLSPY (ACTIVE LINK HIGHLIGHT) & REVEAL ON SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-link');
    
    // Active link highlighter options
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Highlights the section currently taking up the center/top viewport
        threshold: 0
    };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal, .timeline-item');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters view
        threshold: 0.1
    };
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it is revealed, no need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    // --- FORM VALIDATION & SIMULATED SUBMISSION ---
    const contactForm = document.getElementById('contactForm');
    const formName = document.getElementById('formName');
    const formEmail = document.getElementById('formEmail');
    const formSubject = document.getElementById('formSubject');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('btn-submit-form');
    const formStatus = document.getElementById('formStatus');
    // Error message divs
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    // Helper: validate email address
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    // Helper: reset error styles
    const resetErrors = () => {
        const controls = [formName, formEmail, formSubject, formMessage];
        const errors = [nameError, emailError, subjectError, messageError];
        
        controls.forEach(c => c.classList.remove('error'));
        errors.forEach(e => e.style.display = 'none');
    };
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetErrors();
        let hasError = false;
        // Name validation
        if (formName.value.trim() === '') {
            formName.classList.add('error');
            nameError.style.display = 'block';
            hasError = true;
        }
        // Email validation
        if (formEmail.value.trim() === '' || !isValidEmail(formEmail.value.trim())) {
            formEmail.classList.add('error');
            emailError.style.display = 'block';
            hasError = true;
        }
        // Subject validation
        if (formSubject.value.trim() === '') {
            formSubject.classList.add('error');
            subjectError.style.display = 'block';
            hasError = true;
        }
        // Message validation
        if (formMessage.value.trim() === '') {
            formMessage.classList.add('error');
            messageError.style.display = 'block';
            hasError = true;
        }
        if (hasError) return;
        // Simulate sending state
        submitBtn.disabled = true;
        const btnSpan = submitBtn.querySelector('span');
        const originalText = btnSpan.innerText;
        btnSpan.innerText = 'Wysyłanie...';
        setTimeout(() => {
            // Success state
            submitBtn.disabled = false;
            btnSpan.innerText = originalText;
            
            // Show status
            formStatus.className = 'form-status success';
            formStatus.style.display = 'flex';
            
            // Clear fields
            contactForm.reset();
            // Hide success status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
    });
    // Real-time error removal on input
    const inputs = [formName, formEmail, formSubject, formMessage];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
                const errId = input.id.replace('form', '').toLowerCase() + 'Error';
                const errDiv = document.getElementById(errId);
                if (errDiv) errDiv.style.display = 'none';
            }
        });
    });
    // --- NEWS MODAL SYSTEM ---
    const newsModal = document.getElementById('newsModal');
    const modalClose = document.getElementById('modalClose');
    const modalBadge = document.getElementById('modalBadge');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalImg = document.getElementById('modalImg');
    const modalText = document.getElementById('modalText');
    const newsCards = document.querySelectorAll('.news-card');
    // News content database
    const newsData = [
        {
            badge: "Rada Turystyki",
            date: "2026",
            title: "Turystyka i opłata miejscowa – debata w Radzie Turystyki",
            img: "images/turystyka.jpg",
            text: `<p>🌍 Turystyka to nie tylko wypoczynek. To miejsca pracy, rozwój lokalnych społeczności i realne wpływy do budżetów samorządów.</p>
            <p>Dlatego z zainteresowaniem uczestniczyłam – jako członkini <strong>Rady Turystyki przy Ministrze Sportu i Turystyki</strong> – w debacie poświęconej przyszłości opłaty miejscowej i nowym rozwiązaniom wspierającym rozwój polskiej turystyki.</p>
            <p>To ważna rozmowa, bo turystyka odpowiada już za około <strong>5% polskiego PKB</strong>, daje zatrudnienie blisko <strong>637 tysiącom osób</strong> i generuje około <strong>180 mld zł</strong> wpływów do budżetu państwa. Jednocześnie samorządy, które przyjmują miliony turystów, potrzebują skutecznych narzędzi do finansowania infrastruktury, promocji i utrzymania atrakcyjności swoich regionów.</p>
            <p>Przedstawiona przez wiceministra Ireneusza Rasia koncepcja zakłada, że większość środków z nowej opłaty turystyczno-rekompensacyjnej trafiałaby bezpośrednio do gmin, a część wspierałaby promocję Polski jako atrakcyjnego kierunku turystycznego. Ważne jest również to, że samorządy zachowałyby elastyczność w kształtowaniu lokalnych rozwiązań i mogłyby oferować turystom konkretne korzyści w zamian za wnoszoną opłatę.</p>
            <p>Jako samorządowiec z wieloletnim doświadczeniem wiem, jak ważne jest znalezienie równowagi między potrzebami mieszkańców, przedsiębiorców i odwiedzających. Dlatego cieszę się, że głos samorządów jest obecny w tej dyskusji od samego początku.</p>
            <p><strong>Polska turystyka ma ogromny potencjał. Naszym zadaniem jest stworzyć warunki, aby rozwijała się jeszcze szybciej – z korzyścią dla lokalnych społeczności i całej gospodarki. 🇵🇱✈️🏞️</strong></p>`
        },
        {
            badge: "Sejm",
            date: "8 czerwca 2026",
            title: "Ustawa o wzmocnieniu finansów samorządów",
            img: "images/iwona_hero.jpg",
            text: `<p>W Sejmie RP odbyło się kluczowe głosowanie nad nowelizacją ustawy o dochodach jednostek samorządu terytorialnego. Jako posłanka z wieloletnim doświadczeniem w pracy samorządowej, z dumą poparłam te rozwiązania i aktywnie uczestniczyłam w pracach nad poprawkami.</p>
            <p>Zgłoszone przeze mnie poprawki miały na celu zabezpieczenie dodatkowych środków finansowych dla powiatów ziemskich (w tym powiatu świeckiego i bydgoskiego). Nowe przepisy zwiększają udział samorządów we wpływach z podatku CIT i PIT, co oznacza miliony złotych więcej w lokalnych budżetach na remonty dróg, wsparcie szpitali powiatowych oraz modernizację szkół.</p>
            <p>To historyczna reforma finansów publicznych, która kończy erę uznaniowego rozdawnictwa funduszy i oddaje pieniądze tym, którzy najlepiej wiedzą, jak je zagospodarować – lokalnym społecznościom.</p>`
        },
        {
            badge: "Inicjatywa",
            date: "29 maja 2026",
            title: "Kongres Kobiet Przedsiębiorczych w Bydgoszczy",
            img: "images/iwona_about.jpg",
            text: `<p>Miałam niezwykłą przyjemność objąć patronatem honorowym oraz wziąć czynny udział w kolejnej edycji Kongresu Kobiet Przedsiębiorczych w Bydgoszczy. Było to inspirujące spotkanie ponad 150 liderek biznesu, działaczek społecznych i kobiet chcących rozwijać swoje skrzydła w regionie kujawsko-pomorskim.</p>
            <p>Podczas mojego wystąpienia i paneli dyskusyjnych rozmawiałyśmy o barierach prawnych i podatkowych, z jakimi mierzą się kobiety prowadzące małe i średnie firmy. Przedstawiłam również sejmowe inicjatywy mające na celu ułatwienie powrotu na rynek pracy po urlopach macierzyńskich, w tym programy dofinansowania opieki nad dziećmi.</p>
            <p>Wspieranie przedsiębiorczości kobiet to jeden z moich kluczowych priorytetów. Kiedy kobiety rozwijają swoje biznesy, rozwija się cała nasza gospodarka i lokalna społeczność.</p>`
        }
    ];
    // Open Modal
    const openModal = (index) => {
        const data = newsData[index];
        if (!data) return;
        modalBadge.innerText = data.badge;
        modalDate.innerText = data.date;
        modalTitle.innerText = data.title;
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalText.innerHTML = data.text;
        newsModal.classList.add('active');
        document.body.classList.add('modal-open');
    };
    // Close Modal
    const closeModal = () => {
        newsModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    };
    // Attach click listeners to "Więcej informacji" links
    newsCards.forEach((card, index) => {
        const link = card.querySelector('.news-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(index);
            });
        }
    });
    // Close on button click
    modalClose.addEventListener('click', closeModal);
    // Close on click outside modal-card
    newsModal.addEventListener('click', (e) => {
        if (e.target === newsModal) {
            closeModal();
        }
    });
    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && newsModal.classList.contains('active')) {
            closeModal();
        }
    });
});
