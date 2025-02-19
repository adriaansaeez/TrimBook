-- DropForeignKey
ALTER TABLE `estilistaservicio` DROP FOREIGN KEY `EstilistaServicio_estilistaId_fkey`;

-- DropForeignKey
ALTER TABLE `estilistaservicio` DROP FOREIGN KEY `EstilistaServicio_servicioId_fkey`;

-- DropIndex
DROP INDEX `EstilistaServicio_servicioId_fkey` ON `estilistaservicio`;

-- AddForeignKey
ALTER TABLE `EstilistaServicio` ADD CONSTRAINT `EstilistaServicio_estilistaId_fkey` FOREIGN KEY (`estilistaId`) REFERENCES `Estilista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EstilistaServicio` ADD CONSTRAINT `EstilistaServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
