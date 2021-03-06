USE [ClientInformation]
GO
/****** Object:  Table [dbo].[Client]    Script Date: 5/21/2021 10:03:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Client](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [nvarchar](200) NOT NULL,
	[Surname] [nvarchar](200) NULL,
	[Email] [nvarchar](200) NULL,
	[Phone] [nvarchar](100) NULL,
	[Gender] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClientAddress]    Script Date: 5/21/2021 10:03:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientAddress](
	[ClientAddressID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[ClientAddressType] [nvarchar](50) NULL,
	[ClientAddress] [nvarchar](200) NULL,
	[Street] [nvarchar](200) NULL,
	[City] [nvarchar](200) NULL,
	[Province] [nvarchar](50) NULL,
	[PostCode] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientAddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ClientAddress]  WITH CHECK ADD  CONSTRAINT [FK_ClientAddress_Client] FOREIGN KEY([ClientID])
REFERENCES [dbo].[Client] ([ClientID])
GO
ALTER TABLE [dbo].[ClientAddress] CHECK CONSTRAINT [FK_ClientAddress_Client]
GO
/****** Object:  StoredProcedure [dbo].[InsertClient]    Script Date: 5/21/2021 10:03:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertClient]
    
	@NAME nvarchar(100) = NULL,
	@Surname nvarchar(100) = NULL,
	@Email nvarchar(100) = NULL,
	@Phone nvarchar(100) = NULL,
	@Gender nvarchar(100) = NULL
AS
BEGIN

	INSERT INTO [dbo].[Client] VALUES 
	 (@NAME,
	  @Surname,
	  @Email,	
	  @Phone, 
	  @Gender)   

END

GO
/****** Object:  StoredProcedure [dbo].[InsertClientAddress]    Script Date: 5/21/2021 10:03:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertClientAddress]
    @ClientID INT = NULL,
	@ClientAddressType nvarchar(100) = NULL,
	@ClientAddress nvarchar(100) = NULL,
	@Street nvarchar(100) = NULL,
	@City nvarchar(100) = NULL,
	@Province nvarchar(100) = NULL,
	@PostCode nvarchar(100) = NULL
AS
BEGIN

	INSERT INTO [dbo].[ClientAddress] VALUES 
	 (@ClientID,
	  @ClientAddressType,
	  @ClientAddress,	
	  @Street, 
	  @City,
	  @Province,
	  @PostCode)   

END

GO
/****** Object:  StoredProcedure [dbo].[UpdateAddressClient]    Script Date: 5/21/2021 10:03:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateAddressClient]
    @ClientAddressID int,
    @ClientID INT = NULL,
	@ClientAddressType nvarchar(100) = NULL,
	@ClientAddress nvarchar(100) = NULL,
	@Street nvarchar(100) = NULL,
	@City nvarchar(100) = NULL,
	@Province nvarchar(100) = NULL,
	@PostCode nvarchar(100) = NULL
AS
BEGIN

	UPDATE [dbo].[ClientAddress] SET
	 [ClientID] = @ClientID,
	 [ClientAddressType] = @ClientAddressType,
	 [ClientAddress] = @ClientAddress,	
	 [Street] = @Street, 
	 [City] = @City,
	 [Province] = @Province,
	 [PostCode] = @PostCode


     WHERE ClientAddressID = @ClientAddressID

END

GO
/****** Object:  StoredProcedure [dbo].[UpdateClient]    Script Date: 5/21/2021 10:03:43 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateClient]
    @ClientID int,	
	@NAME nvarchar(100) = NULL,
	@Surname nvarchar(100) = NULL,
	@Email nvarchar(100) = NULL,
	@Phone nvarchar(100) = NULL,
	@Gender nvarchar(100) = NULL
AS
BEGIN

	UPDATE [dbo].[Client] SET
	 [NAME] = @NAME,
	 [Surname] = @Surname,
	 [Email] = @Email,	
	 [Phone] = @Phone, 
	 [Gender] = @Gender
     WHERE ClientID = @ClientID

END

GO
