import React, { useState } from "react";
import { Modal, Button, Space } from "antd";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NotificationDelete = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { handleDelete, loading, titleDis = "Confirm Delete" } = props;

  const _onOk = async () => {
    try {
      await handleDelete(props.idDelete);
      props.setShowModal(!props.showModal);
    } catch (e) {
      console.log(e);
      toast.error("Check system please!");
    }
  };

  const _closeModal = () => {
    props.setShowModal(!props.showModal);
  };

  return (
    <div>
      <Modal
        title={titleDis}
        visible={props.showModal}
        footer={null}
        // onOk={_onOk}
        onCancel={_closeModal}
        // okText="Confirm"
        // cancelText="Cancel"
      >
        <p>Are you sure ?</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={_closeModal} type="primary">
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={_onOk}
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            {titleDis}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationDelete;
