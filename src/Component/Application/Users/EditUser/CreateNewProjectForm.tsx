import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import TitleAndClientSection from "./TitleAndClientSection";
import ProjectSection from "./ProjectSection";
import UploadProjectFile from "./UploadProjectFile";
import ButtonSection from "./ButtonSection";

import {
  userValidation,
  authorValidation,
} from "../../../../Data/Application/ProjectList/ProjectList";

import { UserInitialValue } from "../../../../Types/Application/ProjectList/ProjectList";

import apiRequestHelper from "../../../../utils/apiRequestHelper";
interface AuthorInitialValue {
  name: string;
  bio: string;
  image?: File; // for new upload
  imageUrl?: string; // for previewing existing
}
const CreateNewProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const currentPathname = location.pathname;

  const isAuthor = currentPathname.includes("/authors");
  const isEditMode = currentPathname.includes("/edit");

  const [initialValues, setInitialValues] = useState<
    UserInitialValue | AuthorInitialValue
  >(
    isAuthor
      ? { name: "", bio: "", image: undefined as any }
      : { name: "", email: "", password: "", username: "" }
  );

  // Fetch user/author data for edit
  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);
  const fetchData = async (id: string) => {
    if (id) {
      try {
        const endpoint = isAuthor ? `/authors/${id}` : `/users/${id}`;
        const res = await apiRequestHelper.get(endpoint);
        const data = res.data.data[isAuthor ? "author" : "user"];
        setInitialValues((prev) => ({
          ...prev,
          ...data,
          image: undefined, // we don't set image blob from URL
        }));
      } catch (err) {
        toast.error("Failed to load data for editing.");
      }
    }
  };
  const projectSubmit = async (
    values: AuthorInitialValue | UserInitialValue
  ) => {
    let url = currentPathname.includes("/authors") ? "/authors" : "/users";

    const isAuthor = currentPathname.includes("/authors");
    const isEditMode = location.pathname.includes("/edit"); // optional logic

    try {
      let payload;

      if (isAuthor) {
        const authorValues = values as AuthorInitialValue;

        const formData = new FormData();
        formData.append("name", authorValues.name);
        formData.append("bio", authorValues.bio);

        // ✅ only append if image is a File
        if (authorValues.image instanceof File) {
          formData.append("image", authorValues.image);
        }

        payload = formData;
      } else {
        payload = values; // for user, regular JSON
      }

      const response = await apiRequestHelper.put(
        `${url}/${id}`,
        payload,
        isAuthor
      ); // third param tells backend it's multipart

      toast.success(
        `${isAuthor ? "Author" : "User"} ${
          isEditMode ? "updated" : "created"
        } successfully!`
      );

      navigate(isAuthor ? "/authors/cards" : "/users/cards");
    } catch (error: any) {
      console.error("Error submitting:", error);
      toast.error(
        error.response?.data?.messages?.[0]?.message ||
          `${currentPathname.includes("/edit") ? "Update" : "Create"} failed.`
      );
    }
  };

  return (
    <Formik<UserInitialValue | AuthorInitialValue>
      initialValues={initialValues}
      enableReinitialize
      validationSchema={isAuthor ? authorValidation : userValidation}
      onSubmit={projectSubmit}
    >
      {() => (
        <Form className="theme-form">
          <TitleAndClientSection />
          {!isAuthor && <ProjectSection />}
          {isAuthor && <UploadProjectFile />}
          <ButtonSection />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewProjectForm;
