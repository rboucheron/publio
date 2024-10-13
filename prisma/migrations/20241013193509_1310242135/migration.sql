/*
  Warnings:

  - You are about to drop the column `profilId` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `profilId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `profilId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `profilId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profil` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Certification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pseudo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilPicture` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pseudo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_profilId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_profilId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_profilId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profilId_fkey";

-- DropIndex
DROP INDEX "Certification_profilId_key";

-- DropIndex
DROP INDEX "User_profilId_key";

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "profilId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "profilId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "profilId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilId",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "profilPicture" TEXT NOT NULL,
ADD COLUMN     "pseudo" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;

-- DropTable
DROP TABLE "Profil";

-- CreateIndex
CREATE UNIQUE INDEX "Certification_userId_key" ON "Certification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
