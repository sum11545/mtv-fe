/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mtv-fe.vercel.app",
  generateRobotsTxt: true, // creates robots.txt as well
};
