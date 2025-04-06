/** @jsxImportSource @emotion/react **/
"use client";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Image from 'next/image'
import { css } from "@emotion/react"
import theme from "@/style/theme";
import CardMain from "./components/CardMain";
import CardBody from "./components/CardBody";
import WeddingInvitationForm from "./components/WeddingInvitationForm";

const style = {
  textContainer: css({
    "& div:last-child": {
      marginLeft: "2rem"
    }
  }),
  textContainerEvent: css({
    "& .textContainer": {
      alignItems: "baseline"
    }
  }),
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Section
        id="message"
        title="Message"
        propCss={style.textContainer}
      >
        <Image
          src="/images/img_thanks.jpg"
          alt="thanks"
          width={470}
          height={550}
          layout="intrinsic"
          objectFit="cover"
          quality={100} // 高品質で表示
          css={css`
            position: relative;
            filter: brightness(1.2) contrast(80%) grayscale(20%);
            mix-blend-mode: hard-light;
          `}
        />
        <div>
          謹啓<br />
          <br />
          皆様におかれましては<br />
          ますますご清祥のこととお慶び申し上げます。<br />
          <br />
          このたび、私たちは結婚をすることになりました。<br />
          つきましては、日頃お世話になっております皆様に感謝を込めて、<br />
          ささやかな小宴を催したく存じます。<br />
          <br />
          ご多用中、誠に恐縮ではございますが<br />
          ぜひご出席をいただきたく　ご案内申し上げます。<br />
          <br />
          謹白
        </div>
      </Section>
      <Section
        id="event"
        title="Event"
        backgroundColor={theme.validTheme.backgroundColor1}
        propCss={style.textContainerEvent}
      >
        <div>
          <CardMain
            img="/images/church.avif"
            title="挙式"
          >
            2025年9月27日(土)<br />
            受付：午後2:30<br />
            開始：午後3:00
          </CardMain>
          <CardBody
            title="国際基督教大学教会"
            img="/images/terakoya_map.png"
          >
            〒181-8585　東京都三鷹市大沢 3-10-2<br />
            <br />
            ＊JR中央線三鷹駅からお越しの場合<br />
            南口の5番乗り場から小田急バス「（鷹51）国際基督教大学」行終点下車<br />
            <br />
            ＊JR中央線武蔵境駅からお越しの場合<br />
            南口の2番乗り場から小田急バス「（境93）国際基督教大学」行終点下車<br />
            <br />
            ＊調布駅からお越しの場合<br />
            北口の14番乗り場から小田急バス「（境91）武蔵境駅南口」行<br />
            または「（ 鷹51）三鷹駅（西野御塔坂下経由）」行乗車「富士重工前」下車 徒歩10分
          </CardBody>
        </div>
        <div>
          <CardMain
            title="披露宴"
            img="/images/terakoya.jpeg"
          >
            2025年9月27日(土)<br />
            受付：午後4:30<br />
            開始：午後5:00
          </CardMain>
          <CardBody
            title="TERAKOYA"
            img="/images/terakoya_map.png"
          >
            〒184-0013　東京都小金井市前原町3-33-32<br />
            電話番号: 042-388-9555<br />
            <br />
            挙式後、国際基督教大学教会より送迎バスをご用意しております。<br />
            ご利用の方は出欠の回答画面にて、お知らせくださいますようお願い申し上げます。<br />
          </CardBody>
        </div>
      </Section>
      <Section
        id="rsvp"
        title="RSVP"
      >
        <WeddingInvitationForm />
      </Section>
    </div>
  );
}
