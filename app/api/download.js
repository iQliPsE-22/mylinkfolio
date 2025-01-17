import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const { url, selector } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the specific div to load
    await page.waitForSelector(selector);

    // Screenshot the div
    const element = await page.$(selector); // Get the div element
    const screenshot = await element.screenshot(); // Capture as an image

    // Close Puppeteer
    await browser.close();

    // Send the image as a response
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error generating screenshot:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
