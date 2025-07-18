import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function SiteHeader() {
  // Close navbar collapse on nav link click (only if it's currently shown)
  function handleNavLinkClick() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (!navbarCollapse) return;

    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse && navbarCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm w-100">
      <div className="container-fluid px-3 px-lg-4">
        <NavLink to="/" className="navbar-brand fw-bold fs-3" onClick={handleNavLinkClick}>
          TuneOut
        </NavLink>
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ transition: 'transform 0.3s ease' }}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
          style={{ transition: 'height 0.3s ease' }}
        >
          <ul className="navbar-nav gap-2 gap-lg-3">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  'nav-link px-2' + (isActive ? ' active fw-bold' : ' text-light')
                }
                onClick={handleNavLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  'nav-link px-2' + (isActive ? ' active fw-bold' : ' text-light')
                }
                onClick={handleNavLinkClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  'nav-link px-2' + (isActive ? ' active fw-bold' : ' text-light')
                }
                onClick={handleNavLinkClick}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SiteHeader;
