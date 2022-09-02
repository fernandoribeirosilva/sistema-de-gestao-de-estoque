/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `telefone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "telefone_usuario_id_key" ON "telefone"("usuario_id");
