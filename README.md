# Reddit Float

React frontend Reddit client application built for people with mild visual impairments.

View live app [here](https://reddit-float.netlify.app)!

## Table of Contents 
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Set Up](#set-up)
* [Sources](#sources)

## Introduction 

Ever notice that it’s easier to read of social media than a dense news article? Or that it’s easier to look at your phone than your laptop? That’s no coincidence. Our eyes more easily focus on text when it’s presented in small snippets. For visually impaired people, like me (hi!), that difference in difficulty can be more drastic and can cause eye strain and headaches.

But we visually impaired people enjoy mindlessly wasting time on the internet too, so I created a pared down version of Reddit to enable more time wasting with less eye strain. 

Minimalist UI, pared down UX, and soft grey tone all combine to create a reddit client that is relaxing to view and peruse. 

## Technologies 

[Reddit API](https://www.reddit.com/dev/api/) was used as a resource. 

* `react` v. 17.0.2
* `react-dom` v. 17.0.2
* `react-redux` v. 7.2.5
* `redux` v. 4.1.1
* `jest` v. 26.6.0
* `enzyme` v. 3.11.0
* `@wojtekmaj/enzyme-adapter-react-17` v.0.6.3
* `redux-mock-store` v. 1.5.4
* `testcafe` v. 1.16.0
* `testcafe-react-selectors` v. 4.1.5
* `npm` v. 7.21.1

## Set Up

Live site hosted by Netlify at [reddit-float.netlify.app](https://reddit-float.netlify.app).

Or, install locally and run `npm run build` in the project root and the app will be available on port 3000.

## Sources

This app was created as part of [Codecademy's Fullstack Engineer](https://www.codecademy.com/learn) curriculum. Codecademy provided the project prompt of creating a Reddit client application. 

The [Unofficial Reddit API](https://github.com/reddit-archive/reddit/wiki/JSON) was also helpful in the creation of this project. 