/*
  Warnings:

  - A unique constraint covering the columns `[userId,dayOfWeek]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `dayOfWeek` on the `Availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Availability"
  ALTER COLUMN "dayOfWeek" TYPE "DayOfWeek"
  USING (
    CASE "dayOfWeek"
      WHEN 0 THEN 'SUNDAY'
      WHEN 1 THEN 'MONDAY'
      WHEN 2 THEN 'TUESDAY'
      WHEN 3 THEN 'WEDNESDAY'
      WHEN 4 THEN 'THURSDAY'
      WHEN 5 THEN 'FRIDAY'
      WHEN 6 THEN 'SATURDAY'
    END
  )::"DayOfWeek";

-- CreateIndex
CREATE UNIQUE INDEX "Availability_userId_dayOfWeek_key" ON "Availability"("userId", "dayOfWeek");
