import React, { useState, useEffect } from "react";
import { Col, Divider, Row, Menu, Dropdown, Tabs } from "antd";
import Layout from "../components/layouts/Layout";
import { __, regex } from "../utils";
import { productLabels } from "../constants";
import ProductConditions from "../components/ProductConditions";
import MyLink from "../components/MyLink";
import FooterBtn from "../components/FooterBtn";
import SendEmail from "../components/SendEmail";
import useTranslation from "next-translate/useTranslation";
import { getPosts } from "../data/cms";

import {
  ShareAltOutlined,
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
const { TabPane } = Tabs;

const NewCarLeasing = ({ mainMenu, stickyMenu }) => {
  const { t } = useTranslation("common");
  const [width, setWidth] = useState(0);
  const [cmsPost] = getPosts("newCar");
  const post = {
    ...cmsPost,
    acf: {
      interest_rate: {
        first_value: "1.5",
        second_value: "1.8",
        gap: "0.1",
        degree: "60",
      },
      period: { value: "8", degree: "210" },
      pre_payment: { first_value: "10", gap: "10", degree: "1" },
      fee: "0.5",
      header_img: "/product-detail/sinemash.jpg",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  const renderContentChild = (value, className) => {
    let content = regex(value);
    return (
      <div
        key={className}
        className={"contentSection " + className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const renderACF = () => {
    const { acf } = post;
    if (!acf || Object.keys(acf).length === 0) return null;

    return Object.entries(acf).map(([key, value], index) => {
      if (
        key.includes("period") ||
        key.includes("fee") ||
        key.includes("interest_rate") ||
        key.includes("pre_payment") ||
        key.includes("header_img") ||
        key.includes("lease-form") ||
        key.includes("footer_btn") ||
        key.includes("labels") ||
        key.includes("btn") ||
        key.includes("img") ||
        key.includes("file")
      )
        return null;

      const label =
        acf.labels && acf.labels[key]
          ? acf.labels[key]
          : productLabels[key] || key;

      return (
        <div key={index} className="py-3">
          <Divider className="m-0" />
          <h3 className="title my-3 purple">{label}</h3>
          {renderContentChild(value, key)}
        </div>
      );
    });
  };

  const renderProductTable = () => {
    const { acf } = post;
    if (!acf) return null;

    return <ProductConditions post={post} />;
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/new-car-leasing`
      : "https://xacleasing.mn/new-car-leasing";

  const menu = (
    <Menu>
      <Menu.Item key="facebook">
        <FacebookShareButton url={shareUrl} quote={post?.title || ""}>
          <FacebookFilled style={{ fontSize: "16px", marginRight: "8px" }} />
          Facebook
        </FacebookShareButton>
      </Menu.Item>
      <Menu.Item key="twitter">
        <TwitterShareButton url={shareUrl} title={post?.title || ""}>
          <TwitterOutlined style={{ fontSize: "16px", marginRight: "8px" }} />
          Twitter
        </TwitterShareButton>
      </Menu.Item>
      <Menu.Item key="linkedin">
        <LinkedinShareButton url={shareUrl} title={post?.title || ""}>
          <LinkedinFilled style={{ fontSize: "16px", marginRight: "8px" }} />
          LinkedIn
        </LinkedinShareButton>
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    return (
      <>
        <Col span={20}>
          <ProductConditions post={post} />
        </Col>
        <Col xs={20} sm={20} lg={14}>
          <div
            align="center"
            className="my-2"
            dangerouslySetInnerHTML={{ __html: post?.content || "" }}
          />
        </Col>

        <Col span={18} className="post-detail">
          {renderACF()}
        </Col>
      </>
    );
  };

  const renderEmail = () => {
    return (
      <div className="d-flex justify-content-center">
        <SendEmail
          subject={post?.title || ""}
          content={post?.content || ""}
          acf={post?.acf || {}}
        />
      </div>
    );
  };

  const renderBackBtn = () => {
    return (
      <MyLink
        title="Буцах"
        url="/p/leasing-product"
        slug="leasing-product"
        type="c"
        className="btn btn-primary my-3"
        prefetch={false}
      />
    );
  };

  return (
    <Layout
      menu={mainMenu}
      title={post?.title}
      image={post?.acf?.header_img || post?.featured_media}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <Row justify="center pt-2">
                  <Col span={22}>
                    <h2 className="title my-2 pl-2 upper-case">
                      {post?.title}
                    </h2>
                    <img
                      className="w-100 p-1"
                      style={{
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      src={
                        post?.thumbnail?.url
                          ? post.thumbnail.url
                          : "/product-detail/sinemash.jpg"
                      }
                      alt={post?.title || "Шинэ автомашины лизинг"}
                    />
                  </Col>
                  <div className="ant-col ant-col-xs-20 ant-col-sm-20 ant-col-lg-14">
                    <div align="center" className="my-2">
                      {post?.excerpt}
                    </div>
                  </div>
                  {renderContent()}
                </Row>
                {renderEmail()}
              </div>
            </Col>
          </Row>
        </div>
        <div className="footer-content">
          <Row justify={width < 576 ? "center" : "end"} className="w-100">
            <Col xs={22} sm={12} md={10} lg={12} xl={16}>
              <Row justify="end" className="w-100">
                <Col>{renderBackBtn()}</Col>
              </Row>
            </Col>
            <Col xs={22} sm={12} md={7} lg={6} xl={4}>
              {post?.acf?.lease_form && (
                <FooterBtn
                  btn={"Түрээсийн хүсэлт илгээх"}
                  url={post.acf.lease_form}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>

      <style global jsx>{`
        .border.absolute {
          border: none;
        }
      `}</style>
    </Layout>
  );
};

// Static page generation - no server-side data fetching needed
export async function getStaticProps() {
  return {
    props: {
      // Add any static props if needed in the future
    },
  };
}

export default NewCarLeasing;
