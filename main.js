var Editor = require('./editor.js')

const editor = new Editor
editor.add('Hello')
console.log(editor.toString())

editor.add(' there')
console.log(editor.toString())

editor.add(' stranger')
console.log(editor.toString())

editor.undo()
console.log(editor.toString())

editor.add(' foo the foo-gical dragon')
console.log(editor.toString())
editor.replace('foo', 'bar')
console.log(editor.toString())

editor.undo()
console.log(editor.toString())

editor.redo()
console.log(editor.toString())

editor.undo()
console.log(editor.toString())

editor.redo()
editor.redo()
console.log(editor.toString())

editor.undo()
editor.undo()
editor.undo()
editor.undo()
editor.undo()
console.log(editor.toString())

editor.redo()
editor.redo()
editor.redo()
editor.redo()
console.log(editor.toString())
