function match(selector, element) {
  if (!selector || !element) {
    return false
  }
  let parts = selector.split(' ').reverse()
  return parts.every(part => {
    let matchTest = (element) => {
      if (!element) {
        return false
      }
      let tagName = part.match(/^[^#\.\[\:]+/)
      let classList = part.match(/\.[^#\.\[\:]+/g)
      let id = part.match(/^#[^#\.\[\:]+/)
      
      if (id) {
        if (!element.id || element.id !== id[0].replace('#', '')) {
          return false
        }
      }
      if (tagName) {
        if (element.tagName.toLowerCase() !== tagName[0]) {
          return false
        }
      }
      if (classList) {
        if (classList.some(className => {
          return !element.classList.contains(className.replace('.', ''))
        })) {
          return false
        }
      }
      return true
    }

    if (matchTest(element)) {
      element = element.parentNode
      return true
    } else {
      element = element.parentNode
      return matchTest(element)
    }
  })
}

// match("div #id.class", document.getElementById("id"))

// tagName#id.class
// #id[attr=val]
// .class[attr=val]
// .class.class
// #id.class:not()

// div 
// id
// tag
// [attr=val]
// :not()
