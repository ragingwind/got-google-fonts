import test from 'ava';
// import tmpdir from 'random-os-tmpdir';
import fontGot from './';

// var tmp = tmpdir();

test(t => {
	return fontGot('Droid Sans', {
		query: {
			variant: 'regular'
		}
	}).then(res => {
		t.true(res.statusCode === 200);
	}).catch(err => {
		t.fail(err.getMessage());
	});
});
