import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import NotFoundPage from './pages/NotFoundPage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import DocumentsListPage from './pages/Documents/DocumentsListPage'
import DocumentsDetailPage from './pages/Documents/DocumentsDetailPage'
import FlashcardListPage from './pages/Flashcards/FlashcardListPage'
import FlashcardsPage from './pages/Flashcards/flashcardsPage'
import QuizTakePage from './pages/Quizzes/QuizTakePage'
import QuizResultPage from './pages/Quizzes/QuizResultPage'
import ProfilePage from './pages/Profile/ProfilePage'
import ProtectedRoute from './pages/Auth/ProtectedRoute'

const App = () => {
  const isAuthenticated = true;
  const loading = false;

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <p>Loading......</p>
      </div>
    )
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/documents' element={<DocumentsListPage />} />
          <Route path='/documents/:id' element={<DocumentsDetailPage />} />
          <Route path='/flashcards' element={<FlashcardListPage />} />
          <Route path='/documents/:id/flashcards' element={<FlashcardsPage />} />
          <Route path='/quizzes/:quizId' element={<QuizTakePage />} />
          <Route path='/quizzes/:quizId/results' element={<QuizResultPage />} />

          <Route path='profile' element={<ProfilePage />} />

        </Route>

        <Route path='*' element={<NotFoundPage />} />

      </Routes>
    </Router>
  )
}

export default App