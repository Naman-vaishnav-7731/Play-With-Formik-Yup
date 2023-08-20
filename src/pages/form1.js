// Implementation of Formik Form with Conditional Validations.
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik, ErrorMessage, FormikProvider } from "formik";

const intialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  address: "",
  qualification: "",
  specialization: "",
  userType: "",
};

const Form1 = () => {
  const [userType, setUserType] = useState("");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    formik.setFieldValue('userType', event.target.value);
  };

  const validationSchema = Yup.object().shape({
    userType: Yup.string().required("User Type is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone Number must be a numeric value")
      .min(10, "Phone number must be at least 10 digits")
      .max(14, "Phone number must be at most 14 digits")
      .required("Phone Number is required"),
    address: Yup.string().required("Phone Number is required"),

    // Implement here conditional yup validations
    
    qualification: Yup.string().when('userType', {
        is: 'doctor',
        then: () => Yup.string().required('Qualification is required for doctors'),
        otherwise: () => Yup.string(), // No validation for other user types
      }),
    
      specialization: Yup.string().when('userType', {
        is: 'doctor',
        then: () => Yup.string().required('Specialization is required for doctors'),
        otherwise: () => Yup.string(), // No validation for other user types
      }),
  });

  const formik = useFormik({
    initialValues: intialValues,
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  return (
    <Container
      className="d-flex align-items-center flex-column justify-content-center gap-2"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h4 className="mb-4">Formik Form with Conditional Validations</h4>
        <p>
          Conditional validation in Yup allows you to apply validation rules to
          a field based on conditions or values in other fields.
        </p>
      </div>
      <FormikProvider value={formik}>
        <div className="border p-4 mx-auto rounded">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="userType" className="mb-4 mt-3">
              <div>
                <Form.Check
                  inline
                  label="Doctor"
                  type="radio"
                  id="doctorRadio"
                  name="userType"
                  value="doctor"
                  checked={userType === "doctor"}
                  onChange={handleUserTypeChange}
                />
                <Form.Check
                  inline
                  label="Patient"
                  type="radio"
                  id="patientRadio"
                  name="userType"
                  value="patient"
                  checked={userType === "patient"}
                  onChange={handleUserTypeChange}
                />
              </div>
              <ErrorMessage name="userType" component="div" className="error  text-danger" />
            </Form.Group>
            <Row className="mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error  text-danger"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error  text-danger"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <ErrorMessage name="email" component="div" className="error  text-danger" />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error text-danger"
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="error  text-danger"
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                row={3}
              />
              <ErrorMessage
                name="address"
                component="div"
                className="error text-danger"
              />
            </Form.Group>

            <Row className="mt-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    type="text"
                    name="qualification"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.qualification}
                  />
                  <ErrorMessage
                    name="qualification"
                    component="div"
                    className="error text-danger"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.specialization}
                  />
                  <ErrorMessage
                    name="specialization"
                    component="div"
                    className="error text-danger"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </FormikProvider>
    </Container>
  );
};

export default Form1;
