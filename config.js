import webapi from './webapi'

var _options = {
	webapi,
	webapiMap: {
		'login':'/v1/user/login'
	},
	logo: 'logo.png',
	websiteName: '系统',
	copyright: 'copyright © 2018 zlj',
	goAfterSignIn: {
		appName: 'zlj-portal',
		appParams: {}
	},
	goSignUp:{
		appName: 'zlj-sign-up',
		appParams: {}
	},
	goForgot:{
		appName: 'zlj-forgot-password',
		appParams: {}
	}
}


function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config