'use strict';

const qs = require('querystring');
const got = require('got');
const css = require('css');
const endpoint = 'http://fonts.googleapis.com/css?';
const Download = require('download');

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
			if (res.statusCode !== 200) {
				reject(res.error);
			}

			const fonts = parseFontSrc(res.body);
			const down = new Download({mode: 755});

			if (fonts.length > 0) {
				fonts.forEach(font => down.get(font.src.url));
				down.dest(dest).run((err, files) => {
					if (err) {
						reject(err);
					}

					resolve(files);
				});
			} else {
				resolve([]);
			}
		}).catch(err => {
			reject(err);
		});
	});
}

module.exports = fontGot;
