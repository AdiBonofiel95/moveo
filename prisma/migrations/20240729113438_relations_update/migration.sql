/*
  Warnings:

  - You are about to drop the column `projectName` on the `task` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `projectName`,
    ADD COLUMN `projectId` INTEGER NOT NULL,
    MODIFY `status` ENUM('TODO', 'INPROGRESS', 'DONE') NOT NULL DEFAULT 'TODO';

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
