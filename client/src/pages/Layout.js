import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
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
            <Link to="/create-database">create-database</Link>
          </li>
          <li>
            <Link to="/insert-bricks">Insert bricks to DB</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;