# API Rest JS Pro

## 1. Images optimization

### loading Spinner VS loading skeletons

Good characteristics of the loading screens:

- Ease understand loading state
- loading time friendly
- loading experience funny

We have tow principal strategies to handle loading screens:

- Loading spinner
  - A ring loading animated
  - Don't share clear info about lading
  - We don't know if lose wifi connection or web crashed
- Loading skeletons
  - have good practice user enjoy

### loading screen

check index.htm and index.js

### Intersection Observer

[Intersection Observer | MDN](category-container)

It serves to observe elements and if they cross a threshold that we define, it will notify us to take action.

The threshold is defined by the percentage that the viewport intersects with the visible part of our page.

## 2. Pagination

### Principal Strategies

We have two principal strategies when we have a lot of info to want render in the screen. Info > Screen.

- Infinite Scroll

  - All content in the same page
  - Infinite elements per page
  - Navigation by scroll
  - Difficult find results 🚩
  - Difficult result estimate 🚩
  - Bad feeling to Footer page 🚩
  - Addicted
  - Scroll > Clicks

- Pagination

  - Find specific content
  - Content order by pages
  - fix elements per page
  - Navigation by buttons (next, back, number page ...)
  - Amount of results estimate
  - Don't addicted 🚩

## 2. Local Storage

### LocalStorage VS Real API

- Local Storage
  - Faster than Real API
  - Browser dependency
  - API independency
  - Total frontend control
  - Auth don't require 🚩
  - Don't let us recovery or share our session 🚩
  - **If we use private data, DON'T USE LocalStorage** 🚩🚩🚩
- Real API
  - Slower tah local storage 🚩
  - Backend control 🚩
  - Auth require 🚩
  - Allow us share and recovery session
  - **If we use private data, USE Real API** ✅
