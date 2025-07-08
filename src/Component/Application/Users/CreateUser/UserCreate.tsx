import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CreateNewProjectForm from "./CreateNewProjectForm";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Project, ProjectCreates } from "../../../../utils/Constant";
import { useLocation } from "react-router-dom";
const UserCreateContainer = () => {
  const location = useLocation();
  const currentPathname = location.pathname;
  return (
    <>
      <Breadcrumbs
        mainTitle={
          currentPathname === "/authors/add" ? "Author Create" : "User Create"
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
    </>
  );
};

export default UserCreateContainer;
