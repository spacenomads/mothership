import { getCookie, removeCookie, setCookie } from './cookie-utils.js';

function save_cookie() {
	const user_stuff = prompt('Qué quieres guardar en la cookie');

	setCookie('cookita', user_stuff);
}

function read_cookie() {
	const cookie = getCookie('cookita');
	if (cookie) {
		alert('Cookita → ' + cookie.content);
	} else {
		alert('Estas no son las cookies que buscas');
	}
}

function delete_cookie() {
	removeCookie('cookita');
}


function init_cookita() {
	save_cookie_btn && save_cookie_btn.addEventListener('click', save_cookie);
	read_cookie_btn && read_cookie_btn.addEventListener('click', read_cookie);
	delete_cookie_btn && delete_cookie_btn.addEventListener('click', delete_cookie);
}


const app = document.querySelector('.js__🍪');
const save_cookie_btn = app.querySelector('.js__🍪-save-cookie');
const read_cookie_btn = app.querySelector('.js__🍪-read-cookie');
const delete_cookie_btn = app.querySelector('.js__🍪-delete-cookie');

export {
	init_cookita,
};
