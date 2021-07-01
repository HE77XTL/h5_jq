import './index.less'
import './home.less'

function component() {
    const element = document.createElement('div');
    element.innerText = 'hello webpack';
    element.classList.add('hello');
    return element;
}

document.body.appendChild(component());
