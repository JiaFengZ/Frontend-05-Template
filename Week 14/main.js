import { createElement, Component } from './framework'
class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    this.attributes[name] = value
  }
  render() {
    this.root = document.createElement('div')
    for (let record of this.attributes.src) {
      let child = document.createElement('img')
      child.src = record
      this.root.appendChild(child)
    }
    return this.root
  }
  mountTo(parent) {
    parent.appendChild(this.render())
  }
}

// let a = <div id='a'>
//   <span>a</span>
//   <span>b</span>
//   <span>c</span>
// </div>

let d = [

]

let a = <Carousel src={d}/>

a.mountTo(document.body)