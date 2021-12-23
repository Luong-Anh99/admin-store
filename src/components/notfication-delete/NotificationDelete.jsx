import React, { useState } from "react";
import { Modal, Button, Space } from "antd";

import { useDispatch } from "react-redux";

const NotificationDelete = (props) => {
  const [showModal, setShowModal] = useState(false);

  const {
      handleDelete
  } = props



  const _onOk = async () => {

     props.setShowModal(!props.showModal)
     await handleDelete(props.idDelete)
  };

  const _closeModal = () =>
  {
      props.setShowModal(!props.showModal)
  }

  return (
    <div>
      <Modal
        title="Confirm delete"
        visible={props.showModal}
        onOk={_onOk}
        onCancel={_closeModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure to delete?</p>

      </Modal>
    </div>
  );
};

export default NotificationDelete;
