module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // {
  //   content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  //   options: {
  //     safelist: [
  //       'bg-primary-50',
  //       'bg-primary-100',
  //       'bg-primary-200',
  //       'bg-primary-300',
  //       'bg-primary-400',
  //       'bg-primary-500',
  //       'bg-primary-600',
  //       'bg-secondary-50',
  //       'bg-secondary-100',
  //       'bg-secondary-200',
  //       'bg-secondary-300',
  //       'bg-secondary-400',
  //       'bg-secondary-500',
  //       'bg-secondary-600',
  //       'border-primary-50',
  //       'border-primary-100',
  //       'border-primary-200',
  //       'border-primary-300',
  //       'border-primary-400',
  //       'border-primary-500',
  //       'border-primary-600',
  //       'border-secondary-50',
  //       'border-secondary-100',
  //       'border-secondary-200',
  //       'border-secondary-300',
  //       'border-secondary-400',
  //       'border-secondary-500',
  //       'border-secondary-600'
  //     ]
  //   }
  // },
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#e6ecee',
          100: '#b5c6cd',
          200: '#84a1ac',
          300: '#527b8b',
          400: '#21556a',
          500: '#084259',
          600: '#073b50'
        },
        'secondary': {
          50: '#f4e6eb',
          100: '#ddb3c2',
          200: '#c6819a',
          300: '#af4f72',
          400: '#981c49',
          500: '#8C0335',
          600: '#7e0330'
        }  
      }
    },
  },
  variants: {
    animation: ["motion-safe"],
    extend: {},
  },
  plugins: [],
}
