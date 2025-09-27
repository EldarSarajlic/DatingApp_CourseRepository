import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Member} from '../../../types/member';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-member-profle',
  imports: [DatePipe],
  templateUrl: './member-profle.html',
  styleUrl: './member-profle.css'
})
export class MemberProfle implements OnInit {
  private route = inject(ActivatedRoute);
  protected member = signal<Member|undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data =>{
      this.member.set(data['member']);
    })
  }
}
