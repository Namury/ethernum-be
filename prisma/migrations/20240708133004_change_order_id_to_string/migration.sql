BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[DuitkuPayment] DROP CONSTRAINT [DuitkuPayment_merchantOrderId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Orders] DROP CONSTRAINT [Orders_order_id_key];

-- AlterTable
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [merchantOrderId] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[DuitkuPayment] ALTER COLUMN [amount] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[Orders] ALTER COLUMN [order_id] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_order_id_key] UNIQUE NONCLUSTERED ([order_id]);

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
