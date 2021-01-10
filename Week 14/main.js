import { createElement, Component } from "./framework"

const IMAGE_WIDTH = 500

const SLIDE_CON = 100

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    this.attributes[name] = value
  }
  render() {
    this.root = document.createElement("div")
    this.root.classList.add("carousel")
    // 生成轮播基本dom结构
    for (const src of this.attributes.src) {
      let child = document.createElement("div")
      child.style.backgroundImage = `url('${src}')`
      this.root.appendChild(child)
    }

    // const children = this.root.children
    // let currentIndex = 0
    // setInterval(() => {
    // 	let nextIndex = (currentIndex + 1) % children.length
    // 	let current = children[currentIndex]
    // 	let next = children[nextIndex]
    // 	next.style.transition = 'none'
    // 	next.style.transform = `translateX(${SLIDE_CON - SLIDE_CON * nextIndex}%)`
    // 	setTimeout(() => {
    // 		next.style.transition = ''
    // 		current.style.transform = `translateX(-${SLIDE_CON * (currentIndex + 1)}%)` // 当前图片左移一个位置
    // 		next.style.transform = `translateX(-${SLIDE_CON * nextIndex}%)`  // 下一张图片移动到当前位置
    // 		currentIndex = nextIndex
    // 	}, 16)
    // }, 2000)

    const children = this.root.children
    let position = 0

    const down = (event) => {
      const startX = event.clientX

      const move = (event) => {
        const x = event.clientX - startX

        let current = position - (x - (x % IMAGE_WIDTH)) / IMAGE_WIDTH
        for (const offset of [-1, 0, 1]) {
          let pos = offset + current
          pos = (pos + children.length) % children.length
          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${-pos * IMAGE_WIDTH + offset * IMAGE_WIDTH + (x % IMAGE_WIDTH)}px)`
        }
      }

      const up = (event) => {
        const x = event.clientX - startX
        position = (position - Math.round(x / IMAGE_WIDTH) + children.length) % children.length
        for (const offset of [0, -Math.sign(Math.round(x / IMAGE_WIDTH) - x + IMAGE_WIDTH / 2 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length
          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${-pos * IMAGE_WIDTH + offset * IMAGE_WIDTH}px)`

        }
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
    this.root.addEventListener('mousedown', down)

    return this.root
  }
  mountTo(parent) {
    parent.appendChild(this.render())
  }
}

let src = [
  '/static/1.jpeg',
  '/static/2.jpeg',
  '/static/3.jpeg',
  '/static/4.jpeg',
  '/static/5.jpeg'
]

let a = <Carousel src={src} />

a.mountTo(document.body)