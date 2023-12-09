import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateDatabase from './pages/create-database/CreateDatabase';
import Home from './pages/Home';
import ImportImages from './pages/import-images/ImportImages';
import InsertBricks from './pages/insert-bricks/InsertBricks';
import Layout from './pages/layout/Layout';
import NoPage from './pages/NoPage';
import Parser from './pages/parser/Parser';

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
