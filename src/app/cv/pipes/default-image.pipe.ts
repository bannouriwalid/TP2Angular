import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { CONSTANTES } from '../../../config/const.config';

@Pipe({
    name: 'defaultImage',
    standalone: true,
})
@Injectable({
  providedIn: 'root',
})
export class DefaultImagePipe implements PipeTransform {
  transform(path: string): string {
    if (!path.trim()) return CONSTANTES.defaultImage;
    return path;
  }
}
