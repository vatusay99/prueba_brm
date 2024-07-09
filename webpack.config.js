import path from 'path';

export default {
	mode: 'develoment',
	entry: {
		products: './src/js/products.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve('public/js')
	}
}