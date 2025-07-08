import SamplePage from "../Pages/SamplePage/SamplePage";
import UsersProfile from "../Pages/Application/Users/UsersProfile/UsersProfile";
import EditProfile from "../Pages/Application/Users/EditProfile/EditProfile";
import UserCards from "../Pages/Application/Users/UserCards/UserCards";
import AddUser from "../Pages/Application/Users/AddUser/AddUser";
import UserEdit from "../Component/Application/Users/EditUser/UserEdit";
import AddBlog from "../Pages/Application/blogs/AddBlog/AddBlog";
import BlogCards from "../Pages/Application/blogs/BlogCards/BlogCards";
const Routes = [
  // Sample Page
  { path: `/pages/samplepage`, Component: <SamplePage /> },
  // Users
  {
    path: `/users/userprofile`,
    Component: <UsersProfile />,
  },
  {
    path: `/users/edit/:id`,
    Component: <UserEdit />,
  },
  { path: `/users/cards`, Component: <UserCards /> },
  { path: `/users/add`, Component: <AddUser /> },
  // authors
  {
    path: `/authors/userprofile`,
    Component: <UsersProfile />,
  },
  {
    path: `/authors/edit/:id`,
    Component: <UserEdit />,
  },
  { path: `/authors/cards`, Component: <UserCards /> },
  { path: `/authors/add`, Component: <AddUser /> },
  // blog
  {
    path: `/blogs/add`,
    Component: <AddBlog />,
  },
  {
    path: `/blogs/cards`,
    Component: <BlogCards />,
  },
];

export default Routes;
