
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';


export let flipAnimation = 
trigger('flip',[
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('500ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-110%)', offset: 0.20}),
        style({opacity: 1, transform: 'rotateY(180deg)', offset: 0.30}),
        style({opacity: 1, transform: 'translateX(0)', offset: 1 })

      ]))
    ]), {optional: true})
  ])
])


export let flipAnimation2 = 
trigger('flip2',[
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('500ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 1, transform: 'rotateY(45deg)', offset: 0.30}),
        style({opacity: 1, transform: 'rotateY(90deg)', offset: 0.60}),
        style({opacity: 1, transform: 'rotateY(180deg)', offset: 1})
      ]))
    ]), {optional: true})
  ])
])