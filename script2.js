        // Load saved posts
        let posts = JSON.parse(localStorage.getItem("posts")) || [];
        
        const form = document.getElementById("postForm");
        const postsTable = document.getElementById("postsTable");
        const totalPosts = document.getElementById("total-posts");
        const totalLikes = document.getElementById("total-likes");
        
        // Display Posts
        function displayPosts() {
            
            postsTable.innerHTML = "";
            
            totalPosts.innerText = posts.length;
            
            // Calculate total likes
            const likesCount = posts.reduce((total, post) => {
                return total + (post.likes || 0);
            }, 0);
            
            totalLikes.innerText = likesCount;
            
            posts.forEach((post, index) => {
                
                postsTable.innerHTML += `
            <tr>
                <td>${post.title}</td>
                <td>${post.date}</td>
                <td>Published</td>
                <td>
                    <button
                        class="delete-btn"
                        onclick="deletePost(${index})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `;
                
            });
        }
        
        // Publish Article
        // Image Preview
        let imageData = "";
        
        document.getElementById("image").addEventListener("change", function(event) {
            
            const file = event.target.files[0];
            
            if (!file) return;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                
                imageData = e.target.result;
                
                const preview = document.getElementById("preview");
                
                preview.src = imageData;
                
                preview.style.display = "block";
                
            };
            
            reader.readAsDataURL(file);
            
        });
        form.addEventListener("submit", function(e) {
            
            e.preventDefault();
            
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const excerpt = document.getElementById("excerpt").value;
            const content = document.getElementById("content").value;
            
            if (title === "" || content === "") {
                
                alert("Please fill all required fields");
                return;
            }
            
            const newPost = {
                id: Date.now(),
                title,
                author,
                excerpt,
                content,
                image: imageData,
                likes: 0,
                comments: [],
                date: new Date().toLocaleDateString()
            };
            
            posts.unshift(newPost);
            
            localStorage.setItem(
                "posts",
                JSON.stringify(posts)
            );
            
            alert("Article Published Successfully!");
            
            form.reset();
            
            displayPosts();
            
        });
        
        // Delete Post
        function deletePost(index) {
            
            posts.splice(index, 1);
            
            localStorage.setItem(
                "posts",
                JSON.stringify(posts)
            );
            
            displayPosts();
        }
        
        // Start App
        displayPosts();
    
    
    <script type="module">
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
        
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey} "AIzaSyAk6wO4IwyJwlGzDEXohOx0yn55YKnucZM",
            authDomain: "sunray-news-8bb77.firebaseapp.com",
            projectId: "sunray-news-8bb77",
            storageBucket: "sunray-news-8bb77.firebasestorage.app",
            messagingSenderId: "58393307676",
            appId: "1:58393307676:web:346464f061d802b7810dd9",
            measurementId: "G-RD0LME6VPS"
        ;
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        </script>