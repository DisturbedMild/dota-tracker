import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import HeroPage from './pages/HeroPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/:heroId", element: <HeroPage /> }
    ]
  }
])

// Styles
import './App.css'

// Components

function App() {
  return <RouterProvider router={router} />
}

export default App
