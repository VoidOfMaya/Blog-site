import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { NotFound } from './components/404Page/notFound.jsx'
import './index.css'
import App from './App.jsx'
import { PostPage } from './components/postPage/postPage.jsx'



//handle page routing

const router =createBrowserRouter([
  { path: '/', element:<App />,
    children: [

      //{ path: 'Store', element: <Store />},
      //{ path: 'Cart', element: <Cart />},
    ],
    errorElement:<NotFound />},
    { path: '/post/:id', 
      element: <PostPage />, 
      errorElement: <NotFound/>},
  //otherpages go here
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
