function createStars() {
            const starsContainer = document.getElementById('stars');
            for(let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        createStars();

        // Crear corazones flotantes
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            const hearts = ['💕', '💖', '💗', '💓', '💝'];
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
            document.getElementById('hearts').appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 8000);
        }

        setInterval(createHeart, 400);

        for(let i = 0; i < 15; i++) {
            setTimeout(createHeart, i * 150);
        }

        // Mover botón "No" por toda la pantalla cuando intenten tocarlo
        function moveNoButton() {
            const btn = document.getElementById('noButton');
            const yesButton = document.querySelector('.button:not(.button-no)');
            
            if (!btn || !yesButton) return;
            
            // Cambiar a posición fixed para moverlo por toda la pantalla
            btn.classList.add('moving');
            
            const btnWidth = btn.offsetWidth || 200;
            const btnHeight = btn.offsetHeight || 60;
            
            // Obtener dimensiones de la ventana
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Obtener posición del botón "Sí" en coordenadas de pantalla
            const yesRect = yesButton.getBoundingClientRect();
            const yesCenterX = yesRect.left + yesRect.width / 2;
            const yesCenterY = yesRect.top + yesRect.height / 2;
            
            let randomX, randomY;
            let attempts = 0;
            const minDistance = 250; // Distancia mínima del botón "Sí"
            
            // Intentar encontrar una posición que no tape el botón "Sí"
            do {
                // Calcular posiciones aleatorias en toda la pantalla con margen
                const margin = 30;
                randomX = Math.random() * (windowWidth - btnWidth - margin * 2) + margin;
                randomY = Math.random() * (windowHeight - btnHeight - margin * 2) + margin;
                
                // Calcular centro del botón en su nueva posición
                const btnCenterX = randomX + btnWidth / 2;
                const btnCenterY = randomY + btnHeight / 2;
                
                // Calcular distancia entre centros
                const distance = Math.sqrt(
                    Math.pow(btnCenterX - yesCenterX, 2) + 
                    Math.pow(btnCenterY - yesCenterY, 2)
                );
                
                attempts++;
                
                // Si está suficientemente lejos del botón "Sí" o ya intentamos muchas veces
                if (distance > minDistance || attempts > 30) {
                    break;
                }
            } while (true);
            
            btn.style.left = randomX + 'px';
            btn.style.top = randomY + 'px';
        }
        
        // Ya no hay movimiento automático, solo cuando lo intenten tocar

        function showResponse() {
            const responseDiv = document.getElementById('response');
            const buttonsContainer = document.getElementById('buttonsContainer');
            
            buttonsContainer.style.display = 'none';
            responseDiv.classList.remove('hidden');
            
            // Explosión de corazones
            for(let i = 0; i < 30; i++) {
                setTimeout(createHeart, i * 80);
            }
        }

        function showCalendar() {
            document.getElementById('calendarModal').classList.add('show');
        }

        function closeCalendar() {
            document.getElementById('calendarModal').classList.remove('show');
        }

        function closeCalendarOutside(event) {
            if(event.target.id === 'calendarModal') {
                closeCalendar();
            }
        }

        // Prevenir scroll cuando el modal está abierto
        document.getElementById('calendarModal').addEventListener('wheel', function(e) {
            e.preventDefault();
        });
