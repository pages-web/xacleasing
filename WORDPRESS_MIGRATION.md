# WordPress-оос салгасан тэмдэглэл

## Хийсэн өөрчлөлтүүд

### 1. Үндсэн тохиргоо

- ✅ `pages/_app.js` - WordPress API дуудлагуудыг арилгаж, статик цэс ашиглах болсон
- ✅ `config.js` - WordPress API URL болон fetcher функцийг устгасан
- ✅ `package.json` - `wpapi` болон `axios` package-уудыг хассан

### 2. WordPress хамааралтай хуудсууд (устгах шаардлагатай)

Дараах хуудсууд WordPress API ашигладаг тул алдаа гарах эсвэл ажиллахгүй байх магадлалтай:

#### Блог/Мэдээ хуудсууд:

- `pages/d/[slug].js` - Блог нийтлэлийн дэлгэрэнгүй хуудас
- `pages/c/[slug].js` - Категорийн хуудас
- `pages/news/[slug].js` - Мэдээний дэлгэрэнгүй хуудас
- `pages/p/[slug].js` - Хуудасны дэлгэрэнгүй
- `pages/search.js` - Хайлтын хуудас
- `pages/news.js` - Мэдээний жагсаалт

#### Карьер хуудсууд:

- `pages/career/hr.js` - Ажлын байрны жагсаалт
- `pages/career/[slug].js` - Ажлын байрны дэлгэрэнгүй

#### Бусад:

- `pages/download-logo.js` - Лого татах хуудас
- `pages/about.js` - Бидний тухай (WordPress-оос мэдээлэл татдаг)
- `components/layouts/backImg.js` - Арын зураг WordPress-оос татдаг
- `components/layouts/Search.js` - Хайлтын компонент

### 3. Ажиллах хуудсууд (WordPress хамааралгүй)

Эдгээр хуудсууд статик өгөгдөл ашигладаг тул ажиллах ёстой:

- `pages/index.js` - Нүүр хуудас
- `pages/new-car-leasing.js` - Шинэ автомашины лизинг
- `pages/machinery-leasing.js` - Машин механизмын лизинг
- `pages/manufacturing-equipment-leasing.js` - Үйлдвэрлэлийн тоног төхөөрөмжийн лизинг
- `pages/medical-equipment-leasing.js` - Эмнэлэгийн тоног төхөөрөмжийн лизинг
- `pages/new-car-vendors.js` - Нийлүүлэгчид
- `pages/how-to-become-vendor.js` - Нийлүүлэгч болох
- `pages/contact.js` - Холбоо барих
- `pages/branches.js` - Салбарууд
- `pages/calculator.js` - Тооцоолуур
- `pages/feedback.js` - Санал хүсэлт
- `pages/invites.js` - Урилга

## Дараагийн алхмууд

1. **WordPress хамааралтай хуудсуудыг устгах** - Хэрэв эдгээр хуудсууд шаардлагагүй бол устгаж болно
2. **Эсвэл статик өгөгдөл ашиглах** - Хэрэв шаардлагатай бол, WordPress-оос өгөгдлийг JSON файл болгон хөрвүүлж, статик өгөгдөл ашиглах
3. **node_modules дахин суулгах** - `rm -rf node_modules && bun install` командыг ажиллуулж, шинэчилсэн dependencies суулгах
4. **Build хийх** - `.next` фолдер устгаж, дахин build хийх

## Команд

```bash
# Dependencies дахин суулгах
rm -rf node_modules package-lock.json yarn.lock
bun install

# Build cache устгаж дахин эхлүүлэх
rm -rf .next
bun dev
```
