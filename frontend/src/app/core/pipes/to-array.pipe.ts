import { Pipe, PipeTransform } from '@angular/core';

type KeyValue = {
  key: string;
  value: any;
};

@Pipe({
  name: 'toArray',
})
export class ToArrayPipe implements PipeTransform {
  transform(value: Record<string, any>): KeyValue[] {
    if (!value || typeof value !== 'object') {
      return [];
    }
    return Object.keys(value).map((k) => {
      return {
        key: k,
        value: value[k],
      };
    });
  }
}
