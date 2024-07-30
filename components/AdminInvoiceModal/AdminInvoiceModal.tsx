import { useState, ChangeEvent, FC, ReactNode } from "react";
import Modal from "../Modal/Modal";
// import { pinataIpfsUpload } from "@/app/ipfs";
import { useMoralis } from "react-moralis";
import { toast } from "sonner";
import Icon from "../icon-selector/icon-selector";
import Button from "../Button/Button";

interface InvoiceModalProps {
  children: ReactNode;
  studentEnrollmentId: string;
  fetchEnrollments: () => void;
}

const InvoiceModal: FC<InvoiceModalProps> = ({
  children,
  studentEnrollmentId,
  fetchEnrollments,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFileUrl(fileUrl);
      setFile(selectedFile);
    }
  };

  const { Moralis } = useMoralis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      console.log("File uploaded:", file, fileUrl);
    }

    try {
      await Moralis.Cloud.run("updateEnrollment", {
        enrollId: studentEnrollmentId,
        data: {
          invoiceURL: fileUrl,
        },
      });

      toast.success("Invoice uploaded successfully");

      fetchEnrollments();
    } catch (error) {
      toast.error("Error uploading invoice");
    }

    setIsModalOpen(false);
  };

  return (
    <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content className="transition-all duration-300 !w-fit !min-w-fit ease-in-out">
        <form
          onSubmit={handleSubmit}
          className="max-w-96 relative p-5 border w-full shadow-lg rounded-md bg-white"
        >
          <Modal.Close className=" z-[99] absolute right-4 top-3 text-white hover:text-primary bg-secondary p-2 rounded-md">
            <Icon iconType="cancel" className="w-4" />
          </Modal.Close>
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Upload File
            </h3>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
              />
            </div>
            {fileUrl && (
              <div className="mt-4">
                {file?.type.startsWith("image/") ? (
                  <img
                    src={fileUrl}
                    alt="Uploaded Preview"
                    className="max-w-full rounded-md shadow-md"
                  />
                ) : (
                  <iframe
                    src={fileUrl}
                    title="PDF Preview"
                    className="w-full h-96"
                  ></iframe>
                )}
              </div>
            )}
            {fileUrl && (
              <Button type="submit" className="w-4/5 mt-4 mx-auto">
                Upload
              </Button>
            )}
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
};

export default InvoiceModal;
