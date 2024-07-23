import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "../../MenuEditor.module.css";
import Popup from "../../../../../../shared/components/Popup";
import { removeItem } from "../../../../../../shared/services/ItensService";
import { localContextGetInfo } from "../../../../context/LocalContext";

type DeletePopupProps = {
  id?: string;
  reload?: any
};

export type DeletePopupMethods = {
  openDeletePopup: () => void;
};

/*
  Popup que aparece ao clicar no botão de deletar de um item no editor de cardapio,
  responsavel por executar ou cancelar a deleção do item.
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
    openDeletePopup: openDeletePopup,
  }))

  const handleCancel = () => {
    closeDeletePopup()
  }

  const handleConfirm = async () => {
    let result = await removeItem(localContextGetInfo("item", "id"))
    if (result.status == 200) {
      if (props.reload){
        props.reload()
      }
      closeDeletePopup() 
    }
  }

  return(
    <Popup id={props.id} visible={visible}>
      <div className={styles.DeletePopupContainer}>
        <p className={styles.DeletePopupP}>
          Deseja deletar o item {localContextGetInfo("item", "name")} do cardapio?
        </p>
        <div className={styles.DeletePopupButtonContainer}>
          <button className={styles.ConfirmButton} onClick={handleConfirm}>Confirmar</button>
          <button className={styles.CancelButton} onClick={handleCancel}>Cancelar</button>
        </div>
      </div>
    </Popup>
  )
})

export default DeletePopup;
