import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start text-color">
          <div className="container-fluid p-4 pb-0">
            <section className="mb-2">
              <p className="d-flex justify-content-center align-items-center m-0">
                <span className="me-3 text-color">Login from here</span>
                <Link to="/user/login" className="active">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-rounded bg-color custom-bg-text">
                    Log in
                  </button>
                </Link>
              </p>
            </section>
          </div>

          <div className="text-center mt-2">
            © 2025 Copyright:
            <a className="text-color-3" href="#">
              SchoolEase.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
