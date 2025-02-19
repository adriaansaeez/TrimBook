/*
  Warnings:

  - You are about to alter the column `dia` on the `horario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the `estilistaservicio` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `estilistaId` to the `Servicio` table without a default value. This is not possible if the table is not empty.
  - Made the column `descripcion` on table `servicio` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `estilistaservicio` DROP FOREIGN KEY `EstilistaServicio_estilistaId_fkey`;

-- DropForeignKey
ALTER TABLE `estilistaservicio` DROP FOREIGN KEY `EstilistaServicio_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `horario` DROP FOREIGN KEY `Horario_estilistaId_fkey`;

-- DropForeignKey
ALTER TABLE `reserva` DROP FOREIGN KEY `Reserva_estilistaId_fkey`;

-- DropForeignKey
ALTER TABLE `reserva` DROP FOREIGN KEY `Reserva_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `reserva` DROP FOREIGN KEY `Reserva_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Horario_estilistaId_fkey` ON `horario`;

-- DropIndex
DROP INDEX `Reserva_estilistaId_fkey` ON `reserva`;

-- DropIndex
DROP INDEX `Reserva_servicioId_fkey` ON `reserva`;

-- DropIndex
DROP INDEX `Reserva_usuarioId_fkey` ON `reserva`;

-- AlterTable
ALTER TABLE `horario` MODIFY `dia` ENUM('LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO') NOT NULL;

-- AlterTable
ALTER TABLE `servicio` ADD COLUMN `estilistaId` INTEGER NOT NULL,
    MODIFY `descripcion` VARCHAR(191) NOT NULL,
    MODIFY `precio` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `estilistaservicio`;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_estilistaId_fkey` FOREIGN KEY (`estilistaId`) REFERENCES `Estilista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_estilistaId_fkey` FOREIGN KEY (`estilistaId`) REFERENCES `Estilista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_estilistaId_fkey` FOREIGN KEY (`estilistaId`) REFERENCES `Estilista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
