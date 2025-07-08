import SamplePage from "../Pages/SamplePage/SamplePage";
import UsersProfile from "../Pages/Application/Users/UsersProfile/UsersProfile";
import EditProfile from "../Pages/Application/Users/EditProfile/EditProfile";
import UserCards from "../Pages/Application/Users/UserCards/UserCards";
import AddUser from "../Pages/Application/Users/AddUser/AddUser";
import UserEdit from "../Component/Application/Users/EditUser/UserEdit";
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
];

export default Routes;
