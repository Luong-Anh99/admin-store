import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import "./newColor.css";
//redux

//router

//notification
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import brandApi from "../../../api//brandApi";
import productApi from "../../../api/productApi";
import vouchersApi from "../../../api/voucherApi";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;
export default function NewVoucher() {
  const [FormVoucher] = Form.useForm();
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const [typeOnModel, setTypeOnModel] = useState("Category");

  const [listData, setListData] = useState({
    categories: [],
    brands: [],
    products: [],
  });

  const [scopeSale, setScopeSale] = useState("model");

  const [loading, setLoading] = useState(false);

  const [unlimit, setUnlimit] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getListData = async () => {
      try {
        const resCate = categoryApi.getAll();
        const resBranch = brandApi.getAll();
        const resProduct = productApi.getAll();
        const res = await Promise.all([resCate, resBranch, resProduct]);

        setListData((state) => ({
          ...state,
          categories: res[0]?.categories,
          brands: res[1]?.brands,
          products: res[2]?.products,
        }));
      } catch (e) {
        console.log(e);
      }
    };
    getListData();
  }, []);

  console.log(listData);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const tempValue = {
        ...values,
        timeBegin: moment(values.rangeTime[0]).format("yyyy-MM-DD"),
        timeEnd: moment(values.rangeTime[1]).format("yyyy-MM-DD"),
        quantity: unlimit ? -1 : values.quantity,
      };

      console.log(values, tempValue);

      const res = await vouchersApi.add(tempValue);
      FormVoucher.resetFields();
      toast.success("Success");
      history.push("/vouchers");

      console.log(tempValue);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const onFinishFailed = () => {
    console.log(123);
  };

  const handleChangeTypesale = (e) => {
    console.log(e);
  };

  const handleChangeOnModel = (e) => {
    setTypeOnModel(e);
    FormVoucher.setFieldsValue({ items: [] });
  };

  const handleChangeScopeSale = (e) => {
    setScopeSale(e);
    FormVoucher.setFieldsValue({ items: [] });
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const handleMutilSelect = (value) => {
    console.log(`selected ${value}`);
  };

  const returnListData = () => {
    if (typeOnModel === "Category")
      return listData.categories?.map((item, index) => (
        <Option key={index} value={item._id}>
          {item.name}
        </Option>
      ));

    if (typeOnModel === "Brand")
      return listData.brands?.map((item, index) => (
        <Option key={index} value={item._id}>
          {item.name}
        </Option>
      ));

    if (typeOnModel === "Product")
      return listData.products?.map((item, index) => (
        <Option key={index} value={item._id}>
          {item.title}
        </Option>
      ));
  };

  const cancelOnclick = () => {
    FormVoucher.resetFields();
    history.push("/vouchers");
  };

  console.log(unlimit);

  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <div
        style={{
          marginBottom: "20px",
          marginLeft: "30px",
          fontSize: "24px",
          color: "green",
          fontWeight: 600,
        }}
      >
        Create voucher
      </div>
      <Form
        form={FormVoucher}
        style={{ width: "100%" }}
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          typeSale: "moneySale",
          ApplyOneProductOfOrder: true,
          eachProductApplyOneTime: true,
          eachUserApplyOneTime: true,
          onModel: "Category",
          scopeSale: "model",
          quantity: "1",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 8,
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
            </Form.Item>{" "}
            <Form.Item
              label="Scope sale"
              name="scopeSale"
              rules={[
                { required: true, message: "Please input your scopeSale!" },
              ]}
            >
              <Select defaultValue="model" onChange={handleChangeScopeSale}>
                <Option value="model">Model</Option>
                <Option value="sumSale">Sum sale</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Sum value"
              defaultValue="0"
              name="sumValue"
              rules={[
                { required: true, message: "Please input your sumValue!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Row>
              <Col style={{ paddingTop: "4px" }} span={12}>
                Each user apply one time
              </Col>
              <Col span={12}>
                <Form.Item name="eachUserApplyOneTime">
                  <Checkbox
                    onChange={(e) =>
                      FormVoucher.setFieldsValue({
                        eachUserApplyOneTime: e.target.checked,
                      })
                    }
                    defaultChecked
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingTop: "4px" }} span={12}>
                Apply One Product Of Order
              </Col>
              <Col span={12}>
                <Form.Item name="ApplyOneProductOfOrder">
                  <Checkbox
                    onChange={(e) =>
                      FormVoucher.setFieldsValue({
                        ApplyOneProductOfOrder: e.target.checked,
                      })
                    }
                    defaultChecked
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingTop: "4px" }} span={12}>
                Each Product Apply One Time
              </Col>
              <Col span={12}>
                <Form.Item name="eachProductApplyOneTime">
                  <Checkbox
                    onChange={(e) =>
                      FormVoucher.setFieldsValue({
                        eachProductApplyOneTime: e.target.checked,
                      })
                    }
                    defaultChecked
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col
            xs={{
              span: 5,
              offset: 1,
            }}
            lg={{
              span: 8,
              offset: 2,
            }}
          >
            <Form.Item
              label="Range time"
              rules={[
                { required: true, message: "Please input your timeBegin!" },
              ]}
              name="rangeTime"
            >
              <RangePicker
                style={{ width: "100%" }}
                disabledDate={disabledDate}
                rules={[
                  { required: true, message: "Please input your range time!" },
                ]}
                format="DD-MM-yyyy"
              />
            </Form.Item>

            <Form.Item
              label="percent Sale"
              defaultValue="0"
              name="percentSale"
              rules={[
                { required: true, message: "Please input your percentSale!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Money Sale"
              defaultValue="0"
              name="moneySale"
              rules={[
                { required: true, message: "Please input your moneySale!" },
              ]}
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
              <Select onChange={handleChangeTypesale}>
                <Option value="moneySale">Money sale</Option>
                <Option value="percentSale">Percen sale</Option>
                <Option value="moneyPercentSale">Money Percent sale</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <Input
                type="number"
                min={1}
                defaultValue={1}
                disabled={unlimit}
                addonAfter={
                  <span>
                    <span style={{ marginRight: "3px" }}>Unlimit</span>
                    <Checkbox
                      value={unlimit}
                      onChange={(e) => {
                        FormVoucher.setFieldsValue({
                          quantity: unlimit ? "1" : 0,
                        });
                        setUnlimit(!unlimit);
                      }}
                    />
                  </span>
                }
              />
            </Form.Item>

            {scopeSale === "model" && (
              <>
                <Form.Item
                  label="On Model"
                  name="onModel"
                  rules={[
                    { required: true, message: "Please input your onModel!" },
                  ]}
                >
                  <Select onChange={handleChangeOnModel}>
                    <Option value="Product">Product</Option>
                    <Option value="Category">Category</Option>
                    <Option value="Brand">Brand</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Items"
                  name="items"
                  rules={[
                    { required: true, message: "Please input your items!" },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleMutilSelect}
                  >
                    {returnListData()}
                  </Select>
                </Form.Item>
              </>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Form.Item>
                <Button
                  onClick={cancelOnclick}
                  style={{
                    marginRight: "20px",
                    backgroundColor: "gray",
                    color: "white",
                  }}
                  type="text"
                >
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  style={{ backgroundColor: "#0ba572", color: "white" }}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
