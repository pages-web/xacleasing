import React, { useState, useEffect } from "react";
import Error from "next/error";
import { Col, Divider, Row, Menu, Dropdown } from "antd";
import config, { generateLink } from "../../config";
import Layout from "../../components/layouts/Layout";
import { getData, __, regex } from "../../utils";
import MyLink from "../../components/MyLink";
import useTranslation from "next-translate/useTranslation";
import { posts, getPost } from "../../data/cms";

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

const NewsDetail = ({ category, post, loading, mainMenu, stickyMenu }) => {
  const { t } = useTranslation("common");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }, []);

  const currentPost = post;

  if (!currentPost) {
    return <Error statusCode={404} />;
  }

  const renderNewsShare = () => {
    const shareUrl = `https://xacleasing.mn/news/${currentPost.slug || currentPost._id}`;
    const shareTitle = currentPost.title?.rendered || currentPost.title || "";

    const menu = (
      <Menu>
        <Menu.Item>
          <FacebookShareButton
            url={shareUrl}
            quote={regex(shareTitle)}
            hashtag="#xacleasing"
          >
            <FacebookFilled className="mr-2" /> Facebook
          </FacebookShareButton>
        </Menu.Item>
        <Menu.Item>
          <TwitterShareButton
            url={shareUrl}
            hashtag={["#xacleasing"]}
            title={regex(shareTitle)}
          >
            <TwitterOutlined className="mr-2" /> Twitter
          </TwitterShareButton>
        </Menu.Item>
        <Menu.Item>
          <LinkedinShareButton
            url={shareUrl}
            title={regex(shareTitle)}
            source="https://xacleasing.mn/"
          >
            <LinkedinFilled className="mr-2" /> Linkedin
          </LinkedinShareButton>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="d-flex justify-content-center">
        <Dropdown overlay={menu} placement="topCenter" trigger={["click"]}>
          <div
            className="ant-btn mt-2 ml-1 d-flex"
            onClick={(e) => e.preventDefault()}
          >
            <ShareAltOutlined />
            <span className="ml-1">{t("Түгээх")}</span>
          </div>
        </Dropdown>
      </div>
    );
  };

  const renderBackBtn = () => {
    return (
      <MyLink
        title={t("Буцах")}
        slug="news"
        type="c"
        className="back-btn"
        icon
      />
    );
  };

  const postTitle = currentPost.title?.rendered || currentPost.title || "";
  const postContent =
    currentPost.content?.rendered || currentPost.content || "";
  const postImage =
    currentPost.thumbnail?.url ||
    (currentPost.images && currentPost.images[0]?.url) ||
    currentPost.featuredImage?.url ||
    getData(currentPost._embedded, "image") ||
    "";

  return (
    <Layout
      menu={mainMenu}
      loading={loading}
      title={regex(postTitle)}
      image={postImage}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <div className="w-100">
                  <h2 className="title my-2 pl-2 upper-case">
                    {regex(postTitle)}
                  </h2>
                  {postImage && (
                    <img
                      className="w-100 p-1"
                      src={postImage}
                      alt={postTitle}
                    />
                  )}
                  <div className="post-detail p-1 w-100">
                    <div
                      className="my-2"
                      dangerouslySetInnerHTML={{ __html: postContent }}
                    />
                  </div>
                </div>
                {renderNewsShare()}
              </div>
            </Col>
          </Row>
        </div>
        <div className="footer-content">
          <Row justify={width < 576 ? "center" : "end"} className="w-100">
            <Col xs={22} sm={12} md={10} lg={12} xl={16}>
              {renderBackBtn()}
            </Col>
          </Row>
        </div>
      </div>

      <style global jsx>{`
        .border.absolute {
          border: none;
        }
        .post-detail {
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: auto;
        }
        .post-detail table {
          width: 100% !important;
          max-width: 100% !important;
          table-layout: auto;
          word-wrap: break-word;
        }
        .post-detail img {
          max-width: 100% !important;
          height: auto !important;
        }
        .post-detail p,
        .post-detail div {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        @media (max-width: 768px) {
          .post-detail table {
            font-size: 12px;
          }
          .post-detail td,
          .post-detail th {
            padding: 4px !important;
            font-size: 12px;
          }
        }
      `}</style>
    </Layout>
  );
};

export async function getStaticProps(context) {
  const post = getPost(context.params?.slug);

  if (!post) {
    return { notFound: true };
  }

  const category = {
    slug: "services",
    name: "Services",
  };

  return {
    props: { post, category },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(posts).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default NewsDetail;
