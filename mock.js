import { fetch } from 'maka'

const mockData = fetch.mockData

function initMockData() {
    if (!mockData.users) {
        mockData.users = [{
            id: 1,
            account: 13334445556,
            password: 'c4ca4238a0b923820dcc509a6f75849b',
            name: 'zlj'
        }]
    }
}

fetch.mock('/v1/user/login', (option) => {
    initMockData()

    const user = mockData.users.find(o => o.account == option.account && o.password == option.password)

    if (user) {
        return {
            result: true,
            //token模拟简单处理，正式不应该有密码等数据
            token: `${user.id},${user.account},${user.password},${user.name ? user.name : ''}`,
            value: option
        }
    }
    else {
        return { result: false, error: { message: '请输入正确的用户名密码（系统内置用户user:13334445556,pwd:1）' } }
    }
})
