import React from "react";
import { Col, Row, Card, Pagination, Spin } from "antd";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import Layout from "../components/layouts/Layout";
import { getPosts } from "../data/cms";
import MyLink from "../components/MyLink";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import ProductItem from "../components/ProductItem";

const NewsPage = ({ mainMenu, stickyMenu, loading }) => {
  const newsPosts = getPosts("news");

  return (
    <Layout
      menu={mainMenu}
      loading={loading}
      title="Мэдээ мэдээлэл"
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="w-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16}>
              <div className="page-wrapper p-3 w-100">
                <h2 className="title mb-2 upper-case">Мэдээ мэдээлэл</h2>
                {newsPosts.length > 0 ? (
                  <Row gutter={[16, 16]}>
                    {newsPosts.map((post, index) => {
                      return (
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={6}
                          key={post._id || index}
                        >
                          <ProductItem
                            id={post._id}
                            title={post.title}
                            img={post.thumbnail?.url || ""}
                            descr={post.excerpt || ""}
                            link={`/services/${post._id}`}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                ) : (
                  <div className="text-center">
                    <h3>Мэдээ олдсонгүй</h3>
                    <p>Одоогоор мэдээ байхгүй байна.</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
