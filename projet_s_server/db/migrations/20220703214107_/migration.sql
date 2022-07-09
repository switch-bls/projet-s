/*
  Warnings:

  - You are about to drop the column `title` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `preudo` on the `User` table. All the data in the column will be lost.
  - Added the required column `pseudo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "preudo",
ADD COLUMN     "pseudo" TEXT NOT NULL;
