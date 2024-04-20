-- CreateEnum
CREATE TYPE "UserTypeEnum" AS ENUM ('Admin', 'Talent', 'Scout');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "AccountStatusEnum" AS ENUM ('Active', 'Suspended', 'Closed');

-- CreateEnum
CREATE TYPE "TransactionStatusEnum" AS ENUM ('Pending', 'Paid');

-- CreateEnum
CREATE TYPE "InvoiceStatusEnum" AS ENUM ('Draft', 'AwaitingApproval', 'AwaitingPayment', 'Paid', 'Void');

-- CreateTable
CREATE TABLE "nationality" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "iso2" CHAR(2) NOT NULL,
    "iso3" CHAR(3) NOT NULL,
    "isoNumeric" VARCHAR(3) NOT NULL,
    "phoneCode" VARCHAR(50) NOT NULL,
    "continent" VARCHAR(20),
    "capital" VARCHAR(50) NOT NULL,
    "timeZone" VARCHAR(50) NOT NULL,
    "currency" VARCHAR(20) NOT NULL,
    "symbol" VARCHAR(5),
    "wholePart" VARCHAR(20),
    "fractionPart" VARCHAR(20),
    "languageCodes" VARCHAR(100),
    "perUserPrice" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "nationality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "state" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "iso2" VARCHAR(10) NOT NULL,
    "nationalityId" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedBy" UUID,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "zip" VARCHAR(10) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "roleId" UUID,
    "nationalityId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "age" SMALLINT,
    "password" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(100),
    "ageRange" VARCHAR(50),
    "gender" "GenderEnum",
    "userType" "UserTypeEnum",
    "lastLogin" TIMESTAMPTZ(6),
    "lastLoginIp" VARCHAR(50),
    "defaultPage" VARCHAR(50),
    "passwordUpdatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "passwordLockedAt" TIMESTAMPTZ(6),
    "passwordHistory" JSONB,
    "passwordAttempt" SMALLINT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(500),
    "code" VARCHAR(20),
    "type" "UserTypeEnum",
    "defaultPage" VARCHAR(50),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_menu_permission" (
    "id" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "permission" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "role_menu_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "nationalityId" UUID,
    "age" SMALLINT,
    "phoneNo" VARCHAR(15),
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "brandName" VARCHAR(100),
    "weight" VARCHAR(100),
    "height" VARCHAR(100),
    "powerFoot" VARCHAR(100),
    "appearances" VARCHAR(100),
    "avatar" VARCHAR(100),
    "backgroundImage" VARCHAR(100),
    "website" VARCHAR(100),
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerCard" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "value" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "PlayerCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_media" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "baseUrl" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player-position" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "code" VARCHAR(10),
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "player-position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_images" (
    "id" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "url" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "trip_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scout_watch_list" (
    "id" UUID NOT NULL,
    "talentId" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "scout_watch_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "football_club" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(100),
    "country" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "stadium" VARCHAR(100) NOT NULL,
    "founded" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "football_club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "cardNumber" VARCHAR(16) NOT NULL,
    "cardType" VARCHAR(50) NOT NULL,
    "cardName" VARCHAR(50) NOT NULL,
    "cardExpiry" VARCHAR(5) NOT NULL,
    "cardCvv" VARCHAR(3) NOT NULL,
    "commission" VARCHAR(5),
    "discount" VARCHAR(5),
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL,
    "invoiceId" UUID NOT NULL,
    "amount" VARCHAR(50) NOT NULL,
    "status" "TransactionStatusEnum" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "amount" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" UUID,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nationality_name_key" ON "nationality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "nationality_iso2_key" ON "nationality"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "nationality_iso3_key" ON "nationality"("iso3");

-- CreateIndex
CREATE UNIQUE INDEX "state_name_key" ON "state"("name");

-- CreateIndex
CREATE UNIQUE INDEX "state_iso2_key" ON "state"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "role_code_key" ON "role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "role_menu_permission_roleId_key" ON "role_menu_permission"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_userId_key" ON "user_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_profileId_key" ON "social_media"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "player-position_name_key" ON "player-position"("name");

-- CreateIndex
CREATE UNIQUE INDEX "player-position_code_key" ON "player-position"("code");

-- CreateIndex
CREATE UNIQUE INDEX "trip_images_url_key" ON "trip_images"("url");

-- CreateIndex
CREATE UNIQUE INDEX "football_club_name_key" ON "football_club"("name");

-- CreateIndex
CREATE UNIQUE INDEX "billing_userId_key" ON "billing"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "billing_cardNumber_key" ON "billing"("cardNumber");

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_menu_permission" ADD CONSTRAINT "role_menu_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PlayerCard" ADD CONSTRAINT "PlayerCard_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player-position" ADD CONSTRAINT "player-position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_images" ADD CONSTRAINT "trip_images_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "scout_watch_list" ADD CONSTRAINT "scout_watch_list_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "billing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
