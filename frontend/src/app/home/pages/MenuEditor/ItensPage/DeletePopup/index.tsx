import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from "react";
import styles from "./index.module.css";
import Popup from "../../../../../../shared/components/Popup";
import CircularButton from "../../../../../../shared/components/CircularButton";
import { MdClose } from "react-icons/md";

type DeletePopupProps = {
  id?: string;
};

export type DeletePopupMethods = {
  openDeletePopup: () => void;
};

/*
  
*/
const DeletePopup = forwardRef<DeletePopupMethods, DeletePopupProps>((props, ref) => {
  const [visible, setVisible] = useState(false)

  const openDeletePopup = () => {
    setVisible(true)
  }

  const closeDeletePopup = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    openDeletePopup: openDeletePopup
  }))

  return(
    <Popup id={props.id} visible={visible}>
      <CircularButton onClick={closeDeletePopup}><MdClose /></CircularButton>
      AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    </Popup>
  )
})

export default DeletePopup;
