import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { Form, Formik } from "formik";
import TitleAndClientSection from "./TitleAndClientSection";
import {
  userInitialValue,
  userValidation,
} from "../../../../Data/Application/ProjectList/ProjectList";
import ProjectSection from "./ProjectSection";
import DateSection from "./DateSection";
import DescriptionSection from "./DescriptionSection";
import UploadProjectFile from "./UploadProjectFile";
import ButtonSection from "./ButtonSection";
import { UserInitialValue } from "../../../../Types/Application/ProjectList/ProjectList";
import { setCreatedData } from "../../../../ReduxToolkit/Reducer/ProjectSlice";
import apiRequestHelper from "../../../../utils/apiRequestHelper";
import { toast } from "react-toastify";
const CreateNewProjectForm = () => {
  const navigate = useNavigate();
  const { createdFormData } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const randomValue = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  const projectSubmit = async (values: UserInitialValue) => {
    try {
      const response = await apiRequestHelper.post("/users", values);

      const data = response.data;
      console.log(data);
      toast.success("User created successfully!");
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
    <Formik
      initialValues={userInitialValue}
      validationSchema={userValidation}
      onSubmit={projectSubmit}
    >
      {() => (
        <Form className="theme-form">
          <TitleAndClientSection />
          <ProjectSection />
          {/* <DateSection />
          <DescriptionSection />
          <UploadProjectFile /> */}
          <ButtonSection />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewProjectForm;
