import { Col, FormGroup, Label, Row } from "reactstrap";
import { UploadProjectFiles } from "../../../../utils/Constant";
import CommonFileUpload from "./CommonFileUpload";
import { useFormikContext } from "formik";
const UploadProjectFile = () => {
  interface AuthorInitialValue {
    name: string;
    bio: string;
    image?: File; // for new upload
    pictureUrl?: string; // for previewing existing
  }
  const { initialValues } = useFormikContext<AuthorInitialValue>();
  return (
    <Row>
      <Col>
        <FormGroup>
          <Label check>Upload Author Image</Label>
          <CommonFileUpload
            name="image"
            existingImageUrl={initialValues.pictureUrl}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default UploadProjectFile;
