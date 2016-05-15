# got-google-fonts [![Build Status](https://travis-ci.org/ragingwind/got-google-fonts.svg?branch=master)](https://travis-ci.org/ragingwind/got-google-fonts)

> Got Google web fonts by its names


## Install

```
$ npm install --save got-google-fonts
```


## Usage

```js
const googleFontDownload = require('got-google-fonts');

googleFontDownload(process.cwd(), 'Roboto', {
	subset: 'greek'
	variant: 'italic'
}).then(files => {
	console.log('Will returns those of files downloaded at dest', files);
});

```

## API

### googleFontDownload(dest, family, [options])

#### dest

The path to download

#### family

The name of the family

#### options

You can use all of options about [Google web fonts APIs](https://developers.google.com/fonts/docs/developer_api#a_quick_example) except `kind` which is not alterable, default is `webfonts#webfont`. It will be passed into querystring.

##### subset

The script supported by the family.

##### variant

The style available for the family

##### version

The font family version. ex) v3

##### lastModified

The date (format "yyyy-MM-dd") the font family was modified for the last time.

##### files

JSON of the font family files for each one of the available variants.

## License

MIT © [Jimmy Moon](http://ragingwind.me)
