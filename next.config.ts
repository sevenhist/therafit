/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Включаем режим статического экспорта
  images: {
    unoptimized: true, // Отключаем оптимизацию изображений (некоторые старые методы могут не поддерживаться)
  }
};

module.exports = nextConfig;
