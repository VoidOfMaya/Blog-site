import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { NotFound } from './components/404Page/notFound.jsx'
import './index.css'
import App from './App.jsx'
import { PostPage } from './components/postPage/postPage.jsx'
import { Homepage } from './components/homePage/homePage.jsx'
import { LoginPage } from './components/login/loginPage.jsx'



//handle page routing

const router =createBrowserRouter([
  { path: '/', element:<App />,
    children: [
    { path: '/', element: <Homepage />},
    { path: '/post/:id',element: <PostPage />},
    { path: '/login', element: <LoginPage />},
    ],
    errorElement:<NotFound />},

  //otherpages go here
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
