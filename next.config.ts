import os from "os";
import type { NextConfig } from "next";

function lanDevOrigins() {
  const origins = new Set<string>(["localhost", "127.0.0.1"]);

  try {
    for (const addrs of Object.values(os.networkInterfaces())) {
      for (const addr of addrs ?? []) {
        const ipv4 = addr.family === "IPv4";
        if (ipv4 && !addr.internal) {
          origins.add(addr.address);
        }
      }
    }
  } catch {
    /* network interfaces unavailable in some build sandboxes */
  }

  return [...origins];
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  allowedDevOrigins: lanDevOrigins(),
};

export default nextConfig;
