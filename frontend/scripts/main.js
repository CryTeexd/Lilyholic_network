import { setupAuth, checkLoginState } from "./auth.js";
import { loadPosts, setupNewPostForm } from "./posts.js";

const goToRegister = document.getElementById("go-to-register");
const goToLogin = document.getElementById("go-to-login");
const loginView = document.getElementById("login-view");
const registerView = document.getElementById("register-view");
const newPostLink = document.getElementById("new-post-link");
const newPostView = document.getElementById("new-post-view");

goToRegister.addEventListener("click", function (event) {
    event.preventDefault();
    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");
});

goToLogin.addEventListener("click", function (event) {
    event.preventDefault();
    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");
});

document.getElementById("reload-posts").addEventListener("click", async function (event) {
    event.preventDefault();
    await loadPosts();
});

newPostLink.addEventListener("click", function (event) {
    event.preventDefault();
    newPostView.classList.toggle("hidden");
});

setupAuth();
setupNewPostForm();
checkLoginState();
