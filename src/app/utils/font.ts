import { Noto_Sans_JP, Open_Sans } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ['400', '600', '800'],
    preload: true
});

export const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ['400', '600', '800'],
    preload: true
});