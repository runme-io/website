#!/bin/bash
cd __sapper__

FILES=($(find . -name "*.js" 2>/dev/null))
for file in "${FILES[@]}";
do
  cp $file $file.tmpl
  envsubst '$RUNME_API_HOST' < $file.tmpl > $file.tmpl
  rm $file.tmpl

  cp $file $file.tmpl
  envsubst '$RUNME_API_SECURE' < $file.tmpl > $file.tmpl
  rm $file.tmpl

  cp $file $file.tmpl
  envsubst '$APPLICATION_PROJECT_ID' < $file.tmpl > $file.tmpl
  rm $file.tmpl

  cp $file $file.tmpl
  envsubst '$API_KEY' < $file.tmpl > $file.tmpl
  rm $file.tmpl

  cp $file $file.tmpl
  envsubst '$API_SECRET' < $file.tmpl > $file.tmpl
  rm $file.tmpl
done

cd ../

npm run start

