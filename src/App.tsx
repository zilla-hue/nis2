import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context/theme-context/ThemeContext'
import HeaderSection from '@/components/sections/header-section'
import FooterSection from '@/components/sections/footer-section'
import HomePage from './pages/home'
import AboutUsPage from './pages/about-us'
import WhatWeDoPage from './pages/what-we-do'
import NewsPage from './pages/news'
import ContactPage from './pages/contact'
import LoginPage from './pages/auth/login'
import SignUpPage from './pages/auth/sign-up'
import TermsAndConditions from './pages/terms-and-conditions'
import PrivacyPolicy from './pages/privacy-policy'
import AdminBoardRoutes from './pages/admin-screens/board-routes'
import TransactionHistory from './pages/admin-screens/finance/transaction-history'
import FinancePage from './pages/admin-screens/finance'
import Organogram from './pages/admin-screens/organogram'
import AdminFinance from './pages/admin-screens/finance/admin-finance'
import OnboardingPage from './pages/onboarding/start-onboarding'
import RegPaymentPage from './pages/onboarding/reg-payment'
import KnowYourMemberPage from './pages/onboarding/know-your-member'

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <HeaderSection />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/what-we-do" element={<WhatWeDoPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/sign-up" element={<SignUpPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin-screens/board-routes" element={<AdminBoardRoutes />} />
            <Route path="/admin-screens/finance" element={<FinancePage />} />
            <Route path="/admin-screens/finance/transaction-history" element={<TransactionHistory />} />
            <Route path="/admin-screens/organogram" element={<Organogram />} />
            <Route path="/admin-screens/finance" element={<AdminFinance />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/onboarding/reg-payment" element={<RegPaymentPage />} />
            <Route path="/onboarding/know-your-member" element={<KnowYourMemberPage />} />
          </Routes>
        </main>
        <FooterSection />
      </div>
    </ThemeProvider>
  )
}

export default App