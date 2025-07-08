import { FC, Fragment, useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useField, useFormikContext } from "formik";
import { H5, P, SVG } from "../../../../AbstractElements";

interface Props {
  name: string;
  multiple?: boolean;
  existingImageUrl?: string; // 👈 for edit mode
}

const CommonFileUpload: FC<Props> = ({ name, multiple, existingImageUrl }) => {
  const [field, , helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      setPreviewUrl(URL.createObjectURL(value));
    } else if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
    }
  }, [value, existingImageUrl]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = multiple ? acceptedFiles : acceptedFiles[0];
    setValue(file);
  };

  const removeFile = () => {
    setValue(undefined);
    setPreviewUrl(null);
  };

  return (
    <Fragment>
      {!previewUrl ? (
        <Dropzone onDrop={onDrop} multiple={multiple}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="dropzone-container">
              <input {...getInputProps()} />
              <div className="dz-message needsclick">
                <SVG iconId="file-upload1" />
                <H5>Drag Files or Click to Browse</H5>
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <div className="uploaded-files">
          <div className="file-card">
            <img src={previewUrl} alt="Preview" className="file-thumbnail" />
            {value instanceof File && (
              <>
                <P className="file-name">{value.name}</P>
                <P className="file-size">{(value.size / 1024).toFixed(2)} KB</P>
              </>
            )}
            <button
              onClick={removeFile}
              className="remove-button"
              title="Remove file"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CommonFileUpload;
