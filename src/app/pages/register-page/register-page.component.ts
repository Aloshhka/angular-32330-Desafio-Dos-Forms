import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  firstNameControl = new FormControl('', [Validators.required,
  Validators.minLength(3),
  this.notHomeroValidator
  ])

  emailControl = new FormControl('', [Validators.email, Validators.required])
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)])
  repeatPasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)])

  lastNameControl = new FormControl('', [Validators.required])

  streetNameControl = new FormControl('', [Validators.required])
  streetNumberControl = new FormControl('', [Validators.required])
  signedTermControl = new FormControl(false, [Validators.requiredTrue])
  countryControl = new FormControl('',[Validators.required])

  registerForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl,
    repeatPassword: this.repeatPasswordControl,
    location: new FormGroup({
      streetName: this.streetNameControl,
      streetNumber: this.streetNumberControl,
      country: this.countryControl,
    }),
    signedTerm: this.signedTermControl,

  }, {
    validators: [
      this.passwordsMatchValidator
    ]
  })

  // Validador de ejemplo
  notHomeroValidator(control: FormControl) {
    if (control.value?.toLowerCase() === 'homero') {
      return {
        isHomero: true
      }
    }
    return null
  }

  passwordsMatchValidator() {

    return () => {
      if (this.passwordControl.value !== this.repeatPasswordControl.value) {
        return {
          passwordsMatch: true
        }
      }
      return null
    }
  }

  onSubmit(){
    console.log(this.registerForm.value)
  }
}
