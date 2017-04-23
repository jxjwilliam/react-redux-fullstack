#!/usr/local/bin/node
//https://github.com/marak/Faker.js/
//TODO: write into a file for testing purpose.

var faker = require('faker/locale/en')
var fs = require('fs')
var path = require('path')
var prettyjson = require('prettyjson');
//import { v4 } from 'node-uuid';

//1. for users
const getUserData = (no) => {
  no = no || 10;

  var people = [];

  for (var i = 0; i < no; i++) {
    var person = {};
    person.id = faker.random.uuid()
    person.name = faker.name.findName(); // Rowan Nikolaus
    person.email = faker.internet.email();
    person.phone = faker.phone.phoneNumber();
    person.avatar = faker.image.avatar();
    person.url = faker.internet.url();
    person.description = faker.lorem.paragraphs();

    people.push(person);
  }

  console.log(prettyjson.render(people));
  return people;
}


//2. for todos:
//const fakeTodosData = getTodoData(6);
const getTodoData = (no) => {
  no = no || 6
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