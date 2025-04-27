// import chromium from "@sparticuz/chromium";
// import puppeteer from "puppeteer-core";
import path from "path";
import { Order } from "@prisma/client";
import { format } from "date-fns";
import fs from "fs";

type ProductItem = {
  name: string;
  quantity: number;
  price: number;
};

const isProd = process.env.NODE_ENV === "production";

let puppeteer: any;
let chromium: any;

if (isProd) {
  chromium = require("@sparticuz/chromium");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

const ensureDirExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
export const generateOrderPdf = async (
  orderDetails: Order
): Promise<string> => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Order Summary</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            background-color: #f9f9f9;
            color: #333;
          }

          .card {
            background-color: #fff;
            border-radius: 8px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            max-width: 800px;
            margin: 0 auto;
          }

          .header {
            margin-bottom: 24px;
          }

          .title {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
          }

          .subtitle {
            font-size: 14px;
            color: #888;
            margin-top: 4px;
          }

          .grid {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 32px;
          }

          .grid-item {
            flex: 1 1 30%;
            min-width: 200px;
          }

          .label {
            font-size: 13px;
            color: #888;
            margin-bottom: 4px;
          }

          .value {
            font-weight: 500;
            font-size: 14px;
          }

          .badge {
            display: inline-block;
            padding: 4px 8px;
            background-color: #eef2ff;
            color: #3b82f6;
            border-radius: 4px;
            font-size: 13px;
            margin-top: 4px;
          }

          .products {
            margin-top: 20px;
          }

          .products h3 {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
          }

          .products ul {
            padding-left: 20px;
            font-size: 14px;
            color: #555;
          }

          .products li {
            margin-bottom: 6px;
          }

          .mono {
            font-family: monospace;
            font-size: 12px;
            word-break: break-all;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="title">Lolly Collection</div>
            <div class="title">Order ID: ${orderDetails?.id}</div>
            <div class="subtitle">
              Placed on ${format(new Date(orderDetails?.createdAt), "yyyy-MM-dd")}
            </div>
          </div>
          <div class="grid">
            <div class="grid-item">
              <div class="label">Username</div>
              <div class="value">${orderDetails?.username}</div>
            </div>
            <div class="grid-item">
              <div class="label">Email</div>
              <div class="value">${orderDetails?.useremail}</div>
            </div>
            <div class="grid-item">
              <div class="label">Phone</div>
              <div class="value">${orderDetails?.userPhone}</div>
            </div>
            <div class="grid-item">
              <div class="label">Payment Status</div>
              <div class="badge">${orderDetails?.paymentStatus}</div>
            </div>
            <div class="grid-item">
              <div class="label">Amount</div>
              <div class="value">₦${orderDetails?.amount}</div>
            </div>
            <div class="grid-item">
              <div class="label">Transaction ID</div>
              <div class="value">${orderDetails?.payStackId}</div>
            </div>
            <div class="grid-item" style="flex: 1 1 100%;">
              <div class="label">Address</div>
              <div class="value">${orderDetails?.orderAddress}</div>
            </div>
            <div class="grid-item">
              <div class="label">Delivery Status</div>
              <div class="badge">
                ${
                  orderDetails?.deliveryStatus === "one"
                    ? "Processing"
                    : orderDetails?.deliveryStatus === "two"
                      ? "Shipped"
                      : "Delivered"
                }
              </div>
            </div>
          </div>

          <div style="margin-top: 30px;">
            <h3 style="font-size: 18px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px;">Products</h3>
            <ul style="list-style: none; padding-left: 0; margin-top: 10px;">
              ${(orderDetails.product as ProductItem[])
                .map(
                  (item) => `
                  <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #444;">${item.name}</strong> 
                    <span style="color: #666;">(x${item.quantity})</span> 
                    <span style="float: right; color: #222;">₦${item.price}</span>
                  </li>
                `
                )
                .join("")}
            </ul>
          </div>
        </div>
      </body>
    </html>
  `;

  // const browser = await puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath(),
  //   headless: chromium.headless
  // });

  const browser = await puppeteer.launch(
    isProd
      ? {
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
        }
      : {
          headless: true,
        }
  );

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  // const page = await browser.newPage();
  // await page.setContent(htmlContent);
  const outputDir = isProd ? "/tmp" : path.join(process.cwd(), "public", "tmp");
  ensureDirExists(outputDir);

  const filePath = path.join(outputDir, `order-${orderDetails.id}.pdf`);
  await page.pdf({ path: filePath, format: "A4" });
  // const filePath = path.join(
  //   isProd ? "/tmp" : "public/tmp",
  //   `order-${orderDetails.id}.pdf`
  // );
  // await page.pdf({ path: filePath, format: "A4" });

  // const filePath = path.join("/tmp", `order-${orderDetails.id}.pdf`);

  // await page.pdf({ path: filePath, format: "A4" });
  await browser.close();

  return filePath;
};
