export const META = {
  title: "이 노래 노래방에 있을까",
  description:
    "당신이 부르고 싶은 노래가 노래방에 있는지 확인하세요. TJ와 금영 노래방의 곡 목록을 한 번에 검색할 수 있는 사이트입니다.",
  icons: {
    icon: "./favicon.png",
  },
  keyword: [
    "노래방",
    "금영",
    "TJ",
    "노래방번호",
    "가수검색",
    "제목검색",
    "수록곡",
    "노래번호",
    "노래검색",
    "노래",
  ],
  url: "https://song-finder.crowcrow07.com/",
  googleVerification: "8E__4kWxOwOMcRgiDrskUVrMp3sy5pnYrfZBIsMaYt8",
  naverVerification: "1686facd3fde6466f8b891951300dbdac4d3af30",
  ogImage: "/opengraph-image.webp",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;
