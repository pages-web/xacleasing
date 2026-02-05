import React from "react";
import App from "next/app";
import "antd/dist/antd.css";
import "../public/styles/style.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "next/router";
import NProgress from "nprogress";
import { setLocale } from "../utils";
import { getLang } from "../config";
import { Providers } from "../providers/index";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, lang, mainMenu, stickyMenu }) {
  const [loading, setLoading] = React.useState(false);
  const [isLangSetted, setLangState] = React.useState(false);
  if (!isLangSetted) {
    setLocale(lang || "mn", () => {
      setLangState(true);
    });
  }

  React.useEffect(() => {
    const handleStart = () => NProgress.start() && setLoading(true);

    // handleComplete event was not firing
    const handleComplete = () => NProgress.done() && setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  });
  if (!isLangSetted) {
    return null;
  }

  return (
    <Providers>
      <Component
        {...pageProps}
        mainMenu={mainMenu}
        stickyMenu={stickyMenu?.items || []}
        loading={loading}
      />
    </Providers>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Static leasing pages
  const staticLeasingPages = [
    {
      ID: 9001,
      title: "Шинэ автомашины лизинг",
      slug: "new-car-leasing",
      url: "/new-car-leasing",
      object: "page",
    },
    {
      ID: 9002,
      title: "Машин механизмын лизинг",
      slug: "machinery-leasing",
      url: "/machinery-leasing",
      object: "page",
    },
    {
      ID: 9003,
      title: "Үйлдвэрлэлийн тоног төхөөрөмжийн лизинг",
      slug: "manufacturing-equipment-leasing",
      url: "/manufacturing-equipment-leasing",
      object: "page",
    },
    {
      ID: 9004,
      title: "Эмнэлэгийн тоног төхөөрөмжийн лизинг",
      slug: "medical-equipment-leasing",
      url: "/medical-equipment-leasing",
      object: "page",
    },
  ];

  // Static main menu (no WordPress dependency)
  const mainMenu = {
    items: [
      {
        ID: 1,
        title: "Бүтээгдэхүүн үйлчилгээ",
        slug: "products-services",
        url: "/products-services",
        object: "page",
        child_items: [...staticLeasingPages],
      },
      {
        ID: 2,
        title: "Нийлүүлэгчид",
        slug: "vendors",
        url: "/vendors",
        object: "page",
        child_items: [
          {
            ID: 2001,
            title: "Шинэ автомашины нийлүүлэгчид",
            slug: "new-car-vendors",
            url: "/new-car-vendors",
            object: "page",
          },
          {
            ID: 2002,
            title: "Машин механизм нийлүүлэгч",
            slug: "new-car-vendors",
            url: "/new-car-vendors",
            object: "page",
          },
          {
            ID: 2003,
            title: "Тоног төхөөрөмж нийлүүлэгч",
            slug: "new-car-vendors",
            url: "/new-car-vendors",
            object: "page",
          },
          {
            ID: 2004,
            title: "Нийлүүлэгч хэрхэн болох вэ?",
            slug: "how-to-become-vendor",
            url: "/how-to-become-vendor",
            object: "page",
          },
        ],
      },
      {
        ID: 3,
        title: "Бидний тухай",
        slug: "about",
        url: "/about",
        object: "page",
        child_items: [
          {
            ID: 3001,
            title: "Бидний тухай",
            slug: "about",
            url: "/about",
            object: "page",
          },
          {
            ID: 3002,
            title: "Группын тухай",
            slug: "about-group",
            url: "/about-group",
            object: "page",
          },
          {
            ID: 3003,
            title: "Мэдээлэл",
            slug: "news",
            url: "/news",
            object: "page",
          },
          {
            ID: 3004,
            title: "Хүний нөөц",
            slug: "hr",
            url: "/career/hr",
            object: "page",
          },
        ],
      },
      {
        ID: 4,
        title: "Тусламж",
        slug: "help",
        url: "/help",
        object: "page",
        child_items: [
          {
            ID: 4001,
            title: "Салбарууд",
            slug: "branches",
            url: "/branches",
            object: "page",
          },
          {
            ID: 4002,
            title: "Холбоо барих",
            slug: "contact",
            url: "/contact",
            object: "page",
          },
          {
            ID: 4003,
            title: "Лого татах",
            slug: "logo",
            url: "/logo",
            object: "page",
          },
          {
            ID: 4004,
            title: "Өргөдөл, маягт татах",
            slug: "download-application-form",
            url: "/download-application-form",
            object: "page",
          },
          {
            ID: 4005,
            title: "Түгээмэл асуулт хариулт",
            slug: "faq",
            url: "/faq",
            object: "page",
          },
          {
            ID: 4006,
            title: "Тооцоолуур",
            slug: "calculator",
            url: "/calculator",
            object: "page",
          },
        ],
      },
    ],
  };

  // Static sticky menu (no WordPress dependency)
  const stickyMenu = { items: [] };

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, lang: getLang(appContext.ctx), mainMenu, stickyMenu };
};

export default MyApp;
