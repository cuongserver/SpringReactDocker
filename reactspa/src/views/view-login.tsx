import React from "react";
import { Container, InputGroup, Form, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import _ from "lodash";
import { Formik, FormikProps, yupToFormErrors } from "formik";
import { userApiHandlers } from "http/config/api.user";
import { IdentityContext } from "../contexts/identity-context";
import { UserLoginResponse } from "../http/models/user-login";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  loginName: yup.string().required("required"),
  //validate using ref
  // password: yup.string().when("loginName", {
  //   is: (loginName: string) => loginName.length > 0,
  //   then: yup.string().oneOf([yup.ref("loginName")], "zzzzz"),
  // }),
  //validate using context
  // password: yup.string().test("confirm", "zzzz", (value, context) => {
  //   if (_.isEmpty(value)) return true;
  //   return value === (context.options.context as FormData).loginName;
  // }),
});

interface FormData {
  loginName: string;
  password: string;
}

const ViewLogin: React.FC = () => {
  const ctx = React.useContext(IdentityContext)!;
  const history = useHistory();
  const cardStyle: React.CSSProperties = {
    height: "auto",
    width: 300,
    backgroundColor: "rgb(255,255,255,0.8)",
  };

  const formData: FormData = {
    loginName: "",
    password: "",
  };

  const validateForm = async () => {
    const form = validator.current!;
    try {
      await schema.validate(form.values, {
        abortEarly: false,
        context: form.values,
      });
      return true;
    } catch (errors) {
      form.setErrors(yupToFormErrors(errors));
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    const form = validator.current!;
    if (!isValid) return;
    const res = await userApiHandlers.doLogin({
      ...form.values,
    });
    if (
      (res! as any).hasError === undefined &&
      (res as UserLoginResponse).result !== null
    ) {
      ctx.setValue({
        jwt: (res as UserLoginResponse).result!.jwt,
        displayName: (res as UserLoginResponse).result!.displayName,
        isLoggedIn: true,
      });
      history.push("/");
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
                  variant="success"
                  className="m-t-10 m-b-40"
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
export default React.memo(ViewLogin);
