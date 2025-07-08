import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Btn, H4, H6, Image, P } from "../../AbstractElements";
import { dynamicImage } from "../../Service";
import {
  CreateAccount,
  DoNotAccount,
  EmailAddress,
  ForgotPassword,
  Href,
  Password,
  RememberPassword,
  SignIn,
  SignInAccount,
  SignInWith,
} from "../../utils/Constant";
import { useState } from "react";
import { toast } from "react-toastify";
import SocialApp from "./SocialApp";
import apiRequestHelper from "../../utils/apiRequestHelper";
import { useAuth } from "../../context/AuthContext";
// import loginUser

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const SimpleLoginHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await apiRequestHelper.post(`/auth/login`, {
        email,
        password,
      });

      const data = response.data;
      console.log(data);
      // Store token and login flag
      localStorage.setItem("token", data.token); // adjust based on actual API
      localStorage.setItem("login", JSON.stringify(true));
      loginUser(data.data.user, data.data.token);
      // loginUser;

      toast.success("Login successful!");
      navigate(`/pages/samplepage`);
    } catch (error: unknown) {
      const err = error as any;
      toast.error(
        err.response?.data?.messages?.[0]?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card login-dark">
            <div>
              <div>
                <Link className="logo text-center" to={Href}>
                  <Image
                    className="img-fluid for-dark mx-auto"
                    src={dynamicImage("logo/logo.png")}
                    alt="looginpage"
                  />
                  <Image
                    className="img-fluid for-light mx-auto"
                    src={dynamicImage("logo/logo_dark.png")}
                    alt="looginpage"
                  />
                </Link>
              </div>
              <div className="login-main">
                <Form
                  className="theme-form"
                  onSubmit={(e) => SimpleLoginHandle(e)}
                >
                  <H4>{SignInAccount}</H4>
                  <P>{"Enter your email & password to login"}</P>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      type="email"
                      required
                      placeholder="Test@gmail.com"
                      value={email}
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input
                        type={show ? "text" : "password"}
                        placeholder="*********"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        name="password"
                      />
                      <div className="show-hide" onClick={() => setShow(!show)}>
                        <span className="show"> </span>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-0 form-sub-title position-relative">
                    <div className="checkbox p-0">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" htmlFor="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <Link
                      className="forgot-link"
                      to={`${process.env.PUBLIC_URL}/pages/samplepage`}
                    >
                      {ForgotPassword}
                    </Link>
                    <div className="text-end mt-3">
                      <Btn color="primary" block className="w-100">
                        {SignIn}
                      </Btn>
                    </div>
                  </FormGroup>
                  <H6 className="text-muted mt-4 or">{SignInWith}</H6>
                  <SocialApp />
                  <P className="mt-4 mb-0 text-center">
                    {DoNotAccount}
                    <Link
                      className="ms-2"
                      to={`${process.env.PUBLIC_URL}/pages/samplepage`}
                    >
                      {CreateAccount}
                    </Link>
                  </P>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
