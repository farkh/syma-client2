export function setCookie(cname, cvalue, options) {
	const { expires } = options;
	const d = new Date();
	d.setTime(d.getTime() + (expires * 1000));
	const cexpires = `expires=${d.toUTCString()}`;
	document.cookie = `${cname}=${cvalue};${cexpires};path=/;SameSite=Strict`;
}

export function getCookie(cname) {
	const name = `${cname}=`;
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

export function deleteCookie(name) {
	setCookie(name, '', {
		expires: -1,
	});
}
