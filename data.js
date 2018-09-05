export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'zlj-sign-in',
		autoComplete: 'off',
		children: [{
			name: 'header',
			className: 'zlj-sign-in-header',
			component: 'Layout',
			children: [{
				name: 'logo',
				component: '::img',
				className: 'zlj-sign-in-header-logo',
				src: '{{$getConfig().logo}}'
			}, '{{$getConfig().websiteName}}']
		}, {
			name: 'content',
			className: 'zlj-sign-in-content',
			component: 'Layout',
			children: [{
				name: 'contentLeft',
				className: 'zlj-sign-in-content-left',
				component: 'Layout',
			}, {
				name: 'form',
				component: 'Form',
				className: 'zlj-sign-in-content-form',
				children: [{
					name: 'item1',
					component: 'Form.Item',
					className: 'zlj-sign-in-content-form-title',
					style:{fontSize:30},
					children: '登录'
				}, {
					name: 'item2',
					component: 'Form.Item',
					validateStatus: "{{data.other.error.user?'error':'success'}}",
					help: '{{data.other.error.user}}',
					className: 'zlj-sign-in-content-form-user',
					children: [{
						name: 'user',
						component: 'Input',
						placeholder: '请录入手机号',
						onChange: "{{(e)=>$fieldChange('data.form.user', e.target.value)}}",
						value: '{{data.form.user}}',
						prefix: {
							name: 'userIcon',
							component: 'Icon',
							type: 'user',
						}
					}]
				}, {
					name: 'item3',
					component: 'Form.Item',
					validateStatus: "{{data.other.error.password?'error':'success'}}",
					help: '{{data.other.error.password}}',
					className: 'zlj-sign-in-content-form-password',
					children: [{
						name: 'password',
						component: 'Input',
						placeholder: '请录入密码',
						autoComplete: 'new-password',
						type: 'password',
						onChange: `{{(e)=>$fieldChange('data.form.password', e.target.value)}}`,
						value: '{{data.form.password}}',
						prefix: {
							name: 'passwordIcon',
							component: 'Icon',
							type: 'lock',
						}
					}]
				}, {
					name: 'item4',
					component: 'Form.Item',
					className: 'zlj-sign-in-content-form-forget',
					children: [{
						name: 'remember',
						component: 'Checkbox',
						children: '记住我',
						checked: '{{data.form.remember}}',
						onChange: `{{(e)=>$sf('data.form.remember',e.target.checked)}}`
					}, {
						name: 'forgot',
						component: '::a',
						style: { float: 'right' },
						onClick: '{{$goForgot}}',
						children: '忘记密码'
					}]
				}, {
					name: 'item5',
					component: 'Form.Item',
					className: 'zlj-sign-in-content-form-login',
					children: [{
						name: 'loginBtn',
						component: 'Button',
						type: 'primary',
						children: '登录',
						onClick: '{{$login}}'
					}]
				}, {
					name: 'item6',
					component: 'Form.Item',
					className: 'zlj-sign-in-content-form-register',
					children: [{
						name: 'register',
						component: '::a',
						style: { float: 'right' },
						onClick: '{{$goRegister}}',
						children: '没有账户，立即注册'
					}]
				}]
			}, {
				name: 'contentRight',
				className: 'zlj-sign-in-content-right',
				component: 'Layout',
			},]
		}, {
			name: 'footer',
			className: 'zlj-sign-in-footer',
			component: 'Layout',
			children: '{{$getConfig().copyright}}'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: { user: '', password: '' },
			other: {
				error: {}
			}

		}
	}
}