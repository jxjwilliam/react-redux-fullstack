import React from 'react'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    >
    {text}
  </li>
)

//presentational component
const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map((todo, index) =>
          <Todo
            key={index}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
            />
      )}
    </ul>
  )
}

export default TodoList
