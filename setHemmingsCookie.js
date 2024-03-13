import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import puppeteer from 'puppeteer';
import {firestore} from './firebaseConfig.js'
const link = 'https://www.hemmings.com/classifieds/cars-for-sale/bmw';
let cookie;
const main = async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--disable-site-isolation-trials'], headless: 'new' })
    const page = await browser.newPage();
    page.setRequestInterception(true);
    page.on('request', async (request) => {
      const headers = request.headers();
      if (headers.referer == 'https://www.hemmings.com/classifieds/cars-for-sale/bmw' && request.url() == 'https://www.hemmings.com/stories-api/search/bmw/related-models') {
        cookie = headers.cookie;
        await page.close()
      }
      request.continue()
    })
  
    await page.goto(link);
    await page.close();
    console.log(cookie);
  } catch (error) { 
    uploadToFirebase(cookie)

  }
};





const uploadToFirebase = async (cookie) => { 
  const docRef = doc(firestore, 'hemmings', 'cookie');
  await setDoc(docRef, { currentCookie: cookie });
  console.log("completed upload!");
  process.exit(1);
}

main()
