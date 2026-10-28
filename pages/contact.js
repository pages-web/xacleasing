import React from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row } from "antd";
import Contact from "../components/home/contact";
import { __ } from "../utils";
import Feedback from "../components/home/feedback";
import { getPosts } from "../data/cms";

const ContactPage = ({ loading, mainMenu, stickyMenu }) => {
  const [contact] = getPosts("contact");
  const contactFields = contact?.customFieldsData || [];

  return (
    <Layout
      loading={loading}
      title={__("Холбоо барих")}
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
                    {__("Холбоо барих")}
                  </h2>
                  <Row justify="center" gutter={32} className="mt-2">
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <ul className="list-style-none contact-info">
                        <li>
                          <span>{__("УТАС") + ":"}</span>
                          <a href="tel:18001888, 75771888">
                            <p>{contactFields[0]?.value}</p>
                          </a>
                        </li>
                        <li>
                          <span>{__("ХАЯГ") + ":"}</span>
                          <p>{contactFields[2]?.value}</p>
                        </li>
                        <li>
                          <span>{__("ЦАХИМ ШУУДАН") + ":"}</span>
                          <p>
                            <a href="mailto:info@xacleasing.mn">
                              {contactFields[1]?.value}
                            </a>
                          </p>
                        </li>
                      </ul>
                    </Col>
                    <Col xs={24} md={22} sm={24} lg={12}>
                      <Feedback />
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

export default ContactPage;
