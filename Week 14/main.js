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

let d = [
  '/static/1.jpeg',
  '/static/2.jpeg',
  '/static/3.jpeg',
  '/static/4.jpeg',
  '/static/5.jpeg'
]

let a = <Carousel src={d}/>

a.mountTo(document.body)