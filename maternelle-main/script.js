document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DO HEADER NO SCROLL
       ========================================================================== */
    const header = document.getElementById('header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Executa ao carregar a página caso já esteja rolada

    /* ==========================================================================
       2. MENU MOBILE (HAMBÚRGUER)
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Impede o scroll do body quando o menu mobile está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu mobile se clicar fora do menu
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    /* ==========================================================================
       3. EFEITO SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Remove o elemento do observer após revelar para manter a animação estática
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Dispara quando 15% do elemento está visível
        rootMargin: '0px 0px -50px 0px' // Margem inferior para disparar um pouco antes do elemento chegar
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       4. SCROLLSPY (LINK ATIVO NO SCROLL)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    const scrollSpy = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Ajuste para compensar o header
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*=${sectionId}]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    /* ==========================================================================
       5. ENVIO DE FORMULÁRIO DE CONTATO (SIMULAÇÃO)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSuccessMsg = document.getElementById('form-success-msg');
    const submitBtn = document.getElementById('btn-submit-contact');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Estado de carregamento
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simula uma requisição AJAX/API (1.5 segundos)
            setTimeout(() => {
                // Sucesso
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Exibir mensagem de sucesso
                formSuccessMsg.className = 'form-success-show';

                // Esconder a mensagem de sucesso depois de 5 segundos
                setTimeout(() => {
                    formSuccessMsg.className = 'form-success-hidden';
                }, 5000);

            }, 1500);
        });
    }

    /* ==========================================================================
       6. CHAT DE ATENDIMENTO DO WHATSAPP INTERATIVO
       ========================================================================== */
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappChat = document.getElementById('whatsapp-chat');
    const chatClose = document.getElementById('chat-close');
    const chatBody = document.getElementById('chat-body');
    const chatFormInput = document.getElementById('chat-form-input');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatStatus = document.getElementById('chat-status');
    const typingIndicator = document.getElementById('chat-typing-indicator');

    let chatState = 0; // 0: Não iniciado, 1: Esperando Nome, 2: Esperando E-mail, 3: Finalizado
    let userData = {
        nome: '',
        email: ''
    };

    // Abre/fecha o chat ao clicar no botão flutuante
    whatsappFloat.addEventListener('click', () => {
        whatsappChat.classList.toggle('active');
        if (whatsappChat.classList.contains('active') && chatState === 0) {
            iniciarConversaWhatsApp();
        }
    });

    // Fecha o chat
    chatClose.addEventListener('click', () => {
        whatsappChat.classList.remove('active');
    });

    // Função para rolar o chat para o final
    const scrollChatToBottom = () => {
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    // Helper para formatar a hora atual
    const getFormattedTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    // Exibe o status de digitando com atraso e depois exibe a mensagem do bot
    const botDigitarEMandarMensagem = (mensagem, callbackAfter = null) => {
        chatStatus.textContent = 'Digitando...';
        
        // Move o typingIndicator para o final do chat-body e exibe
        chatBody.appendChild(typingIndicator);
        typingIndicator.style.display = 'block';
        scrollChatToBottom();

        // Simula tempo de digitação (1.5 segundos)
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            chatStatus.textContent = 'Online';

            // Cria o balão de mensagem do bot
            const msgElement = document.createElement('div');
            msgElement.className = 'chat-msg msg-bot';
            msgElement.innerHTML = `
                ${mensagem}
                <span class="chat-msg-time">${getFormattedTime()}</span>
            `;
            
            chatBody.appendChild(msgElement);
            scrollChatToBottom();

            if (callbackAfter) callbackAfter();
        }, 1500);
    };

    // Inicia a árvore de conversa do bot
    const iniciarConversaWhatsApp = () => {
        chatState = 1;
        
        setTimeout(() => {
            botDigitarEMandarMensagem(
                'Olá! Seja muito bem-vinda à Maternelle. 💖 Fico muito feliz com seu contato.', 
                () => {
                    setTimeout(() => {
                        botDigitarEMandarMensagem(
                            'Para iniciar o seu atendimento, por favor me informe o seu **nome completo**:',
                            () => {
                                // Habilita o input para o nome
                                chatInput.disabled = false;
                                chatSend.disabled = false;
                                chatInput.placeholder = 'Digite seu nome...';
                                chatInput.focus();
                            }
                        );
                    }, 800);
                }
            );
        }, 500);
    };

    // Envio de mensagem pelo usuário no chat
    chatFormInput.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = chatInput.value.trim();
        if (!texto) return;

        // Adiciona a mensagem do usuário na tela
        const userMsgElement = document.createElement('div');
        userMsgElement.className = 'chat-msg msg-user';
        userMsgElement.innerHTML = `
            ${texto}
            <span class="chat-msg-time">${getFormattedTime()}</span>
        `;
        chatBody.appendChild(userMsgElement);
        scrollChatToBottom();

        // Limpa o input
        chatInput.value = '';

        // Desabilita temporariamente enquanto o bot responde
        chatInput.disabled = true;
        chatSend.disabled = true;

        // Máquina de estados do fluxo
        if (chatState === 1) {
            userData.nome = texto;
            chatState = 2;

            setTimeout(() => {
                botDigitarEMandarMensagem(
                    `Perfeito, ${userData.nome}! Agora, por favor, digite o seu **e-mail**:`,
                    () => {
                        chatInput.disabled = false;
                        chatSend.disabled = false;
                        chatInput.placeholder = 'Digite seu e-mail...';
                        chatInput.focus();
                    }
                );
            }, 800);

        } else if (chatState === 2) {
            // Validar E-mail básico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(texto)) {
                setTimeout(() => {
                    botDigitarEMandarMensagem(
                        'Ops! O e-mail informado parece inválido. Por favor, digite novamente (Ex: nome@dominio.com):',
                        () => {
                            chatInput.disabled = false;
                            chatSend.disabled = false;
                            chatInput.placeholder = 'Digite seu e-mail...';
                            chatInput.focus();
                        }
                    );
                }, 800);
            } else {
                userData.email = texto;
                chatState = 3;

                setTimeout(() => {
                    botDigitarEMandarMensagem(
                        'Obrigada! Dados confirmados. 🌟',
                        () => {
                            setTimeout(() => {
                                botDigitarEMandarMensagem(
                                    'Estou te transferindo agora mesmo para o nosso WhatsApp. Só um instante...',
                                    () => {
                                        // Abre o WhatsApp
                                        const phone = '5511999999999'; // Substitua pelo número oficial
                                        const msg = `Olá! Gostaria de agendar uma avaliação na Maternelle. \n\nMeus dados:\n- Nome: ${userData.nome}\n- E-mail: ${userData.email}`;
                                        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                                        
                                        setTimeout(() => {
                                            window.open(waUrl, '_blank');
                                            
                                            // Mensagem final do sistema
                                            const systemMsg = document.createElement('div');
                                            systemMsg.className = 'chat-system-date';
                                            systemMsg.textContent = 'Redirecionado para o WhatsApp';
                                            chatBody.appendChild(systemMsg);
                                            scrollChatToBottom();
                                            
                                            chatInput.placeholder = 'Atendimento iniciado!';
                                        }, 1000);
                                    }
                                );
                            }, 800);
                        }
                    );
                }, 800);
            }
        }
    });

});
