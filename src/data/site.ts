import type { PhotoKind } from "@/lib/photo-types";

// Single source of truth for the café's facts and copy. Edit here, not in components.

const lat = 56.5141612;
const lng = 60.2772687;

export const site = {
  name: "Кафе Кристалл 24",
  shortName: "Кристалл 24",
  tagline: "Уютное кафе русской кухни и банкеты в Полевском",
  description:
    "Кафе «Кристалл 24» в Полевском — русская кухня, бизнес-ланч от 200 ₽, банкеты, свадьбы и юбилеи. Уютный обновлённый зал, бронирование столов и еда навынос.",
  cuisine: "Русская кухня",
  averageCheck: "430–820 ₽",
  copyrightYear: 2026,

  rating: {
    value: "4.3",
    count: "220+",
    rank: "№2 среди кафе Полевского",
    source: "По оценкам гостей на Google Картах и Яндекс Картах",
    rankSource: "по версии Restaurant Guru",
  },

  address: {
    full: "г. Полевской, мкр. Зелёный Бор, 61А",
    street: "мкр. Зелёный Бор, 61А",
    locality: "Полевской",
    region: "Свердловская область",
    country: "RU",
  },

  phones: [
    { display: "+7 (34350) 3-13-53", tel: "+73435031353", href: "tel:+73435031353" },
    { display: "+7 912 223-38-88", tel: "+79122233888", href: "tel:+79122233888" },
  ],

  hours: [
    { days: "Понедельник", short: "Пн", time: "Выходной", closed: true },
    { days: "Вторник — пятница", short: "Вт–Пт", time: "10:00–19:00", closed: false },
    { days: "Суббота — воскресенье", short: "Сб–Вс", time: "11:00–23:00", closed: false },
  ],

  // Machine-readable hours for structured data.
  openingHours: [
    { days: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
    { days: ["Saturday", "Sunday"], opens: "11:00", closes: "23:00" },
  ],

  geo: { lat, lng },

  maps: {
    // Keyless embed of the café's own Google Maps place card.
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2180!2d60.2772687!3d56.5141612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c3e6a6eb30330b%3A0x13f300e2d8e03b29!2z0JrQsNGE0LUg0JrRgNC40YHRgtCw0LvQuyAyNA!5e0!3m2!1sru!2sru!4v1731264000000!5m2!1sru!2sru",
    place: "https://www.google.com/maps?cid=1437493680362502953&hl=ru",
    directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    yandex: `https://yandex.ru/maps/?pt=${lng},${lat}&z=17&l=map`,
  },

  transit: [
    { stop: "Берёзовая Роща", routes: "автобус 101", walk: "≈ 4 мин пешком" },
    { stop: "Магазин 4 сезона", routes: "автобусы 11, 12, 13", walk: "≈ 6 мин пешком" },
  ],

  nav: [
    { href: "#about", label: "О нас" },
    { href: "#menu", label: "Меню" },
    { href: "#banquets", label: "Банкеты" },
    { href: "#services", label: "Услуги" },
    { href: "#gallery", label: "Галерея" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ],
} as const;

export const about = {
  eyebrow: "О нас",
  title: "Уютное место для семьи и друзей",
  paragraphs: [
    "«Кристалл 24» — кафе русской кухни в Полевском со спокойной, домашней атмосферой. К нам приходят семьями и с друзьями: пообедать, поужинать или отметить важное событие.",
    "Зал недавно обновили, персонал вежливый и внимательный, а цены остаются умеренными. Кафе находится рядом с трассой — к нам удобно заехать по пути.",
  ],
  highlights: [
    { id: "hall", title: "Обновлённый зал", text: "Недавно обновлённый интерьер, в котором приятно задержаться." },
    { id: "staff", title: "Вежливый персонал", text: "Внимательное обслуживание, которое отмечают гости." },
    { id: "prices", title: "Умеренные цены", text: "Средний чек — 430–820 ₽." },
    { id: "road", title: "Рядом с трассой", text: "Удобно заехать по пути и оставить машину на парковке." },
  ],
} as const;

export const menu = {
  eyebrow: "Меню",
  title: "Русская кухня на каждый день",
  lead: "От сытного бизнес-ланча до праздничного стола. Актуальное меню и цены подскажем по телефону.",
  categories: [
    {
      id: "lunch",
      title: "Бизнес-ланч",
      price: "от 200 ₽",
      text: "Полноценный обед по доступной цене — удобно зайти в перерыв.",
    },
    { id: "pelmeni", title: "Пельмени", price: null, text: "Классика русской кухни — гости часто отмечают их в отзывах." },
    { id: "bakery", title: "Пирожки и выпечка", price: null, text: "Выпечка к чаю и кофе — в зале или с собой." },
    { id: "soups", title: "Супы", price: null, text: "Горячие первые блюда русской кухни." },
    { id: "mains", title: "Горячее", price: null, text: "Основные блюда на обед и ужин." },
    { id: "desserts", title: "Десерты", price: null, text: "Сладкое завершение обеда или праздничного стола." },
    { id: "drinks", title: "Напитки", price: null, text: "Кофе, вино и другие напитки к любому блюду." },
  ],
  checkLabel: "Средний чек",
  checkNote: "Точные цены и состав меню уточняйте по телефону.",
} as const;

export const banquets = {
  eyebrow: "Банкеты и праздники",
  title: "Праздник, который запомнится",
  lead: "Отметьте важное событие в «Кристалле». Для компаний есть отдельный зал, а если праздник проходит на другой площадке — организуем кейтеринг.",
  occasions: [
    { id: "wedding", title: "Свадьбы" },
    { id: "anniversary", title: "Юбилеи" },
    { id: "corporate", title: "Корпоративы" },
    { id: "newyear", title: "Новый год" },
  ],
  features: [
    { id: "hall", title: "Отдельный зал", text: "Для компаний и семейных торжеств." },
    { id: "catering", title: "Кейтеринг", text: "Выездное обслуживание вашего праздника." },
  ],
  cta: "Обсудить банкет",
} as const;

export const services = {
  eyebrow: "Услуги",
  title: "Всё для вашего удобства",
  items: [
    { id: "booking", title: "Бронирование столов", text: "Позвоните — и мы оставим столик к вашему приходу." },
    { id: "takeaway", title: "Еда навынос", text: "Соберём заказ с собой." },
    { id: "payment", title: "Оплата картой и по QR", text: "Принимаем карты, QR-код и наличные." },
    { id: "wifi", title: "Wi‑Fi", text: "Интернет для гостей кафе." },
    { id: "parking", title: "Парковка", text: "Место для автомобиля рядом с кафе." },
  ],
} as const;

// Themes summarised from public reviews; these are not quotes from individual guests.
export const reviews = {
  eyebrow: "Отзывы",
  title: "Что отмечают гости",
  themes: [
    { id: "food", title: "Вкусная кухня", text: "В отзывах чаще всего хвалят пельмени, выпечку и обеды." },
    {
      id: "cozy",
      title: "Уютная атмосфера",
      text: "Гости отмечают уютный зал, где приятно посидеть семьёй или с друзьями.",
    },
    {
      id: "staff",
      title: "Вежливый персонал",
      text: "Отдельные слова благодарности — персоналу, в том числе за хорошо проведённые юбилеи.",
    },
  ],
  cta: "Читать отзывы на Google Картах",
} as const;

export const photoKindLabels: Record<PhotoKind, string> = {
  interior: "Интерьер",
  food: "Блюда",
  exterior: "Фасад",
};

// Shown in the gallery until real photos are added to /public/photos.
export const galleryPlaceholders: ReadonlyArray<{ kind: PhotoKind }> = [
  { kind: "interior" },
  { kind: "food" },
  { kind: "interior" },
  { kind: "exterior" },
  { kind: "food" },
  { kind: "interior" },
  { kind: "food" },
  { kind: "exterior" },
  { kind: "interior" },
];
