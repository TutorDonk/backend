import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto{
    @ApiProperty({example : 'ENwYeUsKpfwsJcmqYeTa'})
    idTutor : string

    @ApiProperty({example : 'Dr. Yoanes'})
    namaTutor : string

    @ApiProperty({example : '12:30 15/06/2024'})
    jamTutor : string

    @ApiProperty({example : 'IPA'})
    course : string

}