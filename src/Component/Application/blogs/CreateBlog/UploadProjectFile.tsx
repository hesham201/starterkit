import { Col, FormGroup, Label, Row } from "reactstrap";
import { UploadProjectFiles } from "../../../../utils/Constant";
import CommonFileUpload from "./CommonFileUpload";

const UploadProjectFile = () => {
  return (
    <Row>
      <Col>
        <FormGroup>
          <Label check>Upload Author Image</Label>
          <CommonFileUpload name="image" />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default UploadProjectFile;
