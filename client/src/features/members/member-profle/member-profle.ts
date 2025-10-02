import {Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EditableMember, Member} from '../../../types/member';
import {DatePipe} from '@angular/common';
import {MemberService} from '../../../core/services/member-service';
import {ToastService} from '../../../core/services/toast-service';
import {FormsModule, NgForm} from '@angular/forms';
import {AccountService} from '../../../core/services/account-service';

@Component({
  selector: 'app-member-profle',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profle.html',
  styleUrl: './member-profle.css'
})
export class MemberProfle implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent){
    if(this.editForm?.dirty){
      $event.preventDefault()
    }
  }
  private toastService = inject(ToastService);
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  protected editableMember: EditableMember={
    displayName: '',
    description: '',
    country: '',
    city: '',
  }

  ngOnInit(): void {
    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      country: this.memberService.member()?.country || '',
      city: this.memberService.member()?.city || ''
    }
  }

  ngOnDestroy(): void {
    if(this.memberService.editMode()){
      this.memberService.editMode.set(false);
    }
  }

  updateProfile(){
    if(!this.memberService.member()) return;
    const updatedMember = {...this.memberService.member(), ...this.editableMember};
    this.memberService.updateMember(this.editableMember).subscribe({
      next: ()=>{
        const currentUser = this.accountService.currentUser();
        if(currentUser && updatedMember.displayName !== currentUser.displayName){
          currentUser.displayName = updatedMember.displayName;
          this.accountService.currentUser.set(currentUser);
        }
        this.toastService.success('Profile updated successfully.');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    })
  }


}
