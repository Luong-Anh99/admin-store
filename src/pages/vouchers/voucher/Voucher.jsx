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

//redux

//router

//notification
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import brandApi from "../../../api//brandApi";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";
import vouchersApi from "../../../api/voucherApi";

const { Option } = Select;
const { RangePicker } = DatePicker;
export default function Voucher() {
  const [FormVoucher] = Form.useForm();
  const id = useParams();

  console.log("ed", id);

  const voucherId = id?.voucherId;

  const [typeOnModel, setTypeOnModel] = useState("Category");

  const [listData, setListData] = useState({
    categories: [],
    brands: [],
    products: [],
  });

  const [scopeSale, setScopeSale] = useState("model");

  const [loading, setLoading] = useState(false);

  const [unlimit, setUnlimit] = useState(false);

  const [typeSale, setTyppeSale] = useState("moneySale");

  const [checkData, setCheckData] = useState({
    eachProductApplyOneTime: false,
    applyOneProductOfOrder: false,
    eachUserApplyOneTime: false,
  });

  const history = useHistory();

  console.log(unlimit);

  useEffect(() => {
    const getListData = async () => {
      try {
        const resVoucherDetail = vouchersApi.get(voucherId);
        const resCate = categoryApi.getAll();
        const resBranch = brandApi.getAll();
        const resProduct = productApi.getAll();
        const res = await Promise.all([
          resCate,
          resBranch,
          resProduct,
          resVoucherDetail,
        ]);

        setListData((state) => ({
          ...state,
          categories: res[0]?.categories,
          brands: res[1]?.brands,
          products: res[2]?.products,
        }));

        const resDetail = res[3]?.promotion;
        FormVoucher.setFieldsValue({
          code: resDetail?.code,
          name: resDetail?.name,
          scopeSale: resDetail?.scopeSale,
          sumValue: resDetail?.sumValue,
          eachProductApplyOneTime: resDetail?.eachProductApplyOneTime,
          ApplyOneProductOfOrder: resDetail?.ApplyOneProductOfOrder,
          eachUserApplyOneTime: resDetail?.eachUserApplyOneTime,
          percentSale: resDetail?.percentSale,
          moneySale: resDetail?.moneySale,
          typeSale: resDetail?.typeSale,
          quantity: resDetail?.quantity,
          onModel: resDetail?.onModel,
          items: resDetail?.items?.map((item) => item._id),
          description: resDetail?.description,
          rangeTime: [
            moment(resDetail?.timeBegin, "DD/MM/yyyy"),
            moment(resDetail?.timeEnd, "DD/MM/yyyy"),
          ],
        });

        setCheckData({
          eachProductApplyOneTime: resDetail?.eachProductApplyOneTime,
          applyOneProductOfOrder: resDetail?.ApplyOneProductOfOrder,
          eachUserApplyOneTime: resDetail?.eachUserApplyOneTime,
        });

        setTyppeSale(resDetail?.typeSale);

        setScopeSale(resDetail?.scopeSale);

        setTypeOnModel(resDetail?.onModel);
        if (resDetail?.quantity === -1) setUnlimit(true);
      } catch (e) {
        console.log(e);
      }
    };
    getListData();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const tempValue = {
        ...values,
        timeBegin: moment(values.rangeTime[0]).format("yyyy-MM-DD"),
        timeEnd: moment(values.rangeTime[1]).format("yyyy-MM-DD"),
        quantity: unlimit ? -1 : values.quantity,
      };

      const res = await vouchersApi.update(voucherId, tempValue);
      FormVoucher.resetFields();
      toast.success("Success");
      history.push("/vouchers");

      console.log(tempValue);
    } catch (e) {
      console.log({ e });
      toast.error(e?.response?.data?.message);
    }
    setLoading(false);
  };
  const onFinishFailed = () => {
    console.log(123);
  };

  const handleChangeTypesale = (e) => {
    console.log(e);
    setTyppeSale(e);
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

  console.log(FormVoucher.getFieldValue("eachUserApplyOneTime"));

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
        Update voucher
      </div>
      <Form
        form={FormVoucher}
        style={{ width: "100%" }}
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
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
            {scopeSale === "sumSale" && (
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
            )}
            <Row>
              <Col style={{ paddingTop: "4px" }} span={14}>
                Each user apply one time
              </Col>
              <Col span={10}>
                <Form.Item name="eachUserApplyOneTime">
                  <Checkbox
                    onChange={(e) => {
                      FormVoucher.setFieldsValue({
                        eachUserApplyOneTime: e.target.checked,
                      });
                      setCheckData((state) => ({
                        ...state,
                        eachUserApplyOneTime: e.target.checked,
                      }));
                    }}
                    checked={checkData?.eachUserApplyOneTime}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingTop: "4px" }} span={14}>
                Apply One Product Of Order
              </Col>
              <Col span={10}>
                <Form.Item name="ApplyOneProductOfOrder">
                  <Checkbox
                    onChange={(e) => {
                      FormVoucher.setFieldsValue({
                        ApplyOneProductOfOrder: e.target.checked,
                      });
                      setCheckData((state) => ({
                        ...state,
                        applyOneProductOfOrder: e.target.checked,
                      }));
                    }}
                    checked={checkData?.applyOneProductOfOrder}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col style={{ paddingTop: "4px" }} span={14}>
                Each Product Apply One Time
              </Col>
              <Col span={10}>
                <Form.Item name="eachProductApplyOneTime">
                  <Checkbox
                    onChange={(e) => {
                      console.log(e.target.checked);
                      FormVoucher.setFieldsValue({
                        eachProductApplyOneTime: e.target.checked,
                      });
                      setCheckData((state) => ({
                        ...state,
                        eachProductApplyOneTime: e.target.checked,
                      }));
                    }}
                    checked={checkData?.eachProductApplyOneTime}
                  />
                </Form.Item>
              </Col>
            </Row>
            <p
              style={{
                padding: "9px",
                border: "1px solid gray",
                borderRadius: "3px",
                maxHeight: "178px",
                overflow: "hidden",
                overflowY: "scroll",
              }}
              dangerouslySetInnerHTML={{
                __html: `${FormVoucher.getFieldValue("description")}`,
              }}
            />
            {/* <Form.Item label="Description">
              <Input.TextArea
                rows={4}
                disabled
                dangerouslySetInnerHTML={{
                  __html: `${FormVoucher.getFieldValue("description")}`,
                }}
              />
            </Form.Item> */}
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
                onChange={(e) => console.log(e)}
                // disabledDate={disabledDate}
                rules={[
                  { required: true, message: "Please input your range time!" },
                ]}
                format="DD-MM-yyyy"
              />
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

            {typeSale === "percentSale" || typeSale === "moneyPercentSale" ? (
              <Form.Item
                label="percent Sale"
                defaultValue="0"
                name="percentSale"
                rules={[
                  {
                    required: true,
                    message: "Please input your percentSale!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            ) : (
              ""
            )}

            {typeSale === "moneySale" || typeSale === "moneyPercentSale" ? (
              <Form.Item
                label="Money Sale"
                defaultValue="0"
                name="moneySale"
                rules={[
                  {
                    required: true,
                    message: "Please input your moneySale!",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            ) : (
              ""
            )}

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
                      checked={unlimit}
                      onChange={(e) => {
                        FormVoucher.setFieldsValue({
                          quantity: unlimit ? "1" : "-1",
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
                <Form.Item label="Items" name="items">
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
