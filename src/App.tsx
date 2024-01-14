import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/layout/RootLayout';
import HomePage from './pages/home-page/page';
import HeroPage from './pages/hero-page/page';
import ErrorPage from './pages/error-page/page';

// Get request url and parse to id
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: "/:heroId", 
        element: <HeroPage />,
        loader: async({ request, params }) => {
          const heroName = params.heroId;
          const heroId = request.url.replace(/(.*)=/, "");
          // const fetchedItems = await fetch(`https://api.opendota.com/api/constants/items`).then(res => res.json());
          // const fetchedHeroItemPopularity = await fetch(`https://api.opendota.com/api/heroes/${heroId}/itemPopularity`).then(res => res.json());

          return {
            heroId,
            heroName
          }
        }
       }
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
