#!/bin/bash

for file in `find ./__sapper__ -name "*.js"`; do
  for var in `env | awk -F '=' '{print $1}' | grep -vE '^_.*'`; do
    echo change variable '$'"$var"'' in file $file
    envsubst '$'"$var"'' < $file > $file.new && mv $file.new $file
  done
done

npm run start
