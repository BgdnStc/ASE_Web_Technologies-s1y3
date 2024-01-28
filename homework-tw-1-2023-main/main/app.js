const compress = (a, b = true) => {
	if (typeof (a) == 'string' && typeof (b) == 'boolean') {
		let result = "";
		if (b == true) {
			cnt = 1;
			for (i = 0; i < a.length; i++) {
				if (a[i] == a[i + 1]) {
					cnt++;
				} else {
					console.log(''.concat(a[i], cnt.toString()));
					result = result.concat(a[i].toString(), cnt.toString());
					cnt = 1;
				}
			}
			return result;
		} else {
			x = 0;
			while (a[x]) {
				for (i = 0; i < parseInt(a[x + 1]); i++) {
					result = result.concat(a[x]);
				}
				x += 2;
			}
			return result;
		}
	} else {
		throw new Error('InvalidType');
	}
}

module.exports = compress