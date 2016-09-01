var Editor = function() {
  var _str = ''

  var add = function(str) {
    _str += str
  }

  var toString = function() {
    return _str
  }

  return {
    add: add,
    toString: toString
  }
};

const editor = new Editor
editor.add('Hello')
console.log(editor.toString())

editor.add(' there')
console.log(editor.toString())

editor.add(' stranger')
console.log(editor.toString())
