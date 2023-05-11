import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { routes } from './routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppDrawer } from './components/common/Drawer'
import 'flowbite/dist/flowbite.js'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Amplify } from 'aws-amplify'
import awsExports from './aws-exports'
import NotFoundImage from './assets/404.jpg'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { SignOut } from '@aws-amplify/ui-react/dist/types/components/Authenticator/Authenticator'
import type { AmplifyUser } from '@aws-amplify/ui'

Amplify.configure(awsExports)

const AuthApp = withAuthenticator(App)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthApp />
  </React.StrictMode>
)

interface Auth {
  signOut?: SignOut
  user?: AmplifyUser
}

function App({ signOut, user }: Auth) {
  return (
    <main>
      <BrowserRouter>
        <AppDrawer
          title="DBLab Document"
          body={() => <Body user={user} />}
          signOut={signOut}
          user={user}
        />
      </BrowserRouter>
    </main>
  )
}

function Body({ user }: { user?: AmplifyUser }) {
  return (
    <section className="p-4">
      <Routes>
        {routes.map((route, index) => {
          if (route.name === 'Profile') {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element key={index} props={{ user }} />}
              />
            )
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element key={index} />}
              />
            )
          }
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

function NotFound() {
  return (
    <section className="w-full text-right">
      <img
        className="block w-1/2 mx-auto"
        src={NotFoundImage}
        alt="404 Not Found"
      />
      <a
        className=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href="https://www.freepik.com"
      >
        Designed by stories / Freepik
      </a>
    </section>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
