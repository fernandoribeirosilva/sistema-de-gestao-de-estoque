-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "telefone_id" INTEGER;

-- CreateTable
CREATE TABLE "telefone" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(20) NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_telefone_id_fkey" FOREIGN KEY ("telefone_id") REFERENCES "telefone"("id") ON DELETE SET NULL ON UPDATE CASCADE;
