import React from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";
import { getPosts } from "../../data/cms";
import Link from "next/link";

function HomeSlider() {
  const posts = getPosts("homeSlider");
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

  return (
    <div className="full-screen-slider">
      <Slider {...settings}>
        {posts.map((slide, index) => (
          <div key={index}>
            <div
              style={{
                backgroundImage: slide?.thumbnail?.url
                  ? `url(${slide.thumbnail.url})`
                  : "url(/images/back.jpg)",
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
