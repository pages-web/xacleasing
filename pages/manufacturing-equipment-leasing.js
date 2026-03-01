import React, { useState, useEffect } from "react";
import { Col, Divider, Row, Menu, Dropdown, Tabs } from "antd";
import Layout from "../components/layouts/Layout";
import { __, regex } from "../utils";
import { productLabelsMap } from "../constants";
import ProductConditions from "../components/ProductConditions";
import MyLink from "../components/MyLink";
import FooterBtn from "../components/FooterBtn";
import SendEmail from "../components/SendEmail";
import useTranslation from "next-translate/useTranslation";
import { useGraphQL } from "../providers/ApolloProvider";

import {
  ShareAltOutlined,
  FacebookFilled,
  TwitterOutlined,
  LinkedinFilled,
  ProductOutlined,
} from "@ant-design/icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
const GET_NEWS_POSTS = `
  query PostList(
    $clientPortalId: String!
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $page: Int
    $perPage: Int
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cmsPostList(
      clientPortalId: $clientPortalId
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      page: $page
      perPage: $perPage
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      currentPage
      totalCount
      totalPages
      posts {
        _id
        title
        createdAt
        updatedAt
        status
        excerpt
        thumbnail {
          url
        }
        content
        customFieldsData
      }
    }
  }
`;

const GET_POST_DETAIL = `
  query Post($id: String) {
    cmsPost(_id: $id) {
      _id
      title
      content
      excerpt
      thumbnail {
        url
      }
      featured_media
      customFieldsData
    }
  }
`;
const { TabPane } = Tabs;

const ManufacturingEquipmentLeasing = ({ mainMenu, stickyMenu }) => {
  const { t } = useTranslation("common");
  const [width, setWidth] = useState(0);
  const [newsPosts, setNewsPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingNews, setLoadingNews] = useState(false);
  const [post, setPost] = useState({
    title: "",
    content: "",
    acf: {},
    featured_media: null,
  });
  const { query } = useGraphQL();

  const extractAcfFromCustomFieldsData = (customFieldsData) => {
    if (!customFieldsData) {
      return {};
    }

    if (
      typeof customFieldsData === "object" &&
      !Array.isArray(customFieldsData)
    ) {
      return customFieldsData;
    }

    if (!Array.isArray(customFieldsData)) {
      return {};
    }

    return customFieldsData.reduce((acc, item) => {
      if (!item || typeof item !== "object") {
        return acc;
      }

      const key =
        item.field ||
        item.fieldId ||
        item.fieldCode ||
        item.key ||
        item.name ||
        item._id;
      if (!key) {
        return acc;
      }

      let value = item.value;

      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.prototype.hasOwnProperty.call(value, "value")
      ) {
        value = value.value;
      }

      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          value = parsed;
        } catch (e) {
          // keep string
        }
      }

      acc[key] = value;
      return acc;
    }, {});
  };

  const staticPostData = async (
    tagIds = ["BKMP5v7WABWOZleGDUvnN"],
    clientPortalId = "cp-wzk8M6gshwVUeGnfdR",
  ) => {
    setLoadingNews(true);
    try {
      const variables = {
        tagIds,
        clientPortalId,
        type: "news",
        page: 1,
        perPage: 10,
      };
      const result = await query(GET_NEWS_POSTS, variables);
      console.log("GraphQL result:", result);
      if (result?.cmsPostList && result.cmsPostList.posts.length > 0) {
        const firstPost = result.cmsPostList.posts[0];
        console.log("First post data:", firstPost);

        let detailedPost = firstPost;
        if (firstPost?._id) {
          try {
            const detailResult = await query(GET_POST_DETAIL, {
              id: firstPost._id,
            });
            if (detailResult?.cmsPost) {
              detailedPost = detailResult.cmsPost;
            }
          } catch (e) {
            console.error("Error fetching post detail:", e);
          }
        }

        const derivedAcf = extractAcfFromCustomFieldsData(
          detailedPost?.customFieldsData,
        );

        console.log("Derived ACF:", derivedAcf);
        console.log("Derived ACF interest_rate:", derivedAcf?.interest_rate);
        console.log("Derived ACF period:", derivedAcf?.period);
        console.log("Derived ACF pre_payment:", derivedAcf?.pre_payment);

        const hasRequiredFields =
          derivedAcf?.interest_rate &&
          derivedAcf?.period &&
          derivedAcf?.pre_payment;

        setPost({
          ...detailedPost,
          acf: detailedPost?.acf || derivedAcf || {},
          acf: {
            interest_rate: {
              first_value: "1.6",
              second_value: "1.8",
              gap: "0.1",
              degree: "90",
            },
            period: { value: "4", degree: "90" },
            pre_payment: { first_value: "20", gap: "10", degree: "35" },
            fee: "0.5",
            header_img: "/product-detail/uildver.jpg",
            lease_form: "lease-app-manufacturing-equipment",
            ...derivedAcf, // Keep other fields from GraphQL
          },
        });
        setNewsPosts(result.cmsPostList.posts || []);
        setTotalCount(result.cmsPostList.totalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsPosts([]);
      setTotalCount(0);
    } finally {
      setLoadingNews(false);
    }
  };
  useEffect(() => {
    staticPostData();
  }, []);

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
          : productLabelsMap[key] || key;

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

    console.log("ACF data:", acf);
    console.log("Interest rate:", acf?.interest_rate);
    console.log("Period:", acf?.period);
    console.log("Pre payment:", acf?.pre_payment);

    return <ProductConditions post={post} />;
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/manufacturing-equipment-leasing`
      : "https://xacleasing.mn/manufacturing-equipment-leasing";

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
        <Col span={20}>{renderProductTable()}</Col>
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
                      src={`https://xacleasing.app.erxes.io/gateway/read-file?key=${post?.thumbnail?.url}`}
                      alt={post?.title}
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

export default ManufacturingEquipmentLeasing;
