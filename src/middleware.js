import { NextResponse } from "next/server";

export async function middleware(request) {
  const userAgent = request.headers.get("user-agent");
  // As middleware is not able to fetch the env variables i am adding this fallback.
  const BASE_URL = process.env.PRERENDER_BASE_URL || "https://moneytv.live";
  const API_URL =
    process.env.PRERENDER_API_BASE_URL || "https://moneytv.live/api/v1";

  const bots = [
    "googlebot",
    "yahoo! slurp",
    "bingbot",
    "yandex",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest/0.",
    "developers.google.com/+/web/snippet",
    "slackbot",
    "vkshare",
    "w3c_validator",
    "redditbot",
    "applebot",
    "whatsapp",
    "flipboard",
    "tumblr",
    "bitlybot",
    "skypeuripreview",
    "nuzzel",
    "discordbot",
    "google page speed",
    "qwantify",
    "pinterestbot",
    "bitrix link preview",
    "xing-contenttabreceiver",
    "chrome-lighthouse",
    "telegrambot",
    "oai-searchbot",
    "chatgpt",
    "gptbot",
    "perplexity",
    "claudeBot",
    "amazonbot",
    "integration-test", // Integration testing
  ];

  const IGNORE_EXTENSIONS = [
    ".js",
    ".json",
    ".css",
    ".xml",
    ".less",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".pdf",
    ".doc",
    ".txt",
    ".ico",
    ".rss",
    ".zip",
    ".mp3",
    ".rar",
    ".exe",
    ".wmv",
    ".doc",
    ".avi",
    ".ppt",
    ".mpg",
    ".mpeg",
    ".tif",
    ".wav",
    ".mov",
    ".psd",
    ".ai",
    ".xls",
    ".mp4",
    ".m4a",
    ".swf",
    ".dat",
    ".dmg",
    ".iso",
    ".flv",
    ".m4v",
    ".torrent",
    ".woff",
    ".woff2",
    ".ttf",
    ".svg",
    ".webmanifest",
  ];
  const isBot =
    userAgent && bots.some((bot) => userAgent.toLowerCase().includes(bot));
  const isPrerender = request.headers.get("X-Prerender");
  const pathname = new URL(request.url).pathname;
  const extension = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 1);

  if (
    isPrerender ||
    !isBot ||
    (extension.length && IGNORE_EXTENSIONS.includes(extension))
  ) {
    return NextResponse.next();
  }

  if (isBot) {
    console.log({ BASE_URL });
    console.log({ API_URL });

    const fullUrl = `${BASE_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;

    const apiUrl = `${API_URL}/prerender?url=${encodeURIComponent(fullUrl)}`;

    console.log({ apiUrl });

    try {
      const res = await fetch(apiUrl, {
        headers: {
          "User-Agent": userAgent, // forward bot UA
        },
      });

      console.log({ res });

      const html = await res.text(); // Lambda returns prerendered HTML

      if (html) {
        console.log({ html });
        const headers = new Headers(res.headers);
        headers.set("Content-Type", "text/html");
        headers.set("x-redirected-from", fullUrl);

        return new NextResponse(html, {
          status: res.status,
          headers,
        });
      }
    } catch (err) {
      console.error("Prerender fetch failed:", err);
    }

    // fallback if prerender fails
    return NextResponse.next();
  }

  return NextResponse.next();
}
