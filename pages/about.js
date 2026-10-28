import React, { useState } from "react";
import { Col, Row } from "antd";
import { Pagination } from "react-bootstrap";
import Layout from "../components/layouts/Layout";
import ReactPageScroller from "../components/react-page-scroller";
import { __ } from "../utils";
import { getPosts } from "../data/cms";

const About = ({ mainMenu, stickyMenu }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const posts = getPosts("about");

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < Math.min(posts.length, 2)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleScrollDown = () => {
    return currentPage > 0;
  };

  const paginationClicked = (event) => {
    setCurrentPage(Number(event.target.name));
  };

  const renderSubContent = (type, post) => {
    if (
      type === "img" &&
      typeof window !== "undefined" &&
      window.innerWidth > 480
    ) {
      const imageUrl = post?.thumbnail?.url || "/images/logo.png";

      return (
        <img
          className="w-full p-1 about-img"
          src={imageUrl}
          alt={post?.title || "About image"}
          onError={(e) => {
            e.target.src = "/images/logo.png"; // Fallback to existing logo
          }}
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      );
    }

    if (type === "cont") {
      return (
        <div className="p-2">
          <h2 className="upper-case title">{post?.title || "About Us"}</h2>
          <div
            align="left"
            className="my-2"
            dangerouslySetInnerHTML={{
              __html: post?.content || "Content is being loaded...",
            }}
          />
        </div>
      );
    }

    return null;
  };

  const renderContent = (post, index) => {
    if (!post) return <div>No post data available</div>;

    // Alternate layout: even index (0, 2, 4...) = image left, odd index (1, 3, 5...) = image right
    let first = index % 2 === 0 ? "img" : "cont";
    let sec = index % 2 === 0 ? "cont" : "img";

    return (
      <Row justify="center" className="w-100" align="middle">
        <Col xs={22} sm={22} md={10} lg={9} xl={8} className="my-2">
          {renderSubContent(first, post)}
        </Col>
        <Col xs={22} sm={22} md={10} lg={9} xl={8} className="my-2">
          {renderSubContent(sec, post)}
        </Col>
      </Row>
    );
  };

  const getPagesNumbers = () => {
    const pageNumbers = [];

    for (let i = 0; i < Math.min(posts.length, 2); i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          name={i}
          active={i === currentPage}
          onClick={(e) => paginationClicked(e)}
        ></Pagination.Item>,
      );
    }
    return pageNumbers;
  };

  return (
    <Layout title={__("Бидний тухай")} menu={mainMenu} stickyMenu={stickyMenu}>
      {posts.length === 0 && (
        <div
          className="no-content"
          style={{ textAlign: "center", padding: "50px" }}
        >
          <div>{__("Мэдээлэл байхгүй байна")}</div>
        </div>
      )}

      {posts.length > 0 && (
        <>
          <ReactPageScroller
            pageOnChange={handlePageChange}
            customPageNumber={currentPage}
            renderAllPagesOnFirstRender={true}
            blockScrollDown={handleScrollDown}
          >
            {posts.slice(0, 2).map((post, index) => (
              <div key={post._id || index} className="component center">
                {renderContent(post, index)}
                {index === 0 && posts.length > 1 && (
                  <div
                    className="icon-scroll"
                    onClick={() => handlePageChange(1)}
                  ></div>
                )}
              </div>
            ))}
          </ReactPageScroller>

          {posts.length > 1 && (
            <Pagination className="pagination-additional-class" size="large">
              {getPagesNumbers()}
            </Pagination>
          )}
        </>
      )}
    </Layout>
  );
};

export default About;
