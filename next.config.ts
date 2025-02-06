/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Включаем режим статического экспорта
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений (некоторые старые методы могут не поддерживаться)
  },
  trailingSlash: true, // Опционально, если хочешь, чтобы все URL заканчивались слэшем, например, `/about/`
};

module.exports = nextConfig;
