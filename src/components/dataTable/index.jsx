import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


const DataTable = ({
  apiUri,
  apiUriPut,
  apiUriDelete,
  apiUriPost,
  nameOfLU,
  universityId,
  property,
}) => {
  const [items, setItems] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const [addLU, setAddLU] = useState({
    nameOfLU: "",
    universityId: "",
    loading: "",
  });
  useEffect(() => {
    console.log(universityId);
    axios
      .get(`${apiUri(universityId) }`)
      .then((response) => {
        setItems(response.data);
        console.log(response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [addLU.loading , ]);
  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setEditFormData({ ...item });
  };
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };
  const handleCancelClick = () => {
    setEditItemId(null);
  };

  // Save the updated data
  const handleSaveClick = () => {
    axios
      .put(apiUriPut(editItemId, editFormData[nameOfLU]))
      .then(() => {
        const updatedItems = items.map((item) => {
          if (item.id === editItemId) {
            return { ...item, ...editFormData };
          }
          return item;
        });
        setItems(updatedItems);
        setEditItemId(null);

        console.log("Update successful");
      })
      .catch((error) => console.error("Error updating item:", error));
  };
  const handleDelete = (id) => {
    axios
      .delete(apiUriDelete(id))
      .then(() => {
        console.log("Deletion successful");
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    setAddLU({ ...addLU, loading: true, err: [] });
    const requestData = {
      [nameOfLU]: addLU.nameOfLU,
      universityId: universityId,
    };

    // if (!requestData.nameOfLU ||!requestData.universityId) {
    //   console.error('Invalid request data');
    // return;
    // }
    console.log("Request data:", requestData);
    axios
      .post(apiUriPost, requestData)
      .then((response) => {
        // const newItem = response.data;
        // setItems([...items, newItem]);
        setAddLU({ ...addLU, loading: false, err: [] });
        clearData();
      })
      .catch((err) => {
        console.error("Error:", err.response.data);
        setAddLU({
          ...addLU,
          loading: false,
          err: [{ message: err.response.data.message }],
        });
      });
  };
  const clearData = () => {
    setAddLU({
      nameOfLU: "",
      universityId: "",
      loading: false,
      err: [],
    });
  };
  return (
    <Fragment>
      <div className="container " dir="rtl">
        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <div className="col-10" style={{ paddingBottom: "15px" }}>
              <div className="row">
                <div className="col-6">
                  <h2 style={{ color: "red" }}>اداره {property} </h2>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
            <div className="card  ">
              <div className="card-header">
                <h4 className="card-title">اداره {property} </h4>
              </div>

              <div className="card-body">
                <div className="w-100 table-responsive">
                  <div id="example_wrapper" className="dataTables_wrapper">
                    <form>
                      <table id="example" className="display w-100 table ">
                        <thead className="table  table-hover">
                          <tr role="row" className="">
                            <th>النوع</th>
                            <th>الاجراء</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => (
                            <tr key={item.id}>
                              {editItemId === item.id ? (
                                <td>
                                  <input
                                    type="text"
                                    required
                                    name={nameOfLU}
                                    value={editFormData[nameOfLU]}
                                    onChange={handleEditFormChange}
                                  />
                                </td>
                              ) : (
                                <td>{item[nameOfLU]}</td>
                              )}
                              <td>
                                {editItemId === item.id ? (
                                  <div>
                                    <button
                                      className="btn btn-success m-3"
                                      type="button"
                                      onClick={handleSaveClick}
                                    >
                                      حفظ
                                    </button>
                                    <button
                                      className="btn btn-light m-3"
                                      type="button"
                                      onClick={handleCancelClick}
                                    >
                                      الغاء
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      className="btn btn-primary m-3"
                                      type="button"
                                      onClick={() => handleEditClick(item)}
                                    >
                                      تعديل
                                    </button>
                                    <button
                                      className="btn btn-danger m-3"
                                      type="button"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      حذف
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </form>
                    <div className=" row col-12">
                    <div className="form-group m-auto row ">
                      <label className="col-lg-2 fw-semibold fs-5 col-form-label">
                        الاسم
                      </label>
                      <div className="col-lg-4 ">

                      <div className="input-group">
                        <input
                          type="text"
                           className="form-control"
                            id="الاسم"
                          value={addLU.nameOfLU}
                          onChange={(e) =>
                            setAddLU({ ...addLU, nameOfLU: e.target.value })
                          }
                          placeholder="ادخل الاسم"
                          required
                        />
                        {addLU.nameOfLU === "" && (
                          <div style={{ color: "ed" , padding : "5px"
                           }}>االرجاء ادخال الاسم </div>
                        )}
                      </div>
                      </div>

                    </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-12 row">
                    <div className="form-group m-auto  row">
                      <label
                        className="col-lg-2 fw-semibold fs-5 col-form-label"
                        htmlFor="universityId"
                      >
                        كود الجامعة
                      </label>
                      <div className="col-lg-5 ">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            id="universityId"
                            value={addLU.universityId}
                            onChange={(e) =>
                              setAddLU({
                                ...addLU,
                                universityId: e.target.value,
                              })
                            }
                            placeholder="ادخل university ID"
                            required
                          />
                          {addLU.universityId === "" && (
                            <div style={{ color: "ed" , padding : "5px" }}>
                             الرجاء ادخال university ID
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                 
                </div> */}
                <div className="col-12">
                  <div className="row">
                    <div className="col-5 m-auto">
                      <button
                        type="submit"
                        onClick={handleAddClick}
                        className="px-4 mt-3 fw-semibold fs-5 btn btn-primary"
                      >
                        إضافة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
DataTable.displayName = "DataTable";

DataTable.propTypes = {};

export { DataTable };
