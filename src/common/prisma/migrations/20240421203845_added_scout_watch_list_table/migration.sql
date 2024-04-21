/*
  Warnings:

  - You are about to drop the column `profileId` on the `PlayerCard` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `football_club` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `social_media` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `trip_images` table. All the data in the column will be lost.
  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `social_media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `PlayerCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `football_club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `social_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `trip_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayerCard" DROP CONSTRAINT "PlayerCard_profileId_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_profileId_fkey";

-- DropForeignKey
ALTER TABLE "social_media" DROP CONSTRAINT "social_media_profileId_fkey";

-- DropForeignKey
ALTER TABLE "trip_images" DROP CONSTRAINT "trip_images_profileId_fkey";

-- DropForeignKey
ALTER TABLE "user_profile" DROP CONSTRAINT "user_profile_userId_fkey";

-- DropIndex
DROP INDEX "social_media_profileId_key";

-- AlterTable
ALTER TABLE "PlayerCard" DROP COLUMN "profileId",
ADD COLUMN     "code" VARCHAR(10),
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "value" DROP NOT NULL;

-- AlterTable
ALTER TABLE "address" DROP COLUMN "profileId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "football_club" DROP COLUMN "country",
ADD COLUMN     "countryId" UUID NOT NULL,
ADD COLUMN     "description" VARCHAR(255),
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "stadium" DROP NOT NULL,
ALTER COLUMN "founded" DROP NOT NULL;

-- AlterTable
ALTER TABLE "scout_watch_list" ADD COLUMN     "intention" UUID;

-- AlterTable
ALTER TABLE "social_media" DROP COLUMN "profileId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "trip_images" DROP COLUMN "profileId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" VARCHAR(255),
ADD COLUMN     "phoneNo" VARCHAR(15),
ADD COLUMN     "website" VARCHAR(100),
ALTER COLUMN "status" SET DEFAULT true;

-- DropTable
DROP TABLE "user_profile";

-- CreateIndex
CREATE UNIQUE INDEX "social_media_userId_key" ON "social_media"("userId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCard" ADD CONSTRAINT "PlayerCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_images" ADD CONSTRAINT "trip_images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "football_club" ADD CONSTRAINT "football_club_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
