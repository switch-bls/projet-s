/*
  Warnings:

  - You are about to drop the column `EventId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_EventId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "EventId",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_EventToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToUser_AB_unique" ON "_EventToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToUser_B_index" ON "_EventToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToUser" ADD CONSTRAINT "_EventToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
