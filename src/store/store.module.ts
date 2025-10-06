import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { Store } from './entities/store.entity';
import { StoreResolver } from './store.resolver';
import { StoreService } from './store.service';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Store])],
  providers: [StoreService, StoreResolver],
})
export class StoreModule {}
