import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import RNBO from './components/rnbo';
import Error from './components/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
