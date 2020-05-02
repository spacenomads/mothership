const body = document.querySelector('body');





function startAnimation(page, time) {
	if ( page.classList.contains('ready') ) {
		setTimeout(function() {
			page.classList.add('has-asteroid');
			setTimeout(function() {
				page.classList.remove('ready');
				page.classList.add('completed');
				console.log('YA');
			}, time*1.5);
		}, time);
	}
}





function initPage(page) {
	page.classList.add('ready');
	startAnimation(page, 1000);
}





initPage(body);
