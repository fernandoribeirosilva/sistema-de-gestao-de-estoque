-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_venda_id_fkey";

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "venda_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
