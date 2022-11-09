import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnsubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const surname = event.target.surname.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const employeeDetails = {
      name,
      surname,
      email,
      number,
    };
    console.log(employeeDetails);

    fetch("https://crud-back-end-production.up.railway.app/insertem", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        event.target.reset();
        setIsLoading(!isLoading);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //load data from db
  useEffect(() => {
    fetch("https://crud-back-end-production.up.railway.app/allemployee")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [isLoading]);

  const handleDeleteButton = (id) => {
    console.log(id);
    const url = `https://crud-back-end-production.up.railway.app/deleteemployee/${id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(!isLoading);
      });
  };

  return (
    <div className="container">
      <h1 className="bg-light w-75 mx-auto p-3 mt-2 rounded">
        To do assign web application
      </h1>

      <div className=" mt-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="border p-3 mt-5 bg-light rounded shadow">
              <h5>Insert Task</h5>
              <Form onSubmit={handleOnsubmit}>
                <Form.Control
                  name="name"
                  className="mt-3"
                  type="text"
                  placeholder="Enter Name"
                />
                <Form.Control
                  name="surname"
                  className="mt-3"
                  type="text"
                  placeholder="Enter Surname"
                />
                <Form.Control
                  name="email"
                  className="mt-3"
                  type="email"
                  placeholder="Enter Email"
                />
                <Form.Control
                  name="number"
                  className="mt-3"
                  type="number"
                  placeholder="Enter Phone"
                />
                <Button className="mt-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
          <div className="col-lg-8">
            <h3>All added task information</h3>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search By employee Name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Submit
              </Button>
            </InputGroup>

            {/* view loaded data  */}
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.email}</td>
                    <td>{employee.number}</td>
                    <td>
                      <Button
                        onClick={() => handleDeleteButton(employee._id)}
                        className="mt-2"
                        variant="primary"
                        type="submit"
                      >
                        Delete
                      </Button>
                      <Link
                        className="btn btn-primary mt-2 ms-1"
                        to={`/edit/${employee._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
