/*
  Warnings:

  - You are about to drop the column `userId` on the `Profil` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profilId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profilId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profil" DROP CONSTRAINT "Profil_userId_fkey";

-- DropIndex
DROP INDEX "Profil_userId_key";

-- AlterTable
ALTER TABLE "Profil" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_profilId_key" ON "User"("profilId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilId_fkey" FOREIGN KEY ("profilId") REFERENCES "Profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
