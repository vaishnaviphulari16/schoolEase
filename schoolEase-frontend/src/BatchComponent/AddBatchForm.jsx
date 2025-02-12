import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBatchForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gradeId, setGradeId] = useState("");

  const [allGrades, setAllGrades] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllGrade = async () => {
      const allGrades = await retrieveAllGrade();
      if (allGrades) {
        setAllGrades(allGrades.grades);
      }
    };

    getAllGrade();
  }, []);

  const retrieveAllGrade = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const saveBatch = (e) => {
    let data = { name, description, gradeId };

    fetch("http://localhost:8080/api/batch/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          } else {
            toast.error("It Seems Server is down!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 2000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      });
    e.preventDefault();
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="form-card border-color" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h5 class="card-title">Add Batch</h5>
            </div>
            <div class="card-body text-color mt-3">
              <form>
                <div class="mb-3">
                  <label for="title" class="form-label">
                    <b>Batch Name</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="enter title.."
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    <b>Batch Description</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="3"
                    placeholder="enter description.."
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <b>Grade</b>
                  </label>

                  <select
                    name="gradeId"
                    onChange={(e) => {
                      setGradeId(e.target.value);
                    }}
                    className="form-control"
                  >
                    <option value="">Select Grade</option>

                    {allGrades.map((grade) => {
                      return <option value={grade.id}> {grade.name} </option>;
                    })}
                  </select>
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    onClick={saveBatch}
                    class="btn bg-color custom-bg-text"
                  >
                    Add Batch
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBatchForm;
