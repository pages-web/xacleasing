import React from "react";
import { Row } from "antd";
import ProductCondition from "./ProductCondition";
import { __ } from "../utils";

class ProductConditions extends React.Component {
  render() {
    const { post } = this.props;

    if (!post || !post.acf || Object.keys(post.acf).length === 0) {
      return null;
    }

    const { interest_rate, period, pre_payment } = post.acf || {};

    // Debug: Log what data we have
    console.log("ProductConditions - post.acf:", post.acf);
    console.log("ProductConditions - interest_rate:", interest_rate);
    console.log("ProductConditions - period:", period);
    console.log("ProductConditions - pre_payment:", pre_payment);

    // Only render if we have the required data
    if (!interest_rate || !period || !pre_payment) {
      console.log("ProductConditions - Missing required data, returning null");
      return null;
    }
    return (
      <div className="product-condition mt-2 mb-4">
        <Row justify="center">
          <ProductCondition
            firstRange={1.3}
            lastRange={2.1}
            gap={Number(interest_rate.gap)}
            atr="%"
            name={__("Сарын хүү")}
            firstValue={interest_rate.first_value}
            secondValue={interest_rate.second_value}
            degree={interest_rate.degree}
          />

          <ProductCondition
            firstRange={10}
            lastRange={80}
            gap={Number(pre_payment.gap)}
            atr="%"
            name={__("Урьдчилгаа")}
            firstValue={pre_payment.first_value}
            secondValue={pre_payment.second_value}
            degree={pre_payment.degree}
          />
          <ProductCondition
            firstRange={1}
            lastRange={8}
            gap={1}
            atr={__("жил")}
            name={__("Хугацаа")}
            firstValue={period.value}
            secondValue={__("хүртэл ")}
            degree={period.degree}
          />
        </Row>
      </div>
    );
  }
}

export default ProductConditions;
