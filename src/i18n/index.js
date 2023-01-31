import i18n from 'i18next'
import { initReactI18next } from "react-i18next"
import detectBrowserLanguage from 'detect-browser-language'
import enTranslation from './en.json'
import esTranslation from './es.json'


const resources = {
    en: {
        translation: enTranslation
    },
    es: {
        translation: esTranslation
    }
}
const language = detectBrowserLanguage().split('-')[0] === 'es' ? 'es' : 'en'

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: language,
        keySeparator: false,
        interPolation: {
            escapeValue: false
        }
    })

export default i18n