export default {
	component: 'div',
	className: 'zlj-sign-in',
	autoComplete: 'off',
	children: [{
		className: 'zlj-sign-in-header',
		component: 'div',
		children: [{
			component: 'img',
			className: 'zlj-sign-in-header-logo',
			src: 'logo.png'
		}, '系统']
	}, {
		className: 'zlj-sign-in-content',
		component: 'div',
		children: [{
			component: 'antd.Form',
			className: 'zlj-sign-in-content-form',
			children: [{
				component: 'antd.Form.Item',
				className: 'zlj-sign-in-content-form-title',
				style: { fontSize: 30 },
				children: '登录'
			}, {
				component: 'antd.Form.Item',
				validateStatus: "{{data.other.error.user?'error':'success'}}",
				help: '{{data.other.error.user}}',
				className: 'zlj-sign-in-content-form-user',
				children: [{
					component: 'antd.Input',
					placeholder: '请录入手机号',
					onChange: "{{(e)=>$fieldChange('data.form.user', e.target.value)}}",
					value: '{{data.form.user}}',
					prefix: {
						component: 'antd.Icon',
						type: 'user',
					}
				}]
			}, {
				component: 'antd.Form.Item',
				validateStatus: "{{data.other.error.password?'error':'success'}}",
				help: '{{data.other.error.password}}',
				className: 'zlj-sign-in-content-form-password',
				children: [{
					component: 'antd.Input',
					placeholder: '请录入密码',
					autoComplete: 'new-password',
					type: 'password',
					onChange: `{{(e)=>$fieldChange('data.form.password', e.target.value)}}`,
					value: '{{data.form.password}}',
					prefix: {
						component: 'antd.Icon',
						type: 'lock',
					}
				}]
			}, {
				component: 'antd.Form.Item',
				className: 'zlj-sign-in-content-form-forget',
				children: [{
					component: 'antd.Checkbox',
					children: '记住我',
					checked: '{{data.form.remember}}',
					onChange: `{{(e)=>$base.setState({'data.form.remember':e.target.checked})}}`
				}, {
					component: 'a',
					style: { float: 'right' },
					onClick: `{{()=>$redirect('@zlj/forgot')}}`,
					children: '忘记密码'
				}]
			}, {
				component: 'antd.Form.Item',
				className: 'zlj-sign-in-content-form-login',
				children: [{
					component: 'antd.Button',
					type: 'primary',
					children: '登录',
					onClick: '{{$login}}'
				}]
			}, {
				component: 'antd.Form.Item',
				className: 'zlj-sign-in-content-form-register',
				children: [{
					component: 'a',
					style: { float: 'right' },
					onClick: `{{()=>$redirect('@zlj/sign-up')}}`,
					children: '没有账户，立即注册'
				}]
			}]
		}]
	}, {
		className: 'zlj-sign-in-footer',
		component: 'div',
		children: 'copyright © 2018 zlj'
	}],
}


