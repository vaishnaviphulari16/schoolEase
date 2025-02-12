// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const ViewAllBatches = () => {
//   const [allBatchs, setAllBatchs] = useState([]);
//   const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

//   const { gradeId } = useParams();

//   let navigate = useNavigate();

//   useEffect(() => {
//     const getAllBatch = async () => {
//       const allBatch = await retrieveAllBatchs(gradeId);
//       if (allBatch) {
//         setAllBatchs(allBatch.batchs);
//       }
//     };

//     getAllBatch();
//   }, []);

//   const retrieveTimeTableByBatch = async (batchId) => {
//     const response = await axios.get(
//       "http://localhost:8080/api/timetable/fetch/batch-wise?batchId=" + batchId
//     );
//     console.log("in retrieve method");
//     console.log(response.data);
//     return response.data;
//   };

//   const retrieveAllBatchs = async (gradeId) => {
//     if (gradeId === "all") {
//       const response = await axios.get(
//         "http://localhost:8080/api/batch/fetch/all"
//       );
//       console.log(response.data);
//       return response.data;
//     } else {
//       const response = await axios.get(
//         "http://localhost:8080/api/batch/fetch/all/grade-wise?gradeId=" +
//         gradeId
//       );
//       console.log(response.data);
//       return response.data;
//     }
//   };

//   const deleteBatch = (batchId, e) => {
//     fetch("http://localhost:8080/api/batch/delete?batchId=" + batchId, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + admin_jwtToken,
//       },
//     })
//       .then((result) => {
//         result.json().then((res) => {
//           if (res.success) {
//             toast.success(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000);
//           } else if (!res.success) {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000);
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000);
//       });
//   };

//   const updateGrade = (batch) => {
//     navigate("/admin/batch/update", { state: batch });
//   };



//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 shadow-lg"
//         style={{
//           height: "45rem",
//         }}
//       >
//         <div
//           className="card-header custom-bg-text text-center bg-color"
//           style={{
//             borderRadius: "1em",
//             height: "50px",
//           }}
//         >
//           <h2>All Batchs</h2>
//         </div>
//         <div
//           className="card-body"
//           style={{
//             overflowY: "auto",
//           }}
//         >
//           <div className="table-responsive">
//             <table className="table table-hover text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Batch Id</th>
//                   <th scope="col">Batch Name</th>
//                   <th scope="col">Description</th>
//                   <th scope="col">Grade</th>

//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allBatchs.map((batch) => {
//                   return (
//                     <tr>
//                       <td>
//                         <b>{batch.id}</b>
//                       </td>
//                       <td>
//                         <b>{batch.name}</b>
//                       </td>
//                       <td>
//                         <b>{batch.description}</b>
//                       </td>
//                       <td>
//                         <b>{batch.grade.name}</b>
//                       </td>
//                       <td>

//                         <button
//                           onClick={() => updateGrade(batch)}
//                           className="btn btn-sm bg-color custom-bg-text ms-2"
//                         >
//                           Update
//                         </button>

//                         <button
//                           onClick={() => deleteBatch(batch.id)}
//                           className="btn btn-sm bg-color custom-bg-text ms-2"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAllBatches;

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllBatches = () => {
  const [allBatchs, setAllBatchs] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const { gradeId } = useParams();
  const navigate = useNavigate();

  const retrieveAllBatchs = async (gradeId) => {
    try {
      const endpoint =
        gradeId === "all"
          ? "http://localhost:8080/api/batch/fetch/all"
          : `http://localhost:8080/api/batch/fetch/all/grade-wise?gradeId=${gradeId}`;

      const response = await axios.get(endpoint);

      console.log("Fetched batches:", response.data);

      if (response.data.success && response.data.batchs) {
        return response.data.batchs;
      } else {
        console.warn("No batches found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allBatch = await retrieveAllBatchs(gradeId);
      setAllBatchs(allBatch);
    };

    fetchData();
  }, [gradeId]); // Added `gradeId` as a dependency

  const deleteBatch = async (batchId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/batch/delete?batchId=${batchId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin_jwtToken}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success(result.responseMessage, { position: "top-center", autoClose: 1000 });
        setAllBatchs(allBatchs.filter(batch => batch.id !== batchId)); // Remove from state
      } else {
        toast.error(result.responseMessage, { position: "top-center", autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error deleting batch:", error);
      toast.error("It seems the server is down", { position: "top-center", autoClose: 1000 });
    }
  };

  const updateGrade = (batch) => {
    navigate("/admin/batch/update", { state: batch });
  };

  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "45rem" }}>
        <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
          <h2>All Batches</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Batch Id</th>
                  <th scope="col">Batch Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allBatchs.length > 0 ? (
                  allBatchs.map((batch) => (
                    <tr key={batch.id}>
                      <td><b>{batch.id}</b></td>
                      <td><b>{batch.name}</b></td>
                      <td><b>{batch.description}</b></td>
                      <td><b>{batch.grade ? batch.grade.name : "No Grade"}</b></td> {/* FIXED NULL ISSUE */}
                      <td>
                        <button onClick={() => updateGrade(batch)} className="btn btn-sm bg-color custom-bg-text ms-2">
                          Update
                        </button>
                        <button onClick={() => deleteBatch(batch.id)} className="btn btn-sm bg-color custom-bg-text ms-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5"><b>No batches available</b></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllBatches;

