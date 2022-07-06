#!/bin/bash

git branch -D gh-pages
git push origin --delete gh-pages
git checkout -b gh-pages
npm run build
npm run docs
git rm -rf app addon blueprints config tests types
mv dist/* .
rm -rf dist
git add .
git commit -m "Publishing to github pages"
git push origin gh-pages
git checkout master
