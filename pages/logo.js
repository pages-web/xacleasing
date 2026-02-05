import React from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row } from "antd";
import { __ } from "../utils";

const DownloadLogoPage = ({ loading, mainMenu, stickyMenu }) => {
  return (
    <Layout
      loading={loading}
      title={__("Лого татах")}
      menu={mainMenu}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <div className="page-wrapper p-3 w-100">
                  <h2 className="mb-2 upper-case title">{__("Лого татах")}</h2>

                  {/* Static logo files */}
                  <Row gutter={64} className="mt-1">
                    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                      <div className="box w-100">
                        <div>
                          <h3>ХасЛизинг лого</h3>
                          <img
                            src="/images/xaclogo.png"
                            alt="XacLeasing Logo"
                            style={{
                              maxWidth: "100%",
                              height: "60px",
                              objectFit: "contain",
                              marginBottom: "10px",
                            }}
                          />
                          <p style={{ fontSize: "12px", marginBottom: "10px" }}>
                            PNG формат, 86 KB
                          </p>
                          <a
                            href="/images/xaclogo.png"
                            download="xaclogo.png"
                            className="btn btn-primary"
                          >
                            Татах
                          </a>
                        </div>
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
    revalidate: 120,
  };
}

export default DownloadLogoPage;
