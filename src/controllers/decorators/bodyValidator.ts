import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export function bodyValidator(...props: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, props, target, key);
  };
}
