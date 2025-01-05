import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
export default function MyDropzone() {
  return (
    <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="border-1 border-solid p-2">
              Click here to add files
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
