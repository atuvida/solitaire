
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';


export let flipAnimation = 
trigger('flip',[
  transition('* => *', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('100ms', [
      animate('.6s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-110%)', offset: 0.20}),
        style({opacity: 1, transform: 'translateY(-20%)', offset: 0.30}),
        style({opacity: 1, transform: 'rotateY(180deg)', offset: 0.40}),
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

export let flipAnimation4 = 
trigger('enter',[
  transition(':enter', [
    query(':enter', style({opacity: 0}), {optional: true}),
    query(':enter', stagger('100ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0.30}),
        style({opacity: 1, transform: 'translateY(100%)', offset: 0.60}),
        style({opacity: 1, transform: 'translateX(0)', offset: 1})
      ]))
    ]), {optional: true})
  ])
])

export let flipAnimation3 =
trigger('flipState', [
  state('flipped', style({
    backgroundColor: '#eee',
    transform: 'scale(1)'
  })),
  state('!fllipped',   style({
    backgroundColor: '#cfd8dc',
    transform: 'scale(1.1)'
  })),transition('false => true', [
    query('false => true', stagger('1000ms', [
      animate('.5s ease-in', keyframes([
        style({opacity: 1, transform: 'rotateY(45deg)', offset: 0.30}),
        style({opacity: 1, transform: 'rotateY(90deg)', offset: 0.60}),
        style({opacity: 1, transform: 'rotateY(180deg)', offset: 1})
      ]))
    ]), {optional: true})
  ])
])