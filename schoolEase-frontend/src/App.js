import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import HomePage from "./PageComponent/HomePage";
import AddGradeForm from "./GradeComponent/AddGradeForm";
import UpdateGradeForm from "./GradeComponent/UpdateGradeForm";
import ViewAllGrades from "./GradeComponent/ViewAllGrades";
import ViewAllCourses from "./CourseComponent/ViewAllCourses";
import AddCourseForm from "./CourseComponent/AddCourseForm";
import UpdateCourseForm from "./CourseComponent/UpdateCourseForm";
import ViewAllTeachers from "./UserComponent/ViewAllTeachers";
import ViewAllStudents from "./UserComponent/ViewAllStudents";
import UserProfile from "./UserComponent/UserProfile";
import AddBatchForm from "./BatchComponent/AddBatchForm";
import ViewAllBatches from "./BatchComponent/ViewAllBatches";
import UpdateBatchForm from "./BatchComponent/UpdateBatchForm";
import StudentBatchDeactivate from "./UserComponent/StudentBatchDeactivate";
import StudentBatchTransfer from "./UserComponent/StudentBatchTransfer";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/student/register" element={<UserRegister />} />
        <Route path="/user/teacher/register" element={<UserRegister />} />
        <Route path="/admin/grade/add" element={<AddGradeForm />} />
        <Route path="/admin/grade/all" element={<ViewAllGrades />} />
        <Route path="/admin/grade/update" element={<UpdateGradeForm />} />
        <Route path="/admin/course/add" element={<AddCourseForm />} />
        <Route path="/admin/course/all" element={<ViewAllCourses />} />
        <Route path="/admin/course/update" element={<UpdateCourseForm />} />
        <Route path="/admin/batch/add" element={<AddBatchForm />} />
        <Route path="/admin/batch/all" element={<ViewAllBatches />} />
        <Route path="/admin/batch/update" element={<UpdateBatchForm />} />
        <Route
          path="/admin/grade/:gradeId/course/"
          element={<ViewAllCourses />}
        />
        <Route
          path="/admin/grade/:gradeId/batch/"
          element={<ViewAllBatches />}
        />
        <Route path="/admin/student/all" element={<ViewAllStudents />} />
        <Route path="/admin/teacher/all" element={<ViewAllTeachers />} />
        <Route path="/user/profile/detail" element={<UserProfile />} />
        <Route
          path="/teacher/batch/deactivate"
          element={<StudentBatchDeactivate />}
        />
        <Route
          path="/teacher/batch/transfer"
          element={<StudentBatchTransfer />}
        />
      </Routes>
    </div>
  );
}

export default App;
