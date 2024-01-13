import { getCookie, setCookie } from './cookie-utils.js';
import { COOKIES } from './login.js';

function remove_themes() {
	THEME_LIST.forEach(theme => app.classList.remove(`🍪__theme--${theme}`));
}


function set_new_theme(theme) {
	remove_themes();
	if (THEME_LIST.includes(theme)) {
		app.classList.add(`🍪__theme--${theme}`);
	}
	setCookie(COOKIES.THEMES, theme);
}


function set_theme(event) {
	const radio = event.currentTarget;
	set_new_theme(radio.dataset.theme);

}


function set_coookie_theme() {
	const cookie_theme = getCookie(COOKIES.THEMES);

	if (cookie_theme) {
		const theme = cookie_theme.content;
		if (THEME_LIST.includes(theme)) {
			app.classList.add(`🍪__theme--${theme}`);
		}

		const selected_theme_radio = app.querySelector(`.js__form-theme-radio[data-theme="${theme}"]`);

		selected_theme_radio && (selected_theme_radio.checked = true);
	}
}


function init_themes() {
	set_coookie_theme();
	const theme_options = app.querySelectorAll('.js__form-theme-radio');
	theme_options && theme_options.forEach(option => option.addEventListener('click', set_theme));
}




const app = document.querySelector('.js__🍪');
const THEME_LIST = [
	'dark',
	'unicorn',
	'poop'
];


export {
	init_themes,
	remove_themes
};
