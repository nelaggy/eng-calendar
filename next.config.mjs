/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
    async rewrites() {
      return [
        {
          source: '/calendar/:id/calendar.ics',
          destination: '/calendar/:id',
        },
      ]
    },
}
