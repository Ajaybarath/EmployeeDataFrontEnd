import React, { useState, useEffect } from "react";
import EmployeeService from "./EmployeeService";
import editIcon from "./write.png";
import deleteIcon from "./bin.png";
import addBtn from "./add-24px.svg";
import searchIcon from "./search.png";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([{}]);
  const [apiData, setApiData] = useState([{}]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const [editButton, setEditButton] = useState({ id: 0, status: false });

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    EmployeeService.getAllEmployees()
      .then((res) => {
        setEmployees(res.data);
        setApiData(res.data);
        console.log(res.data);
        console.log(employees);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployee = () => {
    if (id > 0) {
      EmployeeService.deleteEmployee(id)
        .then((response) => {
          getAllEmployees();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setId(0);
    setEditButton({ id: 0, status: false });
  };

  const addOrUpdateEmployee = (e) => {
    e.preventDefault();

    const employee = {
      firstName: firstName,
      lastName: lastName,
      emailId: email,
      dob: dob,
      mobile: mobile,
    };

    console.log(employee);

    if (id > 0) {
      EmployeeService.updateEmployee(id, employee)
        .then((response) => {
          console.log(response.data);
          setDefaultValue();

          getAllEmployees();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      EmployeeService.createEmployee(employee)
        .then((response) => {
          console.log(response.data);
          setDefaultValue();

          getAllEmployees();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setId(0);
    setEditButton({ id: 0, status: false });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
    if (checked) {
      setId(value);
    } else {
      setId(0);
    }

    if (!checked) {
      setId(0);
      setEditButton({ id: 0, status: false });
    }
  };

  const setDefaultValue = () => {
    setEditButton({ id: 0, status: false });
    setFirstName("");
    setLastName("");
    setMobile("");
    setEmail("");
    setDob("");
  };

  const editButtonClick = () => {
    if (id) {
      console.log(id);
      setEditButton({ id: id, status: true });
      apiData.map((employee) => {
        if (employee.id == id) {
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setMobile(employee.mobile);
          setEmail(employee.emailId);
          setDob(employee.dob);
        }
      });
    }
  };

  const cancelButtonClick = () => {
    setId(0);
    setEditButton({ id: 0, status: false });
  };

  const searchItems = () => {
    if (searchInput !== "") {
      const filteredData = apiData.filter((employee) => {
        return Object.values(employee)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setEmployees(filteredData);
    } else {
      setEmployees(apiData);
    }
  };

  return (
    <div>
      <div className="main-content">
        <div className="header-content">
          <div className="emp-detail-text">Employee List</div>
          <input
            icon="search"
            className="search-input"
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="add-button" onClick={searchItems}>
            <img src={searchIcon} alt="" />
          </button>
          <button
            className="add-button"
            onClick={() => {
              setId(0);
              setDefaultValue();
              setEditButton({ id: 0, status: true });
              console.log(editButton.status);
            }}
          >
            <img src={addBtn} alt="" />
            Add Employee
          </button>
          <img
            src={editIcon}
            alt="edit"
            className="iconBtn"
            onClick={editButtonClick}
          />
          <img
            src={deleteIcon}
            alt="delete"
            className="iconBtn"
            onClick={deleteEmployee}
          />
        </div>

        <table className="table-main" id="display">
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Mobile Number</th>
          </tr>

          {employees &&
            employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={employee.id}
                      id={employee.id}
                      onChange={handleCheckbox}
                    />
                  </td>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.emailId}</td>
                  <td>{employee.mobile}</td>
                </tr>
              );
            })}
        </table>
        {editButton.status === true && (
          <div className="form-container-main">
            <form className="form-container" action="">
              <div className="form-row">
                <div className="input-col">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="form-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-col">
                  <label>Email ID</label>
                  <input
                    type="text"
                    placeholder="Enter your email ID"
                    className="form-input"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="form-input"
                    value={lastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="input-col">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    className="form-input"
                    value={mobile}
                    required
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="input-col">
                  <label>DOB</label>
                  <input
                    type="date"
                    value={dob}
                    required
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="input-col">
                  <label>Gender</label>
                  <div className="radio-btn-grp">
                    <input type="radio" value="Male" name="gender" /> Male
                    <input type="radio" value="Female" name="gender" /> Female
                  </div>
                </div>
              </div>
              <div className="form-row">
                <button
                type="submit"
                  className="add-button edit-btn"
                  onClick={addOrUpdateEmployee}
                >
                  {editButton.id === 0 ? <>Add Employee</> : <>Edit Employee</>}
                </button>
                <button className="add-button edit-btn" onClick={cancelButtonClick}>
                  cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
