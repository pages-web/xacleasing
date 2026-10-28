import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row, Modal, Card } from "antd";
import { __ } from "../utils";
import { getPosts } from "../data/cms";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewCarVendorsPage = ({ loading, mainMenu, stickyMenu }) => {
  const vendors = getPosts("vendors");
  const [activeCategory, setActiveCategory] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to get category ID based on excerpt
  const getCategoryFromExcerpt = (excerpt) => {
    switch (excerpt?.toLowerCase()) {
      case "car":
        return 2; // Шинэ автомашин нийлүүлэгч
      case "machine":
        return 3; // Машин механизм нийлүүлэгч
      case "tool":
        return 1; // Тоног төхөөрөмж нийлүүлэгч
      default:
        return 4; // Бүгд
    }
  };

  // Transform CMS data to match VendorList expected props
  const transformedVendorPosts = vendors.map((vendor) => {
    const categoryId = getCategoryFromExcerpt(vendor.excerpt);

    return {
      id: vendor._id,
      title: { rendered: vendor.title },
      content: { rendered: vendor.excerpt || "" }, // Use excerpt as content if no content
      excerpt: { rendered: vendor.excerpt || "" },
      slug: vendor.slug || vendor._id,
      categories: [categoryId], // Set category based on excerpt
      _embedded: vendor.thumbnail
        ? {
            "wp:featuredmedia": [
              {
                source_url: vendor.thumbnail.url,
              },
            ],
          }
        : {},
    };
  });

  // Count vendors by category
  const getVendorCount = (categoryId) => {
    if (categoryId === 4) return transformedVendorPosts.length;
    return transformedVendorPosts.filter((vendor) =>
      vendor.categories.includes(categoryId)
    ).length;
  };

  // All categories including "Бүгд" (All)
  const allCategories = [
    { id: 4, name: `Бүгд (${getVendorCount(4)})` },
    { id: 2, name: `Шинэ автомашин нийлүүлэгч (${getVendorCount(2)})` },
    { id: 3, name: `Машин механизм нийлүүлэгч (${getVendorCount(3)})` },
    { id: 1, name: `Тоног төхөөрөмж нийлүүлэгч (${getVendorCount(1)})` },
  ];

  // Filter vendors by category
  const filteredVendors =
    activeCategory === 4
      ? transformedVendorPosts
      : transformedVendorPosts.filter(
          (vendor) =>
            vendor.categories && vendor.categories.includes(activeCategory)
        );

  // Handle vendor card click
  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    setModalVisible(true);
  };

  // Array of background colors for vendors (same as vendor-list.js)
  const backgroundColors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
  ];

  // Custom arrow components (same as vendor-list.js)
  function SamplePrevArrow({ onClick }) {
    return (
      <div className="border-round custom-arrow prv" onClick={onClick}>
        <LeftOutlined />
      </div>
    );
  }

  function SampleNextArrow({ onClick }) {
    return (
      <div className="border-round custom-arrow nxt" onClick={onClick}>
        <RightOutlined />
      </div>
    );
  }

  // Slider settings (matching vendor-list.js)
  const dataLength = filteredVendors.length;
  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    rows: dataLength > 4 ? 2 : 1,
    infinite: dataLength > 8,
    autoplay: dataLength > 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 991, settings: { slidesToShow: 2 } },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 1,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <Layout
      loading={loading}
      title={__("Шинэ автомашины борлуулагчид")}
      menu={mainMenu}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper">
        <div className="w-100 page-wrapper transparent">
          <Row justify="center" className="h-100">
            <Col xs={22} sm={22} md={20} lg={18} xl={16} className="h-100">
              <div className="page-wrapper-content h-100">
                <div className="page-wrapper p-3 w-100">
                  <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <h2 className="title pb-2 purple mt-4">
                          {__("ХАМТРАН АЖИЛЛАДАГ НИЙЛҮҮЛЭГЧ БАЙГУУЛЛАГУУД")}
                        </h2>
                      </div>
                      <Row
                        justify="center"
                        align="middle"
                        gutter={92}
                        className="mt-2 overflow"
                      >
                        <Col xs={24} sm={10} lg={8}>
                          <div
                            className="category-filter"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              alignItems: "flex-start",
                            }}
                          >
                            {allCategories.map((category) => (
                              <button
                                key={category.id}
                                type="button"
                                className={`category-btn ${activeCategory === category.id ? "active" : ""}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log(
                                    "Category clicked:",
                                    category.name,
                                    "ID:",
                                    category.id
                                  );
                                  setActiveCategory(category.id);
                                }}
                                style={{
                                  border: "none",
                                  padding: "12px 16px",
                                  margin: "4px 0",
                                  backgroundColor: "transparent",
                                  color:
                                    activeCategory === category.id
                                      ? "#fec637"
                                      : "",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                        </Col>
                        <Col xs={24} sm={14} lg={16} className="vendorlist">
                          {filteredVendors.length > 0 ? (
                            <>
                              <style jsx>{`
                                .vendor-slider .slick-slide {
                                  padding: 0 5px;
                                }

                                .vendor-slider .slick-list {
                                  margin: 0 -5px;
                                }
                              `}</style>
                              <Slider
                                className="vendor-slider"
                                {...sliderSettings}
                              >
                                {filteredVendors.map((vendor, index) => {
                                  const imageUrl =
                                    vendor._embedded?.["wp:featuredmedia"]?.[0]
                                      ?.source_url;
                                  const backgroundColor =
                                    backgroundColors[
                                      index % backgroundColors.length
                                    ];

                                  return (
                                    <div
                                      key={vendor.id}
                                      className="slider-item slider-logo vendor-with-background"
                                      style={{
                                        position: "relative",
                                        background: backgroundColor,
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        margin: "0 5px",
                                        height: "130px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow:
                                          "0 4px 15px rgba(0, 0, 0, 0.1)",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {imageUrl && (
                                        <div
                                          style={{
                                            position: "relative",
                                            zIndex: 2,
                                            borderRadius: "8px",
                                            padding: "10px",
                                            margin: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "calc(100%)",
                                            height: "calc(100%)",
                                          }}
                                        >
                                          <img
                                            className="dark-img"
                                            src={imageUrl}
                                            alt={vendor.title.rendered}
                                            style={{
                                              maxWidth: "100%",
                                              maxHeight: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                          <img
                                            className="light-img"
                                            src={imageUrl}
                                            alt={vendor.title.rendered}
                                            style={{
                                              maxWidth: "100%",
                                              maxHeight: "100%",
                                              objectFit: "contain",
                                            }}
                                          />
                                        </div>
                                      )}
                                      {!imageUrl && (
                                        <div
                                          className="vendor-placeholder"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                            fontWeight: "500",
                                            textAlign: "center",
                                            padding: "10px",
                                          }}
                                        >
                                          {vendor.title.rendered}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </Slider>
                            </>
                          ) : (
                            <div className="no-data">
                              {__("Мэдээлэл байхгүй байна")}
                            </div>
                          )}
                        </Col>
                      </Row>

                      {/* Vendor Detail Modal */}
                      <Modal
                        title={selectedVendor?.title?.rendered || ""}
                        open={modalVisible}
                        onCancel={() => setModalVisible(false)}
                        footer={null}
                        width={992}
                        wrapClassName="vendor-modal"
                      >
                        {selectedVendor && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: selectedVendor.content.rendered,
                            }}
                          />
                        )}
                      </Modal>
                  </>

                  {transformedVendorPosts.length === 0 && (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                      <p>Борлуулагч олдсонгүй</p>
                    </div>
                  )}
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
    revalidate: 300,
  };
}

export default NewCarVendorsPage;
