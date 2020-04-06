import {IsString} from 'class-validator';

export class RegistrationDTO {
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class AddingToDoDTO {
    @IsString()
    newContext: string;
}

export class UpdateToDoDTO {
    @IsString()
    id: string;
    @IsString()
    newContext: string;
}

export class DoToDoDTO {
    @IsString()
    id: string;
}

export class RemoveToDoDTO {
    @IsString()
    id: string;
}
