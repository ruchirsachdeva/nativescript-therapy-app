import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Duration} from '../model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ToastService} from '../../service/messaging/toast.service';

@Component({
    selector: 'app-book-session',
    templateUrl: './book-session.component.html',
    styleUrls: ['./book-session.component.css']
})
export class BookSessionComponent implements OnInit {

    public availableHours: Array<Duration>;


    public requestedHours: number;


    public availableSlots: Array<any>;
    private sessionId: number;

    constructor(private userService: UserService, private route: ActivatedRoute,
                private location: Location,
                private toast: ToastService) {
    }

    ngOnInit() {
        this.sessionId = +this.route.snapshot.params['id'];
        this.userService.getAvailableHours(this.sessionId).subscribe(data => {
            this.availableHours = [];
            data.forEach(duration => {
                    this.availableHours.push(duration);
                }
            );
        });


        this.userService.getSession(this.sessionId).subscribe(data => {
            this.requestedHours = data.requestedHours;
        });
    }

    onDateChanged(args) {
        console.log('Date New value: ' + new Date(args.value));
        const selectedDate = new Date(args.value);

        this.availableSlots = [];
        for (const h of this.availableHours) {
            const startTime = new Date(h.startTime);
            const endTime = new Date(h.endTime);

            if (startTime.getDate() === selectedDate.getDate()
                && startTime.getMonth() === selectedDate.getMonth()
                && startTime.getFullYear() === selectedDate.getFullYear()) {
                let hours = (new Date(h.endTime).getTime() - new Date(h.startTime).getTime()) / 1000;
                hours /= (60 * 60);
                if (hours >= this.requestedHours) {

                    const startSlot = new Date(h.startTime);
                    const endSlot = new Date(startSlot);
                    endSlot.setHours(endSlot.getHours() + this.requestedHours);
                    do {
                        this.availableSlots.push({
                            startTime: new Date(startSlot),
                            endTime: new Date(endSlot)
                        });
                        startSlot.setHours(startSlot.getHours() + 1);
                        endSlot.setHours(endSlot.getHours() + 1);

                    } while (endSlot <= endTime) ;
                }
            }
        }
    }


    bookSession(startTime: Date, endTime: Date) {
        this.userService.bookSession(this.sessionId, startTime.toISOString(), endTime.toISOString())
            .subscribe(() => {
                this.toast.showSuccess('Session successfully booked', 'Book session');
                this.location.back();
            });
    }


}
