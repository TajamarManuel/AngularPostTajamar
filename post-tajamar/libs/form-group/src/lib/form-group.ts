import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "./custom-validators";

@NgModule({
    imports: [CommonModule]
})
export class FormGroupsModule {
    
    loginForm = new FormGroup({
        correo: new FormControl(null, [Validators.required, Validators.email]),
        contrasena: new FormControl(null, [Validators.required])
    })

    registerForm = new FormGroup({
        contrasena: new FormControl(null, [
            Validators.required,
            Validators.minLength(10),
            CustomValidators.patternValidator(/(?=(?:.*[A-Z])+)/, { upperCaseLetter: true }),
            CustomValidators.patternValidator(/(?=(?:.*[a-z])+)/, { lowerCaseLetter: true }),
            CustomValidators.patternValidator(/(?=(?:.*\d)+)/, { digit: true }),
            CustomValidators.patternValidator(/(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>])+)/, { characters: true }),
            CustomValidators.patternValidator(/^(?!.*(.)\1{2})|S/, { notRepeatingThreeCharacters: true }),
            CustomValidators.patternValidator(/([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]+)/, { onlyAboveCharClassesNoSpaces: true }),
        ]),
        dni: new FormControl(null, [Validators.required, Validators.maxLength(9), CustomValidators.patternValidator(/^[XYZ]?([0-9]{7,8})([A-Z])$/, { isValidDni: true })]),
        nombre: new FormControl(null, [Validators.required]),
        apellidos: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/([\D]+\s)+[\D]+/, { isDoubleSurname: true })]),
        direccion: new FormControl(null, [Validators.required]),
        discapacidad: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        telefono: new FormControl(null, [Validators.required, CustomValidators.patternValidator(/(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/, { validPhone: true })]),
        numeroHijos: new FormControl(null, [Validators.required]),
        estadoId: new FormControl(null, Validators.required),
        fechaNacimiento: new FormControl(null, Validators.required),
        LGPD: new FormControl(null, Validators.requiredTrue)
    })

    creacionTrabajador = new FormGroup({
        categoriaTrabajador: new FormControl(null, Validators.required),
        fechaEntrada: new FormControl(null, Validators.required),
        oficina: new FormControl(null, Validators.required),
        persona: new FormControl(null, Validators.required),
        sueldoBase: new FormControl(null, Validators.required)
    })

    creacionCategoria = new FormGroup({
        categoria: new FormControl(null, Validators.required),
        incrementoSalarial: new FormControl(null, Validators.required),
        descripcion: new FormControl(null, Validators.required)
    })

    creacionOficina = new FormGroup({
        oficina: new FormControl(null, Validators.required),
        descripcion: new FormControl(null, Validators.required),
        direccion: new FormControl(null, Validators.required)
    })
}