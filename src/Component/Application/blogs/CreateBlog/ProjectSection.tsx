import { Field, FieldArray, ErrorMessage } from "formik";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";

const HeadingsSection = () => {
  return (
    <FieldArray name="headings">
      {({ push, remove, form }) => (
        <div>
          <h5 className="mb-3">Headings</h5>
          {form.values.headings.map((heading: any, index: number) => (
            <div key={index} className="mb-4 border p-3 rounded">
              <Row>
                <Col sm="11">
                  <FormGroup>
                    <Label>Heading Title</Label>
                    <Field
                      name={`headings[${index}].title`}
                      className="form-control"
                      placeholder="Enter heading title"
                    />
                    <ErrorMessage
                      name={`headings[${index}].title`}
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col sm="1" className="d-flex align-items-center">
                  <Button
                    color="danger"
                    onClick={() => remove(index)}
                    type="button"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>

              <FieldArray name={`headings[${index}].paragraphs`}>
                {({ push: pushPara, remove: removePara }) => (
                  <div>
                    <h6>Paragraphs</h6>
                    {heading.paragraphs.map((_: string, pIndex: number) => (
                      <Row key={pIndex} className="mb-2">
                        <Col sm="11">
                          <Field
                            name={`headings[${index}].paragraphs[${pIndex}]`}
                            className="form-control"
                            placeholder={`Paragraph ${pIndex + 1}`}
                          />
                          <ErrorMessage
                            name={`headings[${index}].paragraphs[${pIndex}]`}
                            component="div"
                            className="text-danger"
                          />
                        </Col>
                        <Col sm="1" className="d-flex align-items-center">
                          <Button
                            color="danger"
                            onClick={() => removePara(pIndex)}
                            type="button"
                          >
                            &times;
                          </Button>
                        </Col>
                      </Row>
                    ))}

                    <Button
                      color="secondary"
                      size="sm"
                      type="button"
                      onClick={() => pushPara("")}
                    >
                      + Add Paragraph
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
          ))}

          <Button
            color="primary"
            type="button"
            onClick={() =>
              push({
                title: "",
                paragraphs: [""],
              })
            }
          >
            + Add Heading
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

export default HeadingsSection;
