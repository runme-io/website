#!/bin/bash

FILES=($(find ./__sapper -name "*.js" 2>/dev/null))
for file in "${FILES[@]}"; do
  envsubst '$RUNME_API_HOST' < $file > $file.new && mv $file.new $file
  envsubst '$RUNME_API_SECURE' < $file > $file.new && mv $file.new $file
  envsubst '$APPLICATION_PROJECT_ID' < $file > $file.new && mv $file.new $file
  envsubst '$API_KEY' < $file > $file.new && mv $file.new $file
  envsubst '$API_SECRET' < $file > $file.new && mv $file.new $file
done

npm run start

