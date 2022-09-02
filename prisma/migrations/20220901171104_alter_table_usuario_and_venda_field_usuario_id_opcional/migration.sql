/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `venda` will be added. If there are existing duplicate values, this will fail.
  - Made the column `usuario_id` on table `venda` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_usuario_id_fkey";

-- AlterTable
ALTER TABLE "venda" ALTER COLUMN "usuario_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "venda_usuario_id_key" ON "venda"("usuario_id");

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
