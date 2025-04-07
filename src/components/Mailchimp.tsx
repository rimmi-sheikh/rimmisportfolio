"use client";

import { mailchimp } from "@/app/resources";
import { Heading, Text, Background, Column, InlineCode } from "@/once-ui/components";
import { useEffect, useState } from "react";

const randomThoughts = [
  "Why do breadboards never stay flat?",
  "My Arduino just blinked once and stopped—respect.",
  "Still thinking about that spaghetti bridge collapse.",
  "That one sensor box project? Still judging the air.",
  "3D modeled something weird again. Felt cute.",
  "Hover effects are my love language.",
  "TechGirls project still lives rent-free in my brain.",
  "Circuits really said 'no' today.",
  "Tried to fix a bug—made it worse. Classic.",
  "Sometimes things work. It's unsettling."
];

type NewsletterProps = {
  display: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
};

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
  const [randomQuote, setRandomQuote] = useState<string>("");

  useEffect(() => {
    const newQuote = randomThoughts[Math.floor(Math.random() * randomThoughts.length)];
    setRandomQuote(newQuote);
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <Column
      overflow="hidden"
      position="relative"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-medium"
    >
      <Background
        mask={{
          cursor: mailchimp.effects.mask.cursor,
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
          opacity: mailchimp.effects.gradient.opacity as
            | 0
            | 10
            | 20
            | 30
            | 40
            | 50
            | 60
            | 70
            | 80
            | 90
            | 100,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          color: mailchimp.effects.dots.color,
          size: mailchimp.effects.dots.size as any,
          opacity: mailchimp.effects.dots.opacity as any,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width as any,
          height: mailchimp.effects.grid.height as any,
          opacity: mailchimp.effects.grid.opacity as any,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as any,
        }}
      />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {newsletter.title}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {newsletter.description}
        <br />
        <br />
        Currently thinking 😁: <InlineCode>{randomQuote}</InlineCode>
      </Text>
    </Column>
  );
};
