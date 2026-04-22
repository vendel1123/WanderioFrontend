import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/users':{
        target: 'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin: true
      },
      '/flights': {
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      },
      '/cities':{
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      },
      '/hotels':{
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      },
      '/attractions':{
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      },
      '/rooms':{
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      },
      '/hotelorders':{
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      },
      '/ticketorders':{
        target:'https://nodejs210.dszcbaross.edu.hu/api',
        changeOrigin:true
      }

    }
  }

})
