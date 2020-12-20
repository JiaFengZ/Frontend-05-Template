
function match(selector, element) {
  if (!selector || !element) {
    return false
  }
  let parts = selectors.split(' ').reverse()
  return parts.every(part => {
    let tagName = part.match(/^[^#\.\[\:]+/)
    let classList = part.match(/\.[^#\.\[\:]+/g)
    let id = part.match(/^#[^#\.\[\:]+/)
    
    if (id) {
      let attr = element.attributes.filter(attr => attr.name === 'id')[0]
      if (!attr || attr.value !== id) {
        return false
      }
    }
    if (tagName) {
      if (element.tagName !== tagName) {
        return false
      }
    }
    if (classList) {
      if (classList.some(className => {
        return !element.classList.contains(className)
      })) {
        return false
      }
    }
    return true
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