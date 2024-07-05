import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './components/AuthContext'


const App = () => {
  return (
    <>
      <AuthProvider>
      <Header />
        <main className='py-3'>
          <Container>
            <Outlet />
          </Container>
        </main>
      </AuthProvider>
      <Footer />
    </>
  )
}

export default App