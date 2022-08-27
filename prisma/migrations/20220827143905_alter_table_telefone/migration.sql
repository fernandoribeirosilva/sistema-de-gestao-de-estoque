/*
  Warnings:

  - Made the column `usuario_id` on table `telefone` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "telefone" DROP CONSTRAINT "telefone_usuario_id_fkey";

-- AlterTable
ALTER TABLE "telefone" ALTER COLUMN "usuario_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
