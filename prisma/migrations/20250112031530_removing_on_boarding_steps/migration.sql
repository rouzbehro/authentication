/*
  Warnings:

  - You are about to drop the column `onboardingStep` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "onboardingStep";

-- DropEnum
DROP TYPE "OnboardingStep";
