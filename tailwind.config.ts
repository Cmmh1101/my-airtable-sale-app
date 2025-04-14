const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        keyframes: {
          'fade-in': {
            from: { opacity: '0' },
            to: { opacity: '1' },
          },
        },
        animation: {
          'fade-in': 'fade-in 0.8s ease-out',
        },
      },
    },
    plugins: [],
  };
  
  export default config;  