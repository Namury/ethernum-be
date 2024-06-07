BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[PVPRanking] (
    [CharacterName] NVARCHAR(50) NOT NULL,
    [GuildName] NVARCHAR(50) NOT NULL,
    [PVPExp] INT NOT NULL,
    [Kill] INT NOT NULL,
    [Death] INT NOT NULL,
    CONSTRAINT [PVPRanking_CharacterName_key] UNIQUE NONCLUSTERED ([CharacterName])
);

-- CreateTable
CREATE TABLE [dbo].[PVERanking] (
    [CharacterName] NVARCHAR(50) NOT NULL,
    [GuildName] NVARCHAR(50) NOT NULL,
    [TotalRank] INT NOT NULL,
    [DifficultyStep] SMALLINT NOT NULL,
    [ClearTime] DATETIME2 NOT NULL,
    CONSTRAINT [PVERanking_GuildName_key] UNIQUE NONCLUSTERED ([GuildName])
);

-- CreateTable
CREATE TABLE [dbo].[Characters] (
    [CharacterID] INT NOT NULL,
    [CharacterName] NVARCHAR(30) NOT NULL,
    [AccountID] INT NOT NULL,
    [AccountLevelCode] TINYINT NOT NULL,
    CONSTRAINT [Characters_CharacterID_key] UNIQUE NONCLUSTERED ([CharacterID])
);

-- CreateTable
CREATE TABLE [dbo].[CharacterStatus] (
    [CharacterID] INT NOT NULL,
    [LikeCount] INT NOT NULL,
    [Coin] BIGINT NOT NULL,
    [WarehouseCoin] BIGINT NOT NULL,
    CONSTRAINT [CharacterStatus_CharacterID_key] UNIQUE NONCLUSTERED ([CharacterID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Characters] ADD CONSTRAINT [Characters_AccountID_fkey] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts]([AccountID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CharacterStatus] ADD CONSTRAINT [CharacterStatus_CharacterID_fkey] FOREIGN KEY ([CharacterID]) REFERENCES [dbo].[Characters]([CharacterID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
