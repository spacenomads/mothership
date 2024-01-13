import { setCookie, removeCookie, getCookie } from './cookie-utils.js';
import { remove_themes } from "./themes.js";


function check_login() {
	const login_cookie = getCookie(COOKIES.LOGIN);

	return !!(login_cookie && login_cookie.content === 'true');

}

function back_to_home() {
	if (location.href.includes('account')) location.href = '../';
}

function retrieve_login() {
	const is_user_logged = check_login();


	if (is_user_logged) {
		loadUserData();
	} else {
		back_to_home();
	}
}


function logout_me() {
	login_form.classList.remove('🍪__login-form--hidden');
	logged_bar.classList.remove('🍪__logged--visible');
	user_salute.innerHTML = '';
	removeCookie(COOKIES.LOGIN);
	removeCookie(COOKIES.THEMES);
	back_to_home();
	remove_themes();
}

function loadUserData() {
	user_salute && (user_salute.innerHTML =', Chuck');
	login_form.classList.add('🍪__login-form--hidden');
	logged_bar.classList.add('🍪__logged--visible');
}


function check_user(form) {
	const handle = form.querySelector('.js__form-user').value;
	const pass = form.querySelector('.js__form-pass').value;

	console.log({handle: handle.toLowerCase(), pass});

	return handle.toLowerCase() === USER.HANDLE && pass === USER.PASS;
}


function init_login() {
	login_trigger.addEventListener('click', () => {
		if (form.classList.contains('form--visible')) {
			form.classList.remove('form--visible');
		} else {
			form.classList.add('form--visible');
		}
	});

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		console.group('Fake login');
		const exist_user = check_user(form);

		if (exist_user) {
			setCookie(COOKIES.LOGIN, true);
			loadUserData();
		}

		form.classList.remove('form--visible');
		console.groupEnd();
	});

	logout_btn.addEventListener('click', logout_me);

	retrieve_login();

}

const USER = {
	HANDLE: 'chuck',
	PASS: '123456'
};
const COOKIES = {
	LOGIN: 'chuckLogin',
	THEMES: 'chuckTheme'
};
const app = document.querySelector('.js__🍪');
const login_trigger = app.querySelector('.js__🍪-login-form-trigger');
const form = app.querySelector('.js__form');
const login_form = app.querySelector('.js__🍪-login-form');
const logged_bar = app.querySelector('.js__🍪-logged');
const logout_btn = app.querySelector('.js__🍪-logout-btn');
const user_salute = app.querySelector('.js__🍪-user');



export {
	init_login,
	retrieve_login,
	COOKIES
}
