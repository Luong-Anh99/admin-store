import { Button, Col, Form, Input, Row, Select } from "antd";
import "./newColor.css";
//redux

//router

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;
export default function NewVoucher() {
  const [FormVoucher] = Form.useForm();

  const onFinish = () => {
    console.log("123");
  };
  const onFinishFailed = () => {
    console.log(123);
  };

  const handleChangeTypesale = (e) => {
    console.log("e");
  };

  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <div style={{ marginBottom: "20px", marginLeft: "30px" }}>
        Create voucher
      </div>
      <Form
        form={FormVoucher}
        style={{ width: "100%" }}
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 6,
              offset: 2,
            }}
          >
            <Form.Item
              label="code"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Type Sale"
              name="typeSale"
              rules={[
                { required: true, message: "Please input your typeSale!" },
              ]}
            >
              <Select defaultValue="lucy" onChange={handleChangeTypesale}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Sum value"
              name="sumValue"
              rules={[
                { required: true, message: "Please input your sumValue!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 6,
              offset: 2,
            }}
          >
            <Form.Item
              label="timeBegin"
              name="timeBegin"
              rules={[
                { required: true, message: "Please input your timeBegin!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="timeEnd"
              timeEnd="timeEnd"
              rules={[
                { required: true, message: "Please input your timeEnd!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="On Model"
              name="onModel"
              rules={[
                { required: true, message: "Please input your onModel!" },
              ]}
            >
              <Select onChange={handleChangeTypesale}>
                <Option value="product">Product</Option>
                <Option value="category">Category</Option>
                <Option value="brand">Brand</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="percent Sale"
              name="percentSale"
              rules={[
                { required: true, message: "Please input your percentSale!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Money Sale"
              name="moneySale"
              rules={[
                { required: true, message: "Please input your moneySale!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Scope sale"
              name="scopeSale"
              rules={[
                { required: true, message: "Please input your scopeSale!" },
              ]}
            >
              <Select defaultValue="lucy" onChange={handleChangeTypesale}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 14, span: 24 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
