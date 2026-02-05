import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { Col, Row, Tabs } from "antd";
import { __ } from "../utils";

const { TabPane } = Tabs;

const FAQPage = ({ loading, mainMenu, stickyMenu }) => {
  const [activeTab, setActiveTab] = useState("general");

  const faqCategories = {
    general: {
      title: "Санхүүгийн түгээмэлт тавигдах асуултууд",
      faqs: [
        {
          question: "Лизинг гэж юу вэ?",
          answer:
            "Лизинг нь урт хугацааны түрээс бөгөөд та өөрийн хүссэн бараа бүтээгдэхүүнийг манай компаниар дамжуулан худалдан авч, тогтоосон хугацаанд төлбөрөө төлж, эцэст нь өмчлөх эрхтэй болдог санхүүжилтийн нэг хэлбэр юм.",
        },
        {
          question: "Лизингийн давуу тал юу вэ?",
          answer:
            "Лизингийн гол давуу тал нь: 1) Урьдчилгаа багатай эсвэл огт байхгүй, 2) Урт хугацааны төлбөр, 3) Татварын хөнгөлөлт, 4) Хялбар баримт бичиг, 5) Хурдан шийдвэрлэгддэг.",
        },
        {
          question: "Хэдэн жилийн хугацаагаар лизинг авах боломжтой вэ?",
          answer:
            "Лизингийн хугацаа нь 1-5 жил хүртэл байж болно. Хугацаа нь таны сонгосон бүтээгдэхүүн болон санхүүгийн чадавхиас хамаарна.",
        },
      ],
    },
    payment: {
      title: "Төлбөрийн нөхцөлийн тавигдах асуултууд",
      faqs: [
        {
          question: "Урьдчилгаа хэдэн хувь төлөх вэ?",
          answer:
            "Урьдчилгаа нь ихэвчлэн нийт үнийн 10-30% байдаг. Гэхдээ таны санхүүгийн байдал болон лизингийн төрлөөс хамааран энэ хувь өөр байж болно.",
        },
        {
          question: "Лизингийн хүү хэд вэ?",
          answer:
            "Лизингийн хүү нь бүтээгдэхүүн, хугацаа, урьдчилгаа зэргээс хамааран өөр өөр байна. Дэлгэрэнгүй мэдээллийг манай борлуулалтын албанаас авна уу.",
        },
        {
          question: "Лизингийн төлбөрийг хэрхэн төлөх вэ?",
          answer:
            "Лизингийн төлбөрийг сар бүр тогтмол өдөр дансанд шилжүүлэх эсвэл манай оффист очиж төлөх боломжтой. Мөн автомат төлбөрийн үйлчилгээ ашиглаж болно.",
        },
      ],
    },
    documents: {
      title: "Баримт бичгийн асуултууд",
      faqs: [
        {
          question: "Ямар баримт бичиг шаардлагатай вэ?",
          answer:
            "Хувь хүний хувьд: Иргэний үнэмлэх, Орлогын тодорхойлолт, Гэрийн хаяг. Хуулийн этгээдийн хувьд: Улсын бүртгэлийн гэрчилгээ, Татварын тодорхойлолт, Санхүүгийн тайлан, Захирлын иргэний үнэмлэх.",
        },
        {
          question: "Лизингийн хугацаа дуусмагц юу болох вэ?",
          answer:
            "Лизингийн хугацаа дуусмагц та бүтээгдэхүүнийг бүрэн өмчлөх эрхтэй болно. Өмчлөх эрхийн баримт бичгийг шилжүүлэх ажиллагааг бид хийж өгнө.",
        },
      ],
    },
  };

  return (
    <Layout
      loading={loading}
      title={__("Түгээмэл асуулт хариулт")}
      menu={mainMenu}
      stickyMenu={stickyMenu}
    >
      <div className="content-wrapper" style={{ background: "transparent" }}>
        <div
          className="w-100"
          style={{ background: "transparent", padding: "40px 0" }}
        >
          <Row justify="center">
            <Col xs={22} sm={22} md={20} lg={18} xl={16}>
              <div style={{ background: "transparent" }}>
                <div className="w-100" style={{ padding: "0 20px" }}>
                  <h2
                    className="mb-5 upper-case"
                    style={{
                      color: "#fff",
                      fontSize: "24px",
                      fontWeight: "400",
                      letterSpacing: "2px",
                    }}
                  >
                    ТҮГЭЭМЭЛ АСУУЛТ ХАРИУЛТ
                  </h2>

                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="faq-tabs"
                    style={{ marginBottom: "40px" }}
                  >
                    <TabPane
                      tab="Санхүүгийн түгээмэлт тавигдах хөлбөөтөй"
                      key="general"
                    >
                      <div className="faq-content">
                        {faqCategories.general.faqs.map((faq, index) => (
                          <details key={index} className="faq-item">
                            <summary className="faq-question">
                              <span className="arrow">›</span>
                              {faq.question}
                            </summary>
                            <div className="faq-answer">
                              <p>
                                <strong>Хариулт:</strong>
                              </p>
                              <p>{faq.answer}</p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </TabPane>

                    <TabPane
                      tab="Төрөөсийн хөрөнгийн татвартай холбоотой"
                      key="payment"
                    >
                      <div className="faq-content">
                        {faqCategories.payment.faqs.map((faq, index) => (
                          <details key={index} className="faq-item">
                            <summary className="faq-question">
                              <span className="arrow">›</span>
                              <strong>Асуулт:</strong>
                              <br />
                              {faq.question}
                            </summary>
                            <div className="faq-answer">
                              <p>{faq.answer}</p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </TabPane>

                    <TabPane tab="Баримт-тай холбоотой" key="documents">
                      <div className="faq-content">
                        {faqCategories.documents.faqs.map((faq, index) => (
                          <details key={index} className="faq-item">
                            <summary className="faq-question">
                              <span className="arrow">›</span>
                              {faq.question}
                            </summary>
                            <div className="faq-answer">
                              <p>
                                <strong>Хариулт:</strong>
                              </p>
                              <p>{faq.answer}</p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </TabPane>
                  </Tabs>

                  <style jsx>{`
                    .faq-tabs :global(.ant-tabs-nav) {
                      background: transparent;
                      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                      padding: 0;
                      margin-bottom: 40px;
                    }
                    .faq-tabs :global(.ant-tabs-nav::before) {
                      border: none;
                    }
                    .faq-tabs :global(.ant-tabs-tab) {
                      color: rgba(255, 255, 255, 0.7);
                      border: none;
                      padding: 16px 32px;
                      font-size: 14px;
                      transition: all 0.3s;
                      background: transparent;
                      margin: 0;
                    }
                    .faq-tabs :global(.ant-tabs-tab:hover) {
                      color: rgba(255, 255, 255, 0.95);
                    }
                    .faq-tabs :global(.ant-tabs-tab-active) {
                      background: transparent;
                    }
                    .faq-tabs :global(.ant-tabs-tab-active .ant-tabs-tab-btn) {
                      color: #fff;
                      font-weight: 400;
                    }
                    .faq-tabs :global(.ant-tabs-ink-bar) {
                      background: #fff;
                      height: 2px;
                    }
                    .faq-content {
                      background: transparent;
                      padding: 0;
                    }
                    .faq-item {
                      background: rgba(80, 40, 80, 0.3);
                      border: 1px solid rgba(255, 255, 255, 0.1);
                      border-radius: 8px;
                      margin-bottom: 12px;
                      padding: 18px 24px;
                      transition: all 0.3s;
                    }
                    .faq-item:hover {
                      background: rgba(80, 40, 80, 0.4);
                      border-color: rgba(255, 255, 255, 0.2);
                    }
                    .faq-question {
                      color: #fff;
                      cursor: pointer;
                      font-size: 15px;
                      font-weight: 400;
                      list-style: none;
                      display: flex;
                      align-items: flex-start;
                      gap: 10px;
                      line-height: 1.6;
                    }
                    .faq-question::-webkit-details-marker {
                      display: none;
                    }
                    .faq-question strong {
                      display: block;
                      margin-bottom: 4px;
                      font-weight: 500;
                    }
                    .faq-question .arrow {
                      transition: transform 0.3s;
                      font-size: 20px;
                      flex-shrink: 0;
                      margin-top: 2px;
                    }
                    details[open] .faq-question .arrow {
                      transform: rotate(90deg);
                    }
                    .faq-answer {
                      color: rgba(255, 255, 255, 0.8);
                      margin-top: 12px;
                      padding-left: 30px;
                      line-height: 1.6;
                      font-size: 14px;
                    }
                    .faq-answer p {
                      margin-bottom: 8px;
                    }
                  `}</style>
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

export default FAQPage;
