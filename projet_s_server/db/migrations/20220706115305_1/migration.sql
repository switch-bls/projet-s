/*
  Warnings:

  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('HOST', 'GUEST');

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUser" DROP CONSTRAINT "_EventToUser_B_fkey";

-- DropTable
DROP TABLE "_EventToUser";

-- CreateTable
CREATE TABLE "Participate" (
    "eventId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "status" "ParticipantStatus" NOT NULL,

    CONSTRAINT "Participate_pkey" PRIMARY KEY ("eventId","participantId")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "friendRequestedId" INTEGER NOT NULL,
    "friendRequesterId" INTEGER NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("friendRequestedId","friendRequesterId")
);

-- CreateTable
CREATE TABLE "Friend" (
    "friend1Id" INTEGER NOT NULL,
    "friend2Id" INTEGER NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("friend1Id","friend2Id")
);

-- AddForeignKey
ALTER TABLE "Participate" ADD CONSTRAINT "Participate_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participate" ADD CONSTRAINT "Participate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_friendRequestedId_fkey" FOREIGN KEY ("friendRequestedId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_friendRequesterId_fkey" FOREIGN KEY ("friendRequesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friend1Id_fkey" FOREIGN KEY ("friend1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friend2Id_fkey" FOREIGN KEY ("friend2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
