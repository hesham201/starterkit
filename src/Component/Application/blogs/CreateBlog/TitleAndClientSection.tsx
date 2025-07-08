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
            <Label check>Title</Label>
            <Field
              name="title"
              type="text"
              className="form-control"
              placeholder={"title"}
            />
            <ErrorMessage
              name="title"
              component="span"
              className="text-danger"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label check>Slug</Label>
            <Field
              name={"slug"}
              className="form-control"
              type="text"
              placeholder={"slug"}
            />
            <ErrorMessage
              name={"slug"}
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
