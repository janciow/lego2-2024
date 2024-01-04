import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateDatabase from './pages/create-database/CreateDatabase';
import Home from './pages/Home';
import ImportImages from './pages/import-images/ImportImages';
import InsertBricks from './pages/insert-bricks/InsertBricks';
import Layout from './pages/layout/Layout';
import NoPage from './pages/NoPage';
import Parser from './pages/parser/Parser';
import Bricks from './pages/bricks/Bricks';
import ImportBricks from './pages/import-bricks/ImportBricks';
import Sets from './pages/sets/Sets';
import Set from './pages/sets/set/Set';

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
          <Route path="bricks" element={<Bricks />} />
          <Route path="sets" element={<Sets />} />
          <Route path="sets/:setId" element={<Set />} />
          <Route path="import-bricks" element={<ImportBricks />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
