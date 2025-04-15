export const siteConfig = {
  name: "IoT Interface",
  url: "https://vercel.app.iot",
  description: "Dashboard for monitoring and analyzing real-time IoT data.",
  baseLinks: {
    dashboard: "/dashboard",
    devices: "/devices",
    settings: "/settings",
    alerts: "/alerts",
    reports: "/reports",
  }
}

export type siteConfig = typeof siteConfig
