-- DropForeignKey
ALTER TABLE `perfil` DROP FOREIGN KEY `Perfil_usuarioId_fkey`;

-- AddForeignKey
ALTER TABLE `Perfil` ADD CONSTRAINT `Perfil_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
