import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth'
import { JournalRoutes } from '../journal'

export const AppRouter = () => {
  return (
    <Routes>
      {/* Log in y Registro */}
      <Route path='auth/*' element={<AuthRoutes />} />
      {/* Journal app */}
      <Route path='/*' element={<JournalRoutes />} />

    </Routes>
  )
}
