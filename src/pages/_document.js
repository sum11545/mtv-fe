import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createAppTheme from "@/theme/theme";
import createEmotionCache from "../utils/createEmotionCache";

// Create a default theme instance
const defaultTheme = createAppTheme("light");

export default class MyDocument extends Document {
  render() {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

    return (
      <Html lang="en">
        <Head>
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          {/* End Google Tag Manager */}

          {/* Open Graph Meta Tags */}
          <meta
            property="og:title"
            content="Delivering transparent and actionable Content and intelligence."
          />
          <meta property="og:url" content="https://www.moneytv.live/" />
          <meta
            property="og:description"
            content="Money TV is a visionary platform that bridges the gap between companies, investors and market intermediaries by delivering transparent, actionable and one-of-its-kind - Content and intelligence."
          />
          <meta
            property="og:image"
            content="https://www.moneytv.live/about/img/shared_image.jfif"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Money TV" />

          {/* Inline script to prevent FOUC - runs before React */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    // Set initial background to prevent white flash
                    const savedMode = localStorage.getItem('darkMode');
                    // Default to light mode instead of checking system preference
                    const isDarkMode = savedMode !== null ? savedMode === 'true' : false;
                    
                    // Set body background immediately
                    document.body.style.backgroundColor = isDarkMode ? '#040C38' : '#ffffff';
                    document.documentElement.style.backgroundColor = isDarkMode ? '#040C38' : '#ffffff';
                    
                    document.documentElement.classList.add('fonts-loading');
                    
                    // Check if critical fonts are already cached
                    if ('fonts' in document && document.fonts.check('400 16px Montserrat')) {
                      document.documentElement.classList.remove('fonts-loading');
                      document.documentElement.classList.add('fonts-loaded');
                    }
                  } catch(e) {
                    // Fallback - assume fonts are loaded after a short delay
                    setTimeout(function() {
                      document.documentElement.classList.remove('fonts-loading');
                      document.documentElement.classList.add('fonts-loaded');
                    }, 100);
                  }
                })();
              `,
            }}
          />

          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={defaultTheme.palette.primary.main}
          />

          {/* Preload critical fonts to reduce FOUC */}
          <link
            rel="preload"
            href="/fonts/Montserrat/Montserrat-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat/Montserrat-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Montserrat/Montserrat-SemiBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/OpenSans/OpenSans-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/SFPro/SFProText-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans+Kannada:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Telugu:wght@400;700&family=Noto+Sans+Gujarati:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
