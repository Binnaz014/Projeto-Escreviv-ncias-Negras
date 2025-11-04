document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.autor-card');
    
    const cardsPerView = 3;
    const totalCards = cards.length;
    
    let currentIndex = 0; 
    
    const maxIndex = totalCards - cardsPerView;

    function updateCarousel() {

        const offset = -currentIndex * (100 / cardsPerView); 
        sliderContainer.style.transform = `translateX(${offset}%)`;
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    updateCarousel();

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // ##########################################
    // ### 1. LÓGICA DO CARROSSEL DE AUTORES ####
    // ##########################################
    // (MANTENHA ESTA SEÇÃO INTACTA - Sua lógica de carrossel)
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.autor-card');
    
    // Configuração do carrossel
    const cardsPerView = 3;
    const totalCards = cards.length;
    let currentIndex = 0; 
    const maxIndex = totalCards - cardsPerView;

    function updateCarousel() {
        const offset = -currentIndex * (100 / cardsPerView); 
        sliderContainer.style.transform = `translateX(${offset}%)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    updateCarousel();

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    });

    // ##########################################
    // ### 2. LÓGICA DA REDE SOCIAL (POSTS) #####
    // ##########################################

    const postForm = document.getElementById('postForm');
    const timelineContainer = document.getElementById('timeline-container');
    const STORAGE_KEY = 'userEscrevivencias';

    // 2. Função para Carregar Postagens do LocalStorage
    function loadPosts() {
        const postsJson = localStorage.getItem(STORAGE_KEY);
        return postsJson ? JSON.parse(postsJson) : [];
    }

    // 3. Função para Salvar Postagens no LocalStorage
    function savePosts(posts) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }

    // ⭐ NOVO: Função para deletar um post por ID
    window.deletePost = function(postIdToDelete) {
        // Confirmação para evitar exclusão acidental
        if (!confirm("Tem certeza que deseja apagar esta escrevivência?")) {
            return;
        }

        let posts = loadPosts();
        
        // Filtra o array, mantendo apenas os posts cujo ID é diferente do ID a ser deletado
        const updatedPosts = posts.filter(post => post.id !== postIdToDelete);

        savePosts(updatedPosts);
        renderPosts(); // Redesenha a lista na tela
    }


    // 4. Função para Criar o Elemento HTML do Post (AGORA COM BOTÃO DE APAGAR)
    function createPostElement(post) {
        const postCard = document.createElement('div');
        postCard.classList.add('user-post-card'); 
        
        // Usamos o 'id' único do post (que é um timestamp numérico)
        postCard.dataset.postId = post.id; 

        const content = `
            <p class="post-text">“${post.content}”</p>
            <p class="post-author">— ${post.author}</p>
            <div class="post-footer">
                <p class="post-date">Publicado em: ${post.date}</p>
                
                <button class="delete-btn" onclick="deletePost(${post.id})">Apagar</button>
            </div>
        `;
        postCard.innerHTML = content;
        return postCard;
    }

    // 5. Função para Renderizar Todos os Posts
    function renderPosts() {
        timelineContainer.innerHTML = '';
        const posts = loadPosts();
        
        // Renderiza os posts do mais novo para o mais antigo (reverse)
        posts.reverse().forEach(post => {
            const postElement = createPostElement(post);
            timelineContainer.appendChild(postElement);
        });
    }

    // 6. Lógica de Submissão do Formulário
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const authorInput = document.getElementById('postAuthor');
        const contentInput = document.getElementById('postContent');

        const newPost = {
            author: authorInput.value.trim() || 'Anônimo(a)',
            content: contentInput.value.trim(),
            date: new Date().toLocaleDateString('pt-BR'),
            // É CRUCIAL que o ID seja único para a deleção funcionar!
            id: Date.now() 
        };

        const posts = loadPosts();
        posts.push(newPost);
        savePosts(posts);

        renderPosts();

        authorInput.value = '';
        contentInput.value = '';
    });

    // 7. Inicialização
    renderPosts();
});