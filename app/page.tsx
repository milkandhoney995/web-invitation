/** @jsxImportSource @emotion/react **/
"use client";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Image from 'next/image'
import { css } from "@emotion/react"
import theme from "@/style/theme";
import WeddingInvitationForm from "./components/WeddingInvitationForm";
import CardController from "./components/CardController";
import { Grid, Typography } from "@mui/material";
import { WEDDING_EVENTS } from "@/constants/eventData";
import { INVITATION_MESSAGE } from "@/constants/message";

const style = {
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
      <Section id="message" title="Message">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* 画像用のGrid item */}
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <Image
              src="/images/img_thanks.jpg"
              alt="thanks"
              width={470}
              height={550}
              style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              quality={100}
              css={css`
                position: relative;
                filter: brightness(1.2) contrast(80%) grayscale(20%);
                mix-blend-mode: hard-light;
              `}
            />
          </Grid>

          {/* テキスト用のGrid item */}
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
              {INVITATION_MESSAGE}
            </Typography>
          </Grid>
        </Grid>
      </Section>
      <Section
        id="event"
        title="Event"
        backgroundColor={theme.validTheme.backgroundColor1}
        propCss={style.textContainerEvent}
      >
        {WEDDING_EVENTS.map((event, index) => (
          <CardController
            key={index}
            mainImg={event.mainImg}
            bodyTitle={event.title}
            bodyImg={event.bodyImg}
            mapUrl={event.mapUrl}
          >
            <>
              {event.access}
            </>

          </CardController>
        ))}
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
