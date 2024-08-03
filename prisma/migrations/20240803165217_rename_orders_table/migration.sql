/*
  Warnings:

  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[DuitkuPayment] DROP CONSTRAINT [DuitkuPayment_merchantOrderId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [Orders_AccountID_fkey];

-- DropTable
DROP TABLE [dbo].[Orders];

-- CreateTable
CREATE TABLE [dbo].[DuitkuOrders] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [reffcode] NVARCHAR(1000) NOT NULL,
    [order_id] NVARCHAR(1000) NOT NULL,
    [amount] DECIMAL(32,16) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [AccountID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DuitkuOrders_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [DuitkuOrders_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [DuitkuOrders_order_id_key] UNIQUE NONCLUSTERED ([order_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[DuitkuOrders] ADD CONSTRAINT [DuitkuOrders_AccountID_fkey] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts]([AccountID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DuitkuPayment] ADD CONSTRAINT [DuitkuPayment_merchantOrderId_fkey] FOREIGN KEY ([merchantOrderId]) REFERENCES [dbo].[DuitkuOrders]([order_id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
