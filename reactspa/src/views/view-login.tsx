import React from "react";
import { Container, InputGroup, Form, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import _ from "lodash";
import { Formik, FormikProps, yupToFormErrors } from "formik";

const schema = yup.object().shape({
  loginName: yup.string().required("required"),
});

interface FormData {
  loginName: string;
  password: string;
}

const ViewLogin: React.FC = () => {
  const cardStyle: React.CSSProperties = {
    height: 400,
    width: 300,
    backgroundColor: "rgba(255,255,255,0.8)",
  };

  const formData: FormData = {
    loginName: "",
    password: "",
  };

  const handleSubmit = async () => {
    const form = validator.current!;
    try {
      await schema.validate(form.values, {
        abortEarly: false,
      });
      return true;
    } catch (errors) {
      form.setErrors(yupToFormErrors(errors));
      return false;
    }
  };

  const validator = React.useRef<FormikProps<FormData>>(null);

  const formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = validator.current!;
    const target = e.currentTarget;
    const path = target.name;
    form.handleChange(e);
    const errors = { ...form.errors };
    _.set(errors, path, undefined);
    form.setErrors(errors);
    form.handleChange(e);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={formData}
        onSubmit={() => {}}
        validationSchema={schema}
        innerRef={validator}
        validateOnChange={false}
      >
        {(formikProps: FormikProps<FormData>) => {
          const { values, errors } = formikProps;
          return (
            <Container fluid className="h-full flex-c-m">
              <Card style={cardStyle} className="p-l-10 p-r-10 p-t-5 p-b-5">
                <InputGroup>
                  <Form.Group controlId="loginName" className="w-full m-b-5">
                    <Form.Label className="text-success">Login name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter login name"
                      isInvalid={errors.loginName !== undefined}
                      value={values.loginName}
                      onChange={formHandleChange}
                      name="loginName"
                    />
                    <Form.Text className="text-danger">
                      {errors.loginName !== undefined
                        ? errors.loginName
                        : "\xa0"}
                    </Form.Text>
                  </Form.Group>
                </InputGroup>
                <InputGroup>
                  <Form.Group controlId="password" className="w-full">
                    <Form.Label className="text-success">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter email"
                      isInvalid={errors.password !== undefined}
                      value={values.password}
                      onChange={formHandleChange}
                      name="password"
                    />
                    <Form.Text className="text-danger">
                      {errors.password !== undefined ? errors.password : "\xa0"}
                    </Form.Text>
                  </Form.Group>
                </InputGroup>
                <Button
                  variant="outline-success"
                  className="m-t-10"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Card>
            </Container>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
export default ViewLogin;
