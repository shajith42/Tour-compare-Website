import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { PackageProvider } from './utils/data.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
 
  <PackageProvider>
    <App />
  </PackageProvider>
   </BrowserRouter>
);