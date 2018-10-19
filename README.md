zlj-sign-in application, a simple example of login.

## Usage

1. Add dependency
```bash
$ maka add zlj-sign-in
```

2. Modify the code

*Embedded use*
```javascript
const view = {
    component: 'div',
    children: [{
        component: 'AppLoader',
        appName: 'zlj-sign-in'
    }]
}
```
*Navigate use*
```javascript
import {navigate} from 'maka'
...
btnClick = () => {
    navigate.redirect('/zlj-sign-in')
}
...
```

## Download and run

1. Download
2. Decompress
3. Enter decompress directory
4. Run
```bash
$ yarn start
```

## License

MIT

