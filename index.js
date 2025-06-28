import getColors from 'get-image-colors';
import puppeteer from 'puppeteer';

async function takeScreenshot(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url, {waitUntil: 'networkidle2', timeout: 60000 });
	await page.setViewport({width:1280,height:800})
	const screenshot = await page.screenshot({fullPage: true, path: 'example.png'})
	await browser.close();
	return screenshot;
}

async function getColorsFromImage(buffer) {
	const colors = await getColors(buffer, 'image/png')
	return colors[0].hex();
}

async function getWebPageColor (url) {
	const screenshot = await takeScreenshot(url);
	const color = await getColorsFromImage(screenshot);
	console.log(`Dominant Color: ${color}`);
	return color;
}

// const url = 'https://developer.chrome.com/'
// const url = 'https://homegeniusrealestate.com/';
const url = 'https://example.com';
getWebPageColor(url);