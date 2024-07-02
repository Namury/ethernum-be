BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DuitkuPayment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [merchantCode] NVARCHAR(1000) NOT NULL,
    [paymentAmount] NVARCHAR(1000) NOT NULL,
    [merchantOrderId] NVARCHAR(1000) NOT NULL,
    [productDetail] NVARCHAR(1000),
    [additionalParam] NVARCHAR(1000),
    [paymentCode] NVARCHAR(1000) NOT NULL,
    [resultCode] NVARCHAR(1000) NOT NULL,
    [merchantUserId] NVARCHAR(1000) NOT NULL,
    [reference] NVARCHAR(1000) NOT NULL,
    [publisherOrderId] NVARCHAR(1000) NOT NULL,
    [spUserHash] NVARCHAR(1000),
    [settlementDate] NVARCHAR(1000) NOT NULL,
    [issuerCode] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [DuitkuPayment_id_key] UNIQUE NONCLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
