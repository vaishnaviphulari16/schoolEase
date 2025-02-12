import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderTeacher = () => {
  let navigate = useNavigate();

  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-teacher");
    sessionStorage.removeItem("teacher-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const viewProfile = () => {
    navigate("/user/profile/detail", { state: teacher });
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

      <li class="nav-item">
        <Link
          to="/teacher/batch/transfer"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Transfer Batch</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/teacher/batch/deactivate"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Deactivate Batch</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/user/student/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Student</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/admin/student/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">View Students</b>
        </Link>
      </li>

      <li class="nav-item">
        <div class="nav-link active" aria-current="page">
          <b className="text-color" onClick={viewProfile}>
            My Profile
          </b>
          <ToastContainer />
        </div>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderTeacher;
