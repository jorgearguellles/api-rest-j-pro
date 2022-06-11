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
