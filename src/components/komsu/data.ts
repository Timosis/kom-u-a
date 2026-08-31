import type { FeedItem } from "./FeedCard";

export const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "odunc",
    author: "Ayşe Demir",
    distance: "150 m",
    verified: true,
    title: "Bir günlüğüne matkap ödünç alabilir miyim?",
    body: "Salondaki rafları asacağım, akşam 19:00'a kadar geri getiririm.",
    time: "2 sa önce",
    cta: "Ödünç Ver",
  },
  {
    id: "2",
    type: "yardim",
    author: "Hasan Amca",
    distance: "80 m",
    verified: true,
    title: "Pazardan alışverişimi taşıyacak bir komşu arıyorum",
    body: "Cumartesi sabahı, iki file kadar. Karşılığında çayı benden.",
    time: "35 dk önce",
    cta: "Yardım Et",
    urgent: true,
  },
  {
    id: "3",
    type: "ilan",
    author: "Zeynep K.",
    distance: "300 m",
    verified: true,
    title: "Çocuk bisikleti ücretsiz — sahibini arıyor",
    body: "12 jant, sağlam. Kapıya kadar getirebilirim.",
    time: "4 sa önce",
    cta: "Mesaj At",
  },
  {
    id: "4",
    type: "duyuru",
    author: "Mahalle Muhtarlığı",
    distance: "500 m",
    verified: true,
    title: "Perşembe 09:00–14:00 arası su kesintisi",
    body: "Ana boru bakımı yapılacak. Depolarınızı önceden doldurun.",
    time: "Dün",
    cta: "Detay",
  },
  {
    id: "5",
    type: "odunc",
    author: "Mert Yılmaz",
    distance: "220 m",
    verified: false,
    title: "Kamp sandalyesi (2 adet) veren var mı?",
    body: "Hafta sonu piknik için. Pazartesi teslim ederim.",
    time: "6 sa önce",
    cta: "Ödünç Ver",
  },
  {
    id: "6",
    type: "yardim",
    author: "Fatma Teyze",
    distance: "60 m",
    verified: true,
    title: "Telefonumdaki yazıları büyütmeyi öğretebilir misiniz?",
    body: "Torunum uzakta, birkaç dakikanızı ayırırsanız çok sevinirim.",
    time: "1 gün önce",
    cta: "Yardım Et",
  },
];

export const quickActions = [
  { icon: "🧰", label: "Ödünç İste", hint: "Komşundan bir şey iste" },
  { icon: "🤝", label: "Yardım Et", hint: "Açık taleplere bak" },
  { icon: "📌", label: "İlan Ver", hint: "Sat, ver, takas et" },
  { icon: "📣", label: "Duyuru", hint: "Mahalleye haber ver" },
];

export const urgentNeeds = [
  { title: "Hasan Amca'ya pazar yardımı", meta: "80 m · Cumartesi 09:00" },
  { title: "Apartman girişi için ampul", meta: "Bina içi · Bugün" },
  { title: "Sokak kedilerine mama", meta: "120 m · Acil" },
];
