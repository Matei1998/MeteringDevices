import React from 'react';
import { createRoot } from 'react-dom/client'; // Importă din 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './Components/Router/routes'; // Asigură-te că importi corect router-ul

// Creează o referință către elementul root din HTML
const rootElement = document.getElementById('root');

// Creează root-ul aplicației și renderizează componenta
createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
