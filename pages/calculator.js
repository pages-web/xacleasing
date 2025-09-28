import React from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row } from "antd";
import Calculator from "../components/calculator/calculator";

const CalculatorPage = ({ mainMenu, stickyMenu }) => {
  return (
    <Layout title="Calculator" menu={mainMenu} stickyMenu={stickyMenu}>
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <Row justify="center" className="pt-2">
                  <Col span={22} justify="center" className="center">
                    <Calculator isIndex={false} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorPage;
