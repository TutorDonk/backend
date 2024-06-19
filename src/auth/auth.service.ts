import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterPayloadDto } from './dto/register.dto';
import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firestoreService: FirestoreService,
  ) {}

  // Login
  async login(loginDto: LoginDto) {
    const existingUser = await this.firestoreService.findDocumentByEmail(
      'user',
      loginDto.email,
    );
    const existingTutor = await this.firestoreService.findDocumentByEmail(
      'tutor',
      loginDto.email,
    );
    if (
      (existingUser && existingUser[0].password == loginDto.password) ||
      (existingTutor && existingTutor[0].password == loginDto.password)
    ) {
      if (existingUser) {
        const { password, ...user } = existingUser;
        const token = this.jwtService.sign(user);
        return {token, role: "siswa"};
      } else if (existingTutor) {
        const { password, ...tutor } = existingTutor;
        const token = this.jwtService.sign(tutor);
        return {token, role: "pengajar"};
      }
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  // Register
  async register(registerPayloadDto: RegisterPayloadDto) {
    const collection =
      registerPayloadDto.role === 'pengajar' ? 'tutor' : 'user';
    const existingUserOrTutor = await this.firestoreService.findDocumentByEmail(
      collection,
      registerPayloadDto.email,
    );

    if (existingUserOrTutor) {
      throw new HttpException(
        'Username already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const totalDocuments =
      await this.firestoreService.getTotalDocuments(collection);

    if (registerPayloadDto.role === 'pengajar') {
      registerPayloadDto.idMLTutor = totalDocuments + 1;
    } else {
      registerPayloadDto.idMLUser = totalDocuments + 1;
    }

    const generatedId = await this.firestoreService.addDocument(
      collection,
      registerPayloadDto,
    );
    registerPayloadDto.id = generatedId;
    const updatePayload = {
      id: generatedId,
      ...(registerPayloadDto.role === 'pengajar'
        ? { idML: registerPayloadDto.idMLTutor }
        : { idML: registerPayloadDto.idMLUser }),
    };
    await this.firestoreService.updateDocument(
      collection,
      generatedId,
      updatePayload,
    );

    return registerPayloadDto;
  }
}
