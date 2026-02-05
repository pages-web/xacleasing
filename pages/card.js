import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row, Form, Input, Button, message } from "antd";
import { __ } from "../utils";

const CardOrderPage = ({ loading, mainMenu, stickyMenu }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      // Here you would normally send the data to your backend
      console.log("Card order submitted:", values);
      message.success("Таны хүсэлтийг амжилттай хүлээн авлаа!");
      form.resetFields();
    } catch (error) {
      message.error("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout
      loading={loading}
      title={__("Карт захиалах")}
      menu={mainMenu}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <div className="page-wrapper p-3 w-100">
                  <h2 className="mb-2 upper-case title">
                    {__("Карт захиалах")}
                  </h2>
                  <p className="mb-4">
                    ХасЛизингийн картыг захиалахыг хүсвэл доорх маягтыг бөглөнө
                    үү.
                  </p>

                  <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                      <div
                        style={{
                          padding: "20px",
                          background: "#f5f5f5",
                          borderRadius: "8px",
                          height: "100%",
                        }}
                      >
                        <h3>Картын онцлог:</h3>
                        <ul>
                          <li>Хөнгөлөлттэй үйлчилгээ</li>
                          <li>Онлайн төлбөр төлөх боломж</li>
                          <li>Урамшууллын программ</li>
                          <li>24/7 дэмжлэг</li>
                          <li>Аюулгүй, найдвартай</li>
                        </ul>

                        <div className="mt-4">
                          <h4>Холбоо барих:</h4>
                          <p>
                            Утас: <a href="tel:77007700">7700-7700</a>
                          </p>
                          <p>
                            Имэйл:{" "}
                            <a href="mailto:card@xacleasing.mn">
                              card@xacleasing.mn
                            </a>
                          </p>
                        </div>
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="Овог нэр"
                          name="fullName"
                          rules={[
                            {
                              required: true,
                              message: "Овог нэрээ оруулна уу!",
                            },
                          ]}
                        >
                          <Input placeholder="Овог нэрээ оруулна уу" />
                        </Form.Item>

                        <Form.Item
                          label="Утасны дугаар"
                          name="phone"
                          rules={[
                            {
                              required: true,
                              message: "Утасны дугаараа оруулна уу!",
                            },
                            {
                              pattern: /^[0-9]{8}$/,
                              message: "8 оронтой дугаар оруулна уу!",
                            },
                          ]}
                        >
                          <Input placeholder="99119911" />
                        </Form.Item>

                        <Form.Item
                          label="Имэйл хаяг"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Имэйл хаягаа оруулна уу!",
                            },
                            {
                              type: "email",
                              message: "Зөв имэйл хаяг оруулна уу!",
                            },
                          ]}
                        >
                          <Input placeholder="example@email.com" />
                        </Form.Item>

                        <Form.Item
                          label="Регистрийн дугаар"
                          name="registrationNumber"
                          rules={[
                            {
                              required: true,
                              message: "Регистрийн дугаараа оруулна уу!",
                            },
                          ]}
                        >
                          <Input placeholder="АА12345678" />
                        </Form.Item>

                        <Form.Item label="Нэмэлт мэдээлэл" name="note">
                          <Input.TextArea
                            rows={4}
                            placeholder="Нэмэлт мэдээлэл байвал энд бичнэ үү"
                          />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                            block
                          >
                            Захиалга илгээх
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 120,
  };
}

export default CardOrderPage;
