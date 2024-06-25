import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const validateAllSame:ValidatorFn=(
    control:AbstractControl
): ValidationErrors | null => {
if(control instanceof FormControl){
    return null;
}
if (control instanceof FormGroup){
    const keys=Object.keys(control.controls);
    if(keys.length === 0){
        return null;
    }
    const first=control.controls[keys[0]].value;
    for(const k of keys){
       if(control.controls[k].value!==first){
        return {notSame:true};
       }
    }

}
return null;
}