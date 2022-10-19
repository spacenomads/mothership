function getCurrentYear() {
	return new Date().getFullYear();
}

function getStaticsVersion() {
	const version = new Date()
		.toISOString()
		.replace(/[^A-SU-Y0-9]/g, '');
	return version;
}

module.exports = {
	lang: 'es',
	mode: process.env.MODE,
  year: getCurrentYear(),
	version: getStaticsVersion(),
	site_name: "Space Nomads",
  site_subtitle: "Pandemic edition",
};
