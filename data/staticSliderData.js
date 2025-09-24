// Static slider data to replace WordPress API calls
export const staticSliderData = [
  {
    id: 1,
    title: {
      rendered: "НИЙЛҮҮЛЭГЧ ХЭРХЭН БОЛОХ ВЭ?",
    },
    excerpt: {
      rendered:
        "ХасЛизингээр дамжуулан машин механизм, тоног төхөөрөмжөө борлуулахаар хамтран ажиллах байгууллага нь дараах шалгуурыг хангасан байна. Үүнд: Сүүлийн 1 жилээс доошгүй хугацаанд үйл ажиллагаа явуулж байгаа; Монгол улсын хуулийн дагуу үүсгэн байгуулагдсан; Худалдааны үйл ажиллагаа эрхлэх тусгай зөвшөөрөлтэй; ХасЛизингийн үйлчилгээний нөхцөл, дүрмийг хүлээн зөвшөөрч, дагаж мөрдөхөд бэлэн байх.",
    },
    slug: "how-to-become-vendor",
    acf: {
      img: "/images/back.jpg",
      backColor: true,
      btn: {
        slug: "/how-to-become-vendor",
        btn_text: "Дэлгэрэнгүй",
      },
      pre_payment: {
        first_value: 10,
        second_value: 30,
      },
      interest_rate: {
        first_value: 1.5,
        second_value: 2.5,
      },
      period: {
        value: 5,
      },
    },
  },
  {
    id: 2,
    title: {
      rendered: "ХАСЛИЗИНГИЙН ДАВУУ ТАЛ",
    },
    excerpt: {
      rendered:
        "Хамгийн хурдан шийдвэрлэлт - 24 цагийн дотор; Хамгийн хямд хүү - 1.5% - 2.5%; Урьдчилгаа - 10% - 30%; Хугацаа - 5 жил хүртэл; Хамгийн найдвартай түнш - 20+ жилийн туршлагатай; Бүх төрлийн тоног төхөөрөмж, машин механизм, автомашины лизинг.",
    },
    slug: "advantages",
    acf: {
      img: "/images/back.jpg",
      backColor: false,
      btn: {
        slug: "/new-car-leasing",
        btn_text: "Автомашины лизинг",
      },
      footer_btn: {
        btn_id: "/machinery-leasing",
        btn_text: "Машин механизмийн лизинг",
      },
      pre_payment: {
        first_value: 10,
        second_value: 30,
      },
      interest_rate: {
        first_value: 1.5,
        second_value: 2.5,
      },
      period: {
        value: 5,
      },
    },
  },
  {
    id: 3,
    title: {
      rendered: "БИЗНЕСИЙН ХӨГЖҮҮЛЭЛТЭД ДЭМЖЛЭГ",
    },
    excerpt: {
      rendered:
        "Таны бизнесийн хөгжүүлэлтэд дэмжлэг үзүүлэх зорилгоор ХасЛизинг нь автомашин, машин механизм, үйлдвэрлэлийн тоног төхөөрөмж, эмнэлгийн тоног төхөөрөмжийн лизингийн үйлчилгээг санал болгож байна. Хамгийн сайн нөхцөл, хурдан шийдвэрлэлт, найдвартай түнш.",
    },
    slug: "business-support",
    acf: {
      img: "/images/back.jpg",
      backColor: true,
      btn: {
        slug: "/manufacturing-equipment-leasing",
        btn_text: "Үйлдвэрлэлийн тоног төхөөрөмж",
      },
      footer_btn: {
        btn_id: "/medical-equipment-leasing",
        btn_text: "Эмнэлгийн тоног төхөөрөмж",
      },
      pre_payment: {
        first_value: 15,
        second_value: 25,
      },
      interest_rate: {
        first_value: 1.8,
        second_value: 2.2,
      },
      period: {
        value: 7,
      },
    },
  },
];

export const staticSliderCategory = {
  id: 1,
  name: "Slider",
  slug: "slider",
  acf: {
    youtube_id: null, // Set to null to disable YouTube video for now
  },
};
