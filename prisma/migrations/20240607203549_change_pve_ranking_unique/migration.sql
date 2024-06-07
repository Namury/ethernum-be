/*
  Warnings:

  - A unique constraint covering the columns `[CharacterName]` on the table `PVERanking` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[PVERanking] DROP CONSTRAINT [PVERanking_GuildName_key];

-- CreateIndex
ALTER TABLE [dbo].[PVERanking] ADD CONSTRAINT [PVERanking_CharacterName_key] UNIQUE NONCLUSTERED ([CharacterName]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
