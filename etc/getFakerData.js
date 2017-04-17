#!/usr/local/bin/node

//https://github.com/marak/Faker.js/
//TODO: write into a file for testing purpose.

var faker = require('faker/locale/en')
var fs = require('fs')
var path = require('path')
var prettyjson = require('prettyjson');
 

var people = [];

for (var i=0; i<10; i++) {
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
