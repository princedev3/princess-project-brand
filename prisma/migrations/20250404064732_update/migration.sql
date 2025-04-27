/*
  Warnings:

  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - Added the required column `payStackId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useremail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "payStackId" TEXT NOT NULL,
ADD COLUMN     "useremail" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
