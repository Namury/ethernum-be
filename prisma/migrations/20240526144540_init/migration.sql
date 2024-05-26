BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Accounts] (
    [AccountID] INT NOT NULL IDENTITY(1,1),
    [AccountName] NVARCHAR(50) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [QQ3462895993] NVARCHAR(1000) NOT NULL,
    [AccountLevelCode] INT NOT NULL CONSTRAINT [Accounts_AccountLevelCode_df] DEFAULT 0,
    [CharacterCreateLimit] INT NOT NULL CONSTRAINT [Accounts_CharacterCreateLimit_df] DEFAULT 6,
    [CharacterMaxCount] INT NOT NULL CONSTRAINT [Accounts_CharacterMaxCount_df] DEFAULT 6,
    [RegisterDate] DATETIME2 NOT NULL CONSTRAINT [Accounts_RegisterDate_df] DEFAULT CURRENT_TIMESTAMP,
    [PublisherCode] INT NOT NULL CONSTRAINT [Accounts_PublisherCode_df] DEFAULT 0,
    [SecondAuthFailCount] INT NOT NULL CONSTRAINT [Accounts_SecondAuthFailCount_df] DEFAULT 0,
    [SecondAuthCode] INT NOT NULL CONSTRAINT [Accounts_SecondAuthCode_df] DEFAULT 1,
    [SecondAuthLockFlag] BIT NOT NULL CONSTRAINT [Accounts_SecondAuthLockFlag_df] DEFAULT 0,
    [ResetToken] NVARCHAR(1000),
    [ResetTokenExpiresAt] DATETIME2,
    [PasswordResetRequested] INT,
    [PasswordResetRequestedAt] DATETIME2,
    [VerificationToken] NVARCHAR(1000),
    [VerificationTokenExpiresAt] DATETIME2,
    [EmailVerified] BIT NOT NULL CONSTRAINT [Accounts_EmailVerified_df] DEFAULT 0,
    [ReferralCode] NVARCHAR(1000),
    CONSTRAINT [Accounts_AccountID_key] UNIQUE NONCLUSTERED ([AccountID]),
    CONSTRAINT [Accounts_AccountName_key] UNIQUE NONCLUSTERED ([AccountName]),
    CONSTRAINT [Accounts_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Donors] (
    [id] INT NOT NULL IDENTITY(1,1),
    [DonorName] NVARCHAR(1000) NOT NULL,
    [DonationAmount] NVARCHAR(1000) NOT NULL,
    [AccountID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Donors_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Donors_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[VipRank] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [point] INT NOT NULL,
    [AccountID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [VipRank_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [VipRank_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Orders] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [reffcode] NVARCHAR(1000) NOT NULL,
    [order_id] INT NOT NULL,
    [amount] DECIMAL(32,16) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [AccountID] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Orders_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Orders_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TopUpEvent] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dateStart] DATETIME2 NOT NULL,
    [dateEnd] DATETIME2 NOT NULL,
    [bonusPercent] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TopUpEvent_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [TopUpEvent_id_key] UNIQUE NONCLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Donors] ADD CONSTRAINT [Donors_AccountID_fkey] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts]([AccountID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VipRank] ADD CONSTRAINT [VipRank_AccountID_fkey] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts]([AccountID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [Orders_AccountID_fkey] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts]([AccountID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
