/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `cargo` table. All the data in the column will be lost.
  - Added the required column `cargo_id` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cargo" DROP CONSTRAINT "cargo_usuario_id_fkey";

-- AlterTable
ALTER TABLE "cargo" DROP COLUMN "usuario_id";

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "cargo_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cargo_id_fkey" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
