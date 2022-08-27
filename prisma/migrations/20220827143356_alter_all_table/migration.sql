/*
  Warnings:

  - You are about to drop the column `cargo_id` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numero]` on the table `telefone` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_cargo_id_fkey";

-- AlterTable
ALTER TABLE "cargo" ADD COLUMN     "usuario_id" INTEGER;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "cargo_id";

-- CreateIndex
CREATE UNIQUE INDEX "telefone_numero_key" ON "telefone"("numero");

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "cargo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
