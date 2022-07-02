/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    console.log("Rewrites called");
    return process.env.NODE_ENV === "development"
        ? [
          {
            source: '/backend/:path*/',
            destination: 'http://localhost:8000/players-api/:path*/' // Proxy to Backend
          },
        ]
        : [];
  },
};

// module.exports = {
//   async rewrites() {
//     return [
//       {
//
//       }
//     ]
//   }
// }




