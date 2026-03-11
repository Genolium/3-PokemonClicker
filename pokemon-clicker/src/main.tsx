import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { pokemonTheme } from './theme/themeConfig';
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/sign-up" replace />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={pokemonTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);