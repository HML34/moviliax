
        // ============================================
        // ARTICLES DATABASE
        // ============================================
        const articlesData = [
            {
                id: 1,
                title: 'El Boom de los Vehículos Eléctricos en México',
                excerpt: 'Análisis completo del crecimiento exponencial del mercado de EVs en territorio mexicano. Cifras, proyecciones y oportunidades de inversión.',
                category: 'evs',
                author: 'María González',
                date: '2025-10-20',
                readTime: '8 min',
                icon: '⚡',
                views: 12500
            },
            {
                id: 2,
                title: 'Medellín: La Ciudad Más Innovadora de América Latina',
                excerpt: 'Cómo la capital antioqueña se convirtió en referente mundial de movilidad urbana y ciudades inteligentes. El caso de éxito que inspira a la región.',
                category: 'smart-cities',
                author: 'Carlos Ruiz',
                date: '2025-10-18',
                readTime: '10 min',
                icon: '🏙️',
                views: 9800
            },
            {
                id: 3,
                title: 'Waymo Anuncia su Llegada a América Latina',
                excerpt: 'El gigante de la conducción autónoma revela sus planes para Latinoamérica. Entrevista exclusiva con el CEO sobre estrategia regional.',
                category: 'autonomia',
                author: 'Ana Torres',
                date: '2025-10-15',
                readTime: '6 min',
                icon: '🤖',
                views: 8200
            },
            {
                id: 4,
                title: 'Infraestructura de Carga: Estado Actual en LATAM',
                excerpt: 'Mapa completo de las estaciones de carga para vehículos eléctricos. Análisis país por país y proyecciones de crecimiento.',
                category: 'evs',
                author: 'Diego Martínez',
                date: '2025-10-12',
                readTime: '12 min',
                icon: '🔋',
                views: 7100
            },
            {
                id: 5,
                title: 'Carbono Neutral: La Meta de las Ciudades 2030',
                excerpt: 'Cómo las principales urbes latinoamericanas planean reducir emisiones y alcanzar la neutralidad de carbono en movilidad.',
                category: 'sostenibilidad',
                author: 'Laura Fernández',
                date: '2025-10-10',
                readTime: '9 min',
                icon: '🌱',
                views: 6800
            },
            {
                id: 6,
                title: 'BYD vs Tesla: Batalla por el Mercado Mexicano',
                excerpt: 'Comparativa exhaustiva entre los dos gigantes del sector EV. Precios, tecnología y estrategias comerciales en México.',
                category: 'evs',
                author: 'Roberto Sánchez',
                date: '2025-10-08',
                readTime: '11 min',
                icon: '⚡',
                views: 11200
            },
            {
                id: 7,
                title: 'Movilidad Compartida: El Auge de Didi en Brasil',
                excerpt: 'Cómo la aplicación china conquistó el mercado brasileño y está transformando el transporte urbano en las principales ciudades.',
                category: 'innovacion',
                author: 'Patricia Lima',
                date: '2025-10-05',
                readTime: '7 min',
                icon: '🚗',
                views: 5900
            },
            {
                id: 8,
                title: 'Vehículos Voladores: ¿Realidad o Ciencia Ficción?',
                excerpt: 'Los primeros prototipos de taxis voladores están siendo probados en São Paulo. Análisis técnico y regulatorio de esta revolución.',
                category: 'innovacion',
                author: 'José Silva',
                date: '2025-10-02',
                readTime: '8 min',
                icon: '🚁',
                views: 10500
            },
            {
                id: 9,
                title: 'Santiago de Chile: Líder en Buses Eléctricos',
                excerpt: 'La capital chilena tiene la segunda flota de buses eléctricos más grande del mundo. Historia de éxito y lecciones aprendidas.',
                category: 'sostenibilidad',
                author: 'Carmen Rodríguez',
                date: '2025-09-28',
                readTime: '9 min',
                icon: '🚌',
                views: 7600
            },
            {
                id: 10,
                title: 'IA y Movilidad: El Futuro de las Smart Cities',
                excerpt: 'Cómo la inteligencia artificial está optimizando el tráfico urbano y creando ciudades más eficientes en toda América Latina.',
                category: 'smart-cities',
                author: 'Miguel Ángel',
                date: '2025-09-25',
                readTime: '10 min',
                icon: '🧠',
                views: 8900
            },
            {
                id: 11,
                title: 'Scooters Eléctricos: Regulación y Desafíos',
                excerpt: 'El fenómeno de los scooters compartidos en ciudades latinoamericanas. Análisis de regulaciones y casos de éxito.',
                category: 'innovacion',
                author: 'Sofía Mendoza',
                date: '2025-09-20',
                readTime: '6 min',
                icon: '🛴',
                views: 4200
            },
            {
                id: 12,
                title: 'Metrobus vs Metro: ¿Cuál es más Sostenible?',
                excerpt: 'Comparativa de impacto ambiental y eficiencia entre los dos sistemas de transporte masivo más populares en LATAM.',
                category: 'sostenibilidad',
                author: 'Eduardo Vargas',
                date: '2025-09-18',
                readTime: '11 min',
                icon: '🚇',
                views: 6300
            }
        ];

        // ============================================
        // STATE MANAGEMENT
        // ============================================
        let currentFilter = 'all';
        let currentSearchTerm = '';
        let currentPage = 1;
        const articlesPerPage = 6;

        // ============================================
        // RENDER FUNCTIONS
        // ============================================
        function renderArticles() {
            const articlesGrid = document.getElementById('articlesGrid');
            const emptyState = document.getElementById('emptyState');
            
            // Filter articles
            let filteredArticles = articlesData.filter(article => {
                const matchesCategory = currentFilter === 'all' || article.category === currentFilter;
                const matchesSearch = currentSearchTerm === '' || 
                    article.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    article.excerpt.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    article.author.toLowerCase().includes(currentSearchTerm.toLowerCase());
                
                return matchesCategory && matchesSearch;
            });

            // Pagination
            const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
            const startIndex = (currentPage - 1) * articlesPerPage;
            const endIndex = startIndex + articlesPerPage;
            const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

            // Show/hide empty state
            if (filteredArticles.length === 0) {
                articlesGrid.style.display = 'none';
                emptyState.style.display = 'block';
                document.getElementById('pagination').innerHTML = '';
                return;
            } else {
                articlesGrid.style.display = 'grid';
                emptyState.style.display = 'none';
            }

            // Render articles
            articlesGrid.innerHTML = paginatedArticles.map(article => `
                <article class="article-card fade-in" data-id="${article.id}">
                    <div class="article-image">
                        ${article.icon}
                    </div>
                    <div class="article-content">
                        <div class="article-meta">
                            <span class="article-category ${article.category}">${getCategoryName(article.category)}</span>
                            <span class="article-date">📅 ${formatDate(article.date)}</span>
                        </div>
                        <h3 class="article-title">${article.title}</h3>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <div class="article-footer">
                            <div class="article-author">
                                <div class="author-avatar">${getInitials(article.author)}</div>
                                <span class="author-name">${article.author}</span>
                            </div>
                            <span class="read-time">⏱️ ${article.readTime}</span>
                        </div>
                    </div>
                </article>
            `).join('');

            // Render pagination
            renderPagination(totalPages);

            // Trigger fade-in animations
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.add('visible');
                });
            }, 100);

            // Add click handlers
            document.querySelectorAll('.article-card').forEach(card => {
                card.addEventListener('click', () => {
                    const articleId = card.dataset.id;
                    // Navigate to article detail (implement later)
                    console.log('Navigate to article:', articleId);
                    alert(`Artículo #${articleId} - Esta funcionalidad se implementará próximamente`);
                });
            });
        }

        function renderPagination(totalPages) {
            const pagination = document.getElementById('pagination');
            
            if (totalPages <= 1) {
                pagination.innerHTML = '';
                return;
            }

            let paginationHTML = '';

            // Previous button
            if (currentPage > 1) {
                paginationHTML += `<button class="pagination-btn" data-page="${currentPage - 1}">←</button>`;
            }

            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - 1 && i <= currentPage + 1)
                ) {
                    paginationHTML += `
                        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                            ${i}
                        </button>
                    `;
                } else if (i === currentPage - 2 || i === currentPage + 2) {
                    paginationHTML += `<span style="color: var(--gris-metalico); padding: 0 10px;">...</span>`;
                }
            }

            // Next button
            if (currentPage < totalPages) {
                paginationHTML += `<button class="pagination-btn" data-page="${currentPage + 1}">→</button>`;
            }

            pagination.innerHTML = paginationHTML;

            // Add click handlers
            pagination.querySelectorAll('.pagination-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentPage = parseInt(btn.dataset.page);
                    renderArticles();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
        }

        // ============================================
        // UTILITY FUNCTIONS
        // ============================================
        function getCategoryName(category) {
            const names = {
                'evs': 'Vehículos Eléctricos',
                'smart-cities': 'Ciudades Inteligentes',
                'autonomia': 'Autonomía',
                'sostenibilidad': 'Sostenibilidad',
                'innovacion': 'Innovación'
            };
            return names[category] || category;
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('es-ES', options);
        }

        function getInitials(name) {
            return name.split(' ').map(n => n[0]).join('');
        }

        // ============================================
        // FILTER FUNCTIONALITY
        // ============================================
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                // Update filter and reset page
                currentFilter = chip.dataset.category;
                currentPage = 1;

                // Show loading and render
                showLoading();
                setTimeout(() => {
                    renderArticles();
                    hideLoading();
                }, 300);
            });
        });

        // ============================================
        // SEARCH FUNCTIONALITY
        // ============================================
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        function performSearch() {
            currentSearchTerm = searchInput.value.trim();
            currentPage = 1;
            
            showLoading();
            setTimeout(() => {
                renderArticles();
                hideLoading();
            }, 300);
        }

        searchBtn.addEventListener('click', performSearch);

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Debounced search
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (searchInput.value.length >= 3 || searchInput.value.length === 0) {
                    performSearch();
                }
            }, 500);
        });

        // ============================================
        // NEWSLETTER FORM
        // ============================================
        document.getElementById('sidebarNewsletterForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = e.target.querySelector('.newsletter-input-small');
            const submitBtn = e.target.querySelector('.newsletter-btn-small');
            const email = emailInput.value.trim();

            // Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            // Disable and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Procesando...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                alert('¡Suscripción exitosa! Revisa tu correo.');
                emailInput.value = '';
            } catch (error) {
                alert('Error al procesar la suscripción. Intenta de nuevo.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Suscribirme';
            }
        });

        // ============================================
        // SCROLL TO TOP
        // ============================================
        const scrollToTopBtn = document.getElementById('scrollToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ============================================
        // LOADING OVERLAY
        // ============================================
        function showLoading() {
            document.getElementById('loadingOverlay').classList.add('active');
        }

        function hideLoading() {
            document.getElementById('loadingOverlay').classList.remove('active');
        }

        // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            renderArticles();
            
            // Console easter egg
            console.log('%c📚 MOVILIAX CONTENIDO', 'font-size: 24px; color: #00E0FF; font-weight: bold;');
            console.log('%cExplora nuestra biblioteca de conocimiento', 'font-size: 14px; color: #7A7F8C;');
        });



