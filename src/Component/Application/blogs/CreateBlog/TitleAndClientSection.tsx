import { ErrorMessage, Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { UsersName, UserEmail, AuthorsBio } from "../../../../utils/Constant";
import { useLocation } from "react-router-dom";
const TitleAndClientSection = () => {
  const location = useLocation();
  const currentPathname = location.pathname;
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label check>{UsersName}</Label>
            <Field
              name="name"
              type="text"
              className="form-control"
              placeholder={UsersName}
            />
            <ErrorMessage
              name="name"
              component="span"
              className="text-danger"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label check>
              {currentPathname === "/authors/add" ? AuthorsBio : UserEmail}
            </Label>
            <Field
              name={currentPathname === "/authors/add" ? "bio" : "email"}
              className="form-control"
              type="text"
              placeholder={
                currentPathname === "/authors/add" ? "Bio" : UserEmail
              }
            />
            <ErrorMessage
              name={currentPathname === "/authors/add" ? "bio" : "email"}
              component="span"
              className="text-danger"
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default TitleAndClientSection;
