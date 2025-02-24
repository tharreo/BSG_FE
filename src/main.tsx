import './styles/index.scss';
import './config/i18n-config.ts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import themeConfig from './config/theme-config.ts';
import App from './App.tsx';
import storeRedux from './redux/store.ts';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={storeRedux}>
        <ThemeProvider theme={themeConfig}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
