/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Response` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profilId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profilId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profilId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilId` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_userId_fkey";

-- DropIndex
DROP INDEX "Post_userId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "profilId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profil" ALTER COLUMN "creationDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "userId",
ADD COLUMN     "profilId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_profilId_key" ON "Post"("profilId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_profilId_key" ON "Response"("profilId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
