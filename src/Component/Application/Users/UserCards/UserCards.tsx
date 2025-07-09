import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { H5, Image, SVG } from "../../../../AbstractElements";
import { dynamicImage } from "../../../../Service";
import { Link } from "react-router-dom";
import { Href, Users, UsersCards } from "../../../../utils/Constant";
import { userCardData } from "../../../../Data/Application/Users/UserCards/UserCards";
import SocialMediaIcons from "./SocialMediaIcons";
import UserCardsFooter from "./UserCardsFooter";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from "react";
import apiRequestHelper from "../../../../utils/apiRequestHelper";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Btn } from "../../../../AbstractElements";
import CenteredModal from "../../../Ui-Kits/Modal/CenteredModal/CenteredModal";
interface UserType {
  id: number;
  name: string;
  email?: string;
  username?: string;
  pictureUrl?: string;
  bio?: string;
}
// add any other fields your API returns
const UserCardsContainer = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const currentPathname = location.pathname;
  const handleDeleteSuccess = () => {
    setUsers((prev) => prev.filter((blog) => blog.id !== selectedBlogId));
  };
  useEffect(() => {
    const fetchUsers = async () => {
      let url;
      if (currentPathname === "/authors/cards") {
        url = "/authors";
      } else {
        url = "/users";
      }
      try {
        const response = await apiRequestHelper.get(url);
        console.log(response.data.data.users);

        setUsers(
          url === "/users"
            ? response.data.data.users
            : response.data.data.authors
        ); // Adjust based on your API structure
        console.log(users);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load users");
      }
    };

    fetchUsers();
  }, [location.pathname]);

  console.log("Current Pathname:", currentPathname);
  return (
    <>
      <Breadcrumbs mainTitle={UsersCards} parent={Users} />
      <Container fluid>
        <Row className="user-cards-items user-card-wrapper">
          {users.map((item) => (
            <Col
              xl="4"
              sm="6"
              xxl="3"
              className="col-ed-4 box-col-4"
              key={item.id}
            >
              <Card className="social-profile">
                <CardBody>
                  <div className="social-img-wrap">
                    <div className="social-img">
                      {item.pictureUrl && (
                        <img
                          src={`http://localhost:3001${item.pictureUrl}`}
                          className="img-fluid"
                          alt="user"
                        />
                      )}
                    </div>
                    <div className="edit-icon">
                      <SVG iconId="profile-check" />
                    </div>
                  </div>
                  <div className="social-details">
                    <H5 className="mb-1">
                      <Link to={Href}>{item.name}</Link>
                    </H5>
                    {item.email && (
                      <span className="f-light">{item.email}</span>
                    )}
                    {item.bio && <span className="f-light">{item.bio}</span>}
                    <SocialMediaIcons listClassName="card-social" />
                    <Row>
                      <Col>
                        <div className="text-end">
                          <Link
                            to={
                              location.pathname.includes("/authors")
                                ? `/authors/edit/${item.id}`
                                : `/users/edit/${item.id}`
                            }
                          >
                            <Btn color="success" className="me-3">
                              Edit
                            </Btn>
                          </Link>
                          <Btn
                            color="danger"
                            onClick={() => {
                              setSelectedBlogId(item.id);
                              setModalOpen(true);
                            }}
                          >
                            Delete
                          </Btn>
                        </div>
                      </Col>
                    </Row>
                    {/* <UserCardsFooter item={item} /> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {selectedBlogId !== null && (
        <CenteredModal
          isOpen={modalOpen}
          toggle={() => setModalOpen(false)}
          blogId={selectedBlogId}
          url={currentPathname === "/authors/cards" ? "/authors" : "users"}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default UserCardsContainer;
