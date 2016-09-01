var TextArea = function() {
  var _text = ''

  var add = function(text) {
    _text += text
  }

  var truncate = function(fragment) {
    _text = _text.slice(0, -(fragment.length))
  }

  var replace = function(target, replacement) {
    _text = _text.replace(RegExp(target, 'g'), replacement)
  }

  var toString = function() {
    return _text
  }

  return {
    add: add,
    replace: replace,
    toString: toString,
    truncate: truncate
  }
}

module.exports = TextArea
