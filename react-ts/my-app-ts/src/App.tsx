import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Items from './Main/Items';
import SearchItems from './Main/SearchItem/SearchItems'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/searchitem" element={<SearchItems />} />
        <Route path="/items" element={<Items />} />
        <Route path="" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
