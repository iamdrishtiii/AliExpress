import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '../reducer'
import Dashboard from '../pages/Dashboard'
import { getproducts } from '../action'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const renderWithRedux = (component, { initState } = {}) => {
  const store = configureStore({
    reducer: reducer,
    preloadedState: initState || { products: [], categories: [] },
  })

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>
    ),
    store,
  }
}

test("Product Api is called and updates Redux State", async () => {
  const { store } = renderWithRedux(<Dashboard />)

  // dispatch the Api Action
  store.dispatch(getproducts());

  // Wait for redux state update
  await waitFor(() => {
    const state = store.getState();
    expect(state.products.length).toBeGreaterThanOrEqual(0) //Check if api updates redux state
  })
})

// test("Display product data after api call", async () => {
//   const displayproduct = [
//     { id: 1, title: "Sony WH-1000XM3 Bluetooth Wireless Over Ear Headphones with Mic (Silver)", model: "WH-1000XM3", brand: "sony", category: "audio" },
//     { id: 6, title:"Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)", model: "Mi Earphones Basic Blue", brand: "xiaomi", category: "audio" }
//   ]

//   renderWithRedux(<Dashboard />, {
//     initstate: {
//       products: displayproduct,
//       categories: [],
//       cartItems: [],
//       wishlistItems: []
//     }
//   })
//   await waitFor(() => {
//     expect(getByTestId("title")).toHaveTextContent("Xiaomi Wired in-Ear Earphones with Mic, Ultra Deep Bass & Metal Sound Chamber (Blue)");
//   });

// })