import { fetchRegister } from './api.js';


/* login a register pole */
document.getElementById('go-to-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('register-view').classList.remove('hidden');
});

document.getElementById('go-to-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-view').classList.add('hidden');
    document.getElementById('login-view').classList.remove('hidden');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    console.log('Login attempt:', { username, password });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('register-first-name').value;
    const lastName = document.getElementById('register-last-name').value;
    const age = document.getElementById('register-age').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    console.log('Registration attempt:', { firstName, lastName, age, username, password });
});

