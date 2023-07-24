# nbn-project-hub

## Introduction
This is the first implementation of a truly open source, community driven NBN Trust monorepo

A project has been created specifically for maps. It is called nbn-maps
https://github.com/nbnuk/nbn-project-hub/tree/master/packages/nbn-maps/client/src

Clone the repo and ignore everything except what is in the folder nbn-maps (which is a vanilla javascript project)

At the moment, nbn-maps is just a skeleton project. It is ready for the real map implementation to be added to it.

1. Read about storybook (see below - it's quite simple)
2. Clone this repo
3. Create a branch off develop (this will be your working branch)
3. Run the nbn-map storybook (see below) 
4. Play around with the code in nbn-maps and I think you'll start to get some ideas!



## About Storybook

Introduction to storybook:
https://storybook.js.org/docs/react/get-started/why-storybook


Examples of companies using storybook:
https://v4-0-10--storybooks.netlify.app/examples/

## To run nbn-maps storybook:
```
yarn storybook:maps
```

If that doesn't work, try:

```
yarn install

yarn storybook:maps
```
