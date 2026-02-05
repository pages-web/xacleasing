import React from "react";
import Layout from "../../components/layouts/Layout";
import { Col, Row, Card } from "antd";
import { __ } from "../../utils";

const HRPage = ({ loading, mainMenu, stickyMenu }) => {
  const jobPositions = [
    {
      id: 1,
      title: "Борлуулалтын менежер",
      department: "Борлуулалт",
      location: "Улаанбаатар",
      type: "Бүтэн цагийн",
      description: "Лизингийн бүтээгдэхүүн борлуулах, харилцагчидтай харилцах",
    },
    {
      id: 2,
      title: "Санхүүгийн шинжээч",
      department: "Санхүү",
      location: "Улаанбаатар",
      type: "Бүтэн цагийн",
      description: "Санхүүгийн тайлан бэлтгэх, шинжилгээ хийх",
    },
    {
      id: 3,
      title: "Хүний нөөцийн мэргэжилтэн",
      department: "Хүний нөөц",
      location: "Улаанбаатар",
      type: "Бүтэн цагийн",
      description: "Ажилтан сонгон шалгаруулах, сургалт зохион байгуулах",
    },
  ];

  return (
    <Layout
      loading={loading}
      title={__("Хүний нөөц")}
      menu={mainMenu}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <div className="page-wrapper p-3 w-100">
                  <h2 className="mb-2 upper-case title">{__("Хүний нөөц")}</h2>
                  <p className="mb-4">
                    ХасЛизинг компанид ажиллах боломжтой ажлын байрууд
                  </p>

                  {jobPositions.length > 0 ? (
                    <Row gutter={[16, 16]}>
                      {jobPositions.map((job) => (
                        <Col xs={24} sm={24} md={12} lg={8} key={job.id}>
                          <Card
                            title={job.title}
                            bordered={true}
                            hoverable
                            style={{ height: "100%" }}
                          >
                            <p>
                              <strong>Хэлтэс:</strong> {job.department}
                            </p>
                            <p>
                              <strong>Байршил:</strong> {job.location}
                            </p>
                            <p>
                              <strong>Төрөл:</strong> {job.type}
                            </p>
                            <p style={{ marginTop: "12px" }}>
                              {job.description}
                            </p>
                            <a
                              href={`/career/${job.id}`}
                              className="btn btn-primary"
                              style={{ marginTop: "12px" }}
                            >
                              Дэлгэрэнгүй
                            </a>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        background: "#f5f5f5",
                        borderRadius: "8px",
                      }}
                    >
                      <p>Одоогоор нээлттэй ажлын байр байхгүй байна.</p>
                    </div>
                  )}

                  <div
                    className="mt-4"
                    style={{
                      padding: "20px",
                      background: "#f5f5f5",
                      borderRadius: "8px",
                    }}
                  >
                    <h4>Анкет илгээх:</h4>
                    <p>
                      Та өөрийн анкетыг{" "}
                      <a href="mailto:hr@xacleasing.mn">hr@xacleasing.mn</a>{" "}
                      хаягаар илгээнэ үү.
                    </p>
                    <p>
                      <strong>Шаардлагатай материал:</strong>
                    </p>
                    <ul>
                      <li>Анкет</li>
                      <li>Иргэний үнэмлэхний хуулбар</li>
                      <li>Боловсролын гэрчилгээний хуулбар</li>
                      <li>Ажлын туршлагын тодорхойлолт</li>
                    </ul>
                  </div>
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

export default HRPage;
