import { Backdrop, Box, CircularProgress, Fade, Modal } from "@mui/material";
import { useState, ReactNode } from "react";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalLoadingProps {
  isLoading?: boolean;
  children: ReactNode;
}

const ModalLoading: React.FC<ModalLoadingProps> = ({
  isLoading = false,
  children,
}) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {isLoading ? <>{children}</> : <CircularProgress />}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalLoading;
