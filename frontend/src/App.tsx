import { BrowserRouter, Route, Routes } from 'react-router'
import PrivatePagesLayout from '@/components/layouts/private-pages-layout'
import PublicPagesLayout from '@/components/layouts/public-pages-layout'
import { RootLayout } from '@/components/layouts/root-layout'
import SignInPage from '@/pages/auth-pages/signin-page'
import SignUpPage from '@/pages/auth-pages/signup-page'
import HomePage from '@/pages/home-page'
import NotFound from '@/pages/not-found'
import AuthProvider from '@/providers/auth-provider'
import DashboardPage from '@/pages/dashboard-page'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <RootLayout>
          <Routes>
            {/* Public Routes*/}
            <Route element={<PublicPagesLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
            </Route>

            {/* Private Routes*/}
            <Route element={<PrivatePagesLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/transactions" />
              <Route path="/user-settings" />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RootLayout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
