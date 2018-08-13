#!/bin/bash

cd ~/WebstormProjects/Tutorials/react-redux-fullstack

export PATH=$PATH:./bin

./bin/start-all.sh

nodemon ./server/index

# npm run dev
# node server/index.js pg
