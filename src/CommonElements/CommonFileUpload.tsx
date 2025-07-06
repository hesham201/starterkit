import { FC, Fragment, useState } from "react";
import Dropzone from "react-dropzone";
import { H5, P, SVG } from "../AbstractElements";

const CommonFileUpload: FC<{ multiple?: boolean }> = ({ multiple }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  const removeFile = (indexToRemove: number) => setUploadedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  return (
    <Fragment>
      {uploadedFiles.length === 0 ? (
        <Dropzone onDrop={onDrop}>
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
        <Fragment>
          {multiple && (
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="add-more-files-zone">
                  <input {...getInputProps()} />
                  <P>Click or drag more files to add</P>
                </div>
              )}
            </Dropzone>
          )}

          <div className="uploaded-files">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-card">
                {file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt={file.name} className="file-thumbnail" /> : <div className="file-placeholder">{file.name.split(".").pop()?.toUpperCase()} File</div>}
                <P className="file-name">{file.name}</P>
                <P className="file-size">{(file.size / 1024).toFixed(2)} KB</P>
                <button onClick={() => removeFile(index)} className="remove-button" title="Remove file">
                  ×
                </button>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CommonFileUpload;
