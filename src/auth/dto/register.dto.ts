import { ApiProperty } from '@nestjs/swagger';

export class RegisterPayloadDto{
    id? : string;
    @ApiProperty({ example: 'user@example.com' })
    email : string;
    @ApiProperty({ example: 'password' })
    password : string;
    @ApiProperty({ example: 'tutor / murid / orang tua' })
    role : string;
}