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
          tagIds: ["qXeMSV3c32q6NkS4xF7eY"],
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
    <div className="full-screen-slider">
      <Slider {...settings}>
        {data?.posts.map((slide, index) => (
          <div key={index}>
            <div
              style={{
                backgroundImage: `url(https://xacleasing.app.erxes.io/gateway/read-file?key=${slide?.thumbnail?.url})`,
                flexDirection: "column",
                display: "flex",
                width: "100vw",
                height: "100vh",
                objectFit: "contain",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row justify="center" className="w-100  relative">
                <Col xs={22} sm={22} md={20} lg={18} xl={16}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      borderRadius: "12px",
                      padding: "40px 30px",
                      color: "white",
                      minHeight: "320px",
                      width: "50%",
                    }}
                  >
                    {slide?.content ? (
                      <Link href={`/invites`}>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            color: "white",
                            padding: "6px 14px",
                            border: "1px solid #DDDDDD",
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
                    <h1
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        lineHeight: "1.4",
                        marginTop: "10px",
                      }}
                    >
                      {slide.title}
                    </h1>
                    {/* Description - hidden on small screens */}
                    <p className="slider-desc" style={{ textAlign: "justify" }}>
                      {slide.excerpt}
                    </p>
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
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </Slider>

      {/* Inline CSS */}
      <style jsx>{`
        .full-screen-slider {
          width: 100vw;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .full-screen-slider .slick-slider {
          height: 100vh;
        }

        .full-screen-slider .slick-list {
          height: 100vh;
        }

        .full-screen-slider .slick-track {
          height: 100vh;
        }

        .full-screen-slider .slick-slide > div {
          height: 100vh;
        }

        .slider-desc {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 100%;
        }

        @media (max-width: 768px) {
          .slider-desc {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default HomeSlider;
