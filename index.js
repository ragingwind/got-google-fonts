'use strict';

const path = require('path');
const qs = require('querystring');
const css = require('css');
const endpoint = 'http://fonts.googleapis.com/css?';
const got = require('got');
const download = require('./download');

function parseFontSrc(content) {
	const style = css.parse(content);
	const fonts = [];

	style.stylesheet.rules.forEach(rule => {
		if (rule.type !== 'font-face' || !rule.declarations) {
			return;
		}

		let font = {};
		const re = /([\w]*)\(([\w\d':_.\/ -]*)\)/g;

		rule.declarations.forEach(decl => {
			let value;

			if (decl.property === 'src') {
				let source;
				value = {};

				while ((source = re.exec(decl.value))) {
					value[source[1]] = source[2].replace(/^'|'$/g, '');
				}
			} else {
				value = decl.value.replace(/^'|'$/g, '');
			}

			font[decl.property] = value;

			return font;
		});

		fonts.push(font);
	});

	return fonts;
}

function fontGot(dest, family, opts) {
	return new Promise((resolve, reject) => {
		dest = dest || process.cwd();

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
		})
		.then(res => {
			if (res.statusCode !== 200) {
				reject(res.error);
			}

			const fonts = parseFontSrc(res.body).map(f => {
				f.dest = path.join(dest, path.basename(f.src.url));
				return f;
			});

			Promise.all(fonts.map(f => {
				return download(f.src.url, f.dest);
			}))
			.then(resolve)
			.catch(reject);
		});
	});
}

module.exports = fontGot;
