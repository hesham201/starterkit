import SamplePage from "../Pages/SamplePage/SamplePage";
import UsersProfile from "../Pages/Application/Users/UsersProfile/UsersProfile";
import EditProfile from "../Pages/Application/Users/EditProfile/EditProfile";
import UserCards from "../Pages/Application/Users/UserCards/UserCards";
const Routes = [
  // Sample Page
  { path: `/pages/samplepage`, Component: <SamplePage /> },
  // Users
  {
    path: `/users/userprofile`,
    Component: <UsersProfile />,
  },
  {
    path: `/users/useredit`,
    Component: <EditProfile />,
  },
  { path: `/users/cards`, Component: <UserCards /> },
  // authors
  {
    path: `/authors/userprofile`,
    Component: <UsersProfile />,
  },
  {
    path: `/authors/useredit`,
    Component: <EditProfile />,
  },
  { path: `/authors/cards`, Component: <UserCards /> },
];

export default Routes;
