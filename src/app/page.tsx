import React from "react";
import PickaxeModel from "@/components/about/PickaxeModel";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column, InlineCode } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Column fillWidth paddingY="l" gap="m">
        <Flex fillWidth gap="24" mobileDirection="column">
          {/* Text Content (Left Side) - shown on all screens */}
          <Column maxWidth="s">
            <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="m">
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="m">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx translateY="12" delay={0.4} horizontal="start">
              <Flex gap="m">
                <Button
                  id="about"
                  data-border="rounded"
                  href="/about"
                  variant="secondary"
                  size="m"
                  arrowIcon
                >
                  <Text>About Me</Text>
                </Button>
                <Button
                  id="work"
                  data-border="rounded"
                  href="/work"
                  variant="primary"
                  size="m"
                  arrowIcon
                >
                  <Text>My Work</Text>
                </Button>
              </Flex>
            </RevealFx>
          </Column>

          {/* Pickaxe Model (Right Side) - hidden on mobile */}
          <RevealFx 
            translateY="4" 
            delay={0.1} 
            horizontal="end"
            className="hidden md:block" // This hides it on mobile
          >
            <PickaxeModel className="h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
            scale={0.5}
             />
          </RevealFx>
        </Flex>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[2, 2]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          {/* Centered Heading */}
          <Flex flex={1} horizontal="center">
            <Heading as="h2" variant="display-strong-xs">
              <InlineCode>Latest Peeks Behind the Code</InlineCode>
            </Heading>
          </Flex>
          
          {/* Show 2 latest posts (original behavior) */}
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" /> {/* Back to original 2 posts */}
          </Flex>
        </Flex>
      )}
      <Projects range={[1,1]} />
      <Projects range={[3]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
