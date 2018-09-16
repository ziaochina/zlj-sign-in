import pkgJson from './package.json'
import data from './data'
import action from './action'
import config from './config'
import './mock'
import './img/logo.png'
import './style.less'

__webpack_public_path__ = window[`__pub_${pkgJson.name}__`];

export default {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
    config: config,
    meta: data.meta,
    state: data.state,
    action
}

