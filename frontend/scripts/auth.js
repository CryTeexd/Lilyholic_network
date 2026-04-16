import { registerUser, loginUser } from "./api.js";
import { loadPosts } from "./posts.js";

export function setupAuth() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    const loginView = document.getElementById("login-view");
    const registerView = document.getElementById("register-view");
    const appView = document.getElementById("app-view");

    const logoutLink = document.getElementById("logout-link");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const data = await loginUser({ username, password });

        if (data.token) {
            localStorage.setItem("token", data.token);

            loginView.classList.add("hidden");
            registerView.classList.add("hidden");
            appView.classList.remove("hidden");

            await loadPosts();
        } else {
            alert(data.message || "Login failed");
        }
    });

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const firstName = document.getElementById("register-first-name").value;
        const lastName = document.getElementById("register-last-name").value;
        const age = document.getElementById("register-age").value;
        const username = document.getElementById("register-username").value;
        const password = document.getElementById("register-password").value;

        const data = await registerUser({
            firstName,
            lastName,
            age,
            username,
            password
        });

        alert(data.message || "Register finished");

        registerView.classList.add("hidden");
        loginView.classList.remove("hidden");
    });

    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();

        localStorage.removeItem("token");

        appView.classList.add("hidden");
        registerView.classList.add("hidden");
        loginView.classList.remove("hidden");
    });
}

export async function checkLoginState() {
    const token = localStorage.getItem("token");

    const loginView = document.getElementById("login-view");
    const registerView = document.getElementById("register-view");
    const appView = document.getElementById("app-view");

    if (token) {
        loginView.classList.add("hidden");
        registerView.classList.add("hidden");
        appView.classList.remove("hidden");

        await loadPosts();
    }
}