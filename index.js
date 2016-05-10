'use strict';

const qs = require('querystring');
const got = require('got');
const endpoint = 'http://fonts.googleapis.com/css?';

function fontGot(family, opts) {
	if (typeof family !== 'string') {
		return Promise.reject(new TypeError(`Expected font family to be a string`));
	}

	opts = opts || {};

	opts.query = Object.assign({
		family: family
	}, opts.query);

	console.log(opts);

	if (opts.query.variant) {
		opts.query.family = `${opts.query.family}:${opts.query.variant}`;
		delete opts.query.variant;
	}

	let url = `${endpoint}${qs.stringify(opts.query)}`;
	console.log(url);
	if (opts.stream) {
		return got.stream(url, opts);
	}

	return got(url, opts);
}

module.exports = fontGot;
