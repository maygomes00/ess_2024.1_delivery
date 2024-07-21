import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import styles from "./index.module.css";
import Popup from "../../../../../../shared/components/Popup";
import Button from "../../../../../../shared/components/Button";
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
    let result = removeItem(localContextGetInfo("item", "id"))
    if (props.reload){
      props.reload()
    }
    closeDeletePopup()
  }

  return(
    <Popup id={props.id} visible={visible}>
      <div className={styles.contentDiv}>
        <p className={styles.p}>
          Deseja deletar o item {localContextGetInfo("item", "name")} do cardapio?
        </p>
        <div className={styles.buttons}>
          <Button width="fit-content" padding_h="22px" padding_w="10px" border={2} hover_background="#fc2c2c" onClick={handleCancel}>Cancelar</Button>
          <Button width="fit-content" padding_h="22px" padding_w="10px" border={2} hover_background="#09d321" onClick={handleConfirm}>Confirmar</Button>
        </div>
      </div>
    </Popup>
  )
})

export default DeletePopup;
