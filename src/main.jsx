import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { NotFound } from './components/404Page/notFound.jsx'
import './index.css'
import App from './App.jsx'



//handle page routing

const router =createBrowserRouter([
  { path: '/', element:<App />,
    children: [
      //{ path: '/', element: <Home />},
      //{ path: 'Store', element: <Store />},
      //{ path: 'Cart', element: <Cart />},
    ],
    errorElement:<NotFound />},

  //otherpages go here
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
