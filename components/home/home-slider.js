import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import { useGraphQL } from "../../providers/ApolloProvider";
import Link from "next/link";

const GET_SERVICES_POSTS = `
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

function HomeSlider() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { query } = useGraphQL();
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await query(GET_SERVICES_POSTS, {
          clientPortalId: "cp-wzk8M6gshwVUeGnfdR",
          page: 1,
          tagIds: ["seTvhIbPgPe8oADOM2C_m"],
          perPage: 20,
        });

        if (result && result.cmsPostList) {
          setData(result.cmsPostList);
          console.log("Fetched data from GraphQL:", result.cmsPostList);
        } else {
          throw new Error("No data received from GraphQL query");
        }
      } catch (err) {
        console.error("GraphQL Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <Row justify="center" className="w-100 relative">
      <Col xs={22} sm={22} md={20} lg={18} xl={16}>
        <Slider {...settings}>
          {data?.posts.map((slide, index) => (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  borderRadius: "12px",
                  padding: "40px 30px",
                  color: "white",
                  minHeight: "320px",
                }}
              >
                {slide?.content ? (
                  <Link href={`/services/${slide.slug}`}>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        padding: "6px 14px",
                        border: "1px solid white",
                        borderRadius: "6px",
                        cursor: "pointer",
                        alignSelf: "flex-start",
                      }}
                    >
                      Хүсэлт илгээх
                    </button>
                  </Link>
                ) : (
                  <></>
                )}

                {/* Title */}
                <h1
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    lineHeight: "1.4",
                  }}
                >
                  {slide.title}
                </h1>

                {/* Description - hidden on small screens */}
                <p className="slider-desc">{slide.excerpt}</p>

                {/* Bottom Button */}
                {slide?.content ? (
                  <Link href={`/services/${slide._id}`}>
                    <button
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        width: "fit-content",
                        marginTop: "auto",
                      }}
                    >
                      Дэлгэрэнгүй
                    </button>
                  </Link>
                ) : (
                  <Link href={`/how-to-become-vendor`}>
                    <button
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        width: "fit-content",
                        marginTop: "auto",
                      }}
                    >
                      Дэлгэрэнгүй
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </Col>

      {/* Inline CSS */}
      <style jsx>{`
        .slider-desc {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 35%;
        }

        @media (max-width: 768px) {
          .slider-desc {
            display: none;
          }
        }
      `}</style>
    </Row>
  );
}

export default HomeSlider;
