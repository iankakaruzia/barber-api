import { CryptographyModule } from '@infra/cryptography/cryptography.module';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, HttpModule, CryptographyModule],
})
export class AppModule {}
