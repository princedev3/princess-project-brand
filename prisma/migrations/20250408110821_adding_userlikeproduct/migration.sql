-- CreateTable
CREATE TABLE "UserLikesProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLikesProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserLikesProduct_userId_productId_idx" ON "UserLikesProduct"("userId", "productId");

-- AddForeignKey
ALTER TABLE "UserLikesProduct" ADD CONSTRAINT "UserLikesProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikesProduct" ADD CONSTRAINT "UserLikesProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
