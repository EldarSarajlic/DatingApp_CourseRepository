import { CanDeactivateFn } from '@angular/router';
import {MemberProfle} from '../../features/members/member-profle/member-profle';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfle> = (component) => {
  if(component.editForm?.dirty){
    return confirm("Are you sure you want to exit? All unsaved changes will be lost.");
  }
  return true;
};
