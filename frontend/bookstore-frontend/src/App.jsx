import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import ProtectedRoute from './components/ProtectedRoute';
import BookDetails from './components/BookDetails';
import BookPayment from './components/BookPayment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/admin/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/admin/update-book" element={<ProtectedRoute><UpdateBook /></ProtectedRoute>} />
        <Route path='/admin/delete-book' element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
        <Route path="/book/:id" element={<BookDetails />}></Route>
         <Route path="/books/:id/payment" element={<BookPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
