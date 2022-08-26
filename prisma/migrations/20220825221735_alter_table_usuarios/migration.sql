/*
  Warnings:

  - Added the required column `email` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "email" VARCHAR(80) NOT NULL;
