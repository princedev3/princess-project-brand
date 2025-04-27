/*
  Warnings:

  - A unique constraint covering the columns `[payStackId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_payStackId_key" ON "Order"("payStackId");
