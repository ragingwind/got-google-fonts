'use strict';

const qs = require('querystring');
const got = require('got');
const endpoint = 'http://fonts.googleapis.com/css?';

function fontGot(family, opts) {
	return new Promise((resolve, reject) => {
		if (typeof family !== 'string') {
			return reject(new TypeError(`Expected font family to be a string`));
		}

		opts = Object.assign({
			family: family
		}, opts);

		if (opts.variant) {
			opts.family = `${opts.family}:${opts.variant}`;
			delete opts.variant;
		}

		got(endpoint, {
			query: qs.stringify(opts)
		}).then(res => {
			console.log(res.statusCode);
			if (res.statusCode !== 200) {
				reject();
			}

			resolve(1);
		}).catch(err => {
			throw err;
		});
	});
}

module.exports = fontGot;
