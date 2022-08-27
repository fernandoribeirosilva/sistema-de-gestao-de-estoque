/*
  Warnings:

  - Made the column `cargo_id` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_cargo_id_fkey";

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "cargo_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
