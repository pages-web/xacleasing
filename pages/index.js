import WPAPI from "wpapi";
import React, { useState } from "react";
import { Col, Row } from "antd";
import { Pagination } from "react-bootstrap";
import Layout from "../components/layouts/Layout";
import ReactPageScroller from "../components/react-page-scroller";
import ProductList from "../components/home/product-list";
import VendorList from "../components/home/vendor-list";
import Contact from "../components/home/contact";
import Calculator from "../components/calculator/calculator";
import config from "../config";
import { __ } from "../utils";
import Head from "next/head";
import {
  staticSliderData,
  staticSliderCategory,
} from "../data/staticSliderData";
import HomeSlider from "../components/home/home-slider";

const Index = ({
  vendorPosts,
  branches,
  products,
  vendorCategories,
  loading,
  mainMenu,
  stickyMenu,
}) => {
  const [currentPage, setCurrentPage] = useState(null);
  const paginationClicked = (event) => {
    setCurrentPage(Number(event.target.name));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBeforePageChange = (number) => {
    console.log(number);
  };

  const getPagesNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          name={i - 1}
          active={i - 1 === currentPage}
          onClick={(e) => paginationClicked(e)}
        ></Pagination.Item>
      );
    }
    return [...pageNumbers];
  };
  return (
    <>
      <Head>
        <link rel="preload" href="/images/back.jpg" as="image" />
      </Head>
      <Layout
        loading={loading}
        title={__("ХасЛизинг")}
        menu={mainMenu}
        stickyMenu={stickyMenu}
      >
        <ReactPageScroller
          pageOnChange={handlePageChange}
          onBeforePageScroll={handleBeforePageChange}
          customPageNumber={currentPage}
          renderAllPagesOnFirstRender={true}
        >
          <div className="component center" key="home-slider">
            <HomeSlider products={products} />
            <div
              className="icon-scroll"
              onClick={() => handlePageChange(1)}
            ></div>
          </div>
          <div className="component center" key="home-products">
            <ProductList products={products} />
            <div
              className="icon-scroll"
              onClick={() => handlePageChange(2)}
            ></div>
          </div>
          <div className="component center" key="home-vendors">
            <Row justify="center" className="w-100" gutter={[48, 0]}>
              <Col xs={22} sm={22} md={20} lg={18} xl={16}>
                <VendorList
                  vendorCategories={vendorCategories}
                  vendorPosts={vendorPosts}
                />
              </Col>
            </Row>
            <div
              className="icon-scroll"
              onClick={() => handlePageChange(3)}
            ></div>
          </div>
          <div className="component center" key="home-calculator">
            <Row justify="center" className="w-100 relative" gutter={[48, 0]}>
              <Col xs={22} sm={22} md={20} lg={18} xl={16}>
                <Calculator isIndex={true} />
              </Col>
            </Row>
            <div
              className="icon-scroll"
              onClick={() => handlePageChange(4)}
            ></div>
          </div>
          <div className="component center" key="home-contact">
            <Row justify="center" className="w-100 contact" gutter={[48, 0]}>
              <Col xs={22} sm={22} md={20} lg={18} xl={16}>
                <Contact branches={branches} />
              </Col>
            </Row>
          </div>
        </ReactPageScroller>
        <Pagination className="pagination-additional-class" bssize="large">
          {getPagesNumbers()}
        </Pagination>
        <style global jsx>{`
          .main-header,
          .dark .main-header {
            background: transparent;
          }
          .back-img:after {
            top: 0;
          }
          .main {
            position: relative;
            z-index: 2;
            min-height: 100vh;
          }
          .component {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 3;
          }
          .back-img {
            z-index: 0;
          }
        `}</style>
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  try {
    const wp = new WPAPI({
      endpoint: config(context.locale).apiUrl,
    });

    const vendor = await wp
      .categories()
      .slug("vendor-companies")
      .embed()
      .then((data) => data[0])
      .catch((error) => {
        console.error("Error fetching vendor categories:", error);
        return null;
      });

    // Continue with execution even if vendor is null to try fetching other data
    console.log("Vendor category found:", vendor ? vendor.name : "None");

    const [vendorPosts, vendorCategories, branches, products] =
      await Promise.allSettled([
        vendor
          ? wp.posts().categories(vendor.id).perPage(40).embed()
          : Promise.resolve([]),
        vendor
          ? wp.categories().parent(vendor.id).embed()
          : Promise.resolve([]),
        wp.posts().categories(10).embed(),
        wp.posts().categories(3).embed(),
      ]);

    console.log("API fetch results:", {
      vendorPosts: vendorPosts.status,
      vendorCategories: vendorCategories.status,
      branches: branches.status,
      products: products.status,
    });

    return {
      props: {
        vendorPosts:
          vendorPosts.status === "fulfilled" ? vendorPosts.value : [],
        branches: branches.status === "fulfilled" ? branches.value : [],
        products: products.status === "fulfilled" ? products.value : [],
        vendorCategories:
          vendorCategories.status === "fulfilled" ? vendorCategories.value : [],
        sliderCat: staticSliderCategory, // Use static data instead of WordPress
        sliders: staticSliderData, // Use static data instead of WordPress
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        vendorPosts: [],
        branches: [],
        products: [],
        vendorCategories: [],
        sliderCat: staticSliderCategory, // Use static data as fallback
        sliders: staticSliderData, // Use static data as fallback
      },
      revalidate: 300,
    };
  }
}

export default Index;
