"use client";

import { mailchimp } from "@/app/resources";
import { Heading, Text, Background, Column, InlineCode } from "@/once-ui/components";
import { useEffect, useState } from "react";

const randomThoughts = [
  "I don’t trust beams that aren’t part of a truss.",
  "If it stains your hands, it’s probably going to look great on paper.",
  "I still think about that Arduino that stopped working... then didn’t.",
  "Some sensors just need to be spoken to kindly.",
  "Servos have the emotional range of a damp paper towel, but I still love them.",
  "Bridges made from spaghetti shouldn’t hold that much weight, but they did.",
  "I keep adding LEDs to things like that’ll fix me.",
  "Most of my code runs on hope and serial.println().",
  "Blender is just Minecraft on caffeine if you think about it.",
  "Redstone logic makes more sense than real-world wiring. I said what I said."
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
        Currently thinking: <InlineCode>{randomQuote}</InlineCode>
      </Text>
    </Column>
  );
};
