import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export declare type ClassType<T> = new (...args: any[]) => T;

/**
 * ValidatorFn using class-validator under the hood
 */
const validator: ValidatorFn = (control: EntityFormGroup<any>): ValidationErrors | null => {
  const errors = validateSync(control.getValue());
  const global = {};
  for (const e of errors) {
    if (control.controls[e.property]) {
      control.controls[e.property].setErrors(e.constraints);
    } else {
      global[e.property] = e.constraints;
    }
  }
  return global;
};

export class EntityFormGroup<T extends Record<string, any>> extends FormGroup {
  /**
   * @inheritdoc
   * This value is a javascript Object, not a class instance.
   */
  value: T;

  /**
   * Class type
   */
  classType: ClassType<T>;

  constructor(classType: ClassType<T>, entity: T) {
    const controls: Record<string, FormControl> = {};
    Object.keys(entity).forEach((property) => {
      controls[property] = new FormControl(entity[property]);
    });
    super(controls, { validators: validator });
    this.classType = classType;
  }

  /**
   * Get the value as class instance
   */
  getValue(): T {
    return plainToClass(this.classType, this.value);
  }
}
