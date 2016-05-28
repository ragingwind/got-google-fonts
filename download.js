'use strict';

const path = require('path');
const fs = require('fs');
const pify = require('pify');
const mkdirp = require('mkdirp');
const getStream = require('get-stream');
const got = require('got');

module.exports = (uri, dest) => {
	return getStream.buffer(got.stream(uri))
		.then(data => {
			return pify(mkdirp)(path.dirname(dest))
				.then(pify(fs).writeFile(dest, data))
				.then(() => dest);
		});
};
