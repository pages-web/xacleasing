import React from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row } from "antd";
import { __ } from "../utils";

const AboutGroupPage = ({ loading, mainMenu, stickyMenu }) => {
  return (
    <Layout
      loading={loading}
      title={__("Группын тухай")}
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
                    {__("Группын тухай")}
                  </h2>

                  {/* Company Mission */}
                  <Row gutter={32} className="mt-4">
                    <Col xs={24} md={12}>
                      <div className="box w-100">
                        <h3>Бидний эрхэм зорилго</h3>
                        <p>
                          ХасЛизинг компани нь Лизингийн үйлчилгээг дагнан
                          эрхлэх зорилгоор 2007 онд ТэнГэр Санхүүгийн Нэгдэл
                          ХХК-ийн хөрөнгө оруулалтаар үүсгэн байгуулагдсан
                          салбартаа тэргүүлэгч лизингийн мэргэшсэн компани юм.
                        </p>
                        <p>
                          Бид харилцагчиддаа чанартай, найдвартай санхүүгийн
                          шийдэл санал болгож, Монгол Улсын эдийн засгийн
                          хөгжилд хувь нэмрээ оруулж байна.
                        </p>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="box w-100">
                        <h3>Үнэт зүйлс</h3>
                        <ul>
                          <li>
                            <strong>Найдвартай байдал</strong> -
                            Харилцагчидтайгаа урт хугацааны найдвартай харилцаа
                            тогтооно
                          </li>
                          <li>
                            <strong>Мэргэжлийн ур чадвар</strong> - Лизингийн
                            салбарт мэргэшсэн баг
                          </li>
                          <li>
                            <strong>Шуурхай үйлчилгээ</strong> - Хурдан,
                            чанартай шийдэл санал болгоно
                          </li>
                          <li>
                            <strong>Нээлттэй байдал</strong> - Ил тод,
                            хариуцлагатай үйл ажиллагаа
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>

                  {/* Leadership Team */}
                  <Row gutter={32} className="mt-4">
                    <Col xs={24}>
                      <div className="box w-100">
                        <h3>Удирдлагын баг</h3>
                        <Row gutter={24}>
                          <Col xs={24} sm={12} md={8}>
                            <div
                              style={{ textAlign: "center", padding: "20px" }}
                            >
                              <div
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "50%",
                                  background: "#f0f0f0",
                                  margin: "0 auto 15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "24px",
                                }}
                              >
                                👨‍💼
                              </div>
                              <h4>Гүйцэтгэх захирал</h4>
                              <p style={{ fontSize: "12px" }}>
                                20+ жилийн туршлагатай санхүү, лизингийн
                                салбарын мэргэжилтэн
                              </p>
                            </div>
                          </Col>
                          <Col xs={24} sm={12} md={8}>
                            <div
                              style={{ textAlign: "center", padding: "20px" }}
                            >
                              <div
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "50%",
                                  background: "#f0f0f0",
                                  margin: "0 auto 15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "24px",
                                }}
                              >
                                👩‍💼
                              </div>
                              <h4>Санхүү хариуцсан захирал</h4>
                              <p style={{ fontSize: "12px" }}>
                                Санхүүгийн удирдлага, эрсдэлийн менежментийн
                                чиглэлээр мэргэшсэн
                              </p>
                            </div>
                          </Col>
                          <Col xs={24} sm={12} md={8}>
                            <div
                              style={{ textAlign: "center", padding: "20px" }}
                            >
                              <div
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "50%",
                                  background: "#f0f0f0",
                                  margin: "0 auto 15px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "24px",
                                }}
                              >
                                👨‍💻
                              </div>
                              <h4>Үйл ажиллагаа хариуцсан захирал</h4>
                              <p style={{ fontSize: "12px" }}>
                                Үйл ажиллагаа, процессын сайжруулалтын чиглэлээр
                                мэргэшсэн
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  {/* Services */}
                  <Row gutter={32} className="mt-4">
                    <Col xs={24} md={12}>
                      <div className="box w-100">
                        <h3>Үйлчилгээний чиглэл</h3>
                        <ul>
                          <li>Автомашины лизинг</li>
                          <li>Тоног төхөөрөмжийн лизинг</li>
                          <li>Үл хөдлөх хөрөнгийн лизинг</li>
                          <li>Ажлын байрны тоног төхөөрөмжийн лизинг</li>
                          <li>Санхүүгийн зөвлөгөө</li>
                        </ul>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="box w-100">
                        <h3>Онцлог давуу тал</h3>
                        <ul>
                          <li>Хурдан шийдвэр гаргах процесс</li>
                          <li>Уян хатан нөхцөл</li>
                          <li>Мэргэжлийн зөвлөгөө</li>
                          <li>Харилцагч төвтэй үйлчилгээ</li>
                          <li>24/7 дэмжлэг</li>
                        </ul>
                      </div>
                    </Col>
                  </Row>

                  {/* Contact Info */}
                  <Row gutter={32} className="mt-4">
                    <Col xs={24}>
                      <div className="box w-100">
                        <h3>Холбоо барих</h3>
                        <Row gutter={24}>
                          <Col xs={24} sm={8}>
                            <p>
                              <strong>Утас:</strong>
                            </p>
                            <p>18001888, 75771888</p>
                          </Col>
                          <Col xs={24} sm={8}>
                            <p>
                              <strong>И-мэйл:</strong>
                            </p>
                            <p>info@xacleasing.mn</p>
                          </Col>
                          <Col xs={24} sm={8}>
                            <p>
                              <strong>Хаяг:</strong>
                            </p>
                            <p>ХасЛизинг цамхаг, 5-р давхар, Улаанбаатар хот</p>
                          </Col>
                        </Row>
                      </div>
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
    revalidate: 300,
  };
}

export default AboutGroupPage;
