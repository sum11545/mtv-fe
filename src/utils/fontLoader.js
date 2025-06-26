// Font loading utility to minimize FOUC
export const loadCriticalFonts = () => {
  if (typeof window === "undefined") return;

  const criticalFonts = [
    {
      family: "Montserrat",
      weight: "400",
      style: "normal",
    },
    {
      family: "Montserrat",
      weight: "700",
      style: "normal",
    },
    {
      family: "Open Sans",
      weight: "400",
      style: "normal",
    },
    {
      family: "SFProText",
      weight: "400",
      style: "normal",
    },
  ];

  // Check if FontFace API is supported
  if ("fonts" in document) {
    const fontPromises = criticalFonts.map((font) => {
      const fontFace = new FontFace(
        font.family,
        `url("/fonts/${font.family}/${font.family}-${
          font.weight === "400" ? "Regular" : "Bold"
        }.woff2") format("woff2")`,
        {
          weight: font.weight,
          style: font.style,
          display: "fallback",
        }
      );

      document.fonts.add(fontFace);
      return fontFace.load();
    });

    Promise.all(fontPromises)
      .then(() => {
        document.documentElement.classList.add("fonts-loaded");
        document.documentElement.classList.remove("fonts-loading");
      })
      .catch((error) => {
        console.warn("Font loading failed:", error);
        document.documentElement.classList.add("fonts-loaded");
        document.documentElement.classList.remove("fonts-loading");
      });
  } else {
    // Fallback for browsers without FontFace API
    setTimeout(() => {
      document.documentElement.classList.add("fonts-loaded");
      document.documentElement.classList.remove("fonts-loading");
    }, 100);
  }
};

// Initialize font loading
export const initFontLoading = () => {
  if (typeof window === "undefined") return;

  // Add loading class initially
  document.documentElement.classList.add("fonts-loading");

  // Load fonts when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCriticalFonts);
  } else {
    loadCriticalFonts();
  }
};
