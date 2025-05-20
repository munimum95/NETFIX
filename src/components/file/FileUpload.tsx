import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

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
    <section className="border-2 space-y-4 border-main-light p-8 rounded-xl">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-main p-8 rounded-xl text-center cursor-pointer bg-white hover:bg-orange-50 transition"
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center">
          <Upload className="w-10 h-10 text-main" />
        </div>
        {isDragActive ? <p>파일을 놓아주세요.</p> : <p>HAR 파일을 업로드하거나 드래그하세요</p>}
      </div>
    </section>
  );
};
export default FileUpload;
