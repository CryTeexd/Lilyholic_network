const AUTH_URL = "http://localhost:1980/api/auth";
const POSTS_URL = "http://localhost:1980/api/posts";

export async function registerUser(userData) {
    const response = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return await response.json();
}

export async function loginUser(userData) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return await response.json();
}

export async function fetchPosts() {
    const response = await fetch(POSTS_URL);
    return await response.json();
}

export async function fetchComments(postId) {
    const response = await fetch(`${POSTS_URL}/${postId}/comments`);
    return await response.json();
}

export async function fetchLikes(postId) {
    const response = await fetch(`${POSTS_URL}/${postId}/likes`);
    return await response.json();
}

export async function addComment(postId, content) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${POSTS_URL}/${postId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    });

    return await response.json();
}

export async function addLike(postId) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${POSTS_URL}/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return await response.json();
}