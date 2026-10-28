import React, { useState } from "react";
import { Button, Input, Form, notification, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import emailjs from "emailjs-com";
import useTranslation from "next-translate/useTranslation";

const { Option } = Select;

const openNotificationWithIcon = (type, msg) => {
  notification[type]({
    message: msg,
  });
};

const Feedback = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { name, email, message, mobile, topic } = values;

    if (!name || !message) {
      return openNotificationWithIcon("error", t("Мэдээллээ бүрэн оруулна уу"));
    }

    setLoading(true);

    try {
      const templateParams = {
        email,
        name,
        message,
        mobile,
        topic: topic === "complaint" ? t("Гомдол") : t("Санал хүсэлт"),
      };

      await emailjs.send("gmail", "feedback", templateParams, "user_FpxzyiXNUL7JAEqalfg2g");
      openNotificationWithIcon("success", t("Амжилттай илгээлээ"));
      form.resetFields();
    } catch (error) {
      openNotificationWithIcon("error", t("Амжилтгүй боллоо"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} className="contact-form" onFinish={handleSubmit} initialValues={{ topic: "feedback" }} layout="vertical">
      <Form.Item label={t("Нэр")} name="name" rules={[{ required: true, message: t("Нэрээ оруулна уу") }]}>
        <Input placeholder={t("Нэр")} />
      </Form.Item>

      <Form.Item
        label={t("И-мэйл хаяг")}
        name="email"
        rules={[
          { required: true, message: t("И-мэйл хаягаа оруулна уу") },
          { type: "email", message: t("Зөв и-мэйл хаяг оруулна уу") },
        ]}
      >
        <Input placeholder={t("И-мэйл хаяг")} />
      </Form.Item>

      <Form.Item label={t("УТАС")} name="mobile" rules={[{ required: true, message: t("Утасны дугаараа оруулна уу") }]}>
        <Input placeholder={t("УТАС")} />
      </Form.Item>

      <Form.Item label={t("Сэдэв")} name="topic" rules={[{ required: true, message: t("Сэдвээ сонгоно уу") }]}>
        <Select>
          <Option value="feedback">{t("Санал хүсэлт ")}</Option>
          <Option value="complaint">{t("Гомдол")}</Option>
        </Select>
      </Form.Item>

      <Form.Item label={t("Мессеж")} name="message" rules={[{ required: true, message: t("Мессежээ бичнэ үү") }]}>
        <Input.TextArea rows={5} placeholder={t("Мессеж")} autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" loading={loading} disabled={loading}>
          {loading ? t("Илгээж байна...") : t("Илгээх")} {!loading && <SendOutlined />}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Feedback;
