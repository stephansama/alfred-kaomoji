import fs from "node:fs";
import puppeteer from "puppeteer";

const kaomojiOutput = "../data/kaomojis.json";
const categoryOutput = "../data/categories.json";

const url = "https://kaomoji.ru/en/";

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(url);

const headingsContainer = await page.locator(".table_column").waitHandle();

const headings = await Promise.all(
  (await headingsContainer.$$("li")).map(
    async (f) => await f.evaluate((f) => f.textContent),
  ),
);

const body = await page.locator("body").waitHandle();

const kaomojis = await Promise.all(
  (await body.$$(".table_kaomoji")).map(async (f) =>
    Promise.all(
      (await f.$$("span")).map((e) => e.evaluate((z) => z.textContent)),
    ),
  ),
);

const map = headings.reduce(
  (p, k, i) => ({
    ...p,
    ...kaomojis[i].reduce(
      (p, c, index) => ({ ...p, ...(c ? { [k + index]: c } : {}) }),
      {},
    ),
  }),
  {},
);

fs.writeFileSync("./kaomojis.json", JSON.stringify(map, undefined, 2));

fs.writeFileSync("./categories.json", JSON.stringify(headings, undefined, 2));

await browser.close();
