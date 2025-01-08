function getCurrentYear() {
	return new Date().getFullYear();
}

function getStaticsVersion() {
	const version = new Date()
		.toISOString()
		.replace(/[^A-SU-Y0-9]/g, '');
	return version;
}

function getCurrentFormattedDate() {
	const [day, month, year] = new Date()
		.toLocaleDateString('es-ES')
		.split('/');
	return `${year}/${month}/${day}`;
}

module.exports = {
	lang: 'es',
	mode: process.env.MODE,
	year: getCurrentYear(),
	date: getCurrentFormattedDate(),
	version: getStaticsVersion(),
	fedi: {
		chuck: 'https://laterracita.online/@oneeyedman',
		boniato: 'https://laterracita.online/@bonapartethecat'
	},
	site_name: 'Space Nomads',
	site_subtitle: 'Pandemic edition',
};
