import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ManageUsersPage = () => {
  let { id } = useParams();

  const [users, setUsers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setUsers({ ...users, loading: true });
    axios
      .get("https://localhost:7095/api/Users/GetUsers?SearchValue")
      .then((resp) => {
        setUsers({ ...users, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setUsers({
          ...users,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [users.reload]);

  const deleteUser = () => {
    axios
      .delete(
        "https://localhost:7095/api/Users?id= " + id
        // headers: {
        //   token: auth.token,
        // },
      )
      .then((resp) => {})
      .catch((err) => {});
  };

  // const updateUsers = (id) =>{
  //   alert(id)

  // }

  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate("/register");
  };
  return (
    <Fragment>
      <div className="container " dir="rtl">
        <div className="row mt-3">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <div className="col-12" style={{ paddingBottom: "15px" }}>
              <div className="row">
                <div className="col-2">
                  <h2 style={{ color: "red" }}>اداره المستخدمين </h2>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-success py-3 fw-semibold fs-5 sharp"
                    type="button"
                    onClick={handleAddUserClick}
                  >
                    اضافة مستخدم
                  </button>
                </div>
              </div>
            </div>
            <div className="card  ">
              <div className="card-header">
                <h4 className="card-title">اداره المستخدمين</h4>
              </div>

              <div className="card-body">
                <div className="w-100 table-responsive">
                  <div id="example_wrapper" className="dataTables_wrapper">
                    <form>
                      <table id="example" className="display w-100 table ">
                        <thead className="table  table-hover">
                          <tr role="row" className="">
                            <th>id</th>

                            <th>الاسم</th>
                            <th>الموبايل</th>
                            <th>الايميل</th>

                            <th>الكليات</th>

                            <th>الجامعات</th>
                            <th>الدور</th>
                            <th>تعديل</th>
                            <th>حذف</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.results.map((users) => (
                            <tr key={users.id}>
                              <td>{users.id}</td>

                              <td>{users.displayName}</td>
                              <td>{users.phoneNumber}</td>
                              <td>{users.email}</td>
                              <td>{users.faculties}</td>
                              <td>{users.universities}</td>
                              <td>{users.role}</td>

                              <td>
                                <div className="d-flex">
                                  <button
                                    // onClick={updateUsers(id)}
                                    className="btn btn-primary shadow btn-xs sharp me-1"
                                    href=""
                                  >
                                    <i className="fas fa-pen"></i>
                                  </button>
                                </div>
                              </td>

                              <td>
                                <div className="d-flex">
                                  <button
                                    onClick={deleteUser}
                                    className="btn btn-danger shadow btn-xs sharp"
                                    href=""
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </form>
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

ManageUsersPage.displayName = "ManageUsersPage";

ManageUsersPage.propTypes = {};

export { ManageUsersPage };
