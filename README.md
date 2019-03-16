# Simple TODO app built in VueJS (hosted on AWS S3) communicating with GoLang app hosted on Openshift.

---

## About This Application:

1. VueJS application is hosted in **AWS S3** bucket.
2. This VueJS application has been built to be the front end of the GoLang app that can be found here: https://github.com/karolispx/golang-rh-todo/

---

## Features:

- Ability to register, login and logout.
- Create/update/delete/watch/unwatch tasks. 

---

## Local Environment Set Up:

1. Clone this repository
2. run `npm install`

**Compiles and hot-reloads for development:**
- `npm run serve`

**Run your tests:**
- `npm run test`

**Lints and fixes files:**
- `npm run lint`

**Compiles and minifies for production:**
- `npm run build`

**Customize configuration:**
- See [Configuration Reference](https://cli.vuejs.org/config/).
---

## Deployment To AWS S3 Bucket:

This article provides everything that's needed to setup VueJS application on AWS S3 bucket: https://developer.okta.com/blog/2018/07/03/deploy-vue-app-aws