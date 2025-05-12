import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/json": [".har"] },
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer bg-white hover:bg-gray-50 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>파일을 놓아주세요.</p> : <p>HAR 파일을 업로드하거나 드래그하세요</p>}
    </div>
  );
};
export default FileUpload;
