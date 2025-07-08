import { Col, FormGroup, Label, Row } from "reactstrap";
import { ErrorMessage, Field } from "formik";
import apiRequestHelper from "../../../../utils/apiRequestHelper";
import { useEffect, useState } from "react";
interface Author {
  id: string;
  name: string;
}
const AuthorSection = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await apiRequestHelper.get("/authors");
        setAuthors(response.data.data.authors); // assuming response.data is an array of authors
      } catch (error: unknown) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);
  return (
    <FormGroup>
      <Label check>Author</Label>
      <Field name="authorId" as="select" className="form-control">
        <option value="">Select Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </Field>
    </FormGroup>
  );
};

export default AuthorSection;
