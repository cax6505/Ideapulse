import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import SingleBlog from './pages/blogs/SingleBlog.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import About from './pages/About.jsx';

import Write from './pages/write/Write.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about", 
        element: <About/>
      },
      {
        path: "/blogs/:id",
        element: <ProtectedRoute element={<SingleBlog />} />,
      },
      {
        path: "/write",
        element: <ProtectedRoute element={<Write />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
