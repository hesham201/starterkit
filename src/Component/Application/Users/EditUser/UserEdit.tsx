import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./CreateNewProjectForm";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Project, ProjectCreates } from "../../../../utils/Constant";
import { useLocation } from "react-router-dom";
const UserEdit = () => {
  const location = useLocation();
  const currentPathname = location.pathname;
  return (
    <>
      <div className="page-body">
        <Breadcrumbs
          mainTitle={
            currentPathname.startsWith("/authors/edit/")
              ? "Author Edit"
              : "User Edit"
          }
          parent={Project}
        />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <CreateNewProjectForm />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserEdit;
