// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: [
//       "res.cloudinary.com",
//       "avatars.githubusercontent.com",
//       "lh3.googleusercontent.com"
//     ]
//   }
// };

// export default nextConfig;


// next.config.js
// const { withSuperjson } = require('next-superjson')

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         pathname: "/**",
//       },
//     ],
//   },
// }

// module.exports = withSuperjson()(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
