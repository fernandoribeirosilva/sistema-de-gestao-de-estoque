/*
  Warnings:

  - You are about to drop the column `telefone_id` on the `usuario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_telefone_id_fkey";

-- AlterTable
ALTER TABLE "telefone" ADD COLUMN     "usuario_id" INTEGER;

-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "telefone_id";

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
