import { ErrorMessage, Field } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import {
  FixPrice,
  High,
  Hourly,
  Low,
  Medium,
  Priority,
  PriorityPlaceholder,
  ProjectProgress,
  ProjectProgressPlaceholder,
  ProjectStatus,
  Urgent,
} from "../../../../utils/Constant";
import { useState } from "react";
const ProjectSection = () => {
  const [show, setShow] = useState(false);
  return (
    <Row>
      <Col sm="6">
        <FormGroup>
          <Label check>Username</Label>
          <Field
            name="username"
            className="form-control"
            type="text"
            placeholder={"username"}
          />
          <ErrorMessage
            name="username"
            component="span"
            className="text-danger"
          />
        </FormGroup>
      </Col>
      <Col sm="6">
        <FormGroup>
          <Label className="col-form-label">Password</Label>
          <div className="form-input position-relative">
            <Field
              type={show ? "text" : "password"}
              placeholder="*********"
              className="form-control"
              name="password"
            />
            <div
              className="show-hide"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => setShow(!show)}
            >
              <span className="show"> </span>
            </div>
          </div>
        </FormGroup>
      </Col>
    </Row>
  );
};

export default ProjectSection;
