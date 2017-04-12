import { v4 } from 'node-uuid';
import faker from '../../node_modules/faker/locale/en'

const fakeDatabase = {
    todos: [{
        id: v4(),
        text: 'hey',
        completed: true
    }, {
        id: v4(),
        text: 'hello world',
        completed: true
    }, {
        id: v4(),
        text: 'bingo',
        completed: false
    }]
};

export const getFakerData = (no) => {
    let todos = [];
    for (let i = 0; i < no; i++) {
        todos.push({
            id: faker.random.uuid(),
            text: faker.lorem.sentence(),
            completed: Math.random() > 0.5
        })
    }
    return todos;
}

const fakeTodosData = getFakerData(6);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
    delay(500).then(() => {
        if (Math.random() > 0.5) {
            throw new Error('FetchTodos Error!')
        }
        switch (filter) {
            case 'all':
                return fakeTodosData;
            case 'active':
                return fakeTodosData.filter(t => !t.completed)
            case 'completed':
                return fakeTodosData.filter(t => t.completed)
            default:
                throw new Error(`Unknown filter: ${filter}`);
        }
    });


export const addTodo = (text) =>
    delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false
        };
        fakeTodosData.push(todo);
        return todo;
    });

export const toggleTodo = (id) =>
    delay(500).then(() => {
        const todo = fakeTodosData.find(f => f.id === id);
        todo.completed = !todo.completed
        return todo;
    });