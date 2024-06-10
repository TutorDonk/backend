import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterPayloadDto } from './dto/register.dto';
import { FirestoreService } from 'src/firestore/firestore.service';

const fakeUsers = [
  {
    id: 1,
    username: 'hafidz',
    password: 'password',
  },
  {
    id: 2,
    username: 'hafidzz',
    password: 'password',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firestoreService: FirestoreService,
  ) {}

  // Login
  async login( loginDto: LoginDto) {
    const existingUser = await this.firestoreService.findDocumentByEmail('users', loginDto.email);
    console.log(existingUser)
    if (existingUser && existingUser[0].password == loginDto.password) {
      const {password, ...user} = existingUser;
      return this.jwtService.sign(user);
    }
  }

  // Register
  async register(registerPayloadDto: RegisterPayloadDto) {

    const existingUser = await this.firestoreService.findDocumentByEmail('users', registerPayloadDto.email);
    if (existingUser) {
      console.log(existingUser)
      throw new HttpException('Username already exists!', HttpStatus.BAD_REQUEST);
    }

    const generatedId = await this.firestoreService.addDocument('users', registerPayloadDto);
    registerPayloadDto.id = generatedId;
    await this.firestoreService.updateDocument('users', generatedId, { id: generatedId });
    
    return registerPayloadDto;
  }
}
