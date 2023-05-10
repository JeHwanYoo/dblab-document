import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { routes } from './routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppDrawer } from './routes/Drawer'
import 'flowbite/dist/flowbite.js'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'

Amplify.configure(awsExports)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <main>
      <BrowserRouter>
        <AppDrawer
          title="DBLab Document"
          body={
            <section className="p-8">
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </section>
          }
        />
      </BrowserRouter>
    </main>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
