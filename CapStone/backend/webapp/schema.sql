DROP TABLE IF EXISTS CongressMember;
CREATE TABLE CongressMember (
    ID char(7) PRIMARY KEY,
    FirstName varchar(50) NOT NULL,
    MiddleName varchar(50),
    LastName varchar(50) NOT NULL,
    MemState char(2) NOT NULL,
    DOB date NOT NULL,
    Party char NOT NULL,
    ContactForm varchar(255),
    Phone char(),
    Facebook varchar(255),
    Twitter varchar(255),
    MemWebsite varchar(255),
    UNIQUE (FirstName, LastName)
);