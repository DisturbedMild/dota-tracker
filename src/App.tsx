import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import HeroPage from './pages/hero-page/page';
import ErrorPage from './pages/ErrorPage';


// Get request url and parse to id
// Add promise.AllSettled for all requested hero info
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
        loader: async({ request }) => {
          const heroId = request.url.replace(/(.*)=/, "");
          // const fetchedItems = await fetch(`https://api.opendota.com/api/constants/items`).then(res => res.json());
          const fetchedHeroesStats = await fetch(`https://api.opendota.com/api/heroStats`).then(res => res.json());
          // const fetchedHeroItemPopularity = await fetch(`https://api.opendota.com/api/heroes/${heroId}/itemPopularity`).then(res => res.json());

          return {
            fetchedHeroesStats,
            // fetchedHeroItemPopularity,
            // fetchedItems,
            heroId
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
