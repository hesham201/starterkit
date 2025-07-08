import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { Form, Formik } from "formik";
import TitleAndClientSection from "./TitleAndClientSection";
import {
  userInitialValue,
  userValidation,
  authorInitialValue,
  authorValidation,
} from "../../../../Data/Application/ProjectList/ProjectList";
import ProjectSection from "./ProjectSection";
import UploadProjectFile from "./UploadProjectFile";
import ButtonSection from "./ButtonSection";
import {
  UserInitialValue,
  AuthorInitialValue,
} from "../../../../Types/Application/ProjectList/ProjectList";
import { setCreatedData } from "../../../../ReduxToolkit/Reducer/ProjectSlice";
import apiRequestHelper from "../../../../utils/apiRequestHelper";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const CreateNewProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;

  const projectSubmit = async (
    values: UserInitialValue | AuthorInitialValue
  ) => {
    try {
      const response = await apiRequestHelper.post("/blogs", values, true);

      const data = response.data;
      console.log(data);
      toast.success(
        `${
          currentPathname === "/authors/add" ? "Author" : "User"
        } created successfully!`
      );
      navigate(
        currentPathname === "/authors/add" ? `/authors/cards` : "/users/cards"
      );
    } catch (error: unknown) {
      console.error("Error submitting project:", error);
      // Optionally, show an error message to the user here
      const err = error as any;
      toast.error(
        err.response?.data?.messages?.[0]?.message || "User creation failed!."
      );
    }
  };
  return (
    <Formik<UserInitialValue | AuthorInitialValue>
      initialValues={
        currentPathname === "/authors/add"
          ? authorInitialValue
          : userInitialValue
      }
      validationSchema={
        currentPathname === "/authors/add" ? authorValidation : userValidation
      }
      onSubmit={projectSubmit}
    >
      {() => (
        <Form className="theme-form">
          <TitleAndClientSection />
          {currentPathname !== "/authors/add" && <ProjectSection />}

          {/* <DateSection />
          <DescriptionSection /> */}
          {currentPathname === "/authors/add" && <UploadProjectFile />}
          <ButtonSection />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewProjectForm;
