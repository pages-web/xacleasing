import React, { useState, useEffect } from "react";
import { Col, Row, Card, Pagination, Spin } from "antd";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import Layout from "../components/layouts/Layout";
import { useGraphQL } from "../providers/ApolloProvider";
import MyLink from "../components/MyLink";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import ProductItem from "../components/ProductItem";

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
      }
    }
  }
`;

const NewsPage = ({ mainMenu, stickyMenu, loading }) => {
  const { query } = useGraphQL();
  const { t } = useTranslation();

  const [newsPosts, setNewsPosts] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchNewsPosts = async (
    tagIds = ["8h_2WXZAt8ANr2FWEjlze"],
    clientPortalId = "cp-wzk8M6gshwVUeGnfdR"
  ) => {
    setLoadingNews(true);
    try {
      const variables = {
        tagIds,
        clientPortalId,
      };
      const result = await query(GET_NEWS_POSTS, variables);
      if (result?.cmsPostList) {
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
    fetchNewsPosts();
  }, []);

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
                {loadingNews ? (
                  <div className="text-center">
                    <Spin size="large" />
                  </div>
                ) : newsPosts.length > 0 ? (
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
                            img={
                              post.thumbnail?.url
                                ? `https://xacleasing.app.erxes.io/gateway/read-file?key=${post.thumbnail.url}`
                                : ""
                            }
                            descr={post.excerpt || ""}
                            slug={`/news/${post._id}`}
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
