import { ErrorMessage, Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { UsersName, UserEmail } from "../../../../utils/Constant";

const TitleAndClientSection = () => {
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
            <Label check>{UserEmail}</Label>
            <Field
              name="email"
              className="form-control"
              type="text"
              placeholder={UserEmail}
            />
            <ErrorMessage
              name="email"
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
