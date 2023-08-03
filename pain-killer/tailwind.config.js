/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        // primary
        'Pri-50': '#EBF1FF', // bgc-50 동일
        'Pri-100': '#BFD1FF', // bgc_100 동일
        'Pri-200': '#92B1FF',
        'Pri-300': '#6691FF',
        'Pri-400': '#3A71FF',
        'Pri-500': '#2D62EA',
        'Pri-600': '#1546C2',
        'Pri-700': '#0833A0',
        'Pri-800': '#00247E',
        'Pri-900': '#001A5C',
        //gray
        'Gray-50': '#FBFBFB', // bg-50 동일
        'Gray-100': '#F4F4F4', // bg-100 동일
        'Gray-200': '#E7E7E7', // text-hold 동일  그림자컬러 투명도 80%
        'Gray-300': '#CFCFCF', // bg-300 동일
        'Gray-400': '#AEAEAE', // text-400 동일
        'Gray-500': '#808080',
        'Gray-600': '#808080',
        'Gray-700': '#737373', // text-700 동일
        'Gray-800': '#323232',
        'Gray-900': '#1D1D1D', // text-900 동일, dim컬러 투명도 80%

        //basic
        bsblack: '#141212',
        bswhite: '#FFFFFF',

        //system
        error: '#DF291D',
        positive: '1FB881',

        //text
      },
    },
  },
  plugins: [],
};
