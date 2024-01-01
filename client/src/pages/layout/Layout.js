import { Outlet, Link } from "react-router-dom";
import './Layout.css';
const Layout = () => {
  return (
    <div className="layout">

      <div className="layout__img"></div>
      <nav>
        <ul>
          <li> 
            <Link to="/home">Home 1</Link>
          </li>
          <li>
            <Link to="/parser">Parser</Link>
          </li>
          <li>
            <Link to="/import-images">import images</Link>
          </li>
          <li>
            <Link to="/import-bricks">import bricks</Link>
          </li>
          <li>
            <Link to="/create-database">create-database</Link>
          </li>
          <li>
            <Link to="/insert-bricks">Insert bricks to DB</Link>
          </li>
          <li>
            <Link to="/bricks">Bricks</Link>
          </li>
        </ul>
      </nav>

    <div className="layout__outlet">
    <Outlet />
    </div>
 
    </div>
  )
};

export default Layout;