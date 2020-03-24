#!/bin/sh
for file in *.js;
do
  echo $file
  envsubst < $file > $file
done

npm run start
