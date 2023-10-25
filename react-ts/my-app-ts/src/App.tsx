import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Main from './Main/Main'
import AddItemForm from './Main/AddItemForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/additem" element={<AddItemForm />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
