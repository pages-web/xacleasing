import React from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row } from "antd";
import Contact from "../components/home/contact";
import { __ } from "../utils";
import { getPosts } from "../data/cms";

const BranchesPage = ({ loading, mainMenu, stickyMenu }) => {
  const branches = getPosts("branches");

  return (
    <Layout loading={loading} title={__("Салбарууд")} menu={mainMenu} stickyMenu={stickyMenu}>
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <div className="page-wrapper p-3 w-100">
                  <h2 className="mb-2 upper-case title">{__("Салбарууд")}</h2>
                  <Contact branchList={true} branches={branches} />
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

export default BranchesPage;
