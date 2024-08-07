BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DNAuth] (
    [id] INT NOT NULL IDENTITY(1,1),
    [CertifyingStep] INT NOT NULL CONSTRAINT [DNAuth_CertifyingStep_df] DEFAULT 0,
    CONSTRAINT [DNAuth_id_key] UNIQUE NONCLUSTERED ([id])
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
