import React from 'react'
import ReactDOM from 'react-dom'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import md5 from 'md5'
/*
localStorage使用：login.user,login.password,login.remember,login.passwordLength
*/
class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections

        var form = {}

        if(localStorage['login.password']){
            form.password = Array(parseInt(localStorage['login.passwordLength']) + 1).join('*')
        }
        if(localStorage['login.user']){
            form.user = localStorage['login.user']
        }
        if(localStorage['login.remember']){
            form.remember = localStorage['login.remember']
        }
      
        injections.reduce('init', form)
    }

    getLogo = () => this.config.logo

    getConfig = () => this.config

    login = async () => {
        const form = this.metaAction.gf('data.form').toJS()

        const ok = await this.check([{
            path: 'data.form.user', value: form.user
        }, {
            path: 'data.form.password', value: form.password
        }])

        if (!ok) return

        var pwd = form.password

        if(localStorage['login.password']){
            if( pwd ==  Array(parseInt(localStorage['login.passwordLength']) + 1).join('*')){
                pwd = localStorage['login.password']
            }
            else{
                pwd = md5('mk-' + pwd)
            }
        }
        else{
            pwd = md5('mk-' + pwd)
        }

        const response = await this.webapi.login({
            account: form.user,
            password: pwd,
            passwordStrength: '1'
        })

        this.metaAction.context.set('currentUser', response)

       
        if(form.remember){
            localStorage['login.user'] = form.user
            localStorage['login.password'] = pwd
            localStorage['login.passwordLength'] = form.password.length
            localStorage['login.remember'] = true
        }
        else{
            localStorage['login.user'] = ''
            localStorage['login.password'] = ''
            localStorage['login.passwordLength'] = ''
            localStorage['login.remember'] = ''
        }

        if (this.component.props.onRedirect && this.config.goAfterSignIn) {
            this.component.props.onRedirect(this.config.goAfterSignIn)
        }
    }

    goRegister = () => {
        if (this.component.props.onRedirect && this.config.goSignUp) {
            this.component.props.onRedirect(this.config.goSignUp)
        }
    }

    goForgot = () => {
        if (this.component.props.onRedirect && this.config.goForgot) {
            this.component.props.onRedirect(this.config.goForgot)
        }
    }

    fieldChange = async (fieldPath, value) => {
        await this.check([{ path: fieldPath, value }])
    }

    check = async (fieldPathAndValues) => {
        if (!fieldPathAndValues)
            return

        var checkResults = []

        for (var o of fieldPathAndValues) {
            let r = { ...o }
            if (o.path == 'data.form.user') {
                Object.assign(r, await this.checkUser(o.value))
            }
            else if (o.path == 'data.form.password') {
                Object.assign(r, await this.checkPassword(o.value))
            }
            checkResults.push(r)
        }

        var json = {}
        var hasError = true
        checkResults.forEach(o => {
            json[o.path] = o.value
            json[o.errorPath] = o.message
            if (o.message)
                hasError = false
        })

        this.metaAction.sfs(json)

        return hasError
    }


    checkUser = async (user) => {
        var message

        if (!user)
            message = '请录入手机号'
        else if (!/^1[3|4|5|8][0-9]\d{8}$/.test(user))
            message = '请录入有效的手机号'

        return { errorPath: 'data.other.error.user', message: '' }
    }

    checkPassword = async (password) => {
        var message

        if (!password)
            message = '请录入密码'

        return { errorPath: 'data.other.error.password', message }
    }

    keyup = (e) => {
        if (e.type === 'keyup' && (e.key === 'Enter' || e.keyCode == 13) && e.target.tagName != 'BUTTON') {
            this.login()
        }
    }

    componentDidMount = () => {
        const win = window
        if (win.addEventListener) {
            win.addEventListener('keyup', this.keyup, false)
        } else if (win.attachEvent) {
            win.attachEvent('onkeyup', this.keyup)
        } else {
            win.onKeyUp = this.keyup
        }
    }

    componentWillUnmount = () => {
        const win = window
        if (win.removeEventListener) {
            win.removeEventListener('keyup', this.keyup, false)
        } else if (win.detachEvent) {
            win.detachEvent('onkeyup', this.keyup)
        } else {
            win.onKeyUp = undefined
        }
    }

}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}