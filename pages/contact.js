import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row } from "antd";
import Contact from "../components/home/contact";
import { __ } from "../utils";
import Feedback from "../components/home/feedback";
import { useGraphQL } from "../providers/ApolloProvider";

const GET_POSTS = `
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

const ContactPage = ({ loading, mainMenu, stickyMenu }) => {
  const { query } = useGraphQL();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const fetchPosts = async (clientPortalId = "cp-wzk8M6gshwVUeGnfdR") => {
    setLoadingPosts(true);
    try {
      const variables = {
        clientPortalId,
        categoryIds: ["L2-VehLOjQ1UbprLUFJAU"],
      };
      const result = await query(GET_POSTS, variables);
      if (result?.cmsPostList) {
        setPosts(result.cmsPostList.posts || []);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
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
                          <a href="tel:7011-2061">
                            <p>{posts[0]?.customFieldsData?.[0]?.value}</p>
                          </a>
                        </li>
                        <li>
                          <span>{__("ХАЯГ") + ":"}</span>
                          <p>{posts[0]?.customFieldsData?.[2]?.value}</p>
                        </li>
                        <li>
                          <span>{__("ЦАХИМ ШУУДАН") + ":"}</span>
                          <p>
                            <a href="mailto:info@xacleasing.mn">
                              {posts[0]?.customFieldsData?.[1]?.value}
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
