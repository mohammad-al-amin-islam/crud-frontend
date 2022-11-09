import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const url = `https://crud-back-end-production.up.railway.app/updateemployee/${id}`;
  const handleUpdate = (event) => {
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

    fetch(url, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(employeeDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        event.target.reset();
        alert("Updated data successfully");
        // setIsLoading(!isLoading);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="container">
      <h3 className="mt-3">Edit Informantion</h3>

      <div className="shadow w-50 mx-auto mt-5 p-3">
        <h5>Update Information</h5>
        <Form onSubmit={handleUpdate}>
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
            Update
          </Button>
          <Link className="btn btn-primary mt-3 ms-1" to="/">
            Back to home
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
