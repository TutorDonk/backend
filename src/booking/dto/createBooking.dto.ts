import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto{
    @ApiProperty({example : 'ENwYeUsKpfwsJcmqYeTa'})
    idTutor : string

    @ApiProperty({example : 'Dr. Yoanes'})
    namaTutor : string

    @ApiProperty({example : 'IPA'})
    course : string

}