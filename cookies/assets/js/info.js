function get_ip_data() {
	return fetch('https://api.ipify.org?format=json', { cache: 'force-cache' })
		.then(res => res.json());
}

function get_info_line(label, value) {
	if (!label || !value) return '';
	return `
		<tr>
			<th class="🍪__info-table-header">${label}</th>
			<td class="🍪__info-table-value">${value}</td>
		</tr>
	`
}

function get_browser_version(userAgeng, type) {
	const ver_regex = {
		firefox: /Firefox\/([0-9\.]*)/,
		chromium: /Chrome\/([0-9\.]*)/,
		safari: /Version\/([0-9\.]*)/
	};

	if (!Object.keys(ver_regex).includes(type)) return '';

	return userAgeng.match(ver_regex[type])[1];
}

function get_browser_type(userAgent) {
	const isChromium = userAgent.indexOf('Chrome') !== -1;
	const isFirefox = userAgent.indexOf('Firefox') !== -1;
	const isSafari = userAgent.indexOf('Safari') !== -1;

	let browser = 'Otro...';
	let version = '';

	if (isChromium) {
		browser = 'Chromium';
	} else if (isSafari) {
		browser = 'Safari';
	} else if (isFirefox) {
		browser = 'Firefox';
	}

	return {
		type: browser,
		version: get_browser_version(userAgent, browser.toLowerCase())
	};
}


async function get_your_info() {
	const ip_info = await get_ip_data();
	const ip_data = ip_info ? ip_info.ip : '';

	const browser = get_browser_type(navigator.userAgent);

	return `
		<table class="🍪__info-table">
			${get_info_line('IP', ip_data)}
			${get_info_line('Idioma principal', navigator.language)}
			${get_info_line('Idiomas displonibles', navigator.languages.join(', '))}
			${get_info_line('Cookies', navigator.cookieEnabled)}
			${get_info_line('Equipo', navigator.oscpu)}
			${get_info_line('Navegador', browser.type)}
			${get_info_line('Versión', browser.version)}
			${get_info_line('Ventana navegador', window.innerWidth + 'x'+ window.innerHeight + ' px')}
			${get_info_line('Pantalla', window.screen.width + 'x' + window.screen.width + ' px')}
			${get_info_line('Pixel ratio', window.devicePixelRatio)}


		</table>
	`;

}


async function init_info() {
	const container = document.querySelector('.js__🍪-your-info');

	if (container) {
		container.innerHTML = await get_your_info();
	}
}




export {
	init_info,
}

