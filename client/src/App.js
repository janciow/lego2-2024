import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Parser from './pages/parser/Parser';
import Layout from './pages/layout/Layout';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import ImportImages from './pages/ImportImages';
import InsertBricks from './pages/InsertBricks';
import CreateDatabase from './pages/create-database/CreateDatabase';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="parser" element={<Parser />} />
          <Route path="import-images" element={<ImportImages />} />
          <Route path="insert-bricks" element={<InsertBricks />} />
          <Route path="create-database" element={<CreateDatabase />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
