import { CryptographyProtocol } from '@core/protocols/cryptography.protocol';
import { Module } from '@nestjs/common';
import { Argon2CryptographyProtocol } from './argon2/argon2-cryptography.protocol';

@Module({
  providers: [
    {
      provide: CryptographyProtocol,
      useClass: Argon2CryptographyProtocol,
    },
  ],
  exports: [CryptographyProtocol],
})
export class CryptographyModule {}
