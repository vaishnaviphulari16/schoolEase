import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentBatchTransfer = () => {
  const navigate = useNavigate();

  const teacher_jwtToken = sessionStorage.getItem("teacher-jwtToken");
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));

  const [allGrades, setAllGrades] = useState([]);
  const [allBatch, setAllBatch] = useState([]);

  const [fromBatches, setFromBatches] = useState([]);
  const [toBatches, setToBatches] = useState([]);

  const [selectedFromGradeId, setSelectedFromGradeId] = useState("");
  const [selectedToGradeId, setSelectedToGradeId] = useState("");
  const [selectedFromBatchId, setSelectedFromBatchId] = useState("");
  const [selectedToBatchId, setSelectedToBatchId] = useState("");

  useEffect(() => {
    const getGradeData = async () => {
      const allGradeData = await retrieveAllGradeData();
      if (allGradeData && allGradeData.grades) {
        setAllGrades(allGradeData.grades);
      }
      if (allGradeData && allGradeData.batches) {
        setAllBatch(allGradeData.batches);
      }
    };

    getGradeData();
  }, []);

  const retrieveAllGradeData = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/grade/fetch/grade-wise/detail"
    );
    console.log(JSON.stringify(response.data));
    return response.data;
  };

  const saveUser = (e) => {
    e.preventDefault();

    let jwtToken;

    if (selectedFromBatchId === "" || selectedToBatchId === "") {
      alert("Please select the Batch!!!!");
    } else {
      fetch(
        "http://localhost:8080/api/user/student/batch/transfer?fromBatchId=" +
        selectedFromBatchId +
        "&toBatchId=" +
        selectedToBatchId,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            //     Authorization: "Bearer " + jwtToken,
          },
        }
      )
        .then((result) => {
          console.log("result", result);
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
              }, 1000);
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
              }, 1000);
            } else {
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
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Transfer Batch Students!!!</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div>
                  <h4 className="text-color-second">From Batch</h4>
                </div>
                <div class="col-md-6 mb-3 text-color">
                  <select
                    name="gradeId"
                    onChange={(e) => {
                      setSelectedFromGradeId(e.target.value);


                      const filteredBatches = allBatch.filter(
                        (batch) => batch.grade.id === Number(e.target.value)
                      );


                      setFromBatches(filteredBatches || []);
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Grades</option>

                    {allGrades.map((grade) => {
                      return <option value={grade.id}> {grade.name} </option>;
                    })}
                  </select>
                </div>

                <div class="col-md-6 mb-3 text-color">
                  <select
                    name="batchId"
                    onChange={(e) => {
                      if (!selectedFromGradeId) {
                        toast.error("Please select Grade!!!", {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        return;
                      }
                      setSelectedFromBatchId(e.target.value);
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Batch</option>

                    {fromBatches.map((batch) => {
                      return <option value={batch.id}> {batch.name} </option>;
                    })}
                  </select>
                </div>

                <div>
                  <h4 className="text-color-second">To Batch</h4>
                </div>
                <div class="col-md-6 mb-3 text-color">
                  <select
                    name="gradeId"
                    onChange={(e) => {
                      setSelectedToGradeId(e.target.value);


                      const filteredBatches = allBatch.filter(
                        (batch) => batch.grade.id === Number(e.target.value)
                      );


                      setToBatches(filteredBatches || []);
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Grades</option>

                    {allGrades.map((grade) => {
                      return <option value={grade.id}> {grade.name} </option>;
                    })}
                  </select>
                </div>

                <div class="col-md-6 mb-3 text-color">
                  <select
                    name="batchId"
                    onChange={(e) => {
                      if (!selectedToGradeId) {
                        toast.error("Please select Grade!!!", {
                          position: "top-center",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        return;
                      }
                      setSelectedToBatchId(e.target.value);
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Batch</option>

                    {toBatches.map((batch) => {
                      return <option value={batch.id}> {batch.name} </option>;
                    })}
                  </select>
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Transfer Batch"
                  />
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

export default StudentBatchTransfer;
