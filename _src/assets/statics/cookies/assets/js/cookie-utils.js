function getYesterdayExpiryDate() {
	let date = new Date();
	date.setDate(date.getDate() - 1);
	return date.toUTCString();
}


function getExpiryDate(months) {
	const today = new Date();
	const expiryDate = new Date(today.getFullYear(), today.getMonth() + months, today.getDate());
	return expiryDate.toUTCString();
}


function removeHTMLTags(str) {
	const NO_TAGS_REGEX = /<\/?[a-z][\s\S]*?(?:\s+[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'))*\s*\/?>/gi;
	return str.replace(NO_TAGS_REGEX, '');
}


function getCookie(cookieName) {
	const userCookies = document.cookie
		.split(';')
		.map(cookie => cookie.trim())
		.map(cookie => {
			const [name, content] = cookie.split('=');
			return {
				name,
				content: removeHTMLTags(decodeURIComponent(content)),
			};
		});

	const myCookieIndex = userCookies.findIndex(
		cookie => cookie.name === cookieName
	);
	const myCookie = myCookieIndex >= 0 ? userCookies[myCookieIndex] : null;
	return myCookie ? myCookie : null;
}


function setCookie(cookieName, cookieContent) {
	const cookie = `${cookieName}=${cookieContent}`;
	const cookieExpiry = getExpiryDate(EXPIRY_MONTHS);
	const httpOnly = HTTP_ONLY ? 'HttpOnly;' : '';
	let hostname = window.location.hostname;
	hostname = hostname.substring(hostname.lastIndexOf(".", hostname.lastIndexOf(".") - 1));
	document.cookie = `${cookie}; ${httpOnly} SameSite=lax; expires=${cookieExpiry}; path=/; domain=${hostname}; secure;`;
}


function removeCookie(cookieName) {
	const cookie = `${cookieName}=false`;
	const cookieExpiry = getYesterdayExpiryDate();
	let hostname = window.location.hostname;
	hostname = hostname.substring(hostname.lastIndexOf(".", hostname.lastIndexOf(".") - 1));
	document.cookie = `${cookie}; SameSite=lax; expires=${cookieExpiry}; path=/; domain=${hostname}; secure;`;
}


function checkCookies() {
	let result = false;
	setCookie('testing', 'Hello');
	if (getCookie('testing')) {
		result = true;
		removeCookie('testing');
	}
	return result;
}


const HTTP_ONLY = false;
const EXPIRY_MONTHS = 1;
const are_cookies_enabled = checkCookies();


export {
	getExpiryDate,
	getCookie,
	setCookie,
	removeCookie,
};
