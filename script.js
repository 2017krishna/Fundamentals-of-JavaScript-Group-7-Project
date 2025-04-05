    const blogPosts = document.getElementById('blogPosts');
    const postTitleInput = document.getElementById('postTitle');
    const postContentInput = document.getElementById('postContent');
    const addPostButton = document.getElementById('addPostButton');

    let posts = JSON.parse(localStorage.getItem('blogPosts')) || []; // Load from local storage

    function renderPosts() {
        blogPosts.innerHTML = ''; // Clear existing posts
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button class="delete-post" data-index="${index}">Delete</button>
            `;
            blogPosts.appendChild(postDiv);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-post').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index);
                posts.splice(index, 1);
                localStorage.setItem('blogPosts', JSON.stringify(posts)); // Save to local storage
                renderPosts();
            });
        });

    }

    renderPosts(); // Initial render

    addPostButton.addEventListener('click', () => {
        const title = postTitleInput.value.trim();
        const content = postContentInput.value.trim();

        if (title && content) {
            posts.push({ title, content });
            localStorage.setItem('blogPosts', JSON.stringify(posts)); // Save to local storage
            postTitleInput.value = '';
            postContentInput.value = '';
            renderPosts();
        } else {
            alert('Please enter both title and content.');
        }
    });

