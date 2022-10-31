import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, UntypedFormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dynamicforms';
  formFields: any[] = [];
  form = new FormGroup({})
  constructor(private formBuilder:UntypedFormBuilder,private httpClient:HttpClient){}

  ngOnInit():void{
    this.httpClient.get<any[]>('/assets/sample.json').subscribe((formFields:any[])=>{
      
      for(const formField of formFields){
        this.form.addControl(formField.name, new FormControl('',this.getValidator(formField)))
      }
      this.formFields=formFields;
      console.log(this.formFields);
      
    })
  }

onSubmit():void{
  if(this.form.valid){
    console.log(this.form.value);
    
  }
}

private getValidator(formField:any): any {
  var validArray: any[] = []
  for(var i=0;i<formField.validation.length;i++){
   
  switch(formField.validation[i]){
    case 'email':
      validArray.push(Validators.email)
      break;
    case 'required':
      validArray.push(Validators.required)
      break;
    default:
      return null;
  }
  }
  return validArray;
}
}

