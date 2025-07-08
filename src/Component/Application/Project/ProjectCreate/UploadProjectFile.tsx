import { Col, FormGroup, Label, Row } from "reactstrap";
import { UploadProjectFiles } from "../../../../utils/Constant";
import CommonFileUpload from "../../../../CommonElements/CommonFileUpload";

const UploadProjectFile = () => {
  return (
    <Row>
      <Col>
        <FormGroup>
          <Label check>{UploadProjectFiles}</Label>
          <CommonFileUpload name="dw" />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default UploadProjectFile;
