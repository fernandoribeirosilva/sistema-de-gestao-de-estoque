/*
  Warnings:

  - The `data_venda` column on the `venda` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "venda" DROP COLUMN "data_venda",
ADD COLUMN     "data_venda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
