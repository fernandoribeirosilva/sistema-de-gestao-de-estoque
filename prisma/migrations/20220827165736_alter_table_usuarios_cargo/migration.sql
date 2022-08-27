/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `usuario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_cargo_id_fkey";

-- AlterTable
ALTER TABLE "cargo" ADD COLUMN     "usuarioId" INTEGER;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "cargo_id";

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
