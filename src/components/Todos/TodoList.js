import React from 'react'
import Todo from './Todo'

//presentational component
const TodoList = ({ todos, onTodoClick }) => {
  console.log(todos, onTodoClick);
  return (
    <ul>
      {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
            />
      )}
    </ul>
  )
}

export default TodoList
