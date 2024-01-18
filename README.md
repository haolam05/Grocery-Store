# Grocery Store App


![Grocery Store](https://github.com/haolam05/Grocery-Store/assets/71291057/7be5773e-6784-4717-9464-1b47dd45e5f6)



In this project, you’ll connect Redux to a React application. You'll configure
a Redux store, create Redux reducers and action creators, and use them in a
Grocery Store application to add produce to a shopping cart. You'll also learn
how to normalize data in a Redux store.

When you finish today's project, your application should have the following
features:

- Display all the produce in a list
- Add produce to a cart
- Increment/decrement the quantity of produce in the cart
- Checkout the cart

## Phase 0: Familiarize yourself with the code

Clone the starter repository from the `Download` link below.

Run `npm install` and `npm run dev` to start the development server.

Navigate to [http://localhost:5173]. You should see the text "Grocery Store".
If you click on the "Checkout" button in the navigation bar, it should open a
side menu. Since there is no produce listed, you cannot add items to the
shopping cart yet.

The `Cart`, `ProduceList`, and `ProduceDetails` are the components you need to
connect to the Redux store. Take a look at the code there to familiarize
yourself with it.

__src/mockData/produce.json__ provides the mock data that you will use to
populate the Redux store. The file has a JSON array of objects. Each object has
the following structure:

```plaintext
{
  id: ID,
  name: String,
  liked: Boolean
}
```

In your preview of the code, make sure to understand how all the components
connect (i.e., the parent-child relationships of all the components, the
component tree).

## Phase 1: Set Up

### Install dependencies

`npm install` the following dependencies:

- `redux` - the Redux package
- `react-redux` - for connecting Redux to React

`npm install -D` the following dev-dependencies:

- `redux-logger` - a debugging tool for logging all actions dispatched

### Configure the Redux store

First thing you need to do is set up and configure the Redux store.

Create a folder called __store__ inside of __src__. Inside of that folder,
create a file called __store.js__. (You can also add an __index.js__ to help
with exporting if you want.) In this file, you will define the root reducer and
a function that will return a Redux store.

Import `createStore`, `combineReducers`, `applyMiddleware`, and `compose` from
redux.

```js
// src/store/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
```

- `createStore` - creates a Redux store
- `combineReducers` - creates one reducer from multiple reducers as slices of
  state
- `applyMiddleware` - a store enhancer that will allow you to attach middlewares
  (a middleware is a function called before any action hits the root reducer)
- `compose` - another store enhancer that will allow you to use more than one
  store enhancer

Next, define the `rootReducer` which will be the root reducer for the Redux
store. The `rootReducer` will just be the return of `combineReducers` invoked
with an empty object for now.

```js
// src/store/store.js

// ...
const rootReducer = combineReducers({

});
```

Now, you are going to create a store enhancer that will be set only when your
application is in development. When in development, you want to add the
`redux-logger` middleware and the Redux dev tools extension store enhancer to
your store. For `redux-logger`, you will use `applyMiddleware`, which returns
a store enhancer. The store enhancer for the Redux dev tools extension is set
by the extension to a global property,
`window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`. This store enhancer combines
other store enhancers into one, just like `compose` from `redux` does.

Set the `enhancer` variable when in development to use these enhancers like so:

```js
// src/store/store.js

// ...
let enhancer;

if (import.meta.env.MODE !== "production") {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
      : compose;
  enhancer = composeEnhancers(applyMiddleware(logger));
}
```

Let's break this down.

The `logger` variable is set to the `default` export of the imported
`redux-logger` package using _dynamic import_ syntax. Why does this code use a
dynamic import? Regular ES6 module imports must be defined at the very top of
the file in the outermost scope and will be loaded in all node environments.
`redux-logger`, in contrast, is a development dependency that should **NOT** be
loaded in production. Loading a module as a dynamic import is necessary if you
want it only in a certain node environment.

The `composeEnhancers` variable is set to the Redux dev tools extension's
store enhancer, `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` or the `compose`
function from `redux` if the extension fails to load or if you don't have the
extension installed in your browser.

The Redux `compose` function takes in store enhancers as its arguments and
combines them to create a single store enhancer. The only other store enhancer
that you need is `applyMiddleware` invoked with the loaded `logger`. `enhancer`
is set to the combined store enhancer.

Finally, define a function called `configureStore` that will take in a
`preloadedState` and return the result of `createStore` invoked with the
`rootReducer`, the `preloadedState`, and the `enhancer`. Export the
`configureStore` function as the default export.

```js
// src/store/store.js

// ...
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
```

### Provide the Redux store

Now, you need to wrap the React application with the Redux store provider.

Import the `configureStore` function into the entry file, __src/main.jsx__.
Import the `Provider` component from `react-redux`.

Initialize a variable called `store` and set it to the return of
`configureStore` (a `preloadedState` does not need to be passed in, it can be
`undefined`).

In the argument to the `render` function, wrap the `App` component with the
`Provider` component. Pass the prop of `store` with the value of `store` into
the `Provider`.

Your entry file should look like this:

```js
// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';
import './index.css';

const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
```

### Test your setup

Let's test your setup!

Navigate to [http://localhost:5173] and open the browser's DevTools. In the
console, you should see a message about an invalid reducer. That's because the
`rootReducer` isn't combining any reducers yet. Ignore this warning for now.

Open the "Redux" tab in your browser's DevTools. You should **not** see the
message "No store found".

In your entry file, expose the `store` variable on the `window` **only in
development** for testing purposes.

```js
// src/main.jsx

// ...
if (import.meta.env.MODE !== "production") {
  window.store = store;
}
```

Navigate to [http://localhost:5173] and refresh. You should see the `store` on
the `window` in your browser's DevTools console. If you call `store.getState()`,
you should get back an empty object.

If you are having issues while testing, check your syntax in your store and
entry files.

Commit your setup code!

[http://localhost:5173]: http://localhost:5173
# Grocery-Store
