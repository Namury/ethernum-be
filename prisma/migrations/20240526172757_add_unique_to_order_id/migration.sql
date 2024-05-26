/*
  Warnings:

  - A unique constraint covering the columns `[order_id]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_order_id_key] UNIQUE NONCLUSTERED ([order_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
