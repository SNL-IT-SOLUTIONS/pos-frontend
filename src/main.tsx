import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { history } from '@/utils/history.ts'
import './index.css'
import App from './App.tsx'
import { UserProvider } from "@/context/UserContext";

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < HistoryRouter history={history}>
      <UserProvider>
        <App />
      </UserProvider>
    </HistoryRouter>
  </StrictMode>,
)
