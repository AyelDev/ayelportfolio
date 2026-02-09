import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Initialize theme early to avoid flash
try{
	const stored = localStorage.getItem('theme')
	if(stored === 'light' || stored === 'dark'){
		document.documentElement.classList.add(stored)
	} else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
		document.documentElement.classList.add('light')
	} else {
		document.documentElement.classList.add('dark')
	}
}catch(e){ /* ignore */ }

createApp(App).mount('#app')
