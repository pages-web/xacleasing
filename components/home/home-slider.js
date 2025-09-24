import React from "react";
import { Col, Row } from "antd";
import Slider from "react-slick";

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false,
  };

  const slides = [
    {
      title: `"CAT - LEASING" ХӨТӨЛБӨР`,
      text: "Барловорлд Монголиа ХХК нь Катерпиллар корпорацийн Монгол дахь албан ёсны дилер байгууллага юм. 1996 онд байгуулагдсан цагаасаа хойш Монголын уул уурхай, эрчим хүч, барилга, зам барилга, дэд бүтэц болон хөдөө аж ах...",
    },
    {
      title: `ДУГААРТАЙ АВТОМАШИНЫ ЗЭЭЛИЙН ҮЙЛЧИЛГЭЭР`,
      text: "2016 оноос хойш үйлдвэрлэгдсэн дугаартай автомашиныг 1ӨДӨРТ багтаан зээлээр аваарай.",
    },
    {
      title: `ГААЛЬТАЙ АВТОМАШИНЫ ЗЭЭЛИЙН ҮЙЛЧИЛГЭЭ`,
      text: "Да хүрээ, 22 авто худалдааны төвүүдэд гаальтай автомашины зээлийн үйлчилгээг 2 ЦАГ дотор шийдвэрлэж байна.",
    },
    {
      title: "ЗАХИАЛСАН LAND CRUISER 300 АВТОМАШИНАА ЗАЙНААС ШИЙДҮҮЛЭЭРЭЙ",
      text: "Хүсэн хүлээсэн Land Cruiser 300 автомашин 2021 оны 6 сарын 10-ны шөнө дэлхийн дахинд нээлтээ хийж үнэнч хэрэглэгч, шүтэн бишрэгч нартаа бэлэг барьсан билээ. 2007 онд анхны Land Cruiser 200...",
    },
    {
      title: "НИЙЛҮҮЛЭГЧ ХЭРХЭН БОЛОХ ВЭ?",
      text: "ХасЛизингээр дамжуулан машин механизм, тоног төхөөрөмжөө борлуулах байгууллага нь дараах шалгуурыг хангах ёстой. Үүнд: Сүүлийн 1 жилээс доошгүй хугацаанд үйл ажиллагаа явуулсан байх; Монгол улсын хуулийн дагуу үүсгэн...",
    },
  ];

  return (
    <Row justify="center" className="w-100 relative">
      <Col xs={22} sm={22} md={20} lg={18} xl={16}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                width: "25%",
              }}
            >
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
                {/* Top Button */}
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

                {/* Title */}
                <h1 style={{ width: "35%", fontSize: "22px", fontWeight: "bold", lineHeight: "1.4" }}>{slide.title}</h1>

                {/* Description */}
                <p style={{ width: "35%", fontSize: "15px", lineHeight: "1.6", color: "rgba(255,255,255,0.9)" }}>{slide.text}</p>

                {/* Bottom Button */}
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
              </div>
            </div>
          ))}
        </Slider>
      </Col>
    </Row>
  );
}

export default HomeSlider;
