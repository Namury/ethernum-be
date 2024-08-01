/*
  Warnings:

  - You are about to drop the column `ReferralCode` on the `Accounts` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Accounts] ALTER COLUMN [name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Accounts] DROP COLUMN [ReferralCode];
ALTER TABLE [dbo].[Accounts] ADD [referral_code] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
