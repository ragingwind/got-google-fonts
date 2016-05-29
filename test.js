import fs from 'fs';
import test from 'ava';
import tmpdir from 'os-random-tmpdir';
import fontGot from './';

var tmp = tmpdir('got-google-fonts');

test(t => {
	return fontGot(tmp, 'Droid Sans', {
		variant: 'regular'
	})
	.then(res => {
		t.true(res.length > 0);
		t.true(fs.existsSync(res[0]));
	}, () => {
		t.fail('Failed');
	});
});
