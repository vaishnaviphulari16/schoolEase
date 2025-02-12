import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAllStudents = () => {
  const [allStudent, setAllStudent] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await retrieveAllUser();
        if (allUsers) {
          setAllStudent(allUsers.users);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to fetch students. Please try again later.");
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/fetch/role-wise?role=Student"
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error retrieving students:", error);
      toast.error("Server error while fetching students.");
      return { users: [] };
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/delete/user-id?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();

      if (res.success) {
        toast.success(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });


        setAllStudent((prevStudents) =>
          prevStudents.filter((student) => student.id !== userId)
        );
      } else {
        toast.error(res.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems the server is down", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "45rem" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>All Students</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allStudent.length > 0 ? (
                  allStudent.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <b>{student.firstName || "N/A"}</b>
                      </td>
                      <td>
                        <b>{student.lastName || "N/A"}</b>
                      </td>
                      <td>
                        <b>{student.emailId || "N/A"}</b>
                      </td>
                      <td>
                        <b>{student.phoneNo || "N/A"}</b>
                      </td>
                      <td>
                        <b>
                          {student.address
                            ? `${student.address.street}, ${student.address.city}, ${student.address.pincode}`
                            : "N/A"}
                        </b>
                      </td>
                      <td>
                        <b>
                          {student.batch && student.batch.grade
                            ? student.batch.grade.name
                            : "N/A"}
                        </b>
                      </td>
                      <td>
                        <b>{student.batch ? student.batch.name : "N/A"}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteUser(student.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <b>No students found</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAllStudents;

