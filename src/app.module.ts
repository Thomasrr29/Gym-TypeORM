import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence/persistence.module';
import { ModuleModule } from './module/module.module';


@Module({
  imports: [ModuleModule, PersistenceModule],
})
export class AppModule {}
