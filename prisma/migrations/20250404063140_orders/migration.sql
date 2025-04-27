-- CreateEnum
CREATE TYPE "DeliveryNum" AS ENUM ('one', 'two', 'three');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "product" JSONB[],
    "paymentStatus" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "orderAddress" TEXT NOT NULL,
    "deliveryStatus" "DeliveryNum" NOT NULL DEFAULT 'one',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
