/*
  Warnings:

  - You are about to drop the `projec` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `projec`;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectName` VARCHAR(191) NOT NULL,
    `description` TINYTEXT NOT NULL,

    UNIQUE INDEX `Project_projectName_key`(`projectName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
