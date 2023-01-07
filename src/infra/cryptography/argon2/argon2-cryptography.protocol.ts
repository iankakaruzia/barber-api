import { CryptographyProtocol } from '@core/protocols/cryptography.protocol';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2CryptographyProtocol implements CryptographyProtocol {
  async hash(plaintext: string): Promise<string> {
    return argon2.hash(plaintext);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return argon2.verify(digest, plaintext);
  }
}
