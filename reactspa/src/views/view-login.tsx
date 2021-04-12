import React from "react";
import { Container, InputGroup, Form, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import _ from "lodash";
import { Formik, FormikProps, yupToFormErrors } from "formik";
import { userApiHandlers } from "http/config/api.user";
import {
  UserLoginResponse,
  UserLoginWithOtpResponse,
} from "http/models/user-login";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IdentityMutation } from "store/models/identity";

const schema = yup.object().shape({
  loginName: yup.string().required("required"),
  otp: yup.string().test("required", "required", (value, context) => {
    const ctx = context.options.context as State;
    if (!ctx.showOtpInput) return true;
    return !_.isEmpty(value);
  }),
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
  otp: string;
}

interface State {
  showOtpInput: boolean;
}

const ViewLogin: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cardStyle: React.CSSProperties = {
    height: "auto",
    width: 300,
    backgroundColor: "rgb(255,255,255,0.8)",
  };

  const [state, setState] = React.useState<State>({
    showOtpInput: false,
  });

  const formData: FormData = {
    loginName: "",
    password: "",
    otp: "",
  };

  const validateForm = async () => {
    const form = validator.current!;
    try {
      await schema.validate(form.values, {
        abortEarly: false,
        context: state,
      });
      return true;
    } catch (errors) {
      form.setErrors(yupToFormErrors(errors));
      return false;
    }
  };

  const handleSubmit = async () => {
    if (state.showOtpInput) {
      await handleSubmitOtp();
      return;
    }
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
      const response = (res as UserLoginResponse).result!;
      if (response.mfaEnabled) {
        setState({
          showOtpInput: true,
        });
        return;
      }
      const action: IdentityMutation = {
        type: "IDENTITY_SET_STATE",
        payload: {
          jwt: response.jwt,
          displayName: response.displayName,
          isLoggedIn: true,
        },
      };
      dispatch(action);
      history.push("/");
    }
  };

  const handleSubmitOtp = async () => {
    const isValid = await validateForm();
    const form = validator.current!;

    if (!isValid) return;
    const res = await userApiHandlers.doLoginWithOtp({
      ...form.values,
    });
    if (
      (res! as any).hasError === undefined &&
      (res as UserLoginWithOtpResponse).result !== null
    ) {
      const response = (res as UserLoginWithOtpResponse).result!;
      const action: IdentityMutation = {
        type: "IDENTITY_SET_STATE",
        payload: {
          jwt: response.jwt,
          displayName: response.displayName,
          isLoggedIn: true,
        },
      };
      dispatch(action);
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
                {!state.showOtpInput && (
                  <React.Fragment>
                    <InputGroup>
                      <Form.Group
                        controlId="loginName"
                        className="w-full m-b-5"
                      >
                        <Form.Label className="text-success">
                          Login name
                        </Form.Label>
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
                        <Form.Label className="text-success">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter email"
                          isInvalid={errors.password !== undefined}
                          value={values.password}
                          onChange={formHandleChange}
                          name="password"
                        />
                        <Form.Text className="text-danger">
                          {errors.password !== undefined
                            ? errors.password
                            : "\xa0"}
                        </Form.Text>
                      </Form.Group>
                    </InputGroup>
                  </React.Fragment>
                )}
                {state.showOtpInput && (
                  <InputGroup>
                    <Form.Group controlId="otp" className="w-full">
                      <Form.Label className="text-success">Password</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Otp"
                        isInvalid={errors.otp !== undefined}
                        value={values.otp}
                        onChange={formHandleChange}
                        name="otp"
                      />
                      <Form.Text className="text-danger">
                        {errors.otp !== undefined ? errors.otp : "\xa0"}
                      </Form.Text>
                    </Form.Group>
                  </InputGroup>
                )}
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
