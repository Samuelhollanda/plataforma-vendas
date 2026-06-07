-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtoID" TEXT NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_produtoID_fkey" FOREIGN KEY ("produtoID") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
