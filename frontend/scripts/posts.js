import { fetchPosts, fetchComments, fetchLikes, addComment, addLike, createPost } from "./api.js";

export async function loadPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";

    const posts = await fetchPosts();
    
    if (!Array.isArray(posts)) {
    console.log("Posts response is not array:", posts);
    return;
}

    for (const post of posts) {
        const comments = await fetchComments(post.id);
        const likesData = await fetchLikes(post.id);

        const article = createPostElement(post, comments, likesData.likeCount);
        postsContainer.appendChild(article);
    }
}

function createPostElement(post, comments, likeCount) {
    const article = document.createElement("article");
    article.classList.add("post");

    const dateText = formatDate(post.created_at);

    article.innerHTML = `
        <div class="post-small-id">#${post.id}</div>
        <div class="post-title">${post.title}</div>
        <div class="post-meta">
            HANDLE: ${post.first_name} ${post.last_name}
            &nbsp;&nbsp; DATE: ${dateText}
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <span>[ Likes: <span class="likes-count">${likeCount}</span> ]</span>
            <button class="like-btn">[ LIKE ]</button>
            <button class="reply-toggle-btn">[ REPLY ]</button>
        </div>
        <div class="comment-form hidden">
            <textarea placeholder="Write your reply..."></textarea>
            <button class="submit-comment-btn">Send reply</button>
        </div>
        <div class="comments-container"></div>
    `;

    const commentsContainer = article.querySelector(".comments-container");
    renderComments(commentsContainer, comments);

    const replyToggleBtn = article.querySelector(".reply-toggle-btn");
    const commentForm = article.querySelector(".comment-form");
    const textarea = article.querySelector("textarea");
    const submitCommentBtn = article.querySelector(".submit-comment-btn");
    const likeBtn = article.querySelector(".like-btn");
    const likesCountSpan = article.querySelector(".likes-count");

    replyToggleBtn.addEventListener("click", () => {
        commentForm.classList.toggle("hidden");
    });

    submitCommentBtn.addEventListener("click", async () => {
        const content = textarea.value.trim();

        if (!content) {
            return;
        }

        const result = await addComment(post.id, content);

        if (result.message && result.message.toLowerCase().includes("success")) {
            textarea.value = "";
            commentForm.classList.add("hidden");

            const updatedComments = await fetchComments(post.id);
            renderComments(commentsContainer, updatedComments);
        } else {
            alert(result.message || "Could not add comment");
        }
    });

    likeBtn.addEventListener("click", async () => {
        const result = await addLike(post.id);

        if (result.message && result.message.toLowerCase().includes("success")) {
            const updatedLikes = await fetchLikes(post.id);
            likesCountSpan.textContent = updatedLikes.likeCount;
        } else {
            alert(result.message || "Could not add like");
        }
    });

    return article;
}

function renderComments(container, comments) {
    container.innerHTML = "";

    if (!comments.length) {
        return;
    }

    for (const comment of comments) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        commentDiv.innerHTML = `
            <div class="comment-meta">
                ${comment.first_name} ${comment.last_name}
            </div>
            <div class="comment-content">${comment.content}</div>
        `;

        container.appendChild(commentDiv);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleString();
}

export function setupNewPostForm(){
    const newPostForm = document.getElementById("new-post-form");
    const newPostTitle = document.getElementById("new-post-title");

    newPostForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = newPostTitle.value;
        const content = document.getElementById("new-post-content").value;

        const result = await createPost(title, content);

        if (result.message && result.message.toLowerCase().includes("success")) {
            newPostForm.reset();
            newPostView.classList.add("hidden");
        
            await loadPosts();
        } else {
            alert(result.message || "Could not create post");
        }
    });
}