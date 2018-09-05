/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'
import config from './config'
const api = key => config.current.webapiMap[key]


export default {
    login: (option) => {
        return fetch.post(api('login'), option)
    }
}
