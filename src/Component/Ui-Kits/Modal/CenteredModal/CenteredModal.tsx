import { Btn, H4, Image, P, UL, LI } from "../../../../AbstractElements";
import { Close, SomethingWentWrong } from "../../../../utils/Constant";
import { dynamicImage } from "../../../../Service";
import CommonModal from "../Common/CommonModal";
import { toast } from "react-toastify";
import apiRequestHelper from "../../../../utils/apiRequestHelper";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  blogId: number;
  onDeleteSuccess: () => void;
  url: string;
}

const CenteredModal = ({
  isOpen,
  url,
  toggle,
  blogId,
  onDeleteSuccess,
}: Props) => {
  const handleDelete = async () => {
    try {
      await apiRequestHelper.del(`${url}/${blogId}`);
      toast.success("Blog deleted successfully.");
      toggle(); // Close modal
      onDeleteSuccess(); // Notify parent to refresh list
    } catch (error: any) {
      toast.error(
        error?.response?.data?.messages?.[0]?.message ||
          "Failed to delete blog."
      );
    }
  };

  return (
    <CommonModal centered isOpen={isOpen} toggle={toggle}>
      <div className="modal-toggle-wrapper">
        <UL className="modal-img">
          <LI className="text-center">
            <Image src={dynamicImage("gif/danger.gif")} alt="error" />
          </LI>
        </UL>
        <H4 className="text-center pb-2">{SomethingWentWrong}</H4>
        <P className="text-center">
          Are you sure you want to delete this blog? This action cannot be
          undone.
        </P>
        <div className="d-flex justify-content-center gap-3">
          <Btn color="danger" onClick={handleDelete}>
            Delete
          </Btn>
          <Btn color="secondary" onClick={toggle}>
            {Close}
          </Btn>
        </div>
      </div>
    </CommonModal>
  );
};

export default CenteredModal;
