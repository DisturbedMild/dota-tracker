import "./index.css";

function Header() {
  return (
    <header className="header py-4 px-8 ">
      <div className="container mx-auto flex justify-between">
        <div className="logo">
          {/* <img src="" alt="logo" /> */}
          Logo
        </div>
        <nav className="nav">
          <ul className="flex items-center gap-2">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Meta</a>
            </li>
            <li>
              <a href="#">Versus</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;