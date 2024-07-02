/*
  Warnings:

  - You are about to drop the column `paymentAmount` on the `DuitkuPayment` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [paymentCode] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [resultCode] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [reference] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [publisherOrderId] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [settlementDate] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [issuerCode] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] DROP COLUMN [paymentAmount];
ALTER TABLE [dbo].[DuitkuPayment] ADD [amount] DECIMAL(32,16);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
