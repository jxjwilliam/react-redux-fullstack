https://reacttraining.com/react-router/web/api/match



history objects typically have the following properties and methods:

1. length - (number) The number of entries in the history stack
1. action - (string) The current action (PUSH, REPLACE, or POP)
1. location - (object) The current location. May have the following properties:
  - pathname - (string) The path of the URL
  - search - (string) The URL query string
  - hash - (string) The URL hash fragment
  - state - (string) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
1. push(path, [state]) - (function) Pushes a new entry onto the history stack
1. replace(path, [state]) - (function) Replaces the current entry on the history stack
1. go(n) - (function) Moves the pointer in the history stack by n entries
1. goBack() - (function) Equivalent to go(-1)
1. goForward() - (function) Equivalent to go(1)
1. block(prompt) - (function) Prevents navigation (see the history docs)
