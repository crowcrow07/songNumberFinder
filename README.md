This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

// ky
// https://kysing.kr/karaoke-book/?city=kr&s_cd=2&s_page=1&s_value=<노래제목>

// const arr = [
// "w",
// "x",
// "y",
// "z",
// "0",
// "1",
// "2",
// "3",
// "4",
// "5",
// "6",
// "7",
// "8",
// "9",
// ];

// const [page, setPage] = useState(1);
// const [text, setText] = useState(0);

// const { data: kyData, isFetched: success } = useKyScrapingQuery({
// text: arr[text],
// page: page.toString(),
// });

// useEffect(() => {
// if (success) {
// console.log("page : ", page, " text : ", arr[text]);
// kySongDbCreate(kyData, {
// onSuccess: () => {
// if (page < 720) {
// setPage(page + 1);
// } else {
// if (text + 1 < arr.length) {
// setText(text + 1);
// setPage(1);
// } else {
// console.log("All data processed");
// }
// }
// },
// });
// }
// }, [kyData, kySongDbCreate, success, page, text]);
