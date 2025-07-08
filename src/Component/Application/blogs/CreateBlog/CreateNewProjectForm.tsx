import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../ReduxToolkit/Hooks";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
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
import { useLocation, useParams } from "react-router-dom";
import * as Yup from "yup";
import AuthorSection from "./AuthorSection";
interface Heading {
  title: string;
  paragraphs: any[]; // or a more specific structure if you know the shape
}
interface Blog {
  title: string;
  image: File | null;
  slug: string;
  authorId: number;
  scheduledDate?: string;
  headings: Heading[];
}
// Heading schema
const HeadingSchema = Yup.object().shape({
  title: Yup.string()
    .required("Heading title is required")
    .min(3, "Heading title must be at least 3 characters"),

  paragraphs: Yup.array()
    .of(Yup.string().required("Paragraph cannot be empty"))
    .min(1, "At least one paragraph is required"),
});
const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .required("Blog title is required")
    .min(5, "Title must be at least 5 characters"),

  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return false;

      const file = value as File;
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      );
    }),

  slug: Yup.string()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be URL-friendly (lowercase with dashes)"
    )
    .required("Slug is required"),

  authorId: Yup.number()
    .required("Author ID is required")
    .integer("Author ID must be a number"),

  scheduledDate: Yup.string()
    .nullable()
    .optional()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
      "Scheduled date must be in ISO format"
    ),

  headings: Yup.array()
    .of(HeadingSchema)
    .min(1, "At least one heading is required"),
});
const CreateNewProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPathname = location.pathname;
  const { id } = useParams(); // <-- Get blog ID if editing
  const [initialValues, setInitialValues] = useState<Blog>({
    title: "",
    image: null,
    slug: "",
    authorId: 0,
    scheduledDate: "",
    headings: [{ title: "", paragraphs: [""] }],
  });
  const isEdit = Boolean(id);
  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEdit) {
      apiRequestHelper
        .get(`/blogs/${id}`)
        .then((res) => {
          const blog = res.data.data;
          setInitialValues({
            ...blog,
            image: null, // Don't preload existing image
            headings: blog.headings.map((h: any) => ({
              title: h.title,
              paragraphs: h.paragraphs || [""],
            })),
          });
        })
        .catch((err) => {
          toast.error("Failed to fetch blog for editing.");
        });
    }
  }, [id]);

  // const initialValues = {
  //   title: "",
  //   image: null,
  //   slug: "",
  //   authorId: 0, // Replace with actual author ID if known
  //   scheduledDate: "", // or null, if you prefer using `null` for optional
  //   headings: [
  //     {
  //       title: "",
  //       paragraphs: [""], // Start with one empty paragraph
  //     },
  //   ],
  // };
  // Blog schema

  const projectSubmit = async (values: Blog) => {
    console.log(values.headings);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("authorId", values.authorId.toString());

    if (values.image) {
      formData.append("image", values.image); // ✅ required for upload
    }

    formData.append("headings", JSON.stringify(values.headings)); // ✅ send as string
    try {
      const response = await apiRequestHelper.post("/blogs", formData, true);

      const data = response.data;
      console.log(data);
      toast.success(`Blog created successfully!`);
      navigate("/blogs/cards");
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
    <Formik<Blog>
      initialValues={initialValues}
      validationSchema={BlogSchema}
      onSubmit={projectSubmit}
    >
      {() => (
        <Form className="theme-form">
          <TitleAndClientSection />
          <ProjectSection />
          <AuthorSection />
          {/* <DateSection />
          <DescriptionSection /> */}
          <UploadProjectFile />
          <ButtonSection />
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewProjectForm;
