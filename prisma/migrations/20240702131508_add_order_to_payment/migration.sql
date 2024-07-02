/*
  Warnings:

  - You are about to alter the column `merchantOrderId` on the `DuitkuPayment` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [merchantOrderId] INT NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [merchantUserId] NVARCHAR(1000) NULL;

-- AddForeignKey
ALTER TABLE [dbo].[DuitkuPayment] ADD CONSTRAINT [DuitkuPayment_merchantOrderId_fkey] FOREIGN KEY ([merchantOrderId]) REFERENCES [dbo].[Orders]([order_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
