# Editor SIM

## Overview

This was my pair-programming coding challenge during my in-person technical interview with Galvanize.

The task was to write a little "editor" that one can:
- add text to the text buffer
- replace text to the text buffer
- undo previous operations
- redo previously undone operations (i.e. undo undo's)

## Demonstrated Skills

- JavaScript
- Refactoring
- Object-oriented design and programming
    - Design patterns
        - [Command][Command Pattern]
        - [Null Object][Null Object Pattern]
    - Encapsulation
    - [Separation of Concerns][Separation of Concerns]
    - Maximising future code re-use

### Explanation

I refined the solution via:
- OO Design Patterns:
    - implemented undo/redo via the [Command Pattern][Command Pattern]
        - can now easily add more undo-able/redo-able operations
        - simplified undo's and redo's
        - performing an undo/redo is now a call on an object instead of a large switch statement
    - used [Null Object Pattern][Null Object Pattern]
        - removes checks for `undefined` from `Editor`
        - simplifies handling edge cases
- Encapsulation, [Separation of Concerns][Separation of Concerns]:
    - moved the text buffer into its own `TextArea` object
        - this simplified the `Editor`.  `Editor` is now only responsible for executing  operations
        - `TextArea` is now clearly only code to do with managing/modifying the text
        - `TextArea` can now be included in other code, thus is reusable 
    - moved the history of undo's/redo's into its own `CommandList` object
        - this simplified the `Editor` further
        - code for how to create and manage undo's and redo's is now only in `CommandList` 
        - `CommandList` can now be included in other code, thus is reusable 

[Command Pattern]: https://sourcemaking.com/design_patterns/command
[Null Object Pattern]: https://sourcemaking.com/design_patterns/null_object
[Separation of Concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
