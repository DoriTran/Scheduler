import { Paper, Modal } from "@mui/material";
import { ApIcon, ApScrollbar } from "components";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import styles from "./ApModal.module.scss";

const AppModal = ({
  // Modal controls & events
  isOpen,
  setIsOpen,
  onClose,
  // Modal contents
  header,
  children,
  footer,
  // Modal config
  hideXmark,
  maxHeight = "85vh",
  height,
  width,
  // Modal styles
  style,
  headerStyle,
  childrenStyle,
  footerStyle,
  // Modal classname
  className,
  headerClassName,
  childrenClassName,
  footerClassName,
  // Other props passing to Modal component
  ...restModalProps
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose?.();
        setIsOpen?.();
      }}
      {...restModalProps}
    >
      <Paper elevation={3} className={styles.modalPaper} sx={style}>
        {!hideXmark && (
          <ApIcon
            icon={faXmark}
            className={styles.xMark}
            onClick={() => {
              onClose?.();
              setIsOpen?.(false);
            }}
          />
        )}
        {header && (
          <div className={clsx(styles.header, headerClassName)} style={headerStyle}>
            {header}
          </div>
        )}
        <ApScrollbar maxHeight={maxHeight} noLargerHover>
          <div className={clsx(styles.children, childrenClassName)} style={{ ...childrenStyle, height, width }}>
            {children}
          </div>
        </ApScrollbar>
        {footer && (
          <div className={clsx(styles.footer, footerClassName)} style={footerStyle}>
            {footer}
          </div>
        )}
      </Paper>
    </Modal>
  );
};

export default AppModal;
