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
  title: string;
  slug: string;
  image: string;
}

// add any other fields your API returns
const BlogCardsContainer = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const currentPathname = location.pathname;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("here");
        const response = await apiRequestHelper.get("/blogs");
        console.log("after");
        console.log("response", response.data.data.blogs);

        setUsers(response.data.data.blogs); // Adjust based on your API structure
        console.log(users);
      } catch (error: any) {
        console.log("error", error.response?.data?.messages?.[0]?.message);
        toast.error(
          error.response?.data?.messages?.[0]?.message || "Failed to load Blogs"
        );
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteSuccess = () => {
    setUsers((prev) => prev.filter((blog) => blog.id !== selectedBlogId));
  };

  return (
    <>
      <Breadcrumbs mainTitle={"Blog Cards"} parent={Users} />
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
                      {item.image && (
                        <img
                          src={`http://localhost:3001${item.image}`}
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
                      <Link to={Href}>{item.title}</Link>
                    </H5>
                    {item.slug && <span className="f-light">{item.slug}</span>}
                    {/* {item.author && (
                      <span className="f-light">{item.author}</span>
                    )} */}
                    <SocialMediaIcons listClassName="card-social" />
                    <Row>
                      <Col>
                        <div className="text-end">
                          <Link to={`/blogs/edit/${item.id}`}>
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
          url={"/bogs"}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default BlogCardsContainer;
