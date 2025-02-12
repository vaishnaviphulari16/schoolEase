import Footer from "../NavbarComponent/Footer";
import { Link } from "react-router-dom";
import school1 from "../images/school_1.png";
import school2 from "../images/school_2.png";

const HomePage = () => {
  return (
    <div className="container-fluid mb-2">


      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 text-color">
            <h1>School Management System</h1>
            <p>
              Welcome to the School Management System, where
              organization meets efficiency. Our platform streamlines the
              complex task of scheduling batches, managing resources, and
              facilitating collaboration among faculty and students. With
              intuitive features and user-friendly interfaces, we empower
              educational institutions to optimize their tasks with ease.
            </p>
            <p>
              Say goodbye to manual scheduling headaches and hello to a smarter
              way of managing academics. Whether you're a student
              looking for your class schedule or an administrator coordinating
              courses, our system ensures smooth operations and effective
              communication at every step.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={school2}
              alt="Logo"
              width="400"
              height="auto"
              className="home-image"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <img
              src={school1}
              alt="Logo"
              width="350"
              height="auto"
              className="home-image"
            />
          </div>
          <div className="col-md-8 text-color">
            <h1 className="ms-5">School Management System</h1>
            <p className="ms-5">
              In today's fast-paced academic environment, effective school
              management is essential. Our School Management System
              provides tools and resources to help students and faculty optimize
              their schedules, prioritize tasks, and make the most of their
              time, with vrious features. Users can stay organized and focused
              on their academic goals.
            </p>
            <p className="ms-5">
              By leveraging technology to streamline School management processes,
              our system empowers users to be more productive and efficient in
              their daily activities. Whether you're juggling between multiple
              teachers, students or various activities, our platform provides
              the tools you need to stay on track and achieve your objectives.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
