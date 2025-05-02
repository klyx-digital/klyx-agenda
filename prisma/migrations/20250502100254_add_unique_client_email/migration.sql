/*
  Warnings:

  - A unique constraint covering the columns `[email,userId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_email_userId_key" ON "Client"("email", "userId");
